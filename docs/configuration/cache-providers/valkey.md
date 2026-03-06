# Valkey

[Valkey](https://valkey.io/) is an open-source, high-performance key-value store
forked from Redis. The Valkey provider uses the same
[Rueidis](https://github.com/redis/rueidis) client as the Redis provider and is
fully interchangeable.

## Configuration

### Environment Variables

```bash
CACHE__TYPE=valkey
CACHE__VALKEY__HOSTS=localhost:6379
CACHE__VALKEY__PASSWORD=changeme
CACHE__VALKEY__TLS_ENABLED=false
CACHE__VALKEY__TLS_SERVER_NAME=
```

### YAML Configuration

```yaml
cache:
  type: valkey
  valkey:
    hosts:
      - localhost:6379
    password: changeme
    tls_enabled: false
    tls_server_name: ''
```

| Variable                         | Description                                        | Default | Required |
| -------------------------------- | -------------------------------------------------- | ------- | -------- |
| `CACHE__TYPE`                    | Cache provider type                                | -       | ✅       |
| `CACHE__VALKEY__HOSTS`           | Comma-separated list of Valkey host:port addresses | -       | ✅       |
| `CACHE__VALKEY__PASSWORD`        | Valkey password                                    | -       | ❌       |
| `CACHE__VALKEY__TLS_ENABLED`     | Enable TLS for the Valkey connection               | `false` | ❌       |
| `CACHE__VALKEY__TLS_SERVER_NAME` | TLS server name for certificate verification       | -       | ❌       |
