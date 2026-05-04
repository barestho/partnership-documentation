---
title: 💬 Communication avec l'API
---

## Authentification

L'API Barestho utilise l'authentification [**HTTP Basic Auth**](https://en.wikipedia.org/wiki/Basic_access_authentication). Chaque requête doit inclure vos identifiants encodés en Base64 dans l'en-tête `Authorization` :

- **Username** : votre UUID partenaire
- **Password** : votre token API

```
Authorization: Basic <base64(uuid:token)>
```
Ces identifiants vous sont fournis par l'équipe Barestho lors de l'activation de votre accès partenaire.
Toute requête sans identifiants valides recevra une réponse `401 Unauthorized`.

### Exemple

Récupération de votre profil partenaire :

```http
GET /api/v1/partnership/profile HTTP/1.1
Host: public.api.barestho.com
Authorization: Basic <base64(uuid:token)>
```

**Réponse `200 OK` :**
```json
{
    "uuid": "75d278f7-9000-4b71-a929-051867d74457",
    "name": "Barestho",
    "description": null,
    "website_url": "https://pro.barestho.com/"
}
```

## Limite de taux

L'API est limitée à **1 requête par seconde** par partenaire. Au-delà, les requêtes reçoivent une réponse `429 Too Many Requests`. Il est recommandé d'implémenter un mécanisme de retry avec backoff exponentiel.
