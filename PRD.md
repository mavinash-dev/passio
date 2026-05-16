# Product Requirements Document
## Passio — Creator Brand Discovery Platform *(name TBD)*

**Version:** 0.1 (Draft)
**Author:** Avinash
**Created:** 2026-05-16
**Status:** Brainstorm → Defining

---

## 1. Problem Statement

Indian creators are building real products with real passion — skincare lines, food brands, fitness supplements, fashion labels, lifestyle goods. But two problems exist on both sides:

**For creators:**
- Their product discovery is capped at their existing followers
- No platform exists to surface their brand to new buyers
- They're scattered across Instagram DMs, personal websites, WhatsApp links
- No visibility, no ranking, no reach beyond their current audience

**For buyers:**
- No single destination to discover and shop creator-owned brands
- Trust is already there (they follow these creators) but the products are hard to find
- No way to browse "what has this creator built?" across categories

**The workaround today:** Creators post on Instagram and hope followers buy. Buyers DM creators or click bio links and hope they land somewhere real. It's all friction, no discovery.

---

## 2. Vision

> **"The discovery layer for India's creator economy — where passion-built brands find their buyers."**

Not a marketplace. Not a logistics platform. A visibility engine — like Nykaa but for every category, every creator brand, not just established labels.

Creators list. Buyers discover. We handle nothing else.

---

## 3. Target Users

### Primary User A: Creator / Influencer
- **Who:** Indian micro to mid-tier creators (10K–500K followers) with their own product or brand
- **Platforms:** Instagram, YouTube, TikTok
- **Products they make:** Skincare, food, fitness, fashion, lifestyle, digital products
- **Core pain:** Their product has no home beyond their own followers. Zero discoverability for new customers.
- **Incentive to list:** Free visibility, new customers, a permanent home for their brand

### Primary User B: Buyer / Discoverer
- **Who:** 18–35 Indian consumers who follow creators and trust their taste
- **Context:** Looking to buy from creators they admire, or discover new creator brands
- **Core pain:** "I know this creator has a product but I can't find it" or "I want to buy from Indian creators but don't know where to look"
- **Incentive:** One place to discover and shop creator-owned brands

### Not Targeted (Phase 1)
- Big celebrity brands (Virat Kohli's One8) — they have distribution already
- White-label resellers pretending to be creator brands
- International creators
- Non-Indian consumers

---

## 4. Goals & Success Metrics

| Goal | Metric | Target (12 months) |
|---|---|---|
| Creator supply | Creators with listed products | 5,000 |
| Buyer demand | Monthly active buyers | 100,000 |
| Discovery | Product page views/month | 1,000,000 |
| Trust signal | Creator verification rate | > 80% |
| Virality | Shares of creator product pages | > 50,000/month |

### Non-Goals
- Handling payments, checkout, or transactions
- Managing shipping, logistics, or returns
- Competing with Shopify (we send traffic TO their store)
- Building a review/rating system (Phase 2)
- International expansion (Phase 1)

---

## 5. Features — Phase 1

### 5.1 Creator Listing (Supply Side)
- Creator signs up and creates their brand profile
- Lists their products: name, photo, description, category, price range
- Links to where buyers can actually buy (their website, WhatsApp, Instagram DM, Shopify)
- Platform/follower count displayed as social proof
- Verification badge for confirmed creator accounts

### 5.2 Discovery Feed (Demand Side)
- Home page: curated creator brands by category
- Categories: Skincare, Food & Beverage, Fitness, Fashion, Lifestyle, Digital
- Trending creators, new listings, editor's picks
- Search by creator name, niche, product type, price range

### 5.3 Creator Profile Page
- Public page: `passio.in/[handle]` (or final domain)
- Shows: creator bio, follower count, platform badges, all their products
- "Shop this creator" button → links to their store
- Shareable — creator shares this link in their bio, DMs, pitches

### 5.4 Product Pages
- Individual product listing with photos, description, price range
- "Where to buy" button → redirects to creator's actual store/link
- Creator card embedded on every product page
- Share button (Instagram story share optimised)

### 5.5 Ranking & Visibility Engine
- Creators ranked by: engagement rate + follower count + listing completeness + freshness
- Featured slots for top-performing creators (free in Phase 1, paid in Phase 2)
- Category trending: what's getting clicks this week

---

## 6. Explicitly Out of Scope

- Payment processing, checkout, cart — we are NOT a store
- Shipping, logistics, returns — creator handles all of this
- Creator analytics dashboard (Phase 2)
- Review and rating system (Phase 2)
- Brand/advertiser side (Phase 3)
- Affiliate commission tracking (Phase 2)
- Mobile app — web first

---

## 7. User Journey

### Creator Journey
```
Creator hears about Passio (word of mouth / Instagram)
      ↓
Signs up → creates brand profile (name, bio, niche, social handle)
      ↓
Lists products (photo, description, price range, buy link)
      ↓
Gets a shareable profile: passio.in/[handle]
      ↓
Puts link in Instagram bio / shares in stories
      ↓
New buyers discover them → click through to their store
      ↓
Creator gets sales from people who didn't follow them before
```

### Buyer Journey
```
Buyer lands on Passio (from creator's bio link / search / word of mouth)
      ↓
Browses by category or searches for a creator
      ↓
Discovers creator brand they didn't know existed
      ↓
Reads creator profile + views products
      ↓
Clicks "Where to buy" → lands on creator's actual store
      ↓
Buys directly from creator (Passio gets no cut)
      ↓
Buyer bookmarks Passio to come back for more creator discovery
```

---

## 8. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Creators don't list (supply problem) | Medium | Target creators who already have products and DM them directly; make listing take < 5 minutes |
| Low buyer traffic initially | High | SEO-first — every creator page is indexed; creator shares their own page (brings traffic) |
| Creators list fake/non-existent products | Medium | Manual verification for top spots; community flagging |
| Instagram/platform blocks link-in-bio traffic | Low | Diversify entry points; direct search traffic via SEO |
| Big platform (Meta) copies the idea | Low | Move fast, build creator relationships, data moat |

---

## 9. Open Questions

- [ ] Final brand name — Raunaq? Yakeen? Zarb? Crayvo? Something else?
- [ ] Domain strategy — .in or .com?
- [ ] How do creators verify they actually own the brand (not impersonation)?
- [ ] Do we allow digital products (courses, presets, templates)?
- [ ] How do we get the first 100 creators? Direct outreach or self-serve?
- [ ] Commission model for Phase 2 — revenue share or flat fee?

---

## 10. Phase Roadmap

| Phase | Timeline | Key Deliverable |
|---|---|---|
| Phase 1 | Month 1 | Creator listing + public profile pages + discovery feed |
| Phase 2 | Month 2–3 | Analytics for creators, affiliate tracking, ratings |
| Phase 3 | Month 4–6 | Brand/advertiser side, promoted listings, verified creator program |
| Phase 4 | Month 6–12 | Mobile app, regional language support, international creators |
