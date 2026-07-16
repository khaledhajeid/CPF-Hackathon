---
name: Crown Prince Foundation
description: The national gateway connecting Jordanian youth to every CPF opportunity, rendered in ceremonial burgundy and gold.
colors:
  cpf-red: "#721F31"
  interactive-red: "#8a1538"
  interactive-red-hover: "#680f2a"
  gold: "#C08F2D"
  gold-hover: "#a67b25"
  ink-black: "#1a0409"
  footer-black: "#3b1019"
  surface-bg: "#fcfcfc"
  surface-panel: "#F8FAFC"
  text-body: "#4c4c4c"
typography:
  display:
    fontFamily: "CPF-Font, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "CPF-Font, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "CPF-Font, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.25rem)"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "CPF-Font, sans-serif"
    fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "CPF-Font, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.02em"
rounded:
  pill: "9999px"
  lg: "0.75rem"
  xl: "1rem"
  2xl: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.interactive-red}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.875rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.interactive-red-hover}"
    textColor: "#ffffff"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.875rem 2rem"
  button-gold-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.interactive-red}"
  input-default:
    backgroundColor: "{colors.surface-panel}"
    textColor: "#111827"
    rounded: "{rounded.lg}"
    padding: "0.875rem 1rem"
  card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
---

# Design System: Crown Prince Foundation

## 1. Overview

**Creative North Star: "The National Atrium"**

A grand public hall, not a boardroom and not a bazaar: dignified enough that a minister feels at home, warm enough that a nineteen-year-old doesn't feel lectured at. Every surface carries the same three-word brief the client confirmed — prestigious/national/aspirational, warm/empowering/youthful, confident/modern/results-driven — held together rather than traded off against each other. The system is Arabic-first and RTL-native from the ground up: layout decisions (icon placement, flex/grid child order, visual alignment) are made directly in RTL, never adapted from an LTR default after the fact.

The palette is **Committed**, not Restrained: CPF Red carries large flat surfaces and headline weight, while Gold is rationed to functional signal — badges, seams, active markers, the rare CTA that needs to feel earned. This system explicitly rejects the generic SaaS/startup toolkit: no gradient text, no side-stripe borders as colored accents, no tiny uppercase tracked eyebrows above every section, no icon-in-a-circle card grids, no hero-metric-template clichés. Luxury here reads through typography weight, generous whitespace, and soft diffuse shadows — not through decoration.

Performance is treated as part of the luxury, not a tradeoff against it: every animation is authored as a hardware-accelerated `transform`/`opacity` tween so it stays smooth on low-end mobile devices and older desktops, not just flagship hardware.

**Key Characteristics:**
- Committed color strategy: CPF Red owns the surface, Gold marks significance
- RTL-first Arabic typography, artificially weighted via a global stroke trick (see Typography)
- Soft-lifted, diffuse shadows in place of hard-edged elevation
- Pill-shaped primary CTAs; rounded-xl for functional/form surfaces
- Compositor-only motion (`transform`/`opacity`), asymmetric open/close timing
- No generic SaaS-marketing patterns: no gradient text, no side-stripe accents, no eyebrow labels, no card-grid monoculture

## 2. Colors

A Committed strategy: CPF Red is the dominant surface and headline color; Gold is a narrow, functional accent that is never allowed to become decorative wallpaper.

### Primary
- **CPF Red / Burgundy** (`#721F31`): the brand's flat institutional red. Owns large surface blocks — full-bleed section backgrounds (the "Pathway CTA" band), dark panel fills, and anywhere the brand needs to read as a solid field of color rather than an interactive element.
- **Interactive Red** (`#8a1538`, variant of the above): the touchable/readable expression of the same red family. Owns anything a user acts on or reads as emphasis — primary buttons, links, active nav states, hover borders/rings, and large stat numerals. Hover/pressed state deepens to `#680f2a`.

### Secondary
- **Gold** (`#C08F2D`): a functional highlight, not a decorative one. Used narrowly — badges/pills, decorative seams on drawers and headers, active-tab underlines, icon accents, and the occasional CTA that needs to feel ceremonial rather than routine. Hover/pressed state deepens to `#a67b25`.

### Neutral
- **Ink Black** (`#1a0409`): near-black maroon used for the darkest panels (split-screen login backdrop, deep decorative fills).
- **Footer Black** (`#3b1019`): a lighter dark maroon, the Footer's base surface.
- **Paper** (`#fcfcfc`): the default page background — an almost-white, never a warm cream.
- **Panel** (`#F8FAFC`): a cool pale slate used under form inputs and small internal tab-switchers.
- **Ink Body** (`#4c4c4c`): default body-copy gray. Tailwind's default gray scale (100/200/300/500) carries borders, dividers, and secondary text on top of this.

### Named Rules
**The Red Duality Rule.** CPF Red (`#721F31`) owns large flat surfaces; Interactive Red (`#8a1538`) owns anything touchable or readable. Never swap their jobs — a button in flat CPF Red or a section background in Interactive Red both read as a mistake.

**The Gold Discipline Rule.** Gold never fills a surface; it marks. If gold is covering more than a badge, a seam, an underline, or a single CTA, it has drifted from accent to wallpaper — pull it back.

## 3. Typography

**Display Font:** CPF-Font (a licensed HelveticaNeueLT Arabic face, regular 400 + bold 700), falling back to system sans-serif.
**Body Font:** Same family, regular weight.

**Character:** One Arabic-first sans at two real weights, artificially pushed a step heavier everywhere it needs to feel premium — the system doesn't have a true black/900 cut, so it fakes one deliberately rather than settling for a merely-bold headline.

### Hierarchy
- **Display** (700, `clamp(1.875rem, 4vw, 3.75rem)`, 1.1 line-height): hero stat numerals, top-of-page headline figures.
- **Headline** (700, `clamp(1.25rem, 2.5vw, 1.875rem)`, 1.2): section-level headings ("اشترك في نشرتنا الإخبارية").
- **Title** (700, `clamp(1.125rem, 1.5vw, 1.25rem)`): card and column headers (footer link-group titles, drawer headers).
- **Body** (400, `clamp(0.8125rem, 1vw, 0.9375rem)`, 1.6 line-height): paragraph copy and list items; cap prose measure at 65–75ch.
- **Label** (700, `0.6875rem`, 0.02em tracking): badges, pills, small status tags — normal case, not uppercase; this system doesn't use the uppercase-tracked-eyebrow convention.

### Named Rules
**The Weighted Stroke Rule.** Because there's no true black-weight file, every `h1`–`h6`, `.font-black`, and `.font-bold` element gets a global `-webkit-text-stroke: 0.6px currentColor` plus `-0.02em` letter-spacing (defined once in `index.css`), simulating extra heft on top of the 700 cut. This is applied globally already — never add a manual stroke to an individual component, and never skip `font-black`/`font-bold` thinking a heavier weight exists to reach for instead.

## 4. Elevation

Soft-lifted luxury: shadows are diffuse, generously blurred, and low-opacity, never tight or hard-edged. Standard Tailwind `shadow-md`/`lg`/`xl`/`2xl` cover everyday lift; premium and interactive surfaces (drawers, hero CTAs, the Footer contact card) additionally use hand-tuned soft shadows, sometimes tinted with the brand hue at low opacity rather than pure black.

### Shadow Vocabulary
- **Card lift** (`shadow-xl` / `shadow-2xl`, or `0 10px 40px rgba(0,0,0,0.08)`): default resting elevation for panels, cards, and dropdowns.
- **Ceremonial lift** (`0 25px 50px -20px rgba(0,0,0,0.5)` or `0 20px 50px -15px rgba(0,0,0,0.15)`): large, very soft blur for signature surfaces — the Footer contact CTA, the AlertSideTab drawer panel.
- **Gold glow** (`0 0 20px rgba(192,143,45,0.4)` up to `0 0 30px rgba(192,143,45,0.6)`): reserved for gold-accented interactive moments — button hover states, active badges.
- **Red-tinted lift** (`0 10px 30px rgba(138,21,56,0.08)`): a brand-tinted alternative to a pure-black card shadow, used sparingly on red-adjacent surfaces.

### Named Rules
**The Soft-Lift Rule.** Elevation always reads as a large, low-opacity blur — never a small tight shadow. If a shadow looks like a hard drop rather than a soft lift, the blur radius is too small or the opacity too high.

## 5. Components

### Buttons
- **Shape:** pill (`rounded-full`, `9999px`) for primary marketing/nav CTAs; `rounded-xl` (`0.75rem`) for form, dialog, and utility buttons.
- **Primary:** Interactive Red background, white text, `font-black`, generous padding (`px-8 py-3.5` scale). Hover deepens to `#680f2a` with a lifted shadow (`shadow-md` → `shadow-xl`).
- **Gold / ceremonial variant:** Gold background, white text; hover inverts to white background with Interactive Red text — used for the rarer, more significant CTA (e.g. the Footer "تواصل معنا" button).
- **Secondary / Ghost:** white background, `border-gray-200`, gray text, hover lifts border to gray-300 with `shadow-sm` — used for lower-emphasis actions (social login, "read more").

### Chips / Badges
- **Style:** `rounded-full`, small pill. At rest: red-tinted background at ~5–10% opacity with red text and a matching low-opacity border. On hover/active: flips to solid Interactive Red background with white text.
- **State:** normal-case label text (never uppercase), `font-bold`, `0.6875rem`–`0.75rem` size.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (`1rem`) for standard cards, `rounded-3xl` (`1.5rem`) for hero panels and drawers.
- **Background:** white, or the Interactive-Red-to-Ink-Black gradient for ceremonial cards (Footer contact CTA).
- **Shadow Strategy:** see Elevation — Card lift by default, Ceremonial lift for signature cards.
- **Border:** `border-gray-100` on light cards; a low-opacity gold border (`border-[#C08F2D]/25`) on ceremonial dark cards.
- **Internal Padding:** generous, `p-6` to `p-8`, scaling up at `xl`/`2xl`.

### Inputs / Fields
- **Style:** Panel background (`#F8FAFC`), `border-gray-200`, `rounded-xl`.
- **Focus:** background lifts to white, border shifts to Interactive Red, plus a soft `ring-4` glow at 10% opacity (`ring-[#8a1538]/10`) — never a hard focus outline.
- **Error / Disabled:** disabled state drops to flat gray background and gray text with `cursor-not-allowed`.

### Navigation
- Fixed to the top (`z-[100]`), transparent with white text over a hero image, flipping to a white background with a soft shadow and dark text once the page scrolls. Active links are marked by a gold underline bar that grows from 0 to full width — never a background pill. Mobile collapses into a full-height slide-out drawer from the screen edge (right, respecting RTL) with spring physics.

### Announcements Side-Tab (signature component)
A docked, permanently-visible burgundy pill fused to the screen edge, pulsing a continuous gold ripple ring while collapsed as its own attention mechanic (no generic red dot, no sparkle icon). Tapping slides open a `rounded-l-3xl` white drawer via a pure-`transform` tween — deliberately asymmetric timing, opening slower (0.36s) than it closes (0.24s) so closing never reads as sluggish. The drawer header is a solid Interactive-Red-to-hover-shade gradient band with a thin gold seam along its base, echoing the collapsed tab's own gold seam.

### Footer Contact CTA (signature component)
A ceremonial card breaking from the flat footer list-column pattern: an Interactive-Red-to-Ink-Black gradient card with a low-opacity gold border, a gold icon badge, and a full-width Gold primary button that inverts to white-on-red on hover. This is the site's single, deliberately prominent "get in touch" moment — it should never be duplicated as a plain text link elsewhere.

## 6. Do's and Don'ts

### Do:
- **Do** keep CPF Red (`#721F31`) on large flat surfaces and Interactive Red (`#8a1538`) on anything touchable — The Red Duality Rule.
- **Do** ration gold to badges, seams, underlines, and single ceremonial CTAs — The Gold Discipline Rule.
- **Do** animate only `transform`/`opacity`; treat animated `box-shadow` or layout properties as a bug, not a style choice.
- **Do** respect `prefers-reduced-motion` on every animation with a crossfade or instant fallback.
- **Do** validate every layout in RTL directly — first DOM child renders at the visual right in a flex/grid row.
- **Do** keep the UI lightweight enough to run smoothly on low-end mobile devices and older desktop computers; avoid heavy `backdrop-filter` blur as a default treatment.

### Don't:
- **Don't** use gradient text (`background-clip: text` + gradient) for emphasis — use weight or the Interactive Red/Gold roles instead.
- **Don't** use a colored `border-left`/`border-right` as a decorative stripe on cards or list items.
- **Don't** add a tiny uppercase tracked eyebrow label above every section — this system doesn't use that convention.
- **Don't** default to identical icon-in-a-circle card grids; vary structure per section.
- **Don't** reach for the generic hero-metric-template (big number, small label, gradient accent) — the existing AnimatedNumber stat blocks already have a distinct, non-generic treatment; match that, don't genericize it.
- **Don't** let gold cover more surface than a badge, seam, or single CTA — if it starts reading as a background color, pull it back.
