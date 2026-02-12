---
sidebar_position: 3
---

# Activity Providers

Safebucket supports multiple activity providers for storing and querying user activity logs (file uploads, downloads, deletions, etc.).

## Available Providers

- [**Filesystem**](./filesystem) — Local file-based storage using the Bleve embedded search engine. No external services required.
- [**Loki**](./loki) — Grafana Loki for scalable, production-grade log aggregation.

:::tip Which provider should I use?
Use the **Filesystem** provider for simple, light setups where you want a small footprint. Use **Loki** for scalable or production deployments.
:::
