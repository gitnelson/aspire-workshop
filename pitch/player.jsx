import React, { useEffect, useRef, useState } from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {Deck} from './Deck';
import {SLIDES,FPS,DURATION} from './slides';

function App(){
  const player=useRef(null);
  const [frame,setFrame]=useState(90);
  const [notes,setNotes]=useState(false);
  const slide=SLIDES.find(s=>frame>=s.from&&frame<s.from+s.duration)||SLIDES[0];
  const seek=index=>{player.current?.pause();player.current?.seekTo(SLIDES[Math.max(0,Math.min(9,index))].from+90);};
  useEffect(()=>{
    const p=player.current;const update=e=>setFrame(e.detail.frame);
    p.addEventListener('frameupdate',update);
    const keys=e=>{
      if(['INPUT','BUTTON','SELECT','TEXTAREA'].includes(e.target.tagName))return;
      if(e.key==='ArrowRight'){e.preventDefault();seek(slide.index+1);}
      if(e.key==='ArrowLeft'){e.preventDefault();seek(slide.index-1);}
      if(e.code==='Space'){e.preventDefault();p.toggle();}
    };
    window.addEventListener('keydown',keys);
    return()=>{p.removeEventListener('frameupdate',update);window.removeEventListener('keydown',keys);};
  },[slide.index]);
  useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)player.current?.seekTo(90);},[]);
  return <><header><a href="../">Tulsa Housing Justice Network</a><span>Animated pitch · 10 slides · 90 seconds</span><a href="https://gitnelson.github.io/aspire-workshop/" target="_blank" rel="noreferrer">Open website</a></header><main><div className="stage"><Player ref={player} initialFrame={90} component={Deck} inputProps={{assetBase:'../assets/'}} durationInFrames={DURATION} fps={FPS} compositionWidth={1920} compositionHeight={1080} controls style={{width:'100%',aspectRatio:'16/9'}} clickToPlay doubleClickToFullscreen spaceKeyToPlayOrPause={false}/></div><div className="toolbar"><button onClick={()=>seek(slide.index-1)} disabled={slide.index===0}>Previous</button><div aria-live="polite"><strong>{String(slide.index+1).padStart(2,'0')} / 10</strong><span>{slide.title}</span></div><button onClick={()=>seek(slide.index+1)} disabled={slide.index===9}>Next slide</button><button className="notes-button" aria-expanded={notes} onClick={()=>setNotes(!notes)}>Presenter notes</button></div>{notes&&<aside><h2>{slide.title}</h2><p>{slide.notes}</p></aside>}<nav aria-label="Slide navigation">{SLIDES.map(s=><button key={s.index} aria-current={s.index===slide.index?'step':undefined} onClick={()=>seek(s.index)}><span>{String(s.index+1).padStart(2,'0')}</span>{s.title}</button>)}</nav><div className="downloads"><a href="tulsa-housing-pitch.mp4" download>Download video (MP4)</a><a href="tulsa-housing-pitch.pdf" download>Download slides (PDF)</a></div><p className="hint">Play for the animated pitch. Use Previous / Next or arrow keys for a live presentation. Space plays or pauses. No audio track; presenter notes are included.</p></main><footer>Fictional workshop concept. Photos are AI-generated. Resident matching is a simulation.</footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
