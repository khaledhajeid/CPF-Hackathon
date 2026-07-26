# 04 — Execution Plan, A to Z

> A step-by-step roadmap for the engineering team taking this blueprint set into a new repository. Read `01`, `02`, and `03` before starting — this document sequences the work; it doesn't redefine it.

---

## Step 0 — Before writing any code

- [ ] Confirm the **new repository** location and access for the dev team.
- [ ] Obtain the **Comms icon pack** (referenced in `01-...md` §3.1) — don't start component work on any page that needs iconography without it, or you'll rework icons later.
- [ ] Confirm receipt-status of the **pending content items** listed in `01-...md` §5 (August activities calendar, program copy, program photos, news database, quote selection, `CPF TIMELINE.xlsx`, about-page map asset, Athar Sphere API details, target-audience-criteria decision, QR code flow). Timeline data and program-photo-folder access should already be available — pull those in during Step 3/4 rather than waiting.
- [ ] Confirm with the **Athar Sphere team** (the confirmed name of the external Impact System, per `01-...md` §7.0) what its API version, endpoint, auth token, and expected response shape will look like, even roughly — this materially informs the `Activity` model shape in Step 4 (`03-...md` §4.2, §5). Also confirm whether Athar Sphere's dashboard needs active syncing (per `01-...md` §7.0) beyond the read-only integration already planned.
- [ ] **Get an explicit answer on the two open decisions in `01-...md` §9** before Phase 2 planning locks in: (a) does Content Editor tooling stay in Phase 2, or move into Phase 1 (§9.3)? (b) is the CMS backbone staying Django Admin, or is WordPress (or similar) being adopted for news/youth stories (§9.5)? Both affect Phase 2's scope and, potentially, Phase 1's launch criteria — don't assume an answer.
- [ ] Decide monorepo vs. two-repo split (`frontend` / `backend`) — either is compatible with this blueprint; pick based on team deployment preferences and document the choice.

---

## Step 1 — Repo & environment setup

1. **Version control & CI skeleton.** Initialize the repo, branch protection on `main`, a CI pipeline stub (lint + test on PR) — even before there's much to lint/test, get the pipeline wired so it grows with the codebase rather than being bolted on later.
2. **Docker Compose for local dev**: Postgres service, Django service, (Redis reserved for Phase 2 caching per `03-...md` §5.3, can be added to compose now or later — cheap to include from the start).
3. **Next.js init** (App Router, JS or TS per the team's decision — TS recommended, `02-...md` §6): Tailwind CSS v4 wired in, ESLint config carried over/adapted from the mockup's `eslint.config.js` as a starting point.
4. **Django init**: `django-admin startproject config .`, Django Ninja installed, the `apps/` folder structure from `03-...md` §2 scaffolded with empty apps (`programs`, `activities`, `news`, `success_stories`, `about_content`, `contact`, `makers_map`, `integrations` stub, `accounts` stub).
5. **Environment config**: `.env.example` files for both frontend and backend documenting every required variable (DB connection, API base URLs, future secrets placeholders) — this is the first line of defense against secrets accidentally landing in git.
6. **Deploy target decision**: confirm hosting (e.g., a cloud provider's managed Postgres + container hosting for Django, Vercel or equivalent for Next.js, or a unified container-based deploy) — this affects a few config choices made in Step 1, better decided early than retrofitted before launch.

**Exit criteria:** `docker-compose up` brings up a working local Postgres + Django admin login page; `npm run dev` serves a blank Next.js page with Tailwind and the CPF font loading correctly, RTL (`dir="rtl" lang="ar"`) set on `<html>`.

---

## Step 2 — Global UI/Theming setup

1. **Port `DESIGN.md`'s tokens into the Tailwind config** as named theme colors (not raw hex scattered through components — `02-...md` §4.3): `brand-red`, `interactive-red`, `interactive-red-hover`, `gold`, `gold-hover`, `ink-black`, `footer-black`, `surface-bg`, `surface-panel`.
2. **Load `CPF-Font`** (the licensed HelveticaNeueLT Arabic face) via `next/font/local` or a `@font-face` in `globals.css`, with the system sans-serif fallback chain from `DESIGN.md`.
3. **Implement the Weighted Stroke Rule globally** (`DESIGN.md` §3 Named Rules) — the `-webkit-text-stroke: 0.6px currentColor` + `-0.02em` letter-spacing applied once, globally, to `h1`–`h6`/`.font-black`/`.font-bold` — not per-component.
4. **Build the shadow vocabulary** (Card lift / Ceremonial lift / Gold glow / Red-tinted lift, `DESIGN.md` §4) as Tailwind theme `boxShadow` extensions so components reference `shadow-card-lift` etc. rather than repeating raw shadow values.
5. **Root layout composition**: `Navbar`, `Footer`, `MobileNavBar`, `AccessibilityWidget`, `ChatWidget` mounted in the `(public)` route group's `layout.jsx` (`02-...md` §2).
6. **Build the `components/ui/` primitive set first**, before any page: `Button` (primary/gold/ghost variants per `DESIGN.md` §5), `Chip`, `Card`, `Input`, `Dropdown` (the reusable custom dropdown, `02-...md` §4.4), `Modal`. Every later page consumes these — building pages before primitives guarantees rework.

**Exit criteria:** a static style-guide/Storybook page (or a throwaway `/dev/ui-kit` route, torn down before launch) renders every `components/ui/` primitive in every documented state (default/hover/focus/disabled), visually matching `DESIGN.md`.

---

## Step 3 — Component library migration (rebuild, don't port)

Rebuild each mockup component cleanly against the new architecture — **use the mockup as a visual/UX reference, not as a source to copy-paste from.** The mockup's known bugs (documented in `02-...md` §5.2 and §4.2) must not be reintroduced.

Suggested order (roughly dependency order — later items lean on earlier ones):
1. `Navbar` / `MobileNavBar` / `Footer` / `TopUtilityBar` / `AccessibilityWidget`.
2. Home page sections: Hero (with the corrected, slower `AnimatedStatCounter` primitive — build this counter **once**, reused on both Home and About per `01-...md` §3.8), Opportunity/Registration strip, Pathway Wizard **UI shell only** (question logic pending, `01-...md` §3.2).
3. Programs list + filter UI + `ProgramCard`.
4. Program detail page sections (`ProgramHero`, `ProgramOverview`, the new multi-photo `ProgramGallery`, `ProgramFaq`, `ProgramSubInitiatives` — note "The Core" needs the scroll-to-anchor behavior, `01-...md` §3.2).
5. Activities/Events card + list (no points/rewards element — confirm this is genuinely absent, not just visually hidden, `01-...md` §4).
6. Makers Map (the interactive Google-Maps-based component, governorate + category filters using the shared `Dropdown` primitive — reuse it, don't rebuild the mockup's one-off version, `02-...md` §4.4).
7. News list/detail, success stories list/detail.
8. About page (quote block, foundation-role text, stat counters reusing the Home page's counter primitive, timeline, map section placeholder).
9. Contact page (general contact form + "انضم لشبكتنا" network-join form as a distinct tab/flow, per the mockup's proven UX pattern).

**At each component, apply the `02-...md` checklists inline, not as an afterthought:** contrast check, focus ring, keyboard operability, reduced-motion variant, mobile-first responsive pass.

**Exit criteria:** every component in this list renders correctly with **real API data from the Step 4 backend** (not hardcoded mock JSON) at all four reference breakpoints (360/390/768/1024+), passes an automated accessibility scan (axe-core or equivalent) with zero critical violations, and has no visible layout shift/jank when scrolled on a throttled-CPU device profile.

---

## Step 4 — Page assembly (Phase 1 scope only)

Implement exactly the scope in `01-...md` §3 — resist scope creep from §4/§6 (Phase 2 items) during this step.

1. **Backend first, per resource**, in roughly this order (unblocks frontend integration sooner for the highest-traffic pages first):
   - `Program`, `ProgramImage`, `ProgramSubInitiative`, `ProgramFaq` models + migrations + Django admin registration + Ninja endpoints. Seed via fixtures with mockup placeholder copy, clearly flagged as replaceable (`01-...md` §3.2).
   - `Activity` model + endpoints, seeded with whatever activities data is available (may start empty/placeholder pending the August calendar, `01-...md` §5).
   - `NewsArticle` model + endpoints, seeded from the current live site's recent content (`01-...md` §3.6).
   - `SuccessStory` model + endpoints.
   - `about_content` app: `Quote`, `FoundationRoleText` (seeded with the exact client-provided paragraph, `01-...md` §3.8), `StatCounter` (seeded with all current stats **plus** the two new ones — "4.5K شريك" and "120 موظف"), `TimelineEntry` (ingested from `CPF TIMELINE.xlsx`), `AboutMap` (placeholder row, `is_active=False` until the asset arrives).
   - `makers_map` app: `Governorate`, `MakerCategory`, `MakerSpace` — port the mockup's `makerSpacesData.js` real Jordan coordinates as seed data.
   - `contact` app: `ContactSubmission`, `NetworkJoinSubmission` endpoints, with rate limiting applied (`03-...md` §6.4) from the moment these endpoints exist, not added later.

2. **Frontend page assembly, per page**, wired to the now-live backend endpoints via the `lib/api/` layer (`02-...md` §3):
   - **Home**: hero with corrected counter speed + new "4.5K شريك" stat + renamed "تغطية كافة المحافظات" label; hover-"اكتشف" removed entirely; program tabs verified clickable end-to-end; مساحة الصنّاع/ملتقى الصنّاع merged to one tile; "available all year" tiles linking externally or internally-with-anchor as specified; Activities section wired to the `Activity` endpoint.
   - **بوابة الفرص (Opportunities Hub)**: subtitle removed, title standardized to "بوابة الفرص" everywhere; long-term-commitment line emphasized and "من الصفر" removed; Networks & Resources tab shows **Makers Map directly**, no 3-card selector (`01-...md` §3.4).
   - **Program detail pages**: multi-photo gallery live; sub-initiative CTAs (The Core → HTU scroll-anchor) verified.
   - **News**: top-3-featured carousel logic on the homepage; "crowd-driven" section as title+CTA-only; "عدسة الميدان" content curated from the live site.
   - **About**: exact paragraph inserted verbatim; both new stats present; counters using the shared, corrected-speed primitive; timeline rendering from ingested `CPF TIMELINE.xlsx` data; map section present as a placeholder/hidden block pending the real asset.
   - **Contact**: both forms functional against the real `contact` endpoints.
   - Explicitly **verify absence** of: Partnerships page/route, Publications page/route, Entities Directory and Youth Networks routes/nav entries, any points/rewards UI element anywhere.

**Exit criteria:** every checklist item in `01-...md` §3 is demonstrably implemented; every item in `01-...md` §4 is demonstrably absent from the built site (not just unlinked — verify no orphaned route still resolves).

---

## Step 5 — QA, performance audits, and deployment prep

1. **Functional QA against `01-...md` §3 line-by-line** — this is a literal checklist walkthrough, not general exploratory testing. Several items are exact copy/label changes (e.g. "تغطية كافة المحافظات") that are easy to silently get "close enough" wrong.
2. **Accessibility audit**: automated (axe-core/Lighthouse) across every page, plus a manual keyboard-only navigation pass and a screen-reader spot-check on at least the Home, Programs, and Contact pages. Confirm the gold/white contrast issue from the mockup (`02-...md` §4.2) has not been reintroduced anywhere.
3. **Performance audit**: Lighthouse mobile scores on a throttled connection/CPU profile (simulating the actual low-end-device audience, per `PRODUCT.md`'s stated hard constraint); verify no animated layout-triggering CSS properties slipped in (`02-...md` §5.1); verify image assets (program galleries especially, now that each program has 3–4 photos) are properly optimized/responsive (`next/image` with appropriate `sizes`, not full-resolution originals shipped to mobile).
4. **Security review** against `03-...md` §6 checklist: CORS allow-list confirmed (no wildcard in production), CSRF configuration verified, rate limiting confirmed active on both form endpoints, all secrets confirmed absent from the repo (a `git-secrets`/`trufflehog` scan of the full history before the repo goes anywhere public is worth the hour it takes), HTTPS-only settings confirmed in the production Django settings module.
5. **RTL correctness pass**: every page reviewed directly in RTL (not just "does it look mirrored correctly from an LTR build") — icon placement, flex/grid child order, text alignment, form field order.
6. **Content readiness check**: cross-reference `01-...md` §5's pending-content list — confirm every item that *has* arrived by this point is correctly ingested, and every item still pending has a clean, non-broken placeholder/empty state (not a visibly broken or obviously-fake section).
7. **Deployment**: production environment variables set (never copied from `.env.example` verbatim), database migrations run against the production Postgres instance, static/media asset storage (S3-compatible or equivalent) configured and verified, CDN/reverse-proxy rate limiting active (`03-...md` §6.4), monitoring/error-tracking (e.g. Sentry) wired for both the Next.js and Django applications before the first real user hits the site.
8. **Post-launch handoff**: confirm the client/Comms team knows exactly which pending content items (from `01-...md` §5) are still needed, and that delivering them is a content update (CMS/fixture) rather than requiring an engineer — this was the entire point of the data-modeling discipline in `03-...md` §4.

**Exit criteria:** `01-...md` §8's "Definition of done for Phase 1" is fully satisfied, sign-off obtained from the client against the original `Notes for Website Development.pdf` checklist, and the site is live.
