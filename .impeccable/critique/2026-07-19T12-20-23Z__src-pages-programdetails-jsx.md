---
target: Program Details page (src/pages/ProgramDetails.jsx) — fixes applied
total_score: 23
p0_count: 0
p1_count: 0
timestamp: 2026-07-19T12-20-23Z
slug: src-pages-programdetails-jsx
---
## Program Details — fixes applied after critique
- [P0] Fixed: pathway colors now consistent via shared src/utils/pathwayColors.js util. Info-strip uses white (guaranteed contrast on burgundy bg, deliberate choice over raw pillar color which would be unreadable there); sidebar card and StoryModal badge now use the real pathway color. Verified live: تعلّم shows #a00023 in sidebar and modal badge.
- [P0] Fixed: added missing <Footer/> — confirmed present via DOM query.
- [P1] Fixed: news cards + related-story cards now keyboard-accessible (tabIndex/role/onKeyDown/focus ring).
- [P1] Fixed: StoryModal and NewsDetailModal both close on Escape via useEscapeKey hook. Verified live.
- [P3] Fixed: "اقرأ التفاصيل" gold-on-white switched to CPF Red.

Re-critique recommended to confirm updated score.
