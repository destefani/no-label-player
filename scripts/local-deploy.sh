#!/usr/bin/env bash
# Build the catalog and serve the player on localhost.
set -euo pipefail

PORT="${PORT:-8080}"

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm ci
fi

npm run build
npx live-server --port="$PORT" --open= .
