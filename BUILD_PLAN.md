# Build Plan

## Passio — Milestone-by-Milestone

**Last updated:** 2026-06-22

---

## Milestone 1 — Demo Page (hardcoded)

**Goal:** One beautiful creator page. No DB. Used for creator validation conversations.

**Route:** `/demo-brand`
**Data:** Hardcoded. Brand: Bramarambaa.
**Theme:** Editorial only. Build the flagship theme first.
**Deliverable:** A page you'd be proud to screenshot and DM to a creator.

**What's NOT in M1:**
- No database
- No auth
- No admin
- No analytics
- No redirect tracking

---

## Milestone 2 — Creator CMS

**Goal:** A real creator can sign up, build their page, and submit for approval.

**What's added:**
- Supabase Auth (Google only)
- DB tables (see Schema section)
- Image upload via Supabase Storage
- Page builder: theme picker + form fields
- Creator's public page reads from DB (not hardcoded)
- Themes: Minimal and Bold added alongside Editorial

**Not added yet:** Analytics, redirect tracking, admin panel.

---

## Milestone 3 — Redirect Tracking

**Goal:** Every product "Buy" click is logged. Creator sees which products get tapped.

**What's added:**
- `/go/[productId]` route — logs click, 307 redirects to buy URL
- `click_events` table populated
- Creator dashboard shows: total clicks, clicks per product (table, no charts)

This is the first real value proposition. Everything before this is a portfolio page.

---

## Milestone 4 — Admin Approval

**Goal:** Avinash can approve or reject creator sign-ups. Only approved creators go live.

**What's added:**
- `status` field on creators: `pending` → `approved` / `rejected`
- Simple admin screen — table of pending creators, approve/reject buttons
- Public pages only render if `status = approved`
- Email to creator on state change

At M4 complete: first real creators can be onboarded.

---

## Schema

```sql
profiles
  id, email, role, status

creators
  id, user_id, handle, brand_name, tagline, story,
  theme, hero_image_url, portrait_image_url,
  instagram_handle, website_url

products
  id, creator_id, name, price_text, buy_url, active

product_images
  id, product_id, image_url

click_events
  id, product_id, creator_id, created_at,
  referrer, user_agent, hashed_ip
```

Nothing added until a real creator asks for it.

---

## Three Themes

### Editorial (build in M1)
| Token | Value |
|---|---|
| Background | `#FAFAF8` — warm off-white |
| Text | `#1A1A1A` — near-black |
| Muted text | `#6B6B6B` |
| Accent | `#B8956A` — warm gold |
| Border | `#E8E4DF` |
| Hero font | Playfair Display — large, italic, serif |
| Body font | Inter |
| Layout | Story-first. Hero full-width. Brand name large below hero. Story before products. |
| Product grid | 2-col mobile, 3-col desktop. Image-led. Name + price below. Buy button. |

### Minimal (build in M2)
| Token | Value |
|---|---|
| Background | `#FFFFFF` |
| Text | `#111111` |
| Muted text | `#888888` |
| Accent | `#111111` — black |
| Layout | Products first. Story below. Tight grid, product-forward. |
| Fonts | Inter only. No serif. |

### Bold (build in M2)
| Token | Value |
|---|---|
| Background | `#0F0F0F` |
| Text | `#F5F5F5` |
| Accent | `#FF4D00` — electric orange |
| Layout | Giant hero. Brand name oversized. Products high-contrast. |
| Fonts | Inter — heavy weight headings. |

---

## M1 Page Structure — Editorial

```
┌─────────────────────────────────┐
│  passio          [wordmark only] │  ← minimal nav, no links
├─────────────────────────────────┤
│                                  │
│   HERO IMAGE — full width        │  ← aspect-[4/3] mobile
│                                  │     aspect-[16/9] desktop
│                                  │
├─────────────────────────────────┤
│                                  │
│   Brand Name         (Playfair)  │
│   Tagline            (Inter)     │
│   IG handle + website links      │
│                                  │
├─────────────────────────────────┤
│                                  │
│   THE STORY                      │
│   Portrait left + text right     │  ← desktop
│   Portrait above text on mobile  │
│                                  │
├─────────────────────────────────┤
│                                  │
│   THE COLLECTION                 │
│   2-col mobile / 3-col desktop   │
│                                  │
│  ┌───────┐  ┌───────┐            │
│  │ photo │  │ photo │            │
│  │ name  │  │ name  │            │
│  │ price │  │ price │            │
│  │ [Buy] │  │ [Buy] │            │
│  └───────┘  └───────┘            │
│                                  │
├─────────────────────────────────┤
│  Made with passio    [footer]    │
└─────────────────────────────────┘
```

---

## M1 Demo Brand — Bramarambaa

Using Bramarambaa as the demo brand. Real brand, real images from their CDN.
If Snigdha (founder) sees this page and wants it in her bio — that's the validation signal.

| Field | Value |
|---|---|
| Brand name | Bramarambaa |
| Tagline | Where tradition meets today |
| Instagram | @bramarambaa |
| Website | bramarambaa.com |
| Hero image | `https://bramarambaa.com/cdn/shop/files/lashes_14.png` |
| Portrait | `https://bramarambaa.com/cdn/shop/files/IMG_4788.jpg` |
| Story | Bramarambaa was born from a love of handwoven Indian textiles and the desire to make them part of everyday wear. Snigdha started with a single saree silhouette — something her grandmother would recognise but she could wear to brunch. Every piece is made in small batches, never rushed. |

**6 products:**

| Name | Price | Image URL |
|---|---|---|
| Blue Petal Flare | ₹2,800 | `https://bramarambaa.com/cdn/shop/files/05BDAC90-412A-4DD2-A5D4-27392CACF57B.jpg` |
| Gingham Saree | ₹3,200 | `https://bramarambaa.com/cdn/shop/files/93A24B84-63BB-4195-B8AE-9419397E6E3A.png` |
| Sunflora | ₹2,400 | `https://bramarambaa.com/cdn/shop/files/16D0A42E-D0DE-44FA-9E35-1B3734C7B5A7.jpg` |
| Lavender Elora | ₹2,600 | `https://bramarambaa.com/cdn/shop/files/F7C67A36-9D7C-4AFD-9E27-4A823D187ED9.png` |
| Wine Petal Anarkali | ₹3,500 | `https://bramarambaa.com/cdn/shop/files/B964CA39-76CC-401C-81DA-6F1427CECAE7.jpg` |
| Pastel Bloom Set | ₹4,200 | `https://bramarambaa.com/cdn/shop/files/990EDC1D-57FC-437B-85AB-AF372F4F7EEE.jpg` |

All buy buttons → `https://bramarambaa.com` (direct, no redirect tracking until M3).

---

## Decisions Made

- **Nav:** Passio wordmark only. No links.
- **Footer:** "Made with Passio" — yes.
