# Project Status
## Passio *(working name — final name TBD)*

<!-- DASHBOARD_META
name: Passio
slug: passio
status: Active
phase: Phase 1
started: 2026-05-16
last_updated: 2026-05-17
summary: Creator brand discovery platform — curated directory of Indian creator-owned physical brands
current_focus: Brand name decision — everything else is live
-->

---

## Current Phase
**Phase 1** — Build ✅ Complete

## Status
`Active — Live at https://passio-chi.vercel.app`

---

## Current Focus
Brand name decision. Everything else is built and deployed.

---

## Live URLs
- **Production:** https://passio-chi.vercel.app
- **Admin:** https://passio-chi.vercel.app/admin (password: `passio-admin-2026`)
- **Supabase project:** apkkkcmleitkoawijgmq
- **GitHub:** https://github.com/mavinash-dev/passio

---

## Development Log

### 2026-05-16 — Session 1
- Identified core idea: discovery platform for creator-owned brands
- Initial PRD, ARCH, DESIGN, STATUS, CLAUDE.md written (v0.1)

### 2026-05-16 — Session 2
- Brutal market analysis — identified 10 critical flaws in v0.1 assumptions
- New model: Passio as media brand + curated directory (Product Hunt model)
- PRD rewritten to v0.2, ARCH and DESIGN written

### 2026-05-17 — Session 3
**Done:**
- [x] Scaffolded Next.js 15 app (App Router, Tailwind, TypeScript)
- [x] Supabase set up — schema, storage buckets, RLS
- [x] All Phase 1 routes built:
  - Home feed with featured scroll + mixed grid
  - Creator profile pages (`/[handle]`)
  - Product cards → direct buy, no intermediate page
  - Redirect tracker (`/go/[id]`) — logs every click
  - Admin tool (`/admin`) — full CRUD
- [x] Dark UI — responsive, 2→5 col grid, Playfair Display serif
- [x] 50 Indian creator brands seeded across 5 niches
- [x] 150 products with Indian imagery (Wikimedia Commons)
- [x] Supabase JWT keys rotated — old exposed keys revoked
- [x] Deployed to Vercel — https://passio-chi.vercel.app
- [x] Auto-deploy on every git push to main

---

## Pending Tasks

### Before Going Public
- [ ] **Finalise brand name** — Raunaq? Crayvo? Flayr? Passio?
- [ ] Register domain (.in preferred)
- [ ] Point custom domain to Vercel
- [ ] Run SQL: `ALTER TABLE products ALTER COLUMN buy_link DROP NOT NULL;`
- [ ] Start Passio Instagram account

### Phase 2 — After Phase 1 Proven
- [ ] Claim flow — creator verifies Instagram, takes ownership
- [ ] Full creator dashboard with analytics
- [ ] Self-serve listing + onboarding
- [ ] Search
- [ ] Buyer accounts + saved brands

---

## Tech Stack (Live)
| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 + Playfair Display |
| Database | PostgreSQL via Supabase |
| Storage | Supabase Storage (creator-photos, product-photos) |
| Auth | None Phase 1 — admin via ADMIN_SECRET cookie |
| Hosting | Vercel (passio-dev/passio) |
| Keys | sb_publishable_* / sb_secret_* (new ECC format) |

---

## Key Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-16 | Curated listing model (not self-serve) | Cold-start problem |
| 2026-05-16 | Passio Instagram as Day 1 traffic engine | SEO takes 12–18 months |
| 2026-05-16 | Redirect tracker in Phase 1 | Only way to prove ROI to creators |
| 2026-05-16 | No claim flow in Phase 1 | Requires auth — Phase 2 |
| 2026-05-17 | No product detail page | Direct buy on tap — Myntra-style |
| 2026-05-17 | Dark UI | Consumer-grade feel, images pop |
| 2026-05-17 | New Supabase key format (sb_*) | Old JWT keys were exposed in GitHub |

---

## Blockers
- Brand name not finalised — blocks domain and public-facing launch

---

## Time Tracker

| Date | Session | Hours | Cumulative |
|---|---|---|---|
| 2026-05-16 | Brainstorm + Project Setup | 1h | 1h |
| 2026-05-16 | Market analysis + PRD revision | 1h | 2h |
| 2026-05-17 | Full Phase 1 build + deploy | 6h | 8h |
