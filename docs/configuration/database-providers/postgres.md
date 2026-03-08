# PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is the recommended database for
production deployments. It provides full concurrency support, connection
pooling, and robust data integrity.

## Configuration

### Environment Variables

| Variable                       | Description         | Default | Required |
| ------------------------------ | ------------------- | ------- | -------- |
| `DATABASE__POSTGRES__HOST`     | PostgreSQL host     | -       | ✅       |
| `DATABASE__POSTGRES__PORT`     | PostgreSQL port     | `5432`  | ❌       |
| `DATABASE__POSTGRES__USER`     | Database username   | -       | ✅       |
| `DATABASE__POSTGRES__PASSWORD` | Database password   | -       | ✅       |
| `DATABASE__POSTGRES__NAME`     | Database name       | -       | ✅       |
| `DATABASE__POSTGRES__SSLMODE`  | SSL connection mode | -       | ❌       |

```bash
DATABASE__TYPE=postgres
DATABASE__POSTGRES__HOST=localhost
DATABASE__POSTGRES__PORT=5432
DATABASE__POSTGRES__USER=safebucket-user
DATABASE__POSTGRES__PASSWORD=safebucket-password
DATABASE__POSTGRES__NAME=safebucket
DATABASE__POSTGRES__SSLMODE=disable
```

### YAML Configuration

```yaml
database:
  type: postgres
  postgres:
    host: localhost
    port: 5432
    user: safebucket-user
    password: safebucket-password
    name: safebucket
    sslmode: disable
```

## SSL Modes

PostgreSQL supports several SSL modes for securing the database connection:

| Mode          | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `disable`     | No SSL — unencrypted connection                                                |
| `require`     | Encrypt the connection but don't verify the server certificate                 |
| `verify-ca`   | Encrypt and verify the server certificate is signed by a trusted CA            |
| `verify-full` | Encrypt, verify the CA, and verify the server hostname matches the certificate |

:::warning
Only use `disable` in development environments. For production, use
`require` or stricter modes.
:::
