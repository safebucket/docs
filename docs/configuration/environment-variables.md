---
sidebar_position: 1
---

# Environment Variables

Safebucket uses environment variables for configuration. This page documents all available environment variables
organized by category.

## Configuration Methods

Safebucket supports multiple configuration methods in order of precedence:

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

### Environment Variable Naming Convention

Safebucket uses **double underscores (`__`)** as separators in environment variables, which map to nested configuration:

- `APP__LOG_LEVEL` becomes `app.log_level` in the config structure
- `STORAGE__RUSTFS__BUCKET_NAME` becomes `storage.rustfs.bucket_name`

This hierarchical approach makes configuration organization clear and consistent.

## Application Settings

### Basic Application Configuration

| Variable                    | Description                                             | Default | Required | Valid Values                                       |
|-----------------------------|---------------------------------------------------------|---------|----------|----------------------------------------------------|
| `APP__LOG_LEVEL`            | Logging level for the application                       | `info`  | ❌        | `debug`, `info`, `warn`, `error`, `fatal`, `panic` |
| `APP__API_URL`              | API base URL                                            | -       | ✅        | -                                                  |
| `APP__WEB_URL`              | Frontend web URL                                        | -       | ✅        | -                                                  |
| `APP__PORT`                 | Server port (80-65535)                                  | `8080`  | ❌        | `80-65535`                                         |
| `APP__JWT_SECRET`           | JWT signing secret                                      | -       | ✅        | -                                                  |
| `APP__ADMIN_EMAIL`          | Admin user email                                        | -       | ✅        | Valid email                                        |
| `APP__ADMIN_PASSWORD`       | Admin user password                                     | -       | ✅        | -                                                  |
| `APP__TRASH_RETENTION_DAYS` | Days to retain files in trash before automatic deletion | `7`     | ❌        | `1-365`                                            |
| `APP__MAX_UPLOAD_SIZE`      | Maximum file upload size in bytes                       | `53687091200` (50 GB) | ❌        | `≥ 1`                                        |

### MFA Configuration

For MFA environment variables and setup, see the [MFA Configuration](./mfa) page.

### CORS and Security

| Variable               | Description                       | Default | Required |
|------------------------|-----------------------------------|---------|----------|
| `APP__ALLOWED_ORIGINS` | Comma-separated allowed origins   | -       | ✅        |
| `APP__TRUSTED_PROXIES` | Comma-separated trusted proxy IPs | -       | ✅        |

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

| Variable                       | Description                | Default    | Required |
|--------------------------------|----------------------------|------------|----------|
| `APP__STATIC_FILES__ENABLED`   | Enable static file serving | `true`     | ❌        |
| `APP__STATIC_FILES__DIRECTORY` | Static files directory     | `web/dist` | ❌        |

## Database Configuration

| Variable             | Description       | Default   | Required |
|----------------------|-------------------|-----------|----------|
| `DATABASE__HOST`     | PostgreSQL host   | -         | ✅        |
| `DATABASE__PORT`     | PostgreSQL port   | `5432`    | ❌        |
| `DATABASE__USER`     | Database username | -         | ✅        |
| `DATABASE__PASSWORD` | Database password | -         | ✅        |
| `DATABASE__NAME`     | Database name     | -         | ✅        |
| `DATABASE__SSLMODE`  | SSL mode          | `disable` | ❌        |

**Example:**

```bash
DATABASE__HOST=localhost
DATABASE__PORT=5442
DATABASE__USER=root
DATABASE__PASSWORD=root
DATABASE__NAME=safebucket
DATABASE__SSLMODE=disable
```

## Authentication Configuration

For detailed authentication configuration including OIDC providers and domain restrictions, see
the [Authentication Configuration](./authentication) page.

## Storage Configuration

### Basic Storage Settings

| Variable        | Description                                             | Default | Required |
|-----------------|---------------------------------------------------------|---------|----------|
| `STORAGE__TYPE` | Storage provider type (`rustfs`, `minio`, `aws`, `gcp`, `s3`) | -       | ✅        |

For detailed storage provider configuration, see the [Storage Providers](./storage-providers) page.

## Cache Configuration

Safebucket supports Redis and Valkey for caching.

### Redis

| Variable                        | Description                      | Default | Required     |
|---------------------------------|----------------------------------|---------|--------------|
| `CACHE__TYPE`                   | Cache type (`redis` or `valkey`) | -       | ✅            |
| `CACHE__REDIS__HOSTS`           | Comma-separated Redis hosts      | -       | ✅ (if Redis) |
| `CACHE__REDIS__PASSWORD`        | Redis password                   | -       | ❌            |
| `CACHE__REDIS__TLS_ENABLED`     | Enable TLS for Redis connection  | `false` | ❌            |
| `CACHE__REDIS__TLS_SERVER_NAME` | TLS server name for Redis        | -       | ❌            |

### Valkey

| Variable                         | Description                      | Default | Required      |
|----------------------------------|----------------------------------|---------|---------------|
| `CACHE__VALKEY__HOSTS`           | Comma-separated Valkey hosts     | -       | ✅ (if Valkey) |
| `CACHE__VALKEY__PASSWORD`        | Valkey password                  | -       | ❌             |
| `CACHE__VALKEY__TLS_ENABLED`     | Enable TLS for Valkey connection | `false` | ❌             |
| `CACHE__VALKEY__TLS_SERVER_NAME` | TLS server name for Valkey       | -       | ❌             |

**Example:**

```bash
CACHE__TYPE=redis
CACHE__REDIS__HOSTS=localhost:6379
CACHE__REDIS__PASSWORD=root
```

## Events Configuration

Safebucket supports multiple event systems for real-time notifications. Events are configured separately from storage
and use a queue-based architecture for different event types.

### NATS JetStream

| Variable                  | Description       | Default | Required         |
|---------------------------|-------------------|---------|------------------|
| `EVENTS__TYPE`            | Event system type | -       | ✅                |
| `EVENTS__JETSTREAM__HOST` | NATS host         | -       | ✅ (if JetStream) |
| `EVENTS__JETSTREAM__PORT` | NATS port         | -       | ✅ (if JetStream) |

### Queue Configuration

Safebucket uses multiple queues for different event types:

| Variable                                | Description                    | Required         |
|-----------------------------------------|--------------------------------|------------------|
| `EVENTS__QUEUES__NOTIFICATIONS__NAME`   | User notification events queue | ✅ (if JetStream) |
| `EVENTS__QUEUES__BUCKET_EVENTS__NAME`   | Bucket event notifications     | ✅ (if JetStream) |
| `EVENTS__QUEUES__OBJECT_DELETION__NAME` | Object deletion events queue   | ✅ (if JetStream) |

**Example:**

```bash
EVENTS__TYPE=jetstream
EVENTS__JETSTREAM__HOST=localhost
EVENTS__JETSTREAM__PORT=4222

# Queue names
EVENTS__QUEUES__NOTIFICATIONS__NAME=safebucket-notifications
EVENTS__QUEUES__BUCKET_EVENTS__NAME=safebucket-bucket-events
EVENTS__QUEUES__OBJECT_DELETION__NAME=safebucket-object-deletion
```

### Google Cloud Pub/Sub

| Variable                           | Description                     | Default | Required   |
|------------------------------------|---------------------------------|---------|------------|
| `EVENTS__TYPE`                     | Event system type               | -       | ✅          |
| `EVENTS__GCP__PROJECT_ID`          | GCP project ID                  | -       | ✅ (if GCP) |
| `EVENTS__GCP__SUBSCRIPTION_SUFFIX` | Suffix for PubSub subscriptions | `-sub`  | ❌          |

### AWS SQS

| Variable                  | Description       | Default | Required   |
|---------------------------|-------------------|---------|------------|
| `EVENTS__TYPE`            | Event system type | -       | ✅          |
| `EVENTS__AWS__REGION`     | AWS region        | -       | ✅ (if AWS) |
| `EVENTS__AWS__ACCOUNT_ID` | AWS account ID    | -       | ✅ (if AWS) |
| `EVENTS__AWS__SQS_NAME`   | SQS queue name    | -       | ✅ (if AWS) |

## Email Configuration

### SMTP Settings

| Variable                          | Description           | Default | Required |
|-----------------------------------|-----------------------|---------|----------|
| `NOTIFIER__TYPE`                  | Notification type     | `smtp`  | ✅        |
| `NOTIFIER__SMTP__HOST`            | SMTP server host      | -       | ✅        |
| `NOTIFIER__SMTP__PORT`            | SMTP server port      | -       | ✅        |
| `NOTIFIER__SMTP__USERNAME`        | SMTP username         | -       | ❌        |
| `NOTIFIER__SMTP__PASSWORD`        | SMTP password         | -       | ❌        |
| `NOTIFIER__SMTP__SENDER`          | From email address    | -       | ✅        |
| `NOTIFIER__SMTP__ENABLE_TLS`      | Enable TLS            | `true`  | ❌        |
| `NOTIFIER__SMTP__SKIP_VERIFY_TLS` | Skip TLS verification | `false` | ❌        |

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

| Variable                          | Description                            | Default | Required              |
|-----------------------------------|----------------------------------------|---------|-----------------------|
| `ACTIVITY__TYPE`                  | Activity provider type (`filesystem`, `loki`) | -       | ✅                     |
| `ACTIVITY__FILESYSTEM__DIRECTORY` | Directory for storing activity index   | -       | ✅ (if filesystem)     |
| `ACTIVITY__LOKI__ENDPOINT`        | Loki endpoint URL (must be valid HTTP) | -       | ✅ (if loki)           |

**Example (Filesystem):**

```bash
ACTIVITY__TYPE=filesystem
ACTIVITY__FILESYSTEM__DIRECTORY=./data/activity
```

**Example (Loki):**

```bash
ACTIVITY__TYPE=loki
ACTIVITY__LOKI__ENDPOINT=http://localhost:3100
```

For detailed provider configuration, see the [Activity Providers](./activity-providers) page.

## Complete Example

Here's a complete example of environment variables for a local development setup:

```bash
# Application
APP__LOG_LEVEL=info
APP__API_URL=http://localhost:8080
APP__WEB_URL=http://localhost:8080
APP__PORT=8080
APP__JWT_SECRET=6n5o+dFncio8gQA4jt7pUJrJz92WrqD25zXAa8ashxA
APP__ADMIN_EMAIL=admin@safebucket.io
APP__ADMIN_PASSWORD=ChangeMePlease
APP__ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080
APP__TRUSTED_PROXIES=127.0.0.1,::1
APP__TRASH_RETENTION_DAYS=7
APP__STATIC_FILES__ENABLED=true
APP__STATIC_FILES__DIRECTORY=web/dist

# Database
DATABASE__HOST=localhost
DATABASE__PORT=5432
DATABASE__USER=safebucket-user
DATABASE__PASSWORD=safebucket-password
DATABASE__NAME=safebucket
DATABASE__SSLMODE=disable

# Cache (Valkey)
CACHE__TYPE=valkey
CACHE__VALKEY__HOSTS=localhost:6379
CACHE__VALKEY__PASSWORD=safebucket-password

# Storage (RustFS)
STORAGE__TYPE=rustfs
STORAGE__RUSTFS__BUCKET_NAME=safebucket
STORAGE__RUSTFS__ENDPOINT=bucket:9000
STORAGE__RUSTFS__EXTERNAL_ENDPOINT=http://localhost:9000
STORAGE__RUSTFS__ACCESS_KEY=rustfsadmin
STORAGE__RUSTFS__SECRET_KEY=rustfsadmin

# Events (NATS JetStream)
EVENTS__TYPE=jetstream
EVENTS__JETSTREAM__HOST=nats
EVENTS__JETSTREAM__PORT=4222
EVENTS__QUEUES__NOTIFICATIONS__NAME=safebucket-notifications
EVENTS__QUEUES__BUCKET_EVENTS__NAME=safebucket-bucket-events
EVENTS__QUEUES__OBJECT_DELETION__NAME=safebucket-object-deletion

# Email (SMTP)
NOTIFIER__TYPE=smtp
NOTIFIER__SMTP__HOST=mailpit
NOTIFIER__SMTP__PORT=1025
NOTIFIER__SMTP__SENDER=notifications@safebucket.io
NOTIFIER__SMTP__ENABLE_TLS=true
NOTIFIER__SMTP__SKIP_VERIFY_TLS=false

# Activity Logging (Loki)
ACTIVITY__TYPE=loki
ACTIVITY__LOKI__ENDPOINT=http://loki:3100

# Authentication - Local Provider
AUTH__PROVIDERS__KEYS=local
AUTH__PROVIDERS__LOCAL__NAME=local
AUTH__PROVIDERS__LOCAL__TYPE=local

# Authentication - OIDC Provider (Optional, commented example)
# AUTH__PROVIDERS__KEYS=local,authelia
# AUTH__PROVIDERS__AUTHELIA__NAME=Authelia
# AUTH__PROVIDERS__AUTHELIA__TYPE=oidc
# AUTH__PROVIDERS__AUTHELIA__OIDC__CLIENT_ID=your-client-id
# AUTH__PROVIDERS__AUTHELIA__OIDC__CLIENT_SECRET=your-client-secret
# AUTH__PROVIDERS__AUTHELIA__OIDC__ISSUER=https://auth.local
# AUTH__PROVIDERS__AUTHELIA__OIDC__SHARING__ENABLED=true
```

## Validation

Safebucket validates all configuration on startup. If required variables are missing or invalid, the application will
exit with detailed error messages.