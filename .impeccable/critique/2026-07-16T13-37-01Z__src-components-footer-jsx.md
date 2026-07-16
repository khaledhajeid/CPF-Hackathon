---
target: footer
total_score: 25
p0_count: 1
p1_count: 2
timestamp: 2026-07-16T13-37-01Z
slug: src-components-footer-jsx
---
Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Newsletter "اشترك الآن" button has no onClick — clicking produces zero feedback |
| 2 | Match System / Real World | 4 | Natural Arabic copy, familiar icon/label pairing throughout |
| 3 | User Control and Freedom | 3 | Back-to-top works; all social + legal links are href="#" dead ends |
| 4 | Consistency and Standards | 3 | Quick-links duplicates "تواصل معنا" right beside the ceremonial CTA card — breaks DESIGN.md's own rule that this CTA is never duplicated as a plain link |
| 5 | Error Prevention | 1 | Email input: no format validation, no handler, no disabled/loading state |
| 6 | Recognition Rather Than Recall | 4 | Icon+label pairing everywhere, nothing hidden |
| 7 | Flexibility and Efficiency | 3 | Adequate for a footer; nothing notable either way |
| 8 | Aesthetic and Minimalist Design | 3 | Clean per-component execution; redundant CTA and gold density dent it slightly |
| 9 | Error Recovery | 1 | No error states exist — the one form present fails silently |
| 10 | Help and Documentation | 2 | ToS/Privacy links present but unwired |
| Total | | 25/40 | Acceptable — significant improvements needed before users are happy |

Cognitive load: 3 of 8 checklist items fail. Quick-links has 6 items (over the <=4 chunking guideline); two competing CTAs do the identical job (onNavigate('contact') via plain link and ceremonial card); raw interactive-target count (~16) is high, partly footer-genre-normal. Grouping, hierarchy, and working-memory items pass cleanly.

## Anti-Patterns Verdict

LLM assessment: Doesn't read as AI slop at a glance — no gradient text, no uppercase eyebrow, no generic icon-in-circle grid. The Contact CTA card executes DESIGN.md's own documented signature component almost verbatim, so what could superficially look like a template pattern is actually the blessed on-brand treatment.

Deterministic scan: detect.mjs returned 3 findings (exit 2), all design-system-font-size (advisory) — 13px arbitrary sizes at lines 92, 122, and 151, all off the DESIGN.md type ramp. The live-page overlay scan surfaced items attributable to the Footer: low-contrast on gold-on-maroon text/icons (2.9-3.2:1, need 4.5:1), an icon-tile-stack at the Contact CTA's 44x44 icon (line 113) above its h4, and nested-cards (x4, plausible false positive). Several other overlay hits don't map to Footer.jsx.

Convergence: both assessments independently flagged gold-text contrast failures, and the smallest text on the page (bottom bar) being under-legible. Line 151 is both off the type ramp and contrast-failing at 3.41:1.

Ruled out: both assessments confirm the page-level horizontal overflow at 1440px and 390px is caused by the fixed AlertSideTab announcement panel, not the Footer.

## Overall Impression

The new Contact CTA card is a genuine win — the first real "peak" moment in the footer, faithfully executing what DESIGN.md prescribed. But the same screen undercuts it: a subscribe button with no handler, five social icons and two legal links that go nowhere, and a duplicate contact link sitting right next to the card that's supposed to be the only one.

## What's Working

- The Contact CTA card (gradient, gold badge, ceremonial shadow, gold-to-white inverting button) is a faithful, well-executed build of DESIGN.md's named signature component.
- RTL grid ordering is correct and deliberate — brand column reads right, quick links center, CTA card left.
- Mobile stacking is clean: grid-cols-1 below md, content centers correctly, decorative glow blobs stay properly clipped with zero page-level leakage.

## Priority Issues

[P0] Newsletter subscribe button and all social/legal links are non-functional. No onClick on the subscribe button; every social icon and both legal links are href="#". Why it matters: a visitor's last action on the page silently fails — erodes the "credible national institution" trust PRODUCT.md is built around. Fix: wire a real handler with success/error state for the email input; populate or gate the social/legal hrefs. Suggested command: /impeccable harden

[P1] The ceremonial Contact CTA is duplicated by a plain "تواصل معنا" quick-link right next to it. DESIGN.md: "this is the site's single, deliberately prominent 'get in touch' moment — it should never be duplicated as a plain text link elsewhere." Both call the identical onNavigate('contact'). Fix: drop that one entry from quickLinks. Suggested command: /impeccable distill

[P1] Gold-on-color text fails contrast in two places. White text on Gold buttons (~2.9:1); gold text/icons on the CTA card's maroon gradient (~3.2:1). Baked into DESIGN.md's own button-gold token. Fix: swap button text to dark ink/burgundy on gold, or deepen the gold for text-bearing contexts, then update the token. Suggested command: /impeccable colorize

[P2] The smallest text on the page is also the least legible. Bottom-bar copyright/legal text and newsletter placeholder (~3.4:1) fail AA, and the detector independently flags lines 92/122/151 as off the DESIGN.md type ramp. Fix: bump to gray-300/400 or white/60, bring sizes onto the documented scale. Suggested command: /impeccable colorize

[P3] Phone number in the CTA card is plain text, not a tel: link. Fix: wrap in <a href="tel:...">. Suggested command: /impeccable polish

## Persona Red Flags

Jordan (First-Timer): Sees "تواصل معنا" twice in the same viewport with no cue for which to use; clicks "اشترك الآن" expecting confirmation and gets silence.

Riley (Stress Tester): Every social icon and both legal links are dead-end anchors; the subscribe button accepts empty/garbage input with zero validation.

Casey (Mobile): Footer stacks and centers cleanly at 390px with no overflow. The collapsed AlertSideTab announcement pill visually sits near the quick-links/CTA area when scrolled on mobile — worth a cross-component placement check.

## Minor Observations

- CTA card gradient ends at a custom #4d0c1c rather than the documented Ink Black token (#1a0409).
- Gold appears in 8+ distinct spots in one frame — each instance individually obeys the Gold Discipline Rule, but cumulative density leans toward "decorative."
- No focus-visible styling on links/buttons besides the email input.
- Detector's icon-tile-stack and nested-cards flags on the Contact CTA are very likely non-issues.

## Questions to Consider

- What if the plain "تواصل معنا" quick link were simply removed?
- What if the subscribe button swapped to an inline success state on click?
- What if gold were rationed to just the CTA button + top seam?
