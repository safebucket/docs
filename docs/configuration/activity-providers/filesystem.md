# Filesystem

The Filesystem activity provider stores activity logs locally using [Bleve](https://blevesearch.com/), an embedded full-text search engine written in Go.

## Configuration

### Environment Variables

```bash
ACTIVITY__TYPE=filesystem
ACTIVITY__FILESYSTEM__DIRECTORY=./data/activity
```

### YAML Configuration

```yaml
activity:
  type: filesystem
  filesystem:
    directory: ./data/activity
```

| Variable                          | Description                          | Default | Required |
|-----------------------------------|--------------------------------------|---------|----------|
| `ACTIVITY__TYPE`                  | Activity provider type               | -       | ✅        |
| `ACTIVITY__FILESYSTEM__DIRECTORY` | Directory for storing activity index | -       | ✅        |

:::info Automatic schema migration
The Bleve index schema is managed automatically. Schema migrations are handled transparently when upgrading Safebucket — no manual intervention is required.
:::
