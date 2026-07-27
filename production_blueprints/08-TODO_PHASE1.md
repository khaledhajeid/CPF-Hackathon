# 08 — Phase 1 Build Todo

> The literal, checkbox-driven version of `04-EXECUTION_PLAN_A_TO_Z.md`'s roadmap — every checkbox below maps to a specific entity in `05-DATA_MODEL_ERD.md` / `06-DATA_MODEL_UML.md`, or a specific rule in `02`/`03`. Read `00-PROJECT_MASTER_CONTEXT.md` first if you haven't. Work top to bottom; later steps assume earlier ones are done.

---

## Step 1 — Environment Setup

- [ ] Create the new repository (monorepo or two-repo split — either works with this blueprint; pick one and document the choice in the repo's own README).
- [ ] Obtain the Comms icon pack (`01-...md` §3.1) — don't start icon-dependent component work without it.
- [ ] Confirm pending content/asset status (`01-...md` §5): August activities calendar, program copy, program photos, news database, quote selection, `CPF TIMELINE.xlsx`, About-page map asset, Athar Sphere API details, target-audience-criteria decision, QR code flow.
- [ ] **Get an explicit answer on the two open scope-timing questions in `01-...md` §9** before committing to a Phase 2 roadmap: (a) Content Editor tooling — Phase 1 or Phase 2? (b) CMS platform — Django Admin or WordPress/similar?
- [ ] Set up `docker-compose.yml`: Postgres service, Django service (Redis reserved for Phase 2 caching, cheap to include now).
- [ ] `django-admin startproject config .` — scaffold the Django project.
- [ ] Install Django Ninja, configure `django-cors-headers` with an explicit allow-list (never `CORS_ALLOW_ALL_ORIGINS = True` outside local dev settings — `03-...md` §6.1).
- [ ] Scaffold the Django apps (empty for now): `apps/core`, `apps/programs`, `apps/activities`, `apps/news`, `apps/success_stories`, `apps/about_content`, `apps/makers_map`, `apps/contact`, `apps/integrations` (Phase 2 stub), `apps/accounts` (Phase 2 stub).
- [ ] `npx create-next-app` (App Router) — scaffold the frontend. TypeScript recommended (`02-...md` §6).
- [ ] Wire Tailwind CSS v4 into the Next.js app.
- [ ] Write `.env.example` for both frontend and backend, documenting every required variable — first line of defense against secrets landing in git.
- [ ] Confirm the deploy target (cloud provider for Postgres + Django container hosting; Vercel or equivalent for Next.js) — affects a few config choices made below.

**Exit criteria:** `docker-compose up` brings up a working local Postgres + Django admin login page; `npm run dev` serves a blank Next.js page with Tailwind and `dir="rtl" lang="ar"` set on `<html>`.

---

## Step 2 — Database Implementation (ERD → Django Models)

Build the four abstract mixins first (`06-DATA_MODEL_UML.md` §2) — every concrete model below inherits from some combination of these; build them out of order and you'll refactor every model afterward.

### 2.0 Core abstractions (`apps/core/models.py`)
- [ ] `TimestampedModel` (abstract): `created_at`, `updated_at`.
- [ ] `OrderableModel` (abstract): `order`.
- [ ] `ActivatableModel` (abstract): `is_active`.
- [ ] `TranslatableModel` (abstract) + a matching `Translation` abstract base (per `django-parler`'s pattern, `05-...md` §1): `master` FK (`related_name='translations'`, `on_delete=CASCADE`), `language_code` (plain `CharField`, not an FK — `05-...md` §1), `Meta.unique_together = ('language_code', 'master')`.
- [ ] `Language` reference table (`code` PK, `name_native`, `name_english`, `is_rtl`, `is_default`, `is_active`) — config/reference only, application code validates `language_code` against it; no hard FK from translation tables.
- [ ] Confirm every model below uses `on_delete=CASCADE` for its own `*Translation` (composition) and `on_delete=PROTECT` or `SET_NULL` for references to shared lookups like `Pathway`/`Governorate` (aggregation) — see `06-...md` §1 for which is which per relationship.

### 2.1 `apps/programs/`
- [ ] `Pathway` + `PathwayTranslation` — `code` (`learn`/`lead`/`make_impact`), `color_token`, `icon_name`, `order` | translation: `name`.
- [ ] `Program` + `ProgramTranslation` — `slug`, `pathway_id` FK, `registration_status` enum, `hero_image`, `hero_video` (nullable), `logo_image`, `external_url` (nullable), `external_url_anchor` (nullable), `cta_url` (nullable), `is_active`, `order`, timestamps | translation: `title`, `tagline`, `about`, `overview`, `cta_label`, `sub_initiatives_title`, `work_areas_title`, `icon_cards_title`.
- [ ] `ProgramImage` + `ProgramImageTranslation` — `program_id` FK, `image`, `is_hero`, `order` | translation: `caption` (nullable).
- [ ] `ProgramMetaDetail` + `ProgramMetaDetailTranslation` — `program_id` FK, `order` | translation: `label`, `value`.
- [ ] `ProgramFeature` + `ProgramFeatureTranslation` — `program_id` FK, `feature_type` enum (`facility`/`work_area`/`icon_card`), `icon_name` (nullable), `order` | translation: `title` (nullable), `description`.
- [ ] `ProgramSubInitiative` + `ProgramSubInitiativeTranslation` — `program_id` FK, `icon_name` (nullable), `logo_image` (nullable), `cta_url`, `order` | translation: `name`, `subtitle`, `description`, `cta_label`.
- [ ] `ProgramFaq` + `ProgramFaqTranslation` — `program_id` FK, `order` | translation: `question`, `answer`.
- [ ] `ProgramCallout` + `ProgramCalloutTranslation` — `program_id` FK, `callout_type` enum (`donation`/`spotlight`), `icon_name` (nullable), `accent_color` (nullable), `cta_url` (nullable), `cta_anchor` (nullable) | translation: `title` (nullable), `text`, `cta_label`.
- [ ] Register all of the above in `admin.py` (Django's default admin — this is the Phase 1 CMS interim per `00-...md` §6 item 1).
- [ ] Migrations + fixtures seeding the current mockup's program data as placeholder content, flagged replaceable (`01-...md` §3.3).

### 2.2 `apps/activities/`
- [ ] `Activity` + `ActivityTranslation` — `slug`, `pathway_id` FK (required), `governorate_id` FK (**nullable** — see `is_online`), `program_id` FK (**nullable — decoupled from Program on purpose**, `07-...md` §4.2), `is_online`, `age_range` (plain string), `start_date`, `end_date_time` (nullable), `image`, `registration_url` (nullable), `source` enum (`seed`/`impact_system`), `is_active`, `created_at` | translation: `title`, `description`, `location_label`.
- [ ] **Do not add a `points` field.** Excluded on principle, not an oversight (`01-...md` §4).
- [ ] **Do not add a target-audience/eligibility field yet** — pending Athar Sphere's strict-vs-flexible decision (`01-...md` §7.0, `03-...md` §4.2).
- [ ] Register in `admin.py`, migrate, seed with placeholder/whatever activity data is available (August calendar is a pending client deliverable — build the model regardless, `01-...md` §5).

### 2.3 `apps/news/`
- [ ] `NewsArticle` + `NewsArticleTranslation` — `slug`, `program_id` FK (nullable), `media_type` enum (`image`/`video`), `media_url`, `cover_image` (nullable), `is_featured`, `is_hero_carousel`, `published_at`, `source` enum (`live_site_seed`/`cms`), `is_active` | translation: `title`, `summary`, `body` (nullable). **No `news_category_id` — `NewsCategory` was deliberately removed, do not reintroduce it** (`07-...md` §4.2).
- [ ] `FieldLensImage` + `FieldLensImageTranslation` — `image`, `date`, `order`, `is_active` | translation: `title`. **No `layout_type` field.**
- [ ] Register in `admin.py`, migrate, seed with the current live site's recent content as placeholder (`01-...md` §3.6) — mark `is_featured` on exactly 3 items for the homepage carousel.

### 2.4 `apps/success_stories/`
- [ ] `SuccessStory` + `SuccessStoryTranslation` — `slug`, `program_id` FK (nullable), `governorate_id` FK (nullable), `video_url` (nullable), `image`, `published_at`, `is_active` | translation: `name`, `subtitle` (nullable — for stories whose affiliation isn't a real `Program`, e.g. a regional office), `quote`, `full_story`. **No `batch_number` field.**
- [ ] Register in `admin.py`, migrate, seed with the mockup's `allStories[]` content.

### 2.5 `apps/about_content/`
- [ ] `Quote` + `QuoteTranslation` — `is_active`, `order` | translation: `text`, `attribution`.
- [ ] `FoundationRoleText` + `FoundationRoleTextTranslation` — `is_active`, `updated_at` | translation: `text` (store the client's verbatim paragraph exactly, `01-...md` §3.8).
- [ ] `StatCounter` + `StatCounterTranslation` — `code` (unique), `value`, `display_suffix` (nullable), `icon_name` (nullable), `show_on_home`, `show_on_about`, `order`, `is_active` | translation: `label`. Seed all current stats **plus** the two new ones ("4.5K شريك", "120 موظف").
- [ ] `TimelineEntry` + `TimelineEntryTranslation` — `year_label` (string — **verify against the real `CPF TIMELINE.xlsx` whether this should actually be a date field**, `07-...md` §4.2 flags this as an unconfirmed assumption), `order`, `is_active` | translation: `title`, `description`. Ingest from `CPF TIMELINE.xlsx`.
- [ ] `Leader` + `LeaderTranslation` — `leadership_type` enum (`board`/`executive`), `card_image`, `detail_media_type` enum (`image`/`video`), `detail_media_url` (nullable), `order`, `is_active`, timestamps | translation: `name`, `position`, `bio` (nullable). **No mockup precedent for the frontend here — get a design pass before building the UI** (`01-...md` §10.1).
- [ ] **No `AboutMap` model.** The pending About-page map is a hardcoded Next.js component or env-var-driven embed once the asset arrives — not a database table (`07-...md` §4.2).
- [ ] Register all of the above in `admin.py`, migrate, seed.

### 2.6 `apps/makers_map/`
- [ ] `Governorate` + `GovernorateTranslation` — `code`, `order` | translation: `name`. Seed all 12 Jordan governorates from the mockup's `GOVERNORATES` array.
- [ ] `MakerCategory` + `MakerCategoryTranslation` — `code`, `order` | translation: `label`. Seed the 6 categories from `MAKER_CATEGORIES`.
- [ ] `MakerSpace` + `MakerSpaceTranslation` — `slug`, `maker_category_id` FK, `governorate_id` FK, `lat`, `lng`, `website` (nullable), `phone` (nullable), `is_active` | translation: `name`, `description`, `address`. Seed from the mockup's `makerSpaces[]` (real coordinates already present).
- [ ] Register in `admin.py`, migrate, seed.

### 2.7 `apps/contact/`
- [ ] `ContactSubmission` — `name`, `email`, `phone`, `subject`, `message`, `language_code` (plain field, not a translation — recorded fact only), `submitted_at`, `status` enum (`new`/`handled`).
- [ ] `NetworkJoinSubmission` — `name`, `age_range`, `governorate_id` FK, `phone`, `email`, `interest_area`, `language_code`, `submitted_at`, `status`.
- [ ] `TeamJoinSubmission` — `name`, `email`, `phone`, `resume_url` (nullable), `resume_file` (nullable — application logic enforces exactly one of `resume_url`/`resume_file` is set), `message`, `language_code`, `submitted_at`, `status`.
- [ ] `SuccessStorySubmission` — `name`, `email`, `phone`, `program_name` (**plain string, deliberately not a `Program` FK** — visitor-submitted, pre-moderation data, `07-...md` §4.4), `story_text`, `language_code`, `submitted_at`, `status`.
- [ ] **Before building the frontend forms for the last two:** resolve the open field-list-vs-mock discrepancy in `01-...md` §10.2/§10.3 — the given field lists differ from what `Contact.jsx`'s careers modal and `success/ShareStoryModal.jsx` already collect (specialization field + job/training type; story title + photo/video attachment). Confirm with product/content whether to add those fields back before shipping the UI.
- [ ] Restrict Django admin access to these four tables via Django's permission system — they carry visitor PII (`03-...md` §6.6).
- [ ] Apply rate limiting to all four submission endpoints from the moment they exist (`03-...md` §6.4) — don't add it later as a hardening pass.
- [ ] Register in `admin.py` (with the access restriction above), migrate.

### 2.8 Phase 2 stubs (scaffold the app, do not build the feature)
- [ ] `apps/integrations/` — empty app, reserved for the future Athar Sphere client (`03-...md` §5.2).
- [ ] `apps/accounts/` — empty app, reserved for future user auth (`03-...md` §6.3 — httpOnly cookie sessions, not `localStorage` JWTs, when this is eventually built).

**Exit criteria:** every model above exists, migrates cleanly, is registered in Django admin, and has seed data (placeholder where real content is still pending). `python manage.py check` and a full migration run both pass with zero errors.

---

## Step 3 — API Layer (Django Ninja)

- [ ] Set up the Ninja API router under `/api/v1/`, mounted in `config/urls.py`.
- [ ] Establish the shared conventions once, before writing individual endpoints (`03-...md` §3): consistent list envelope (`count`/`next`/`previous`/`results`), consistent error envelope (`detail`/`code`/`fields`), `slug` as the public identifier (never numeric PK), filtering via query params not POST bodies.
- [ ] `GET /api/v1/programs/`, `GET /api/v1/programs/{slug}/` — including nested gallery images, meta details, features, sub-initiatives, FAQs, callouts in the detail response.
- [ ] `GET /api/v1/activities/` (filterable by `pathway`, `governorate`, `program`), `GET /api/v1/activities/{slug}/`.
- [ ] `GET /api/v1/news/` (filterable/orderable by `published_at`; expose `is_featured` for the homepage carousel query), `GET /api/v1/news/{slug}/`.
- [ ] `GET /api/v1/field-lens/` — ordered by `date`.
- [ ] `GET /api/v1/success-stories/`.
- [ ] `GET /api/v1/about/quote/`, `GET /api/v1/about/foundation-role/`, `GET /api/v1/about/stats/` (filterable by `show_on_home`/`show_on_about`), `GET /api/v1/about/timeline/`, `GET /api/v1/about/leaders/` (filterable by `leadership_type`).
- [ ] `GET /api/v1/makers-map/governorates/`, `GET /api/v1/makers-map/categories/`, `GET /api/v1/makers-map/spaces/` (filterable by `governorate`, `category`).
- [ ] `POST /api/v1/contact/` → `ContactSubmission`.
- [ ] `POST /api/v1/contact/network-join/` → `NetworkJoinSubmission`.
- [ ] `POST /api/v1/contact/team-join/` → `TeamJoinSubmission` (handle `resume_file` as a multipart upload; validate file type/size server-side, `03-...md` §6.5).
- [ ] `POST /api/v1/success-stories/submit/` → `SuccessStorySubmission`.
- [ ] Every endpoint response includes/respects `?lang=ar|en` (or an `Accept-Language`-driven equivalent) to pull the right `*Translation` row — decide and document one convention, apply it everywhere, don't mix approaches per endpoint.
- [ ] Strict Pydantic/Ninja schemas on every write endpoint (the four `POST`s above) — explicit field types, `max_length`, email/phone format validation (`03-...md` §6.5).
- [ ] Sanitize any rich-text field before it's ever rendered (`Program.about`, `NewsArticle.body`, etc.) — strip/allow-list HTML, even from authenticated staff input (`03-...md` §6.5).
- [ ] Auto-generate the OpenAPI schema and confirm the frontend team can codegen a typed client from it (`02-...md` §6).
- [ ] CORS allow-list confirmed for the frontend's actual origin(s) — no wildcard, even in this early stage (`03-...md` §6.1).

**Exit criteria:** every endpoint above returns real (seeded) data, matches the list/error envelope conventions, and the OpenAPI schema is reachable and accurate. No endpoint exposes ContactSubmission/NetworkJoinSubmission/TeamJoinSubmission/SuccessStorySubmission data publicly (write-only from the public API's perspective).

---

## Step 4 — Frontend Scaffolding & Integration

- [ ] Build `components/ui/` primitives first, before any page: `Button` (primary/gold/ghost per `DESIGN.md` §5), `Chip`, `Card`, `Input`, `Dropdown`, `Modal` (`02-...md` §2, §4.4).
- [ ] Port `DESIGN.md`'s tokens into the Tailwind config as named theme colors (not raw hex scattered through components).
- [ ] Load `CPF-Font`, implement the Weighted Stroke Rule globally (`DESIGN.md` §3).
- [ ] Build the shared `AnimatedStatCounter` component **once** (slow, perceptible count-up, `prefers-reduced-motion`-aware) — reused on both Home and About, never re-implemented per page (`DESIGN.md`'s Animated Stat Counter spec, `01-...md` §3.8).
- [ ] Set up the `lib/api/` layer: one file per resource (`programs.js`, `activities.js`, `news.js`, etc.), each exporting a query-key factory + fetch function, matching the Ninja endpoints from Step 3 (`02-...md` §3.1).
- [ ] Wrap each in a custom hook (`usePrograms()`, `useActivities()`, etc.) — components call the hook, never `useQuery` with an inline fetch function.
- [ ] Scaffold the `(public)` route group: `app/page.jsx` (Home), `app/programs/page.jsx` + `app/programs/[programSlug]/page.jsx`, `app/news/page.jsx` + `[articleSlug]`, `app/success-stories/page.jsx` + `[storySlug]`, `app/about/page.jsx`, `app/contact/page.jsx`.
- [ ] Build Home: hero with the corrected-speed stat counter, "4.5K شريك" stat present, "تغطية كافة المحافظات" label, hover-only "اكتشف" affordance **not present**, program tabs verified clickable end-to-end, "مساحة الصنّاع"/"ملتقى الصنّاع" merged into one tile, external/anchor links working for "The Core"/Nahno/HTUx.
- [ ] Build بوابة الفرص: no subtitle under the title, title standardized as "بوابة الفرص" everywhere, Networks & Resources tab renders Makers Map directly (no 3-card selector), Activities tab has no "learn more" affordance and no points/rewards badge anywhere.
- [ ] Build the Program detail page: multi-photo gallery, sub-initiative CTAs (confirm "The Core" → HTU page, scrolled to its own section, not just a bare page load).
- [ ] Build News: top-3-featured carousel logic, "crowd-driven" section as title+CTA-only (no fabricated UGC), "عدسة الميدان" section ordered by `FieldLensImage.date`.
- [ ] Build About: exact "دور المؤسسة" paragraph inserted verbatim, both new stats present, shared counter component, timeline from ingested data, map section present as a reserved-but-empty placeholder (pending asset), **Foundation Leaders section — get the design pass from `01-...md` §10.1 done before building this one**, since there's no mockup UI to reference.
- [ ] Build Contact: general contact form + "انضم لشبكتنا" tab, both wired to their real endpoints.
- [ ] Build (or explicitly defer, per the reconciliation decision in Step 2.7) the "Join Our Team" and "Submit Your Story" forms.
- [ ] Verify absence, end to end: no Partnerships route, no Publications route, no Entities Directory/Youth Networks routes or nav entries, no points/rewards UI element anywhere.
- [ ] Run an accessibility pass (axe-core/Lighthouse) and a manual RTL review on every page built above — not deferred to a single QA pass at the end.

**Exit criteria:** every page in `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` §3 is live against real API data (not hardcoded mock JSON), every item in §4 is verifiably absent, and `01-...md` §8's full "Definition of done for Phase 1" checklist passes.
