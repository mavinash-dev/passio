# Passio — Product Roadmap

**Last updated:** 2026-06-25
**Current phase:** Phase 1 (Creator Storefront) — Live

---

## The arc

Creator storefront → Soft discovery → Personalised feed → Payments → Brand OS

---

## Phase 1 — Creator Storefront ✅ Live

**What it is:** A professional brand home for Indian fashion creators. Passio goes in their bio link, replaces Linktree.

**What's built:**
- Creator signs up via email OTP → 3-step onboarding (brand basics, story, products)
- Public creator page at `passio.in/[handle]` — brand name, story, product marquee
- Redirect tracker on every product tap (`/go/[id]`) — the core analytics hook
- Creator dashboard — total taps, per-product taps, edit brand/story/products
- Admin approval gate — creators go live only after Avinash approves
- Demo mode for walkthroughs without real accounts
- Mobile-optimised throughout

**What's NOT here yet (by design):**
- Discovery / browse feed with real creators (0 live creators so far)
- Category filters, search, personalization — all Phase 2+
- Payments — Phase 4

---

## Phase 2 — Soft Discovery

**What it is:** Buyers can browse creators on the landing page. No accounts needed. No personalization yet — just a clean, browsable feed.

**Guiding principle:** The landing page stays a soft landing. Don't dump everything at once. Reveal depth as buyers scroll.

### 2a — Creator Cards (the Myntra model, creator-first)

The key design decision: each card in the grid = **one creator**, not one product.

Instead of Myntra's colour swatches, we show the creator's actual product photos as a **horizontally scrollable strip**.

```
┌─────────────────────────────────────┐
│ ← [img1] [img2] [img3] [img4] →    │  ← swipe/scroll through their products
├─────────────────────────────────────┤
│ Bramarambaa                          │  ← brand name
│ Fashion · @bramarambaa              │  ← category tag + handle
└─────────────────────────────────────┘
```

- Tap any product image → goes to their creator page (anchored to that product)
- Tap brand name → goes to their creator page
- Auto-plays or rests on first image by default
- On desktop: hover reveals arrows. On mobile: native swipe.

**Why this is better than a flat product grid:**
- Buyers understand immediately what this creator's aesthetic is
- You see range and variety without clicking through
- Feels editorial, not marketplace

### 2b — Category Tags

Creators are tagged at sign-up: Fashion / Food / Skincare / Fitness / Home / Other.

Landing page gets horizontal filter chips above the grid. Tapping a category filters in-place (no page reload — client-side filter on pre-fetched data).

```
[All]  [Fashion]  [Food]  [Skincare]  [Fitness]  [Home]
```

### 2c — Featured Row

Admin can mark creators as `featured`. These appear in a curated row above the main grid with a slightly larger card treatment. Editorial pick, not algorithm.

---

## Phase 3 — Personalised Feed

**What it is:** Buyers declare interests on first visit. Feed reorders based on declared interests + behaviour (taps, time spent).

### 3a — Interest Declaration (first visit)

On first landing, a one-tap modal:
```
What are you into?
[Fashion]  [Food]  [Skincare]  [Fitness]

→ Show me brands
```
Stored in localStorage (no account needed). Feed reorders immediately.

### 3b — Behaviour Signals

- Product taps → weight category higher
- Time on creator page → soft signal
- "Save" / heart a brand → strong signal

### 3c — Buyer Accounts (optional)

- Google / Phone OTP
- Saved brands persist across devices
- Personalisation syncs

---

## Phase 4 — Payments

**What it is:** Passio processes the transaction. Creator gets paid out. Buyers checkout without leaving the app.

- UPI, card, COD
- Razorpay or Cashfree integration
- Creator sets price per product (currently optional / not required)
- Order confirmation to buyer (SMS/email)
- Payout to creator (weekly, T+2)
- Order management in creator dashboard

**This phase is blocked on:** brand name finalised + legal entity + payment gateway KYC

---

## Phase 5 — Creator Brand OS

**What it is:** Passio becomes the operating system for a creator brand. Not just a storefront — the full business back-end.

- Inventory tracking (SKU-level stock)
- Advanced analytics (revenue, conversion, repeat buyers)
- Brand deal matching — Passio connects creators with brands for collaborations
- Creator community — private forum, shared supplier network
- White-label option — `yourbrand.passio.in` or custom domain

---

## What we are NOT building (ever, or until Phase 4+)

| What | Why not |
|------|---------|
| Drag-and-drop page builder | 12-month build. Curated themes solve this. |
| Iframe embeds | X-Frame-Options blocks most sites. Legally grey. |
| Affiliate / reseller listings | Not our model. Creators own their brand. |
| SEO as launch strategy | 12–18 months to show results. Instagram first. |
| Claimed/unclaimed profiles | Doesn't exist in our model. Creators sign up. |

---

## Current blockers

- [ ] Brand name finalised (blocks domain, Instagram, legal)
- [ ] First 10 real creators onboarded (unlocks Phase 2 feed)
- [ ] Vercel env vars set (SUPABASE keys) for production DB access
