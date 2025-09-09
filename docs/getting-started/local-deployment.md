---
sidebar_position: 1
---

# Local Deployment

Get SafeBucket running locally in minutes using Docker Compose. This guide will walk you through setting up a complete
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

| Service            | Port       | Purpose              | 
|--------------------|------------|----------------------|
| **SafeBucket API** | 8080       | Main application API |
| **SafeBucket Web** | 3000       | React frontend       |
| **PostgreSQL**     | 5442       | Main database        |
| **MinIO**          | 9000, 9001 | Object storage       |
| **Redis**          | 6379       | Caching layer        |
| **NATS**           | 4222       | Event streaming      |
| **Loki**           | 3100       | Activity logging     |
| **Mailpit**        | 8025, 1025 | Email testing        |
| **Grafana**        | 3200       | Logs visualization   |

## Default Credentials

### Application

- **Admin Email**: admin@safebucket.io
- **Admin Password**: ChangeMePlease

### Infrastructure

- **MinIO Console**: http://localhost:9001
    - **Username**: minio-root-user
    - **Password**: minio-root-password

- **Database**:
    - **Host**: localhost:5442
    - **Username**: root
    - **Password**: root
    - **Database**: safebucket

- **Redis**:
    - **Host**: localhost:6379
    - **Password**: root

## Configuration Files

The local deployment uses these configuration files:

- **`.env`**: Environment variables for Docker Compose
- **`docker-compose.yml`**: Service definitions
- **`config/loki.yaml`**: Loki configuration for logging

## Development Workflow

### Starting/Stopping Services

```bash
# Start all services
docker-compose up -d

# Start specific services
docker-compose up -d db redis minio

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete all data)
docker-compose down -v
```

## Next Steps

- [Configure OIDC providers](../configuration/authentication)
- [Set up cloud storage](../configuration/storage-providers)
- [Configure environment variables](../configuration/environment-variables)
- [Explore the API](../api/overview)
