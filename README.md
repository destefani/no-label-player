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
├─ index.html             # the HTML/CSS/JS UI
├─ config.json            # customize the player name
│
├─ catalog/               # ALL audio & art live here (immutable)
│   └─ 2025-07-demo-album/
│       ├─ cover.jpg
│       ├─ 01-track1.mp3
│       ├─ 02-track2.wav
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
npm run dev            # installs deps on first run, builds catalog.json, serves site on http://localhost:8080
# (run from the repo root so /catalog is served)

# or just set up dependencies and run checks
# npm run setup

# or run live-server manually from the repo root
# npx live-server

### Deploy locally
Run the helper script to build the catalog and start a local server:

```bash
./scripts/local-deploy.sh
```
Set `PORT` to change the default `8080` port.

### Configuration
Edit `config.json` to set the `playerName` that appears in the UI and browser title.
You can also specify `backgroundImages`—an array of URLs—for a random page backdrop.

## ➕ Adding a new release

1. Create `catalog/YYYY-MM-album-slug/`
2. Copy audio files (`01-track.mp3` or `01-track.wav` …) and `cover.jpg`
3. Write `album.yaml`
4. `git add . && git commit`

CI / `npm run build` regenerates `build/catalog.json` for the player.
## ❓ Troubleshooting
If the player shows '?' icons instead of album art or audio won't play,
make sure `live-server` is started from the repository root so the `catalog/` folder is served.

