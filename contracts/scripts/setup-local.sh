#!/bin/bash
# Setup local Soroban sandbox and fund deployer account

set -e

NETWORK="local"
DEPLOYER_SECRET="${DEPLOYER_SECRET:-}" # Set this in your environment or pass as env var

if [ -z "$DEPLOYER_SECRET" ]; then
  echo "DEPLOYER_SECRET environment variable not set."
  exit 1
fi

# Start Soroban sandbox (if not running)
if ! pgrep -f "soroban serve" > /dev/null; then
  echo "Starting Soroban sandbox..."
  soroban serve --network $NETWORK &
  sleep 2
fi

# Fund deployer account
soroban auth fund-account --network $NETWORK --source $DEPLOYER_SECRET || true

echo "Local Soroban sandbox setup complete."
