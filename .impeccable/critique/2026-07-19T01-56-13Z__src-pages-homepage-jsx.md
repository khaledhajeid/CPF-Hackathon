---
target: Homepage (src/pages/HomePage.jsx)
total_score: 27
p0_count: 1
p1_count: 2
timestamp: 2026-07-19T01-56-13Z
slug: src-pages-homepage-jsx
---
## Design Health Score (Homepage)
Total: 27/40 — Acceptable.

## Priority Issues
- [P0] Pathway Wizard Q1 never uses pillar colors (neutral gray icon chips for all 3 options) — highest-stakes personalization moment, colorblind to the rest of the system.
- [P1] Gold-on-white / white-on-gold contrast failures repeated in LuxuryPathways, RegistrationStrip, HomeEvents headlines (2.9:1 measured, both directions).
- [P1] LuxuryPathways cards mouse-only (activeCard only updates via onMouseEnter, no onFocus/tabIndex) — keyboard users stuck on تعلّم.
- [P2] Broken heading hierarchy: H3 (AlertSideTab drawer title) appears before page H1; H1 followed directly by H3s with no H2.
- [P3] RegistrationStrip autoplay only pauses via onMouseEnter/Leave, no onTouchStart — can't pause on real touch devices.

## False positive corrected
Detector flagged gradient-text; traced to zero bg-clip-text matches in Home's source — false positive from compiled global stylesheet picking up Hero.jsx/AboutPage.jsx's rule (out of scope pages).

## What's working
AnimatedNumber's RTL-safe count-up, Wizard's one-question-per-screen discipline with disabled-until-valid CTA and dual exit paths, RegistrationStrip's hand-tuned drag-vs-click threshold.
