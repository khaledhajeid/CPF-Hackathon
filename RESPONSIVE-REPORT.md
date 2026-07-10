# 13-inch Laptop Responsive Audit

**Scope:** source review of every React page and component in `src/` (37 JSX files). No application source was changed.

## Target used

- Baseline: **1280 × 800 CSS px**, a common 13-inch laptop working viewport at 100% browser zoom.
- Your preferred 80% browser zoom normally exposes about **1600 CSS px** across (the exact number changes with display scaling). That is more forgiving than the baseline, so the items below are the places to protect first.
- `npm run build` completed successfully on 10 July 2026.

## Overall result

The public website is already well prepared for a 13-inch laptop. Most sections use a centred max-width container, two/three-column grids only at `md`/`lg`, and horizontal carousels only on small screens. At 1280px, it should not look oversized or "chunky"; at 80% zoom, the layout has even more room.

Do **not** make a broad global font-size or scale reduction. That would hurt readability and is not needed. Make only the three targeted desktop refinements below if you want the most comfortable 13-inch experience.

## Recommended edits, in priority order

### 1. Admin event calendar — high priority

**File:** `src/pages/AdminDashboard.jsx` (calendar section around lines 281–294)

The desktop event view becomes a 9/3-column split at `xl` (1280px), while the calendar itself requires `min-w-[900px]`. After the 280px sidebar and page padding, the calendar column is far narrower than 900px. The existing `overflow-x-auto` prevents page breakage, but the main working area is horizontally scrollable on a typical 13-inch screen.

**Edit:** keep the calendar and the side list stacked until `2xl`, or remove/reduce the 900px minimum and supply a compact calendar presentation below `2xl`.

**Best small change:** change `xl:grid-cols-12`, `xl:col-span-9`, and `xl:col-span-3` to their `2xl:` equivalents. The current horizontal-scroll fallback can remain for genuinely narrow views.

### 2. Desktop navigation at 1024–1279px — medium priority

**File:** `src/components/Navbar.jsx` (around lines 54–100)

At `lg` (1024px), the full navigation shows seven Arabic links, a logo, search, and login. It has reduced gaps and font sizes, so 1280px should fit, but it has almost no spare room on a 13-inch laptop with browser side panels, non-default display scaling, or a longer translated label.

**Edit:** use the existing slide-out menu for widths below `xl` rather than showing all desktop links at `lg`. Keep the current full desktop header from `xl` upward.

This is a resilience improvement, not a defect at 1280px.

### 3. Strategic pathways near the desktop breakpoint — medium priority

**File:** `src/components/home/LuxuryPathways.jsx` (around lines 66–103)

The expanded card content is `lg:w-[600px]`, but the desktop accordion activates at `lg` (1024px). Between 1024px and roughly 1200px, the active flexible card can be narrower than its 600px content area, which may make content feel crowded or clipped.

**Edit:** either start the desktop accordion at `xl` (keep the horizontal swipe layout below it), or replace `lg:w-[600px]` with a fluid width such as `lg:w-full lg:max-w-[600px]` and reduce its desktop padding at the lower desktop range.

This does not affect a full 1280px viewport significantly, but it prevents the awkward transition just below it.

## Components/pages that need no 13-inch change

| Area | Result at laptop desktop widths |
| --- | --- |
| App shell, Navbar/MobileNavBar, search, chat, accessibility | Desktop/mobile controls are intentionally separated; app shell prevents accidental page-level horizontal overflow. |
| Home: hero, stats, programs, map, events, pathway wizard | Uses max-width containers and `lg` two-column layouts; event cards move to 2/3 columns without fixed desktop card widths. |
| Programs, program details, national programs, related stories, event drawer | Content stacks first and moves to columns at `md`/`lg`; drawers/modals constrain their height and scroll internally. |
| News: magazine hero, editorial grid, visual pulse, news modals | Desktop grids begin at `md`; fixed-width cards are limited to the mobile carousel state. |
| Success stories and share modal | Desktop uses 2/3-column grids; filters and cards have deliberate small-screen horizontal scrolling only. |
| About, partnerships, contact, footer | Responsive grid breakpoints and fluid form fields are appropriate; no fixed desktop-width content found. |
| Explorer and user dashboard | Split panels start only at `lg`; their containers are fluid and use internal vertical scrolling as intended. |
| Login, Sanad modal, event details drawer | Modal width is capped/fluid and the desktop two-column layout starts at `md`. |

## Deliberate horizontal scrolling — leave as is

The following are controlled, small-screen interactions and should **not** be removed just to eliminate the `overflow-x-auto` class:

- News cards/filters and visual-pulse cards
- Success-story cards and filters
- Home event cards and ecosystem-program cards
- Related program news
- Mobile dashboard tabs
- About-page partner/testimonial carousels

They turn into normal grids at `md`, `lg`, or `xl`, so they are not a 13-inch laptop concern.

## Verification note

This report is a source-level responsive audit plus a successful production build. The local browser automation surface was not available in this session, so it does not claim screenshot-based visual testing. Before applying the three optional refinements, manually check the Admin **Events** tab and the full navbar at 1280px/100% and at your own 80% zoom; those are the only areas that merit focused visual confirmation.
