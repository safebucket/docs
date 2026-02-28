# Redis

[Redis](https://redis.io/) is an in-memory data store. The Redis provider connects using the [Rueidis](https://github.com/redis/rueidis) client and supports single-node and cluster topologies.

## Configuration

### Environment Variables

```bash
CACHE__TYPE=redis
CACHE__REDIS__HOSTS=localhost:6379
CACHE__REDIS__PASSWORD=changeme
CACHE__REDIS__TLS_ENABLED=false
CACHE__REDIS__TLS_SERVER_NAME=
```

### YAML Configuration

```yaml
cache:
  type: redis
  redis:
    hosts:
      - localhost:6379
    password: changeme
    tls_enabled: false
    tls_server_name: ""
```

| Variable                       | Description                                            | Default | Required |
|--------------------------------|--------------------------------------------------------|---------|----------|
| `CACHE__TYPE`                  | Cache provider type                                    | -       | ✅        |
| `CACHE__REDIS__HOSTS`          | Comma-separated list of Redis host:port addresses      | -       | ✅        |
| `CACHE__REDIS__PASSWORD`       | Redis password                                         | -       | ❌        |
| `CACHE__REDIS__TLS_ENABLED`    | Enable TLS for the Redis connection                    | `false` | ❌        |
| `CACHE__REDIS__TLS_SERVER_NAME`| TLS server name for certificate verification           | -       | ❌        |
