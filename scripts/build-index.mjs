import fs from 'fs/promises';
import path from 'path';
import yaml from 'yaml';

const CATALOG_DIR = 'catalog';
const BUILD_DIR = 'build';
const albums = [];
const playlists = []; // you can add manual JSON playlists later

async function walkCatalog() {
  const folders = await fs.readdir(CATALOG_DIR);
  for (const folder of folders) {
    const metaPath = path.join(CATALOG_DIR, folder, 'album.yaml');
    try {
      const raw = await fs.readFile(metaPath, 'utf8');
      const meta = yaml.parse(raw);
      // convert track file → full src path
      meta.tracks = meta.tracks.map(t => ({
        ...t,
        src: `${folder}/${t.file}`
      }));
      albums.push(meta);
    } catch (err) {
      console.warn('Skipping', folder, err.message);
    }
  }
}

await walkCatalog();
await fs.mkdir(BUILD_DIR, { recursive: true });
await fs.writeFile(
  path.join(BUILD_DIR, 'catalog.json'),
  JSON.stringify({ albums, playlists }, null, 2)
);
console.log('✓ build/catalog.json generated');