---
sidebar_position: 2
---

# Storage Providers

Safebucket supports multiple storage providers. The storage provider is directly exposed to the user — files are uploaded and downloaded without passing through the API. Communication is secured via **signed URLs** delivered by the API.

Dedicated providers are **event-driven** and fully optimized. You can also use tested S3-compatible provider via the Generic S3 type, though with less efficient.

:::tip Dedicated providers
Dedicated providers receive real-time event notifications for uploads, deletions and enabling efficient trash management via lifecycle policies. Prefer a dedicated provider when one is available.
:::

## Dedicated Providers

- [**AWS S3**](./aws-s3) — AWS cloud storage with SQS event notifications
- [**Google Cloud Storage**](./google-cloud-storage) — GCP-native storage with Pub/Sub event notifications
- [**MinIO**](./minio) — Self-hosted S3-compatible storage
- [**RustFS**](./rustfs) — High-performance self-hosted storage written in Rust

## Generic

- [**Generic S3**](./generic-s3) — Any S3-compatible provider (Hetzner, Storj, etc.)
