# 10 — API Contract v0 (hand-written, pre-Step-3)

> **This is a bridge document, not a permanent one.** Once `cpf-backend` actually builds Step 3, Django Ninja auto-generates the real OpenAPI schema (`GET /api/v1/openapi.json`) from the real Pydantic response models — **that becomes the authoritative contract and supersedes this file.** Until then, this is the thing that lets backend (Step 3) and frontend (Step 4) start building in parallel tomorrow without waiting on each other, by fixing the handful of decisions that would otherwise silently diverge between two people who never see each other's code before an office day.
>
> Identical in both `cpf-backend/production_blueprints/` and `cpf-frontend/production_blueprints/` — same discipline as `09-TEAM_WORKFLOW.md`.

---

## 1. Why this exists — what would go wrong without it

`05-DATA_MODEL_ERD.md` already fixes every entity's fields. `08-TODO_PHASE1.md` Step 3 already lists every endpoint path. That's most of a contract already — but three things neither document actually pins down, and each one is exactly the kind of small, unagreed detail that looks fine on both sides independently and only breaks on the day they connect:

1. **JSON key casing.** Django/Python models are `snake_case` (`hero_image`, `is_active`). Nothing in this project ever decided whether the JSON that crosses the wire stays `snake_case` or becomes `camelCase` (the JS/TS convention). Pick one, once — don't let backend ship Ninja's default and frontend assume the other.
2. **How translated content is served.** `05-...md`'s master + `*Translation` split is the right *database* shape — it is not the *API response* shape. A frontend consuming `GET /api/v1/programs/{slug}/` should never see a separate translations array it has to search through; it should get one flat object in the language it asked for.
3. **The `?lang=` convention.** `08-...md` Step 3 explicitly flags this as "decide and document one convention, apply it everywhere" and then never does. Left undecided, backend and frontend will each build against a different guess.

**Decisions, made here, once:**
- **JSON keys are `camelCase`.** Backend: configure Pydantic schemas with an alias generator (`to_camel`) so Ninja serializes `hero_image` → `heroImage` automatically — don't hand-rename every field. This is the standard, low-effort way to do it in Pydantic v2 (`ConfigDict(alias_generator=to_camel, populate_by_name=True)`), not a manual per-field chore.
- **Translated content is flattened.** Every response merges the master row with exactly one `*Translation` row (the requested language) into one object. The frontend never sees `translations: [...]` — it sees `title`, `about`, etc. directly on the resource.
- **Language selection is a `?lang=ar|en` query parameter**, not an `Accept-Language` header. Simpler to control per-request from fixtures/tests/curl, defaults to `ar` when absent (Phase 1 is Arabic-content-only anyway, per `01-...md` §1.2). Every endpoint respects it identically — no per-endpoint exceptions.
- **FK relationships resolve inline, not as bare IDs.** A `Program`'s `pathway` comes back as `{ "code": "learn", "name": "تعلّم" }`, not `"pathwayId": 3` — the frontend shouldn't need a second request just to show a label it already knows it needs. Same for `governorate` wherever it appears.
- **List envelope:** `{ "count": int, "next": "url|null", "previous": "url|null", "results": [...] }` — every list endpoint, no exceptions (`03-...md` §3).
- **Error envelope:** `{ "detail": "string", "code": "string", "fields": { "fieldName": ["message"] } }` — `fields` present only on validation errors.

---

## 2. Program domain

### `GET /api/v1/programs/?lang=ar` (list — summary shape)
```json
{
  "count": 14,
  "next": null,
  "previous": null,
  "results": [
    {
      "slug": "jamiat-al-hussein-al-taqniya",
      "pathway": { "code": "learn", "name": "تعلّم" },
      "registrationStatus": "open",
      "heroImage": "https://...",
      "logoImage": "/HTU.png",
      "title": "جامعة الحسين التقنية",
      "tagline": "تعليم يُبنى بالتطبيق، لا بالحفظ",
      "isActive": true,
      "order": 1
    }
  ]
}
```

### `GET /api/v1/programs/{slug}/?lang=ar` (detail — full nested shape)
Adds, beyond the list fields above: `heroVideo`, `externalUrl`, `externalUrlAnchor`, `ctaUrl`, `ctaLabel`, `about`, `overview`, and the nested collections:
```json
{
  "...": "...list fields above, plus:",
  "about": "جامعة تقنية أسستها...",
  "overview": "تركز جامعة الحسين...",
  "images": [ { "image": "url", "isHero": true, "caption": null, "order": 1 } ],
  "metaDetails": [ { "label": "نوع البرنامج", "value": "دراسة جامعية تطبيقية", "order": 1 } ],
  "features": [ { "featureType": "facility", "iconName": null, "title": null, "description": "مركز التميز...", "order": 1 } ],
  "subInitiatives": [ { "name": "The Core", "subtitle": "مركز التميّز للريادة والابتكار", "description": "...", "iconName": "lightbulb", "logoImage": null, "ctaLabel": "تواصل مع The Core", "ctaUrl": "mailto:...", "order": 1 } ],
  "faqs": [ { "question": "كيف يمكنني الالتحاق...", "answer": "من خلال موقع...", "order": 1 } ],
  "callouts": [ { "calloutType": "spotlight", "title": "شبكة خريجي...", "text": "...", "ctaLabel": "تعرّف على خريجي البرنامج", "ctaAnchor": "#related-stories", "iconName": null, "accentColor": null, "ctaUrl": null } ]
}
```
`featureType` distinguishes `facility` / `work_area` / `icon_card` — see `05-...md` §4 for why these are one table. `calloutType` distinguishes `donation` / `spotlight`.

---

## 3. Activities, News, Field Lens, Success Stories

### `GET /api/v1/activities/?lang=ar&pathway=learn&governorate=amman&program=jamiat-al-hussein-al-taqniya`
Each result: `slug`, `pathway: {code, name}`, `governorate: {code, name}|null`, `isOnline`, `program: {slug, title}|null`, `ageRange`, `startDate`, `endDateTime|null`, `image`, `registrationUrl|null`, `title`, `description`, `locationLabel`. **No `points` field — do not add one** (`01-...md` §4).

### `GET /api/v1/news/?lang=ar&isFeatured=true&ordering=-publishedAt`
Each result: `slug`, `program: {slug, title}|null`, `mediaType`, `mediaUrl`, `coverImage|null`, `isFeatured`, `isHeroCarousel`, `publishedAt`, `title`, `summary`. Detail (`/{slug}/`) adds `body`. **No `category` field — `NewsCategory` was deliberately removed** (`05-...md` §8).

### `GET /api/v1/field-lens/?lang=ar` (ordered by `date`)
Each result: `image`, `date`, `order`, `title`. **No `layoutType` field — `layout_type` was removed** (`05-...md` §8: all images use a normal layout now).

### `GET /api/v1/success-stories/?lang=ar`
Each result: `slug`, `program: {slug, title}|null`, `governorate: {code, name}|null`, `videoUrl|null`, `image`, `publishedAt`, `name`, `subtitle|null`, `quote`, `fullStory`. **No `batchNumber` field** (`05-...md` §8).

---

## 4. About content

- `GET /api/v1/about/quote/?lang=ar` → single object (not a list — there's always exactly one active quote): `{ "text": "...", "attribution": "..." }`.
- `GET /api/v1/about/foundation-role/?lang=ar` → `{ "text": "...verbatim client paragraph..." }`.
- `GET /api/v1/about/stats/?lang=ar&showOn=home|about` → list of `{ "code": "partners", "value": 4500, "displaySuffix": "K", "iconName": "...", "label": "شريك" }`.
- `GET /api/v1/about/timeline/?lang=ar` → list of `{ "yearLabel": "2016", "title": "...", "description": "..." }`, ordered.
- `GET /api/v1/about/leaders/?lang=ar&leadershipType=board|executive` → list of `{ "leadershipType": "board", "cardImage": "url", "detailMediaType": "image|video", "detailMediaUrl": "url|null", "name": "...", "position": "...", "bio": "...|null" }`. See `07-...md` §4.2 for why this shape exists (mock-derived from `AboutPage.jsx`).

No `AboutMap` endpoint — that content is a hardcoded frontend component, not an API resource (`05-...md` §8).

---

## 5. Makers Map

- `GET /api/v1/makers-map/governorates/?lang=ar` → list of `{ "code": "amman", "name": "عمان" }` (all 12).
- `GET /api/v1/makers-map/categories/?lang=ar` → list of `{ "code": "digital-fab", "label": "مساحات التصنيع الرقمي" }` (all 6).
- `GET /api/v1/makers-map/spaces/?lang=ar&governorate=amman&category=digital-fab` → list of `{ "slug": "...", "category": {code, label}, "governorate": {code, name}, "lat": 31.9629, "lng": 35.8888, "website": "url|null", "phone": "string|null", "name": "...", "description": "...", "address": "..." }`.

---

## 6. Write endpoints (forms — request bodies)

All four: `POST`, no `lang` needed (submission-only), response `201` with the created row's `id` and `status: "new"`, or `422` with the error envelope on validation failure. None of these four are ever exposed via a `GET` — write-only from the public API's perspective (`08-...md` Step 3 exit criteria).

- **`POST /api/v1/contact/`** → `{ "name", "email", "phone", "subject", "message" }`
- **`POST /api/v1/contact/network-join/`** → `{ "name", "ageRange", "governorate", "phone", "email", "interestArea" }`
- **`POST /api/v1/contact/team-join/`** → `multipart/form-data`: `{ "name", "email", "phone", "message", "resumeUrl"|null, "resumeFile"|null }` — exactly one of `resumeUrl`/`resumeFile` required, enforced server-side (`07-...md` §4.4).
- **`POST /api/v1/success-stories/submit/`** → `{ "name", "email", "phone", "programName", "storyText" }` — `programName` is free text, not validated against real `Program` slugs (`05-...md` §6 — visitor-submitted, pre-moderation).

**Open per `01-...md` §10.2/§10.3:** these field lists intentionally don't yet include the mock's extra fields (specialization/job-type on team-join; title/photo/video on story-submit) — that reconciliation decision is still unmade. This contract reflects what's being built now, not a resolution of that open question.

---

## 7. What to actually do with this, starting tomorrow

- **Backend (Step 3):** implement Ninja schemas to produce exactly these shapes — camelCase aliasing, flattened translations, `?lang=` handling, inline FK resolution — as the target, not an afterthought to bolt on after building snake_case-by-default schemas. Once real endpoints exist, export the real OpenAPI schema and treat *that* as authoritative; note in `09-TEAM_WORKFLOW.md`'s shared channel that v0 is superseded.
- **Frontend (Step 4):** build fixtures/mocks matching these exact shapes now — don't wait for Step 3 to produce a real export. When the real OpenAPI snapshot arrives, diff it against what was assumed here; anything that moved is a one-time reconciliation, not a rebuild, if this contract was followed.
