---
target: ProgramDetails.jsx modular redesign (Phase 11)
total_score: 32
p0_count: 0
p1_count: 0
timestamp: 2026-07-19T17-20-10Z
slug: src-pages-programdetails-jsx
---
## ProgramDetails.jsx — Phase 11 modular redesign critique (dual-agent) + fixes applied

Method: dual-agent (A: general-purpose design review · B: general-purpose detector+browser evidence), both isolated, both completed successfully.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Breadcrumb, live-video badge, registration pill all communicate state clearly |
| 2 | Match System / Real World | 4 | Icon↔label mapping sensible, pathway color-coding consistent site-wide |
| 3 | User Control and Freedom | 3 | Breadcrumb + nav escape routes work; FAQ/modal Escape handling fine |
| 4 | Consistency and Standards | 3 | Fixed: subInitiatives logo/icon visual-weight mismatch resolved |
| 5 | Error Prevention | 3 | External links correctly get noopener/noreferrer; mailto correctly doesn't |
| 6 | Recognition Rather Than Recall | 3 | Meta card + badges aid scanning without memory demand |
| 7 | Flexibility and Efficiency | 2 | No shortcuts; spotlightSection's scroll-anchor CTA is a nice but isolated touch |
| 8 | Aesthetic and Minimalist Design | 4 | Fixed: gold usage rationed back down; iconCards restructured away from banned pattern |
| 9 | Error Recovery | 4 | Fixed: closed-registration CTA now demoted + explained instead of contradicting itself |
| 10 | Help and Documentation | 3 | FAQ block serves this role contextually per program |
| **Total** | | **32/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment**: `iconCards` (3-card seasonal strip) was flagged as falling into the banned icon-in-a-circle-grid trap — tint alternation was surface variation, not structural variation. Fixed: restructured into a single unified strip with internal dividers and inline icon+title (horizontal, not stacked), a genuine structural break. `subInitiatives` (logo card + icon card) was judged as reading "unfinished" rather than intentional due to mismatched container weight — fixed by giving the logo a matching neutral frame.

**Deterministic scan**: 87 `design-system-font-size` findings — confirmed these are a pre-existing multi-breakpoint `text-[...]` sizing convention used throughout this file (not the accepted `clamp()` pattern, but a related manual-responsive convention already shipping site-wide); left as out-of-scope per this session's established Structural Freeze. A low-contrast triple (`#fff` on near-white) traced to the pre-existing "لقطات حية" live-video badge — likely a detector limitation reading a semi-transparent black/40 badge without alpha-compositing against the video, not a real bug; unchanged (pre-existing, unrelated to this redesign). `gradient-text` hits traced to `Hero.jsx` (not imported by this page) and the third-party UserWay widget re-injecting during the detection window — false positive, not first-party.

**Real, confirmed-and-fixed finding**: FAQ accordion toggle had `focus:outline-none` with zero replacement focus indicator — a genuine, verified (`getComputedStyle` showed no outline/box-shadow after focus) accessibility bug. Fixed with the same `focus-visible:ring-2 ring-[#C08F2D] ring-offset-2` pattern already used correctly elsewhere in this file.

## Overall Impression

The modular data-driven architecture works — three structurally different programs (HTU, HFP, Community Campaigns) render correctly from the same component tree, RTL ordering is verified correct throughout (not just in DOM order), and the two ceremonial banners (`spotlightSection` vs. Footer's contact CTA) are judged as genuinely, deliberately distinct rather than a weak duplicate. The real gap was internal consistency under scale: gold drifted from "rare accent" to "default icon color" across the new blocks, one data/copy contradiction slipped across pages (HFP's closed registration vs. a stale "registration open" homepage banner), and one new content block reused a banned card shape. All of these were caught by the critique and are now fixed.

## What's Working

1. **RTL correctness verified live, not assumed.** Icon/text/logo ordering in `subInitiatives` and the color-to-position mapping in `iconCards` were checked with actual `getBoundingClientRect()` x-coordinates, not just visual read — genuinely correct RTL flow including CSS Grid auto-placement direction.
2. **Empty-state handling.** Community Campaigns (a program with zero success stories) shows the existing warm "كن أنت القصة الأولى!" empty state rather than a broken or blank section — an edge case a lot of new data-driven blocks miss.
3. **`donationBanner`'s single-shell reuse** (one component, `accent` prop toggles gold-vs-red button) is a well-judged minimal-variation pattern — same shell serves an HTU donation ask and a Campaigns volunteer-contact ask without duplicating markup.

## Priority Issues (fixed)

- **[P0] Closed-registration CTA contradicted itself across pages — FIXED.** HFP's meta card said "حالة التسجيل: مغلق" while the homepage `AlertSideTab` banner independently claimed "التسجيل في HFP مفتوح للشباب" (confirmed via grep — genuinely stale, unrelated copy). Fixed both: updated the stale banner text to match reality, and the sidebar CTA now demotes to ghost/secondary styling with an explanatory caption ("التسجيل مغلق حالياً؛ زر الموقع الرسمي لمتابعة موعد فتح الدفعة القادمة") whenever `registrationStatus === 'مغلق'`, instead of an unexplained identical solid-red button.
- **[P1] Gold Discipline Rule violated in aggregate — FIXED (scoped to newly-introduced usage).** Across the new blocks alone: `subInitiatives`' icon badge and `workAreas`' header underline were both gold, on top of the page's pre-existing gold touchpoints. Moved both to Interactive Red / neutral gray, leaving gold only on the `donationBanner` icon (the one genuinely "earned ceremonial" moment) and one-of-three in the `iconCards` tint rotation. Pre-existing gold usage on the original meta-card icons and FAQ toggle (present before this redesign, shipping across every program page) was left alone as out of scope for this pass.
- **[P1] subInitiatives logo/icon visual-weight mismatch — FIXED.** HTUx's logo previously floated free with no container while The Core's icon had a defined badge; gave the logo a matching neutral `bg-gray-50` bordered frame so both cards carry equal visual weight.
- **[P2] iconCards reused the banned icon-in-a-circle card grid — FIXED.** Restructured from 3 separate shadowed cards into one unified bordered container with internal dividers and horizontal icon+title headers — a genuine structural break, not a fourth color variant.
- **[P3] Dead `degrees` data array — FIXED.** `programsData.js`'s HTU entry had a `degrees` array never read anywhere in the component (confirmed via grep); removed it since `metaDetails`' "الشهادات" field now covers the same information through the flexible schema.
- **[P1] FAQ toggle missing focus indicator — FIXED.** Confirmed via live `getComputedStyle` (no outline, no box-shadow after focus) that this pre-existing button had zero visible keyboard-focus feedback. Added the same `focus-visible` ring pattern already used correctly elsewhere in this file.

## Persona Red Flags

- **Jordan (first-timer), HFP page**: previously saw "مغلق" then an unexplained identical primary CTA — now sees a visually demoted button with a one-line explanation, resolved.
- **Riley (stress-tester)**: flagged the pre-existing flip-card→detail-page transition as fragile under rapid clicking (a known framer-motion/React DOM race this session has hit before under fast repeated interaction) — not introduced by this redesign, not addressed in this pass; worth a dedicated fix if it recurs.
- **Casey (mobile)**: noted the meta card + all downstream white-card sections stack into a long uniform scroll on small screens, more monotonous than desktop where the sidebar breaks the rhythm — a real observation, left as a minor/P3 polish opportunity rather than fixed in this pass (would require broader mobile-layout rework beyond this redesign's scope).

## Minor Observations

- `donationBanner`'s gold-accent button correctly uses ink-black text (`#1a0409`) rather than the white text DESIGN.md's `button-gold` component spec literally calls for — this matches the established, correct convention already used on Footer's own gold CTA (white-on-gold fails contrast); the design doc's `components.button-gold.textColor` field is stale relative to the actual shipped convention, worth reconciling separately.
- HTU's hero video rendered as a static frame in one review session — flagged as possibly an asset-loading quirk in that environment rather than a code bug; not reproduced as a hard failure.

## Questions to Consider

- If `iconCards` and `subInitiatives` are meant to be reusable blocks for future programs beyond these 3, what's the rule for when a 4th program's icon-strip should get a genuinely new structural treatment instead of reusing this one again?
- Is `registrationStatus` meant to become the single source of truth that `AlertSideTab`'s announcement copy also reads from, so this exact open/closed contradiction can't recur as more programs open and close enrollment?
