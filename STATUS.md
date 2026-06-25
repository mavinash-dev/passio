# Project Status
## Passio *(working name — final name TBD)*

**Last updated:** 2026-06-26
**Phase:** 1 — Creator Storefront (Live)

---

## Live URLs
- **Production:** https://passio.in
- **Vercel alias:** https://passio-chi.vercel.app
- **Demo:** https://passio.in/demo-brand
- **GitHub:** https://github.com/mavinash-dev/passio
- **Supabase project:** apkkkcmleitkoawijgmq

---

## What's built and live

| Feature | Status |
|---|---|
| Creator sign-up (email OTP) | ✅ |
| 3-step onboarding wizard (brand, story, products) | ✅ |
| Public creator page `/[handle]` | ✅ |
| Redirect tracker `/go/[id]` | ✅ |
| Creator dashboard (taps per product, edit content) | ✅ |
| Admin approval gate | ✅ (status field — UI pending) |
| Demo mode (walkthroughs without auth) | ✅ |
| Mobile-optimised layout | ✅ |
| Landing page (soft landing, creator grid) | ✅ |
| Custom domain passio.in (GoDaddy → Vercel) | ✅ |
| Surawe onboarded (production DB) | ✅ |
| Bramarambaa onboarded (production DB) | ✅ |
| Instagram account created | ✅ (passio.in still in 30-day holding period — check every 2-3 days) |

---

## Current Focus

**Getting first 10 real creators onboarded.**

2 creators live: Surawe, Bramarambaa. 8 more needed before Phase 2 (creator cards) is unlocked.

---

## Pending Tasks

### Immediate
- [ ] Fix truncated product name in Google Sheet for Surawe: "White and Pink Tulip Layered Fro" → "White and Pink Tulip Layered Frock"
- [ ] Set Vercel env vars if not done (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_SECRET)
- [ ] Finalise brand name — blocks domain Instagram account, legal entity (shortlist: Raunaq, Crayvo, Flayr)
- [ ] Google Workspace setup: waiting on Google to release passio.in from old Google account (ref #72639065, up to 3 business days)
- [ ] Instagram username passio.in — in 30-day holding period, check every 2-3 days
- [ ] Decide: should /demo-brand redirect to /bramarambaa now that bramarambaa is in DB?
- [ ] Seed remaining 8 creators to reach 10 live profiles

### Phase 2 gate (need 10+ live creators first)
- [ ] Creator cards with scrollable product image strip (see ROADMAP.md §2a)
- [ ] Category tags on creators + filter chips on landing page
- [ ] Featured row (admin-curated)

---

## Key Decisions

| Date | Decision | Rationale |
|---|---|---|
| 2026-06-22 | PRD v2.0 — Passio is NOT a discovery platform yet | Phase 1 = storefront only. Discovery is Phase 2. |
| 2026-06-22 | Scrapped old dark UI — rebuilt from scratch | Editorial theme, warm palette, creator-first |
| 2026-06-25 | Landing page stays as soft landing | Don't dump everything. Reveal depth as creators arrive. |
| 2026-06-25 | Creator card design = scrollable product images (Myntra model, creator-first) | See ROADMAP.md §2a |
| 2026-06-25 | Custom domain passio.in connected to Vercel | GoDaddy DNS A record (216.198.79.1) + www CNAME |
| 2026-06-25 | Auth = email OTP only (no passwords) | Supabase passwordless — no reset flow needed, simpler for creators |
| 2026-06-26 | Background color changed from #F2EBE1 → #FAFAF8 | Nude/warm tone felt too heavy; editorial spec uses #FAFAF8 |
| 2026-06-26 | Landing page redesigned — single-line hero, editorial card footers | Hero on one line; cards now have border-top + uppercase tracking tagline |
| 2026-05-17 | Supabase JWT keys rotated | Old keys were exposed in GitHub — revoked |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 + Cormorant Garamond + Playfair Display |
| Database | PostgreSQL via Supabase |
| Storage | Supabase Storage (creator-photos, product-photos) |
| Auth | Supabase Auth — email OTP (creators) |
| Hosting | Vercel — auto-deploy on push to main, custom domain passio.in |

---

## Time Tracker

| Date | Session | Notes |
|---|---|---|
| 2026-05-16 | Brainstorm + v0.1 | Initial dark UI concept |
| 2026-05-17 | Full Phase 1 build | Old dark UI — later scrapped |
| 2026-06-22 | PRD v2.0 pivot | Scrapped old UI, new direction signed off |
| 2026-06-22–25 | Rebuild | Editorial theme, auth, onboarding, dashboard, mobile |
| 2026-06-25 | Domain + onboarding | passio.in live, Surawe + Bramarambaa added to DB |
| 2026-06-26 | Polish | Background color, landing page redesign, Bramarambaa SQL with 6 products |
