---
sidebar_position: 4
---

# Notification Providers

Safebucket supports multiple notification providers for delivering notifications (invitations, password resets, file activity).

## Available Providers

- [**Filesystem**](./filesystem) — Writes notifications as JSON files to disk. No external mail server required.
- [**SMTP**](./smtp) — Sends HTML emails via an SMTP server.

:::tip Which provider should I use?
Use the **Filesystem** provider for development and testing. Use **SMTP** for production deployments.
:::
