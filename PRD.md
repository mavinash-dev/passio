# Product Requirements Document

## Passio *(working name)*

**Version:** 2.0 — Final
**Author:** Avinash
**Date:** 2026-06-22
**Status:** Signed off — Ready to build

---

## 1. What Passio Is

> **The Linktree replacement for Indian fashion creators with a real brand.**

Your followers tap your bio link and see a list. With Passio, they see your brand — full collection, your story, your aesthetic. And you see which products they actually tap.

Not Shopify — built to handle inventory, payments, shipping, and scale. Most creator fashion brands don't have those problems yet. They have one problem: no professional brand home. Passio solves that one problem without asking them to learn the other ten.
Not Linktree — a list of links is not a brand. Passio is what goes in that bio slot when you're serious.
Not Notion or Google Drive — embarrassing for a real brand.

Passio is a direct Linktree replacement — not something that sits inside a Linktree. A creator who puts Passio in their bio gives their followers a full brand experience: product grid, brand story, click analytics, real aesthetic. In 20 minutes. Free.

**What Passio is not right now:** A discovery platform, a marketplace, a search engine, or a place buyers come to browse. That is Phase 3. Pretending otherwise is a lie that will mislead every build decision.

**The long arc:** Creator storefront → Cross-creator browsing → Full discovery engine → Payments → Creator brand OS.

---

## 2. The Problem

### For fashion creators
Indian fashion micro-creators (10K–500K followers) sell through Instagram Stories, WhatsApp, and payment links. Their current infrastructure:

- Instagram profile (content + DMs)
- WhatsApp number (orders)
- Google Drive / Canva PDF (catalogue)
- Razorpay / Instamojo link (payment)
- Linktree or bare Shopify (bio link)

The result: no professional brand home. No product grid. No brand story. No analytics showing what sells.

Shopify is the right tool — once a brand is managing inventory, fulfilling at volume, running paid ads, and needs a full checkout. Most creator fashion brands aren't there yet. They need a branded catalogue and a way to capture buying intent, not an operations platform.

**The gap:** A tool built specifically for Instagram-native fashion creators who need to look like a real brand without Shopify's complexity or overhead.

### For buyers
When a buyer sees a creator's fashion collection in Stories and wants to see the full range — there's nowhere to go. They DM, wait, get a catalogue PDF, maybe get a reply. The friction kills the impulse.

A proper product page — browsable, shareable, always live — converts that impulse into a click.

---

## 3. Who Passio Is For

**For:**
- Fashion creators selling through Instagram (Stories, DMs, bio link)
- Brands with 10K–500K followers who own or make what they sell
- Creators currently using Linktree, WhatsApp catalogues, Google Drive PDFs, or Canva links
- People who think Shopify is too much, too soon

**Not for:**
- Large D2C brands already on Shopify — they don't need this
- Multi-category marketplaces or resellers
- Brands managing real inventory at volume
- Non-fashion categories — Phase 1 is fashion only, full stop

Being clear about this at sign-up prevents onboarding the wrong creators and diluting the product.

---

## 4. The Three Users

### User 1: Admin (Avinash)
- Reviews and approves creator sign-up applications
- Can edit any creator page or product
- Sees platform analytics: active creators, total clicks, top brands
- Manages a simple "Browse all" page showing live creators

### User 2: Buyer
Arrives from an external link — always.

- Creator's Instagram bio: `passio.in/brandname`
- Passio's own Instagram featuring a creator brand
- Google search for a creator's brand name

The buyer lands on a creator's brand page, browses the collection, taps a product, and goes to the creator's store. No Passio account needed. No checkout on Passio. Passio never touches the transaction.

A "Browse all" page exists — but it is not the primary entry point. It's where curious buyers go after landing on one creator's page.

### User 3: Creator / Fashion Brand Owner

**Type A — No website:**
Passio IS their website. `passio.in/handle` is their bio link. Products link to WhatsApp, Razorpay, Instamojo, or any URL. Passio replaces the Linktree + PDF catalogue combo with something that actually looks like a brand.

**Type B — Has a website:**
Passio is additional distribution. Their products link to their own site. They get a Passio page that drives buyers from outside their existing audience and shows them how much traffic Passio sent.

Both types get the same product experience.

---

## 4. Creator Experience

### 4.1 Sign Up
- Google or Phone OTP (Supabase Auth)
- Required at sign-up: brand name, handle, category tag, Instagram handle, one photo
- Submitted for admin review — not public until approved

**Approval criteria (must meet all three):**
1. Sells fashion (not reselling — must own/make/curate the product)
2. Has a real public presence (Instagram with posts, or existing website)
3. India-based brand

Rejection sends an email with reason. Creator can reapply.

### 4.2 Brand Page Builder
Creator picks a theme and fills in their content. Three sections:

**Brand identity**
- Hero photo (the main visual — brand shoot, not necessarily the creator's face)
- Creator portrait (optional — the "face behind the brand")
- Brand name + tagline
- Brand story (plain text, no rich editor — 3–5 sentences max encouraged)
- Instagram handle, website URL

**Products**
- Add up to 20 products at launch (limit raised as platform scales)
- Per product: name, 1–3 photos, price (text field), optional buy link
- No buy link = "DM to order" button linking to Instagram DMs
- Drag to reorder

**Settings**
- Change theme anytime
- Toggle products active/inactive
- Delete account

### 4.3 Analytics Dashboard
After login, creator sees:

- Total page views (7 days / 30 days / all time)
- Total product click-throughs (per product)
- Top 3 products by clicks
- Traffic sources (Instagram, direct, Google, other)

This is the retention hook. A creator who sees "847 people visited your page last month, 203 tapped the Blue Petal dress" has a reason to stay, update their products, and tell other creators.

---

## 5. Themes

Three themes at launch. Creator picks one. More themes added based on creator demand — this is a growth mechanic.

| Theme | Feel | Built for |
|---|---|---|
| **Editorial** | Warm off-white (#FAFAF8), Playfair Display serif, story leads, full-width hero | Ethnic wear, sarees, handloom, occasion wear |
| **Minimal** | White, Inter sans-serif, product grid first, clean and modern | Co-ords, western fusion, contemporary Indian fashion |
| **Bold** | Dark background, large type, high-contrast images | Streetwear, statement pieces, experimental fashion |

All themes: mobile-first, fully responsive, server-side rendered (Google-indexable).

---

## 6. The "Browse All" Page

A simple grid of all active creator brands on Passio. Fashion only — no categories needed yet.

- Creator card: hero photo, brand name, one-line tagline, niche tag
- Ordered by: newest first (no algorithm)
- Admin can pin 1–3 creators to the top

This is not the product. This is a bonus. The product is the individual creator page.

When there are 50+ creators: add sub-category filters (Ethnic / Contemporary / Handloom / Streetwear).
When there are 200+ creators and real buyer behaviour data: build the discovery engine.

---

## 7. Redirect Tracker

Every "Buy" click → `/go/[product-id]` → logs click → 307 redirect to creator's store or Instagram DM.

Logs: timestamp, product ID, creator ID, referrer, hashed IP (DPDP Act compliance), user agent.

307 redirect (not 301) — prevents browser caching.

Bot filtering: ignores common bot user agents before logging.

This data is the entire creator analytics system. It is non-negotiable from Day 1.

---

## 8. What Is Not In Phase 1

| Feature | When |
|---|---|
| Buyer accounts / saved brands | Phase 2 — when there are 50+ creators worth saving |
| Search | Phase 2 — when there are 50+ creators |
| Sub-category filters | Phase 2 — when there are 50+ creators |
| Second fashion sub-category or new verticals | Phase 2 — after fashion has 50+ active creators |
| Cross-creator recommendations ("you might also like") | Phase 3 |
| Algorithm / personalised feed | Phase 3 — needs real buyer behaviour data |
| Payments / checkout on Passio | Phase 3 |
| More than 3 themes | On-demand — as creators request specific aesthetics |
| Creator collaboration tools | Phase 4 |
| Mobile app | Phase 4 |
| Reviews or ratings | Phase 3 |

---

## 9. User Journeys

### Buyer
```
Sees a fashion brand on Passio's Instagram (or creator's own Instagram)
  ↓
Taps bio link → lands on creator's Passio page
  ↓
Browses brand story + product grid
  ↓
Taps product → /go/[id] logs click → creator's store / WhatsApp DM
  ↓
Buys directly from creator
  ↓
(Optional) Explores "Browse all" page to find similar creators
```

### Creator (Type A — no website)
```
Hears about Passio from another creator or Passio's Instagram DM outreach
  ↓
Signs up → Google or Phone
  ↓
Picks theme → fills brand story + photos → adds products (20 min total)
  ↓
Admin approves → page goes live
  ↓
Replaces Linktree with passio.in/handle in Instagram bio
  ↓
Dashboard shows: page views, product clicks, top products
  ↓
Updates products each season / collection drop
```

### Creator (Type B — has website)
```
Same sign-up and build flow
  ↓
Products link to their own website's product pages
  ↓
Passio replaces their Linktree in bio (or is added if they had no link tool)
  ↓
Dashboard shows how much traffic Passio sent them vs. other sources
```

### Admin
```
New creator application arrives → email notification
  ↓
Reviews: brand name, Instagram, photos, product category
  ↓
Approves (page goes live) or rejects (email sent with reason)
  ↓
Pins 1–3 creators to top of Browse All page
  ↓
Monitors: total creators, total clicks, flagged content
  ↓
Edits any page or product if needed
```

---

## 10. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR for SEO, fast builds, Vercel native |
| Styling | Tailwind CSS v4 | Utility-first, theme switching via CSS vars |
| Database | PostgreSQL via Supabase | Auth + DB + Storage in one |
| Auth | Supabase Auth | Google + Phone OTP out of the box |
| Storage | Supabase Storage | Creator and product photos |
| Hosting | Vercel | Auto-deploy on push, preview URLs |
| Fonts | Playfair Display + Inter via next/font | Editorial + clean sans pairing |

---

## 11. Success Metrics

The metric that matters most in Month 1:

> **How many creators replaced their Linktree with their Passio page.**

That is the signal the product is good enough to trust with their audience. Everything else is secondary.

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Active creators (approved, live) | 10 | 40 | 100 |
| Creators using Passio as bio link | 5 | 25 | 70 |
| Monthly product click-throughs | 300 | 6,000 | 35,000 |
| Creator monthly active (logged in + updated something) | 80% | 65% | 55% |
| Passio Instagram followers | 300 | 2,000 | 8,000 |

What we are NOT measuring yet: buyer accounts, repeat visits, time on site. We don't have the buyer volume to make those meaningful. Measure them in Phase 2.

---

## 12. Go-to-Market

**Before writing a single line of code — validate the bio link switch.**

DM 10 fashion creators. Show them a design mockup or a static example page. Ask one question: "Would you replace your current bio link with this?" If 7 out of 10 say yes, build. If fewer say yes, find out why first. The entire business depends on creators making that switch — testing it costs nothing, getting it wrong costs months.

**Step 1 — Pre-launch (before self-serve exists):**
Pick 5 fashion creators. Build their Passio pages manually — no dashboard, no auth, just static pages that look great. DM them the link. Watch what they do with it. Did they swap their Linktree? Did they share it? Did they ask for changes? That behaviour tells you more than any PRD.

**Step 2 — Soft launch:**
Open self-serve sign-ups. DM 50 fashion creators: "We built a tool for creators like you. Free. Here's what [Creator A]'s page looks like." Link to one of the 5 seeded pages. The page is the pitch — not a description of the page.

**Step 3 — Content engine:**
Start Passio's Instagram. One creator brand feature per week. Tag the creator. They reshare. Their followers discover Passio. Repeat.

**Step 4 — Word of mouth:**
A creator who gets 200 clicks in a month tells other creators. The analytics dashboard is the word-of-mouth trigger — that number is the story they share in creator WhatsApp groups.

No paid ads in Phase 1. No SEO strategy (it takes 12 months). Instagram is the only channel that matters.

---

## 13. The Real Moat

Not technology. Not design.

**The moat is editorial trust.**

Passio's Instagram is not just a link aggregator. It is a media brand that discovers and spotlights creator fashion brands before they go mainstream. Like Highsnobiety did for streetwear. Like Humans of Bombay did for stories.

When buyers trust Passio's taste, they follow Passio's Instagram to discover new brands — not just to visit brands they already know. That is when Passio becomes a discovery engine. That is Phase 3. You build trust first. Algorithm second.

The reason Instagram Shops, Myntra, and Nykaa can't replicate this: editorial taste is not a feature you ship. It is a brand you build over years.

---

## 14. Open Questions

- [ ] **Brand name** — Raunaq, Crayvo, Flayr, or other? Blocks domain, Instagram handle, and all outreach. Decide this week.
- [ ] **Domain** — .in or .com?
- [ ] **First 5 creators** — Who are they? Need names before building starts so pages can be tested with real content.
- [ ] **Creator rejection email** — What does it say exactly? Tone matters here.
- [ ] **Photo limit per product** — 3 photos feels right. Confirm before building upload flow.
