---
sidebar_position: 1
---

# API Overview

Safebucket provides a comprehensive REST API for programmatic access to file sharing functionality. The API is built
with Go using the Chi router and follows RESTful conventions.

## Base URL

The API is available at `/api/v1/` from your Safebucket instance:

- **Local Development**: `http://localhost:8080/api/v1/`
- **Production**: `https://yourdomain.com/api/v1/`

## Authentication

All API endpoints require authentication using JWT tokens.

### Obtaining a Token

#### Local Authentication

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### OIDC Authentication

OIDC authentication is handled through the web interface. Once authenticated, you can extract the JWT token from the
session.

### Using the Token

Include the JWT token in the Authorization header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Endpoints

### Authentication (`/auth`)

| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| `POST` | `/auth/login`               | Local authentication |
| `GET`  | `/auth/providers`           | List OIDC providers  |
| `GET`  | `/auth/callback/{provider}` | OIDC callback        |
| `POST` | `/auth/logout`              | Logout user          |

### Users (`/users`)

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| `GET`  | `/users/me`   | Get current user profile |
| `PUT`  | `/users/me`   | Update user profile      |
| `GET`  | `/users`      | List users (admin only)  |
| `GET`  | `/users/{id}` | Get user by ID           |

### Buckets (`/buckets`)

| Method   | Endpoint                       | Description           |
|----------|--------------------------------|-----------------------|
| `GET`    | `/buckets`                     | List user's buckets   |
| `POST`   | `/buckets`                     | Create new bucket     |
| `GET`    | `/buckets/{id}`                | Get bucket details    |
| `PUT`    | `/buckets/{id}`                | Update bucket         |
| `DELETE` | `/buckets/{id}`                | Delete bucket         |
| `GET`    | `/buckets/{id}/files`          | List files in bucket  |
| `POST`   | `/buckets/{id}/upload`         | Upload file to bucket |
| `GET`    | `/buckets/{id}/files/{fileId}` | Download file         |
| `DELETE` | `/buckets/{id}/files/{fileId}` | Delete file           |

### Invitations (`/invites`)

| Method   | Endpoint                | Description              |
|----------|-------------------------|--------------------------|
| `POST`   | `/invites`              | Create bucket invitation |
| `GET`    | `/invites`              | List sent invitations    |
| `GET`    | `/invites/{id}`         | Get invitation details   |
| `PUT`    | `/invites/{id}/accept`  | Accept invitation        |
| `PUT`    | `/invites/{id}/decline` | Decline invitation       |
| `DELETE` | `/invites/{id}`         | Cancel invitation        |

## Request/Response Format

### Content Types

- **Request Content-Type**: `application/json` (except file uploads)
- **Response Content-Type**: `application/json`
- **File Uploads**: `multipart/form-data`

### Standard Response Format

```json
{
  "data": []
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

## Common HTTP Status Codes

| Code  | Meaning               | Description                   |
|-------|-----------------------|-------------------------------|
| `200` | OK                    | Request successful            |
| `201` | Created               | Resource created successfully |
| `400` | Bad Request           | Invalid request parameters    |
| `401` | Unauthorized          | Authentication required       |
| `403` | Forbidden             | Insufficient permissions      |
| `404` | Not Found             | Resource not found            |
| `409` | Conflict              | Resource already exists       |
| `422` | Unprocessable Entity  | Validation error              |
| `500` | Internal Server Error | Server error                  |

## File Uploads

File uploads use multipart form data:

```bash
POST /api/v1/buckets/{id}/upload
Content-Type: multipart/form-data
Authorization: Bearer {token}

file: [binary file data]
```

**Response:**

```json
{
  "success": true,
  "data": {
    "file": {
      "id": "file-uuid",
      "name": "document.pdf",
      "size": 1024000,
      "content_type": "application/pdf",
      "url": "https://storage.example.com/path/to/file",
      "created_at": "2023-01-01T12:00:00Z"
    }
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Rate Limit**: 100 requests per minute per IP
- **Headers**: Rate limit information in response headers
    - `X-RateLimit-Limit`: Request limit
    - `X-RateLimit-Remaining`: Remaining requests
    - `X-RateLimit-Reset`: Reset timestamp

When rate limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Try again later."
  }
}
```

## CORS

Cross-Origin Resource Sharing (CORS) is configured based on the `APP__ALLOWED_ORIGINS` setting:

```bash
# Allow specific origins
APP__ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Allow all origins (development only)
APP__ALLOWED_ORIGINS=*
```

## SDK and Examples

### cURL Examples

#### Login

```bash
curl -X POST http://localhost:1323/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@safebucket.io","password":"ChangeMePlease"}'
```

#### List Buckets

```bash
curl -X GET http://localhost:1323/api/v1/buckets \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Create Bucket

```bash
curl -X POST http://localhost:1323/api/v1/buckets \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Bucket","description":"Test bucket"}'
```

#### Upload File

```bash
curl -X POST http://localhost:1323/api/v1/buckets/BUCKET_ID/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/file.pdf"
```

### JavaScript/Node.js

```javascript
class SafeBucketAPI {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }

  async request(method, endpoint, data = null) {
    const url = `${this.baseURL}/api/v1${endpoint}`;
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response.json();
  }

  // Authentication
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });
    const data = await response.json();
    this.token = data.data.token;
    return data;
  }

  // Buckets
  async getBuckets() {
    return this.request('GET', '/buckets');
  }

  async createBucket(name, description) {
    return this.request('POST', '/buckets', {name, description});
  }

  async uploadFile(bucketId, file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/api/v1/buckets/${bucketId}/upload`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${this.token}`},
      body: formData,
    });
    return response.json();
  }
}

// Usage
const api = new SafeBucketAPI('http://localhost:1323', null);
await api.login('admin@safebucket.io', 'ChangeMePlease');
const buckets = await api.getBuckets();
```

### Python

```python
import requests
import json


class SafeBucketAPI:
    def __init__(self, base_url, token=None):
        self.base_url = base_url
        self.token = token
        self.session = requests.Session()
        if token:
            self.session.headers.update({'Authorization': f'Bearer {token}'})

    def login(self, email, password):
        response = self.session.post(
            f'{self.base_url}/api/v1/auth/login',
            json={'email': email, 'password': password}
        )
        data = response.json()
        self.token = data['data']['token']
        self.session.headers.update({'Authorization': f'Bearer {self.token}'})
        return data

    def get_buckets(self):
        response = self.session.get(f'{self.base_url}/api/v1/buckets')
        return response.json()

    def create_bucket(self, name, description=None):
        data = {'name': name}
        if description:
            data['description'] = description

        response = self.session.post(f'{self.base_url}/api/v1/buckets', json=data)
        return response.json()

    def upload_file(self, bucket_id, file_path):
        with open(file_path, 'rb') as file:
            files = {'file': file}
            response = self.session.post(
                f'{self.base_url}/api/v1/buckets/{bucket_id}/upload',
                files=files
            )
        return response.json()


# Usage
api = SafeBucketAPI('http://localhost:1323')
api.login('admin@safebucket.io', 'ChangeMePlease')
buckets = api.get_buckets()
```

## API Versioning

The API uses URL versioning (`/api/v1/`). Future versions will maintain backward compatibility where possible, with
breaking changes requiring a new version path.

## Support

- **Documentation**: This API documentation
- **Issues**: [GitHub Issues](https://github.com/safebucket/safebucket/issues)
- **Community**: [GitHub Discussions](https://github.com/safebucket/safebucket/discussions)
