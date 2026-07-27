# 00 — Project Master Context

> **Read this file first, completely, before opening anything else in this folder.** This is the onboarding briefing for this project — written so a new AI session (or a new human engineer) has the same working understanding of this project that the session that produced this blueprint set had, without needing to re-derive any of it from scratch.
>
> **This file is a compressed index, not a replacement for `01`–`07`.** It tells you what's true and where to go for the full reasoning. When this file and a numbered document disagree, the numbered document wins — update this file, don't trust it over the source.

---

## 1. What this project is

The Crown Prince Foundation (CPF) website is being rebuilt from a **frontend-only visual mockup** (a React/Vite prototype, fictional data, no backend, no auth) into a **production full-stack application**. The mockup exists only as a visual/UX reference — none of its code ships. This blueprint set is the complete architecture handoff for that rebuild, written to be dropped into a brand-new repository.

Full context: `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` §1.

---

## 2. Vision & Scope: Phase 1 vs. Phase 2

**Phase 1 is not "frontend only."** It is the **full public-facing site** — Next.js frontend *and* Django backend *and* a real PostgreSQL database, with a real API in between. What Phase 1 does *not* include is any non-technical content-authoring UI, staff/user accounts, or a few specific pages. Precisely:

### Phase 1 ships:
- Public pages: Home, بوابة الفرص (Programs + Activities + Networks&Resources), News, Success Stories, About, Contact.
- **Networks & Resources ships Makers Map only** — Entities Directory and Youth Networks are fully designed but hidden.
- A real Django/Postgres data model behind every page (see §5 below) — content is database-driven from day one, not hardcoded JSX, even though Phase 1 has no polished editor UI to manage it yet (Django's default admin works against the same models with zero extra engineering, as an interim measure).
- **Bilingual-ready schema, Arabic-only content.** Every translatable entity already has the `*Translation` table structure (§4.1) so English is a data-entry task later, never a schema migration. Phase 1 itself only populates Arabic rows.
- Points/rewards system: **excluded entirely**, not merely deferred — see `01-...md` §4.
- The "Impact System" integration seam exists in the backend (an app boundary, a `source` field on `Activity`) but fetches only Django-seeded mock data in Phase 1 — no live external calls yet.

### Phase 2 (not built now, but the architecture must not block it):
- **Content Editor tooling** (a designed, non-technical CMS UI) — see §6, this is an **open timing question**, not settled to be Phase 2-only.
- Admin Dashboard (a *different* persona — office/event registration management, not content editing — see §6).
- User Authentication (youth accounts, applications, ticket history).
- Partnerships page, Publications page.
- Entities Directory, Youth Networks (re-enabled within Networks & Resources).
- Real Athar Sphere (Impact System) API consumption, replacing the Phase 1 mock/seed data.

Full context: `01-...md` §3 (in scope), §4 (excluded/deferred), §6 (Phase 2 preview), §9 (IT alignment notes), §10 (newest additions).

---

## 3. Tech stack

| Layer | Choice |
|---|---|
| Frontend | **Next.js (App Router)**, TanStack Query (server state), Zustand (client UI state only), Tailwind CSS, Framer Motion |
| Backend | **Django + Django Ninja** (typed, Pydantic-schema APIs, auto OpenAPI) |
| Database | **PostgreSQL** |
| CMS backbone (Phase 1 interim, Phase 2 candidate) | Django's built-in admin. **WordPress was raised as an alternative for high-churn content (news, youth stories) and is explicitly undecided** — see §6. |

Full context: `02-FRONTEND_ARCHITECTURE.md`, `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` §1.

---

## 4. Core architectural rules (do not relitigate these without a reason)

### 4.1 Translation pattern: `*Translation` tables, not `_ar`/`_en` columns
Every translatable entity is split into a language-neutral **master** table and a **`<Model>Translation`** table: a FK back to master (`related_name='translations'`, `on_delete=CASCADE`), a plain `language_code` string field (not an FK to a `Language` table — that would force a join on every lookup for a value Django's own `settings.LANGUAGES` already governs), and `unique_together('language_code', 'master')`. Verified directly against `django-parler`'s documented schema, not invented. **Why:** adding a language later is a data operation (insert rows), never a migration — the mockup's own light version of this (`title`/`titleEn` columns) doesn't scale past two languages or into a real CMS editing screen (one tab per language, not a wide form with parallel fields).
Full reasoning: `05-DATA_MODEL_ERD.md` §1.

### 4.2 YAGNI discipline — applied repeatedly, not just claimed
This schema has been walked back multiple times when a table or field was solving a problem nothing actually has:
- **`Activity.program_id` is nullable — Activity is decoupled from Program, not required to belong to one.** Most mock activities have no program affiliation at all; this FK is itself an *architectural inference* (not mock-derived — flagged explicitly), added because program detail pages plausibly want to list their own upcoming activities later, kept optional so nothing is assumed.
- **`NewsCategory`/`NewsCategoryTranslation` were built, then removed.** The mock's `category` values are real, but nothing anywhere — not the mock, not the client's notes — ever filters or queries on them. A lookup table + FK for a filter nobody asked for was reversed once that was noticed.
- **`SuccessStory.batch_number` was removed** — null for the vast majority of stories, no UI or filter anywhere reads it.
- **`AboutMap` (a whole table with a `json embed_config` field) was removed.** One static map on one page doesn't need a dedicated table, API route, and future CMS screen — a hardcoded Next.js component (or an env var) does the same job. Reintroduce a model only if the map genuinely needs to become admin-editable with multiple variants.
- **Points/rewards: no field anywhere, on principle**, even though the mock's `Activity`-equivalent data has one.

**The lesson for future schema decisions:** before adding a table, a lookup, or a normalization, confirm something in the mock, the scope document, or a stated requirement actually reads/filters/queries it. If nothing does, it's speculative generality — don't build it yet.
Full reasoning: `05-...md` §8, `07-DATA_MODEL_ERD_RATIONALE.md` throughout.

### 4.3 Lookups normalized once, shared everywhere: `Pathway` and `Governorate`
`Pathway` ("tracks": تعلّم / قُد / اصنع الأثر) and `Governorate` (Jordan's 12 governorates) were each found doing the same job across multiple unrelated mock files, then normalized into one shared table each rather than re-declared as an enum per table. `Pathway` categorizes both `Program` and `Activity` (including prize/award-type programs — confirmed by the IT team, no separate "prize" categorization needed). `Governorate` is referenced by `Activity`, `SuccessStory`, `MakerSpace`, and `NetworkJoinSubmission`.
Full reasoning: `05-...md` §3.3, `07-...md` §3.3, `01-...md` §9.4.

### 4.4 Ownership semantics: composition vs. aggregation (see the UML doc, not just the ERD)
The ERD (`05-...md`) shows relational cardinality. The UML companion (`06-DATA_MODEL_UML.md`) additionally distinguishes **composition** (`*--`, filled diamond — a `*Translation` row is owned by and deleted with its master) from **aggregation** (`o--`, hollow diamond — e.g. `Program` references `Pathway` but never owns or cascades into deleting it). This distinction is what should drive `on_delete` behavior in the real Django models — `CASCADE` for composition, `PROTECT` or `SET_NULL` for aggregation, depending on the relationship.

### 4.5 Django is the sole integration point for the external Impact System (Athar Sphere)
The Next.js frontend never calls Athar Sphere (or any third-party API) directly, in Phase 1 or Phase 2. Django owns secrets, caching, rate-limit shielding, and response-shape adaptation; the frontend only ever talks to our own `/api/v1/...` endpoints. Athar Sphere's API version, endpoint, token, and expected shape are still pending from their team — the seam is built, the specifics aren't filled in yet.
Full reasoning: `03-...md` §5, `01-...md` §7/§7.0.

### 4.6 Provenance tagging — keep using this system for new schema decisions
`07-...md` established four tags for *why* every entity/field exists, after a review caught that not every relationship's origin had been made explicit:

| Tag | Meaning |
|---|---|
| 🟢 **MOCK-DERIVED** | A real field/value in the mockup's code today — cite the exact file and field. |
| 🔵 **SCOPE-DERIVED** | Not in the mock, but explicitly required by `01-...md` (which translates the client's original PDF notes). |
| 🟡 **ARCHITECTURAL INFERENCE** | Neither mock nor scope-doc requires it — added for schema-design reasons. Deserves the most scrutiny. |
| 🟣 **NEW REQUIREMENT (DIRECT INSTRUCTION)** | Given directly in a later session, with no trace in the mock, the original PDF, or the IT alignment notes. |

**When you add or change a schema element, tag it and add one sentence of why, in the same style.** This is what makes `07-...md` an audit trail instead of just a description.

### 4.7 Design system is binding, not a suggestion
`DESIGN.md` (repo root) governs every visual/UX decision — colors (CPF Red vs. Interactive Red vs. Gold, each with a specific job), typography, motion rules, and a documented list of recurring mockup bugs to not reintroduce (Gold+white text contrast failures, `whileInView`-gated content that silently never renders, side-stripe borders, etc.). Read it before any UI work, not just once at the start.

---

## 5. Directory / file guide

| File | What's inside | Read this when... |
|---|---|---|
| **`00-PROJECT_MASTER_CONTEXT.md`** | This file. Compressed index + the rules in §4 above. | You're starting cold. Always read first. |
| **`01-PROJECT_VISION_AND_PHASE1_SCOPE.md`** | Business vision, exact Phase 1 in-scope/excluded lists (translated from the client's original PDF), pending content dependencies, the IT team's later alignment notes (§9), and the newest direct-instruction scope additions (§10: Foundation Leaders, Join Our Team, Submit Your Story). | You need to know if something is in scope, and why. |
| **`02-FRONTEND_ARCHITECTURE.md`** | Next.js folder structure, TanStack Query vs. Zustand rules, accessibility/responsive/animation guidelines, documented mockup bugs and their fixes. | You're building or reviewing frontend code. |
| **`03-BACKEND_ARCHITECTURE_AND_SECURITY.md`** | Django app structure, an early/simplified data-model sketch (now superseded by `05`/`07` — treat as historical context, not source of truth), the Athar Sphere integration strategy, security standards (CORS/CSRF/rate limiting/JWT). | You're building or reviewing backend code, or need the security checklist. |
| **`04-EXECUTION_PLAN_A_TO_Z.md`** | The original high-level, five-step roadmap (setup → theming → component migration → page assembly → QA/deploy). | You want the narrative build sequence. **For a literal task-by-task checklist, use `08-TODO_PHASE1.md` instead — it's the actionable version, built directly from the final schema.** |
| **`05-DATA_MODEL_ERD.md`** | **The authoritative database schema.** Entity-relationship diagrams (Mermaid) across 4 domain diagrams, the translation-table decision, a full mock→schema traceability table, and what's intentionally excluded. | You need to know what tables/fields/relationships exist, exactly. |
| `05-DATA_MODEL_ERD.pdf` | A print-formatted export of an earlier version of `05`. **Stale — predates `Leader`, the `FieldLensImage`/`SuccessStory` field changes, and the `AboutMap`/`NewsCategory` removals. Do not treat as current; the `.md` is the source of truth.** Regenerate on request if a print copy is needed again. | Only if you specifically need a print/PDF artifact, and even then, verify against `05.md` first. |
| **`06-DATA_MODEL_UML.md`** | The same schema as an object system — inheritance/mixins (`TranslatableModel`, `Translation`, `Orderable`, `Activatable`, `Timestamped`), composition vs. aggregation ownership semantics, enumerations, representative methods. | You need to understand ownership/cascade behavior or are translating the ERD into actual Django model inheritance. |
| **`07-DATA_MODEL_ERD_RATIONALE.md`** | The "why" behind every single entity and field in `05` — provenance-tagged (§4.6 above), including every YAGNI reversal and every direct-instruction addition, with the exact mock-vs-given-spec discrepancies spelled out for `TeamJoinSubmission`/`SuccessStorySubmission`. | You're unsure whether something is a confirmed requirement or a judgment call — this document exists specifically to answer that. |
| **`08-TODO_PHASE1.md`** | The literal, checkbox-driven build sequence: environment setup → Django models (one checkbox per table in `05`) → Django Ninja API endpoints → Next.js scaffolding/integration. | You're about to actually start writing code. |
| `DESIGN.md` (repo root) | The complete visual design system. Binding — see §4.7. | Any UI work. |
| `PRODUCT.md` (repo root) | Brand voice, users, positioning, accessibility principles. | Content/copy decisions, brand tone questions. |
| `reference-materials/Notes for Website Development.pdf` | The client's original, literal Phase 1 punch-list. | Something in `01` seems ambiguous — this PDF is the ground truth `01` was translated from. |
| `reference-materials/CPF Co-branding Guidelines.pdf` | Official brand asset rules (logo usage, co-branding). | Anything `DESIGN.md` doesn't cover. |

---

## 6. Open decisions — not resolved, do not assume an answer

These are explicitly **not settled**. Don't build against a guessed answer; flag it if it becomes blocking.

1. **Does Content Editor tooling (a designed CMS UI) ship in Phase 1, or stay Phase 2?** The data model is already CMS-ready either way — this only affects whether a polished editing screen (vs. Django's default admin as an interim measure) is a Phase 1 launch requirement. `01-...md` §9.3.
2. **CMS platform: Django Admin (this blueprint's default recommendation) or WordPress/similar** for high-churn content (news, youth stories)? Raised by IT, explicitly undecided. A WordPress path needs a follow-up revision to this blueprint set before it's built. `01-...md` §9.5.
3. **Athar Sphere integration specifics** — API version, endpoint, auth token, expected response shape — still pending from their team. `01-...md` §7.0.
4. **Target-audience-criteria enforcement** (strict filter vs. flexible/advisory) for activities/opportunities — to be decided through Athar Sphere, not this engineering team. Do not model an eligibility field until this lands. `01-...md` §7.0, `03-...md` §4.2.
5. **QR code flow** — purpose and mechanics not yet finalized with Marei's team. No QR-related model or UI until confirmed. `01-...md` §7.0.
6. **Foundation Leaders (`Leader`/`LeaderTranslation`) page placement and frontend design** — this content has zero mockup precedent (unlike everything else in Phase 1), so there's no existing UI to reference. Needs a design pass before frontend implementation. `01-...md` §10.1.
7. **"Join Our Team" and "Submit Your Story" field lists diverge from their existing (previously unmodeled) mockup implementations** — `Contact.jsx`'s careers modal and `success/ShareStoryModal.jsx` each collect a different field set than what's now specified (see `07-...md` §4.4 for the exact diff). Schema currently implements the newly given field lists exactly; whether to reconcile fields back in (specialization/job-type on the team form; title/photo/video on the story form) is a content/product decision, not yet made. `01-...md` §10.2, §10.3.

---

## 7. Working conventions for whoever (human or AI) picks this up next

- **Keep `01`, `05`, `06`, `07` in sync whenever the schema changes.** This project's whole working method has been: change the diagram, update the rationale with a provenance tag, update `01`'s scope record if the change affects what's in/out of scope, then copy every touched file into both `cpf-app/production_blueprints/` and the standalone blueprint package (see below) so neither location silently drifts from the other.
- **Don't silently resolve an open decision from §6.** Flag it, document the tradeoff, and let the tradeoff stand until someone with authority over it actually decides.
- **When asked to add something with no mock or scope-document precedent, tag it 🟣 and say so plainly** (§4.6) — don't present a brand-new instruction as if it were derived from existing project history.
- **This blueprint set exists in two places and must stay identical:** the working mockup repo (`cpf-app/production_blueprints/`) and a standalone handoff package (a sibling folder, `CPF-Production-Blueprint/`, meant to be dropped into the actual new repository). Every edit to a numbered document should be mirrored to both.
- **Treat `03-...md`'s inline data-model code sketch as historical** — `05`/`07` are what's authoritative now; `03` says so explicitly in its own text.
