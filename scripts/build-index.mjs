import fs from 'fs/promises';
import path from 'path';
import yaml from 'yaml';

const CATALOG_DIR = 'catalog';
const BUILD_DIR = 'build';
const albums = [];
const playlists = []; // you can add manual JSON playlists later
const artistsMap = new Map();

async function walkCatalog() {
  try {
    await fs.access(CATALOG_DIR);
  } catch {
    console.warn('catalog/ directory not found; skipping');
    return;
  }
  const folders = await fs.readdir(CATALOG_DIR);
  for (const folder of folders) {
    const metaPath = path.join(CATALOG_DIR, folder, 'album.yaml');
    try {
      const raw = await fs.readFile(metaPath, 'utf8');
      const meta = yaml.parse(raw);
      // ensure cover path is included
      if (!meta.cover) {
        // default to cover.jpg inside the folder
        const defaultCover = path.join(CATALOG_DIR, folder, 'cover.jpg');
        try {
          await fs.access(defaultCover);
          meta.cover = `/${CATALOG_DIR}/${folder}/cover.jpg`;
        } catch {
          // leave undefined if not present
        }
      } else {
        meta.cover = `/${CATALOG_DIR}/${folder}/${meta.cover}`;
      }
      // convert track file → full src path
      const processed = [];
      for (const t of meta.tracks) {
        let file = t.file;
        if (!path.extname(file)) {
          // if extension missing, prefer existing .mp3 or .wav
          const mp3 = path.join(CATALOG_DIR, folder, `${file}.mp3`);
          const wav = path.join(CATALOG_DIR, folder, `${file}.wav`);
          try {
            await fs.access(mp3);
            file = `${file}.mp3`;
          } catch {
            try {
              await fs.access(wav);
              file = `${file}.wav`;
            } catch {
              // leave as is; resulting src may be broken
            }
          }
        }
        const track = {
          ...t,
          src: `/${CATALOG_DIR}/${folder}/${file}`,
          artist: t.artist || meta.artist || 'Unknown',
          album: meta.title,
          cover: meta.cover
        };
        processed.push(track);
        const aName = track.artist;
        if (!artistsMap.has(aName)) {
          artistsMap.set(aName, { name: aName, tracks: [] });
        }
        artistsMap.get(aName).tracks.push(track);
      }
      meta.tracks = processed;
      albums.push(meta);
    } catch (err) {
      console.warn('Skipping', folder, err.message);
    }
  }
}

await walkCatalog();
const artists = Array.from(artistsMap.values()).sort((a, b) =>
  a.name.localeCompare(b.name)
);
await fs.mkdir(BUILD_DIR, { recursive: true });
await fs.writeFile(
  path.join(BUILD_DIR, 'catalog.json'),
  JSON.stringify({ albums, playlists, artists }, null, 2)
);
// during development we serve the player/ directory directly so copy
// the generated index for convenience
await fs.copyFile(
  path.join(BUILD_DIR, 'catalog.json'),
  path.join('player', 'catalog.json')
);
console.log('✓ build/catalog.json generated');