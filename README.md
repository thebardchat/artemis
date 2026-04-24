# Artemis Program Showcase

A technical tribute to NASA's Artemis program — built in Huntsville, AL, for the engineers who made it possible.

**[Live Site →](https://thebardchat.github.io/artemis/)**

[![Built with Claude](https://img.shields.io/badge/Built%20with-Claude%20(Anthropic)-FC3D21)](https://claude.ai/referral/4fAMYN9Ing)

---

## What this is

An editorial mission-control showcase of the Artemis program: the SLS rocket architecture, Orion spacecraft, Lunar Gateway, Human Landing System, and the people who built it.

Built with love for **Scott Lukens** — NASA engineer at Marshall Space Flight Center — who worked on Artemis from the very beginning.

## Features

- **Scroll-driven SLS cutaway** — the rocket assembles as you scroll, each stage labeled with contractor, thrust, and propellant. Marshall Space Flight Center highlighted on the core stage.
- **Live NRHO orbit animation** — canvas-based Near-Rectilinear Halo Orbit around the Moon
- **Mission timeline** — horizontal scroll, Artemis I–VII with live status
- **Telemetry ticker** — real mission data, days since Artemis I, countdown to Artemis II
- **Apollo LM vs Starship HLS scale comparison** — SVG side-by-side
- **Scott Lukens tribute block** — for the engineer who made it happen

## Tech

Vanilla HTML/CSS/JS. No framework. No build step. No dependencies except Google Fonts CDN.

- `index.html` — single page, all sections
- `css/` — base, layout, components (CSS custom properties, no preprocessor)
- `js/` — main (scroll reveals, countdown), sls-cutaway (canvas), nrho-orbit (canvas), telemetry, timeline
- `data/` — missions.json, sls-stack.json, crew.json

## Image sources

All imagery is verified public domain:
- NASA Image and Video Library (`images-api.nasa.gov`) — public domain per NASA media guidelines
- SpaceX — open license per SpaceX policy

## Related

| Repo | Connection |
|------|------------|
| [**BGKPJR-Core-Simulations**](https://github.com/thebardchat/BGKPJR-Core-Simulations) | EM launch simulations from the same ecosystem — attacking the same problem (launch cost) from a different angle |

## Credits

All NASA imagery is public domain per NASA media guidelines.
SpaceX imagery used per SpaceX open license.

Built by **Shane Brazelton + Claude (Anthropic)** — never "one person built this." It's always a partnership.

> *"We are going. Built in Huntsville. Bound for the Moon."*

---

*Hazel Green, Alabama · 2026*
