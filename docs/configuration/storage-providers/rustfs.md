# RustFS

[RustFS](https://github.com/rustfs/rustfs) is a lightweight, high-performance S3-compatible object storage server written in Rust.

## Configuration

### Environment Variables

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

### YAML Configuration

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

## Event Notifications

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

See the [Environment Variables](../environment-variables#events-configuration) documentation for complete events
configuration.
