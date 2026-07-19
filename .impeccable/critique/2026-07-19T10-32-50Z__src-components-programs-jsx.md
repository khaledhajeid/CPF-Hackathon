---
target: Programs page (src/components/Programs.jsx) — fixes applied
total_score: 30
p0_count: 0
p1_count: 0
timestamp: 2026-07-19T10-32-50Z
slug: src-components-programs-jsx
---
## Programs page — fixes applied after critique
- [P0] Fixed: all 12 National Programs cards now have tabIndex=0, role=button, onKeyDown (Enter/Space), and the flip-reveal now also triggers on group-focus-within (not just hover), with a visible focus ring.
- [P0] Fixed: NationalPrograms' pathway badges (front + back face) now use the same getPathwayStyle color mapping as EventsExplorer (#a00023/#2b307e/#1f5412) instead of uniform gold — verified live, colors now match across both tabs.
- [P2] Fixed: added a one-line descriptor beneath the two tabs reusing the Wizard's long/short-commitment language.
- [P3] Fixed: EventsExplorer now has a filter-state recap banner matching HomeEvents' isPersonalized pattern.
- [P3] Fixed: tiny ~7-9px text bumped to DESIGN.md's 11px label floor in EventsExplorer (urgent badge, pathway badge, "المكافأة" label, location-filter cancel button).
- Also fixed while in scope: EventsExplorer's own headline and "+N نقطة" gold-on-white text (same failure pattern as Home, not originally itemized but caught during the fix pass).

Re-critique recommended to confirm updated score.
