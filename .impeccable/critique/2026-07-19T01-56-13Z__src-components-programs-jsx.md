---
target: Programs page (src/components/Programs.jsx)
total_score: 24
p0_count: 2
p1_count: 0
timestamp: 2026-07-19T01-56-13Z
slug: src-components-programs-jsx
---
## Design Health Score (Programs page)
Total: 24/40 — Acceptable.

## Priority Issues
- [P0] All 12 National Programs cards keyboard-inoperable: div tabIndex="-1", no role/onKeyDown; flip-reveal (real description + submit button) only on lg:group-hover, no focus-within equivalent. Core secondary conversion path fully blocked for keyboard/switch-device users.
- [P0] Pathway badge colors contradict between the page's own two tabs — NationalPrograms.jsx renders all 3 pathways in gold (text-[#C08F2D], lines 102/126); EventsExplorer.jsx (one tab away) renders the same 3 in correct pillar colors (#a00023/#2b307e/#1f5412) via its own getPathwayStyle function.
- [P2] Two tabs ("البرامج والمبادرات" / "الفرص والفعاليات") unexplained — no descriptor, even though Wizard already has matching long/short-commitment language ready to reuse.
- [P3] No filter-state recap banner unlike the identical widget pattern on Home's HomeEvents.
- [P3] 13 instances of ~9.6px tiny body text in EventsExplorer (detector-confirmed).

## False positive corrected
gradient-text flagged by detector; traced to zero bg-clip-text matches in Programs source — same false-positive mechanism as Home.

## What's working
NationalPrograms' mobile pulsing "اضغط للتفاصيل" hint solves touch discoverability well; EventsExplorer's empty state (icon + message + one-click reset) never dead-ends; sticky JordanMap sidebar reinforces the "one national gateway" positioning.
