# No Label Player

A lightweight, self‑hosted web player for our record label — no accounts, no paywalls, just music. Drop it on any static host (Netlify, Vercel, S3 + CloudFront, GitHub Pages) and listeners can stream right away on desktop or mobile.

## ✨ Features

| Feature | Notes |
|---------|-------|
| Scandinavian‑minimal UI | Tailwind‑powered layout inspired by cassette J‑cards |
| Flat‑file catalog | Audio + YAML metadata in `catalog/` folders |
| Zero back‑end | Pure HTML + JS using the native `<audio>` element |
| Album + label playlists | We supply playlists; listeners browse albums |
| One‑click build | `npm run build` converts YAML → `build/catalog.json` |

## 🗂 Repository layout

```
repo-root/
│
├─ player/                # the HTML/CSS/JS UI
│   └─ index.html
│
├─ catalog/               # ALL audio & art live here (immutable)
│   └─ 2025-07-demo-album/
│       ├─ cover.jpg
│       ├─ 01-track1.mp3
│       ├─ 02-track2.mp3
│       └─ album.yaml
│
├─ scripts/
│   ├─ build-index.mjs
│   ├─ optimize-audio.sh
│   └─ verify.sh
│
├─ build/                 # generated; NOT committed
│   └─ catalog.json
│
├─ package.json
└─ README.md
```

## 🚀 Quick start

```bash
git clone <repo-url> && cd <repo>
npm ci
npm run dev            # builds catalog.json + serves site on http://localhost:8080
```

## ➕ Adding a new release

1. Create `catalog/YYYY-MM-album-slug/`
2. Copy audio files (`01-track.mp3` …) and `cover.jpg`
3. Write `album.yaml`
4. `git add . && git commit`

CI / `npm run build` regenerates `build/catalog.json` for the player.