---
title: 💬 Communicating with the API
---

## Environments

| Environment | Base URL | Use |
|---|---|---|
| Stage | `https://public.api.stage0.barestho-stage.ovh/` | Development and tests |
| Production | `https://public.api.barestho.com/` | Live integration |

:::caution[Stage first]
Going through stage is **required** before any production integration. Develop and test your integration on stage. Move to production only once it works there.
:::

Each environment has its own credentials (partner UUID and API token), provided by the Barestho team. Stage credentials do not work in production, and vice versa.

The examples of this documentation use the production host. Replace it with the stage host while you develop.

## Authentication

The Barestho Partnership API uses [**HTTP Basic Auth**](https://en.wikipedia.org/wiki/Basic_access_authentication). Each request must include your credentials encoded in Base64 in the `Authorization` header:

- **Username**: your partner UUID
- **Password**: your API token

```

Authorization: Basic <base64(uuid:token)>

````

These credentials are provided by the Barestho team when your partner access is activated, one set per environment (see [Environments](#environments)).  
Any request without valid credentials will receive a `401 Unauthorized` response, with the code `AUTHENTICATION_FAILED`. If your partner account is disabled, the code is `PARTNER_DISABLED`.

An API token is either **read-only** or **read-write**. A write request (`POST`, `PATCH`, `PUT`, `DELETE`) with a read-only token receives a `403` response with the code `API_KEY_READ_ONLY`.

### Example

Retrieve your partner profile:

```http
GET /api/v1/partnership/profile HTTP/1.1
Host: public.api.barestho.com
Authorization: Basic <base64(uuid:token)>
````

**`200 OK` response:**

```json
{
    "uuid": "75d278f7-9000-4b71-a929-051867d74457",
    "name": "Barestho",
    "description": null,
    "website_url": "https://pro.barestho.com/"
}
```

## Rate limiting

The API is limited to **60 requests per minute** per partner, over a sliding window. Short bursts are allowed within this limit. Beyond that, requests receive a `429 Too Many Requests` response with the code `RATE_LIMITED`.

Every response carries these headers:

| Header | Content |
|---|---|
| `X-RateLimit-Limit` | Requests allowed per window |
| `X-RateLimit-Remaining` | Requests left in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the oldest counted request leaves the window |
| `Retry-After` | Seconds to wait (on `429` only) |

Wait for `Retry-After` seconds before retrying. Otherwise, use exponential backoff.

## Errors

Every error uses the same format:

```json
{
    "code": "VALIDATION_ERROR",
    "message": "Invalid request.",
    "details": [
        { "field": "adults", "code": "MAX_VALUE", "message": "Ensure this value is less than or equal to 50." }
    ],
    "request_id": "req_8f2c1e0b7a4d4c3e9b1f2a6d5c7e8f90",
    "timestamp": "2026-05-01T10:00:00+00:00"
}
```

- `code` is **stable**: code your logic on it.
- `message` is for humans and explains what to do. It may change.
- Every error caused by your request content is a `400`. Read `code` to know which one.
- A `409` means the current state of a resource prevents the action.
- `details` lists the invalid fields. `field` is a path (`guest.email`), or `null` for a global error.
- `request_id` is also sent in the `X-Request-Id` header of **every** response. Quote it when you contact support.

| HTTP | `code` | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | A field is missing or malformed |
| 400 | `SLOT_UNAVAILABLE` | No table free for this slot |
| 400 | `PAYMENT_REQUIRED` | The slot requires a prepayment, not supported by the API yet |
| 400 | `DUPLICATE_WEBHOOK_URL` | Another of your webhooks already uses this `url` |
| 400 | `INVALID_STATUS_TRANSITION` | The current status of the reservation does not allow this `action` |
| 400 | `CANCELLATION_DEADLINE_PASSED` | The restaurant's cancellation deadline has passed |
| 401 | `AUTHENTICATION_FAILED` | Invalid credentials |
| 401 | `PARTNER_DISABLED` | Your partner account is disabled |
| 403 | `RESTAURANT_ACCESS_DENIED` | The restaurant has not granted access |
| 403 | `SCOPE_MISSING` | Your access lacks the required scope |
| 403 | `MODULE_DISABLED` | The restaurant has disabled the module |
| 403 | `NOT_RESERVATION_OWNER` | The reservation belongs to another channel |
| 403 | `API_KEY_READ_ONLY` | Write request with a read-only token |
| 403 | `PERMISSION_DENIED` | Other access refusal |
| 404 | `NOT_FOUND` | Unknown resource, or restaurant inactive or not linked to you |
| 405 | `METHOD_NOT_ALLOWED` | HTTP method not supported |
| 406 | `NOT_ACCEPTABLE` | `Accept` header not supported |
| 409 | `WEBHOOK_DISABLED` | Retry of a failed request while the webhook or your account is disabled |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | Request body type not supported |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

New codes may be added. Handle unknown codes with their HTTP status.
