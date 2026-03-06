# SQLite

[SQLite](https://www.sqlite.org/) is a lightweight, file-based database that
requires zero infrastructure. It's a good fit for development, testing, or small
single-instance deployments.

## Configuration

### Environment Variables

| Variable                 | Description               | Default | Required |
| ------------------------ | ------------------------- | ------- | -------- |
| `DATABASE__SQLITE__PATH` | Path to the database file | -       | ✅       |

```bash
DATABASE__TYPE=sqlite
DATABASE__SQLITE__PATH=/data/safebucket.db
```

### YAML Configuration

```yaml
database:
  type: sqlite
  sqlite:
    path: /data/safebucket.db
```

## Docker Volume

When running in Docker, mount a volume to persist the database file:

```yaml
services:
  safebucket:
    volumes:
      - safebucket-data:/data
    environment:
      DATABASE__TYPE: sqlite
      DATABASE__SQLITE__PATH: /data/safebucket.db

volumes:
  safebucket-data:
```
