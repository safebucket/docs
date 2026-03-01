# NATS JetStream

[NATS JetStream](https://docs.nats.io/nats-concepts/jetstream) provides distributed messaging with work-queue retention
and explicit acknowledgment.

## Configuration

### Environment Variables

```bash
EVENTS__TYPE=jetstream
EVENTS__JETSTREAM__HOST=localhost
EVENTS__JETSTREAM__PORT=4222
```

### YAML Configuration

```yaml
events:
  type: jetstream
  jetstream:
    host: localhost
    port: 4222
```

| Variable                  | Description         | Default | Required |
|---------------------------|---------------------|---------|----------|
| `EVENTS__TYPE`            | Event provider type | -       | ✅        |
| `EVENTS__JETSTREAM__HOST` | NATS server host    | -       | ✅        |
| `EVENTS__JETSTREAM__PORT` | NATS server port    | -       | ✅        |
