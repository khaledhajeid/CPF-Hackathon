---
target: About Us page (src/pages/AboutPage.jsx)
total_score: 26
p0_count: 0
p1_count: 2
timestamp: 2026-07-19T00-03-31Z
slug: src-pages-aboutpage-jsx
---
## Design Health Score (About Us page)
Total: 26/40 — Acceptable band.

| # | Heuristic | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Visibility of System Status | 3 | Counters/tab transitions communicate well |
| 2 | Match System / Real World | 3 | Natural Arabic phrasing, no jargon |
| 3 | User Control and Freedom | 2 | No Escape-key handler on leader modal |
| 4 | Consistency and Standards | 2 | Same icon-tile card recipe repeated 5x |
| 5 | Error Prevention | 3 | n/a beyond footer email validation |
| 6 | Recognition Rather Than Recall | 3 | Persistent nav, clear labels |
| 7 | Flexibility and Efficiency | 2 | Leader cards unreachable by keyboard (no tabIndex) |
| 8 | Aesthetic and Minimalist Design | 2 | Nested-card stacking (border+shadow+hover-lift) on every card |
| 9 | Error Recovery | 3 | n/a, no error states present |
| 10 | Help and Documentation | 3 | Footer contact card adequate |

## Anti-Patterns Verdict
Three of DESIGN.md's five banned patterns present: gradient text on primary H1 (`AboutPage.jsx:165`), hero-metric-template stats block, icon-tile-above-heading repeated 5x (Vision, Mission, 3 track cards). Detector overlay independently corroborated gradient-text and icon-tile-stack, plus flagged `border-accent-on-rounded` at `:300` (side-stripe on rounded milestone card).

## Priority Issues
- [P1] Gradient text on primary H1 (`:165`) — replace with solid `text-[#C08F2D]`.
- [P1] Dead alternating-timeline logic — all 4 milestones render identically despite `isEven` branching intended to zigzag (`:256-306`).
- [P2] Gold text (`#C08F2D`) on white fails WCAG AA (2.91:1 measured live) — repeats under every leader name (`:380-381`) and milestone year (`:278`).
- [P2] Leader/track/milestone cards keyboard-unreachable — no tabIndex/role/keydown.
- [P2] Icon-tile-above-heading pattern repeated 5x, flattening visual hierarchy — differentiate Vision (brand tagline) from the 3-track grid.

## Persona Red Flags
- Jordan: board photos give no "clickable" signal on touchscreens (hover-only affordance).
- Riley: tabbing through the page silently skips the entire leadership section.

## Minor Observations
- Footer privacy/terms links are dead "قريباً" placeholders below the email signup form.
- Board grid mixes one member with embedded testimonial among otherwise-identical plain tiles.

## Questions to Consider
- The page's best moment (closing CTA) and weakest pattern (5x repeated icon-tile cards) both try to express the same brand — what would it look like if every section earned its own distinct visual treatment?
