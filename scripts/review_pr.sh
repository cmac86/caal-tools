#!/bin/bash
# Wrapper script for webhook binary to call the Python review script
# Reads payload from stdin and passes to Python script

cd /var/www/caal-tools

# Load environment variables
export GITHUB_TOKEN="${GITHUB_TOKEN}"
export CLAUDE_PATH="${CLAUDE_PATH:-/usr/local/bin/claude}"

# Run the review script, passing stdin through
python3 scripts/review_pr.py
