---
target: Contact page (src/components/Contact.jsx)
total_score: 21
p0_count: 0
p1_count: 1
timestamp: 2026-07-19T15-39-30Z
slug: src-components-contact-jsx
---
## Contact page critique (wave 3, degraded single-assessment - Assessment B hit session limit)
Total contributing to 21/40 group score.

## Priority Issues
- [P1] CV modal (modalType) and office-selector dropdown (isDropdownOpen) don't close on Escape - confirmed via source, only outside-click handling exists.
- [P3] Tab bar (3 tabs) lacks ARIA tab semantics (role=tablist/tab/aria-selected), inconsistent with Partnerships' toggle which has role=group+aria-pressed.
- [Minor] "تصنيف الرسالة" select still has selected-on-disabled-option React warning (previously flagged, left out of scope).

## What's working
Live office-detail switching (address/phone/hours swap per governorate); complete fake-submit feedback loop (loading -> success -> reset).
