# Project Status
## Passio *(working name — final name TBD)*

**Last updated:** 2026-06-25
**Phase:** 1 — Creator Storefront (Live)

---

## Live URLs
- **Production:** https://passio-chi.vercel.app
- **Demo:** https://passio-chi.vercel.app/demo-brand
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

---

## Current Focus

**Getting first 10 real creators onboarded.**

The platform is built. The next unlock is real people using it — that's the only thing that proves the creator card vision (Phase 2) is worth building.

---

## Pending Tasks

### Immediate
- [ ] Set Vercel env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_SECRET) — production DB is not connected yet
- [ ] Finalise brand name — blocks domain, Instagram account, legal entity
- [ ] Seed first 10 real creator profiles (script goes in `web/scripts/` — gitignored)

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
| Hosting | Vercel (auto-deploy on push to main) |

---

## Time Tracker

| Date | Session | Notes |
|---|---|---|
| 2026-05-16 | Brainstorm + v0.1 | Initial dark UI concept |
| 2026-05-17 | Full Phase 1 build | Old dark UI — later scrapped |
| 2026-06-22 | PRD v2.0 pivot | Scrapped old UI, new direction signed off |
| 2026-06-22–25 | Rebuild | Editorial theme, auth, onboarding, dashboard, mobile |
