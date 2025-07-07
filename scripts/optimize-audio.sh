#!/usr/bin/env bash
# Quick loudness normalisation example using ffmpeg
# Usage: ./scripts/optimize-audio.sh catalog/2025-07-demo-album/*.{mp3,wav}
set -e
for f in "$@"; do
  echo "Processing $f"
  ext="${f##*.}"
  ffmpeg -hide_banner -loglevel error -i "$f" -af loudnorm=I=-14:TP=-1.5:LRA=11 -y "${f%.$ext}-norm.$ext"
done