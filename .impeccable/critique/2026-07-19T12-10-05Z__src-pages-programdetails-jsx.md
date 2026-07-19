---
target: Program Details page (src/pages/ProgramDetails.jsx)
total_score: 23
p0_count: 2
p1_count: 2
timestamp: 2026-07-19T12-10-05Z
slug: src-pages-programdetails-jsx
---
## Design Health Score (Program Details page)
Total: 23/40 — Acceptable.

## Priority Issues
- [P0] Pathway badge color hardcoded 3 different wrong ways: :174 always gold (also fails contrast 3.2:1 on burgundy strip), :321 always neutral gray, :59-61 (local StoryModal) always CPF Red. Confirmed live: same "قُد" story shows blue in RelatedProgramStories grid then red in this page's modal.
- [P0] No Footer at all — confirmed via grep, zero Footer references in the file.
- [P1] News/related-story cards keyboard-unreachable (div onClick, tabIndex=-1, no role).
- [P1] Escape doesn't close StoryModal or NewsDetailModal.
- [P3] "اقرأ التفاصيل" news-card link gold-on-white (2.9:1) at :250.

## What's working
Sticky persistent CTA sidebar keeps primary action reachable through a long page; well-built FAQ accordion with smooth height animation.
