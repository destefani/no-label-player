#!/usr/bin/env bash
# Build the catalog, start a local server and expose via Cloudflare Tunnel.
set -euo pipefail

PORT="${PORT:-8080}"

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm ci
fi

npm run build
npx live-server --port="$PORT" . > /tmp/live-server.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID' EXIT

if ! command -v cloudflared >/dev/null; then
  echo "cloudflared not found; please install it first" >&2
  exit 1
fi

echo "Starting Cloudflare Tunnel..."
cloudflared tunnel --url "http://localhost:$PORT"

