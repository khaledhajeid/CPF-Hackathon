# 07 — Data Model ERD: Complete Design Rationale

> **Companion to `05-DATA_MODEL_ERD.md`.** That document is the diagrams. This document is the "why" — for every entity, every field worth explaining, and every relationship, in one place, instead of scattered across inline notes.

---

## 1. Why this document exists

While reviewing `05-DATA_MODEL_ERD.md`, a question surfaced about the `Activity → Program` relationship: was it actually in the mock data, or something added? It turned out to be an **architectural inference** — a reasonable one, but one the original traceability table didn't clearly flag as different in kind from the fields that *are* directly sourced from the mock.

That was a real gap: some parts of the schema are copied straight from the mock (`Program.title`, `MakerSpace.lat`/`lng`), some are required by the client's explicit Phase 1 notes even though the mock doesn't have them (`ProgramImage`, the whole About-page content domain), and some are judgment calls made for schema-design reasons that neither the mock nor the client notes dictate (`Activity.program_id`, the `is_active`/`order` fields present on nearly everything). `05-...md`'s traceability table (§7) mixed all three without saying which was which for every row.

This document fixes that, systematically, for the **entire** schema — not just the one relationship that got caught. Every entity below is tagged with where it actually came from, and every non-obvious field or relationship gets a one- or two-sentence "why."

---

## 2. Provenance tags used throughout

| Tag | Meaning |
|---|---|
| 🟢 **MOCK-DERIVED** | Exists as a real field/value in the mockup's code today. Cited with the exact file and field name. |
| 🔵 **SCOPE-DERIVED** | Not in the mock, but explicitly required by `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` (which itself translates the client's `Notes for Website Development.pdf`). The client asked for it; the mock just hasn't been rebuilt to show it yet. |
| 🟡 **ARCHITECTURAL INFERENCE** | Neither the mock nor the client notes require this — it was added for schema-design reasons (normalization, future CMS flexibility, matching an established Django/API convention). This is the category that deserves the most scrutiny, and the one `Activity.program_id` fell into. |
| 🟣 **NEW REQUIREMENT (DIRECT INSTRUCTION)** | Not in `01-...md`'s existing scope record — neither the original client PDF notes nor the later IT alignment notes — added because it was directly instructed in a later session, sometimes with an exact structure given. **This tags the scope decision, not necessarily the data shape**: an entity can be 🟣 (nobody asked for this feature in the documented scope until now) while still turning out to be 🟢-backed once someone actually checks the mock for the underlying UI (see `TeamJoinSubmission`/`SuccessStorySubmission` in §4.4 — both 🟣 for scope, both with real mock precedent for their concept, though not for their exact given field list). Don't read 🟣 as "guaranteed no mock trace exists" — it means "not found in the scope record when tagged"; treat it as a prompt to go check the mock directly before assuming, the way `Leader` should have been checked the first time (see §4.2's correction). |

Where a single entity mixes provenance (most do, at least a little — e.g. an `is_active` flag added to a mock-derived table), each field is tagged individually rather than the whole entity getting one blanket label.

---

## 3. Foundational decisions (why the schema is *shaped* the way it is, before any single entity)

### 3.1 Translation tables, not `_ar`/`_en` columns
🟡 Architectural. Full comparison and the `django-parler`-verified reference schema are in `05-...md` §1 — not repeated at length here. Short version: a hard requirement from `02-FRONTEND_ARCHITECTURE.md`/`03-BACKEND_ARCHITECTURE_AND_SECURITY.md` is that Arabic-only-in-Phase-1 must not mean a migration when English arrives. Column suffixes fail that test; a translation table per model passes it.

### 3.2 Four diagrams instead of one
🟡 Architectural, but not arbitrary — the split matches `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` §2's actual Django app boundaries (`apps/programs/`, `apps/activities/` + `apps/news/` + `apps/success_stories/` + `apps/about_content/`, `apps/makers_map/` + `apps/contact/`). The documentation structure mirrors the code structure on purpose, so "which diagram is this table in" and "which Django app is this model in" are always the same answer.

### 3.3 `Pathway` and `Governorate` as shared lookups
🟢 Mock-derived, then generalized. Both were found, not designed — `pathway` (`تعلّم` / `قُد` / `اصنع الأثر`) appears verbatim on both `programsData.js` entries and `data.js` → `allEvents[].pathway`; governorate-shaped strings appear independently on `allEvents.city`, `allStories.location`, and `makerSpaces.governorate`. Once the same value was found doing the same job in three unrelated mock files, normalizing it into one shared lookup table (rather than three separate enums, one per table) was the only defensible choice — the alternative risks three tables silently drifting out of sync on what "the governorates" actually are.

### 3.4 Why nearly every table has `is_active`, `order`, and sometimes `created_at`/`updated_at`
🟡 Architectural, applied uniformly, worth explaining once instead of leaving unexplained on every entity:
- **`is_active`** exists because almost everything in this schema is rendered directly on a public page from a CMS-managed table (Phase 2). Content editors need to be able to hide a program, a maker space, or a news article without deleting its row (deleting loses history, breaks any existing links/FKs pointing at it, and can't be undone by a non-technical editor). A boolean flag solves this with no destructive action required.
- **`order`** exists on anything the mock renders as a manually-curated, position-sensitive list (program facilities, FAQs, timeline entries, stat counters) rather than something naturally sorted by a data value (like `published_at` for news). The mock's own arrays are already manually ordered by whoever wrote the file — `order` is how that same curatorial control survives once the content moves into a database, where row order isn't guaranteed.
- **`created_at`/`updated_at`** appear only on the handful of tables where knowing "when did this change" has real operational value (`Program`, `Activity`, `FoundationRoleText`) — not copy-pasted onto every table by default. `ProgramFaq` or `ProgramMetaDetail`, for instance, don't carry them: nobody needs an audit trail for "when was this FAQ's answer edited."

### 3.5 `Language` as a reference table, not a foreign key target
🟡 Architectural, directly justified in `05-...md` §1: every `*Translation` table's `language_code` is a plain string, not an FK to `Language`, because Django's own `settings.LANGUAGES` is the real source of truth and a hard FK would force an unnecessary join on every translation lookup. `Language` still exists as a config table so a future admin screen can list/manage active languages — it's documentation and Phase-2-CMS convenience, not a constraint the database enforces.

---

## 4. Entity-by-entity rationale

### 4.1 Program domain

**`Pathway` + `PathwayTranslation`** — 🟢 `programsData.js` → `pathway` field, present on every program. Split into master + translation because the *value* (`تعلّم`) needs to render in whichever language the visitor is using, while `code` (`learn`/`lead`/`make_impact`) is the stable, language-neutral thing every other table's FK actually points at. `color_token` was added (🟡) because the mock's pathway values already drive distinct visual treatment (see `pathwayColors.js` in the mockup) — the schema just gives that existing convention an explicit home instead of leaving color-per-pathway as a hardcoded lookup in frontend code.

**`Program` + `ProgramTranslation`** — 🟢 almost entirely mock-derived from `programsFullData`: `title`/`titleEn` (the mock's own light bilingual pattern, superseded here by the translation table), `tagline`, `about`, `overview`, `image` → `hero_image`, `video` → `hero_video`, `logo` → `logo_image`, `ctaLabel`/`ctaUrl`, `registrationStatus` (🟢 the mock literally sets `registrationStatus: 'مغلق'` on the Khutwa Al-Hussein program — this is a real, observed value, not a guess). `external_url` and `external_url_anchor` are 🔵 scope-derived: the client's notes explicitly require external program links (Nahno, HTUx) and, specifically, that "The Core" must link to HTU's page **scrolled to its own section**, not just opened — `external_url_anchor` is the field that makes that anchor-scroll behavior configurable as data rather than hardcoded per program in frontend code. `slug` is 🟡 architectural, following the API design convention set in `03-...md` (public identifiers are slugs, not numeric PKs).

**`ProgramImage` + `ProgramImageTranslation`** — 🔵 Scope-derived, and explicitly flagged as such in `05-...md`'s traceability table already: the mock has exactly one `image` per program; the client's notes ask for 3–4 curated photos per program. `is_hero` (🟡) exists so the existing single-hero-image template pattern still has an unambiguous "which one is that" answer once a program has a gallery instead of one image.

**`ProgramMetaDetail` + Translation** — 🟢 Directly mirrors `programsData.js` → `metaDetails: [{label, value}]`, found on programs like HTU and Khutwa Al-Hussein. No design decision needed here beyond translating both `label` and `value`, since both are user-facing Arabic text in the mock.

**`ProgramFeature` + Translation** — 🟢 mock-derived content, 🟡 architectural consolidation. The mock has three separate arrays (`facilities: []`, `workAreas: [{title, text}]`, `iconCards: [{icon, title, description}]`) that are structurally identical once you set them side by side: an ordered, program-scoped list of an optional icon plus optional title plus description, differing only in *which page section renders them*. Building three near-identical tables for that would be redundant schema, not extra fidelity — `feature_type` (`facility`/`work_area`/`icon_card`) captures the one real difference. `title` is nullable specifically because `facilities` in the mock are plain strings with no separate heading — that nullability is a direct trace of the mock's actual shape, not a generic "just in case" nullable.

**`ProgramSubInitiative` + Translation** — 🟢 mock-derived from `subInitiatives: [{name, subtitle, description, icon, ctaLabel, ctaUrl}]` (HTU's "The Core" and "HTUx" are the two real examples in the mock). Deliberately **not** folded into `ProgramFeature` (🟡 design decision, explained where the consolidation happens in `05-...md` §4): a sub-initiative carries its own logo and CTA — it's effectively a "mini-program" living under a parent program, not a short description in a list.

**`ProgramFaq` + Translation** — 🟢 Direct mirror of `programsData.js` → `faqs: [{q, a}]`, present on every program in the mock.

**`ProgramCallout` + Translation** — 🟢 mock-derived content, 🟡 architectural consolidation, same logic as `ProgramFeature`: `donationBanner` and `spotlightSection` are both singleton, optional, per-program blocks with an icon/accent, body text, and a CTA — they differ in `callout_type` (`donation`/`spotlight`), not in shape. `cta_anchor` (vs. plain `cta_url`) exists because the mock's `spotlightSection.ctaAnchor` literally points at an in-page anchor (`#related-stories`) rather than a URL — a real, observed field, not a hypothetical.

### 4.2 Content, Home & About domain

**`Activity` + `ActivityTranslation`** — 🟢 mock-derived core: `title`, `date` → `start_date`, `city`/`location` → `governorate_id`/`location_label`, `pathway_id`, `age_range`, `image`, `description`, all directly from `data.js` → `allEvents[]`. Two fields deserve their own callout:
- **`program_id` is 🟡 architectural inference, not mock-derived** — this is the exact finding that prompted this document. `allEvents[]` has no `programKey`/`programName` field at all, unlike `NewsArticle` and `SuccessStory`, which both do. It was added because (a) one mock event's free-text location happens to name a program verbatim (`'جامعة الحسين التقنية (HTU)'`, the cybersecurity hackathon, id 8), and (b) program detail pages already render program-scoped News and Success Stories via the same `programKey` pattern, making "this program's upcoming activities" the obvious next case. It's nullable specifically so this stays optional, not assumed. Full detail in `05-...md` §5's dedicated note — flagging it there and here is deliberate, not duplication for its own sake, since this is the entity that revealed the gap this whole document exists to close.
- **`governorate_id` nullable + `is_online`** — 🟢 the trigger is mock-derived (`allEvents[]` has one entry with `city: 'أونلاین'`), 🟡 the *solution* (a boolean flag instead of a fake "Online" governorate row) is architectural. Forcing "online" into a table meant to hold Jordan's 12 real governorates would corrupt that lookup for every other consumer of it (`MakerSpace`, `SuccessStory`, `NetworkJoinSubmission` all reuse the same `Governorate` table and none of them have an "online" concept).
- **`source` (`seed`/`impact_system`)** — 🔵 scope-derived directly from `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` §7's Impact System integration strategy: Phase 1 activities are seeded data, Phase 2 activities may be synced from the external Impact System (confirmed by the IT team to be **Athar Sphere** — see `01-...md` §7.0), and the field exists so that transition is a data-flag change, not a schema change. The eventual **target-audience-criteria** question (strict vs. flexible eligibility, to be decided through Athar Sphere) is a related open item — deliberately not modeled yet, same discipline applied to `NewsCategory`'s removal above.
- **`age_range` stays a plain string** (🟡) rather than being split into numeric `age_min`/`age_max` columns — the mock's actual values include both ranges (`'18-25'`) and a catch-all (`'الكل'`, "everyone"), which a numeric range can't represent cleanly. Over-normalizing this before seeing real production data would risk modeling a shape the content doesn't actually have.
- **`end_date_time` (nullable)** — 🟡 architectural addition, not mock-derived. `allEvents[]` only ever gives a single `date` string; nothing in the mock represents a distinct end time. It was added anyway because a real activity (a multi-day camp, a workshop with a published finish time) needs an end boundary for calendar/scheduling display, and retrofitting it later — once real Activity rows exist — is a migration; adding it now, nullable, costs nothing and is filled in only when an activity actually has one.

**No `NewsCategory` / `NewsCategoryTranslation`.** A previous revision of this schema modeled news categories (`أخبار المؤسسة`, `إنجازات الشباب`, `شراكاتنا`, `أخبار الفرص`) — 🟢 all four values are real, observed across `newsList[]` and `heroSliderNews[]` in `newsData.js` — as a normalized lookup, following the same pattern used for `Pathway` and `Governorate`. That was the wrong call: unlike `pathway` (used to filter/style programs and activities throughout the mock) or governorate (used identically across four different tables), `category` is never filtered or queried on anywhere in the mock — it's a display label sitting next to a date, nothing more. The client's notes don't ask for category filtering either. A lookup table, its translation table, and a `news_category_id` FK exist to make a value **queryable and normalized**; when nothing queries it, that's infrastructure built for a requirement that doesn't exist — the YAGNI case, not the earlier `Pathway`/`Governorate` case. News is now a flat list ordered by `published_at`, full stop. If category filtering becomes a real, requested feature later, adding it back is a normal schema addition, not undoing a mistake.

**`NewsArticle` + `NewsArticleTranslation`** — 🟢 mostly mock-derived: `title`, `desc` → `summary`, `image` → `cover_image`, `date` → `published_at`, `isFeatured`, `programKey` → `program_id`, and separately `heroSliderNews[]`'s `type` → `media_type` and `mediaUrl` → `media_url`. Two decisions worth flagging:
- **One `NewsArticle` table instead of a separate hero-carousel model** — 🟡 architectural. `heroSliderNews[]` and `newsList[]` are two different mock arrays, but their items are structurally the same "thing" (a news item with media, a title, a date) with `heroSliderNews` just being a flagged subset. `is_hero_carousel` and `is_featured` booleans capture that without duplicating the whole model.
- **`body` (nullable, full article text)** — 🔵 scope-derived, not mock-derived: the mock's `desc` is short teaser copy; the client's notes describe a "whole database" of news to come, which implies a real article detail page needs a full body distinct from the teaser. It's nullable because that hasn't arrived yet.
- **No `category` field at all** — see the `NewsCategory` removal above; `category` isn't kept as a plain string either, since the whole concept is out of scope, not just the normalization of it.

**`FieldLensImage` + Translation** — 🟢 Direct mirror of `newsData.js` → `pulseImages[]` ("عدسة الميدان" / "Field Lens"): `title`, `url` → `image`. Two changes on direct instruction (🟣): `type` (`featured`/`normal`/`tall`) → `layout_type` is **removed** — it drove a masonry-style mixed-tile-size grid in the mock, but all images now use a normal layout, so the field has nothing left to distinguish; and a **`date`** field was **added** for chronological sorting, which nothing in the mock or this field ever provided.

**`SuccessStory` + `SuccessStoryTranslation`** — 🟢 mock-derived from `allStories[]`: `name`, `program`/`programKey` → `program_id`, `video` → `video_url`, `image`, `quote`, `fullStory` → `full_story`. **`governorate_id`** is 🟡 architectural: the mock stores `location` as a free string (`'الكرك'`, `'عمّان'`); rather than leave that as an unstructured text field (which is what was kept for `Activity.location_label`, deliberately — see below), it's normalized against the shared `Governorate` lookup here because every value observed in `allStories[].location` is a real governorate name with no "أونلاين"-style exception to worry about, unlike `Activity`. Two further changes:
- **`subtitle` added to `SuccessStoryTranslation`** — 🟡 architectural, but grounded in a real inconsistency found in the mock, not invented from nothing: `allStories[].program` sometimes holds an actual program name (`'عمان 42'`, close to but not exactly matching any `programsFullData` key), and sometimes holds something that isn't a program at all — e.g. `'مكتب المؤسسة في عجلون'` ("the Foundation's office in Ajloun") or `'مكتب المؤسسة في المفرق'`. Those office-affiliation stories have no real `Program` to resolve `program_id` against. `subtitle` gives them (and any story that wants a descriptive label distinct from a hard program link) a place to live as plain display text, rather than forcing a fake `Program` row into existence just so a regional office has something to point at.
- **`batch_number` removed** — see `05-DATA_MODEL_ERD.md` §8 for the full reasoning (YAGNI: it would be null for the large majority of stories and nothing reads it).

**`Quote`, `FoundationRoleText`, `StatCounter`, `TimelineEntry`** — 🔵 **entirely scope-derived.** None of these exist as data structures in the mock at all; the mockup hardcodes the About page's copy inline in JSX. Each is modeled directly from `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` §3.8's explicit requirements, not from reading any mock file. Why each is a *table* rather than a single hardcoded value:
- **`Quote`** — modeled as a table with `is_active`/`order`, not a singleton, so a future quote change (the client's notes mention choosing from a shared spreadsheet of options) is swapping which row is active, with old quotes kept rather than overwritten and lost.
- **`FoundationRoleText`** — a table (with `updated_at`) rather than a hardcoded template string, because the client's notes give an exact paragraph to insert verbatim, and "verbatim" text supplied by a client is exactly the kind of content that gets revised later — it needs to be editable without a redeploy.
- **`StatCounter`** — `show_on_home`/`show_on_about` booleans on one shared table, not two separate tables, because the client's notes ask for the *same* stats (e.g. "4.5K شريك") on both the Home hero and the About page — one source of truth prevents the two pages' numbers from silently drifting apart, which is also why the frontend guidance in `02-...md` calls for one shared `AnimatedStatCounter` component rather than two independently-tuned ones.
- **`TimelineEntry`** — `year_label` is a string rather than a `date`, because the client's notes reference `CPF TIMELINE.xlsx` for the content, and CPF's actual founding milestones are era/year-level, not calendar-date-level. **This is an assumption, not a confirmed fact** — it should be verified against the real spreadsheet before implementation and changed to a proper date field if the source data turns out to be date-precise.
- **No `AboutMap` table — handled at the UI layer instead.** An earlier revision of this document modeled the pending About-page map as its own table (`json embed_config`, `is_active`), reasoning that it would let the layout ship now and the asset slot in later without a migration. That reasoning doesn't survive scrutiny: this is one static map on one page, with no list, no filtering, no admin-authored variants — the kind of content a dedicated table, a Django Ninja endpoint, and a future CMS screen is simply the wrong amount of infrastructure for (a textbook YAGNI violation — building for a generality, "maps as CMS content," that nothing in Phase 1 or the client's notes actually asks for). Once the asset arrives from Ahmad Marei, it's a **hardcoded Next.js component** (`<AboutMap lat={...} lng={...} zoom={...} />` or equivalent) reading its coordinates from either literal props or an environment variable (`NEXT_PUBLIC_ABOUT_MAP_EMBED_URL`, for instance, if the ops team wants to swap it without a redeploy). The About page's layout still reserves the section now — that part of the original reasoning was sound — it just reserves it as a component slot, not a database row. If a future phase genuinely needs the map to be admin-editable (multiple variants, A/B content, editor-swappable pins), that's the point to introduce a model for it, backed by an actual requirement rather than a hypothetical one.

**`Leader` + `LeaderTranslation`** — 🟢 **corrected from 🟣 — this entity has real mock precedent, missed when it was first added.** It was originally added on direct instruction and tagged 🟣 (entirely new, no precedent), on the belief that "قيادات المؤسسة" had no equivalent anywhere in this document set. That was wrong: `cpf-app/src/pages/AboutPage.jsx` has a complete `leaders = { board: [...], executive: [...] }` structure (10 board members, 5 executive members), each entry carrying `name`, `role`, `image`, and — on exactly one board member and one executive member — an additional `bio` (and, on one board member only, a `video`). This maps almost field-for-field onto the schema below: `name` → `LeaderTranslation.name`, `role` → `LeaderTranslation.position`, `image` → `Leader.card_image`, the occasional `bio` → `LeaderTranslation.bio` (nullable), the occasional `video` → `Leader.detail_media_url` with `detail_media_type='video'`. The `board`/`executive` object keys are exactly `Leader.leadership_type`. This was only caught once implementation actually started and someone went looking at `AboutPage.jsx` directly — a reminder that "no precedent" claims in this document are only as good as how thoroughly the mock was searched at the time, and are worth re-checking once a human (or an agent) actually starts building against them. A few notes on the structure, unaffected by this correction:
- **`leadership_type` (`board`/`executive`)** as a plain enum field, not a separate lookup table — consistent with how `ProgramFeature.feature_type` and `ProgramCallout.callout_type` handle a small, fixed, code-level distinction (§4.1) rather than reaching for a full normalized table for two values.
- **Two separate media concepts**: `card_image` (a single image for a listing/grid view — e.g. a leadership team page) versus `detail_media_type`/`detail_media_url` (a nullable pair supporting either an image *or a video* for an expanded bio view). This distinction matters because a grid of leader cards needs a guaranteed, uniform image to render consistently, while an individual leader's detail view can afford to be richer (a video message, for instance) without forcing every card in the grid to support video playback.
- **Fully `Translatable`, `Orderable`, `Activatable`, `Timestamped`** — same inherited mixins as every other About-page content block (§3.5), so a leader can be reordered, hidden without deletion (a board member's term ending, for instance), and translated, with no special-casing relative to `Quote`/`TimelineEntry`/etc.
- **No relationship to any other entity** — leadership bios don't reference `Program`, `Pathway`, or anything else in this schema; it's a fully standalone content block, same as `Quote`.

`01-PROJECT_VISION_AND_PHASE1_SCOPE.md` §10.1 has been corrected to match — it no longer claims Foundation Leaders has no mockup precedent, and now points at `AboutPage.jsx` as the direct frontend reference, the same "rebuild, don't port" treatment every other Phase 1 page already gets.

### 4.3 Networks & Resources (Makers Map) domain

**`Governorate` + `GovernorateTranslation`** — 🟢 The full list of 12 comes directly from `MakersMap.jsx`'s `GOVERNORATES` array in the mock, not researched independently.

**`MakerCategory` + `MakerCategoryTranslation`** — 🟢 Direct mirror of `makerSpacesData.js` → `MAKER_CATEGORIES: [{id, label}]` (six categories: digital fabrication, training, incubators, 3D printing, laser/CNC, materials).

**`MakerSpace` + `MakerSpaceTranslation`** — 🟢 Almost entirely mock-derived: `name`, `category` → `maker_category_id`, `governorate` → `governorate_id`, `description`, `address`, `website`, `lat`/`lng` (the mock's coordinates are real Jordan coordinates, not placeholders — e.g. Amman at `31.9629, 35.8888`). `website`/`phone` nullable because the mock itself doesn't give every maker space a phone number. `slug` is 🟡 architectural (same API convention as `Program`).

### 4.4 Forms / Intake domain

**`ContactSubmission`** — 🟢 Directly mirrors `Contact.jsx`'s general contact form fields (name, email, phone, subject, message).

**`NetworkJoinSubmission`** — 🟢 mock-derived field list from `Contact.jsx`'s "انضم لشبكتنا" tab form (name, age-range select, governorate select, phone, email, interest-area select). `governorate_id` as an FK rather than a free string is 🟡 architectural — it's the same normalization applied everywhere else a governorate appears, chosen for consistency rather than because the mock's `<select>` needed it to be an FK (a plain string would technically work too, since this is user-submitted data, not a lookup target). **`status`** (`new`/`handled`) is 🟡 architectural on both submission tables: the mock's forms are pure frontend UI with no persistence at all, so there's no mock behavior to trace — `status` exists because any real form-intake table needs a workflow state for whoever processes submissions, which is a baseline requirement for the feature to function at all, not a design embellishment.

**`TeamJoinSubmission`** — 🟣 field list given directly on instruction, though — like `Leader` turned out to be, once corrected above — this is not a 🟣-from-nothing case either: a real, previously unmodeled precedent already exists in the mock. `Contact.jsx`'s "careers" tab has a full CV-submission modal (`modalType === 'job'` → "بوابة الوظائف والخبرات" / Jobs & Experience Gateway; the other `modalType` → "بوابة تدريب الشباب" / Youth Training Gateway) with real required fields: **"الاسم الكامل"** (full name), **"مجال التخصص / الاهتمام"** (specialization/interest area), and a required PDF upload for **"السيرة الذاتية (CV)"**. Worth flagging the exact discrepancy rather than glossing over it:
- **Matches the mock:** `name`, and the resume upload (now `resume_url`/`resume_file`, split per the split-field decision below).
- **In the given spec but not in the mock:** `email`, `phone`, `message` — the mock's careers modal collects none of these today; the CV file and the applicant's name are the only identifying information it captures.
- **In the mock but not in the given spec:** the **specialization/interest-area field** ("مجال التخصص / الاهتمام", required in the mock), and the **job-vs-training `modalType` distinction** (two different CTAs — "بوابة الوظائف والخبرات" vs. "بوابة تدريب الشباب" — currently rendered as the same modal with different copy, but conceptually two different submission purposes).

This schema follows the **given field list exactly**, not the mock's — that was an explicit instruction, not an oversight — but the gap is real enough to flag for a follow-up content/product decision: does the careers form need `interest_area` and a job/training type distinction added back, or does the given field list supersede the mock's current design intentionally? **`resume_url`/`resume_file`** (rather than one ambiguous `resume_url_or_file` field) are both nullable, on the same reasoning as every other "either-or" input in this schema: the schema shouldn't leave a URL-vs-upload ambiguity for application code to invent silently — exactly one should be set, enforced at the application layer.

**`SuccessStorySubmission`** — 🟣 field list given directly on instruction, same situation as `TeamJoinSubmission`: a real, previously unmodeled precedent exists — `success/ShareStoryModal.jsx`, a 3-step form already fully built in the mock. Its actual fields, step by step: **step 1** — full name (`fullName`, required) and a program/initiative `<select>` (البرنامج أو المبادرة — options include "42 عمّان و42 إربد", "جامعة الحسين التقنية", "منصة نحن", "مساحة الصنّاع", and an "أخرى" / "other" option); **step 2** — an optional story title ("عنوان لقصتك", explicitly marked optional) and the story body (`story_text`); **step 3** — an optional personal photo upload (JPG/PNG, max 5MB) *or* an optional video/social-media link (TikTok, Reels, LinkedIn). No email or phone field exists anywhere in the mock's modal. Discrepancy, flagged the same way as above:
- **Matches the mock:** `name`, `program_name` (the mock's dropdown, including its "other" free-text-equivalent option, is exactly why `program_name` is a plain string and not a `Program` FK — see below), `story_text`.
- **In the given spec but not in the mock:** `email`, `phone` — not collected by `ShareStoryModal.jsx` today.
- **In the mock but not in the given spec:** the optional **story title**, the optional **photo upload**, and the optional **video/social-media link** — all three already built and working in the mock's step 3, none carried into the given field list.

Same resolution as `TeamJoinSubmission`: this schema implements the **given 7 fields exactly**, and the mock-vs-spec gap (particularly dropping photo/video capture, which the mock's own copy — "القصص المصورة أو الفيديوهات تحظى بتفاعل أكبر بكثير" / "photo and video stories get much more engagement" — argues for keeping) is flagged here for a follow-up product decision, not silently resolved either way. **`program_name` is a deliberate plain string, not a `Program` FK** — consistent with `ContactSubmission`/`NetworkJoinSubmission`'s established pattern of using free text for visitor-submitted, pre-moderation data rather than a validated lookup: a visitor selecting "أخرى" (other) or misremembering a program's exact name shouldn't be blocked by a foreign-key constraint on an unmoderated public form.

---

## 5. Relationship cardinality quick-reference

A few relationships are worth explaining as relationships, not just as fields on one side:

| Relationship | Cardinality | Why |
|---|---|---|
| `Pathway → Program` | one-to-many, **required** | Every program in the mock has a `pathway` value — none are missing it, so the FK isn't nullable. |
| `Pathway → Activity` | one-to-many, **required** | Same reasoning — every mock event has a `pathway`. |
| `Program → Activity` | one-to-many, **nullable** | See §4.2 above — architectural inference, deliberately optional since most mock activities show no program affiliation. |
| `Program → NewsArticle` | one-to-many, **nullable** | 🟢 mock-derived nullability: several `newsList[]` entries (e.g. the "منتدى تواصل" registration announcement) carry a `programKey`, but news about a general announcement or partnership legitimately has no single program to attach to. |
| `Program → SuccessStory` | one-to-many, **nullable in schema, but every mock entry has a value** | Modeled nullable for safety (a future success story might celebrate a non-program achievement), even though every current `allStories[]` entry does supply a `programKey`. |
| `Governorate → Activity` | one-to-many, **nullable** | See the `is_online` discussion in §4.2 — the one exception in the mock data (`'أونلاين'`) is why this isn't required. |
| `Governorate → SuccessStory` / `→ MakerSpace` | one-to-many, **required** | No exceptions found in the mock for either — every success story and every maker space has a real governorate. |
| Every master → its `*Translation` | one-to-many, **composition** (`CASCADE`) | A translation row is meaningless without its master and should never outlive it — see `06-DATA_MODEL_UML.md` §1 for why this is drawn as UML composition, not aggregation. |

---

## 6. Full provenance table

The single-glance version of everything above — every entity, tagged.

| Entity | Provenance | One-line why |
|---|---|---|
| `Language` | 🟡 Architectural | Config/reference table so language management is data, not code — not a hard FK target (see §3.5). |
| `Pathway` + Translation | 🟢 Mock-derived | `pathway` field, shared by Program and Activity. |
| `Program` + Translation | 🟢 Mostly mock-derived | `programsFullData`, nearly 1:1. `external_url_anchor` is 🔵 scope-derived. |
| `ProgramImage` + Translation | 🔵 Scope-derived | Mock has one image; client notes ask for a gallery. |
| `ProgramMetaDetail` + Translation | 🟢 Mock-derived | `metaDetails: [{label, value}]`. |
| `ProgramFeature` + Translation | 🟢 Mock-derived, 🟡 consolidated | Merges `facilities`/`workAreas`/`iconCards` — see §4.1. |
| `ProgramSubInitiative` + Translation | 🟢 Mock-derived | `subInitiatives: []`, kept separate from `ProgramFeature` deliberately. |
| `ProgramFaq` + Translation | 🟢 Mock-derived | `faqs: [{q, a}]`. |
| `ProgramCallout` + Translation | 🟢 Mock-derived, 🟡 consolidated | Merges `donationBanner`/`spotlightSection` — see §4.1. |
| `Activity` + Translation | 🟢 Mostly mock-derived, 🟡 `program_id`/`end_date_time`, 🔵 `source` | The entity that prompted this whole document — see §4.2. |
| ~~`NewsCategory` + Translation~~ | **Removed** | Reversed on review — `category` is a display label nothing queries; YAGNI. See §4.2 above and `05-DATA_MODEL_ERD.md` §8. |
| `NewsArticle` + Translation | 🟢 Mostly mock-derived, 🔵 `body` | Unifies two mock arrays into one model; full body is anticipatory. No `category` field. |
| `FieldLensImage` + Translation | 🟢 Mock-derived, 🟣 `layout_type` removed / `date` added | `pulseImages[]`; both changes per direct instruction. |
| `SuccessStory` + Translation | 🟢 Mostly mock-derived, 🟡 `governorate_id`/`subtitle`, removed `batch_number` | `allStories[]`; `subtitle` covers mock stories whose `program` value isn't a real `Program` (e.g. regional offices). |
| `Quote` + Translation | 🔵 Scope-derived | Not in mock at all — client notes' quote-selection requirement. |
| `FoundationRoleText` + Translation | 🔵 Scope-derived | The verbatim client-provided paragraph. |
| `StatCounter` + Translation | 🔵 Scope-derived | New stats + shared Home/About source of truth. |
| `TimelineEntry` + Translation | 🔵 Scope-derived | `CPF TIMELINE.xlsx` — `year_label` type is an assumption to verify. |
| ~~`AboutMap` + Translation~~ | **Removed** | Reversed on review — YAGNI for a single static map; see §4.2. Handled as a hardcoded Next.js component / env var instead. |
| `Leader` + Translation | 🟢 Mock-derived (corrected from 🟣) | `AboutPage.jsx`'s `leaders{board, executive}` array (10+5 people) — missed on first pass, caught once implementation started. See §4.2. |
| `Governorate` + Translation | 🟢 Mock-derived | `MakersMap.jsx`'s `GOVERNORATES` array. |
| `MakerCategory` + Translation | 🟢 Mock-derived | `MAKER_CATEGORIES: []`. |
| `MakerSpace` + Translation | 🟢 Mock-derived | `makerSpaces: []`, real coordinates. |
| `ContactSubmission` | 🟢 Mock-derived fields, 🟡 `status` | Form fields from the mock; workflow state has no mock equivalent. |
| `NetworkJoinSubmission` | 🟢 Mock-derived fields, 🟡 `governorate_id` FK, 🟡 `status` | Form fields from the mock; FK normalization and workflow state are both additions. |
| `TeamJoinSubmission` | 🟣 Given field list, 🟢 real mock precedent | `Contact.jsx`'s careers CV modal exists but was never modeled; field lists partially diverge — see §4.4. |
| `SuccessStorySubmission` | 🟣 Given field list, 🟢 real mock precedent | `ShareStoryModal.jsx` exists but was never modeled; field lists partially diverge (title/photo/video dropped, email/phone added) — see §4.4. |

---

## 7. What this document is not

This isn't a request to strip out every 🟡-tagged field or relationship — several of them (translation tables, `is_active`/`order`, `Activity.program_id`) are good architecture that the mock, being a static prototype with no CMS and no backend, was never going to demonstrate on its own. The point of tagging provenance isn't "mock-derived good, inferred bad" — it's making sure nobody mistakes a reasonable inference for a confirmed requirement, especially the ones (like `TimelineEntry.year_label`'s type, or whether `Activity.program_id` actually gets populated in practice) that are worth double-checking against real data or the client directly before treating them as settled.
