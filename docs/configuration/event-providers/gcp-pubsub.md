# Google Cloud Pub/Sub

[Google Cloud Pub/Sub](https://cloud.google.com/pubsub) is a managed messaging
service for event-driven architectures.

## Configuration

### Environment Variables

```bash
EVENTS__TYPE=gcp
EVENTS__GCP__PROJECT_ID=my-project
EVENTS__GCP__SUBSCRIPTION_SUFFIX=-sub
```

### YAML Configuration

```yaml
events:
  type: gcp
  gcp:
    project_id: my-project
    subscription_suffix: -sub
```

| Variable                           | Description                      | Default | Required |
| ---------------------------------- | -------------------------------- | ------- | -------- |
| `EVENTS__TYPE`                     | Event provider type              | -       | ✅       |
| `EVENTS__GCP__PROJECT_ID`          | GCP project ID                   | -       | ✅       |
| `EVENTS__GCP__SUBSCRIPTION_SUFFIX` | Suffix for Pub/Sub subscriptions | `-sub`  | ❌       |

Safebucket uses
[Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials).
You can authenticate using any supported method:

- `GOOGLE_APPLICATION_CREDENTIALS` environment variable pointing to a service
  account key file
- User credentials via `gcloud auth application-default login`
- Attached service account (GKE, Cloud Run, Compute Engine)

See the
[ADC documentation](https://cloud.google.com/docs/authentication/application-default-credentials)
for all supported methods.

:::info Subscription naming Subscriptions are created using the pattern
`{topic_name}{suffix}`. With the default suffix, a topic named
`safebucket-notifications` gets subscription `safebucket-notifications-sub`. :::
