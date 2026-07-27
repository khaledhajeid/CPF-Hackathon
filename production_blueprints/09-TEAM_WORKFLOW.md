# 09 — Team Workflow: API-Contract-First Development

> This document is identical in both `cpf-backend/production_blueprints/` and `cpf-frontend/production_blueprints/` — it's the shared source both repos' sessions read, not a prompt someone has to remember to repeat. If you're updating it, update it in both places (or in the shared `CPF-Production-Blueprint/` copy and re-sync, same discipline as every other document in this set).

---

## 1. The constraint that decides this

The team is two backend developers and one frontend developer, working across two separate repos (`cpf-backend`, `cpf-frontend` — the two-repo split, see each repo's README), primarily **from home**, unable to push to GitLab until physically at the company. The timeline is short.

This constraint, not a general preference, is what settles the question below: during WFH stretches, there is no reliable way for the frontend developer to reach a backend developer's locally-running Django server (different machines, no shared network, nothing pushed to pull), and no reliable way for either backend developer to know what shape the frontend actually needs beyond what's written down somewhere both sides can see without git. **Any workflow that assumes live, continuous connectivity between the two sides breaks under this constraint** — it's not that contract-first is always the right call, it's that it's the only one that survives this specific setup.

## 2. Decision: contract-first, mocked frontend, connect later

- The **API contract** (Django Ninja's auto-generated OpenAPI schema, matching the shapes already fixed in `05-DATA_MODEL_ERD.md`/`06-DATA_MODEL_UML.md`/`07-DATA_MODEL_ERD_RATIONALE.md`) is the one artifact that has to cross the backend/frontend boundary before an office day — and it's small, static, and needs no git push to share.
- The **frontend builds entirely against mocked data** shaped exactly like that contract, with zero dependency on a running backend, for the whole of Step 4 (`08-TODO_PHASE1.md`).
- The **backend builds against the same contract** it exports, independent of whatever the frontend is doing with it.
- Connecting the two for real happens once actual sync is possible (an office day, or a reachable shared/staging environment later) — and should be a small, mechanical swap, not an integration scramble, if both sides actually held to the contract.

## 3. The mechanism, concretely

1. **Backend defines the Ninja Pydantic schemas first**, even before every endpoint's business logic is fully implemented (`03-BACKEND_ARCHITECTURE_AND_SECURITY.md` §3). A stub endpoint that returns fixture/seed data through the *real* response schema is enough to generate a correct contract — the schema is what matters here, not whether the query behind it is finished.
2. **Export a static OpenAPI snapshot** (Django Ninja serves this live at `/api/v1/openapi.json`; save a copy — e.g. `docs/openapi.snapshot.json` in `cpf-backend`, committed locally even if not pushed yet) whenever a schema shape changes.
3. **Share just that one file** across the WFH gap — chat, shared drive, email, whatever the team already has. It doesn't need GitLab; it's a few KB of JSON, not a git sync problem.
4. **Frontend codegens types from the snapshot** (`openapi-typescript` or equivalent) and builds the `lib/api/` layer (`02-FRONTEND_ARCHITECTURE.md` §3: one file per resource, query-key factory + fetch function, wrapped in a TanStack Query hook) against those types — with the fetch function initially returning **fixture data shaped like the real schema** (a plain object, or Mock Service Worker if the team wants request-level mocking) instead of an actual `fetch()` call.
5. **Every page/component in Step 4 gets built and demoed against the mocked layer.** This is real, working frontend development, not a placeholder — it just doesn't require the backend to be running.
6. **Connecting for real**, once possible: swap only the body of each fetch function in `lib/api/*.ts` from "return fixture" to "actually call `NEXT_PUBLIC_API_BASE_URL`." The TanStack Query hooks and every component above them shouldn't need to change at all, if the contract was followed — that's the entire point of building the seam this way.

## 4. What this means for daily work

- **Backend team:** build against the schema already fixed in `05`/`06`/`07` — that work is `08-TODO_PHASE1.md` Steps 2–3. Don't wait for full business logic before a schema is usable; re-export and re-share the OpenAPI snapshot whenever a shape changes, not just at the end.
- **Frontend team:** default assumption during WFH stretches is **never call a live backend**. Build Step 4 entirely against fixtures/mocks matching the latest shared OpenAPI snapshot.
- **Both:** `05-DATA_MODEL_ERD.md` is the schema neither side improvises around. If a real need to deviate from it comes up mid-build, that's a conversation to have explicitly and record (same provenance-tagging discipline as `07-DATA_MODEL_ERD_RATIONALE.md`), not a silent local decision made on one side that the other discovers on connection day.

## 5. Why not connect from the start

Connecting early is the right instinct in a normal office setup — it surfaces integration bugs sooner. It doesn't survive this team's specific constraint: there's no shared network between two homes, no git push to sync a "live" version of the API, and no way for either side to know if the other's local server is even the current version of anything. A written, exported contract is the one thing that sidesteps all three problems at once. Given the short timeline, the honest tradeoff is: contract-first costs a little upfront (schemas have to be written before every query is finished), and saves a much larger cost later (two people quietly building against incompatible assumptions that only surface days before a deadline, on the one day connectivity is even possible).

## 6. For whoever (human or AI) is in the other repo's conversation

If you're reading this from `cpf-backend`: the frontend is building against a mocked version of whatever schema you export — keep the OpenAPI snapshot current and shared, and don't assume the frontend can see your running server.

If you're reading this from `cpf-frontend`: build Step 4 fully against fixtures matching the latest shared OpenAPI snapshot — don't assume `cpf-backend`'s server is reachable, and don't block UI work on it being so.

## 7. GitLab is the real destination — this local repo is scratch content for it

**The org already created two real repos on GitLab** — `cpf-backend` and `cpf-frontend`. GitLab is only reachable from the company's local network, so the team works from home most days and can only clone/push on office days. The folders on this machine named `cpf-backend`/`cpf-frontend` are **not those GitLab repos** — they're local-only scratch copies built before any GitLab access happened, used to work out the architecture and get a real head start on Step 1/2 content. They have no `git remote` configured at all.

**The plan, not a question to re-litigate each time:**
1. On the next office day, clone the real (almost certainly empty) GitLab repos to fresh local paths.
2. Copy everything from the local scratch `cpf-backend`/`cpf-frontend` (everything except the `.git/` folder itself) into the corresponding freshly-cloned GitLab repo folder.
3. Commit and push. This is the first real commit either GitLab repo has ever seen — treat it as such (check `git status` before committing, make sure `.env` never gets added, confirm `.gitignore` came across correctly).
4. If a GitLab repo turns out **not** to be empty (the org may have pre-seeded a README, a `.gitlab-ci.yml` template, branch protection config, issue templates) — **merge carefully, don't overwrite blindly.** Read whatever's already there first; it may encode a convention (CI runner tags, required merge-request template, protected branch rules) that this project doesn't know about yet and shouldn't clobber.

## 8. Staging and tests are a day-one concern, not a later pass

The team's GitLab setup includes a staging phase — meaning CI will run tests before anything reaches staging. **Tests get written alongside each piece of implementation, from the first commit, not bolted on at the end:**

- **Backend:** one test module per Django app (`apps/<name>/tests.py` or a `tests/` package), written as each app's models/endpoints are built — not held until Step 2/3 are "finished." At minimum: model-level tests for anything with custom logic, and endpoint-level tests for every write endpoint (the four submission tables are the highest-value target — validation, rate limiting, and PII-handling behavior are exactly what a reviewer or a staging failure would catch late otherwise).
- **Frontend:** component/page tests alongside each piece of Step 4 UI work (Vitest + React Testing Library is the lightweight default; reserve Playwright for the handful of genuinely critical flows — the contact/network-join/team-join/story-submission forms, since those are the write-path UI). Don't wait for the whole page to be "done" before any test exists for it.
- **Both:** a minimal `.gitlab-ci.yml` (lint + test, nothing fancier yet) should exist from the first push, not get added once something breaks in staging. Treat "no CI config" as an incomplete Step 1, the same way "no tests" is an incomplete Step 2/3/4 — both are foundation, not polish.
