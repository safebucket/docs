# SMTP

The SMTP notification provider sends HTML emails via an SMTP server. Supports TLS and optional authentication.

## Configuration

### Environment Variables

```bash
NOTIFIER__TYPE=smtp
NOTIFIER__SMTP__HOST=localhost
NOTIFIER__SMTP__PORT=1025
NOTIFIER__SMTP__USERNAME=root
NOTIFIER__SMTP__PASSWORD=root
NOTIFIER__SMTP__SENDER=notifications@safebucket.io
NOTIFIER__SMTP__ENABLE_TLS=false
NOTIFIER__SMTP__SKIP_VERIFY_TLS=false
```

### YAML Configuration

```yaml
notifier:
  type: smtp
  smtp:
    host: localhost
    port: 1025
    username: root
    password: root
    sender: notifications@safebucket.io
    enable_tls: false
    skip_verify_tls: false
```

| Variable                          | Description                  | Default | Required |
|-----------------------------------|------------------------------|---------|----------|
| `NOTIFIER__TYPE`                  | Notification provider type   | -       | ✅        |
| `NOTIFIER__SMTP__HOST`            | SMTP server host             | -       | ✅        |
| `NOTIFIER__SMTP__PORT`            | SMTP server port             | -       | ✅        |
| `NOTIFIER__SMTP__USERNAME`        | SMTP username                | -       | ❌        |
| `NOTIFIER__SMTP__PASSWORD`        | SMTP password                | -       | ❌        |
| `NOTIFIER__SMTP__SENDER`          | From email address           | -       | ✅        |
| `NOTIFIER__SMTP__ENABLE_TLS`      | Enable TLS                   | `false` | ❌        |
| `NOTIFIER__SMTP__SKIP_VERIFY_TLS` | Skip TLS certificate verification | `false` | ❌   |

:::warning
`SKIP_VERIFY_TLS` disables certificate verification. Do not use in production.
:::
