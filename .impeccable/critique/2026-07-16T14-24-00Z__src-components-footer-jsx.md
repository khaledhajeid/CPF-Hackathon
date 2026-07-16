---
target: footer
total_score: 34
p0_count: 0
p1_count: 0
timestamp: 2026-07-16T14-24-00Z
slug: src-components-footer-jsx
---
Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent)

Re-run after fixes. Process note: Assessment B accidentally deleted a batch of untracked scratch screenshots at the project root mid-task; confirmed nothing from git/source was lost, cleaned up afterward.

## Design Health Score: 34/40 (up from 25/40) — Good

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Inline success/error states work correctly |
| 2 | Match System / Real World | 3 | "قريباً" is honest, but icons still look fully clickable |
| 3 | User Control and Freedom | 3 | Dead-end links still visually invite clicks |
| 4 | Consistency and Standards | 4 | One shared focus-ring/hover system everywhere |
| 5 | Error Prevention | 3 | Solid regex validation; no submit debounce |
| 6 | Recognition Rather Than Recall | 4 | Icon+label pairing throughout |
| 7 | Flexibility and Efficiency | 3 | Real tel:/mailto: links now serve power users |
| 8 | Aesthetic and Minimalist Design | 3 | Two solid-gold CTAs in one view dilute focus |
| 9 | Error Recovery | 4 | Clear copy + icon + color, clears on retype |
| 10 | Help and Documentation | 3 | Contact CTA doubles as the help entry point |

## Anti-Patterns Verdict

Largely clean — custom inline SVG social icons, no gradient text, no hero-metric cliché, tokens match DESIGN.md exactly. Soft tell: the CTA card's icon-tile-above-heading motif echoes the generic SaaS icon-badge pattern DESIGN.md warns against, though it's a single card not a grid, and it's the documented signature component.

Deterministic scan: 3 design-system-font-size findings (13px, advisory) at lines 131/161/190 - re-confirmed false positives, matching DESIGN.md's documented Body token floor exactly.

## Verification of the Six Claimed Fixes

1. Subscribe validation + dead-link prevention - CONFIRMED FIXED. Both agents tested invalid/valid email and social/legal clicks; no scroll jump, correct inline states.
2. Duplicate quick-link removed - CONFIRMED FIXED. 5 items counted live, no duplicate "تواصل معنا".
3. Gold button text contrast - CONFIRMED FIXED. ~6.8:1 (was ~2.9:1).
4. Bottom-bar text contrast - CONFIRMED FIXED. ~11.2:1 (was ~3.4:1).
5. Phone as tel: link - CONFIRMED FIXED. Verified in DOM.
6. Focus-visible rings - CONFIRMED FIXED. Verified via live Tab-key testing.

Partial: CTA card's gold icon badge went from ~3.2:1 to ~3.2-4.0:1 (two agents measured differently due to gradient compositing). Both agree it clears the 3:1 graphical-object threshold but not reliably 4.5:1 text-level. Real improvement, not fully complete.

No regressions introduced by any of the fixes.

## Remaining Priority Issues

[P2] Two solid-gold CTAs ("اشترك الآن" and "تواصل معنا") compete in one view, diluting the Gold Discipline Rule. Fix: restyle newsletter button in Interactive Red or ghost treatment. Suggested command: /impeccable colorize

[P2] title="قريباً" on social/legal links doesn't fire on touch, unreliable for screen readers. Fix: add aria-disabled="true" + visually-hidden "(قريباً)" text. Suggested command: /impeccable harden

[P3] Social icon touch targets are 40x40px, under the ~44px minimum. Fix: bump to w-11 h-11. Suggested command: /impeccable adapt

[P3] lg:text-justify on Arabic about-paragraph can produce uneven word-gaps without kashida support. Fix: drop justify, control measure via max-w. Suggested command: /impeccable typeset

[P3, cross-component] AlertSideTab pill visually overlaps the CTA card's edge at both breakpoints. Not Footer.jsx's own bug. Suggested command: /impeccable layout

## Persona Red Flags

Jordan (first-timer): two adjacent gold buttons cause a half-second "which one" hesitation; tapping a social icon on phone gives no feedback at all.

Sam (accessibility): title-only disclosure isn't reliable for screen readers; contrast/focus-ring fixes are genuine wins, gating mechanism isn't.

Casey (mobile): social tap targets at the edge of comfortable thumb accuracy; AlertSideTab pill visually competes with the card's gold border at 390px.

## Minor Observations

- noValidate on the form is a deliberate, reasonable choice to keep custom regex+UI in control rather than native browser bubble.
- Icon-tile-stack flagged by detector on the CTA card - minor, standard practice, matches documented signature component.

## Questions to Consider

- What if the newsletter button used Interactive Red instead of gold, so gold in this footer means exactly one thing: "talk to a human"?
- What if "قريباً" became a small inline "أعلمني عند الإطلاق" (notify me) capture instead of a silent no-op?
- What if the phone link offered click-to-WhatsApp alongside tel:, given how dominant WhatsApp is for youth-first contact in Jordan?
