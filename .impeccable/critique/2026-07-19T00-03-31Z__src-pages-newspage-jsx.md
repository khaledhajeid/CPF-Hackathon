---
target: News page (src/pages/NewsPage.jsx)
total_score: 20
p0_count: 1
p1_count: 1
timestamp: 2026-07-19T00-03-31Z
slug: src-pages-newspage-jsx
---
## Design Health Score (News page)
Total: 20/40 — Acceptable band, barely (one bug from Poor).

| # | Heuristic | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Visibility of System Status | 1 | Silent blank white screen on the gallery crash |
| 2 | Match System / Real World | 3 | Natural Arabic phrasing, no jargon |
| 3 | User Control and Freedom | 2 | No Escape-key handler on news modal or lightbox |
| 4 | Consistency and Standards | 3 | Internally consistent editorial card language |
| 5 | Error Prevention | 0 | Zero guard around confirmed data-shape mismatch that crashes the page |
| 6 | Recognition Rather Than Recall | 3 | Labeled search/year filters |
| 7 | Flexibility and Efficiency | 2 | News/gallery cards unreachable by keyboard |
| 8 | Aesthetic and Minimalist Design | 3 | Cleaner than About, asymmetric featured-card grid |
| 9 | Error Recovery | 0 | Gallery crash has no message, no boundary, no recovery path |
| 10 | Help and Documentation | 3 | n/a |

## Anti-Patterns Verdict
Structurally cleaner than About (no gradient text, no icon-circle grids) but has a content-authenticity problem: "عدسة الميدان" gallery is generic Unsplash stock mislabeled as real CPF events. Detector overlay's raw counts (87 "anti-patterns") were mostly false positives from structural blind spots (sibling-overlay contrast checks, standard overflow-hidden image cards) — see main report for full reasoning.

## Priority Issues
- [P0] Gallery crash: `VisualPulse.jsx`'s local 10-item `demoImages` array reports indexes 0-9, but `NewsPage.jsx`'s lightbox reads from the imported `pulseImages` array in `newsData.js` which only has 6 items — indexes 6-9 throw `TypeError` with no error boundary, white-screening the app. Confirmed live with stack trace. Fix: make VisualPulse consume the real `pulseImages` data; add an error boundary.
- [P1] No Escape-key handler on news modal or image lightbox.
- [P2] News/gallery cards keyboard-unreachable — no tabIndex/role/keydown.
- [P2] Gallery images are generic stock mislabeled as real CPF field events — replace with real event photography (About's timeline proves the asset exists).
- [P3] Heading hierarchy skip: h2 "عدسة الميدان" directly followed by h4 with no h3.
- [P3] Hero video caption collides with baked-in video text on the HTU hackathon slide.
- [P3] Year filter offers 8 options, 4 always dead ends (no data exists for 2020-2023) — derive from actual data.

## Persona Red Flags
- Jordan: first natural exploratory click (gallery) has ~40% chance of white-screening the app.
- Riley: clicking gallery thumbnails systematically reproduces the crash within the first few clicks; Escape does nothing on the news modal.
- Casey: same gallery crash risk; low-patience user won't return after an unexplained blank screen.

## Minor Observations
- Search input has no associated label (placeholder-as-label).
- text-justify on Arabic body copy with no paired hyphens-auto.

## Questions to Consider
- A single data-shape mismatch can white-screen the entire page with no error boundary — what's the QA practice before these pages ship? Should there be a baseline smoke test clicking every interactive element pre-merge?
