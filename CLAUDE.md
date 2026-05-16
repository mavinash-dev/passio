# Passio — Project Brief for Claude

> Read this first. Every session. This is your full context.

---

## What This Project Is

**One-liner:** A discovery platform for products made by Indian creators and influencers — where passion-built brands find their buyers.

**Problem:** Indian creators are building real products (skincare, food, fitness, fashion) but their reach is capped at their existing followers. Buyers want to shop from creators they trust but there's no single destination to discover creator-owned brands.

**Solution:** A two-sided discovery platform. Creators list their products and get a shareable profile page (`passio.in/[handle]`). Buyers browse, discover, and click through to buy — directly from the creator's own store. We handle nothing except visibility and discovery.

**Positioning:** Nykaa for all categories — but specifically for creator-owned brands, not corporate labels. Like LTK in the US but for creator-OWNED products, not affiliate links.

**Name:** "Passio" is a working slug. Final brand name TBD — shortlist: Raunaq, Yakeen, Zarb, Crayvo, Umang, Flayr.

---

## Target Users

- **Creators (supply):** Indian micro to mid-tier creators (10K–500K followers) with their own product or brand. Incentive: free visibility + new customers beyond their existing audience.
- **Buyers (demand):** 18–35 Indian consumers who follow creators and trust their taste. Incentive: one destination to discover and shop creator-owned brands.
- **Not targeting:** Big celebrity brands, white-label resellers, international creators.

---

## Current Phase & Status

**Phase:** Phase 1 — Define → Build
**Status:** Active
**Last worked on:** 2026-05-16

**What's done:**
- [x] Core idea validated and scoped
- [x] Full project foundation created (PRD, ARCH, DESIGN, STATUS, CLAUDE.md)

**What's next:**
- [ ] Finalise brand name + domain
- [ ] Scaffold Next.js project
- [ ] Build creator listing flow
- [ ] Build public profile + product pages
- [ ] Build discovery feed

---

## Core Features (Phase 1)

1. **Creator Listing** — Creator signs up, creates brand profile, lists products with photos + descriptions + price range + "where to buy" link (their own store)
2. **Public Creator Profile** — `passio.in/[handle]` — shareable page showing all their products. Creator puts this in their Instagram bio.
3. **Product Pages** — Individual product pages with one CTA: "Where to buy →" (redirects to creator's store)
4. **Discovery Feed** — Home page with category browsing, trending creators, new listings
5. **Creator Dashboard** — Manage listings, preview their public page, copy share link

---

## What We Are NOT

- NOT a store — no cart, no checkout, no payments
- NOT a logistics platform — creator handles shipping/returns entirely
- NOT taking commission in Phase 1 — pure free listing
- NOT an analytics tool (see CreatorPulse — separate project on hold)
- NOT for affiliate links — creator must OWN the product/brand

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS
- **Backend:** Next.js API routes
- **DB:** PostgreSQL via Supabase
- **Auth:** Clerk (creators only — buyers browse without auth)
- **Hosting:** Vercel
- **Images:** Supabase Storage
- **Key principle:** SSR/ISR on all public pages — SEO is the growth engine

---

## Hard Constraints

- No payments, checkout, or transaction handling — ever in Phase 1
- Buyers MUST be able to browse without creating an account
- Every creator page and product page must be Google-indexable (SSR, not CSR)
- Creator stats are self-reported — no Instagram API dependency
- India-first: INR prices, Indian creator context, `.in` domain preferred

---

## Key Decisions Already Made

- **No payments/logistics** — pure discovery layer, removes all ops complexity
- **SEO-first** — every page server-rendered and indexed, this is the organic growth engine
- **No buyer accounts** — friction kills discovery, browse freely
- **Self-reported stats** — avoids Instagram API complexity, verification badge handles trust
- **Creator-OWNED brands only** — not affiliate links (LTK model), not resellers (Meesho model)

## Comparable Platforms (for context)

- **LTK (US):** Influencers share affiliate links to OTHER brands' products — NOT what we're doing
- **ShopMy (US):** Similar to LTK — affiliate, not creator-owned brands
- **Meesho (India):** Social commerce for resellers — NOT creator-owned brands
- **Nykaa:** Beauty/fashion marketplace for established brands — our inspiration for UX, not model
- **Gap we fill:** Creator-OWNED brand discovery, India, all categories — doesn't exist yet

---

## Project Files

- `PRD.md` — Full product requirements
- `ARCH.md` — Technical architecture and data model
- `DESIGN.md` — UX flows, key screens, design system
- `STATUS.md` — Development log, tasks, time tracking
- `README.md` — Public summary

---

## How to Continue This Project

1. Read `STATUS.md` → Current Focus + Pending Tasks
2. Check if brand name has been decided (blocks domain + any public work)
3. Ask Avinash: "Continuing from [last task] — ready to proceed?"
4. Work on next pending task
5. On session end: update `STATUS.md` → Development Log + Time Tracker
