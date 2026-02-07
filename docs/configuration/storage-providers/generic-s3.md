# Generic S3

SafeBucket supports S3-compatible storage providers through the generic `s3` storage type. This allows you to use any provider that implements the S3 API, as long as it supports **presigned POST policies** and **CORS**.

:::info Dedicated providers are more optimized
Dedicated storage types (RustFS, MinIO, AWS S3, GCP) are **event-driven** — they receive real-time notifications when files are uploaded or deleted. The generic S3 type relies on other mechanisms, which are less efficient. Trash is also less optimized, as dedicated providers use **lifecycle policies** and **event notifications** to efficiently manage deleted files. If your provider has a dedicated integration, prefer using that over the generic S3 type.
:::

## Provider Compatibility

| Provider | Presigned POST | Status |
|---|---|---|
| Hetzner Object Storage | Yes | Tested |
| Storj | Yes | Tested |
| Garage | Yes | Tested |
| Cloudflare R2 | No | Incompatible |
| OVH Object Storage | No | Incompatible |

## [Hetzner Object Storage](https://www.hetzner.com/storage/object-storage)

Hetzner Object Storage is an affordable S3-compatible storage service hosted in Europe.

### Configuration

```bash
STORAGE__TYPE=s3
STORAGE__S3__BUCKET_NAME=safebucket
STORAGE__S3__ENDPOINT=hel1.your-objectstorage.com
STORAGE__S3__EXTERNAL_ENDPOINT=https://hel1.your-objectstorage.com
STORAGE__S3__USE_TLS=true
STORAGE__S3__ACCESS_KEY=your-access-key
STORAGE__S3__SECRET_KEY=your-secret-key
STORAGE__S3__FORCE_PATH_STYLE=false
```

```yaml
storage:
  type: s3
  s3:
    bucket_name: safebucket
    endpoint: hel1.your-objectstorage.com
    external_endpoint: https://hel1.your-objectstorage.com
    use_tls: true
    access_key: your-access-key
    secret_key: your-secret-key
    force_path_style: false
```

- **endpoint**: `<location>.your-objectstorage.com` without the scheme. Locations: `fsn1` (Falkenstein), `hel1` (Helsinki), `nbg1` (Nuremberg).
- **external_endpoint**: Same as endpoint but with `https://`.
- **force_path_style**: `false` — Hetzner uses virtual-hosted-style URLs.

### CORS

Set up CORS using the AWS CLI:

```bash
aws configure --profile hetzner

aws s3api put-bucket-cors \
  --profile hetzner \
  --bucket safebucket \
  --endpoint-url https://hel1.your-objectstorage.com \
  --cors-configuration '{
    "CORSRules": [
      {
        "AllowedOrigins": ["http://localhost:3000"],
        "AllowedMethods": ["GET", "POST", "PUT", "HEAD"],
        "AllowedHeaders": ["*"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3600
      }
    ]
  }'
```

Replace `AllowedOrigins` with your actual app URL(s).

## [Storj](https://www.storj.io/)

Storj is a decentralized cloud storage network that offers enhanced privacy, security, and global distribution. Files are
encrypted, split into pieces, and distributed across a global network of nodes.

### Prerequisites

1. **Storj Account** at https://storj.io
2. **S3 Credentials** generated from the Storj console
3. **Storage Bucket** created in your Storj project

### Obtaining S3 Credentials

1. Log in to the [Storj Console](https://storj.io)
2. Navigate to **Access** → **S3 Credentials**
3. Click **Create S3 Credentials**
4. Select your bucket and set permissions
5. Copy the **Access Key** and **Secret Key**

### Configuration

```bash
STORAGE__TYPE=s3
STORAGE__S3__BUCKET_NAME=safebucket
STORAGE__S3__ENDPOINT=gateway.storjshare.io
STORAGE__S3__EXTERNAL_ENDPOINT=https://gateway.storjshare.io
STORAGE__S3__USE_TLS=true
STORAGE__S3__ACCESS_KEY=your-access-key
STORAGE__S3__SECRET_KEY=your-secret-key
STORAGE__S3__REGION=us-east-1
STORAGE__S3__FORCE_PATH_STYLE=true
```

```yaml
storage:
  type: s3
  s3:
    bucket_name: safebucket
    endpoint: gateway.storjshare.io
    external_endpoint: https://gateway.storjshare.io
    use_tls: true
    access_key: your-access-key
    secret_key: your-secret-key
    region: us-east-1
    force_path_style: true
```

- **endpoint**: `gateway.storjshare.io` (S3-compatible gateway).
- **force_path_style**: `true` — Storj requires path-style URLs.
- **Credentials**: Generate S3-compatible credentials from the Storj dashboard under **Access > Create S3 Credentials**.

### Regional Considerations

Storj's decentralized network automatically distributes data globally. However, you can choose a satellite (gateway
region) based on your primary user location:

| Satellite | Endpoint | Best For |
|-----------|----------|----------|
| US1 | `gateway.storjshare.io` | Americas |
| EU1 | `gateway.eu1.storjshare.io` | Europe |
| AP1 | `gateway.ap1.storjshare.io` | Asia Pacific |

### CORS

Set up CORS using the AWS CLI:

```bash
aws configure --profile storj

aws s3api put-bucket-cors \
  --profile storj \
  --bucket safebucket \
  --endpoint-url https://gateway.storjshare.io \
  --cors-configuration '{
    "CORSRules": [
      {
        "AllowedOrigins": ["http://localhost:3000"],
        "AllowedMethods": ["GET", "POST", "PUT", "HEAD"],
        "AllowedHeaders": ["*"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3600
      }
    ]
  }'
```

Replace `AllowedOrigins` with your actual app URL(s).

## [Garage](https://garagehq.deuxfleurs.fr/)

Garage is a lightweight, self-hosted S3-compatible distributed storage system designed for self-hosting.

### Configuration

```bash
STORAGE__TYPE=s3
STORAGE__S3__BUCKET_NAME=safebucket
STORAGE__S3__ENDPOINT=localhost:3900
STORAGE__S3__EXTERNAL_ENDPOINT=http://localhost:3900
STORAGE__S3__USE_TLS=false
STORAGE__S3__ACCESS_KEY=your-access-key
STORAGE__S3__SECRET_KEY=your-secret-key
STORAGE__S3__FORCE_PATH_STYLE=true
```

```yaml
storage:
  type: s3
  s3:
    bucket_name: safebucket
    endpoint: localhost:3900
    external_endpoint: http://localhost:3900
    use_tls: false
    access_key: your-access-key
    secret_key: your-secret-key
    force_path_style: true
```

### CORS

Set up CORS using the AWS CLI:

```bash
aws s3api put-bucket-cors \
  --bucket safebucket \
  --endpoint-url http://localhost:3900 \
  --cors-configuration '{
    "CORSRules": [
      {
        "AllowedOrigins": ["http://localhost:8080"],
        "AllowedMethods": ["GET", "POST", "PUT", "HEAD"],
        "AllowedHeaders": ["*"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3600
      }
    ]
  }'
```

Replace `AllowedOrigins` with your actual app URL(s).
