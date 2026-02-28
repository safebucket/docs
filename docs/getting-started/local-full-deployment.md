---
sidebar_position: 1
---

# Local Full Deployment

Get Safebucket running locally with the full infrastructure stack using Docker Compose. This deployment includes all
services (caching, event streaming, email testing, and activity logging) for a production-like environment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Git for cloning the repository
- At least 1GB RAM available for containers

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/safebucket/safebucket
   cd safebucket/deployments/local/full
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
