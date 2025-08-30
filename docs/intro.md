---
sidebar_position: 1
---

# Overview

Welcome to SafeBucket, an open-source secure file sharing platform designed for easy and secure file collaboration across multiple cloud providers.

## What is SafeBucket?

![SafeBucket Homepage](./../static/img/homepage.png)

SafeBucket is a highly scalable secure file sharing platform that integrates with different cloud providers including AWS S3, Google Cloud Storage, and MinIO. Built for individuals and organizations that need to collaborate on files with robust security, flexible access controls, and seamless multi-cloud support.

## Key Features

- **🔐 Secure File Sharing**: Share files and folders with colleagues, customers, and teams through secure bucket-based collaboration
- **☁️ Multi-Provider Integration**: Store and share files across AWS S3, GCP Cloud Storage, or MinIO without vendor lock-in
- **🔒 OIDC integration**: Integrate with any OIDC provider and manage their access
- **👥 Role-Based Access Control**: Granular sharing permissions with owner, contributor, and viewer roles
- **📧 User Invitation System**: Invite collaborators via email with secure role-based access to shared buckets
- **📊 Real-Time Activity Tracking**: Monitor file sharing activity with comprehensive audit trails via Loki integration
- **🎨 Modern Sharing Interface**: Intuitive React-based dashboard with drag-and-drop uploads, file previews, and activity monitoring
- **🚀 Developer-Friendly**: RESTful API for building custom file sharing integrations

## Architecture Overview

SafeBucket follows a microservices-inspired architecture with clear separation of concerns:

### Core Components

- **API Server**: Go-based REST API with Chi router
- **Web Interface**: React-based frontend for file management
- **Authentication**: JWT-based auth with OAuth providers support
- **Storage Layer**: Abstracted storage supporting multiple providers
- **Event System**: Real-time notifications via NATS JetStream, GCP Pub/Sub, or AWS SQS
- **Activity Logging**: Comprehensive audit trails via Loki
- **Caching Layer**: Redis/Valkey for performance optimization

### Architecture Diagram

```
                       ┌──────────────────┐
                       │   React Web      │
                       │   Frontend       │
                       └─────────┬────────┘
                                 │
                                 │
                                 │
                    ┌────────────▼────────────┐
                    │      Load Balancer      │
                    │     (nginx/traefik)     │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     SafeBucket API      │
                    │      (Go + Chi)         │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
┌───────▼────────┐     ┌─────────▼────────┐     ┌─────────▼─────────┐
│   PostgreSQL   │     │   Redis/Valkey   │     │   Storage Layer   │
│   (Database)   │     │    (Caching)     │     │   (S3/GCS/MinIO)  │
└────────────────┘     └──────────────────┘     └─────────┬─────────┘
                                                          │
        ┌────────────────────────┬────────────────────────┘
        │                        │
┌───────▼────────┐     ┌─────────▼────────┐
│   Event Bus    │     │  Activity Logger │
│ (NATS/GCP/AWS) │     │      (Loki)      │
└────────────────┘     └──────────────────┘
```

## Quick Start

Get SafeBucket running locally in minutes with Docker Compose:

```bash
git clone https://github.com/safebucket/safebucket
cd safebucket/deployments/local
docker-compose up -d
```

The application will be available at:
- **API**: http://localhost:1323
- **Web Interface**: http://localhost:3001
- **MinIO Console**: http://localhost:9001
- **Mailpit (Email Testing)**: http://localhost:8025

## What's Next?

- [Get Started](./getting-started/local-deployment) - Set up SafeBucket locally
- [Configuration](./configuration/environment-variables) - Configure your deployment
- [Storage Providers](./configuration/storage-providers) - Set up cloud storage
- [Authentication](./configuration/authentication) - Configure OAuth providers
