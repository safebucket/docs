# AWS S3

[Amazon S3](https://aws.amazon.com/s3/) provides enterprise-grade object storage with global availability and advanced features.

## Prerequisites

1. **AWS Account** with S3 access
2. **IAM User** with appropriate permissions
3. **S3 Bucket** created in your preferred region
4. **SQS Queue** for event notifications

## IAM Permissions

Create an IAM policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-safebucket/*",
        "arn:aws:s3:::your-safebucket"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes"
      ],
      "Resource": "arn:aws:sqs:region:account:your-sqs-queue"
    }
  ]
}
```

## Configuration

### Environment Variables

```bash
# Storage configuration
STORAGE__TYPE=aws
STORAGE__AWS__BUCKET_NAME=your-safebucket
STORAGE__AWS__SQS_NAME=safebucket-sqs

# AWS credentials
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1

# Events configuration
EVENTS__TYPE=aws
EVENTS__AWS__REGION=us-east-1
EVENTS__AWS__ACCOUNT_ID=123456789012
EVENTS__AWS__SQS_NAME=safebucket-sqs
```

### YAML Configuration

```yaml
storage:
  type: aws
  aws:
    bucket_name: your-safebucket
    sqs_name: safebucket-sqs

events:
  type: aws
  aws:
    region: us-east-1
    account_id: 123456789012
    sqs_name: safebucket-sqs
```

## S3 Event Notifications Setup

1. **Create SQS Queue**:
   ```bash
   aws sqs create-queue --queue-name safebucket-sqs --region us-east-1
   ```

2. **Configure S3 Event Notifications**:
    - Go to S3 Console → Your Bucket → Properties → Event Notifications
    - Create notification for "All object create events" and "All object delete events"
    - Set destination to your SQS queue

3. **Update Queue Policy** to allow S3 to send messages:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Service": "s3.amazonaws.com"
         },
         "Action": "sqs:SendMessage",
         "Resource": "arn:aws:sqs:region:account:safebucket-sqs",
         "Condition": {
           "ArnEquals": {
             "aws:SourceArn": "arn:aws:s3:::your-safebucket"
           }
         }
       }
     ]
   }
   ```
