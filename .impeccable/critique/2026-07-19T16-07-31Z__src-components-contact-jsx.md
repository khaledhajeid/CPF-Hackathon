---
target: Contact page (src/components/Contact.jsx) — fixes applied
total_score: 27
p0_count: 0
p1_count: 0
timestamp: 2026-07-19T16-07-31Z
slug: src-components-contact-jsx
---
## Contact page — fixes applied after critique
- [P1] Fixed: CV modal (modalType) and office-selector dropdown (isDropdownOpen) now close on Escape via useEscapeKey. Verified live: opened each, pressed Escape, confirmed DOM removal.
- [P3] Fixed: 3-tab bar now has role="tablist" on the container and role="tab"/aria-selected on each button, matching the Partnerships toggle's aria-pressed pattern. Verified via getComputedStyle/attribute read live.
- [P1] Fixed (found during verification, same family as Wave 1/2 gold-contrast bug): "قدم كمتدرب" intern CV modal submit button had white text on gold background (bg-[#C08F2D] text-white); switched to text-[#1a0409]. Verified live via getComputedStyle.
- [Minor] "تصنيف الرسالة" select selected-on-disabled-option warning left out of scope (pre-existing, unrelated to this wave's findings).

Re-critique recommended to confirm updated score.
