#!/usr/bin/env bash
# Simple sanity checks: missing YAML, duplicate catalog numbers, etc.
set -euo pipefail
echo "Running catalog verifier.."

# skip if the optional catalog/ directory is absent
if [ ! -d catalog ]; then
  echo "catalog/ directory not found; skipping checks"
  exit 0
fi

dupes=$(grep -rh "^catalog:" catalog | cut -d' ' -f2 | sort | uniq -d)
if [ -n "$dupes" ]; then
  echo "Duplicate catalog numbers: $dupes"
  exit 1
fi
echo "✓ catalog looks good"
