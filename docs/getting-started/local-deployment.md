---
sidebar_position: 1
---

# Local Deployment

Get Safebucket running locally in minutes using Docker Compose. This guide will walk you through setting up a complete
development environment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Git for cloning the repository
- At least 1GB RAM available for containers

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/safebucket/safebucket
   cd safebucket/deployments/local
   ```

2. **Start the services:**
   ```bash
   docker compose up -d
   ```

3. **Verify the deployment:**
   ```bash
   docker compose ps
   ```

## Services Overview

The local deployment includes the following services:

| Service           | Port       | Purpose                            |
|-------------------|------------|------------------------------------|
| **Safebucket**    | 8080       | Main application (API + Web)       |
| **PostgreSQL**    | 5432       | Main database                      |
| **RustFS API**    | 9000       | Object storage API                 |
| **Valkey**        | 6379       | Caching layer                      |
| **NATS**          | 4222       | Event streaming                    |
| **Loki**          | 3100       | Activity logging                   |
| **Mailpit Web**   | 8025, 1025 | Email testing (Web UI + SMTP)      |

## Default Credentials

### Application

- **Admin Email**: admin@safebucket.io
- **Admin Password**: ChangeMePlease

### Infrastructure

- **RustFS Storage**:
    - **Endpoint**: http://localhost:9000
    - **Access Key**: rustfsadmin
    - **Secret Key**: rustfsadmin
    - **Bucket**: safebucket

- **Database**:
    - **Host**: localhost:5432
    - **Username**: safebucket-user
    - **Password**: safebucket-password
    - **Database**: safebucket

- **Valkey**:
    - **Host**: localhost:6379
    - **Password**: safebucket-password

- **Mailpit** (Email Testing):
    - **Web UI**: http://localhost:8025
    - **SMTP**: localhost:1025 (no auth)

## Accessing Services

### RustFS Storage

RustFS provides S3-compatible storage. To manage buckets and files directly, you can use:

**AWS CLI:**
```bash
# Configure AWS CLI with RustFS credentials
aws configure --profile rustfs
# Access Key: rustfsadmin
# Secret Key: rustfsadmin
# Region: us-east-1
# Output: json

# List files in the safebucket bucket
aws --profile rustfs --endpoint-url http://localhost:9000 s3 ls s3://safebucket

# Upload a file
aws --profile rustfs --endpoint-url http://localhost:9000 s3 cp myfile.txt s3://safebucket/
```

**S3 Browser Tools:**
- Use any S3-compatible client (Cyberduck, S3 Browser, etc.)
- Configure with endpoint `http://localhost:9000` and the credentials above

### Mailpit (Email Testing)

View all emails sent by Safebucket:
1. Open http://localhost:8025 in your browser
2. Perform actions that trigger emails (user invites, password resets, sharing notifications)
3. View captured emails in the Mailpit web interface

## Configuration Files

The local deployment uses these configuration files:

- **`.env`**: Environment variables for Docker Compose
- **`docker-compose.yml`**: Service definitions
- **`config/loki.yaml`**: Loki configuration for logging

## Next Steps

- [Configure OIDC providers](../configuration/authentication)
- [Set up cloud storage](../configuration/storage-providers)
- [Configure environment variables](../configuration/environment-variables)
- [Explore the API](../api/overview)
