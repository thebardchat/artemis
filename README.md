# Artemis Program Showcase

A technical tribute to NASA's Artemis program — built in Huntsville, AL, for the engineers who made it possible.

**[Live Site →](https://thebardchat.github.io/artemis/)**

[![Built with Claude](https://img.shields.io/badge/Built%20with-Claude%20(Anthropic)-FC3D21)](https://claude.ai/referral/4fAMYN9Ing)
[![Use this template](https://img.shields.io/badge/Use%20this%20template-0A0E1A?logo=github)](https://github.com/thebardchat/artemis/generate)

---

## What this is

An editorial mission-control showcase of the Artemis program: the SLS rocket architecture, Orion spacecraft, Lunar Gateway, Human Landing System, the people who built it, and the Artemis II mission photo gallery.

Built with love for **Scott Lukens** — NASA engineer at Marshall Space Flight Center — who worked on Artemis from the very beginning.

## Features

- **Scroll-driven SLS cutaway** — the rocket assembles as you scroll, each stage labeled with contractor, thrust, and propellant. Marshall Space Flight Center highlighted on the core stage.
- **Live NRHO orbit animation** — canvas-based Near-Rectilinear Halo Orbit around the Moon
- **Mission timeline** — horizontal scroll, Artemis I–VII with live status
- **Telemetry ticker** — real mission data, days since Artemis II splashdown, countdown to Artemis III
- **Apollo LM vs Starship HLS scale comparison** — SVG side-by-side
- **Artemis II mission gallery** — Earthrise, Vavilov Crater, Splashdown (NASA public domain)
- **Scott Lukens tribute block** — for the engineer who made it happen

## Tech

Vanilla HTML/CSS/JS. No framework. No build step. No dependencies except Google Fonts CDN.

- `index.html` — single page, all sections
- `css/` — base, layout, components (CSS custom properties, no preprocessor)
- `js/` — main (scroll reveals, countdown), sls-cutaway (canvas), nrho-orbit (canvas), telemetry, timeline
- `data/` — missions.json, sls-stack.json, crew.json

## Use as a Template

This repo is a reusable **vanilla HTML/CSS/JS technical showcase template**. The scroll-driven canvas architecture, telemetry ticker, mission timeline, and editorial grid work for any project needing this kind of rich, static single-page showcase.

To create your own showcase based on this architecture:

1. Click **[Use this template](https://github.com/thebardchat/artemis/generate)** on GitHub
2. Replace content in `data/missions.json`, `data/crew.json`
3. Swap images in `img/hero/`, `img/crew/`, `img/mission/`
4. Update section copy in `index.html` (search `EDIT-ME`)
5. Adjust color palette in `css/base.css` (CSS custom properties)

See `TEMPLATE.md` for a full customization guide.

## Image sources

All imagery is verified public domain:
- NASA Image and Video Library (`images-api.nasa.gov`) — public domain per NASA media guidelines
- SpaceX — open license per SpaceX policy

## Related — The Ecosystem

| Repo | Connection |
|------|------------|
| [**BGKPJR-Core-Simulations**](https://thebardchat.github.io/BGKPJR-Core-Simulations/) | Maglev launch architecture — attacking launch cost at the source |
| [**Manna**](https://thebardchat.github.io/manna/) | Unmanned cargo pods for lunar resupply via BGKPJR — $200/kg target |

All three projects share the same template architecture and are part of the same ecosystem attacking the future of space access.

## Credits

All NASA imagery is public domain per NASA media guidelines.
SpaceX imagery used per SpaceX open license.

Built by **Shane Brazelton + Claude (Anthropic)** — never "one person built this." It's always a partnership.

> *"We are going. Built in Huntsville. Bound for the Moon."*

---

*Hazel Green, Alabama · 2026*
