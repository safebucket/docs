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
NOTIFIER__SMTP__TLS_MODE=none
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
    tls_mode: none
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
| `NOTIFIER__SMTP__TLS_MODE`        | TLS connection mode (`ssl`, `starttls`, `none`) | `starttls` | ❌        |
| `NOTIFIER__SMTP__SKIP_VERIFY_TLS` | Skip TLS certificate verification | `false` | ❌   |

:::warning
`SKIP_VERIFY_TLS` disables certificate verification. Do not use in production.
:::

## Examples

### Gmail

To use Gmail, you must generate an [App Password](https://support.google.com/accounts/answer/185833) in your Google Account settings. Standard account passwords will not work.

```yaml
notifier:
  type: smtp
  smtp:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-16-digit-app-password
    sender: your-email@gmail.com
    tls_mode: starttls
    skip_verify_tls: false
```
