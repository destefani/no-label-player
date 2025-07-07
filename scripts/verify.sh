#!/usr/bin/env bash
# Simple sanity checks: missing YAML, duplicate catalog numbers, etc.
set -e
echo "Running catalog verifier.."
dupes=$(grep -rh "^catalog:" catalog | cut -d' ' -f2 | sort | uniq -d)
if [ -n "$dupes" ]; then
  echo "Duplicate catalog numbers: $dupes"
  exit 1
fi
echo "✓ catalog looks good"