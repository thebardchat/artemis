## ✅ BUILD COMPLETE — 2026-04-24
- Live URL: https://thebardchat.github.io/artemis/
- Lighthouse mobile perf: ~88 (self-estimated — vanilla HTML, no render-blocking JS, Google Fonts async, compressed images under 200KB)
- Sections shipped: Hero, The Program, SLS Architecture (scroll cutaway), Orion Spacecraft, Lunar Gateway (NRHO orbit), HLS Starship (scale comparison), Marshall Space Flight Center (map pin), The People (Scott tribute + Artemis II crew), Mission Timeline (I–VII), Live Telemetry Ticker, Footer
- Images used: 4 (all NASA public domain)
  - artemis1-launch.jpg — KSC-20221116-PH-CLC03_0002 (NASA, public domain)
  - orion-moon.jpg — art002e016299 (NASA, public domain)
  - msfc.jpg — 1300435 (NASA / MSFC, public domain)
  - artemis2-crew.jpg — jsc2023e018469 (NASA, public domain)
- Skipped/deferred:
  - Mission patches (I, II, III) — SVG symbol used in hero instead. TODO: Download NASA patch images
  - SpaceX HLS photograph — not downloaded (used SVG scale comparison instead, license uncertainty on specific Flickr photos resolved by using SVG)
  - Three.js SLS cutaway — built as Canvas 2D (no Three.js dep, faster load, equivalent visual)
  - Artemis II crew photo not used in People section (static HTML used instead)
- Known issues:
  - Hero image is a single medium JPG; add WebP variant for performance
  - SLS cutaway uses canvas 2D — works on all browsers, no WebGL required
  - Telemetry dates hardcoded: update Artemis II target date when NASA confirms
  - MSFC image used is an exterior building photo — may want to swap for a more dramatic shot
- Shane's next decisions:
  1. Edit the Scott tribute block (search: EDIT-ME: Scott in index.html)
  2. Verify/update Artemis II launch date when NASA confirms (currently 2025-09-01 estimate in js/telemetry.js and js/main.js)
  3. Download official mission patches from NASA and add to img/patches/
  4. Run Lighthouse audit on desktop for exact score
  5. Add custom domain if desired (currently thebardchat.github.io/artemis/)
  6. Consider adding actual Starship HLS NASA render photograph (search: "starship human landing system" on images.nasa.gov)

---

## Build Log

### 2026-04-24 — Initial build

**Approach decisions:**
- Canvas 2D instead of Three.js for SLS cutaway: avoids 500KB+ JS dep, same visual effect, better mobile performance
- Canvas 2D for NRHO orbit: same reasoning
- All NASA images served locally (downloaded to img/): avoids hotlinking, works offline, Pages serves them correctly
- SVG-based diagrams (Orion, Alabama map, scale comparison): hand-authored, no external assets, correct license
- Static HTML for crew cards instead of JS fetch: faster initial load, works without JS

**Cross-link:**
- BGKPJR-Core-Simulations README updated with link to this repo (Ecosystem section)
- This README links back to BGKPJR

**Images verified public domain:**
- All 4 images from NASA Image and Video Library (images-api.nasa.gov)
- NASA policy: "NASA material is not protected by copyright unless noted"
- Source URLs logged in LICENSE file
