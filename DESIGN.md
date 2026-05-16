# Design Document
## Passio — Creator Brand Discovery Platform

**Version:** 1.0
**PRD Version:** 0.2 (signed off 2026-05-16)
**Status:** Active

---

## 1. Design Principles

**Editorial over marketplace.** Passio is a curated media brand, not a listing site. Every page should feel like it was made for that creator — not slotted into a template grid.

**Buyers are on mobile.** The primary buyer experience is mobile-first, likely arriving from an Instagram link. Desktop is secondary.

**One action per page.** Each page has exactly one thing it wants the visitor to do: click "Where to buy", click "Claim this brand", browse the next creator. No competing CTAs.

**Proof over promise.** Show click numbers, real product photos, real creator faces. No stock imagery, no filler copy.

---

## 2. Visual Language

**Tone:** Clean, modern, editorial. Inspired by how Nykaa and The Label Life present brands — not a startup SaaS product.

**Typography:**
- Headings: A humanist sans (Inter or Plus Jakarta Sans) — feels premium without being cold
- Body: Same family, regular weight — consistency over contrast
- Price / data callouts: Monospace or tabular figures — numbers should align

**Colour:**
- Base: Near-white background (`#FAFAF8`) — not pure white, slightly warm
- Text: Near-black (`#1A1A1A`) — not pure black
- Accent: One brand colour TBD after brand name decision — used sparingly (primary CTA only)
- Category pills / tags: Muted, not loud — `#F0EDE8` background with dark text

**Imagery:**
- Creator photos: Square or portrait crop, high quality — Passio should present creators better than their own Instagram bio does
- Product photos: White or neutral background preferred — consistent across the grid
- No illustrations, no icons beyond minimal UI chrome

**Spacing:** Generous. Breathing room signals curation. Dense grids signal marketplace.

---

## 3. Page Inventory

| Page | Route | Purpose |
|---|---|---|
| Home / Discovery Feed | `/` | Browse creator brands by category |
| Creator Profile | `/[handle]` | Full brand page for one creator |
| Product Page | `/[handle]/[product-slug]` | Individual product + "Where to buy" CTA |
| Redirect (no UI) | `/go/[product-id]` | Logs click, redirects — no UI |
| Admin — Creator List | `/admin` | Internal tool: list all creators |
| Admin — Add/Edit Creator | `/admin/creators/[id]/edit` | Internal tool: edit a creator listing |
| Admin — Add/Edit Product | `/admin/products/[id]/edit` | Internal tool: edit a product |

---

## 4. Home / Discovery Feed (`/`)

**Layout: Mobile (primary)**

```
┌─────────────────────────┐
│  passio          [icon] │  ← wordmark left, minimal nav
├─────────────────────────┤
│                         │
│  "Featured this week"   │  ← section heading, editorial tone
│                         │
│  ┌───────────────────┐  │
│  │  [creator photo]  │  │  ← large card, ~70vw height
│  │                   │  │
│  │  Brand Name       │  │
│  │  Creator Name     │  │
│  │  Skincare · 82K   │  │
│  └───────────────────┘  │
│                         │
│  ← scroll →             │  ← horizontal scroll for featured
│                         │
├─────────────────────────┤
│  Skincare  Food  Fit... │  ← category pills, horizontal scroll
├─────────────────────────┤
│                         │
│  "New on Passio"        │
│                         │
│  ┌────┐  ┌────┐        │
│  │    │  │    │        │  ← 2-col grid of creator cards
│  │    │  │    │        │
│  └────┘  └────┘        │
│  Brand    Brand        │
│  Name     Name         │
│                         │
└─────────────────────────┘
```

**Creator card (grid):**
- Creator / brand photo (square, fills card)
- Brand name (bold)
- Creator name (muted, smaller)
- Niche tag (e.g., "Skincare")
- Follower count (e.g., "82K on Instagram")
- 2–3 product thumbnails in a row at the bottom of the card (optional, adds richness)

**Sections (manually curated by Passio):**
1. "Featured this week" — 3–5 creators, horizontal scroll
2. Category pills: Skincare | Food | Fitness | Fashion | Lifestyle — filters the grid below
3. "New on Passio" — most recently listed, 2-col grid
4. (Optional) Per-category spotlight: "Best in Skincare this week" — 1 featured creator per category

**No search bar in Phase 1.** Search opens in Phase 2 once listing volume justifies it.

---

## 5. Creator Profile Page (`/[handle]`)

**Layout: Mobile**

```
┌─────────────────────────┐
│  ← back     [share]     │
├─────────────────────────┤
│                         │
│  [creator photo — hero] │  ← full-width, portrait or square
│                         │
│  Brand Name             │  ← large, bold
│  by Creator Name        │  ← muted, smaller
│                         │
│  Skincare               │  ← niche pill
│                         │
│  ─────────────────────  │
│                         │
│  Short bio here. One    │
│  to three sentences.    │
│                         │
│  ─────────────────────  │
│                         │
│  📸 82K   ←  platform  │  ← platform badges
│  badges, left-aligned   │
│                         │
│  ─────────────────────  │
│                         │
│  Products               │  ← section heading
│                         │
│  ┌────────┐ ┌────────┐  │
│  │[photo] │ │[photo] │  │  ← 2-col product grid
│  │        │ │        │  │
│  │Product │ │Product │  │
│  │Name    │ │Name    │  │
│  │₹599    │ │₹1,299  │  │
│  └────────┘ └────────┘  │
│                         │
└─────────────────────────┘
```

**Details:**
- Share button: copies `passio.in/[handle]` to clipboard + native share sheet on mobile
- Platform badges: Instagram (primary), YouTube (if applicable) — follower count populated from public data initially; creator updates after claiming
- Product grid taps through to product pages

---

## 6. Product Page (`/[handle]/[product-slug]`)

**Layout: Mobile**

```
┌─────────────────────────┐
│  ← Brand Name           │  ← back link to creator profile
├─────────────────────────┤
│                         │
│  [product photo]        │  ← full-width, square or portrait
│                         │
├─────────────────────────┤
│                         │
│  Product Name           │  ← large, bold
│  ₹599 – ₹1,299          │  ← price range, muted
│                         │
│  ─────────────────────  │
│                         │
│  Product description.   │
│  2–4 sentences about    │
│  what it is and for     │
│  whom.                  │
│                         │
│  ─────────────────────  │
│                         │
│  ┌─────────────────────┐│
│  │  Where to buy  →   ││  ← PRIMARY CTA — full width, accent colour
│  └─────────────────────┘│
│                         │
│  ─────────────────────  │
│                         │
│  By Brand Name          │  ← creator card — compact
│  Creator Name · Skincare│
│  82K on Instagram       │
│  [View all products →]  │
│                         │
│  ─────────────────────  │
│                         │
│  [share]                │
│                         │
└─────────────────────────┘
```

**Details:**
- "Where to buy →" is the only CTA above the creator card. One action per page.
- This button routes to `/go/[product-id]` — the redirect tracker — before reaching the creator's store.
- Creator card at the bottom: compact version of their profile info, link back to `/[handle]`. Encourages buyers to explore the full brand after seeing one product.
- Share button: native share sheet, pre-filled with product page URL — optimised for Instagram stories (vertical crop of product photo + page URL).

---

## 7. Admin Tool (Internal — No Design Polish)

Functional only. Passio team uses this to list creator brands. No buyer ever sees this.

**Screens:**
- Creator list table: handle, name, niche, claimed (yes/no), products count, total clicks
- Add/edit creator form: all fields from the `creators` model
- Add/edit product form: all fields from the `products` model
- Quick click summary per creator: total redirects last 7d / 30d / all time

**Stack:** Same Next.js app, Clerk role gate (`admin`). Tailwind for functional layout — no custom design work.

---

## 8. Shared Components

| Component | Used on |
|---|---|
| `CreatorCard` | Home feed grid, search results (Phase 2) |
| `ProductCard` | Creator profile product grid |
| `PlatformBadge` | Creator profile (Instagram, YouTube badges) |
| `CategoryPill` | Home feed filter, creator profile niche tag |
| `ShareButton` | Creator profile, product page |
| `ClickCounter` | Creator dashboard (Phase 2) |

---

## 9. Mobile-First Breakpoints

| Breakpoint | Target |
|---|---|
| Default (< 640px) | Mobile — primary buyer experience |
| `sm` (640px+) | Larger phones / small tablets |
| `md` (768px+) | Tablet — 3-col product grid |
| `lg` (1024px+) | Desktop — wider creator profile, side-by-side layouts |

Desktop is not ignored — SEO means some buyers will land from Google on desktop. But all design decisions start mobile.

---

## 10. What Phase 1 Design Does Not Include

- Claim flow UI — Phase 2 (requires auth)
- Creator dashboard with analytics charts — Phase 2
- Search UI and results page — Phase 2
- Buyer account / saved brands UI — Phase 2
- Passio-hosted storefront pages — Phase 3
- Checkout or payment UI — Phase 4
- Native app screens — Phase 4
