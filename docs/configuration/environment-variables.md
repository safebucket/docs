---
sidebar_position: 1
---

# Environment Variables

SafeBucket uses environment variables for configuration. This page documents all available environment variables organized by category.

## Configuration Methods

SafeBucket supports multiple configuration methods in order of precedence:

1. **Environment Variables** (highest precedence)
2. **Configuration File** (YAML format)
3. **Default Values** (lowest precedence)

### Configuration File Path

Set the configuration file location:
```bash
CONFIG_FILE_PATH=/path/to/config.yaml
```

Default search paths:
- `./config.yaml`
- `templates/config.yaml`

## Application Settings

### Basic Application Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `APP__API_URL` | API base URL | - | ✅ |
| `APP__WEB_URL` | Frontend web URL | - | ✅ |
| `APP__PORT` | Server port | `8080` | ❌ |
| `APP__JWT_SECRET` | JWT signing secret | - | ✅ |
| `APP__ADMIN_EMAIL` | Admin user email | - | ✅ |
| `APP__ADMIN_PASSWORD` | Admin user password | - | ✅ |

### CORS and Security

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `APP__ALLOWED_ORIGINS` | Comma-separated allowed origins | - | ✅ |
| `APP__TRUSTED_PROXIES` | Comma-separated trusted proxy IPs | - | ✅ |

**Example:**
```bash
APP__API_URL=http://localhost:1323
APP__WEB_URL=http://localhost:3001
APP__PORT=1323
APP__JWT_SECRET=your-256-bit-secret
APP__ADMIN_EMAIL=admin@safebucket.io
APP__ADMIN_PASSWORD=ChangeMePlease
APP__ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
APP__TRUSTED_PROXIES=127.0.0.1,::1
```

### Static Files

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `APP__STATIC_FILES__ENABLED` | Enable static file serving | `true` | ❌ |
| `APP__STATIC_FILES__DIRECTORY` | Static files directory | `web/dist` | ❌ |

## Database Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE__HOST` | PostgreSQL host | - | ✅ |
| `DATABASE__PORT` | PostgreSQL port | `5432` | ❌ |
| `DATABASE__USER` | Database username | - | ✅ |
| `DATABASE__PASSWORD` | Database password | - | ✅ |
| `DATABASE__NAME` | Database name | - | ✅ |
| `DATABASE__SSLMODE` | SSL mode | `disable` | ❌ |

**Example:**
```bash
DATABASE__HOST=localhost
DATABASE__PORT=5442
DATABASE__USER=root
DATABASE__PASSWORD=root
DATABASE__NAME=safebucket
DATABASE__SSLMODE=disable
```

## Cache Configuration

SafeBucket supports Redis and Valkey for caching.

### Redis

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `CACHE__TYPE` | Cache type (`redis` or `valkey`) | - | ✅ |
| `CACHE__REDIS__HOSTS` | Comma-separated Redis hosts | - | ✅ (if Redis) |
| `CACHE__REDIS__PASSWORD` | Redis password | - | ❌ |

### Valkey

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `CACHE__VALKEY__HOSTS` | Comma-separated Valkey hosts | - | ✅ (if Valkey) |
| `CACHE__VALKEY__PASSWORD` | Valkey password | - | ❌ |

**Example:**
```bash
CACHE__TYPE=redis
CACHE__REDIS__HOSTS=localhost:6379
CACHE__REDIS__PASSWORD=root
```

## Storage Configuration

SafeBucket supports multiple storage providers: MinIO, AWS S3, and Google Cloud Storage.

### MinIO

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `STORAGE__TYPE` | Storage type | - | ✅ |
| `STORAGE__MINIO__BUCKET_NAME` | MinIO bucket name | - | ✅ (if MinIO) |
| `STORAGE__MINIO__ENDPOINT` | MinIO endpoint | - | ✅ (if MinIO) |
| `STORAGE__MINIO__CLIENT_ID` | MinIO access key | - | ✅ (if MinIO) |
| `STORAGE__MINIO__CLIENT_SECRET` | MinIO secret key | - | ✅ (if MinIO) |
| `STORAGE__MINIO__TYPE` | Event system type | `jetstream` | ❌ |
| `STORAGE__MINIO__JETSTREAM__TOPIC_NAME` | JetStream topic | - | ✅ (if JetStream) |
| `STORAGE__MINIO__JETSTREAM__HOST` | JetStream host | - | ✅ (if JetStream) |
| `STORAGE__MINIO__JETSTREAM__PORT` | JetStream port | - | ✅ (if JetStream) |

**Example:**
```bash
STORAGE__TYPE=minio
STORAGE__MINIO__BUCKET_NAME=safebucket
STORAGE__MINIO__ENDPOINT=localhost:9000
STORAGE__MINIO__CLIENT_ID=minio-root-user
STORAGE__MINIO__CLIENT_SECRET=minio-root-password
STORAGE__MINIO__TYPE=jetstream
STORAGE__MINIO__JETSTREAM__TOPIC_NAME=safebucket:notifications
STORAGE__MINIO__JETSTREAM__HOST=localhost
STORAGE__MINIO__JETSTREAM__PORT=4222
```

### AWS S3

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `STORAGE__TYPE` | Storage type | - | ✅ |
| `STORAGE__AWS__BUCKET_NAME` | S3 bucket name | - | ✅ (if AWS) |
| `STORAGE__AWS__SQS_NAME` | SQS queue name | - | ✅ (if AWS) |
| `AWS_ACCESS_KEY_ID` | AWS access key | - | ✅ (if AWS) |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | - | ✅ (if AWS) |
| `AWS_REGION` | AWS region | - | ✅ (if AWS) |

**Example:**
```bash
STORAGE__TYPE=aws
STORAGE__AWS__BUCKET_NAME=safebucket
STORAGE__AWS__SQS_NAME=safebucket-sqs
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
```

### Google Cloud Storage

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `STORAGE__TYPE` | Storage type | - | ✅ |
| `STORAGE__GCP__BUCKET_NAME` | GCS bucket name | - | ✅ (if GCP) |
| `STORAGE__GCP__PROJECT_ID` | GCP project ID | - | ✅ (if GCP) |
| `STORAGE__GCP__TOPIC_NAME` | Pub/Sub topic | - | ✅ (if GCP) |
| `STORAGE__GCP__SUBSCRIPTION_NAME` | Pub/Sub subscription | - | ✅ (if GCP) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to service account JSON | - | ✅ (if GCP) |

**Example:**
```bash
STORAGE__TYPE=gcp
STORAGE__GCP__BUCKET_NAME=safebucket-gcp
STORAGE__GCP__PROJECT_ID=my-project-id
STORAGE__GCP__TOPIC_NAME=safebucket-bucket-events
STORAGE__GCP__SUBSCRIPTION_NAME=safebucket-bucket-events-sub
GOOGLE_APPLICATION_CREDENTIALS=/path/to/gcs.json
```

## Events Configuration

SafeBucket supports multiple event systems for real-time notifications.

### NATS JetStream

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EVENTS__TYPE` | Event system type | - | ✅ |
| `EVENTS__JETSTREAM__TOPIC_NAME` | JetStream topic | - | ✅ (if JetStream) |
| `EVENTS__JETSTREAM__HOST` | NATS host | - | ✅ (if JetStream) |
| `EVENTS__JETSTREAM__PORT` | NATS port | - | ✅ (if JetStream) |

**Example:**
```bash
EVENTS__TYPE=jetstream
EVENTS__JETSTREAM__TOPIC_NAME=safebucket:notifications
EVENTS__JETSTREAM__HOST=localhost
EVENTS__JETSTREAM__PORT=4222
```

### Google Cloud Pub/Sub

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EVENTS__TYPE` | Event system type | - | ✅ |
| `EVENTS__GCP__PROJECT_ID` | GCP project ID | - | ✅ (if GCP) |
| `EVENTS__GCP__TOPIC_NAME` | Pub/Sub topic | - | ✅ (if GCP) |
| `EVENTS__GCP__SUBSCRIPTION_NAME` | Pub/Sub subscription | - | ✅ (if GCP) |

### AWS SQS

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EVENTS__TYPE` | Event system type | - | ✅ |
| `EVENTS__AWS__REGION` | AWS region | - | ✅ (if AWS) |
| `EVENTS__AWS__ACCOUNT_ID` | AWS account ID | - | ✅ (if AWS) |
| `EVENTS__AWS__SQS_NAME` | SQS queue name | - | ✅ (if AWS) |

## Authentication Configuration

### OAuth Providers

SafeBucket supports multiple OAuth providers. Configure them using the following pattern:

#### Provider Keys

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `AUTH__PROVIDERS__KEYS` | Comma-separated provider keys | - | ❌ |

#### Individual Provider Configuration

For each provider in `AUTH__PROVIDERS__KEYS`, configure:

| Variable Pattern | Description | Required |
|-----------------|-------------|----------|
| `AUTH__PROVIDERS__{PROVIDER}__NAME` | Display name | ✅ |
| `AUTH__PROVIDERS__{PROVIDER}__CLIENT_ID` | OAuth client ID | ✅ |
| `AUTH__PROVIDERS__{PROVIDER}__CLIENT_SECRET` | OAuth client secret | ✅ |
| `AUTH__PROVIDERS__{PROVIDER}__ISSUER` | OIDC issuer URL | ✅ |

**Example:**
```bash
# Enable Google and Authelia providers
AUTH__PROVIDERS__KEYS=google,authelia

# Google OAuth
AUTH__PROVIDERS__GOOGLE__NAME=Google
AUTH__PROVIDERS__GOOGLE__CLIENT_ID=your-id.apps.googleusercontent.com
AUTH__PROVIDERS__GOOGLE__CLIENT_SECRET=your-secret
AUTH__PROVIDERS__GOOGLE__ISSUER=https://accounts.google.com

# Authelia OIDC
AUTH__PROVIDERS__AUTHELIA__NAME=Authelia
AUTH__PROVIDERS__AUTHELIA__CLIENT_ID=safebucket
AUTH__PROVIDERS__AUTHELIA__CLIENT_SECRET=your-secret
AUTH__PROVIDERS__AUTHELIA__ISSUER=https://auth.yourdomain.com
```

## Email Configuration

### SMTP Settings

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NOTIFIER__TYPE` | Notification type | `smtp` | ✅ |
| `NOTIFIER__SMTP__HOST` | SMTP server host | - | ✅ |
| `NOTIFIER__SMTP__PORT` | SMTP server port | - | ✅ |
| `NOTIFIER__SMTP__USERNAME` | SMTP username | - | ❌ |
| `NOTIFIER__SMTP__PASSWORD` | SMTP password | - | ❌ |
| `NOTIFIER__SMTP__SENDER` | From email address | - | ✅ |
| `NOTIFIER__SMTP__ENABLE_TLS` | Enable TLS | `true` | ❌ |
| `NOTIFIER__SMTP__SKIP_VERIFY_TLS` | Skip TLS verification | `false` | ❌ |

**Example:**
```bash
NOTIFIER__TYPE=smtp
NOTIFIER__SMTP__HOST=localhost
NOTIFIER__SMTP__PORT=1025
NOTIFIER__SMTP__USERNAME=root
NOTIFIER__SMTP__PASSWORD=root
NOTIFIER__SMTP__SENDER=notifications@safebucket.io
NOTIFIER__SMTP__ENABLE_TLS=false
NOTIFIER__SMTP__SKIP_VERIFY_TLS=true
```

## Activity Logging

### Loki Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ACTIVITY__TYPE` | Activity logger type | `loki` | ✅ |
| `ACTIVITY__ENDPOINT` | Loki endpoint URL | - | ✅ |
| `ACTIVITY__LEVEL` | Log level | - | ❌ |

**Example:**
```bash
ACTIVITY__TYPE=loki
ACTIVITY__ENDPOINT=http://localhost:3100
ACTIVITY__LEVEL=info
```

## Complete Example

Here's a complete example of environment variables for a local development setup:

```bash
# Application
APP__API_URL=http://localhost:1323
APP__WEB_URL=http://localhost:3001
APP__PORT=1323
APP__JWT_SECRET=6n5o+dFncio8gQA4jt7pUJrJz92WrqD25zXAa8ashxA
APP__ADMIN_EMAIL=admin@safebucket.io
APP__ADMIN_PASSWORD=ChangeMePlease
APP__ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
APP__TRUSTED_PROXIES=127.0.0.1,::1
APP__STATIC_FILES__ENABLED=true
APP__STATIC_FILES__DIRECTORY=web/dist

# Database
DATABASE__HOST=localhost
DATABASE__PORT=5442
DATABASE__USER=root
DATABASE__PASSWORD=root
DATABASE__NAME=safebucket
DATABASE__SSLMODE=disable

# Cache
CACHE__TYPE=redis
CACHE__REDIS__HOSTS=localhost:6379
CACHE__REDIS__PASSWORD=root

# Storage (MinIO)
STORAGE__TYPE=minio
STORAGE__MINIO__BUCKET_NAME=safebucket
STORAGE__MINIO__ENDPOINT=localhost:9000
STORAGE__MINIO__CLIENT_ID=minio-root-user
STORAGE__MINIO__CLIENT_SECRET=minio-root-password
STORAGE__MINIO__TYPE=jetstream
STORAGE__MINIO__JETSTREAM__TOPIC_NAME=safebucket:notifications
STORAGE__MINIO__JETSTREAM__HOST=localhost
STORAGE__MINIO__JETSTREAM__PORT=4222

# Events
EVENTS__TYPE=jetstream
EVENTS__JETSTREAM__TOPIC_NAME=safebucket:notifications
EVENTS__JETSTREAM__HOST=localhost
EVENTS__JETSTREAM__PORT=4222

# Email
NOTIFIER__TYPE=smtp
NOTIFIER__SMTP__HOST=localhost
NOTIFIER__SMTP__PORT=1025
NOTIFIER__SMTP__USERNAME=root
NOTIFIER__SMTP__PASSWORD=root
NOTIFIER__SMTP__SENDER=notifications@safebucket.io
NOTIFIER__SMTP__ENABLE_TLS=false
NOTIFIER__SMTP__SKIP_VERIFY_TLS=true

# Activity Logging
ACTIVITY__TYPE=loki
ACTIVITY__ENDPOINT=http://localhost:3100

# Authentication (Optional)
AUTH__PROVIDERS__KEYS=google
AUTH__PROVIDERS__GOOGLE__NAME=Google
AUTH__PROVIDERS__GOOGLE__CLIENT_ID=your-id.apps.googleusercontent.com
AUTH__PROVIDERS__GOOGLE__CLIENT_SECRET=your-secret
AUTH__PROVIDERS__GOOGLE__ISSUER=https://accounts.google.com
```

## Validation

SafeBucket validates all configuration on startup. If required variables are missing or invalid, the application will exit with detailed error messages.