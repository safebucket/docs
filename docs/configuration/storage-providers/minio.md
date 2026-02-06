# MinIO

[MinIO](https://min.io/docs/minio/linux/index.html) is an S3-compatible object storage server that's perfect for local development, testing, and self-hosted
deployments.

## Configuration

### Environment Variables

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

### YAML Configuration

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

## Access MinIO Console

- **URL**: http://localhost:9001
- **Username**: minio-root-user
- **Password**: minio-root-password

## Event Notifications

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

See the [Environment Variables](../environment-variables#events-configuration) documentation for complete events
configuration.
