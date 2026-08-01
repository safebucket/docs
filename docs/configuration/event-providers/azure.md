# Azure Storage Queues

[Azure Storage Queues](https://learn.microsoft.com/azure/storage/queues/) is Azure's
managed message queuing service.

## Configuration

### Environment Variables

```bash
EVENTS__TYPE=azure
EVENTS__AZURE__ACCOUNT_NAME=yourstorageaccount
```

### YAML Configuration

```yaml
events:
  type: azure
  azure:
    account_name: yourstorageaccount
```

| Variable                      | Description           | Default | Required |
| ----------------------------- | --------------------- | ------- | -------- |
| `EVENTS__TYPE`                | Event provider type   | -       | ✅       |
| `EVENTS__AZURE__ACCOUNT_NAME` | Azure storage account | -       | ✅       |

Safebucket uses
[`DefaultAzureCredential`](https://learn.microsoft.com/azure/developer/go/azure-sdk-authentication)
for authentication. You can authenticate using any supported method:

- Environment variables (`AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`)
- Azure CLI (`az login`)
- Managed Identity (VM, Container Apps, AKS)
- Workload Identity (AKS)

The identity used also needs the `Storage Queue Data Contributor` role on the storage
account.

Storage Queues must be created before starting Safebucket. The queue names are defined
in the [queue configuration](./#queue-configuration).
