# Visual QA

final result: passed

## Reference and evidence

- Source visual: `C:/Users/corey/.codex/generated_images/01a0bb5a-af97-7923-96e2-7e18bc67d5e0/exec-40f183a6-20cf-475e-903a-12f9d76f502f.png`.
- Implementation: `http://localhost:4173/#home`, `.qa/home-desktop.png`.
- Source and implementation are both 1469 × 1071 pixels; browser viewport 1469 × 1071 CSS pixels, device scale 1. No crop or scale normalization needed for full-view comparison.
- Full-view side-by-side evidence: `.qa/comparison-final.png` (reference left, implementation right).
- Focused text/CTA comparison: `.qa/hero-detail.png`, same 610 × 470 region from each image at x35/y210.
- Mobile: `.qa/home-mobile.png`, `.qa/help-mobile.png`, viewport 390 × 844 CSS pixels, density 1. Full-page captures.
- Supporting page captures: `.qa/firms-desktop.png`, `.qa/schools-desktop.png`, `.qa/help-desktop.png`, viewport 1440 × 1050, density 1.
- Browser: local Google Chrome controlled by Playwright; explicitly authorized by user because the in-app browser tool was unavailable.

## Comparison history

1. Initial comparison `.qa/comparison.png`: P2 desktop navigation and secondary text were undersized relative to the approved reference; the hero was approximately 14px shorter. Fixed desktop navigation to 16px, hero supporting text to 22px, hero buttons to 17px, and hero minimum height to 594px. Increased the headline and adjusted nav spacing. Removed white backgrounds from the supporting benefit columns for continuity with the page surface.
2. Captured the revised page and compared `.qa/comparison-final.png` plus `.qa/hero-detail.png`. Compact hero, overlaid headline and CTAs, visible faces, warm palette, and two-column partner section are present. No remaining actionable P0/P1/P2 findings.

## Fidelity surfaces

- Typography: local Inter supplies the clear sans serif heading/body hierarchy; Newsreader supplies the editorial section heading. Three-line hero title maintained. Small differences in glyph shapes from the raster reference are expected. Form labels and controls remain readable on mobile.
- Layout: full-width photo directly below the header, compact 594px desktop hero, overlaid copy and paired CTAs. Partner paths sit immediately below on peach. Mobile recomposes the hero with faces above the copy and a stronger lower scrim; the desktop reference did not provide a mobile layout.
- Color: warm white `#fffdfa`, peach `#fbefe6`, terracotta `#ae3b23`, dark ink `#192124`. Terracotta was slightly darkened for button/link contrast. Gradient is a text-legibility scrim over a real image, not an asset substitute.
- Images: three generated editorial photographs are stored as optimized WebP and load without failures. Hero keeps a casually dressed, diverse group at right and a quiet area for copy at left. Exact faces and crops differ from the concept because the standalone asset was regenerated. No placeholder images or faux UI image assets.
- Copy: headline and CTA intent match the approved revision. Partner copy retains pro bono/paid choices and supervised school participation from the approved functioning demo. The prototype notice remains explicit; no invented testimonials, active partners, or impact statistics were added.

## Functional verification

`npm test`: 5 browser tests passed. Covers required acknowledgment, resident request → match → reset, both institutional forms, selections, escaped input, no browser persistence, mobile menu / Escape / skip link, and all main routes at 320/390/768/1024/1469px. No horizontal overflow, failed images, failed font loads, page JavaScript errors, or HTTP errors in tested routes. Screenshot captures also reported no page errors.

## Follow-up polish

- P3: Exact raster mock typography and photo framing differ slightly from the implementation; the hierarchy and intended compact composition are preserved.
- Full assistive-technology and production accessibility audits are outside this prototype pass. Real intake and actual attorney assignment remain simulated by design.

## Implementation checklist

- [x] Approved photo-overlay direction implemented.
- [x] Diversity and casual attire reflected in the imagery.
- [x] Working partner and resident flows preserved.
- [x] Desktop/mobile visual review and responsive browser checks completed.
- [x] Assets, font licenses, generation provenance, and run/test instructions saved.
