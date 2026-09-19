import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { Deck } from './Deck';
import { FPS, DURATION } from './slides';
registerRoot(()=> <Composition id="TulsaHousingPitch" component={Deck} width={1920} height={1080} fps={FPS} durationInFrames={DURATION}/>);
