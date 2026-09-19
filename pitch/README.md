# Tulsa Housing Justice Network — animated pitch

A 10-slide, 90-second Remotion presentation for a mixed audience of law firms, law schools, and local philanthropic supporters. It uses the approved website typography, warm paper/peach/terracotta palette, and generated photography.

## View

- Public: https://gitnelson.github.io/aspire-workshop/pitch/
- Local: `npm run pitch:build`, then `npm start`, then open http://localhost:4173/pitch/.
- The website footer links to the presentation.
- Play for the animated sequence; use Previous/Next, slide buttons, or arrow keys for presenter-led navigation. Space plays/pauses when focus is outside a control.
- Presenter notes are available for every slide. No narration or music is included.
- Downloadable MP4 and PDF live in `pitch/media/` and are included in the GitHub Pages deployment.

## Source and editing

- `slides.js`: slide timing, titles, and speaker notes.
- `Deck.jsx`: frame-driven Remotion scenes, staggered text entrances, slow image movement, and the animated resident walkthrough.
- `player.jsx` / `player.html`: browser player, navigation, notes, and download links.
- `index.jsx`: Remotion composition, 1920 × 1080, 30fps, 2700 frames.
- `build.mjs`: creates the browser player bundle.
- `render.mjs`: renders ten slide stills and the H.264 MP4. Uses local Google Chrome on Windows; set `CHROME_PATH` for another location.

```sh
npm ci
npm run pitch:build
npm run pitch:render
```

Video renders to `pitch/output/tulsa-housing-pitch.mp4`; the output directory is ignored by Git. After reviewing a new render, copy it to `pitch/media/tulsa-housing-pitch.mp4` before publishing. The PDF is a static export of the reviewed rendered slides and does not retain animations.

`npm run build` builds the website and the presentation for GitHub Pages, including the reviewed media. No video rendering occurs in the deployment workflow.

## Message and factual boundary

The deck describes a fictional proposed program, not an active legal service. Recruitment and retention are the primary mission; free resident representation is the intended outcome. Firms can contribute pro bono time, take philanthropically funded commitments, or both. School participation is supervised. No funding, case outcomes, partner commitments, budgets, or impact figures are invented. The resident journey uses screenshots from the actual sample-data website and explicitly identifies matching as a simulation.

## Review

All ten rendered stills were visually inspected together. Desktop and mobile browser checks covered slide navigation, notes, fixed 16:9 scaling, loaded imagery, and the resident animation through review and match. Evidence is in the locally ignored `.qa/pitch-*` files. The presentation opens paused at a readable title frame and never autoplays; manual slide navigation lands after entrance animations.
