# truenas-control-app

Control TrueNAS apps - start, stop, or restart. Parameters: app_name (required, string - the app name like 'radarr' or 'jellyfin'), action (required, string - 'start', 'stop', or 'restart')

## Voice Triggers

- "Hey Cal, start radarr on truenas""
- "Hey Cal, stop homepage app on truenas""

## What It Does

Control TrueNAS apps - start, stop, or restart. Parameters: app_name (required, string - the app name like 'radarr' or 'jellyfin'), action (required, string - 'start', 'stop', or 'restart')

## Requirements

- truenas instance
- API key for authentication

## Installation

### Quick Install

```bash
curl -s https://raw.githubusercontent.com/CoreWorxLab/caal-tools/main/scripts/install.sh | bash -s truenas-control-app
```

### Manual

1. Download `workflow.json`
2. Import into n8n (Settings > Import from File)
3. Create credential "TRUENAS API Key"
4. Update service URL: `TRUENAS_URL`
5. Activate the workflow

## Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `TRUENAS_URL` | Your service URL | `http://192.168.86.245` |
| `CAAL_WEBHOOK_URL` | Your service URL | `http://192.168.86.47:8889` |

## Example Response

> "TODO: Add example of what CAAL says"
