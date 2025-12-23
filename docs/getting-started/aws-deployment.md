---
sidebar_position: 1
---

# AWS Deployment

## Architecture

![Safebucket AWS architecture](../../static/img/aws-architecture.svg)

# Safebucket AWS Deployment Guide

Complete AWS deployment documentation for Safebucket, covering both basic infrastructure and ECS deployment options.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Quick Start](#quick-start)
- [Infrastructure Components](#infrastructure-components)
- [ECS Deployment](#ecs-deployment)
- [Configuration Reference](#configuration-reference)
- [Post-Deployment](#post-deployment)
- [Monitoring & Logging](#monitoring--logging)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Cleanup](#cleanup)

## Architecture Overview

Safebucket on AWS provides a complete cloud storage solution with two deployment options:

### Basic Infrastructure
- **S3 Bucket** - Primary storage backend with event notifications
- **RDS PostgreSQL** - Database backend with automated backups and monitoring
- **ElastiCache Redis Cluster** - Caching and session storage with user authentication
- **SQS Queues** - Event processing and notifications
- **IAM Roles & Policies** - Secure access control
- **Security Groups** - Network-level security
- **CloudWatch Logging** - Monitoring and observability

### ECS Deployment (Additional Components)
- **ECS Fargate Cluster** with 3 services
- **Application Load Balancer** for public access
- **Internal Load Balancer** for service communication
- **Secrets Manager** for sensitive data
- **Service Discovery** for internal service communication
- **VPC Endpoints** for secure AWS service communication

### Services (ECS Only)
1. **Safebucket** (256 CPU units / 0.25 vCPU, 512 MB) - Port 8080
2. **Loki** (512 CPU units / 0.5 vCPU, 1024 MB) - Port 3100 (Internal only)
3. **Mailpit** (256 CPU units / 0.25 vCPU, 512 MB) - Ports 8025, 1025

## Quick Start

### Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) >= 1.0
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate permissions
- AWS account with necessary service limits
- For ECS: Docker image built and pushed to ECR/Docker Hub

### 1. Configure Infrastructure

```bash
cd deployments/aws/terraform

# Copy and customize the configuration
cp terraform.tfvars.example terraform.tfvars
vim terraform.tfvars
```

### 2. Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Review the planned changes
terraform plan

# Apply the configuration
terraform apply
```

### 3. Get Configuration Values

```bash
# View all outputs
terraform output

# Get specific values
terraform output rds_endpoint
terraform output redis_endpoint
terraform output s3_bucket_name
```

## Infrastructure Components

### S3 Storage
- **Bucket**: Primary object storage with AES256 server-side encryption
- **Security**: Public access blocked, CORS configured for web application
- **Events**: Automatic notifications to SQS for object create/delete operations
- **Network**: Private access through application IAM role

### RDS PostgreSQL Database
- **Engine**: PostgreSQL 15.4 with automated backups
- **Storage**: GP3 storage with encryption at rest, auto-scaling enabled
- **Monitoring**: Enhanced monitoring with 60-second intervals, Performance Insights enabled
- **Security**: Private subnets only, VPC security groups
- **Parameters**: Optimized configuration with statement logging and pg_stat_statements

### ElastiCache Redis
- **Type**: Redis 7 cluster with user-based authentication
- **Security**: Private subnets, encrypted at rest and in transit
- **Monitoring**: CloudWatch slow query logging
- **Backup**: Automated snapshots with configurable retention
- **Parameters**: LRU eviction policy, optimized for caching

### Message Queues
- **S3 Events Queue**: Processes S3 object create/delete events
- **Notifications Queue**: General application notifications
- **Configuration**: 14-day message retention, long polling enabled
- **Security**: Resource-specific access policies

### Security & Networking
- **VPC**: Uses default VPC with all available subnets
- **Security Groups**: Minimal access - PostgreSQL (5432), Redis (6379)
- **IAM**: Least-privilege application role for EC2 and ECS
- **Encryption**: All data encrypted at rest and in transit

## ECS Deployment

The ECS deployment extends the basic infrastructure with containerized services.

### Networking
- **VPC**: Uses default VPC and subnets
- **Security Groups**:
    - ECS tasks security group (ports 8080, 3100, 8025, 1025)
    - ALB security group (ports 80, 443, 8025)


### ECS Services Configuration

All services run on **AWS Fargate** with automated health checks and logging to CloudWatch.

#### Safebucket Service
- **Resources**: 256 CPU units (0.25 vCPU), 512 MB memory (configurable)
- **Port**: 8080
- **Health Check**: `GET /` (expects 200)
- **Auto-scaling**: CPU/memory-based (optional)

#### Loki Service
- **Resources**: 512 CPU units (0.5 vCPU), 1024 MB memory (configurable)
- **Port**: 3100
- **Health Check**: `GET /ready` (expects 200)
- **Storage**: S3 bucket for log storage
- **Access**: Internal only via Service Discovery

#### Mailpit Service
- **Resources**: 256 CPU units (0.25 vCPU), 512 MB memory (configurable)
- **Ports**: 8025 (web UI), 1025 (SMTP)
- **Health Check**: `GET /` (expects 200)
- **Purpose**: SMTP testing and development emails

## Configuration Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `s3_bucket_name` | S3 bucket name (globally unique) | `safebucket-storage-prod-xyz` |
| `s3_event_queue_name` | SQS queue for S3 events | `safebucket-s3-events-prod` |
| `notification_queue_name` | SQS queue for notifications | `safebucket-notifications-prod` |
| `redis_auth_token` | Redis authentication password (32+ chars) | `secure-password-here` |
| `rds_password` | PostgreSQL database password | `secure-db-password` |

### ECS-Specific Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `safebucket_image` | Container image for Safebucket | `your-account.dkr.ecr.region.amazonaws.com/safebucket:latest` |
| `jwt_secret` | JWT signing secret (32+ chars) | `your-jwt-secret-32-chars-minimum-here` |
| `admin_password` | Default admin user password | `your-admin-password-here-12342` |

### Optional Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | `safebucket` | Project identifier for resource naming |
| `environment` | string | `dev` | Environment name (dev, staging, prod) |
| `s3_cors_allowed_origins` | list(string) | `["http://localhost:3000"]` | CORS allowed origins for S3 |

#### Redis Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `redis_node_type` | `cache.t3.micro` | ElastiCache instance type |
| `redis_num_cache_nodes` | `1` | Number of cache nodes |
| `redis_auth_token_enabled` | `true` | Enable Redis authentication |
| `redis_snapshot_retention_limit` | `5` | Backup retention days |
| `redis_snapshot_window` | `03:00-05:00` | Daily backup window (UTC) |
| `redis_maintenance_window` | `sun:05:00-sun:07:00` | Weekly maintenance window |
| `redis_log_retention_days` | `7` | CloudWatch log retention days |

#### Database Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `rds_instance_class` | `db.t3.micro` | RDS instance type |
| `rds_allocated_storage` | `20` | Initial storage in GB |
| `rds_max_allocated_storage` | `100` | Maximum auto-scaling storage |
| `rds_database_name` | `safebucket` | Database name |
| `rds_username` | `safebucket` | Database username |
| `rds_backup_retention_period` | `7` | Backup retention days |
| `rds_backup_window` | `03:00-04:00` | Daily backup window (UTC) |
| `rds_maintenance_window` | `sun:04:00-sun:05:00` | Weekly maintenance window |
| `rds_deletion_protection` | `false` | Enable deletion protection |
| `rds_skip_final_snapshot` | `true` | Skip final snapshot on deletion |
| `rds_storage_encrypted` | `true` | Enable storage encryption |

#### ECS Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `safebucket_image` | `docker.io/safebucket/safebucket:latest` | Container image for Safebucket |
| `safebucket_architecture` | `ARM64` | Architecture (X86_64 or ARM64) |
| `safebucket_cpu` | `256` | Safebucket CPU units |
| `safebucket_memory` | `512` | Safebucket memory (MB) |
| `safebucket_desired_count` | `1` | Desired number of tasks |
| `enable_autoscaling` | `false` | Enable ECS auto-scaling |
| `safebucket_min_capacity` | `1` | Autoscaling min capacity |
| `safebucket_max_capacity` | `3` | Autoscaling max capacity |
| `loki_cpu` | `512` | Loki CPU units |
| `loki_memory` | `1024` | Loki memory (MB) |
| `mailpit_cpu` | `256` | Mailpit CPU units |
| `mailpit_memory` | `512` | Mailpit memory (MB) |
| `enable_ecs_exec` | `false` | Enable ECS Exec for debugging |
| `redeployment_trigger` | `"1"` | Force redeployment on image update |

#### Cost Optimization (Spot Instances)

| Variable | Default | Description |
|----------|---------|-------------|
| `enable_spot_instances` | `false` | Enable Spot for Safebucket |
| `spot_instance_percentage` | `100` | % Spot for Safebucket (0-100) |
| `enable_loki_spot_instances` | `false` | Enable Spot for Loki |
| `loki_spot_instance_percentage` | `100` | % Spot for Loki |
| `enable_mailpit_spot_instances` | `false` | Enable Spot for Mailpit |
| `mailpit_spot_instance_percentage` | `100` | % Spot for Mailpit |

#### Email Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `smtp_sender` | `notifications@safebucket.io` | SMTP sender address |
| `admin_email` | `admin@safebucket.io` | Admin email address |

### Environment-Specific Examples

**Development:**
```hcl
project_name = "safebucket"
environment = "dev"
rds_instance_class = "db.t3.micro"
redis_node_type = "cache.t3.micro"
redis_log_retention_days = 3
rds_backup_retention_period = 1
enable_autoscaling = false
```

**Production:**
```hcl
project_name = "safebucket"
environment = "prod"
rds_instance_class = "db.t3.medium"
redis_node_type = "cache.t3.small"
redis_log_retention_days = 30
rds_backup_retention_period = 30
rds_deletion_protection = true
enable_autoscaling = true
safebucket_max_capacity = 5
safebucket_cpu = 1024
safebucket_memory = 2048
```

## Post-Deployment

### Basic Infrastructure

After deploying the infrastructure, configure Safebucket with the output values:

```bash
# Set environment variables for Safebucket
export AWS_REGION="eu-west-1"
export AWS_S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)

# Database configuration
export DATABASE_HOST=$(terraform output -raw rds_endpoint | cut -d: -f1)
export DATABASE_PORT=$(terraform output -raw rds_port)
export DATABASE_NAME=$(terraform output -raw rds_database_name)
export DATABASE_USER="safebucket"
export DATABASE_PASSWORD="your-rds-password"

# Redis configuration
export REDIS_HOST=$(terraform output -raw redis_endpoint)
export REDIS_PORT=$(terraform output -raw redis_port)
export REDIS_PASSWORD="your-redis-auth-token"

# SQS configuration
export AWS_SQS_S3_EVENTS_URL=$(terraform output -raw sqs_s3_events_queue_url)
export AWS_SQS_NOTIFICATIONS_URL=$(terraform output -raw sqs_notifications_queue_url)
```

### ECS Deployment

After successful ECS deployment:

1. **Get application URL:**
   ```bash
   terraform output alb_dns_name
   ```

2. **Login to Safebucket:**
    - URL: `http://<alb-dns-name>`
    - Username: `admin@safebucket.io` (or your `admin_email`)
    - Password: Your `admin_password` from terraform.tfvars

3. **Access Services:**
    - **Safebucket:** `http://<alb-dns-name>`
    - **Mailpit:** `http://<alb-dns-name>:8025`
    - **Loki:** Internal only (access via checking logs in S3 or ECS Exec if needed)

### Environment Variables (ECS Auto-configured)

Safebucket service receives these environment variables automatically:

#### Application Config
- `APP__API_URL`, `APP__WEB_URL`: Load balancer DNS
- `APP__PORT`: 8080
- `APP__STATIC_FILES__ENABLED`: true
- `APP__ADMIN_EMAIL`: From variables
- `APP__ALLOWED_ORIGINS`: Load balancer DNS

#### Database Config
- `DATABASE__HOST`: RDS endpoint
- `DATABASE__PORT`: 5432
- `DATABASE__USER`, `DATABASE__NAME`: From variables
- `DATABASE__SSLMODE`: require

#### Cache Config (Redis with TLS)
- `CACHE__TYPE`: redis
- `CACHE__REDIS__HOSTS`: ElastiCache endpoint:6379
- `CACHE__REDIS__TLS_ENABLED`: true
- `CACHE__REDIS__TLS_SERVER_NAME`: ElastiCache endpoint

#### Storage Config
- `STORAGE__TYPE`: aws
- `STORAGE__AWS__BUCKET_NAME`: S3 bucket name
- `STORAGE__AWS__SQS_NAME`: S3 events queue

#### Events & Messaging
- `EVENTS__TYPE`: aws
- `EVENTS__AWS__SQS_NAME`: S3 events queue
- `NOTIFIER__TYPE`: smtp (via Mailpit)
- `NOTIFIER__TYPE`: smtp (via Mailpit)
- `NOTIFIER__SMTP__HOST`: `safebucket-dev-mailpit` (Service Discovery hostname)

#### Activity Logging
- `ACTIVITY__TYPE`: loki
- `ACTIVITY__LOKI__ENDPOINT`: Internal Loki endpoint

#### Secrets (from AWS Secrets Manager)
- `APP__JWT_SECRET`: JWT signing key
- `APP__ADMIN_PASSWORD`: Admin user password
- `DATABASE__PASSWORD`: RDS password
- `CACHE__REDIS__PASSWORD`: Redis AUTH token

## Monitoring & Logging

### Outputs

The Terraform configuration provides these key outputs:

#### Storage
- `s3_bucket_name` - S3 bucket name
- `s3_bucket_arn` - S3 bucket ARN
- `s3_bucket_domain_name` - S3 bucket domain

#### Database
- `rds_endpoint` - PostgreSQL connection endpoint
- `rds_port` - Database port (5432)
- `rds_database_name` - Database name
- `rds_instance_id` - RDS instance identifier

#### Cache
- `redis_endpoint` - Redis cluster endpoint
- `redis_port` - Redis port (6379)
- `redis_user_group_id` - User group for authentication
- `redis_app_user_id` - Application user ID

#### Messaging
- `sqs_s3_events_queue_url` - S3 events SQS queue URL
- `sqs_notifications_queue_url` - Notifications SQS queue URL

#### Security
- `iam_role_arn` - Application IAM role ARN
- `instance_profile_name` - EC2 instance profile name
- `redis_security_group_id` - Redis security group ID
- `rds_security_group_id` - RDS security group ID

#### ECS-Specific Outputs
- `alb_dns_name` - Public application load balancer DNS
- `ecs_cluster_name` - ECS cluster name
- `ecs_service_names` - List of ECS service names

#### Summary
- `infrastructure_summary` - Complete infrastructure overview

### CloudWatch Integration

#### Logs (ECS Deployment)
- **Safebucket:** `/ecs/safebucket-{env}-safebucket`
- **Loki:** `/ecs/safebucket-{env}-loki`
- **Mailpit:** `/ecs/safebucket-{env}-mailpit`

#### Metrics
- Redis slow query logs with configurable retention
- RDS enhanced monitoring with 60-second intervals
- RDS Performance Insights enabled (7-day retention)
- SQS queue metrics and alarms available

#### Health Checks (ECS)
- **Safebucket:** `GET /` (returns 200)
- **Loki:** `GET /ready` (returns 200)
- **Mailpit:** `GET /` (returns 200)

### Monitoring Tools
- **ECS Console:** Monitor service health, CPU/memory, task logs
- **CloudWatch Metrics:** CPU, memory, network, custom metrics
- **Load Balancer:** Target group health, request metrics

### Automated Backups
- RDS automated backups with 7-day retention (configurable)
- Redis automated snapshots with 5-day retention (configurable)
- S3 versioning enabled for object recovery
- Configurable backup and maintenance windows

### Maintenance Windows
- RDS maintenance: Sunday 4-5 AM UTC (configurable)
- Redis maintenance: Sunday 5-7 AM UTC (configurable)
- Redis snapshot window: 3-5 AM UTC (configurable)
- RDS backup window: 3-4 AM UTC (configurable)

## Security

### Network Security
- All database and cache resources in private subnets (default VPC)
- Security groups restrict access to VPC CIDR blocks only
- No public internet access to RDS or ElastiCache
- Application communicates through IAM roles, not access keys

### Data Protection
- S3 server-side encryption with AES256
- RDS storage encryption enabled by default
- ElastiCache encryption at rest and in transit
- S3 public access blocked at bucket level

### Access Control
- IAM roles with minimal required permissions
- Redis user-based authentication with secure passwords
- Resource-specific access policies for SQS queues
- Support for both EC2 and ECS deployment models

### Authentication & Authorization
- Redis user group with application-specific user
- Database access through username/password
- S3 access through IAM role permissions
- SQS queue policies restrict access to specific resources

### ECS-Specific Security
- **Network:** Services communicate via Service Discovery (Cloud Map) within VPC
- **Encryption:** TLS for Redis, RDS, and S3
- **Secrets:** All sensitive data in AWS Secrets Manager
- **IAM:** Minimal required permissions for each service
- **VPC:** Uses security groups for network isolation

## Troubleshooting

### Common Issues

#### 1. S3 Bucket Already Exists
```
Error: BucketAlreadyExists: The requested bucket name is not available
```
Solution: Choose a globally unique bucket name in `terraform.tfvars`

#### 2. Redis Authentication Issues
```
Error: Authentication failed
```
Solution: Ensure `redis_auth_token` is set and at least 32 characters

#### 3. RDS Connection Issues
```
Error: could not connect to server
```
Solution: Verify security group allows access from your application subnet

#### 4. Parameter Group Family Error
```
Error: InvalidParameterValue: CacheParameterGroupFamily redis7.x is not valid
```
Solution: Already fixed - using `redis7` family

#### 5. VPC Subnet Issues
```
Error: DB Subnet Group doesn't meet availability zone coverage requirement
```
Solution: Ensure your default VPC has subnets in multiple AZs

### ECS-Specific Issues

#### 1. Tasks not starting
```bash
# Check ECS service events
aws ecs describe-services --cluster safebucket-dev-cluster --services safebucket-dev-safebucket

# Check task logs
aws logs get-log-events --log-group-name /ecs/safebucket-dev-safebucket --log-stream-name <stream-name>
```

#### 2. Database connection issues
- Verify RDS security group allows connections from ECS tasks
- Check DATABASE_* environment variables in task definition
- Ensure RDS is in same VPC as ECS tasks

#### 3. Redis connection issues
- Verify ElastiCache security group configuration
- Check TLS settings match between infrastructure and app config
- Validate AUTH token in Secrets Manager

#### 4. Load balancer health checks failing
- Check target group health in EC2 console
- Verify health check path and expected response code
- Ensure security groups allow ALB to reach tasks

### Debugging Commands

```bash
# ECS service status
aws ecs describe-services --cluster <cluster-name> --services <service-name>

# Task details
aws ecs describe-tasks --cluster <cluster-name> --tasks <task-arn>

# CloudWatch logs
aws logs describe-log-streams --log-group-name <log-group>
aws logs get-log-events --log-group-name <log-group> --log-stream-name <stream>

# Secrets Manager
aws secretsmanager get-secret-value --secret-id <secret-name>

# RDS endpoint
aws rds describe-db-instances --db-instance-identifier <db-identifier>
```

### ECS Exec (if enabled)
```bash
# Connect to running Safebucket container
aws ecs execute-command --cluster safebucket-dev-cluster \
  --task <task-id> --container safebucket --interactive --command "/bin/sh"
```

## Scaling

### Manual Scaling (ECS)
```bash
# Update desired count
aws ecs update-service --cluster <cluster> --service <service> --desired-count 3
```

### Auto Scaling (if enabled)
- **CPU-based scaling:** Target 70% average CPU utilization
- **Memory-based scaling:** Target 80% average memory utilization
- **Scale-out cooldown:** 300 seconds
- **Scale-in cooldown:** 300 seconds

## Cost Optimization

### Development Environment
```hcl
# Minimal resources for development
rds_instance_class = "db.t3.micro"
redis_node_type = "cache.t3.micro"
redis_log_retention_days = 3
rds_backup_retention_period = 1
rds_deletion_protection = false
enable_autoscaling = false
```

### Production Environment
```hcl
# Scaled resources for production
rds_instance_class = "db.t3.medium"      # or larger based on load
redis_node_type = "cache.t3.small"       # or larger based on load
redis_log_retention_days = 30
rds_backup_retention_period = 30
rds_deletion_protection = true
enable_autoscaling = true
safebucket_max_capacity = 5
```

## Cleanup

To destroy all infrastructure:

```bash
cd terraform
terraform destroy
```

**⚠️ Warning:** This permanently deletes all data including:
- S3 bucket contents
- PostgreSQL database and all data
- Redis cache data
- All backups and snapshots
- ECS services and logs

Ensure you have backups if needed before destroying infrastructure.
