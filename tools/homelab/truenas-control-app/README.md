# truenas-control-app

Starts, stops, or restarts a TrueNAS app and polls for completion status.

## Voice Triggers

- "Hey Cal, Restart Radarr"
- "Hey Cal, Stop Jellyfin"

## Required Services

truenas

## Setup

### Environment Variables

- `TRUENAS_URL`: Your TrueNAS server URL and port
  - Example: `http://192.168.1.100:8080`
- `CAAL_ANNOUNCE_URL`: Your CAAL announcement service URL
  - Example: `http://192.168.1.50:8889`


### n8n Credentials

- **HTTPHEADERAUTH_CREDENTIAL** (`httpHeaderAuth`)
  - n8n credential type: httpHeaderAuth


## Installation

### Via CAAL Tools Panel (Recommended)

1. Open CAAL web interface
2. Click Tools panel (wrench icon)
3. Search for "truenas-control-app"
4. Click Install and follow prompts

### Via Command Line

```bash
curl -s https://raw.githubusercontent.com/CoreWorxLab/caal-tools/main/scripts/install.sh | bash -s truenas-control-app
```

## Usage

Control TrueNAS apps - start, stop, or restart. Parameters: app_name (required, string - the app name like 'radarr' or 'jellyfin'), action (required, string - 'start', 'stop', or 'restart')

## Author

[@cmac86](https://github.com/cmac86)

## Category

homelab

## Tags

homelab, truenas
