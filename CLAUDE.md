# Passio — Project Brief for Claude

> Read this first. Every session. This is your full context.

---

## What This Project Is

**One-liner:** A curated discovery platform for Indian creator-owned physical brands — that grows into the operating system for creator brands in India.

**The real problem:** Indian creators sell physical products (skincare, food, fashion, fitness) but their reach is permanently capped at their existing followers. WhatsApp ordering and a bio link is their entire commerce infrastructure.

**Phase 1 solution:** Passio manually curates and lists creator brands. We build their profile and product pages. We drive traffic through Passio's own Instagram. Creators discover their listing, see real click data, and claim it. No cold sign-up form.

**Long-term trajectory (Beacons.ai model for India, physical products):**
1. Discovery directory (now)
2. Creator storefront — their store lives ON Passio
3. Payments — Passio processes the transaction (UPI, COD, card)
4. Creator brand OS — analytics, inventory, brand deals

**Name:** "Passio" is a working slug. Final brand TBD — shortlist: Raunaq, Crayvo, Flayr.

---

## What We Learned (Don't Repeat These Mistakes)

- **Creators will NOT put Passio in their bio** — it sends their followers to competitor brands. Do not build assuming this.
- **SEO is 12–18 months out** — not a launch strategy. Passio's own Instagram is the Day 1 traffic engine.
- **Self-serve listing = cold start death** — empty marketplace, no traffic, no creator engagement. Curated model first.
- **No redirect tracking = no proof of value** — creators need to see clicks before they engage. Tracker is Phase 1, not Phase 2.

---

## Target Users

- **Creators (supply):** Indian micro to mid-tier creators (10K–500K followers) who OWN a physical product brand. Not affiliates, not resellers.
- **Buyers (demand):** 18–35 Indian consumers open to discovering and buying from creator-owned brands.
- **Not targeting:** Celebrity brands, drop-shippers, resellers, digital-only creators, international creators.

---

## Current Phase & Status

**Phase:** Phase 1 — Build
**Status:** Active
**Last worked on:** 2026-05-16

**What's done:**
- [x] PRD v0.2 signed off
- [x] ARCH.md written
- [x] DESIGN.md written

**What's next:**
- [ ] Finalise brand name + domain
- [ ] Scaffold Next.js project

---

## Phase 1 MVP — Strict Scope

1. **Creator profile page** (`/[handle]`) — Passio builds this, not the creator
2. **Product pages** (`/[handle]/[product-slug]`) — individual, SEO indexed
3. **Redirect tracker** (`/go/[product-id]`) — every "where to buy" click logged
4. **Home / discovery feed** — manually curated, editorial, no algorithm
5. **Internal listing tool** (`/admin`) — for Avinash to add/edit creator brands manually

**NOT in Phase 1:**
- Claim flow / creator login — Phase 2 (requires auth)
- Self-serve creator sign-up — Phase 2
- Creator analytics dashboard — Phase 2
- Search — Phase 2
- Buyer accounts — Phase 2
- Payments or checkout of any kind — Phase 3+
- Discovery algorithm or ranking engine — Phase 2+

---

## Growth Model

- **Day 1:** Passio's Instagram posts one creator brand feature per day → drives traffic to their Passio page
- **Month 2–3:** Creator sees click data → claims listing → tells other creators → word of mouth
- **Month 6+:** SEO begins contributing as domain authority grows
- **Month 6–9:** Self-serve listing opens with social proof ("creators get X clicks/month on average")

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS
- **Backend:** Next.js API routes
- **DB:** PostgreSQL via Supabase
- **Auth:** None in Phase 1. Admin tool protected by `ADMIN_SECRET` env var.
- **Hosting:** Local in Phase 1. Vercel when ready to go public.
- **Images:** Supabase Storage
- **Key principle:** SSR/ISR on all public pages — SEO must work, even if slow to build

---

## Hard Constraints

- No payments, checkout, or transactions — ever in Phase 1
- Buyers browse without accounts — always
- Every creator and product page is Google-indexable — no CSR
- Redirect tracker on every "where to buy" click — non-negotiable for proving value
- Creator-OWNED brands only — not affiliates, not resellers

---

## Comparable Platforms

- **Beacons.ai:** Closest long-term model. They did it for digital creators. We do it for physical product creators in India.
- **Product Hunt:** Our Phase 1 model — curators list, makers claim.
- **LTK (US):** Affiliates to other brands' products. NOT what we are.
- **Meesho:** Resellers. NOT what we are.
- **Nykaa:** Established labels. Inspiration for UX, not business model.

---

## Project Files

- `PRD.md` — Full product requirements (v0.2 — revised)
- `ARCH.md` — PENDING PRD sign-off
- `DESIGN.md` — PENDING PRD sign-off
- `STATUS.md` — Development log, decisions, tasks
- `README.md` — Public summary

---

## How to Continue This Project

1. Read `STATUS.md` → Current Focus + Pending Tasks
2. Check if PRD v0.2 has been signed off (blocks ARCH and DESIGN)
3. Check if brand name has been decided (blocks domain + any public work)
4. Ask Avinash: "Continuing from [last task] — ready to proceed?"
5. On session end: update `STATUS.md` → log decisions, update tasks, add time
