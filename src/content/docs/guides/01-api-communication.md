---
title: 💬 Communicating with the API
---

## Authentication

The Barestho API uses [**HTTP Basic Auth**](https://en.wikipedia.org/wiki/Basic_access_authentication). Each request must include your credentials encoded in Base64 in the `Authorization` header:

- **Username**: your partner UUID
- **Password**: your API token

```

Authorization: Basic <base64(uuid:token)>

````

These credentials are provided by the Barestho team when your partner access is activated.  
Any request without valid credentials will receive a `401 Unauthorized` response.

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

The API is limited to **1 request per second** per partner. Beyond that, requests will receive a `429 Too Many Requests` response. It is recommended to implement a retry mechanism with exponential backoff.
