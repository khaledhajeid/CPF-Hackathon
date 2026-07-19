---
target: Partnerships page (src/pages/PartnershipsPage.jsx)
total_score: 21
p0_count: 2
p1_count: 0
timestamp: 2026-07-19T15-39-30Z
slug: src-pages-partnershipspage-jsx
---
## Partnerships page critique (wave 3, degraded single-assessment)
Total contributing to 21/40 group score.

## Priority Issues
- [P0] EOI submit button is type="button" with no onClick/onSubmit - confirmed in source (line 242-243). Form is completely non-functional; a partner/donor gets zero feedback on submit.
- [P0] Gold-on-white / white-on-gold contrast fails confirmed at 3 spots: hero CTA "ابدأ الشراكة" (white on gold, line 55), "يمتد لأجيال" headline emphasis (gold on white, line 47), "شركاء الأثر" heading (gold on white, line 77).
- [Minor] "لماذا تشارك" 3-card section is a textbook icon+heading+paragraph grid, close to the banned icon-grid family.

## What's working
Real partner-logo marquee with hover-pause (animation-play-state); organization/individual toggle correctly swaps only relevant fields with proper aria-pressed/role=group.
