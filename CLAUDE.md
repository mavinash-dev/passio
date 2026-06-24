# Passio — Project Brief for Claude

> Read this first. Every session. This is your full context.

---

## What This Project Is

**One-liner:** A platform where Indian creator-owned physical brands build their own storefront, and buyers discover them through a personalised, interest-driven feed.

**The real problem:** Indian creators sell physical products (skincare, food, fashion, fitness) but their reach is permanently capped at their existing followers. WhatsApp ordering and a bio link is their entire commerce infrastructure.

**How Passio works (current direction):**
- Creators sign up (Instagram OAuth / Google / Phone via Supabase Auth), pick a theme, build their page, add products — they own their listing from Day 1
- Buyers browse a personalised feed based on declared interests and behaviour signals
- No "claimed/unclaimed" concept — creators actively join the platform
- Creators WITHOUT a website: Passio IS their storefront (`passio.in/handle` goes in their bio)
- Creators WITH a website: Passio is a discovery layer that drives new buyers to their site

**Long-term trajectory (Beacons.ai model for India, physical products):**
1. Discovery platform with creator-owned pages (now)
2. Creator storefront — Passio IS their website if they don't have one
3. Payments — Passio processes the transaction (UPI, COD, card)
4. Creator brand OS — analytics, inventory, brand deals

**Name:** "Passio" is a working slug. Final brand TBD — shortlist: Raunaq, Crayvo, Flayr.

---

## What We Learned (Don't Repeat These Mistakes)

- **No "claimed/unclaimed" state** — this concept does not exist in the product. Buyers never see it. Creators don't "claim" — they sign up.
- **No iframe embeds** — most sites block them (X-Frame-Options). Legally grey. Don't suggest this.
- **No drag-and-drop builder** — that's a 12-month build. Use curated themes (3 options) instead.
- **Creators will NOT put Passio in their bio unless Passio IS their website** — that's the play for creators without their own site.
- **SEO is 12–18 months out** — not a launch strategy. Instagram is the Day 1 traffic engine.
- **No redirect tracking = no proof of value** — every product click goes through `/go/[id]`. Non-negotiable.
- **Scrap the old dark UI** — the first build had a dark (#0C0C0C) marketplace look. The new UI starts fresh. Three themes for creators; the platform chrome is clean and warm.

---

## Three Users

- **Admin (Avinash):** Approves creator applications, features brands on feed, full CRUD override, platform analytics
- **Buyers:** 18–35 Indian consumers. Browse without account. Optional account for personalised feed + saved brands.
- **Creators:** Indian micro to mid-tier (10K–500K followers) who OWN a physical product brand. Not affiliates, not resellers. Auth required to manage their page.

---

## Current Phase & Status

**Phase:** Rebuilding — PRD v1.0 signed off 2026-06-22
**Status:** Active — scrapping old UI, starting fresh

**What's been built (old, being scrapped):**
- Next.js 15 app in `web/` subdirectory
- Supabase schema + storage buckets
- Old dark UI — home feed, creator pages, admin tool, redirect tracker
- Deployed to https://passio-chi.vercel.app

**What's next:**
- [ ] Rewrite DB schema to support auth + creator-owned profiles + themes
- [ ] Build new UI from scratch: home feed (algorithm), creator sign-up + page builder, admin panel, buyer experience
- [ ] Brand name decision (blocks domain + Instagram)

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS v4
- **Backend:** Next.js API routes + Server Actions
- **DB:** PostgreSQL via Supabase
- **Auth:** Supabase Auth — Instagram OAuth, Google, Phone OTP (creators); Google/Phone (buyers)
- **Hosting:** Vercel (passio-chi.vercel.app — auto-deploy on push to main)
- **Images:** Supabase Storage
- **Key principle:** SSR/ISR on all public pages — SEO must work

---

## Themes (Creator Page Options)

Three themes at launch. More added based on creator requests.

| Theme | Feel | Best for |
|---|---|---|
| Editorial | Warm off-white (#FAFAF8), Playfair Display serif, story-first | Fashion, lifestyle, skincare |
| Minimal | White, Inter sans-serif, product grid forward | Food, supplements, functional products |
| Bold | Dark background, large type, high-contrast | Streetwear, fitness, statement brands |

---

## Hard Constraints

- No payments, checkout, or transactions — Phase 3+
- Buyers can always browse without an account
- Every creator and product page is Google-indexable — no CSR-only rendering
- Redirect tracker on every product click — non-negotiable
- Creator-OWNED brands only — not affiliates, not resellers
- No "claimed/unclaimed" concept — ever

---

## Comparable Platforms

- **Beacons.ai:** Closest long-term model. Digital creators in the US. We do physical products in India.
- **Linktree / Beacons:** Theme picker model — that's what our page builder is inspired by.
- **LTK (US):** Affiliates. NOT what we are.
- **Meesho:** Resellers. NOT what we are.
- **Nykaa:** Established labels. UX inspiration, not business model.

---

## Credentials (Never Commit These)

All secrets live in `web/.env.local` (gitignored). Never put actual values here.

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase publishable key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-only)
- `ADMIN_SECRET` — Admin panel password
- Old JWT keys (`eyJhbGci...`) are REVOKED — never use them
- `web/scripts/` is gitignored — keep it that way

---

## Project Files

- `PRD.md` — Full product requirements (v1.0 — active)
- `STATUS.md` — Development log, decisions, tasks
- `web/` — Next.js app (being rebuilt)

---

## How to Continue This Project

1. Read `STATUS.md` → Current Focus + Pending Tasks
2. Check if brand name has been decided (blocks domain + Instagram)
3. Resume from last task in STATUS.md
4. On session end: update `STATUS.md` → log decisions, update tasks, add time
