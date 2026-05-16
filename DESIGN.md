# Design Document
## Passio — Creator Brand Discovery Platform

**Version:** 0.1
**Created:** 2026-05-16

---

## 1. Design Principles

1. **Discovery first** — Every page should make you want to explore more. Think Pinterest meets Nykaa, not a spreadsheet of products.
2. **Creator as hero** — The creator's face, story, and passion come before the product. People buy from people.
3. **Trust signals everywhere** — Follower counts, platform badges, verification ticks. Buyers need to know this is a real creator.
4. **Zero friction for buyers** — Browse without logging in. Find → click → buy. Three steps maximum.
5. **Premium but warm** — Not cold like Amazon. Not garish like a sale site. Warm, editorial, aspirational — like a magazine that you can shop from.

---

## 2. User Flows

### Flow 1: Creator Onboarding
```
Landing → "List your brand free" CTA
  → Sign up (Clerk)
  → Brand setup form (name, niche, bio, social handles, follower count)
  → Upload profile photo
  → List first product (name, photo, description, price range, buy link)
  → Preview their public page: passio.in/[handle]
  → Share prompt: "Put this in your Instagram bio"
  → Done — listed in < 10 minutes
```

### Flow 2: Buyer Discovery
```
Lands on Passio (from creator's bio / Google / word of mouth)
  → Browses home feed by category
  → Taps a creator card they like
  → Views creator profile + all their products
  → Taps a product → product detail page
  → Clicks "Where to buy" → creator's actual store (new tab)
  → Done — back to Passio to discover more
```

### Flow 3: Creator Page as Marketing Tool
```
Creator lists on Passio
  → Gets passio.in/[handle]
  → Puts it as their Instagram link in bio
  → Posts a story: "Shop my brand →" with Passio link
  → New followers land on their Passio page
  → Discover all their products in one place
  → Click through to buy
  → Creator gets customers they never had before
```

---

## 3. Key Screens

### Screen: Home / Discovery Feed
- **Purpose:** Main entry for buyers — browse and discover creator brands
- **Layout:**
  - Hero banner: "Shop from India's creators" with search bar
  - Category pills: Skincare | Food | Fitness | Fashion | Lifestyle | Digital
  - Curated section: "Trending this week" — creator cards
  - Section: "New on Passio" — recently listed
  - Section per category: top creators
- **Creator card shows:** Profile pic, name, niche badge, follower count, 2-3 product thumbnails

### Screen: Creator Profile Page (`/[handle]`)
- **Purpose:** The creator's permanent brand home — what they share in their bio
- **Layout:**
  - Top: large profile photo + name + niche + platform badges + follower count + verification tick
  - Bio: 2-3 line brand pitch
  - Products grid: all products, 2-col mobile / 3-col desktop
  - "Follow on Instagram" / "Follow on YouTube" buttons
  - Share button (top right)
- **Feel:** Editorial, like a brand's own page, not a product listing

### Screen: Product Page (`/p/[product-slug]`)
- **Purpose:** Individual product — where buyer decides to click through
- **Layout:**
  - Large product photo
  - Product name, description, price range
  - "Where to buy →" button (prominent, goes to creator's store)
  - Creator card below: photo + name + follower count + "See all products"
  - Share button
- **Key:** "Where to buy" is the ONLY CTA. No cart, no checkout.

### Screen: Creator Dashboard (`/dashboard`)
- **Purpose:** Creator manages their listing
- **Sections:**
  - Profile completeness score + tips
  - "Your page": preview link + copy button
  - Products: add/edit/delete
  - Basic stats: page views this week, click-throughs (Phase 2)
  - "Share your page" prompts with pre-written Instagram caption

### Screen: Creator Onboarding (`/setup`)
- **Purpose:** Get creator listed fast (< 10 minutes)
- **Steps:**
  - Step 1: Brand basics (name, niche, bio)
  - Step 2: Social handles + follower count
  - Step 3: Profile photo upload
  - Step 4: First product (name, photo, price, buy link)
  - Step 5: Preview + share

---

## 4. Design Decisions

### Warm editorial feel, not marketplace grid
- **Chose:** Magazine/editorial layout — big creator photos, editorial sections, curated feel
- **Because:** Amazon and Flipkart feel transactional. Passio should feel like discovering something special. Creator = personality, not inventory.
- **Trade-off:** Less products per screen, but higher engagement per creator

### Creator photo > product photo on cards
- **Chose:** Creator face is the hero on discovery cards
- **Because:** Buyers trust the creator first, product second. "I want to buy from Komal Pandey" before "I want to buy this dress."
- **Trade-off:** Less product detail at-a-glance, but higher click-through

### No buyer accounts in Phase 1
- **Chose:** Browsing is fully public, no login wall
- **Because:** Every extra step loses buyers. Discovery should be frictionless.
- **Trade-off:** No wishlist/saves feature until Phase 2

---

## 5. Component Reference

| Component | Used In | Notes |
|---|---|---|
| CreatorCard | Home feed, search results, category pages | Photo + name + niche + follower count + product thumbnails |
| ProductCard | Creator profile, product grid | Photo + name + price range + "View" |
| PlatformBadge | Creator profile, creator card | Instagram/YouTube/TikTok with follower count |
| VerifiedBadge | Creator profile, creator card | Blue tick for verified creators |
| BuyButton | Product page | Big, prominent, "Where to buy →" — only CTA that matters |
| CategoryPill | Home feed | Horizontal scroll on mobile |

---

## 6. Design Resources

- Figma: TBD (build directly in code for Phase 1)
- Design system: Custom, editorial — inspired by Nykaa + Vogue India + Linear
- Fonts: Inter (UI) + Playfair Display or similar serif (hero headlines — warmth + premium)
- Colors:
  - Background: `#FAFAFA` (warm white — not cold white like Amazon)
  - Surface: `#FFFFFF`
  - Border: `#E5E5E5`
  - Text primary: `#111111`
  - Text secondary: `#737373`
  - Accent: `#E85D26` (warm orange — passion, energy, India-feel — NOT blue like every other startup)
  - Verified: `#3B82F6` (blue tick)
  - Positive: `#22C55E`
