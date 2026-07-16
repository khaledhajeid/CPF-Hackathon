# Product

## Register

brand

## Platform

web

## Users

Primary: Jordanian youth — students and young adults browsing the Foundation's programs (HFP, 42 Amman/Irbid, Nahnu volunteering, TechWorks, Khutwa Al-Hussein, and others) and deciding whether to apply. They arrive unsure which path fits them and need to be guided toward the right program quickly.

Secondary: donors, partners, and government stakeholders evaluating the Foundation's credibility, national reach, and impact before engaging or partnering.

## Product Purpose

The site is the national front door for the Crown Prince Foundation's youth programs. It exists to convert curious youth into applicants — through direct program pages and the Pathway Wizard — while simultaneously building institutional trust with donors and government stakeholders through visible impact (reach numbers, program count, success stories, partnerships). Success is dual: registrations for the right program, and visitors coming away convinced of the Foundation's credibility and impact.

## Positioning

The single national gateway connecting Jordanian youth to every opportunity under one royal-backed foundation.

## Conversion & proof

- Primary CTA: register or apply to a program. Secondary CTA: explore the Pathway Wizard for guided discovery when a visitor isn't ready to commit yet.
- The line a visitor remembers after 10 seconds: "One foundation, every opportunity, one gateway."
- Belief ladder: (1) this is the official, trusted national channel — royal-backed and credible; (2) there is a specific program here that fits my ambition; (3) finding it is guided and easy, not a maze of options; (4) applying is the natural next step.
- Proof on hand: none supplied yet. Impact stats (2.2M beneficiaries, 14+ programs, 26+ locations, 12 governorates) and success stories already live in the codebase; testimonials, press, or partner logos can be added later, referenced by path.

## Brand Personality

A blend that has to hold together, not compete: institutional prestige (royal-backed, national, aspirational) carried in the same voice as youthful warmth (encouraging, empowering, speaks directly to ambition), grounded by modern, results-driven confidence (data and impact over decoration). Formal enough to be trusted by government and donors, warm enough that a 19-year-old doesn't feel lectured at.

## Anti-references

No specific bad-example sites named. The standing instruction is to keep the established burgundy (#8a1538) + gold (#C08F2D) luxury-institutional direction already in the codebase, rather than drifting toward a generic SaaS/startup look (flat corporate blues, cliché hero-metric templates, gradient text, tiny uppercase eyebrows, icon-in-a-circle card grids).

## Design Principles

- **Institutional luxury, not startup gloss.** Burgundy and gold, generous whitespace, typography-first hierarchy. Reach for full borders, background tints, or nothing before ever reaching for a side-stripe border or gradient text.
- **Guided discovery over generic navigation.** Every page gives the visitor a clear next step toward the Pathway Wizard or a program's registration — the site should feel like it's steering, not just listing.
- **Performance is part of the luxury.** Every animation runs smooth on low-end mobile and older desktop hardware: hardware-accelerated `transform`/`opacity` only, no heavy `backdrop-filter`/`box-shadow` animation, clean DOM. A premium feel that stutters isn't premium.
- **Credibility through numbers and stories.** Stats, success stories, and partnerships carry the trust-building half of the purpose — conversion and credibility are designed for side by side, not sequentially.
- **RTL-first, Arabic-native.** Every layout decision — icon placement, flex/grid child order, visual alignment — is validated in RTL directly, never adapted from an LTR default after the fact.

## Accessibility & Inclusion

WCAG AA baseline. Respect `prefers-reduced-motion` on every animation. The existing `AccessibilityWidget.jsx` is the primary lever for user-facing accommodations — build around it rather than duplicating its role.

Hard performance constraint tied to accessibility: the UI must stay lightweight and responsive on low-end mobile devices and older desktop computers, not just flagship hardware. Avoid expensive CSS (heavy `backdrop-blur`, animated `box-shadow`/layout properties); animate only compositor-friendly properties.
