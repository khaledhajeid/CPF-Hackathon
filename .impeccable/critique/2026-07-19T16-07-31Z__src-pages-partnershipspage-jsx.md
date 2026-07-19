---
target: Partnerships page (src/pages/PartnershipsPage.jsx) — fixes applied
total_score: 28
p0_count: 0
p1_count: 0
timestamp: 2026-07-19T16-07-31Z
slug: src-pages-partnershipspage-jsx
---
## Partnerships page — fixes applied after critique
- [P0] Fixed: EOI submit button now wired to a real form onSubmit handler with a simulated async flow (isSubmitting -> isSent), matching the Contact page's fake-submit convention. Verified live: filled all required fields, submitted, confirmed success card "استلمنا طلب الشراكة بنجاح" renders and "تعبئة نموذج آخر" resets it.
- [P0] Fixed: gold contrast failures — hero CTA "ابدأ الشراكة" switched from white to #1a0409 text on gold; "يمتد لأجيال" headline emphasis switched from gold to #721F31; "شركاء الأثر" heading emphasis switched from gold to #8a1538 (Interactive Red, deliberately distinct from the base "شركاء" word's #721F31). Verified live via getComputedStyle on the hero button (bg rgb(192,143,45) / color rgb(26,4,9)).
- [Minor] "لماذا تشارك" icon-grid pattern left as-is; out of scope for this pass.

Re-critique recommended to confirm updated score.
