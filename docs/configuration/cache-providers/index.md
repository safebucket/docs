---
sidebar_position: 4
---

# Cache Providers

Safebucket uses a cache layer for rate limiting, distributed locking, MFA
attempt tracking, and notification batching. Three cache backends are supported.

## Available Providers

- [**Memory**](./memory): In-process cache with no external dependencies.
  Single-instance only.
- [**Redis**](./redis): Redis server for distributed, multi-instance
  deployments.
- [**Valkey**](./valkey): Valkey server, an open-source Redis alternative. Same
  feature set as the Redis provider.

:::tip Which provider should I use?
Use **Memory** for local development or
single-instance setups. Use **Redis** or **Valkey** for production deployments
with multiple instances.
:::
