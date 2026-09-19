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
await import('../pitch/build.mjs');
await mkdir(new URL('dist/pitch/',root),{recursive:true});
for (const [source,target] of [
  ['pitch/dist/index.html','pitch/index.html'],
  ['pitch/dist/deck.js','pitch/deck.js'],
  ['pitch/media/tulsa-housing-pitch.mp4','pitch/tulsa-housing-pitch.mp4'],
  ['pitch/media/tulsa-housing-pitch.pdf','pitch/tulsa-housing-pitch.pdf'],
  ['assets/demo-request.png','assets/demo-request.png'],
  ['assets/demo-review.png','assets/demo-review.png'],
  ['assets/demo-match.png','assets/demo-match.png'],
]) await copyFile(new URL(source,root),new URL(`dist/${target}`,root));
console.log('Added animated pitch, video and PDF.');
