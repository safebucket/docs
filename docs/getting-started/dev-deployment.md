---
sidebar_position: 2
---

# Dev Deployment

The dev deployment provides a complete infrastructure stack without the Safebucket application container, designed for
contributors and developers actively working on the Safebucket codebase.

## Overview

### What's Included

This deployment includes all the infrastructure services Safebucket needs:

- **PostgreSQL 18** - Main database
- **MinIO** - S3-compatible object storage
- **Valkey 9** - Caching layer
- **NATS JetStream** - Event streaming
- **Loki** - Activity logging
- **Mailpit** - Email testing
- **Grafana** (optional) - Logs visualization for debugging

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Go 1.24.x](https://golang.org/dl/) installed locally
- [Node.js 22.x](https://nodejs.org/) (if building the frontend)
- Git for cloning the repository
- At least 1GB RAM available for containers

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/safebucket/safebucket
   cd safebucket/deployments/dev
   ```

2. **Start the infrastructure:**
   ```bash
   docker compose up -d
   ```

3. **Verify services are running:**
   ```bash
   docker compose ps
   ```

4. **Run Safebucket locally:**
   ```bash
   # Build the frontend
   cd web
   npm install
   npm run dev

   # Run the backend
   cd ..
   go run main.go
   ```

5. **Access Safebucket:**
   Open http://localhost:3000 in your browser

## Services Overview

| Service           | Port | Purpose            |
|-------------------|------|--------------------|
| **PostgreSQL**    | 5432 | Main database      |
| **MinIO API**     | 9000 | Object storage API |
| **MinIO Console** | 9001 | MinIO web console  |
| **Valkey**        | 6379 | Caching layer      |
| **NATS**          | 4222 | Event streaming    |
| **Loki**          | 3100 | Activity logging   |
| **Mailpit Web**   | 8025 | Email testing UI   |
| **Mailpit SMTP**  | 1025 | Email testing SMTP |
| **Grafana***      | 3200 | Logs visualization |

\* Grafana only starts with `--profile debug`

## Running Safebucket Locally

### Step-by-Step Guide

#### 1. Start Infrastructure

```bash
cd deployments/dev
docker compose up -d
```

Wait for all services to be healthy:

```bash
docker compose ps
```

You should see `(healthy)` status for database and bucket services.

#### 3. Build Frontend (First Time)

```bash
cd web
npm install
npm run build
cd ..
```

This creates a production build in `web/dist` that the backend will serve.

#### 4. Run Backend

From the project root:

```bash
go run main.go
```

The application will:

1. Connect to the database
2. Run migrations
3. Initialize services
4. Start the HTTP server on port 8080

#### 5. Access the Application

Open http://localhost:3000 and log in with:

- **Email**: admin@safebucket.io
- **Password**: ChangeMePlease

## Connection Endpoints

When running Safebucket locally, use these connection strings:

| Service       | Endpoint                | Credentials                                                     |
|---------------|-------------------------|-----------------------------------------------------------------|
| PostgreSQL    | `localhost:5432`        | User: `root`<br/>Pass: `root`<br/>DB: `safebucket`              |
| MinIO API     | `localhost:9000`        | Access Key: `minio-root-user`<br/>Secret: `minio-root-password` |
| MinIO Console | http://localhost:9001   | Same as API                                                     |
| Valkey        | `localhost:6379`        | Password: `root`                                                |
| NATS          | `localhost:4222`        | No auth                                                         |
| Loki          | `http://localhost:3100` | No auth                                                         |
| Mailpit Web   | http://localhost:8025   | No auth                                                         |
| Mailpit SMTP  | `localhost:1025`        | No auth                                                         |

### Running Tests

```bash
# Run all tests
go test ./...

# Run specific package tests
go test ./internal/services

# Run with coverage
go test -cover ./...
```

### Testing Email

Mailpit captures all emails sent by Safebucket:

1. Open http://localhost:8025
2. Perform actions that send emails (user invites, password resets)
3. View emails in Mailpit UI

### Accessing MinIO Console

Manage buckets and files directly:

1. Open http://localhost:9001
2. Login with:
    - **Access Key**: minio-root-user
    - **Secret Key**: minio-root-password

3. Browse the `safebucket` bucket

## Architecture Differences: Dev vs Local

| Feature              | Dev Deployment                  | Local Deployment           |
|----------------------|---------------------------------|----------------------------|
| **Safebucket App**   | Run locally from source         | Dockerized container       |
| **Purpose**          | Active development              | Testing, demos             |
| **Iteration Speed**  | Fast (no rebuild)               | Slower (rebuild image)     |
| **Debugging**        | Full IDE support                | Log-based                  |
| **Hot Reload**       | Yes (with Air/CompileDaemon)    | No                         |
| **Resource Usage**   | Lower (no app container)        | Higher                     |
| **Container Images** | Official images                 | Same                       |
| **Health Checks**    | Same infrastructure reliability | Same                       |
| **Best For**         | Development, contributing       | Integration testing, demos |

## Configuration Files

The dev deployment uses:

- **`deployments/dev/docker-compose.yml`**: Service definitions
- **`deployments/dev/.env`**: Infrastructure environment variables
- **`config.yaml`** or app-level `.env`: Your local Safebucket configuration

Note: Infrastructure `.env` configures Docker services. App configuration should be set separately when running locally.

## Next Steps

- [Configure OIDC providers](../configuration/authentication)
- [Learn about storage providers](../configuration/storage-providers)
- [Explore environment variables](../configuration/environment-variables)
- [Read the API documentation](../api/overview)
- [Contributing guidelines](../../CONTRIBUTING.md) (if available)
