---
sidebar_position: 4
---

# Multi-Factor Authentication (MFA)

Safebucket supports TOTP-based multi-factor authentication to add an extra layer of security to local accounts. Users can enroll authenticator apps such as Google Authenticator, Authy, or 1Password to generate time-based one-time passwords.

## Configuration

### Enable MFA Requirement

When enabled, all users must complete MFA verification after login before accessing any resources.

#### Environment Variables

```bash
# Require MFA for all users (default: false)
APP__MFA_REQUIRED=true

# Encryption key for storing TOTP secrets (32 bytes, required when MFA is used)
APP__MFA_ENCRYPTION_KEY=your-32-byte-encryption-key
```

#### YAML Configuration

```yaml
app:
  mfa_required: true
  mfa_encryption_key: your-32-byte-encryption-key
```

:::warning
`APP__MFA_ENCRYPTION_KEY` must be exactly 32 bytes. Keep this key safe — losing it will invalidate all enrolled MFA devices.
:::

## How It Works

### Authentication Flow with MFA

1. User logs in with email/password
2. If MFA is required (`mfa_required: true`) **or** the user has enrolled MFA devices, a restricted MFA token is issued instead of a full access token
3. The user provides a 6-digit TOTP code from their authenticator app
4. After successful verification, a full access token is issued

### Optional vs Required MFA

- **`mfa_required: false`** (default): Users can optionally enroll MFA devices. If they have enrolled devices, MFA verification is required at login. Users without devices skip MFA.
- **`mfa_required: true`**: All users must complete MFA verification. Users without enrolled devices will be prompted to set up a device before they can access the application.

## Enrolling a Device

After logging in with MFA enabled, you are prompted to set up a TOTP device.

### 1. Name your device

Enter a name for the device (defaults to "authenticator").

<img src="/mfa/1.png" alt="Name your device" width="400" />

### 2. Scan the QR code

Scan the QR code with your authenticator app (Google Authenticator, Authy, 1Password, etc.) or copy the secret manually.

<img src="/mfa/2.png" alt="QR code" width="400" />

### 3. Enter the verification code

Enter the 6-digit code displayed in your authenticator app to verify the device.

![Enter code](/mfa/3.png)

### 4. Device enrolled

Once verified, the device appears on your profile page. You can manage your enrolled devices from there.

![Devices on profile](/mfa/4.png)

## Security Considerations

- TOTP secrets are encrypted at rest using AES with the configured `APP__MFA_ENCRYPTION_KEY`
- TOTP codes have replay protection — each code can only be used once per device
- Password confirmation is required to add or remove MFA devices
- Email notifications are sent when devices are enrolled or removed
