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

Safebucket uses the AWS SDK default credential chain for authentication. Configure credentials using standard AWS
environment variables (`AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) or IAM roles.

SQS queues must be created before starting Safebucket. The queue names are defined in
the [queue configuration](./#queue-configuration).
