# 01 — Project Vision & Phase 1 Scope

> **Audience:** Engineering leads, PMs, and any AI agent picking up this repository cold.
> **Status:** Single source of truth for what Phase 1 *is* and *is not*. If a ticket or a prompt conflicts with this document, this document wins until a human explicitly updates it.

---

## 1. What this project is

The Crown Prince Foundation (CPF) website is **the national gateway connecting Jordanian youth to every opportunity under one royal-backed foundation.** It is not a brochure site and not a SaaS product — it is public digital infrastructure for a national institution, and the engineering bar should match that: correct, accessible, fast on low-end devices, and secure by default.

The current repository (`cpf-app`) is a **frontend-only visual mockup** — a React/Vite prototype built to prove out the design system ("Soft-Lifted Luxury" / "The National Atrium" — see `DESIGN.md` in the mockup repo) and the page-level UX. It uses fictional/placeholder data, a fake client-side auth flow (`Login.jsx`), and a mocked admin dashboard. **None of this mockup's code ships to production.** It exists purely as a design and UX reference for the rebuild described in this blueprint set.

The rebuild target is a **production-ready full-stack application**:
- **Frontend:** Next.js (App Router), TanStack Query, Zustand, Tailwind CSS, Framer Motion.
- **Backend:** Django + Django Ninja, PostgreSQL.
- **New repository.** This blueprint set is written to be dropped into a brand-new repo and read by a dev team (human or AI) with zero prior context.

### 1.1 Business vision

CPF's site must accomplish two things simultaneously, not sequentially:

1. **Convert curious youth into applicants.** A 19-year-old browsing on a mid-range phone should be able to find a program that fits their ambition and register for it within a few taps — guided discovery, not a maze of menus.
2. **Build institutional trust with donors, government stakeholders, and partners.** The same visitor experience must read as credible, national-scale, and royal-backed to an adult evaluating whether to fund or partner with the Foundation.

The brand personality that carries both jobs at once: **prestigious/national/aspirational**, **warm/empowering/youthful**, **confident/modern/results-driven** — held together, never traded off. See `DESIGN.md` for the full visual language (colors, typography, motion rules) this rebuild must reproduce faithfully in clean, new code.

### 1.2 Enterprise standards required

Because this is a public-facing site for a national institution, the following are non-negotiable engineering standards for Phase 1, not aspirational goals for later:

- **Accessibility:** WCAG AA baseline across all public pages — contrast ratios, focus rings, keyboard navigation, reduced-motion support.
- **RTL-first:** Arabic is the primary and default language. Every layout decision is authored in RTL directly, not adapted from an LTR default. (Phase 1 is Arabic-only; an i18n-ready structure is still required so English can be added later without a rewrite — see `02-FRONTEND_ARCHITECTURE.md`.)
- **Performance on low-end hardware:** The primary audience includes youth on budget Android devices and older desktops in public access points (libraries, youth centers). No heavy `backdrop-filter`, no animated layout properties, compositor-only motion, aggressive image optimization.
- **Security appropriate to a government-adjacent institution:** see `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` in full — CORS, CSRF, rate limiting, input validation, and a clean path to JWT-based auth in Phase 2.
- **Clean separation of concerns:** Phase 1 ships public informative pages only, but the architecture (data models, API shapes, component structure) must not need to be re-architected when Phase 2 adds CMS, Admin Dashboard, and User Auth. Build the foundation once; build it right.

---

## 2. Source of truth for scope

Scope for this phase was defined by the client in **`Notes for Website Development.pdf`** (repo root). That document is a punch-list of corrections and constraints against the existing mockup, organized by page. This section translates it into an explicit, engineering-readable scope contract. Where the PDF used relative/informal language, this document resolves it to a concrete requirement.

**Any ambiguity in this section should be resolved by re-reading the source PDF before guessing.**

---

## 3. Phase 1 — IN SCOPE

### 3.1 Global / cross-cutting

- **Icon consistency.** All iconography must use the icon set provided by Comms (see the "Icons" link in the notes PDF — obtain the actual asset pack from the client before Phase 1 UI work begins). Do not mix in ad-hoc icon libraries (the mockup uses `lucide-react` ad hoc; the production icon set must be sourced from Comms and used consistently across every page).
- **RTL Arabic, single language** for Phase 1 (English/i18n scaffolding is prepared in the architecture but not required to be content-complete).

### 3.2 Home page (`/`)

- **Remove the hovering "اكتشف" ("Discover") affordance** from the hero — in the mockup (`LuxuryHero.jsx`) this is a hover-triggered label with no destination. It must not exist in production unless/until it is wired to a real destination.
- **Slow down the animated hero stat counters** ("numbers in the white rectangle") — the count-up animation currently completes too fast to be legible; increase duration so the number is actually perceived incrementing, not just flashing to its final value.
- **Add a new stat: "4.5K شريك"** ("4.5K partners") to the hero stat block.
- **Rename a stat label:** replace **"محافظة داخل المملكة"** with **"تغطية كافة المحافظات"** ("coverage of all governorates") — this is a copy change, not a new metric.
- **All program tabs must be clickable** and route to that program's info/detail page. (In the mockup this is `Programs.jsx` → `ProgramDetails.jsx` via `programsData.js`; audit every tab to confirm none silently no-op.)
- **Merge "مساحة الصنّاع" and "ملتقى الصنّاع"** into a single, non-separated program entry — these are currently presented as two distinct items on the home page and must become one.
- **"Available all year long" tile links** (e.g. Nahno, HTUx, "The Core") must deep-link to the program's **real external website** when one exists. If no external site exists, link to that program's internal info page. **Special case: "The Core"** must link to the HTU (Al-Hussein Technical University) program info page **scrolled to its dedicated "The Core" section**, not just a bare page load — i.e., the destination needs an anchor/scroll-to-section behavior, not a plain navigation.
- **AI question logic:** the home page (or Pathway Wizard) references an AI-driven question flow. **Content/logic for this is pending from Ahmad Marei** (client-side stakeholder) — build the UI shell and integration point, but do not hardcode placeholder logic as if final; treat the actual question set/branching logic as an external content dependency (see §5, Deferred/Blocked Content).
- **Activities section (bottom of home page):** the client will supply the full August activities calendar. Build the section to consume a real data source (mocked with realistic shape now, see `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` §4 Data Modeling); content itself is a pending deliverable, not a blocker to building the component.

### 3.3 Opportunities Hub — بوابة الفرص (Programs & Opportunities page)

**Phase 1 scope for this page is intentionally narrow.** It ships exactly three sub-areas:
1. **Programs** (البرامج) — the full national program catalog and detail pages.
2. **Activities** (الفعاليات) — the short-form skills/events calendar.
3. **Networks & Resources** (شبكات وموارد) — **Makers Map only** (see §3.4 below — Youth Networks and Entities Directory are explicitly deferred).

Additional required changes:
- **Remove the descriptive subtitle** currently under the page's main title (the mockup's "استكشف المبادرات الاستراتيجية لمؤسسة ولي العهد، أو ابحث في مئات الفرص والفعاليات والورش التدريبية المتاحة للشباب في مختلف المحافظات." paragraph). The page ships with just the title, no subtitle.
- **Standardize the page title as "بوابة الفرص"** everywhere it's referenced (nav label, page `<h1>`, breadcrumbs, `<title>` tag) — the mockup is inconsistent about this naming; production must not be.
- **Increase the visual prominence** of the line **"برامج ومبادرات مختارة تتطلب التزاماً طويل الأمد"** ("selected programs and initiatives requiring long-term commitment") in the Programs tab — currently under-emphasized. **Remove the trailing phrase "من الصفر"** ("from scratch") from this line entirely.
- **Program content is a pending client deliverable** — the client will confirm and send final program copy (title, description, eligibility, etc.) per program ASAP. Build the CMS-ready data model now (see `03-BACKEND_ARCHITECTURE_AND_SECURITY.md`); do not block page-shell construction on receiving final copy — populate with the current mockup's placeholder copy until the real content lands, clearly flagged as replaceable.
- **Each program detail page needs 3–4 curated photos**, sourced from the photo folder Comms shared, per program — youth feedback from user testing specifically asked for more photographic context per program to build trust/relatability. This is a content + data-model requirement: the program model must support an array of curated images (not just one hero image), see the `Program` model in `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` §4.
- **In the Activities tab, increase the visual prominence** of the line **"فرص وفعاليات قصيرة لتطوير مهاراتك بسرعة"** ("short opportunities and activities to quickly build your skills").
- **August activities/calendar data** is a pending client deliverable (same as home page activities — same underlying data source, see §5).
- **Remove the "متابعة القراءة" / "learn more" affordance from activity cards** (mockup note: "remove the learn lead... from the activities cards" — read as removing the card's secondary "learn more"/lead-in link, keeping only the primary action).
- **No points/rewards system on cards at this stage.** The mockup's `EventsExplorer.jsx` / `HomeEvents.jsx` render a `+{event.points} نقطة` badge on every event/activity card — **this entire points/rewards UI element must not exist in the Phase 1 build.** The underlying gamification/points system is out of scope entirely for Phase 1 (see §4).

### 3.4 Networks & Resources — شبكات وموارد (sub-tab of Opportunities Hub)

**Phase 1 ships Makers Map only.** The mockup (Phase 13/13.5 of this project's prior iteration) built three sub-sections here — Entities Directory (دليل الجهات), Youth Networks (الشبكات الشبابية), and Makers Map (خريطة الصنّاع) — as a fully-featured hub with a 3-card entry screen. **For Phase 1, Youth Networks and Entities Directory must be hidden/not built.** Only the Makers Map ships, with its interactive map, governorate filter, and category filter exactly as prototyped in the mockup (`MakersMap.jsx` component — real Google Maps integration, click-to-pan-and-zoom, custom governorate dropdown). Do not build a 3-card selection screen for one item — if Makers Map is the only sub-section, it should be the direct content of the "شبكات وموارد" tab, not gated behind an extra navigation step.

> This is a direct scope reduction from the earlier mockup iteration (which built all three sub-sections in full). Entities Directory and Youth Networks are **not deleted work** — they are deferred, fully-designed, ready to ship in a later phase (see §4, Deferred).

### 3.5 Success Stories (قصص شبابنا)

- No changes requested for Phase 1. Additional story batches will be sent by the client as they're received — the data model must support incremental content additions without a redeploy of code (i.e., stories are data, not hardcoded JSX).

### 3.6 News (أخبارنا)

- **Full news database** will be shared by the client and should be ingested ASAP once available — build the News model/list/detail views to consume a real, paginated data source now.
- **Until the full database arrives**, use the current live website's most recent content as seed data. **Select the top 3 news items for the homepage's main carousel.**
- **"صناعة الأخبار" / crowd-driven section:** ship as a **title + a "share" call-to-action only** — there is no real user-generated content to display yet. Do not fabricate placeholder UGC; this section intentionally ships as an empty-state-with-CTA in Phase 1. (If the client later wants actual crowd submissions collected, that becomes a Phase 2 feature requiring auth + moderation — flag as a possible Phase 2 item, don't build it now.)
- **"عدسة الميدان" ("Field Lens") section:** source content from the original live CPF website; editorially select the best highlights (a content curation task, not an engineering task) rather than fabricating new content.

### 3.7 Partnerships / Partners page

- **No Partners page in Phase 1.** This entire page is deferred to Phase 2. Do not build routing, models, or UI for it now. (The mockup's `PartnershipsPage.jsx` is prototype-only reference material for Phase 2.)

### 3.8 About CPF (عن المؤسسة)

- **Quote section:** use the existing quote already on the live site, or select an alternative from the shared `HRHCP's Quotes - DK 11.2 - Copy.xlsx` spreadsheet. **Selection constraint:** the chosen quote must be broad/general in scope — not narrowly about a single theme like volunteering or technology. (Content/editorial decision — flag for client sign-off before locking it into the CMS, but the field/model must support easily swapping this quote without a code deploy.)
- **"دور المؤسسة" (Foundation's Role) section** must include this exact client-provided paragraph beneath the heading (store verbatim as CMS content, do not alter wording):

  > "الوصول للشباب في كافة محافظات المملكة والاستماع لرغباتهم وطموحاتهم وتقديم الفرص والبرامج والموارد التي تمكنهم من الوصول لطموحاتهم وأهدافهم. نؤمن في مؤسسة ولي العهد ان كل شاب وشابة في كافة محافظات الوطن لهم الحق في الوصول لأفضل الخدمات والفرص التي تساهم في تمكينهم لخدمة الوطن وتطوره."

- **Slow down the animated stat counters** here too (same underlying issue/fix as the home page hero counters — this should be one shared, reusable animated-counter primitive across both pages, not two separately-tuned implementations).
- **Consider a boxed/iconed layout for each stat** — client recommendation is a treatment similar to the original live website's stat presentation, adapted to whatever reads best in the new design system; this is a design decision for the frontend team, not a hard requirement.
- **Add two new stats:** **"4.5K شريك"** (partners — same stat as the home page) and **"120 موظف"** (120 employees).
- **A map is planned for this page**, to be placed **before** the "رحلة المؤسسة" (Foundation Journey / timeline) section. **The map content/asset is pending from Ahmad Marei** — build the section's placement and layout shell, but the actual map integration is blocked on that external input (see §5).
- **Timeline ("رحلة المؤسسة") content** is available and ready now, in the client-shared `CPF TIMELINE.xlsx` spreadsheet — ingest this into timeline entry data (date/title/description per milestone) as part of Phase 1 build, no blocker here.
- **No Publications page in Phase 1.** (The mockup's `PublicationsPage.jsx`, built in an earlier iteration of this project, is deferred entirely — same treatment as Partnerships, see §3.7.)

---

## 4. Phase 1 — EXCLUDED / DEFERRED

Explicitly **not** part of Phase 1. These are not lower priority within Phase 1 — they are out of scope for this phase's engineering effort entirely, and should not be started without an explicit scope change from the client.

| Item | Status | Notes |
|---|---|---|
| **Publications page** ("التقارير والدراسات") | Deferred | Explicitly excluded per client notes: "No publication page at this phase." Fully designed in the prior mockup iteration as reference. |
| **Partnerships / Partners page** | Deferred to Phase 2 | Explicit client note: "No partners page till now, will be for phase 2." |
| **Entities Directory** (دليل الجهات) — within Networks & Resources | Deferred | Fully built in mockup; hidden for Phase 1 per client note ("we will hide the youth and the organizations"). |
| **Youth Networks** (الشبكات الشبابية) — within Networks & Resources | Deferred | Same as above. |
| **Points / rewards / gamification system** | Excluded entirely for this stage | Client: "We won't have the points/rewards at this stage at the cards." Not a display toggle — the feature itself is out of scope; do not build a hidden/dormant points model expecting to "just turn it on" later without a dedicated design pass. |
| **AI question logic / Pathway Wizard branching intelligence** | Blocked on external input | Ahmad Marei will provide the actual questions and decision logic. Build the UI shell/integration point only. |
| **Real "crowd-driven" user-generated content** in News | Deferred (possibly Phase 2) | Ships as title + share CTA only in Phase 1; actual UGC collection/moderation is a bigger feature (needs auth) not scoped yet. |
| **About page map** | Blocked on external asset | Pending from Ahmad Marei; layout shell only in Phase 1. |
| **CMS authoring UI, Admin Dashboard, User Auth** | Phase 2 | See §6 below — Phase 1 architecture must not preclude these, but none of this UI/functionality ships in Phase 1. The mockup's `AdminDashboard.jsx` and `Login.jsx` are prototype-only reference material, not production code. |
| **"Opportunities and Events" live data (Impact System)** | Phase 2 integration; Phase 1 uses static/mocked data | See §7 below — full strategy. |

---

## 5. Pending / blocked content (not engineering blockers)

The following are **content or asset dependencies from the client**, not technical blockers. Each corresponding component/page should be engineered to accept this content as data (CMS-backed or JSON-seeded) so that once the client delivers it, it's a content update, not a code change:

- Icon asset pack from Comms.
- AI Pathway Wizard question set + branching logic (Ahmad Marei).
- August 2026 activities/events calendar (full data set).
- Confirmed final copy per program (title, description, eligibility, etc.).
- 3–4 curated photos per program, from the Comms-shared photo folder.
- Full news database.
- Quote selection from `HRHCP's Quotes - DK 11.2 - Copy.xlsx`.
- Map asset/embed for the About page (Ahmad Marei).
- `CPF TIMELINE.xlsx` — timeline data (available now, ready to ingest).

Track these as a literal content-intake checklist in project management (Jira/Linear/etc.), not as engineering tickets — the corresponding UI should already be built and waiting.

---

## 6. Phase 2 preview (context only — do not build in Phase 1)

Phase 1 is deliberately scoped to **public-facing informative pages.** The architecture decisions in `02-FRONTEND_ARCHITECTURE.md` and `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` exist specifically so that Phase 2 can add the following **without re-architecting the foundation**:

- A full **CMS** (program content, news, timeline, quotes, activities — all the content flagged as "pending" above should live in CMS-editable models from day one, even if the authoring UI itself isn't built until Phase 2).
- An **Admin Dashboard** (office-level event/registration management — the mockup's `AdminDashboard.jsx` is a solid UX reference for this).
- **User Authentication** (youth accounts, registration/application flows, ticket/booking history — the mockup's `Login.jsx` + `Dashboard.jsx` are UX references).
- The **Partnerships page** and **Publications page**.
- **Entities Directory** and **Youth Networks** (re-enabled within Networks & Resources).
- Real **Impact System** data consumption (see §7).

Build Phase 1's data models and API surface with these additions in mind (e.g., a `Program` model that already has the shape to support future application/registration relationships, even though nothing writes to that relationship yet).

---

## 7. Strategy: "Opportunities and Events" & the external Impact System

**Critical constraint from the client:** CPF already has (or is building, separately from this engagement) an **"Impact System"** — a separate system of record for opportunities, events, registrations, and impact tracking. **This engineering team is explicitly NOT building the Impact System.** Our relationship to it is strictly as a **consumer of its external API.**

### Phase 1 strategy
"Opportunities and Events" content — the Activities calendar, the Programs catalog's live event data, and anything that in a mature system would be Impact-System-sourced — is **hardcoded/mocked** in Phase 1:
- Modeled with the **same shape** the eventual Impact System API is expected to return (to the extent that shape can be reasonably anticipated — coordinate with whoever owns the Impact System API contract as early as possible, even if actual integration is Phase 2).
- Seeded via Django fixtures / a CMS-editable model, **not** hardcoded JSX/JS arrays in the frontend — this is what makes the client's incremental content drops (August activities, program photos, etc.) simple content updates rather than code changes.
- Exposed to the Next.js frontend through our **own** Django Ninja API (`/api/v1/activities/`, `/api/v1/opportunities/`, etc.) — the frontend never needs to know, in Phase 1, that this data isn't yet Impact-System-backed. This is the seam that makes Phase 2 a swap, not a rewrite.

### Phase 2 strategy
When the Impact System API becomes available:
- The **Django backend** becomes the integration point (not the Next.js frontend directly) — see `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` §5 for the detailed reasoning (secrets management, caching, rate-limit shielding, response shaping).
- Django fetches from the external Impact System API, **caches** the response (Redis or DB-backed cache with a sane TTL), and re-exposes it through the **same internal API contract** the frontend already consumes (`/api/v1/activities/`, etc.) — ideally with zero frontend changes required.
- If the Impact System API's actual response shape differs from our Phase 1 mock shape, an adapter/serializer layer in Django absorbs that difference — the frontend contract stays stable.

**Engineering takeaway:** never let frontend components fetch "opportunities/events" data from anywhere other than our own backend's `/api/v1/...` endpoints, even in Phase 1 while that data is just a Django-seeded fixture. This one discipline is what makes the Phase 2 Impact System integration a backend-only change.

---

## 8. Definition of done for Phase 1

Phase 1 is complete when:
1. Every item in §3 is implemented and matches the client's note precisely (not "close enough" — several of these are exact copy/label changes).
2. Every item in §4 is verifiably **absent** from the shipped build (no dormant/hidden code paths left half-wired — if it's deferred, it's not in the router, not in the nav, not fetched).
3. All "pending content" items in §5 have a working, empty/placeholder-safe UI ready to receive real content the moment it arrives, without needing an engineer to re-touch the component.
4. WCAG AA, RTL correctness, and the performance/motion constraints in `DESIGN.md` are verified on the rebuilt pages, not assumed to carry over from the mockup.
5. The Impact System integration seam (§7) exists in the backend even though it fetches only mocked data today.
