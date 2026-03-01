# AWS SQS

[AWS SQS](https://aws.amazon.com/sqs/) is a managed message queuing service.

## Configuration

### Environment Variables

```bash
EVENTS__TYPE=aws
```

### YAML Configuration

```yaml
events:
  type: aws
```

| Variable       | Description         | Default | Required |
|----------------|---------------------|---------|----------|
| `EVENTS__TYPE` | Event provider type | -       | ✅        |

Safebucket uses the [AWS SDK default credential chain](https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html) for authentication. You can authenticate using any supported method:

- Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`)
- Shared credentials file (`~/.aws/credentials`)
- IAM roles (EC2, ECS, Lambda)
- AWS profiles

See the [AWS configuration reference](https://docs.aws.amazon.com/sdkref/latest/guide/settings-reference.html) for all supported variables.

SQS queues must be created before starting Safebucket. The queue names are defined in
the [queue configuration](./#queue-configuration).
