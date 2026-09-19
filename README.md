# Aspire Workshop

Polished interactive prototype for **Tulsa Housing Justice Network**, a fictional community project. The approved visual direction uses an editorial photo hero with overlaid text, warm peach surfaces, terracotta actions, and Inter / Newsreader typography.

## Run locally

Requires Node.js 22 or later. Running the site requires no dependency installation. Browser tests use development dependencies.

```sh
npm start
```

Open http://localhost:4173. In PowerShell, use `npm.cmd start` if script execution policy blocks `npm`.

## Walkthrough

- Home → Become a legal partner → Law firm or law school → Sample interest form → Confirmation.
- Get legal help → Fill with sample information → Check demo acknowledgment → Preview my request → Show a representation match.
- Reset resident demo clears the request. Reloading clears all demo data.

Recruitment and retention are the primary goals. Law firms can express interest in pro bono work, paid commitments, or both. Law schools can explore clinic, faculty, and supervised student partnerships. The proposed funding model is local philanthropy; residents pay nothing.

## Public hosting

Public URL: https://gitnelson.github.io/aspire-workshop/

Animated Remotion pitch: https://gitnelson.github.io/aspire-workshop/pitch/

The 10-slide, 90-second deck speaks to legal partners and local philanthropic supporters. It includes playback, slide navigation, presenter notes, and MP4/PDF downloads. See `pitch/README.md` for source and rendering instructions. Run `npm ci` before building the public site and deck together.

GitHub Pages is published by `.github/workflows/pages.yml` on pushes to `main`. `npm run build` assembles only public runtime files and font licenses in `dist/`; source notes, original photos, tests, and development files are excluded from the deployed artifact.

The site is plain HTML, CSS, and JavaScript. The contents of `dist/` can also be published on any static host. Hash navigation works without server route rewrites. Optimized WebP photos and fonts are self-hosted; there are no third-party runtime requests.

## Verification

```sh
npm ci
npm test
```

Tests use installed Google Chrome through Playwright and cover resident request/match/reset, both partner forms, input escaping, mobile navigation, keyboard behavior, asset loading, and overflow at 320, 390, 768, 1024, and 1469 pixels. See `design-qa.md` for visual comparison evidence. Screenshots are in the locally ignored `.qa` directory.

## Visual assets

`assets/hero.webp`, `assets/firm-team.webp`, and `assets/school-team.webp` were generated with the built-in image generation tool. They depict fictional people and locations, not actual program participants or a verified Tulsa location. Each has a corresponding provenance file containing its generation prompt. Original generated PNGs are preserved beside the optimized versions.

Inter and Newsreader are self-hosted Google Fonts, distributed under the SIL Open Font License. License texts are included in `assets`.

## Prototype boundary

This version is a working click-through, not an operating legal service. All program claims, partners, requests, and assignments are fictional. Forms are local simulations; no email, API requests, analytics, accounts, or browser storage are used. Inputs remain only in page memory until reload. Do not enter actual client information.

Before real intake: establish an operating organization, verified partners and funding, secure data handling and consent, an intake backend, staff access controls, review and conflict-check workflows, attorney/resident acceptance, notifications, and a defined service area. Matching currently illustrates a possible outcome rather than selecting an actual attorney.

Detailed intake design and production operations remain deferred. The approved visual polish is implemented.
