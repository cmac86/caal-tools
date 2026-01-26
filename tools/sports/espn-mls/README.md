# espn-mls

Get MLS scores, schedules, and standings with optional team and conference filtering.

## Voice Triggers

- "Hey Cal, What are the MLS scores?"
- "Hey Cal, When do the Sounders play next?"

## Required Services



## Setup

No environment variables required.

No credentials required.

## Installation

### Via CAAL Tools Panel (Recommended)

1. Open CAAL web interface
2. Click Tools panel (wrench icon)
3. Search for "espn-mls"
4. Click Install and follow prompts

### Via Command Line

```bash
curl -s https://raw.githubusercontent.com/CoreWorxLab/caal-tools/main/scripts/install.sh | bash -s espn-mls
```

## Usage

MLS data suite - scores, standings, and schedule. Parameters: action (required) - 'scores', 'standings', or 'schedule'; team (optional for scores, required for schedule) - team name like 'Sounders', 'LAFC', 'Whitecaps'; conference (optional for standings) - 'eastern' or 'western'. Examples: 'MLS scores', 'where are the Sounders in the standings', 'when do the Whitecaps play next'.

## Author

[@cmac86](https://github.com/cmac86)

## Category

sports

## Tags

sports
