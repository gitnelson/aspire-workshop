import { mkdir, copyFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const files = [
  'index.html', 'styles.css', 'app.js',
  'assets/hero.webp', 'assets/firm-team.webp', 'assets/school-team.webp',
  'assets/inter-latin.woff2', 'assets/newsreader-latin.woff2',
  'assets/inter-LICENSE.txt', 'assets/newsreader-LICENSE.txt',
];
await mkdir(new URL('dist/assets/', root), { recursive: true });
await Promise.all(files.map(file => copyFile(new URL(file, root), new URL(`dist/${file}`, root))));
await writeFile(new URL('dist/.nojekyll', root), '');
console.log(`Prepared ${files.length} public files for GitHub Pages.`);
