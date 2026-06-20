---
sidebar_position: 4
---

# Multifactor Authentication (MFA)

Safebucket supports TOTP-based multifactor authentication to add an extra layer
of security to user accounts. Users can enroll authenticator apps such as
Google Authenticator, Authy, or 1Password to generate time-based one-time
passwords. MFA works across all authentication providers (local, OIDC, and
LDAP) and can be enforced per provider.

## Configuration

### Encryption Key and Token Expiry

These application-wide settings control how MFA secrets are encrypted and how
long the various tokens live.

#### Environment Variables

| Variable                    | Description                                 | Default | Required | Valid Values          |
| --------------------------- | ------------------------------------------- | ------- | -------- | --------------------- |
| `APP__MFA_ENCRYPTION_KEY`   | 32-character encryption key for MFA secrets | -       | ✅       | Exactly 32 characters |
| `APP__MFA_TOKEN_EXPIRY`     | MFA token expiry in minutes                 | `5`     | ❌       | `1-30`                |
| `APP__ACCESS_TOKEN_EXPIRY`  | Access token expiry in minutes              | `60`    | ❌       | `1-1440`              |
| `APP__REFRESH_TOKEN_EXPIRY` | Refresh token expiry in minutes             | `600`   | ❌       | `1-720`               |

```yaml
app:
  mfa_encryption_key: your-32-byte-encryption-key
  mfa_token_expiry: 5
  access_token_expiry: 60
  refresh_token_expiry: 600
```

:::warning
`APP__MFA_ENCRYPTION_KEY` must be exactly 32 bytes. Keep this key
safe, losing it will invalidate all enrolled MFA devices.
:::

### Enable MFA per Provider

MFA enforcement is configured per authentication provider using the
`mfa_required` flag. When set on a provider, every user who authenticates
through that provider must complete MFA verification after login before
accessing any resources.

#### Environment Variables

```bash
# Require MFA for users authenticating with the "local" provider
AUTH__PROVIDERS__LOCAL__MFA_REQUIRED=true
```

#### YAML Configuration

```yaml
auth:
  providers:
    local:
      type: local
      mfa_required: true
    myldap:
      type: ldap
      mfa_required: true
```

:::info
The application-wide `app.mfa_required` setting is deprecated. On startup, if it
is set to `true`, it is automatically applied to your local providers
(`type: local`). Set `mfa_required` directly on each provider instead.
:::

## How It Works

### Authentication Flow with MFA

1. A user logs in through their provider (local password, OIDC, or LDAP)
2. If the provider has `mfa_required: true` **or** the user has enrolled MFA
   devices, a restricted MFA token is issued instead of a full access token
3. The user provides a 6-digit TOTP code from their authenticator app
4. After successful verification, a full access token is issued

### Optional vs Required MFA

- **`mfa_required: false`** (default): Users can optionally enroll MFA devices.
  If they have enrolled devices, MFA verification is required at login. Users
  without devices skip MFA.
- **`mfa_required: true`**: All users on that provider must complete MFA
  verification. Users without enrolled devices will be prompted to set up a
  device before they can access the application.

## Enrolling a Device

After logging in with MFA enabled, you are prompted to set up a TOTP device.

### 1. Name your device

Enter a name for the device (defaults to "authenticator").

<img src="/mfa/1.png" alt="Name your device" width="400" />

### 2. Scan the QR code

Scan the QR code with your authenticator app (Google Authenticator, Authy,
1Password, etc.) or copy the secret manually.

<img src="/mfa/2.png" alt="QR code" width="400" />

### 3. Enter the verification code

Enter the 6-digit code displayed in your authenticator app to verify the device.

![Enter code](/mfa/3.png)

### 4. Device enrolled

Once verified, the device appears on your profile page. You can manage your
enrolled devices from there.

![Devices on profile](/mfa/4.png)

## Security Considerations

- TOTP secrets are encrypted at rest using AES with the configured
  `APP__MFA_ENCRYPTION_KEY`
- TOTP codes have replay protection, each code can only be used once per device
- Password confirmation is required to add or remove MFA devices
- Email notifications are sent when devices are enrolled or removed
