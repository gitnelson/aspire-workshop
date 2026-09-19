import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {SLIDES} from './slides.js';

const browserExecutable=process.env.CHROME_PATH || (process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined);
await mkdir('pitch/output/slides',{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('pitch/index.jsx'),publicDir:path.resolve('assets')});
const composition=await selectComposition({serveUrl,id:'TulsaHousingPitch',browserExecutable});
for(const slide of SLIDES){
 const output=`pitch/output/slides/${String(slide.index+1).padStart(2,'0')}.png`;
 await renderStill({serveUrl,composition,output,frame:slide.from+90,browserExecutable});
 console.log(`Slide ${slide.index+1}/10 rendered`);
}
if(!process.argv.includes('--stills-only')){
 let last=-1;
 await renderMedia({serveUrl,composition,codec:'h264',outputLocation:'pitch/output/tulsa-housing-pitch.mp4',browserExecutable,concurrency:3,crf:19,onProgress:({progress})=>{const percent=Math.floor(progress*20)*5;if(percent!==last){last=percent;console.log(`Video ${percent}%`);}}});
 console.log('Video ready: pitch/output/tulsa-housing-pitch.mp4');
}
