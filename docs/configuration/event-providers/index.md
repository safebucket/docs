---
sidebar_position: 5
---

# Event Providers

Safebucket uses event providers for asynchronous processing of notifications,
file operations, and storage events.

## Available Providers

- [**NATS JetStream**](./jetstream): Distributed messaging with work-queue
  retention and explicit acknowledgment.
- [**Google Cloud Pub/Sub**](./gcp-pubsub): GCP-native messaging service.
- [**AWS SQS**](./aws-sqs): AWS Simple Queue Service.
- [**Memory**](./memory): In-process event queue using Go channels.
  Single-instance only.

:::tip Which provider should I use?
Use **Memory** for development and testing
(single instance). Use **JetStream**, **GCP Pub/Sub**, or **AWS SQS** for
production deployments.
:::

## Queue Configuration

All event providers require three named queues. These are configured
independently of the provider type.

### Environment Variables

```bash
EVENTS__QUEUES__NOTIFICATIONS__NAME=safebucket-notifications
EVENTS__QUEUES__BUCKET_EVENTS__NAME=safebucket-bucket-events
EVENTS__QUEUES__OBJECT_DELETION__NAME=safebucket-object-deletion
```

### YAML Configuration

```yaml
events:
  queues:
    notifications:
      name: safebucket-notifications
    bucket_events:
      name: safebucket-bucket-events
    object_deletion:
      name: safebucket-object-deletion
```

| Variable                                | Description                  | Default | Required |
| --------------------------------------- | ---------------------------- | ------- | -------- |
| `EVENTS__QUEUES__NOTIFICATIONS__NAME`   | Notification events queue    | -       | ✅       |
| `EVENTS__QUEUES__BUCKET_EVENTS__NAME`   | Storage bucket events queue  | -       | ✅       |
| `EVENTS__QUEUES__OBJECT_DELETION__NAME` | Object deletion events queue | -       | ✅       |

:::info Bucket events
The `bucket_events` queue receives events emitted by the
storage provider (uploads, deletions). Only dedicated storage providers (RustFS,
MinIO, AWS S3, GCP, Generic S3) emit these events. The queue name is still
required in configuration regardless of the storage provider used.
:::
