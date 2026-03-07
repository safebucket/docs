# Memory

The Memory event provider uses in-process Go channels for message delivery. No
external services required.

## Configuration

### Environment Variables

```bash
EVENTS__TYPE=memory
```

### YAML Configuration

```yaml
events:
  type: memory
```

| Variable       | Description         | Default | Required |
| -------------- | ------------------- | ------- | -------- |
| `EVENTS__TYPE` | Event provider type | -       | ✅       |

:::warning
The Memory provider does not persist events across restarts and only
works with a single application instance.
:::
