# Product Requirements Document

## Passio *(working name)*

**Version:** 1.0
**Author:** Avinash
**Revised:** 2026-06-22
**Status:** Active — Rebuilding

---

## 1. What Passio Is

> **A platform where Indian creator-owned physical brands build their own storefront, and buyers discover them through a personalised feed.**

Passio is the home for India's creator economy — physical product edition. Creators sign up, build their brand page (themes, photos, story, products), and get discovered by buyers who've told Passio what they care about. The feed is driven by interests and behaviour, not manual curation.

**The long arc:** Discovery → Creator Storefront → Payments → Creator Brand OS.
(Same destination as before. Different, better path to get there.)

---

## 2. Problem Statement

**For creators:**
- Indian micro-creators (10K–500K followers) sell physical products (fashion, skincare, food, fitness) through Instagram Stories and WhatsApp.
- Their reach is permanently capped at their existing followers. New buyers outside their audience can't discover them.
- They have no professional brand home — no website, no analytics, no storefront infrastructure.
- WhatsApp ordering is unscalable, untraceable, and chaotic.

**For buyers:**
- No single destination to discover creator-owned brands by category or interest.
- Trust already exists (they follow these creators), but finding the actual product is friction-heavy.
- Nykaa has established labels. Meesho has resellers. Nothing exists for creator-owned physical brands.

**The gap:** Creator-owned physical brand discovery, India, all categories — does not exist.

---

## 3. The Three Users

### User 1: Admin (Avinash)
The platform operator. Has full visibility and control over everything.

**What they do:**
- Review and approve new creator sign-ups before they go live
- Feature/unfeature creators on curated sections of the feed
- Full CRUD override on any creator page or product
- View platform-wide analytics: total clicks, active creators, top brands, top products
- Manage platform configuration (categories, theme options, featured slots)

**What they don't do:**
- Manually build creator pages — creators do that themselves now
- Manually seed listings — all inbound from Day 2 onwards

---

### User 2: Buyer (End User)
18–35 Indian consumers open to discovering creator-owned brands.

**What they do:**
- Browse a personalised discovery feed (no account required to browse)
- Optionally create an account to set interests and get a better feed
- Filter by category, price range, niche
- Click a product → land on the creator's Passio page → tap "Buy" → go directly to creator's store
- Save brands they like (requires account)
- Share brand/product pages

**What they don't do:**
- Check out on Passio (Phase 3+)
- See any "claimed" or "unclaimed" state — that concept does not exist for them
- See admin controls of any kind

**Buyer account is optional.** Browsing works without an account. An account unlocks: personalised feed, saved brands, purchase history (Phase 3+).

---

### User 3: Creator / Influencer
Indian creator who owns a physical product brand.

Split into two modes based on whether they have their own website:

#### Creator WITHOUT their own website
- Passio **is** their brand website and storefront
- They get `passio.in/theirhandle` — goes directly in their Instagram bio
- Their products link to WhatsApp, payment links, or any URL they provide
- Passio is their professional brand home

#### Creator WITH their own website (e.g. bramarambaa.com)
- Passio is a **discovery and traffic layer** on top of their existing presence
- Their products on Passio link directly to their website (their checkout, their UX)
- Passio drives new buyers to them from outside their existing audience
- They still get full analytics: how many people Passio sent them

**Both types get the same creator experience on Passio.**

---

## 4. Creator Experience (Core)

### 4.1 Sign Up
- Auth via: Instagram OAuth, Google (Gmail), or Phone number (OTP)
- Powered by Supabase Auth
- Sign-up requires: brand name, handle, category, short bio, at least one product photo
- Account goes into **pending review** — not visible to buyers until admin approves

### 4.2 Brand Page Builder
Creators build their own page. No drag-and-drop (that's a 12-month build). Instead: **3 curated themes** they pick from, then fill in their content.

**What they can set:**
- Theme (3 options — see Section 5)
- Hero photo (brand image, not their face necessarily)
- Creator photo / author portrait
- Brand story (rich text, limited formatting — bold, italic, line breaks only)
- Category and niche tags
- Instagram handle, YouTube, other socials
- Products (see 4.3)

**What Passio controls (not editable by creator):**
- Layout and spacing within their chosen theme
- Font choices (Passio brand fonts only)
- Passio nav and footer (platform chrome)
- Analytics section (Passio-generated, not editable)

### 4.3 Product Management
Creators add and manage their own products.

Each product:
- Name, short description
- Price (or price range)
- Product photo (up to 5 per product)
- Buy link — optional (WhatsApp, Shopify, Instamojo, any URL)
- If no buy link: shows "DM to order" with Instagram link

No checkout on Passio in Phase 1 or 2. Direct to creator's own store.

### 4.4 Creator Analytics Dashboard
Visible to creator after login:
- Total profile views (last 7 days, 30 days, all time)
- Total product click-throughs (tracked via `/go/[id]` redirect)
- Top performing products by clicks
- Traffic sources (Passio feed, direct, external)
- Follower count displayed to buyers — creator can update manually

### 4.5 Creator Settings
- Edit all profile fields
- Change theme
- Add/remove products
- Connect/disconnect social accounts
- Delete account (soft delete — admin notified)

---

## 5. Themes

Three themes at launch. More added based on creator requests (this is a growth mechanic — creators ask for new designs, we ship them, they upgrade).

| Theme | Feel | Best for |
|---|---|---|
| **Editorial** | Warm off-white (#FAFAF8), Playfair Display serif, full-width hero, story-first | Fashion, lifestyle, skincare |
| **Minimal** | White, Inter sans-serif, grid-first, product-forward | Food, supplements, functional products |
| **Bold** | Dark background, large type, high-contrast product photos | Streetwear, fitness, statement brands |

All themes are mobile-first, fully responsive.

---

## 6. Discovery Feed (Buyer Experience)

### 6.1 Algorithm

The feed is personalised based on:
- **Declared interests** — buyer sets on sign-up or first visit (Fashion / Skincare / Food / Fitness / Lifestyle / All)
- **Behaviour signals** — what they click, how long they view a page, what they save
- **Recency** — newly joined creators get a boost for 2 weeks
- **Engagement** — creators with high click-through rates rank higher
- **Admin featured slots** — Avinash can pin 1–3 creators at the top of the feed at any time

No interest set = show all categories, ranked by engagement + recency.

### 6.2 Feed Layout
- Featured banner (admin-curated, rotating)
- Personalised grid below (infinite scroll)
- Category filter pills: All / Fashion / Skincare / Food / Fitness / Lifestyle
- Creator cards: brand photo, brand name, one-line tagline, top product thumbnails

### 6.3 Creator Page (Public)
Rendered in creator's chosen theme. Contains:
- Hero image
- Brand name + creator name
- Brand story
- Product grid (tap → direct buy, no intermediate product page)
- Social links

No "claimed/unclaimed" state. No Passio admin chrome visible. Just the brand's page.

---

## 7. Redirect Tracker

Every product "Buy" click goes through `/go/[product-id]` before reaching the creator's store.

Logs: timestamp, product ID, creator ID, referrer, hashed IP (DPDP Act compliance).

This data populates creator analytics. It is the core value proof — "Passio sent 847 people to your products last month."

307 redirect (not 301) to prevent browser caching clicks.

---

## 8. Auth

Powered by Supabase Auth.

| User type | Auth required? | Methods |
|---|---|---|
| Buyer (browsing) | No | — |
| Buyer (personalised feed, saved brands) | Yes | Google, Phone OTP |
| Creator | Yes | Instagram OAuth, Google, Phone OTP |
| Admin | Yes | Email + password (single account, Avinash only) |

Roles stored in `user_roles` table. Supabase RLS enforces access at DB level.

---

## 9. What's Not In Phase 1

- Payments / checkout — Phase 3
- Search — add when there are 50+ creators
- Reviews and ratings — Phase 3
- Creator-to-creator collaboration tools — Phase 4
- Mobile app — Phase 4
- Drag-and-drop page builder — Phase 4 (if themes prove insufficient)
- Multi-admin / team accounts — Phase 3
- Brand deals / sponsorship marketplace — Phase 5

---

## 10. User Journeys

### Buyer (no account)
```
Lands on Passio home
      ↓
Selects interest category (or skips — sees all)
      ↓
Browses personalised feed
      ↓
Clicks creator card → creator's brand page (in their theme)
      ↓
Taps product → /go/[id] logs click → creator's store
      ↓
Buys directly from creator
```

### Buyer (with account)
```
Returns to Passio
      ↓
Feed is personalised based on past behaviour
      ↓
Saved brands section shows their favourites
      ↓
Same buy flow as above
```

### Creator (without own website)
```
Hears about Passio (Instagram, word of mouth, DM from Avinash)
      ↓
Signs up → Instagram / Google / Phone
      ↓
Picks theme → fills in bio, story, photos
      ↓
Adds products with WhatsApp buy links
      ↓
Submits for review → Admin approves → goes live
      ↓
Puts passio.in/theirhandle in Instagram bio
      ↓
Sees analytics: views, clicks, top products
```

### Creator (with own website)
```
Same sign-up flow
      ↓
Products link to their website's product pages
      ↓
Passio = discovery layer that drives new buyers to them
      ↓
Analytics shows how much traffic Passio sent
```

### Admin
```
Logs into /admin
      ↓
Reviews pending creator applications
      ↓
Approves or rejects (with reason)
      ↓
Features 1–3 creators on home feed
      ↓
Monitors platform analytics
      ↓
Can edit any creator page or product if needed
```

---

## 11. Data Model (High Level)

```
users              — Supabase Auth managed
user_roles         — admin | creator | buyer
creator_profiles   — linked to user, holds all brand page data
products           — linked to creator_profile
redirect_logs      — every /go/[id] click
saved_brands       — buyer user_id → creator_profile_id
feed_features      — admin-pinned slots on home feed
```

---

## 12. Success Metrics

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Creators signed up | 10 | 75 | 300 |
| Monthly click-throughs tracked | 500 | 10,000 | 75,000 |
| Buyer accounts (optional) | 50 | 500 | 3,000 |
| Creator retention (still active at 3mo) | — | 70% | — |

---

## 13. Open Questions

- [ ] Final brand name — Raunaq, Crayvo, Flayr, or other? (Blocks domain + Instagram)
- [ ] Domain — .in or .com?
- [ ] Do buyers need an account to set interests, or do we store interest preference in a cookie for anonymous users?
- [ ] How many creator applications do we manually review before automating it?
- [ ] What is the rejection criteria for a creator application? (Must own brand, must have physical product, must have some public presence)
