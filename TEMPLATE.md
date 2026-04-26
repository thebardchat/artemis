# Using This Repo as a Template

This is a reusable **vanilla HTML/CSS/JS technical showcase** architecture. Fork it via the GitHub "Use this template" button, then follow this guide to adapt it for your project.

---

## Architecture Overview

```
index.html        ← Single page. All sections in order. Edit content here.
css/
  base.css        ← CSS variables (colors, fonts, spacing). Start here.
  layout.css      ← Grid, nav, containers. Rarely needs changing.
  components.css  ← Section-specific styles. Add new section styles here.
js/
  main.js         ← Scroll reveals, countdown timer, sticky nav. Update countdown target.
  sls-cutaway.js  ← Canvas scroll animation. Adapt or replace for your subject.
  nrho-orbit.js   ← Canvas orbit animation. Replace with your own canvas module.
  telemetry.js    ← Bottom ticker strip. Update hardcoded data items.
  timeline.js     ← Reads data/missions.json. Works as-is for any timeline.
data/
  missions.json   ← Timeline cards. Replace with your mission/event data.
  crew.json       ← Crew data stub (extend as needed).
  sls-stack.json  ← Component spec data (adapt for your subject).
img/              ← Public domain or CC0 images only.
CLAUDE.md         ← Claude Code rules for this project. Update for your project.
```

---

## Step-by-Step Customization

### 1. Color Palette (`css/base.css`)

Change these CSS custom properties to match your project:

```css
--navy:  #0A0E1A;   /* page background */
--bone:  #F4EDE4;   /* primary text */
--red:   #FC3D21;   /* accent — change to your brand color */
--amber: #FFB000;   /* secondary accent — telemetry/live data */
--green: #00C07F;   /* success / complete states */
```

### 2. Timeline Data (`data/missions.json`)

Replace with your events. Schema:

```json
[
  {
    "id": "event-1",
    "name": "Event Name",
    "status": "complete",          /* complete | upcoming | planned */
    "date": "2026-01-01",
    "splashdown": "2026-01-10",    /* optional end date */
    "description": "What happened.",
    "crew": ["Person A", "Person B"],   /* null if no crew */
    "vehicle": "Vehicle Name",
    "destination": "Where it went"
  }
]
```

### 3. Hero Section (`index.html`)

- Swap `img/hero/` images
- Update `<h1>` tagline and `<p>` sub-headline
- Update countdown label and target date in `js/main.js`

### 4. Navigation

Update the `<nav>` links to match your section IDs.

### 5. Section Content

Search for `EDIT-ME` in `index.html` to find all flagged blocks. Replace:
- Tribute/people block (`EDIT-ME: Scott`)
- Crew cards
- Stats grid numbers
- Editorial paragraphs

### 6. Canvas Animations

- `sls-cutaway.js` — Replace the SLS stages array with your own scroll-driven diagram data
- `nrho-orbit.js` — Adapt the orbit path, or replace entirely with a different canvas animation

### 7. Telemetry Ticker (`js/telemetry.js`)

Replace `STATIC_ITEMS` array with your own live/computed data strings.

### 8. CLAUDE.md

Update the rules for your project:
- Change image source policy
- Update brand colors
- Remove Artemis-specific notes

---

## What NOT to Change

The following are the core reusable infrastructure — leave them alone unless you need a specific change:

- Scroll reveal system (`IntersectionObserver` in `main.js` + `.reveal` CSS)
- CSS variable system (`base.css`)
- Layout grid + container system (`layout.css`)
- Responsive breakpoints
- Timeline JS fetch/render loop (`timeline.js`)

---

## Projects Using This Template

| Project | Description |
|---------|-------------|
| [Artemis](https://thebardchat.github.io/artemis/) | NASA Artemis program showcase — the origin |
| [BGKPJR](https://thebardchat.github.io/BGKPJR-Core-Simulations/) | Maglev launch system simulations |
| [Manna](https://thebardchat.github.io/manna/) | Lunar cargo pod system |

---

*Built by Shane Brazelton + Claude (Anthropic) · [claude.ai/referral/4fAMYN9Ing](https://claude.ai/referral/4fAMYN9Ing)*
