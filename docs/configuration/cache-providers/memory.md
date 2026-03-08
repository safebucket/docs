# Memory

The in-memory cache stores all data in the application process. It requires no
external services.

Data is not shared between instances and is lost on restart. This provider is
only suitable for single-instance deployments.

## Configuration

### Environment Variables

```bash
CACHE__TYPE=memory
```

### YAML Configuration

```yaml
cache:
  type: memory
```

| Variable      | Description         | Default | Required |
| ------------- | ------------------- | ------- | -------- |
| `CACHE__TYPE` | Cache provider type | -       | ✅       |
