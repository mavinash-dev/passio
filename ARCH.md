# Architecture Document
## Passio — Creator Brand Discovery Platform

**Version:** 1.0
**PRD Version:** 0.2 (signed off 2026-05-16)
**Status:** Active

---

## 1. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR/ISR on all public pages — SEO non-negotiable |
| Styling | Tailwind CSS | Fast iteration, consistent design tokens |
| Database | PostgreSQL via Supabase | Relational data, free tier, built-in Storage |
| Auth | — | No login in Phase 1. Buyers always anonymous. No claim flow. Admin tool protected by env-var secret. |
| Hosting | Vercel (later) | Building locally in Phase 1. Deploy to Vercel when ready to go public. |
| Image Storage | Supabase Storage | Co-located with DB, CDN-backed |
| Email | — | Not in Phase 1 |

---

## 2. Rendering Strategy

Every public page must be Google-indexable. No CSR on buyer-facing routes.

| Route | Strategy | Revalidation |
|---|---|---|
| `/` (home/discovery feed) | ISR | On-demand (Passio triggers after manual curation update) |
| `/[handle]` (creator profile) | ISR | On-demand (triggered when creator updates profile) + 1h fallback |
| `/[handle]/[product-slug]` (product page) | ISR | On-demand (triggered on product edit) + 1h fallback |
| `/go/[product-id]` (redirect tracker) | Server-side only | No cache — must log every click |
| `/admin/*` | SSR | Protected by env-var secret, no caching needed |

On-demand revalidation via `revalidatePath()` / `revalidateTag()` called from the internal admin tool and creator dashboard (Phase 2).

---

## 3. Data Models

### `creators`

```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
handle          text UNIQUE NOT NULL          -- URL slug: passio.in/priyanka-skin
name            text NOT NULL
bio             text
photo_url       text
niche           text                          -- skincare | food | fitness | fashion | lifestyle
instagram_handle text
instagram_followers int
is_active       boolean DEFAULT true          -- soft delete / hide from discovery
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

### `products`

```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
creator_id      uuid REFERENCES creators(id) ON DELETE CASCADE
slug            text NOT NULL                 -- URL slug: /priyanka-skin/glow-serum
name            text NOT NULL
description     text
price_range     text                          -- "₹599–₹1,299" — string, not numeric
photo_url       text
buy_link        text NOT NULL                 -- Shopify, Instamojo, WhatsApp — the destination
is_active       boolean DEFAULT true
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()

UNIQUE (creator_id, slug)
```

### `redirect_logs`

```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
product_id      uuid REFERENCES products(id)
creator_id      uuid REFERENCES creators(id)
referrer        text                          -- HTTP Referer header
user_agent      text
ip_hash         text                          -- hashed, not raw IP — privacy
timestamp       timestamptz DEFAULT now()
```

No user_id — buyers are anonymous. The log is for creator-facing click reports, not buyer tracking.

---

## 4. Route Map

```
/                           → Home / discovery feed (ISR)
/[handle]                   → Creator profile page (ISR)
/[handle]/[product-slug]    → Product page (ISR)
/go/[product-id]            → Redirect tracker (SSR — logs click, then 307 to buy_link)
/admin                      → Internal listing tool (env-var protected)
/admin/creators/new         → Add creator (admin)
/admin/creators/[id]/edit   → Edit creator (admin)
/admin/products/new         → Add product (admin)
/admin/products/[id]/edit   → Edit product (admin)
```

---

## 5. Redirect Tracker — Implementation

The most critical Phase 1 infrastructure. Every "Where to buy" CTA routes through `/go/[product-id]`.

**Flow:**
1. Buyer clicks "Where to buy →" on a product page
2. Request hits `/go/[product-id]` — a Next.js Route Handler
3. Server logs: `product_id`, `creator_id`, `timestamp`, `referrer`, `ip_hash`, `user_agent`
4. Server responds with `307 Temporary Redirect` → `products.buy_link`
5. Buyer lands on creator's store

**Why 307 not 301:** 301 is cached by browsers and proxies — future clicks won't hit Passio's logger. 307 forces every click through the server.

**Bot filtering:** Log only requests with recognisable browser user-agents. Skip known crawler UAs (Googlebot, bingbot, etc.) — they shouldn't inflate click counts.

---

## 6. Internal Admin Tool

Passio's tool for manually adding and editing creator listings. Protected by a single `ADMIN_SECRET` env var checked on every request — no auth system needed.

**Minimum viable screens:**
- Creator list with search + filter by niche / active status
- Add creator form (all `creators` fields + first product)
- Edit creator form
- Add product form
- Edit product form
- Click summary per creator (aggregate of `redirect_logs`)

No public access. No design polish needed — this is operational tooling.

---

## 7. SEO Architecture

All public pages must render full HTML server-side.

**Metadata per page type:**

`/[handle]` — Creator profile:
```
title: "[Brand Name] by [Creator Name] — on Passio"
description: "[Bio first 155 chars]"
og:image: creator photo
canonical: https://passio.in/[handle]
```

`/[handle]/[product-slug]` — Product page:
```
title: "[Product Name] by [Brand Name]"
description: "[Product description first 155 chars] — ₹[price range]"
og:image: product photo
schema.org: Product (name, image, description, offers.price)
canonical: https://passio.in/[handle]/[product-slug]
```

**Sitemap:** Auto-generated from all `is_active = true` creators and products. Updated on-demand revalidation.

**robots.txt:** Allow all public routes. Block `/admin`, `/dashboard`, `/go/` (redirect tracker — no indexing value).

---

## 8. Key Architectural Decisions

| Decision | Rationale |
|---|---|
| ISR over full SSG | Creator profiles update (post-claim edits) — full SSG would require full rebuilds |
| On-demand revalidation over time-based | Ensures buyers always see current data without constant rebuild cost |
| Supabase over PlanetScale / Railway | Storage co-location, free tier covers Phase 1, one vendor fewer |
| No auth in Phase 1 | Buyers always anonymous; creators don't log in; admin tool gated by env-var secret. Clerk added in Phase 2 when creator self-editing is needed. |
| `price_range` as text not numeric | Creator brands often sell bundles, variable pricing — "₹599–₹1,299" is what they display |
| ip_hash not raw IP | DPDP Act compliance (India's data privacy regulation) — don't store raw PII |
| 307 not 301 for redirect | Ensures every click hits the logger — 301 would be cached and bypass logging |

---

## 9. Phase 2 Additions (Not Phase 1)

- Claim flow — creator verifies Instagram handle, takes ownership of listing (requires Clerk auth)
- Full creator dashboard with time-series click graphs
- Self-serve creator listing + onboarding (Clerk sign-up → create profile → queue for admin review)
- Search (Postgres full-text search on creator name, brand name, niche — no external search engine needed at Phase 2 scale)
- Buyer saved brands (requires buyer auth — Clerk)

Phase 3: Passio-hosted storefront (products live on Passio, not linked from it — requires significant data model additions).
Phase 4: Payments (UPI, COD, card — Razorpay integration; this is the architectural inflection point).
