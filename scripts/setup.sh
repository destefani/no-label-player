#!/usr/bin/env bash
# Install dependencies and verify the catalog.
set -euo pipefail

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm ci
fi

npm run verify
