#!/usr/bin/env bash
# Quick loudness normalisation example using ffmpeg
# Usage: ./scripts/optimize-audio.sh catalog/2025-07-demo-album/*.mp3
set -e
for f in "$@"; do
  echo "Processing $f"
  ffmpeg -hide_banner -loglevel error -i "$f" -af loudnorm=I=-14:TP=-1.5:LRA=11 -y "${f%.mp3}-norm.mp3"
done