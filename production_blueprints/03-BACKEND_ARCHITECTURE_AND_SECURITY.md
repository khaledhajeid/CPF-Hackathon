# 03 — Backend Architecture & Security

> **Stack:** Django + Django Ninja · PostgreSQL
> **Read alongside:** `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` (defines exactly which resources need models/endpoints in Phase 1) and `02-FRONTEND_ARCHITECTURE.md` (defines how the frontend consumes this API).

---

## 1. Why Django + Django Ninja

Django is chosen for its batteries-included admin, ORM, and migrations — all directly useful for a project whose Phase 2 explicitly requires a full CMS and Admin Dashboard (`01-...md` §6). **Django Ninja** over classic DRF because:
- Type-annotated, Pydantic-schema-based request/response models give us free request validation and an auto-generated OpenAPI schema — which the frontend team can codegen typed API clients from (see `02-...md` §6), keeping the Next.js and Django contracts in sync as both evolve.
- Lighter-weight and faster to iterate on for a project that is, in Phase 1, mostly read-heavy public content endpoints — DRF's heavier serializer/viewset machinery isn't needed yet, and Ninja doesn't preclude adding DRF later for something that genuinely needs it.

**Open question, not yet decided:** the IT team has raised WordPress (or a similar CMS) as a possible platform specifically for high-churn content (news, youth stories) — see `01-...md` §9.5. This document's recommendation — Django's built-in admin as the single, unified CMS backbone for every content type — stands as the default unless the client explicitly chooses otherwise. If WordPress (or another CMS) is confirmed for any content type, this document needs a follow-up revision before that integration is built; don't start it against the architecture below as-is.

---

## 2. Project folder structure

```
backend/
├── config/                          # Django project package (settings, root urls, wsgi/asgi)
│   ├── settings/
│   │   ├── base.py                  # Shared settings
│   │   ├── dev.py                   # DEBUG=True, permissive CORS, local Postgres
│   │   ├── staging.py
│   │   └── production.py            # DEBUG=False, strict CORS/CSRF, secure cookies, real secrets from env
│   ├── urls.py                      # Mounts each app's Ninja router under /api/v1/
│   └── asgi.py / wsgi.py
│
├── apps/
│   ├── core/                        # Shared abstractions: BaseModel (timestamps, soft-delete), pagination schema, common permissions
│   ├── programs/                    # Program catalog — models, Ninja router, schemas
│   │   ├── models.py                # Program, ProgramImage, ProgramSubInitiative, ProgramFaq
│   │   ├── schemas.py                # Pydantic in/out schemas (ProgramOut, ProgramListOut, ...)
│   │   ├── api.py                    # Ninja router: GET /programs/, GET /programs/{slug}/
│   │   └── admin.py                  # Django admin registration (CMS backbone for Phase 2)
│   ├── activities/                  # August calendar / short-form activities — see §4.4, doubles as the "Opportunities" mock source
│   ├── news/                        # NewsArticle, NewsCategory
│   ├── success_stories/
│   ├── about_content/               # Quote, FoundationRoleText, TimelineEntry, StatCounter (CMS-editable singletons/lists)
│   ├── contact/                     # ContactSubmission, NetworkJoinSubmission (form intake)
│   ├── makers_map/                  # MakerSpace, MakerCategory, Governorate (Phase 1 Networks & Resources content)
│   ├── integrations/                # Phase 2: Impact System client — isolated so it can be swapped/mocked cleanly (see §5)
│   └── accounts/                    # Phase 2: User, auth — scaffolded now, not exposed publicly in Phase 1 (see §6)
│
├── manage.py
├── requirements/
│   ├── base.txt
│   ├── dev.txt
│   └── production.txt
└── docker-compose.yml                # Postgres + Django + (Phase 2) Redis
```

**Rule:** each Django app under `apps/` is a bounded content domain with its own `models.py` / `schemas.py` / `api.py` / `admin.py`. A Next.js route almost always maps to exactly one (occasionally two) of these apps' endpoints — keep this 1:1-ish mapping legible rather than one giant `api` app with everything crammed in.

---

## 3. API design principles

- **Versioned from day one:** every route lives under `/api/v1/`. A public institutional site's API will be linked to and depended on longer than a typical startup's — don't skip versioning "because it's just Phase 1."
- **Resource-oriented, RESTful shape** via Ninja routers: `GET /api/v1/programs/`, `GET /api/v1/programs/{slug}/`, `POST /api/v1/contact/`, etc. Avoid RPC-style action endpoints (`/api/v1/programs/doSomething/`) except for genuinely non-CRUD actions (e.g. `/api/v1/contact/network-join/` as a distinct submission type, matching the "انضم لشبكتنا" form's distinct purpose from the general contact form).
- **Consistent list envelope** across every list endpoint — pagination metadata should look identical whether you're listing programs, news, or maker spaces:
  ```json
  { "count": 42, "next": "...", "previous": null, "results": [ ... ] }
  ```
- **Consistent error envelope:**
  ```json
  { "detail": "human-readable message", "code": "validation_error", "fields": { "email": ["not a valid email"] } }
  ```
- **Filtering/search via query params**, not POST bodies, for GET-able resources — e.g. `GET /api/v1/makers-map/spaces/?governorate=عمان&category=تدريب` mirrors the frontend's URL-search-param-driven filter state (`02-...md` §3.2).
- **`slug` as the public identifier** for content resources (programs, news articles, success stories), not the numeric PK — cleaner URLs, and avoids leaking sequential IDs.

---

## 4. Data modeling for Phase 1

Only models needed for the **in-scope** Phase 1 surface (`01-...md` §3) are detailed here. Do not pre-build Phase 2 models (Partnerships, Publications, Entities Directory, Youth Networks) beyond what's noted as "safe to scaffold" in §7 below.

### 4.1 `Program` (apps/programs)
```
Program
  id, slug (unique), name, subtitle, description (rich text)
  hero_image, gallery_images  (→ ProgramImage, ordered M2M/FK — supports the "3-4 curated photos" requirement)
  category, external_url (nullable — for "available all year long" links to Nahno/HTUx)
  external_url_anchor (nullable — e.g. "the-core" section id, for the HTU "scroll to section" requirement)
  is_active (bool)
  created_at, updated_at

ProgramImage
  program (FK), image, caption (nullable), order (int)

ProgramSubInitiative        # e.g. "The Core" under HTU
  program (FK), name, subtitle, description, icon_name, cta_label, cta_url

ProgramFaq
  program (FK), question, answer, order
```
**Note on the merge requirement:** "مساحة الصنّاع" and "ملتقى الصنّاع" becoming one non-separated entry (`01-...md` §3.2) is a **data decision, not a schema decision** — it means exactly one `Program` row exists for this concept, not two. Don't model a "merged program" as a special case in the schema.

### 4.2 `Activity` (apps/activities)
This is the model that also stands in for "Opportunities and Events" (see §5 below — the Impact System integration seam).
```
Activity
  id, slug, title, description, activity_type (enum: workshop/event/... )
  start_date, end_date, location, governorate
  program (FK, nullable — an activity can belong to a Program or stand alone)
  registration_url (nullable — external registration link if applicable)
  is_active
  # Deliberately NO points/reward fields — out of scope per 01-...md §4
```

> This is a simplified early sketch — `05-DATA_MODEL_ERD.md` §5 and `07-DATA_MODEL_ERD_RATIONALE.md` §4.2 are the authoritative, current field list for `Activity` (including `end_date_time`, `is_online`, `pathway_id`, and the `source` field this section discusses). Treat this snippet as historical context, not the source of truth.

**Not yet modeled: target-audience criteria.** Per `01-...md` §7.0, whether an activity's eligibility (age, governorate, program affiliation, etc.) should be a **strict filter** or a **flexible/advisory criterion** is a decision Athar Sphere's team will make, not this engineering team. No `target_audience` field or eligibility-enforcement logic should be added to `Activity` until that decision lands — adding it now would mean guessing at a shape (and a strict-vs-flexible behavior) that isn't ours to decide, the same discipline already applied to `NewsCategory` and `SuccessStory.batch_number` in `07-...md` §8.

### 4.3 `NewsArticle` (apps/news)
```
NewsArticle
  id, slug, title, dek/summary, body (rich text), cover_image
  category, published_at, is_featured (drives the "top 3 in homepage carousel" selection)
  source ("original_site_seed" | "cms") — lets the team track which rows are the temporary seed content vs. real DB-sourced content per 01-...md §3.6
```

### 4.4 `SuccessStory` (apps/success_stories)
```
SuccessStory
  id, slug, name, program (FK), quote, body, photo, video_url (nullable)
  published_at, batch_number   # supports incremental batches per 01-...md §3.5
```

### 4.5 About page content (apps/about_content)
```
Quote            # singleton-ish, but modeled as a table with an is_active flag so swapping is a data change
  text, attribution, is_active

FoundationRoleText   # the exact client-provided paragraph, stored verbatim
  text, updated_at

StatCounter
  label (e.g. "شريك"), value (e.g. 4500), display_suffix (e.g. "K"), order
  # Same model powers BOTH the home page hero counters and the About page counters —
  # one canonical source of truth per 02-...md's "one shared reusable counter" guidance

TimelineEntry
  year_or_date_label, title, description, order   # ingested from CPF TIMELINE.xlsx

AboutMap
  embed_config (JSON — lat/lng/zoom or embed URL), is_active   # placeholder row, content pending (01-...md §3.8/§5)
```

### 4.6 Makers Map (apps/makers_map)
```
Governorate
  name, order   # fixed list of Jordan's 12 governorates

MakerCategory
  name, order

MakerSpace
  id, name, description, governorate (FK), category (FK)
  lat, lng, address, phone, website (nullable)
```

### 4.7 Contact / form intake (apps/contact)
```
ContactSubmission
  name, email, phone, subject, message, submitted_at, status (new/handled)

NetworkJoinSubmission        # "انضم لشبكتنا" — distinct shape from general contact
  name, age_range, governorate, phone, email, interest_area, submitted_at, status
```

### 4.8 What is deliberately NOT modeled in Phase 1
Per `01-...md` §4: no `Partner`/`Partnership` model, no `Publication` model, no `Entity`/`EntityCategory` (Directory) model, no `YouthNetwork` model, no points/rewards fields anywhere. If a future ticket asks to "just add a points field to Activity since we're in there anyway" — don't; that's exactly the scope creep this document exists to prevent.

---

## 5. Third-party API strategy: the external Impact System (Athar Sphere)

This is the most architecturally important decision in this document — get it locked in before any team member starts writing integration code by instinct. The IT team has since confirmed the external system's actual name: **Athar Sphere.** See `01-...md` §7.0 for the full list of what's confirmed vs. still pending from their side (API version/endpoint/token, dashboard sync, target-audience-criteria enforcement, QR code flow) — none of it changes the architecture below, it's additional operational detail once Athar Sphere's team provides it.

### 5.1 Decision: Django backend integrates, NOT the Next.js frontend
**The Django backend is the integration point for the external Impact System API, never the Next.js frontend directly.** Reasoning:
1. **Secrets management.** Whatever API key/credential the Impact System requires must never reach the browser. A server-side integration keeps it in Django's environment config exclusively.
2. **Caching and rate-limit shielding.** The Impact System is someone else's production system with its own rate limits and uptime characteristics. Django can cache responses (Redis, TTL-based) so a spike in CPF site traffic never translates into a spike of requests against the Impact System, and so a brief Impact System outage doesn't take down our own Activities/Opportunities pages (serve slightly-stale cached data instead of an error).
3. **Response shaping / adapter layer.** Our frontend contract (`/api/v1/activities/`) is defined by us and stable. If the Impact System's actual response shape is different (field names, nesting, pagination style), a serializer/adapter in `apps/integrations/` absorbs that difference — the frontend never needs to change when the Impact System's API evolves.
4. **Consistent auth model.** In Phase 2, some Impact-System-sourced actions (e.g., registering for an opportunity) will need to be tied to our own user accounts — that orchestration has to happen server-side regardless.

### 5.2 Phase 1 implementation
- `apps/activities/` (and any other "Opportunities Hub" content) is served from our own PostgreSQL-backed models (§4.2), populated via Django fixtures/admin, matching the anticipated future Impact System shape as closely as is reasonably knowable today.
- `apps/integrations/` exists as an **empty/stub app** in Phase 1 — no real HTTP client code needed yet, but the app boundary is reserved so Phase 2 work has an obvious home and doesn't get scattered across `apps/activities/`.

### 5.3 Phase 2 implementation (do not build now — documented for context)
- `apps/integrations/impact_system_client.py` — a thin, isolated HTTP client (base URL + auth from env config) with its own error handling and timeout policy.
- A scheduled task (Celery beat, or a simple management command on a cron) periodically pulls from the Impact System and upserts into our own `Activity`/`Opportunity` tables — **preferred over a live pass-through on every request**, because it keeps our own API's latency and availability decoupled from the Impact System's, and it lets us keep serving the last-known-good data during an Impact System outage.
- Alternative (if near-real-time freshness is required): a request-time fetch with a short Redis cache (e.g. 60–300s TTL) instead of a batch sync — choose based on how time-sensitive "opportunities and events" data actually turns out to be; confirm this requirement with the client before committing to either pattern.
- Either way: **the `/api/v1/activities/` contract our Next.js frontend already depends on does not change.** This is the entire point of the seam.

---

## 6. Security standards

CPF is a royal-backed national institution — the security bar is "would this hold up to a government security review," not "typical startup MVP."

### 6.1 CORS
- Explicit **allow-list of origins** in production (`django-cors-headers`, `CORS_ALLOWED_ORIGINS`), never `CORS_ALLOW_ALL_ORIGINS = True` outside local dev settings.
- Credentials (`CORS_ALLOW_CREDENTIALS`) only enabled once Phase 2 auth cookies are in play, and only for the exact allow-listed frontend origin(s).

### 6.2 CSRF
- Django's CSRF protection stays **on** for any session-cookie-authenticated request (Django admin, and any Phase 2 cookie-based session auth).
- For the Ninja API consumed by Next.js: if using **cookie-based** auth in Phase 2 (recommended over `localStorage` JWTs — see §6.3), CSRF tokens must be issued and validated on state-changing requests (`POST`/`PUT`/`PATCH`/`DELETE`). If using pure Bearer-token auth instead, CSRF is less relevant for the API itself but the above still applies to the Django admin.

### 6.3 JWT / auth prep for Phase 2
Phase 1 ships **no public user authentication** (`01-...md` §4/§6) — but the models and the token strategy should be decided now so Phase 2 doesn't retrofit:
- **Recommended: httpOnly, Secure, SameSite=Strict cookies** carrying a short-lived access token, with a separate refresh mechanism — not `localStorage`/`sessionStorage` JWTs, which are vulnerable to XSS token theft. This is a stronger default for a public national institution than the common SPA pattern of storing a JWT in browser storage.
- `apps/accounts/` scaffolds the `User` model and auth endpoints structurally in Phase 1 (even if unused/unexposed) specifically so this decision is made deliberately once, by the team building it, rather than improvised under Phase 2 deadline pressure.
- Django's admin auth (for internal CMS/staff use, which **does** exist in Phase 1 since content editors need it) uses Django's standard session auth — this is separate from and unrelated to the public-facing Phase 2 user auth question above.

### 6.4 Rate limiting
- Apply rate limiting (`django-ratelimit` or equivalent, or at the reverse-proxy/CDN layer — e.g. Cloudflare/Nginx) on all **write** endpoints from day one: `POST /api/v1/contact/`, `POST /api/v1/contact/network-join/`. These are the only public write surfaces in Phase 1 and are the obvious spam/abuse target.
- Read endpoints should still have a sane ceiling (e.g. per-IP requests/minute) at the CDN/reverse-proxy layer to blunt scraping and basic DoS attempts, separate from application-level logic.

### 6.5 Input validation
- Django Ninja's Pydantic schemas give you request validation "for free" — **use strict schemas** (explicit field types, `max_length` constraints, email/phone format validation) rather than loose `dict`-typed request bodies anywhere, especially on the two public form endpoints.
- Rich-text fields (`Program.description`, `NewsArticle.body`, etc.) that are authored via the Phase 2 CMS must be sanitized (strip/allow-list HTML tags) before storage or before render — never trust rich text as safe-to-render HTML by default, even from authenticated staff, to guard against stored XSS.
- File uploads (program images, news cover images) must validate file type and size server-side (not just via frontend `accept=""` hints, which are trivially bypassed), and should be served from a dedicated storage backend (S3-compatible or equivalent) with content-type sniffing disabled on serve.

### 6.6 Data protection
- All traffic HTTPS-only in every environment beyond local dev; `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE` all `True` in production settings.
- Secrets (DB credentials, future Impact System API key, Django `SECRET_KEY`) via environment variables / a secrets manager — never committed to the repo, never hardcoded in `settings/production.py`.
- `ContactSubmission` and `NetworkJoinSubmission` contain PII (name, phone, email) — apply the same data-retention and access-control discipline expected of a government-adjacent system: restrict Django admin access to these tables via Django's permission system (not "any staff user can see everything"), and define a retention/deletion policy with the client rather than assuming indefinite storage is fine by default.
- Standard Django/security hardening: `SECURE_HSTS_SECONDS`, `X_FRAME_OPTIONS = 'DENY'` (or `SAMEORIGIN` if a legitimate embed use case exists), `SECURE_CONTENT_TYPE_NOSNIFF`, dependency vulnerability scanning (`pip-audit` or equivalent) in CI.

---

## 7. What's safe to scaffold now for Phase 2 (without building the feature)

To avoid Phase 2 rework without violating Phase 1 scope discipline (`01-...md` §4):
- `apps/accounts/` app skeleton (models only, no exposed endpoints) — see §6.3.
- `apps/integrations/` app skeleton (empty, reserved) — see §5.2.
- Foreign-key-ready fields on existing models that anticipate a future relationship (e.g., leave room for a future `Activity.registered_users` M2M through table) **only if it costs nothing today** — don't build speculative junction tables/migrations for relationships that don't exist yet. When in doubt, leave it out and let Phase 2 add the migration then; a clean, minimal Phase 1 schema is worth more than guessing Phase 2's exact shape wrong.
