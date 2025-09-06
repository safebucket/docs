---
sidebar_position: 1
---

# Overview

Welcome to SafeBucket, an open-source secure file sharing platform designed for easy and secure file collaboration
across multiple cloud providers.

## What is Safebucket?

![SafeBucket Homepage](./../static/img/homepage.png)

SafeBucket is a highly scalable secure file sharing platform that integrates with different cloud providers including
AWS S3, Google Cloud Storage, and MinIO. Built for individuals and organizations that need to collaborate on files with
robust security, flexible access controls, and seamless multi-cloud support.

## 🎯 Why Safebucket?

Safebucket eliminates the complexity of secure file sharing by providing a lightweight, stateless solution that
integrates seamlessly with your existing infrastructure.
Plug in your preferred auth providers and eliminate the need for local logins - your users can share files using their
existing corporate identities.

## ✨ Features

- 🔒 **Secure File Sharing**: Create a bucket to start sharing files and folders with colleagues, customers, and teams
- 👥 **Role-Based Access Control**: Fine grained sharing permissions with owner, contributor, and viewer roles
- 🔐 **SSO Integration**: Single sign-on with any/multiple auth providers and manage their sharing capabilities
- 📧 **User Invitation System**: Invite external collaborators via email
- 📊 **Real-Time Activity Tracking**: Monitor file sharing activity with comprehensive audit trails
- ☁️ **Multi-Storage Integration**: Store and share files across AWS S3, GCP Cloud Storage, or MinIO
- 🚀 **Highly Scalable**: Event-driven and cloud native architecture for high-performance operations

## Architecture Overview

![Safebucket architecture](./../static/img/architecture.png)

### Core Components

- **API**: Go-based REST API with Chi router
- **Web Interface**: React-based frontend
- **Storage**: S3 storage with multiple providers support (MinIO, S3, GCP)
- **Event System**: Real-time notifications via NATS JetStream, GCP Pub/Sub, or AWS SQS
- **Activity Logging**: Comprehensive audit trails via Loki
- **Notifier**: Email notifications on events
- **Caching Layer**: Redis/Valkey for performance optimization and rate limiting

## Quick Start

Get SafeBucket running locally in minutes with Docker Compose:

```bash
git clone https://github.com/safebucket/safebucket
cd safebucket/deployments/local
docker compose up -d
```

The application will be available at:

- **API**: http://localhost:1323
- **Web Interface**: http://localhost:3000
- **MinIO Console**: http://localhost:9001
- **Mailpit (Email Testing)**: http://localhost:8025

## What's Next?

- [Get Started](./getting-started/local-deployment) - Set up SafeBucket locally
- [Configuration](./configuration/environment-variables) - Configure your deployment
- [Storage Providers](./configuration/storage-providers) - Set up cloud storage
- [Authentication](./configuration/authentication) - Configure OAuth providers
