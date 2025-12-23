---
sidebar_position: 2
---

# Storage Providers

Safebucket supports multiple storage providers, allowing you to choose the best option for your needs. This guide covers
configuration for RustFS, MinIO, AWS S3, and Google Cloud Storage.

## Overview

Safebucket's storage abstraction layer allows you to:

- **Switch between providers** without changing your application code
- **Use local storage** (RustFS, MinIO) for complete privacy and performance
- **Use cloud storage** (AWS S3, GCP) for cloud infrastructures
- **Maintain consistent APIs** across all storage backends

## RustFS (Self-Hosted, High Performance)

RustFS is a lightweight, high-performance S3-compatible object storage server written in Rust. It's optimized for speed
and simplicity, making it an excellent choice for self-hosted deployments and production environments where performance
is critical.

### Key Features

- **High Performance**: Written in Rust for maximum speed and efficiency
- **S3 Compatible**: Works with standard S3 client libraries
- **Low Resource Usage**: Minimal memory footprint compared to alternatives
- **Event Notifications**: MQTT-based event system for real-time updates
- **Simple Deployment**: Single binary with minimal configuration

### Configuration

#### Environment Variables

```bash
STORAGE__TYPE=rustfs
STORAGE__RUSTFS__BUCKET_NAME=safebucket
STORAGE__RUSTFS__ENDPOINT=bucket:9000                # Internal Docker network endpoint
STORAGE__RUSTFS__EXTERNAL_ENDPOINT=http://localhost:9000    # Browser-accessible endpoint
STORAGE__RUSTFS__ACCESS_KEY=rustfsadmin
STORAGE__RUSTFS__SECRET_KEY=rustfsadmin
```

**Note on Endpoints:**

- `STORAGE__RUSTFS__ENDPOINT`: Used by Safebucket backend for internal storage operations
- `STORAGE__RUSTFS__EXTERNAL_ENDPOINT`: Used for generating presigned URLs that browsers can access

When running in Docker, these are typically different (Docker hostname vs localhost). When running outside Docker, they
can be the same.

#### YAML Configuration

```yaml
storage:
  type: rustfs
  rustfs:
    bucket_name: safebucket
    endpoint: bucket:9000
    external_endpoint: http://localhost:9000
    access_key: rustfsadmin
    secret_key: rustfsadmin
```

### Event Notifications

RustFS integrates with NATS JetStream via MQTT for real-time file event notifications. Configure these on the RustFS
container itself:

**RustFS Container Environment Variables:**

```bash
RUSTFS_ACCESS_KEY=rustfsadmin
RUSTFS_SECRET_KEY=rustfsadmin
RUSTFS_NOTIFY_MQTT_ENABLE_PRIMARY=true
RUSTFS_NOTIFY_MQTT_BROKER_PRIMARY=mqtt://nats:1883
RUSTFS_NOTIFY_MQTT_TOPIC_PRIMARY=safebucket-bucket-events
RUSTFS_NOTIFY_MQTT_QOS_PRIMARY=2
RUSTFS_NOTIFY_MQTT_QUEUE_DIR_PRIMARY=/data/.rustfs/events
```

**Safebucket Events Configuration:**

```bash
# Storage configuration
STORAGE__TYPE=rustfs
STORAGE__RUSTFS__ENDPOINT=bucket:9000

# Events configuration (separate from storage)
EVENTS__TYPE=jetstream
EVENTS__JETSTREAM__HOST=nats
EVENTS__JETSTREAM__PORT=4222
EVENTS__QUEUES__BUCKET_EVENTS__NAME=safebucket-bucket-events
```

Event notifications enable features like:

- Real-time upload progress
- Activity feed updates
- Bucket change notifications

See the [Environment Variables](./environment-variables#events-configuration) documentation for complete events
configuration.

## MinIO (Self-Hosted)

MinIO is an S3-compatible object storage server that's perfect for local development, testing, and self-hosted
deployments.

### Configuration

#### Environment Variables

```bash
STORAGE__TYPE=minio
STORAGE__MINIO__BUCKET_NAME=safebucket
STORAGE__MINIO__ENDPOINT=bucket:9000                # Internal Docker network endpoint
STORAGE__MINIO__EXTERNAL_ENDPOINT=localhost:9000    # Browser-accessible endpoint
STORAGE__MINIO__CLIENT_ID=minio-root-user
STORAGE__MINIO__CLIENT_SECRET=minio-root-password
```

**Note on Endpoints:**

- `STORAGE__MINIO__ENDPOINT`: Used by Safebucket backend for internal storage operations
- `STORAGE__MINIO__EXTERNAL_ENDPOINT`: Used for generating presigned URLs that browsers can access

When running in Docker, these are typically different (Docker hostname vs localhost). When running outside Docker, they
can be the same.

#### YAML Configuration

```yaml
storage:
  type: minio
  minio:
    bucket_name: safebucket
    endpoint: bucket:9000
    external_endpoint: localhost:9000
    client_id: minio-root-user
    client_secret: minio-root-password
```

### Access MinIO Console

- **URL**: http://localhost:9001
- **Username**: minio-root-user
- **Password**: minio-root-password

### Event Notifications

MinIO integrates with NATS JetStream for real-time file event notifications. These are configured separately via the
`EVENTS__*` environment variables, not as part of the storage configuration.

Event notifications enable features like:

- Real-time upload progress
- Activity feed updates
- Bucket change notifications

**Configuration:**

```bash
# Storage configuration
STORAGE__TYPE=minio
STORAGE__MINIO__ENDPOINT=bucket:9000

# Events configuration (separate from storage)
EVENTS__TYPE=jetstream
EVENTS__JETSTREAM__HOST=nats
EVENTS__JETSTREAM__PORT=4222
EVENTS__QUEUES__BUCKET_EVENTS__NAME=safebucket-bucket-events
```

See the [Environment Variables](./environment-variables#events-configuration) documentation for complete events
configuration.

## AWS S3

Amazon S3 provides enterprise-grade object storage with global availability and advanced features.

### Prerequisites

1. **AWS Account** with S3 access
2. **IAM User** with appropriate permissions
3. **S3 Bucket** created in your preferred region
4. **SQS Queue** for event notifications

### IAM Permissions

Create an IAM policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-safebucket/*",
        "arn:aws:s3:::your-safebucket"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes"
      ],
      "Resource": "arn:aws:sqs:region:account:your-sqs-queue"
    }
  ]
}
```

### Configuration

#### Environment Variables

```bash
# Storage configuration
STORAGE__TYPE=aws
STORAGE__AWS__BUCKET_NAME=your-safebucket
STORAGE__AWS__SQS_NAME=safebucket-sqs

# AWS credentials
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1

# Events configuration
EVENTS__TYPE=aws
EVENTS__AWS__REGION=us-east-1
EVENTS__AWS__ACCOUNT_ID=123456789012
EVENTS__AWS__SQS_NAME=safebucket-sqs
```

#### YAML Configuration

```yaml
storage:
  type: aws
  aws:
    bucket_name: your-safebucket
    sqs_name: safebucket-sqs

events:
  type: aws
  aws:
    region: us-east-1
    account_id: 123456789012
    sqs_name: safebucket-sqs
```

### S3 Event Notifications Setup

1. **Create SQS Queue**:
   ```bash
   aws sqs create-queue --queue-name safebucket-sqs --region us-east-1
   ```

2. **Configure S3 Event Notifications**:
    - Go to S3 Console → Your Bucket → Properties → Event Notifications
    - Create notification for "All object create events" and "All object delete events"
    - Set destination to your SQS queue

3. **Update Queue Policy** to allow S3 to send messages:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Service": "s3.amazonaws.com"
         },
         "Action": "sqs:SendMessage",
         "Resource": "arn:aws:sqs:region:account:safebucket-sqs",
         "Condition": {
           "ArnEquals": {
             "aws:SourceArn": "arn:aws:s3:::your-safebucket"
           }
         }
       }
     ]
   }
   ```

## Google Cloud Storage

Google Cloud Storage offers global object storage with strong consistency and integration with other GCP services.

### Prerequisites

1. **GCP Project** with Storage API enabled
2. **Service Account** with Storage permissions
3. **Storage Bucket** created in your preferred region
4. **Pub/Sub Topic and Subscription** for event notifications

### Service Account Permissions

Create a service account with these roles:

- `Storage Admin` (or custom role with storage.objects.*)
- `Pub/Sub Editor` (for event notifications)

### Configuration

#### Environment Variables

```bash
# Storage configuration
STORAGE__TYPE=gcp
STORAGE__GCP__BUCKET_NAME=safebucket-gcp
STORAGE__GCP__PROJECT_ID=your-project-id
STORAGE__GCP__TOPIC_NAME=safebucket-bucket-events
STORAGE__GCP__SUBSCRIPTION_NAME=safebucket-bucket-events-sub

# Service account credentials
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Events configuration
EVENTS__TYPE=gcp
EVENTS__GCP__PROJECT_ID=your-project-id
EVENTS__GCP__TOPIC_NAME=safebucket-notifications
EVENTS__GCP__SUBSCRIPTION_NAME=safebucket-notifications-sub
```

#### YAML Configuration

```yaml
storage:
  type: gcp
  gcp:
    bucket_name: safebucket-gcp
    project_id: your-project-id
    topic_name: safebucket-bucket-events
    subscription_name: safebucket-bucket-events-sub

events:
  type: gcp
  gcp:
    project_id: your-project-id
    topic_name: safebucket-notifications
    subscription_name: safebucket-notifications-sub
```

### GCS Event Notifications Setup

1. **Create Pub/Sub Topic and Subscription**:
   ```bash
   # Create topic
   gcloud pubsub topics create safebucket-bucket-events

   # Create subscription
   gcloud pubsub subscriptions create safebucket-bucket-events-sub \
     --topic=safebucket-bucket-events
   ```

2. **Configure Bucket Notifications**:
   ```bash
   gsutil notification create -t safebucket-bucket-events \
     -f json gs://safebucket-gcp
   ```

3. **Create Service Account and Download Key**:
   ```bash
   # Create service account
   gcloud iam service-accounts create safebucket-storage

   # Add roles
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:safebucket-storage@your-project-id.iam.gserviceaccount.com" \
     --role="roles/storage.admin"

   # Download key
   gcloud iam service-accounts keys create gcs-key.json \
     --iam-account=safebucket-storage@your-project-id.iam.gserviceaccount.com
   ```

## Storage Provider Comparison

| Feature                 | RustFS                                   | MinIO                    | AWS S3                    | Google Cloud Storage      |
|-------------------------|------------------------------------------|--------------------------|---------------------------|---------------------------|
| **Cost**                | Free (self-hosted)                       | Free (self-hosted)       | Pay per usage             | Pay per usage             |
| **Setup Complexity**    | Low                                      | Low                      | Medium                    | Medium                    |
| **Performance**         | Excellent (Rust)                         | Good (Go)                | Good                      | Good                      |
| **Resource Usage**      | Very Low                                 | Low                      | N/A                       | N/A                       |
| **Scalability**         | Limited by hardware                      | Limited by hardware      | Unlimited                 | Unlimited                 |
| **Global Availability** | Single region                            | Single region            | Multi-region              | Multi-region              |
| **Event Notifications** | MQTT/NATS                                | NATS JetStream           | SQS                       | Pub/Sub                   |
| **Best For**            | Production self-hosted, high performance | Development, self-hosted | Production, AWS ecosystem | Production, GCP ecosystem |

## Switching Storage Providers

Safebucket's storage abstraction makes it easy to switch providers:

1. **Update Configuration**: Change storage type and provider-specific settings
2. **Migrate Data**: Use provider migration tools if needed
3. **Update Event Configuration**: Switch event system to match storage provider
4. **Restart Application**: Safebucket will use the new provider

### Migration Considerations

- **Data Migration**: Plan for transferring existing files between providers
- **URL Changes**: File URLs will change when switching providers
- **Event System**: Ensure event notifications are properly configured
- **Permissions**: Update access policies and credentials

## Troubleshooting

### Common Issues

#### Connection Errors

```bash
# Test MinIO connection
docker-compose exec bucket mc ping minio

# Test AWS S3 access
aws s3 ls s3://your-safebucket

# Test GCS access  
gsutil ls gs://safebucket-gcp
```

#### Permission Issues

- Verify IAM policies and service account permissions
- Check bucket policies and access controls
- Ensure credentials are correctly configured

#### Event Notification Issues

- Verify event notification configuration
- Check queue/topic permissions
- Monitor event logs for delivery failures

### Debugging

Enable debug logging to troubleshoot storage issues:

```bash
# Check application logs
docker-compose logs -f api
```

## Best Practices

1. **Security**:
    - Use IAM roles instead of access keys when possible
    - Rotate credentials regularly
    - Apply principle of least privilege

2. **Performance**:
    - Choose storage regions close to your users
    - Enable compression for large files
    - Use CDN for frequently accessed content

3. **Reliability**:
    - Enable versioning where supported
    - Set up cross-region replication for critical data
    - Monitor storage health and usage

4. **Cost Optimization**:
    - Use lifecycle policies for data archival
    - Monitor storage usage and costs
    - Choose appropriate storage classes