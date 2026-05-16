# Project Status
## Passio *(working name — final name TBD)*

<!-- DASHBOARD_META
name: Passio
slug: passio
status: Active
phase: Phase 1
started: 2026-05-16
last_updated: 2026-05-16
summary: Creator brand discovery platform — where passion-built products find their buyers
current_focus: Defining product scope and finalising brand name before building
-->

---

## Current Phase
**Phase 1** — Brainstorm → Define → Build

## Status
`Active`

---

## Current Focus
Finalise brand name. Then build: creator listing, public profile pages, and discovery feed.

---

## Development Log

### 2026-05-16 — Session 1
**Done:**
- [x] Identified core idea: discovery platform for creator-owned brands
- [x] Validated gap: LTK (US) exists, nothing equivalent in India for creator-OWNED brands
- [x] Defined positioning: Nykaa but cross-category, for creator brands, not just established labels
- [x] Decided: no payments, no logistics, no shipping — pure visibility/discovery play
- [x] Defined two-sided market: creators list → buyers discover
- [x] Created full project foundation (PRD, ARCH, DESIGN, STATUS, CLAUDE.md)

**Decisions:**
- No payments/checkout — we are a discovery layer, not a store
- Buyers don't need accounts — zero friction browsing
- SEO is the primary growth engine — every page must be indexed
- Self-reported creator stats (no Instagram API needed for Phase 1)
- Working name: "passio" — final name TBD

**Name shortlist:** Raunaq, Yakeen, Zarb, Crayvo, Umang, Flayr — decision pending

**Time:** 1h

---

## Pending Tasks

### Before Building
- [ ] Finalise brand name — est: this session
- [ ] Register domain (.in preferred)

### Phase 1 — Core Build
- [ ] Scaffold Next.js project (same stack as creator-pulse)
- [ ] Creator onboarding flow (sign up → list brand → list products)
- [ ] Public creator profile page (`/[handle]`)
- [ ] Individual product page (`/p/[slug]`)
- [ ] Home / discovery feed with category browsing
- [ ] Search (Postgres full-text)
- [ ] Creator dashboard (manage listings)
- [ ] Deploy to Vercel

### Phase 2
- [ ] Page view + click-through analytics for creators
- [ ] Affiliate/commission tracking
- [ ] Ratings and reviews
- [ ] Verified creator badge program
- [ ] Promoted/featured listings (monetisation)

### Phase 3
- [ ] Mobile app
- [ ] Brand/advertiser side
- [ ] Regional language support

---

## Blockers
- Brand name not finalised — blocks domain registration and any public-facing work

---

## Time Tracker

| Date | Session | Hours | Cumulative |
|---|---|---|---|
| 2026-05-16 | Brainstorm + Project Setup | 1h | 1h |

---

## Key Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-16 | No payments or logistics | Pure discovery play — removes all ops complexity |
| 2026-05-16 | Buyers browse without accounts | Friction kills discovery |
| 2026-05-16 | SEO-first architecture | Every creator page indexed = free organic growth |
| 2026-05-16 | Self-reported creator stats | No Instagram API complexity for Phase 1 |
| 2026-05-16 | Creator-OWNED brands only | Differentiates from LTK (affiliate) and Meesho (resellers) |
