# Google Cloud Storage

[Google Cloud Storage](https://cloud.google.com/storage) offers global object storage with strong consistency and integration with other GCP services.

## Prerequisites

1. **GCP Project** with Storage API enabled
2. **Service Account** with Storage permissions
3. **Storage Bucket** created in your preferred region
4. **Pub/Sub Topic and Subscription** for event notifications

## Service Account Permissions

Create a service account with these roles:

- `Storage Admin` (or custom role with storage.objects.*)
- `Pub/Sub Editor` (for event notifications)

## Configuration

### Environment Variables

```bash
# Storage configuration
STORAGE__TYPE=gcp
STORAGE__GCP__BUCKET_NAME=safebucket-gcp
STORAGE__GCP__PROJECT_ID=your-project-id
STORAGE__GCP__TOPIC_NAME=safebucket-bucket-events
STORAGE__GCP__SUBSCRIPTION_NAME=safebucket-bucket-events-sub

# Service account credentials
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Events configuration
EVENTS__TYPE=gcp
EVENTS__GCP__PROJECT_ID=your-project-id
EVENTS__GCP__TOPIC_NAME=safebucket-notifications
EVENTS__GCP__SUBSCRIPTION_NAME=safebucket-notifications-sub
```

### YAML Configuration

```yaml
storage:
  type: gcp
  gcp:
    bucket_name: safebucket-gcp
    project_id: your-project-id
    topic_name: safebucket-bucket-events
    subscription_name: safebucket-bucket-events-sub

events:
  type: gcp
  gcp:
    project_id: your-project-id
    topic_name: safebucket-notifications
    subscription_name: safebucket-notifications-sub
```

## GCS Event Notifications Setup

1. **Create Pub/Sub Topic and Subscription**:
   ```bash
   # Create topic
   gcloud pubsub topics create safebucket-bucket-events

   # Create subscription
   gcloud pubsub subscriptions create safebucket-bucket-events-sub \
     --topic=safebucket-bucket-events
   ```

2. **Configure Bucket Notifications**:
   ```bash
   gsutil notification create -t safebucket-bucket-events \
     -f json gs://safebucket-gcp
   ```

3. **Create Service Account and Download Key**:
   ```bash
   # Create service account
   gcloud iam service-accounts create safebucket-storage

   # Add roles
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:safebucket-storage@your-project-id.iam.gserviceaccount.com" \
     --role="roles/storage.admin"

   # Download key
   gcloud iam service-accounts keys create gcs-key.json \
     --iam-account=safebucket-storage@your-project-id.iam.gserviceaccount.com
   ```
