# Filesystem

The Filesystem notification provider writes notifications as JSON files to disk. Useful for development and testing, no
external mail server required.

## Configuration

### Environment Variables

```bash
NOTIFIER__TYPE=filesystem
NOTIFIER__FILESYSTEM__DIRECTORY=./data/notifications
```

### YAML Configuration

```yaml
notifier:
  type: filesystem
  filesystem:
    directory: ./data/notifications
```

| Variable                          | Description                              | Default | Required |
|-----------------------------------|------------------------------------------|---------|----------|
| `NOTIFIER__TYPE`                  | Notification provider type               | -       | ✅        |
| `NOTIFIER__FILESYSTEM__DIRECTORY` | Directory for storing notification files | -       | ✅        |

:::info
Each notification is stored as a separate `.json` file containing recipient, subject, template name, arguments, and
timestamp.
:::
