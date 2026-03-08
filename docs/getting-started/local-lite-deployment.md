---
sidebar_position: 2
---

# Local Lite Deployment

Get Safebucket running locally with minimal dependencies using Docker Compose.
This lightweight deployment uses only 2 containers and is ideal for quick
testing, demos or homelabs.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and
  [Docker Compose](https://docs.docker.com/compose/install/)
- Git for cloning the repository

## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/safebucket/safebucket
   cd safebucket/deployments/local/lite
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

The lite deployment includes only the essential services:

| Service        | Port | Purpose                      |
| -------------- | ---- | ---------------------------- |
| **Safebucket** | 8080 | Main application (API + Web) |
| **RustFS API** | 9000 | Object storage API           |

All other services are replaced by lightweight embedded alternatives:

| Feature           | Implementation    |
| ----------------- | ----------------- |
| **Database**      | SQLite (embedded) |
| **Cache**         | In-memory         |
| **Events**        | In-memory         |
| **Notifications** | Filesystem        |
| **Activity Logs** | Filesystem        |

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

## Configuration Files

The lite deployment uses these configuration files:

- **`.env`**: Environment variables for Docker Compose
- **`docker-compose.yml`**: Service definitions

## Next Steps

- [Local Full Deployment](local-full-deployment) for a production-like setup
  with all services
- [Configure OIDC providers](../configuration/authentication)
- [Set up cloud storage](../configuration/storage-providers)
- [Configure environment variables](../configuration/environment-variables)
- [Explore the API](../api/overview)
