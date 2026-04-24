# Artemis Showcase — Claude Code Rules

**Branch:** main only. No branches. No PRs.
**Stack:** Vanilla HTML/CSS/JS. No framework. No build step.
**Images:** NASA public domain only. SpaceX with attribution. No AI-generated images.
**Deploy:** GitHub Pages from main root.
**Owner:** thebardchat / Shane Brazelton

## CSS Variables (in css/base.css)
- `--navy` `#0A0E1A` — background
- `--bone` `#F4EDE4` — primary text
- `--red`  `#FC3D21` — accent (NASA red)
- `--amber` `#FFB000` — telemetry / live data
- `--green` `#00C07F` — mission complete

## Key Files
- `index.html` — full page, all sections in order
- `data/missions.json` — update when NASA announces dates
- `data/sls-stack.json` — SLS stage specs
- `js/sls-cutaway.js` — canvas-based scroll-driven SLS diagram
- `js/nrho-orbit.js` — canvas NRHO orbit animation
- `js/telemetry.js` — ticker data (hardcoded, no external API)

## EDIT-ME Markers
Search `EDIT-ME` in index.html for all blocks flagged for Shane's review:
- `<!-- EDIT-ME: Scott -->` — tribute block for Scott Lukens, NASA MSFC engineer

## Image Policy
- Before adding any image: verify it's NASA public domain or SpaceX CC0.
- Log all skipped images in BUILD_NOTES.md.
- Maximum image size: 1MB compressed. Use `<picture>` with webp + jpg fallback for hero images.
- NASA imagery source: `images-api.nasa.gov`

## Telemetry
Dates in `js/telemetry.js` are hardcoded. Update:
- Artemis II target date when NASA confirms (currently `2025-09-01` estimate)
- Artemis I splashdown: `2022-12-11` (fixed, do not change)
