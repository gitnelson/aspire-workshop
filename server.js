import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Map([['/', ['index.html','text/html']],['/index.html',['index.html','text/html']],['/styles.css',['styles.css','text/css']],['/app.js',['app.js','text/javascript']]]);
for (const name of ['hero','firm-team','school-team']) {
  files.set(`/assets/${name}.webp`, [`assets/${name}.webp`, 'image/webp']);
}
for (const name of ['inter','newsreader']) {
  files.set(`/assets/${name}-latin.woff2`, [`assets/${name}-latin.woff2`, 'font/woff2']);
}
const port = Number(process.env.PORT || 4173);
files.set('/pitch/', ['pitch/dist/index.html','text/html']);
files.set('/pitch/index.html', ['pitch/dist/index.html','text/html']);
files.set('/pitch/deck.js', ['pitch/dist/deck.js','text/javascript']);
files.set('/pitch/tulsa-housing-pitch.mp4', ['pitch/media/tulsa-housing-pitch.mp4','video/mp4']);
files.set('/pitch/tulsa-housing-pitch.pdf', ['pitch/media/tulsa-housing-pitch.pdf','application/pdf']);
for (const name of ['demo-request','demo-review','demo-match']) files.set(`/assets/${name}.png`,[`assets/${name}.png`,'image/png']);
http.createServer(async (req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}); return res.end(); }
  const entry = files.get(new URL(req.url,'http://localhost').pathname);
  if (!entry) { res.writeHead(404); return res.end('Not found'); }
  try {
    const body = await readFile(new URL(entry[0],import.meta.url));
    res.writeHead(200, {'Content-Type':`${entry[1]}; charset=utf-8`,'X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500); res.end('Unable to load page'); }
}).listen(port,'127.0.0.1',()=>console.log(`Preview ready at http://localhost:${port}`));
