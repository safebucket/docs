# Azure Blob Storage

[Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/) provides
Microsoft's object storage service, with Event Grid powering real-time bucket event
notifications.

## Prerequisites

1. **Azure Subscription**
2. **Resource Group**
3. **Storage Account** created in that resource group
4. **Blob Container** created in that storage account
5. **App Registration** (service principal) or Managed Identity for Safebucket to run
   as

## IAM Permissions

Assign the identity Safebucket runs as these roles on the storage account:

- `Storage Account Key Operator Service Role`, so Safebucket can fetch the account key
  at startup to sign upload/download requests. No account key is stored in
  configuration.
- `Storage Queue Data Contributor`, so Safebucket can poll and publish the
  `bucket_events` queue.

:::info[Event Grid setup]
Creating the Event Grid subscription below is a one-time setup step and may need
broader (Contributor-level) permissions than the roles above.
:::

## Configuration

### Azure Credentials

Safebucket uses
[`DefaultAzureCredential`](https://learn.microsoft.com/azure/developer/go/azure-sdk-authentication).
You can authenticate using any supported method:

- Environment variables (`AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`)
- Azure CLI (`az login`)
- Managed Identity (VM, Container Apps, AKS)
- Workload Identity (AKS)

There is no account-key or connection-string configuration field.

### Environment Variables

```bash
# Storage configuration
STORAGE__TYPE=azure
STORAGE__AZURE__ACCOUNT_NAME=yourstorageaccount
STORAGE__AZURE__CONTAINER_NAME=your-safebucket
STORAGE__AZURE__SUBSCRIPTION_ID=00000000-0000-0000-0000-000000000000
STORAGE__AZURE__RESOURCE_GROUP=your-resource-group

# Azure credentials (or use any method from the credential chain above)
AZURE_TENANT_ID=00000000-0000-0000-0000-000000000000
AZURE_CLIENT_ID=00000000-0000-0000-0000-000000000000
AZURE_CLIENT_SECRET=your-client-secret

# Events configuration
EVENTS__TYPE=azure
EVENTS__AZURE__ACCOUNT_NAME=yourstorageaccount
```

`STORAGE__AZURE__ENDPOINT` / `STORAGE__AZURE__EXTERNAL_ENDPOINT` and
`EVENTS__AZURE__ENDPOINT` are optional, used for custom endpoints (Azurite, sovereign
clouds) and omitted here for brevity.

### YAML Configuration

```yaml
storage:
  type: azure
  azure:
    account_name: yourstorageaccount
    container_name: your-safebucket
    subscription_id: 00000000-0000-0000-0000-000000000000
    resource_group: your-resource-group

events:
  type: azure
  azure:
    account_name: yourstorageaccount
```

## Event Grid Notifications Setup

1. **Create the Storage Queue** that will receive bucket events. Its name must match
   the `bucket_events` queue name in your
   [queue configuration](../event-providers/#queue-configuration):

   ```bash
   az storage queue create \
     --name safebucket-bucket-events \
     --account-name yourstorageaccount \
     --auth-mode login
   ```

   Skipping this step surfaces as a `QueueNotFound` error once Safebucket starts.

2. **Create an Event Grid subscription** on the storage account, filtered to blob
   create and delete events, delivering to that queue:

   ```bash
   az eventgrid event-subscription create \
     --name safebucket-bucket-events-sub \
     --source-resource-id "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Storage/storageAccounts/yourstorageaccount" \
     --endpoint-type storagequeue \
     --endpoint "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Storage/storageAccounts/yourstorageaccount/queueServices/default/queues/safebucket-bucket-events" \
     --included-event-types Microsoft.Storage.BlobCreated Microsoft.Storage.BlobDeleted
   ```
