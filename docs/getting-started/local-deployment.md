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

| Service            | Port       | Purpose              | Health Check                               |
|--------------------|------------|----------------------|--------------------------------------------|
| **SafeBucket API** | 1323       | Main application API | http://localhost:1323/health               |
| **SafeBucket Web** | 3001       | React frontend       | http://localhost:3001                      |
| **PostgreSQL**     | 5442       | Main database        | `docker-compose exec db pg_isready`        |
| **MinIO**          | 9000, 9001 | Object storage       | http://localhost:9001                      |
| **Redis**          | 6379       | Caching layer        | `docker-compose exec redis redis-cli ping` |
| **NATS**           | 4222       | Event streaming      | telnet localhost 4222                      |
| **Loki**           | 3100       | Activity logging     | http://localhost:3100/ready                |
| **Mailpit**        | 8025, 1025 | Email testing        | http://localhost:8025                      |
| **Grafana**        | 3200       | Logs visualization   | http://localhost:3200                      |

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

## Customization

### Environment Variables

You can customize the deployment by modifying the `.env` file:

```bash
# Platform URLs
PLATFORM_API_URL=http://localhost:1323
PLATFORM_WEB_URL=http://localhost:3001

# Storage
MINIO_ROOT_USER=minio-root-user
MINIO_ROOT_PASSWORD=minio-root-password
MINIO_DEFAULT_BUCKETS=safebucket,loki-data,loki-ruler

# Database
POSTGRESQL_USERNAME=root
POSTGRESQL_PASSWORD=root
POSTGRESQL_DATABASE=safebucket

# Cache
CACHE_REDIS_PASSWORD=root

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Admin Account
ADMIN_USERNAME="admin@safebucket.io"
ADMIN_PASSWORD="ChangeMePlease"
```

### OAuth Providers

To enable OAuth authentication, configure these environment variables in `.env`:

```bash
# Enable OAuth providers
AUTH_PROVIDERS_KEYS=google,authelia

# Google OAuth
AUTH_PROVIDERS_GOOGLE_NAME=Google
AUTH_PROVIDERS_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
AUTH_PROVIDERS_GOOGLE_CLIENT_SECRET=your-client-secret
AUTH_PROVIDERS_GOOGLE_ISSUER=https://accounts.google.com

# Custom OIDC Provider (e.g., Authelia)
AUTH_PROVIDERS_AUTHELIA_NAME=Authelia
AUTH_PROVIDERS_AUTHELIA_CLIENT_ID=safebucket
AUTH_PROVIDERS_AUTHELIA_CLIENT_SECRET=your-secret
AUTH_PROVIDERS_AUTHELIA_ISSUER=https://auth.yourdomain.com
```

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

### Viewing Logs

```bash
# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f api

# View logs with timestamps
docker-compose logs -f -t
```

### Accessing Services

```bash
# Execute commands in containers
docker-compose exec db psql -U root -d safebucket
docker-compose exec redis redis-cli
docker-compose exec bucket mc ls

# Access container shell
docker-compose exec api sh
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: If ports are already in use, modify them in `docker-compose.yml`
2. **Out of memory**: Ensure Docker has enough memory allocated (4GB minimum)
3. **Permission issues**: On Linux, you might need to adjust file permissions

### Health Checks

```bash
# Check all container health
docker-compose ps

# Detailed health check
curl http://localhost:1323/health
curl http://localhost:3100/ready
```

### Reset Environment

To start fresh:

```bash
docker-compose down -v
docker-compose pull
docker-compose up -d
```

## Next Steps

- [Configure OAuth providers](../configuration/authentication)
- [Set up cloud storage](../configuration/storage-providers)
- [Configure environment variables](../configuration/environment-variables)
- [Explore the API](../api/overview)
