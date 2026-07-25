# 02 — Frontend Architecture

> **Stack:** Next.js (App Router) · TanStack Query · Zustand · Tailwind CSS · Framer Motion
> **Read alongside:** `DESIGN.md` (visual system, colors, typography, motion rules) and `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` (what's actually being built).

This document defines *how* the frontend is organized and *why*, not what each page contains — page content is scope (`01-...md`), not architecture.

---

## 1. Why Next.js App Router (context for the team)

The mockup is a client-side-only Vite SPA with a hand-rolled `onNavigate(pageId, data)` router in `App.jsx`. That pattern does not survive into production for three concrete reasons relevant to this project specifically:

- **SEO and social sharing matter here.** News articles, program pages, and success stories need real URLs, server-rendered meta tags, and OG images — a national institution's press office will share direct links to these pages. A client-side-only router can't do this without a lot of bolted-on infrastructure Next.js gives for free.
- **First-load performance on low-end devices** (a hard constraint per `DESIGN.md`/`PRODUCT.md`) benefits directly from server rendering + streaming — less JS to parse and execute before the page is interactive on a budget Android phone.
- **Phase 2 needs auth-gated routes** (Dashboard, Admin). App Router's route groups and middleware give a clean, native way to protect `/dashboard` and `/admin` without frontend-only guards.

---

## 2. Folder structure

```
apps/web/                          # Next.js app (if monorepo) or repo root
├── app/                                    # App Router — routes only, minimal logic
│   ├── (public)/                           # Route group: public marketing/informative pages
│   │   ├── layout.jsx                      # Navbar + Footer + AccessibilityWidget + ChatWidget shell
│   │   ├── page.jsx                        # Home
│   │   ├── programs/
│   │   │   ├── page.jsx                    # بوابة الفرص — tab shell (Programs / Activities / Networks & Resources)
│   │   │   └── [programSlug]/
│   │   │       └── page.jsx                # Program detail — generateMetadata + generateStaticParams
│   │   ├── news/
│   │   │   ├── page.jsx
│   │   │   └── [articleSlug]/page.jsx
│   │   ├── success-stories/
│   │   │   ├── page.jsx
│   │   │   └── [storySlug]/page.jsx
│   │   ├── about/page.jsx
│   │   └── contact/page.jsx
│   │
│   ├── (auth)/                             # Route group: Phase 2 — login, register
│   │   └── login/page.jsx
│   │
│   ├── (protected)/                        # Route group: Phase 2 — middleware-gated
│   │   ├── dashboard/page.jsx
│   │   └── admin/
│   │       ├── layout.jsx                  # Separate shell, no public Navbar/Footer
│   │       └── ...
│   │
│   ├── api/                                # Next.js route handlers — ONLY for things that must run at the edge/BFF layer (see §3.4)
│   ├── globals.css                         # Tailwind entry + CPF-Font face + weighted-stroke rule (see DESIGN.md)
│   ├── layout.jsx                          # Root layout: <html dir="rtl" lang="ar">, font loading, providers
│   └── not-found.jsx
│
├── components/
│   ├── ui/                                 # Design-system primitives: Button, Chip, Card, Input, Dropdown, Modal
│   │                                       # (mirrors DESIGN.md's Components section 1:1 — one canonical Button, not five)
│   ├── layout/                             # Navbar, Footer, MobileNavBar, TopUtilityBar, AccessibilityWidget
│   ├── home/                               # Hero, RegistrationStrip/OpportunityStrip, AnimatedStatCounter, PathwayWizard
│   ├── programs/                           # Program list/filter, ProgramCard, tab shell
│   │   ├── detail/                         # ProgramHero, ProgramOverview, ProgramGallery, ProgramFaq, etc.
│   │   └── networks/                       # MakersMap only in Phase 1 (Directory/YouthNetworks folders exist, flagged deferred — see §7)
│   ├── news/
│   ├── success-stories/
│   └── shared/                             # Cross-cutting: AnimatedCounter primitive, SectionHeading, EmptyState
│
├── lib/
│   ├── api/                                # TanStack Query API client layer (see §3)
│   │   ├── client.js                       # Base fetch wrapper (baseURL, headers, error normalization)
│   │   ├── programs.js                     # getPrograms(), getProgramBySlug(), query key factories
│   │   ├── news.js
│   │   ├── activities.js                   # Phase 1: our own backend; Phase 2: same contract, backend swaps source to Impact System
│   │   └── ...
│   ├── constants/                          # Governorates list, program categories, nav links — anything DESIGN.md-adjacent but not styling
│   └── utils/                              # cn() classnames helper, formatDate, slugify, contrast-safe color helpers
│
├── hooks/                                  # useEscapeKey, useReducedMotionSafe, useMediaQuery, useClickOutside
│
├── store/                                  # Zustand stores (see §3.2) — client UI state only
│   ├── useUiStore.js                       # Mobile menu open/closed, search overlay open/closed, active modal
│   └── useFilterStore.js                   # E.g. Programs page filter state if it must persist across navigation
│
├── types/                                  # JSDoc typedefs or .d.ts if TS is adopted (recommended — see §6)
├── public/                                 # Static assets: logos, icon pack (from Comms), fonts
├── middleware.js                           # Phase 2: auth guard for (protected) route group
└── tests/
```

**Rule:** `app/` contains routing and data-fetching orchestration only — a page component composes `components/` pieces and passes them server-fetched or query-hook data. Business logic and markup-heavy JSX live in `components/`, never inline in `app/**/page.jsx` beyond composition.

---

## 3. State management: TanStack Query vs. Zustand

This is the single most important architectural rule to enforce in code review. **Server data and client UI state are never allowed to live in the same place.**

### 3.1 TanStack Query owns: anything that came from the network

Programs, news articles, success stories, activities, the About page's timeline/quote content, form submission mutations — **all of it** goes through TanStack Query. Rules:

- **One query-key factory per resource**, colocated with its fetch function in `lib/api/<resource>.js`:
  ```js
  // lib/api/programs.js
  export const programKeys = {
    all: ['programs'],
    list: (filters) => [...programKeys.all, 'list', filters],
    detail: (slug) => [...programKeys.all, 'detail', slug],
  };
  export async function getPrograms(filters) { /* fetch to our Django Ninja API */ }
  export async function getProgramBySlug(slug) { /* ... */ }
  ```
- **Custom hooks wrap the query**, components never call `useQuery` with an inline fetch function:
  ```js
  // hooks/usePrograms.js
  export function usePrograms(filters) {
    return useQuery({ queryKey: programKeys.list(filters), queryFn: () => getPrograms(filters) });
  }
  ```
- **Server Components fetch directly** (no TanStack Query needed) for the *initial* render of mostly-static content (a program detail page's core content, for example) — use `fetch()` with Next's caching (`revalidate`) directly in a Server Component. **Reach for TanStack Query specifically when a Client Component needs to re-fetch, paginate, filter, or mutate** (e.g., the Programs page's live search/filter UI, "load more" pagination in a directory, form submissions). Don't wrap every single data need in a client-side query hook by default — that defeats the SSR benefit that's a primary reason for choosing Next.js in the first place (see §1).
- **Hydration pattern for pages that need both:** fetch in the Server Component, pass as `initialData`/dehydrated state into a Client Component that then owns further interaction via TanStack Query. This is the standard Next.js + TanStack Query pairing — don't invent a bespoke alternative.
- **Mutations** (contact form, "انضم لشبكتنا" join-network form, Phase 2 registrations) always go through `useMutation`, with `onSuccess` invalidating the relevant query key — never manual `useState` + manual refetch plumbing.

### 3.2 Zustand owns: ephemeral client-only UI state

Anything that (a) never touches the network and (b) needs to be shared across components that aren't in a direct parent/child relationship:

- Mobile menu open/closed, search overlay open/closed, active modal/drawer.
- The `AlertSideTab` announcement drawer's open state.
- Cross-page filter state that must survive a route change *within the same session* (rare — most filter state should just be local `useState` or a URL search param, see below).
- Login/Phase-2 session-adjacent **UI** state only (e.g. "just logged in, show a toast") — the actual auth token/session lives in an httpOnly cookie set by the backend, **never in a Zustand store** (see `03-BACKEND_ARCHITECTURE_AND_SECURITY.md` §6 on JWT handling).

**Rule of thumb:** if a hard refresh losing the state would surprise the user, it probably belongs in a URL search param (e.g. `?category=تدريب&governorate=عمان` for a filtered directory — also better for shareable links and SEO) rather than Zustand. If it's genuinely transient (a drawer being open), Zustand or even local component state is correct. **Reach for local `useState` first, Zustand only when the state needs to cross a component boundary that props/context make awkward** — don't create a global store per feature by reflex.

### 3.3 What never happens
- No `useEffect` + manual `fetch` + manual `useState(loading/error/data)` triplication anywhere. That entire pattern is what TanStack Query replaces; if you catch yourself writing it, you've reached for the wrong tool.
- No server data cached inside a Zustand store "for convenience." Query cache and UI-state store are not interchangeable, even though both are technically "global state."

### 3.4 Next.js Route Handlers (`app/api/`)
Used sparingly, only for:
- A thin BFF (backend-for-frontend) proxy if a specific endpoint needs to attach a server-only secret or reshape a response before the browser sees it, and standing up a full Django endpoint for it isn't warranted.
- Webhooks or callbacks that must be handled at the edge.

**Default assumption: the Next.js app talks to the Django Ninja API directly** (client-side via TanStack Query, server-side via `fetch` in Server Components) using a public base URL. Don't build a shadow API layer in Next.js that just re-proxies Django 1:1 — that's needless indirection.

---

## 4. UI/UX best practices

### 4.1 Responsive design — mobile-first, always
- Author every component at the smallest breakpoint first, then layer up (`className="text-sm lg:text-base xl:text-lg"`, not the reverse). This matches the mockup's existing convention (`lg:`/`xl:`/`2xl:` scaling seen throughout `Navbar.jsx`, etc.) — keep it.
- **Test at real breakpoints, not just resizing a desktop browser**: 360px (budget Android), 390px (iPhone), 768px (tablet), 1024px+ (desktop). The client's primary audience skews toward budget mobile hardware — this is not a "nice to have" breakpoint, it's the primary target.
- Long Arabic headings must be checked at every breakpoint for overflow — see `DESIGN.md`'s ban on "text that overflows its container." Test with the *actual* longest expected heading string, not lorem ipsum.

### 4.2 Accessibility (WCAG AA)
- **Contrast:** every text/background pairing must hit ≥4.5:1 (body) or ≥3:1 (large/bold text ≥18px). This project has a documented recurring failure mode worth calling out explicitly to the new team: **Gold (`#C08F2D`) + white text is only ~2.9:1 contrast** — it fails AA. Any gold background must pair with Ink Black (`#1a0409`) text, never white. Run this check with a real contrast calculation (a lint rule or CI check against the Tailwind config's approved color pairs is worth building — see §6).
- **Focus rings on every interactive element** — `focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2` (or the design system's equivalent token) is the established convention; never rely on the browser default outline being "good enough," and never remove focus outlines without replacing them.
- **Keyboard navigation:** every custom dropdown, modal, and drawer must be fully operable via keyboard — `Escape` to close (a shared `useEscapeKey` hook, already proven in the mockup, should be a first-class hook here too), focus trapping inside modals, logical tab order.
- **Custom dropdowns over native `<select>` when you need visual control** — but native `<select>` is genuinely fine (and less work) when you don't need custom styling of the option list itself. The mockup hit a real bug building a custom governorate filter: a flex container without `items-center`/`items-start` let a shorter sibling's wrapper stretch to match a taller one, breaking an absolutely-centered chevron icon's alignment. **Lesson for this rebuild:** any flex row mixing elements of different natural heights needs an explicit `items-start` or `items-center` — never rely on the `stretch` default being harmless.
- **Reduced motion:** every Framer Motion animation needs a `prefers-reduced-motion` fallback (crossfade or instant). Use `useReducedMotion()` from `framer-motion` to conditionally simplify transforms, not just to disable animation entirely where a crossfade would serve better.

### 4.3 CSS / Tailwind organization
- Tailwind v4 config carries the DESIGN.md tokens as first-class theme values (colors, radii, shadows) — components reference `bg-brand-red`, not raw hex, once the token layer exists. (The mockup uses raw hex like `bg-[#8a1538]` everywhere; that's acceptable for a fast mockup, but the production Tailwind config should promote these to named theme colors so a future rebrand or dark-mode pass is a config change, not a find-and-replace across hundreds of files.)
- No inline `style={{}}` for anything expressible in Tailwind utilities — reserve inline styles strictly for genuinely dynamic values (e.g., a computed `transform: translateX()` driven by a live map coordinate).
- Component-level class strings that grow unwieldy (long conditional ternary chains for state-based styling) should extract to a small `cva` (class-variance-authority) variant map rather than a wall of inline ternaries — this scales much better once there are 5+ visual states on a component (default/hover/active/disabled/error).

### 4.4 Component library discipline
- **One canonical primitive per pattern.** The mockup, having been built feature-by-feature over many sessions, accumulated some duplication (e.g., the custom dropdown pattern was hand-rolled independently in `Contact.jsx` and later in `MakersMap.jsx`). In the rebuild, extract this once into `components/ui/Dropdown.jsx` and reuse it everywhere. Before building any new interactive primitive, check `components/ui/` first.
- **Category-reflex check before shipping any new section:** does this look like it could belong to any generic institutional site, or does it specifically read as CPF? Re-read `DESIGN.md`'s "Do's and Don'ts" before merging new page sections — no gradient text, no side-stripe borders, no uppercase tracked eyebrows, no icon-in-a-circle card grid monoculture, no generic hero-metric template.

---

## 5. Animation guidelines (Framer Motion)

Performance is a stated design principle, not a nice-to-have (`DESIGN.md` §1, `PRODUCT.md` Design Principles) — this section is binding, not advisory.

### 5.1 Hardware-safe properties only
- Animate **only** `transform` and `opacity`. Treat an animated `box-shadow`, `width`/`height`, `top`/`left`, or `filter: blur()` as a bug to fix, not a style choice — these force layout/paint on every frame and will visibly stutter on the low-end devices this audience actually uses.
- `backdrop-filter` (glassmorphism) is allowed only sparingly and never as a default treatment, and never combined with a scroll-driven or continuous animation — it's one of the most expensive CSS properties to composite.

### 5.2 Mount vs. scroll-triggered reveals — a documented failure mode
The mockup hit the same bug three separate times across different pages: using `whileInView` + `viewport={{ once: true }}` for entrance animations gates the content behind an `IntersectionObserver` that **never fires** for content that's off-screen or below-the-fold during automated rendering, server-side rendering environments, or certain testing/crawling contexts — leaving the element permanently at `opacity: 0`.

**Rule:** for any content whose visibility is not optional (i.e., it must reliably render — which is almost everything on this site), use **mount-triggered `animate`**, not `whileInView`:
```jsx
// Correct — fires on mount, no observer dependency
<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} />
```
Reserve actual `whileInView` **only** for genuinely decorative, non-critical embellishments where a missed animation has zero content impact (rare on this site). When in doubt, use `animate`.

### 5.3 Easing and timing
- Ease out with exponential/quart curves (`ease: [0.16, 1, 0.3, 1]`-style expo-out, or Tailwind/Framer's built-in `easeOut`) — no bounce, no elastic, matching the "Soft-Lifted Luxury" register (see `DESIGN.md`).
- Stagger children within one list deliberately (index-based `delay`) — this is legitimate and already established in the mockup (e.g., program cards staggering in). The anti-pattern is applying the *identical* entrance treatment uniformly to every single section on a page regardless of what that section is — vary the reveal to fit what's being revealed.
- Drawers/modals: asymmetric open/close timing is an established, deliberate brand behavior (see `DESIGN.md`'s Announcements Side-Tab spec — opens slower at 0.36s, closes faster at 0.24s so closing never reads as sluggish). Carry this asymmetry principle into any new drawer/modal component.

### 5.4 `useInView` / lazy-mounting for expensive content
For genuinely expensive components below the fold (e.g., an embedded map, a video), it's correct to *lazy-mount* the underlying expensive DOM/iframe using `useInView` (from `framer-motion` or `react-intersection-observer`) purely as a **performance** gate — this is different from gating *visual opacity* on scroll (§5.2). Mount the heavy element when it scrolls near view; animate its *entrance* with `animate`, not `whileInView`, once mounted.

### 5.5 Reduced motion is mandatory, not optional
Every custom animation variant should have a paired reduced-motion variant (typically: skip the `y`/`scale` transform, keep only the opacity crossfade, and shorten duration). Centralize this as a hook (`useReducedMotionSafe()`) that returns pre-simplified transition/variant objects, so individual components don't each hand-roll their own `prefers-reduced-motion` branch.

---

## 6. Recommended additions beyond the mockup's stack

- **TypeScript** is strongly recommended for the rebuild even though the mockup is plain JS — a project of this scope, with a backend contract to keep in sync (Django Ninja can auto-generate an OpenAPI schema), benefits significantly from typed API responses (e.g., via `openapi-typescript` codegen from the Django Ninja schema) to catch integration drift at compile time rather than in production.
- **A contrast-lint CI check** — given the gold/white contrast bug recurred multiple times in the mockup, a small script (or a Stylelint/ESLint plugin) that flags known-bad Tailwind color-pair combinations in a pre-commit hook or CI step would have caught this earlier and cheaper than manual QA.
- **Storybook** (or equivalent) for the `components/ui/` primitives — useful both for the human dev team and for future AI agents to discover "does a Dropdown/Button/Modal primitive already exist" before building a new one.

---

## 7. Handling of deferred features in code (Phase 1 discipline)

Per `01-PROJECT_VISION_AND_PHASE1_SCOPE.md` §4, several features (Entities Directory, Youth Networks, Partnerships, Publications) are fully designed but explicitly excluded from Phase 1. Guidance for the frontend team:

- **Do not build dormant/hidden routes or nav entries** for deferred pages — an unlinked, unroutable page in Next.js is dead code, not a feature toggle.
- It is acceptable (and encouraged, to save Phase 2 rework) to build the **`components/ui/` primitives** these features will eventually reuse (business-card grid layout, editorial alternating image/text block, custom dropdown) as generic, reusable components even in Phase 1 — just don't wire them into a live route yet.
- If a feature flag system is desired to make Phase 2 activation trivial, a simple environment-variable-driven flag (`NEXT_PUBLIC_FEATURE_YOUTH_NETWORKS=false`) checked at the routing/nav level is sufficient — don't over-engineer a full feature-flagging service for this.
