---
sidebar_position: 2
---

# Database Providers

Safebucket supports two database backends: **PostgreSQL** and **SQLite**. Choose
the one that best fits your deployment needs.

:::tip Which database should I use? Use **PostgreSQL** for production
deployments — it offers full concurrency, connection pooling, and scales with
your workload. Use **SQLite** for lightweight or development deployments where
minimal infrastructure is preferred. :::

## Common Configuration

| Variable         | Description   | Default    | Required |
| ---------------- | ------------- | ---------- | -------- |
| `DATABASE__TYPE` | Database type | `postgres` | ❌       |

## Providers

- [**PostgreSQL**](./postgres) — Full-featured relational database for
  production use
- [**SQLite**](./sqlite) — Embedded file-based database for lightweight
  deployments
