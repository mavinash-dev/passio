# Project Status
## Passio *(working name — final name TBD)*

<!-- DASHBOARD_META
name: Passio
slug: passio
status: Active
phase: Phase 1
started: 2026-05-16
last_updated: 2026-05-16
summary: Creator brand discovery platform — curated directory of Indian creator-owned physical brands
current_focus: Finalising PRD v0.2 before any build work begins
-->

---

## Current Phase
**Phase 1** — Define (PRD) → then Build

## Status
`Active — PRD signed off, ARCH + DESIGN written, ready to build`

---

## Current Focus
PRD v0.2 signed off. ARCH.md and DESIGN.md written. Ready to scaffold the Next.js project.

---

## Development Log

### 2026-05-16 — Session 1
**Done:**
- [x] Identified core idea: discovery platform for creator-owned brands
- [x] Initial PRD, ARCH, DESIGN, STATUS, CLAUDE.md written (v0.1)

### 2026-05-16 — Session 2
**Done:**
- [x] Brutal market analysis — identified 10 critical flaws in v0.1 assumptions
- [x] Key insight: "creator puts Passio in bio" assumption is broken — creators won't do this
- [x] Key insight: SEO is a 12–18 month channel, not a launch strategy
- [x] Key insight: self-serve listing = cold-start chicken-and-egg problem
- [x] New model: Passio as media brand + curated directory (Product Hunt model)
- [x] New growth engine: Passio's own Instagram, not creator sharing their bio link
- [x] New long-term arc: Discovery → Storefront → Payments → Creator Brand OS (Beacons.ai for India, physical products)
- [x] Redirect tracking identified as core Phase 1 infrastructure (not Phase 2)
- [x] PRD rewritten to v0.2
- [x] ARCH, DESIGN cleared — pending PRD sign-off
- [x] CLAUDE.md updated

**Decisions Made This Session:**
- Phase 1 MVP = curated listings (50 manually) + redirect tracker + claim flow
- No self-serve creator onboarding in Phase 1
- No discovery algorithm in Phase 1 — manual curation
- Passio's Instagram is the Day 1 traffic engine
- Long-term: add storefront → payments → become creator brand OS

**Name shortlist:** Raunaq, Crayvo, Flayr — decision still pending

**Time:** 2h cumulative

---

## Pending Tasks

### Before Building Anything
- [x] Finalise PRD v0.2 — signed off 2026-05-16
- [x] Write ARCH.md — done 2026-05-16
- [x] Write DESIGN.md — done 2026-05-16
- [ ] Finalise brand name
- [ ] Register domain

### Phase 1 — Build
- [ ] Scaffold Next.js project
- [ ] Creator profile page (`/[handle]`) — SEO indexed
- [ ] Product pages (`/[handle]/[product-slug]`) — SEO indexed
- [ ] Redirect tracker (`/go/[product-id]`) — logs every click
- [ ] Admin listing tool (`/admin`) — for Avinash to add/edit creator brands
- [ ] Home / discovery feed (manually curated sections)
- [ ] Deploy to Vercel
- [ ] Start Passio Instagram account

### Phase 2 — After Phase 1 Proven
- [ ] Claim flow — creator verifies Instagram, takes ownership of listing (requires Clerk auth)
- [ ] Full creator dashboard with analytics
- [ ] Self-serve listing + onboarding
- [ ] Search
- [ ] Buyer accounts + saved brands

---

## Blockers
- Brand name not finalised — blocks domain and public-facing work

---

## Time Tracker

| Date | Session | Hours | Cumulative |
|---|---|---|---|
| 2026-05-16 | Brainstorm + Project Setup | 1h | 1h |
| 2026-05-16 | Market analysis + PRD revision | 1h | 2h |

---

## Key Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-16 | Curated listing model (not self-serve) | Cold-start problem — empty marketplace gets no traffic |
| 2026-05-16 | Passio Instagram as Day 1 traffic engine | SEO takes 12–18 months; creator bio link is not reliable |
| 2026-05-16 | Redirect tracker in Phase 1 | Only way to prove ROI to creators — without this, they have no reason to claim/engage |
| 2026-05-16 | "Claim your listing" not "sign up" | Creators engage after seeing results, not before |
| 2026-05-16 | Long-term: add storefront + payments | Every successful creator platform is in the money flow — Beacons, Nykaa, LTK |
| 2026-05-16 | Creator-OWNED physical brands only | Differentiates from LTK (affiliate), Meesho (resellers), Beacons (digital) |
