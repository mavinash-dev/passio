# Product Requirements Document


## Passio — Discover the Spirit Behind Every Brand

**Dream. Purpose. Brand Stories.**

**Version:** 0.2
**Author:** Avinash
**Created:** 2026-05-16
**Revised:** 2026-05-16
**Status:** Defining → Ready to Build

---

## 1. Problem Statement

Indian creators are building real physical products — skincare, food, fitness supplements, fashion labels. The products are real. The problem is structural:

**For creators:**
Instagram's algorithm surfaces a creator's personality and content to new people — not their product. Even if the product has its own dedicated Instagram page, discovery is limited: most new followers engage with the creator, not the product page, and product pages rarely reach new audiences unless constantly promoted. A creator can go viral and gain 10K new followers who never find out they have a skincare brand.
- There is no destination where a buyer with active purchase intent can search and find creator-owned brands. Discovery is passive and algorithm-driven, not intent-driven.
- There is no professional home for their brand outside of Instagram highlights and a bio link to their Shopify or WhatsApp.
- WhatsApp ordering is the dominant commerce model for creator brands — unscalable, untraceable, and chaotic.

**For buyers:**
- No single destination to discover creator-owned brands by category.
- Trust exists (they follow creators) but finding the actual product is friction-heavy.
- The current buying experience: DM the creator → hope they reply → receive a payment link → UPI → wait for shipping.

**The market gap:**

| Platform | What it is | Why it isn't this |
|---|---|---|
| LTK (US) | Influencer affiliate links | Links to OTHER brands' products — not creator-owned |
| Meesho | Social commerce | Resellers — not creator-owned brands |
| Nykaa | Beauty/fashion marketplace | Established labels — not creator-owned brands |
| Beacons.ai | Creator monetisation tools | Digital products — not physical creator-owned brands |

Creator-owned physical brand discovery, India, all categories — does not exist.

---

## 2. Vision

> **"The discovery layer for India's creator economy — that grows into the operating system for creator-owned brands."**

Passio starts as a curated discovery directory and expands into the platform where creator-owned brands are built, sold, and scaled. The long-term model is what Beacons.ai built for digital creators in the US — applied to physical-product creators in India, starting from the discovery side.

The full arc: Discovery → Creator Storefront → Payments → Creator Brand OS.

---

## 3. Target Users

### Primary User A: Creator / Brand Owner
- **Who:** Indian micro to mid-tier creators (10K–500K followers) who make and sell their own physical product
- **Products:** Skincare, food & beverage, fitness supplements, fashion, lifestyle goods
- **Current situation:** Selling via Instagram stories, WhatsApp, and a Shopify or Instamojo link in bio
- **Core pain:** No intent-based discovery channel. Buyers who want to find and buy creator-owned products have nowhere to look.
- **What they need from Passio:** A permanent, professional brand home that brings in customers beyond their existing audience

### Primary User B: Buyer / Discoverer
- **Who:** 18–35 Indian consumers who follow creators and actively buy from them
- **Context:** Already comfortable buying from people they follow. Open to discovering creator brands they haven't heard of.
- **Core pain:** No single destination to browse and shop creator-owned brands by category. Discovery is entirely word-of-mouth.
- **What they need from Passio:** One trustworthy place to find and explore creator-owned brands

### Not Targeted
- Big celebrity brands (Virat Kohli's One8, Deepika's brands) — they have distribution
- Drop-shippers or resellers marketing as their own brand
- Affiliate marketers — creator must own the product, not promote someone else's
- Digital product creators (courses, presets) — Phase 4 consideration
- International creators

---

## 4. Phase 1 MVP — Strict Scope

### Model: Curated Listings with Creator Claim

Passio manually researches and builds listings for creator brands. Creators do not sign up first — they discover their listing exists, see real traffic data, and claim ownership. This is the Product Hunt model: curation drives supply, proof of value drives creator engagement.

### 4.1 Creator Profile Page (`/[handle]`)

Public, SEO-indexed page for each creator brand. Built by Passio before the creator ever signs up.

- Brand name, creator photo, niche, short bio
- Platform badges with follower count (populated from public data; updated by creator after claiming)
- Full product grid
- Share button
- "Claim this brand" prompt for unclaimed listings

### 4.2 Product Pages (`/[handle]/[product-slug]`)

Individual product pages. One purpose: get the buyer to the creator's store.

- Product photo, name, description, price range
- Single CTA: "Where to buy →" — routed through the redirect tracker before reaching the creator's store
- Creator card embedded, linking back to their profile
- Full SEO markup (schema.org Product)
- Share button optimised for Instagram stories

### 4.3 Redirect Tracker (`/go/[product-id]`)

Every "Where to buy" click is logged before redirecting the buyer to the creator's actual store link (Shopify, Instamojo, WhatsApp).

Logs: timestamp, referrer, product ID, creator ID.

This is the proof-of-value mechanism. When a creator finds their listing, they see real click data — "Passio sent 47 people to your store this month." That is what converts a passive listing into an engaged creator.

### 4.4 Claim Your Listing Flow

How an unclaimed listing becomes a fully managed creator profile:

1. Creator finds their Passio listing (via Google, Passio's Instagram feature, or a direct email from us)
2. Clicks "Claim this brand"
3. Verifies ownership via Instagram handle (oEmbed public API — no OAuth required)
4. After claiming: can edit all profile fields, add or update products, view click data

Claiming is the onboarding. There is no cold sign-up form.

### 4.5 Discovery Feed (Home Page)

Editorially curated home page. Passio selects what appears here manually in Phase 1 — no algorithm, no ranking engine.

- Sections: "Featured this week", per category, "New on Passio"
- Category navigation: Skincare | Food | Fitness | Fashion | Lifestyle
- Creator cards showing brand photo, name, niche, and product thumbnails

---

## 5. What Phase 1 Does Not Include

- Self-serve creator sign-up and listing — opens in Phase 2 after the claim model is proven
- Creator analytics dashboard — basic click data shown post-claim; full dashboard in Phase 2
- Discovery algorithm or ranking engine — manual curation only in Phase 1
- Search — Phase 2, once listing volume justifies it
- Buyer accounts, wishlists, saved brands — Phase 2
- Reviews and ratings — Phase 3
- Payments, checkout, cart — Phase 3
- Mobile app — Phase 4
- Digital products — Phase 4
- Brand or advertiser tools — Phase 4

---

## 6. User Journeys

### Buyer Journey — Phase 1
```
Buyer sees Passio's Instagram feature a creator brand
      ↓
Clicks link → lands on Passio home or creator's profile page
      ↓
Browses by category, discovers creator brands
      ↓
Views product page
      ↓
Clicks "Where to buy" → Passio logs click → buyer reaches creator's store
      ↓
Buys directly from creator
      ↓
Returns to Passio to discover more, or follows Passio's Instagram
```

### Creator Journey — Phase 1 (Claim Model)
```
Passio lists the creator's brand using public information
      ↓
Creator discovers their listing via Google, Passio's Instagram, or direct outreach
      ↓
Sees click data: "Passio sent X people to your store this month"
      ↓
Claims their listing — verifies via Instagram handle
      ↓
Edits profile, adds products, updates buy links
      ↓
Receives ongoing traffic from Passio's curation and growing SEO
```

### Creator Journey — Phase 2 (Self-Serve)
```
Creator hears about Passio from another creator or sees Passio's Instagram
      ↓
Sees social proof: "Creator brands on Passio averaged X clicks/month"
      ↓
Signs up → creates profile → lists products
      ↓
Passio verifies brand ownership before listing goes live
      ↓
Listed in discovery feed
```

---

## 7. Growth Model

| Channel | Timeline | Mechanism |
|---|---|---|
| Passio's Instagram | Day 1 | Daily creator brand feature, editorial-style. Link drives traffic to their Passio page. |
| Creator word-of-mouth | Month 2–3 | Creator sees click data → tells other creators → demand to be listed |
| SEO | Month 6–12 | Creator profile and product pages indexed. Long-tail searches for creator brand names and niches. |
| Self-serve listing | Month 3–6 | Opened after claim model is proven, with social proof ready for new creators |

**Passio's Instagram is the Day 1 traffic engine.** One creator brand featured per day. Passio's bio link routes to the featured creator's page or the home feed. This is the mechanism that drives the first buyers and triggers the first creator claims.

This model does not depend on:
- Creators putting Passio in their own bio
- Viral moments
- Instagram's algorithm favouring Passio's posts (assume 5% organic reach as baseline)

---

## 8. Success Metrics

| Metric | Month 1 | Month 3 | Month 6 | Month 12 |
|---|---|---|---|---|
| Creator brands listed (manually curated) | 50 | 150 | — | — |
| Creators who claimed their listing | 10 | 60 | — | — |
| Self-serve listings (Phase 2) | — | — | 500 | 2,000 |
| Monthly click-throughs tracked | 500 | 5,000 | 25,000 | 150,000 |
| Passio Instagram followers | 500 | 2,000 | 8,000 | 30,000 |

---

## 9. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Creators object to being listed without prior consent | Medium | Every listing shows a visible "Claim or remove this brand" option. Most will claim, not remove. |
| Passio's Instagram organic reach stays low | High | Post consistently, tag featured creators (they reshare), engage creator communities |
| Buy links break over time (WhatsApp, offline stores) | High | Monthly automated link-check. Prompt claimed creators to update stale links. |
| Quality degrades when self-serve opens (fake or drop-shipped brands) | High | Manual verification gate before any self-serve listing goes live. Review queue for first 1,000. |
| Meta builds intent-based creator brand discovery inside Instagram | Medium | Move fast. Creator relationships and curated trust are hard to replicate at platform scale. |

---

## 10. Long-Term Roadmap

| Phase | Timeline | Key Deliverable | Revenue Model |
|---|---|---|---|
| Phase 1 | Month 0–3 | 150 creator brands listed, redirect tracking live, claim flow working | None — build trust and proof of value |
| Phase 2 | Month 3–9 | Self-serve listing, full creator dashboard, click analytics, search | Promoted placements |
| Phase 3 | Month 9–18 | Passio-hosted creator storefront — creator's store lives on Passio, not linked from it | Storefront subscription or revenue share |
| Phase 4 | Month 18–30 | Payments — Passio processes UPI, COD, card transactions | Transaction percentage |
| Phase 5 | Month 30+ | Creator brand OS — inventory, analytics, brand deals, collab tools | SaaS + transaction percentage |

Phase 4 (payments) is the inflection point where Passio becomes a real business. Every architectural decision before that should make adding a payment layer easier, not harder.

---


## 11. Execution Plan: 50 Brands, Instagram-First

### Overview
The initial go-to-market strategy is to curate and launch portfolios for 50 creator-owned brands, picking 5 brands every week. Each brand receives a premium, story-driven profile (inspired by "Humans of Bombay"), with a single, consistent design format. This is offered for free to creators, providing immediate value and social proof.

### Steps
1. **Brand Selection:** Manually research and shortlist 5 high-potential creator brands each week.
2. **Outreach:** Contact creators using a concise, value-driven template (see `OUTREACH_TEMPLATE.md`).
3. **Portfolio Creation:** Build a visually compelling profile for each brand using a single-format template (see `PROFILE_TEMPLATE.md`).
4. **Instagram Promotion:** Feature each brand on Passio’s Instagram, using paid promotion to boost reach and engagement.
5. **Inbound Interest:** Track and prioritize inbound requests from creators who want to be featured before the 50-brand milestone.
6. **Execution Tracking:** Follow a week-by-week checklist to ensure consistency and momentum (see `EXECUTION_CHECKLIST.md`).

### Why This Works
- **Momentum:** Consistent output builds credibility and attracts both creators and buyers.
- **Social Proof:** Early featured brands become advocates, driving organic growth.
- **Quality Control:** Manual curation ensures only high-quality, authentic brands are listed.
- **Instagram-First:** All growth and discovery efforts are focused on Instagram, with a budget for paid promotion to overcome organic reach limitations.

### Supporting Files
- `OUTREACH_TEMPLATE.md`: DM/email template for contacting creators
- `PROFILE_TEMPLATE.md`: Standardized profile format for all brands
- `EXECUTION_CHECKLIST.md`: Week-by-week execution and tracking checklist

---

## 12. Open Questions

- [ ] Final brand name — Raunaq? Crayvo? Flayr? Something else?
- [ ] Domain — .in or .com?
- [ ] How do we source and vet the first 50 creator brands to list manually?
- [ ] Do we proactively DM or email creators when we list them, or wait for organic discovery?
- [ ] What is the minimum viable listing before a creator claims — just a profile page, or at least one product?
- [ ] What claim threshold triggers opening self-serve? (Proposed: 30+ organic claims)
