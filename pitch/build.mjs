import {build} from 'esbuild';
import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('pitch/dist',{recursive:true});
await build({entryPoints:['pitch/player.jsx'],bundle:true,outfile:'pitch/dist/deck.js',minify:true,legalComments:'inline',define:{'process.env.NODE_ENV':'"production"'},loader:{'.js':'jsx'}});
await copyFile('pitch/player.html','pitch/dist/index.html');
console.log('Pitch player built: /pitch/');
