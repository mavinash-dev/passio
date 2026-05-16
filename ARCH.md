# Architecture Document
## Passio — Creator Brand Discovery Platform

**Version:** 0.1
**Created:** 2026-05-16

---

## 1. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js 15 (App Router) + Tailwind CSS | SSR for SEO on every creator/product page — critical for discovery |
| Backend | Next.js API routes | Co-located, fast to build, sufficient for Phase 1 |
| Database | PostgreSQL via Supabase | Handles relational data (creators, products, categories) cleanly |
| Auth | Clerk | Creator sign-up/login; buyers browse without auth |
| Hosting | Vercel | Native Next.js, free tier, edge for fast global load |
| Image Storage | Supabase Storage | Product photos, creator profile pics |
| Search | Postgres full-text search (Phase 1), Algolia (Phase 2) | Start simple, upgrade when volume demands |

---

## 2. Architecture Overview

```
                    ┌──────────────────────┐
                    │   Buyer (browser)     │  No auth required
                    │   Creator (browser)   │  Clerk auth for listing
                    └──────────┬───────────┘
                               │ HTTPS
                    ┌──────────▼───────────┐
                    │   Vercel (Edge CDN)   │
                    │   Next.js App         │
                    │   - / (home/feed)     │
                    │   - /[handle]         │  ← creator profile (public)
                    │   - /p/[product]      │  ← product page (public)
                    │   - /dashboard        │  ← creator dashboard (auth)
                    │   - /api/*            │
                    └──────────┬───────────┘
               ┌───────────────┼───────────────┐
               │               │               │
     ┌─────────▼──┐  ┌─────────▼──┐  ┌────────▼──────┐
     │  Supabase  │  │   Clerk    │  │ Supabase      │
     │ PostgreSQL │  │   Auth     │  │ Storage       │
     │ + RLS      │  │            │  │ (images)      │
     └────────────┘  └────────────┘  └───────────────┘
```

---

## 3. Data Model

```
Creator
  - id: uuid (PK)
  - user_id: text (Clerk user ID)
  - handle: text (unique — becomes passio.in/[handle])
  - display_name: text
  - bio: text
  - niche: text (fashion | food | fitness | skincare | lifestyle | digital)
  - profile_pic_url: text
  - instagram_handle: text
  - youtube_handle: text
  - tiktok_handle: text
  - follower_count: integer (self-reported)
  - is_verified: boolean
  - is_active: boolean
  - created_at: timestamptz

Product
  - id: uuid (PK)
  - creator_id: uuid (FK → Creator)
  - name: text
  - description: text
  - category: text
  - price_min: integer (INR)
  - price_max: integer (INR)
  - image_url: text
  - buy_link: text (where to actually buy — their store, WhatsApp, etc.)
  - is_active: boolean
  - created_at: timestamptz

ProductView (analytics — Phase 2)
  - id: uuid (PK)
  - product_id: uuid (FK → Product)
  - viewed_at: timestamptz
  - referrer: text

Category
  - id: uuid (PK)
  - name: text
  - slug: text
  - icon: text
  - display_order: integer
```

---

## 4. External APIs & Integrations

| API | Purpose | Notes |
|---|---|---|
| Clerk | Creator authentication | Buyers browse without auth |
| Supabase Storage | Product + creator images | Free 1GB tier sufficient for Phase 1 |
| Instagram oEmbed | Verify creator's Instagram (optional) | Public API, no auth needed for basic verification |

No Instagram Graph API needed — creators self-report their stats. Verification is manual/badge-based.

---

## 5. Key Technical Decisions

### Decision 1: SEO-first architecture
- **Chose:** Next.js SSR/ISR for all public pages
- **Over:** SPA / client-rendered
- **Because:** Every creator page and product page must be Google-indexed. Discovery = SEO. This is the entire growth engine.

### Decision 2: Buyers don't need accounts
- **Chose:** Auth only for creators (listing side)
- **Over:** Requiring buyer accounts
- **Because:** Friction kills discovery. Buyers browse, click, go to creator's store. No login wall.

### Decision 3: We don't touch money
- **Chose:** "Where to buy" link → creator's own store
- **Over:** Building checkout/payments
- **Because:** Removes all payment compliance, fraud risk, and logistics complexity. Pure discovery play.

### Decision 4: Self-reported stats
- **Chose:** Creators enter their own follower counts
- **Over:** Pulling from Instagram API
- **Because:** Instagram API requires OAuth per creator (complex), app review (slow). Self-reported + verification badge is faster and sufficient for Phase 1.

---

## 6. Infrastructure & Deployment

- **Environments:** local → prod (no staging for Phase 1)
- **CI/CD:** Vercel auto-deploy on push to main
- **Domain:** TBD — depends on final brand name. `.in` preferred for India-first.
- **Secrets:** Vercel env vars for prod, `.env.local` for dev

---

## 7. SEO Considerations

SEO is the primary growth channel — treat it as a core feature, not an afterthought:
- Every creator page: `title="[Name]'s Brand | Passio"`, proper OG tags
- Every product page: schema.org Product markup
- Category pages: indexed and crawlable
- Sitemap: auto-generated, submitted to Google Search Console
- Page speed: ISR with 1hr revalidation for creator/product pages

---

## 8. Open Technical Questions

- [ ] Image upload flow — direct to Supabase Storage or via API route?
- [ ] Search: Postgres full-text sufficient for Phase 1 or start with Algolia?
- [ ] Handle squatting — what if someone registers @virat before Virat does?
- [ ] ISR revalidation window for creator pages — 1hr? 24hr?
