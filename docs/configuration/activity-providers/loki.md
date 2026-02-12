# Loki

[Grafana Loki](https://grafana.com/oss/loki/) is a horizontally scalable, highly available log ingestion and querying system.

## Configuration

### Environment Variables

```bash
ACTIVITY__TYPE=loki
ACTIVITY__LOKI__ENDPOINT=http://localhost:3100
```

### YAML Configuration

```yaml
activity:
  type: loki
  loki:
    endpoint: http://localhost:3100
```

| Variable                   | Description                            | Default | Required |
|----------------------------|----------------------------------------|---------|----------|
| `ACTIVITY__TYPE`           | Activity provider type                 | -       | ✅        |
| `ACTIVITY__LOKI__ENDPOINT` | Loki endpoint URL (must be valid HTTP) | -       | ✅        |
