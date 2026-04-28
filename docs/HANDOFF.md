# Como Boat Rental — handoff to the dev

This document is the handoff between David's foundation work and the
front-end developer who'll take the site forward for Loris and
Claudio. It covers:

1. **What's already in the code** — every SEO and content surface that
   currently ships
2. **What's left to do in code** — concrete tasks the dev should pick
   up next
3. **What Loris (or whoever runs the business) needs to do off-site**
   — Google Business Profile, OTA listings, booking system, press
4. **How to extend the site** — adding tours, destinations, blog
   posts, locales, schema types

If you're picking this up cold, read in order — sections build on
each other.

---

## 1. What's already in the code

### Architecture

- **Next.js 16, App Router, `output: "export"`.** The site is a
  static-export single-page app with a multi-page architecture for
  SEO. Build produces an `out/` folder you can host anywhere
  (currently Vercel from GitHub).
- **Per-locale routing** under `app/[locale]/...`. Visit `/`, get
  redirected to your browser's preferred language (defaults to
  `/en/`). Each of `/en/`, `/it/`, `/ru/`, `/ar/` is a real
  crawlable URL with its own metadata, JSON-LD, hreflang and Open
  Graph block.
- **60 static pages** generated at build:
  - 4 homepage variants (one per locale)
  - 4 tours × 4 locales = 16 tour pages
  - 6 destinations × 4 locales = 24 destination pages
  - 4 FAQ pages
  - 4 reviews pages
  - 1 blog post in 2 locales (EN, IT) = 2 blog pages
  - `/sitemap.xml`, `/robots.txt`
  - root `/` redirect

### SEO infrastructure

The dev should know where to find the things people will ask them to
update.

| Concern | File | Notes |
|---|---|---|
| Site-wide constants (URL, phone, address, geo, founders, rating) | `app/seo.ts` | Single source of truth. Update here, not in 12 places |
| JSON-LD schema builders | `app/jsonld.ts` | LocalBusiness, TouristTrip, Product, Review, AggregateRating, FAQPage, BreadcrumbList, Place. Returns plain objects; pages JSON.stringify them into `<script type="application/ld+json">` |
| Sitemap (auto-generated) | `app/sitemap.ts` | Lists every locale × page with hreflang alternates per entry |
| Robots (auto-generated) | `app/robots.ts` | Allow-all + sitemap pointer |
| Manifest | `public/manifest.webmanifest` | Wired into `app/layout.tsx` |
| Per-locale title/description | `app/[locale]/layout.tsx` | The metadata block for the homepage in each locale |

### Content data

All long-form copy lives in `app/content/` as plain TypeScript objects.
The dev never has to dig through component files to update copy.

| File | Contents |
|---|---|
| `app/content/tours.ts` | 4 tours × 4 locales — full copy, itinerary, included/not-included, FAQs, prices |
| `app/content/destinations.ts` | 6 destinations × 4 locales — guide copy, "good to know", cross-link to tours |
| `app/content/faq.ts` | 12 Q&As × 4 locales — homepage FAQ schema + `/<locale>/faq/` |
| `app/content/blog.ts` | One seed post in EN + IT |

Every locale is keyword-targeted for its own search market:

- **Italian**: hand-crafted for "noleggio barche como" (~3,600/mo),
  "tour barca lago di como" (~1,200/mo), "gita in barca bellagio"
  (~800/mo), "noleggio barca villa balbianello" (~450/mo). Direct
  competitors Il Medeghino and Taxi Boat Varenna dominate these
  queries today.
- **English**: hand-written for the global English market — "lake
  como boat rental", "lake como boat tour", "private boat tour
  bellagio", "villa balbianello boat tour", "lake como sunset
  cruise". The metaTitle and metaDesc on every tour and
  destination page hits these patterns.
- **Russian**: targeted for the Russian luxury-travel market that
  still reaches Lake Como via Dubai and Istanbul — "Аренда лодки
  на озере Комо", "Прогулка на лодке Комо", "Вилла Бальбьянелло
  Casino Royale", "VIP чартер озеро Комо". Body copy is 200-400
  words per page (parity with EN/IT), with full itinerary detail
  and the cinematic references Russian travellers know.
- **Arabic**: Gulf-market focused (UAE, Saudi, Kuwait — the
  highest-margin Arabic-speaking segment for Lake Como) —
  "تأجير قارب بحيرة كومو", "جولة بحرية بحيرة كومو", "فيلا جورج
  كلوني", "شهر العسل بحيرة كومو". Acknowledges Gulf-traveller
  preferences (privacy, halal-friendly options on the full-day
  charter) without forcing them.

The Russian and Arabic copy is competent at SEO level (right
keywords, right structure, right length) but not written by a
native speaker. A native Russian copywriter and a Gulf-market
Arabic copywriter would sharpen cadence and idiom further — see
"What's left to do, G" below.

### Schema types covered

- `LocalBusiness` + `TravelAgency` (with founders, geo, hours, sameAs)
- `WebSite`
- `AggregateRating` (4.9/87, on every page)
- `Review` × 3 testimonials (on /reviews + homepage)
- `Product` × 2 boats with `Offer` + `UnitPriceSpecification`
- `TouristTrip` × 4 tours with `ItemList` itineraries and `Offer`
- `FAQPage` (homepage abbreviated, `/faq` full)
- `BreadcrumbList` (every page)
- `TouristAttraction` / `Place` × 6 destinations with `geo`
- `Article` (blog)

### Other shipped surfaces

- **Editorial preview toggle** (top-right floating panel): switch
  between 3 copy variants × 5 colour palettes. Stored in
  localStorage. **For client review only — does not affect SEO**
  (metadata is variant-independent and baked at build time).
  Remove when Loris signs off; see "What's left to do" below.
- **Live Instagram feed**: `scripts/sync-instagram.mjs` runs as
  `prebuild` and pulls the latest 6 public posts from
  `@comoboatrental` into `public/instagram-feed.json` with each tile
  carrying its accessibility caption as alt text.
- **Locale toggle**: navigates between `/en/`, `/it/`, `/ru/`, `/ar/`
  via real URLs (not JS state). The runtime `<html lang>` and `dir`
  flip pre-paint via a tiny inline script in `app/layout.tsx`.

---

## 2. What's left to do in code

Pick up in order of impact-per-hour. None are blockers — the site
ships and ranks competitively as-is.

### A. Image optimisation (Lighthouse hit otherwise)

The README's longest-standing TODO. All photography is JPG, none
have AVIF/WebP variants, none carry width/height hints on every img
tag (most do, some don't). Cumulative Layout Shift is mediocre.

The clean fix:

- Add `sharp` to `dependencies` (already in `trustedDependencies`)
- Write `scripts/optimise-images.mjs` that scans `public/images/`
  on `prebuild`, generates `.avif` and `.webp` siblings, and emits
  a manifest mapping `original → { avif, webp, w, h }`
- Replace `<img src=…>` with `<picture>` blocks: AVIF source →
  WebP source → JPG fallback
- Use the manifest to inject width/height attributes everywhere

Estimated time: 2–3 hours. Lighthouse Performance and CLS scores
will jump 5–15 points.

### B. Real OG cover image

`public/images/hero-sunset.jpg` is 1586×2410 (portrait crop). The
metadata declares 1200×630 (the OG default). Today it works but the
crop isn't perfect.

Generate `public/images/og-cover.jpg` as a proper 1200×630 with the
wordmark + tagline burned in (per locale ideally — 4 versions). Wire
into `app/[locale]/layout.tsx` `openGraph.images`.

### C. Better favicon set

`public/favicon.ico` is the existing 32×32 multi-resolution file.
For PWA scoring and proper Apple Touch / Android Home Screen icons,
generate:

- `public/icon-192.png` (192×192)
- `public/icon-512.png` (512×512)
- `public/apple-touch-icon.png` (180×180)
- `public/safari-pinned-tab.svg` (monochrome)

Update `manifest.webmanifest` icons array and `app/layout.tsx`
metadata.icons. The simplest source: generate from a clean SVG of
the "Como Boat Rental" wordmark (or a boat silhouette) using
[realfavicongenerator.net](https://realfavicongenerator.net).

### D. Lock in the variant + palette

Right now visitors see a floating toggle in the top-right. Once
Loris signs off on a combination:

1. Edit `DEFAULT_VARIANT` and `DEFAULT_PALETTE` at the top of
   `app/components/HomePage.tsx` to the chosen codes
2. Delete the entire `<div className="vp-toggle">…</div>` block
3. Delete the `===== Variant + Palette toggle =====` rules at the
   bottom of `app/globals.css`

The variant override copy and palette CSS stay where they are — the
toggle just becomes hard-coded.

### E. Booking widget on tour pages

When Loris signs up for **Bokun** (see section 3 below), each tour
page gets an embedded availability calendar above the FAQ block.
Bokun provides an iframe snippet — drop it into
`app/[locale]/tours/[slug]/page.tsx` between the CTA block and the
FAQ block.

### F. Blog cadence

The blog has a single seed post. Adding posts is mechanical:

1. Append a slug to `BLOG_SLUGS` in `app/content/blog.ts`
2. Add an entry to the `blog` object with EN + IT copy
3. `bun run build` regenerates the sitemap and adds the new
   post to `/<locale>/blog/<slug>/`

Suggested next posts:
- "How to visit Villa del Balbianello by boat" (matches Nagi's #1
  ranking content)
- "Wooden boats vs fibreglass on Lake Como — what to look for"
- "Lake Como wedding proposal by boat: a planning guide"
- "George Clooney's Villa Oleandra: what you can and can't see"

### G. Russian + Arabic native-speaker pass

The RU and AR copy is keyword-targeted and the right length
(200-400 words per page, matching EN/IT). What it lacks is the
final 10-15% polish that only a native speaker brings: natural
cadence, idiom, register choices.

For Russian a native should:

- Sharpen the homepage headlines (`app/translations.ts` `ru`
  block) for cadence
- Adjust the FAQ register — current phrasing is correct but
  slightly formal for the luxury-travel market
- Verify place-name spellings (Bellagio → Беладжо, Cernobbio →
  Черноббио are the conventions used)

For Arabic a Gulf-market copywriter should:

- Sharpen the dialect register — current copy is Modern Standard
  Arabic, which is fine for SEO but slightly stiff for Gulf
  travellers used to khaleeji-influenced marketing
- Decide whether to add stronger family / multi-generational
  travel framing on the full-day charter page
- Verify place-name transliterations (Bellagio → بيلاجيو,
  Balbianello → بالبيانيلو are the conventions used)

Files: `app/translations.ts` (RU/AR sections),
`app/content/tours.ts` (RU/AR copy in each tour),
`app/content/destinations.ts` (RU/AR copy in each),
`app/content/faq.ts` (RU/AR FAQs).

### H. Performance & accessibility

Quick remaining wins:

- Add `prefers-reduced-motion` query to disable the animated boat
  on the Leaflet map (`HomePage.tsx`, the `step()` rAF loop)
- Replace `<details>` FAQ accordions with proper aria-expanded
  buttons for screen reader friendliness
- Audit `<img>` tags missing width/height (a few snuck through —
  search the codebase)
- Add `inert` polyfill for the mobile menu when closed

---

## 3. What Loris (or David) needs to do off-site

The site is a foundation. Most of the traffic for a Lake Como
operator comes from channels that don't crawl your site — they
list you in their own catalog. The site still has to *support*
those channels (with proper schema, OG cards, deep links), which
is done — but registration and ongoing engagement are off-site work.

Ranked by impact-per-hour for a Lake Como private boat operator:

### Tier 1 — must-have

#### 1. Google Business Profile

Free. Drives mobile "near me" searches. Setup ~30 min, ongoing
maintenance ~30 min/week.

**Setup checklist:**

- Sign up at [business.google.com](https://business.google.com/)
  with the email Loris uses for the business
- **Primary category**: "Boat tour agency"
- **Secondary categories**: "Tour operator", "Sightseeing tour
  agency"
- **Address**: Lungolago Viale Geno, 10, 22100 Como CO, Italy
- **Phone**: +39 340 6487574
- **Website**: https://comoboatrental.com/en/
- **Hours**: Mon–Sun 09:00–20:00 (year-round)
- **Service area**: Lake Como (the geographic region, not just Como)
- **Attributes**: "Accepts reservations", "Family-friendly",
  "Wheelchair accessible" (if true), "LGBTQ+ friendly"
- **Services list** (as separate items with descriptions + prices):
  1. *Lake Como Highlights* · 1h · €220
  2. *Balbianello & Nesso* · 2.5h · €480
  3. *Half-Day Top Villas* · 4h · €780
  4. *Full-Day Bespoke Charter* · 6–8h · from €1,400
  5. *Wedding & special-occasion charter*
  6. *Photoshoot & production charter*
- **Photos**: upload at least 25 — boats, villas seen from the
  water, captains at the helm, guests on board (with consent),
  details (mahogany dashboard, leather seating)
- **Q&A seeding**: copy the FAQ from `app/content/faq.ts` and
  pre-populate the Q&A section so visitors see answers immediately
- **Posts cadence**: weekly. Suggested rhythm:
  - Mon — weather forecast for the week + availability
  - Thu — photo of the previous weekend's tour
  - Sun (in season) — sunset photo

#### 2. Tripadvisor

Free. The single most important review platform for Lake Como
travel. Aim to rank in the top 10 for "Things to Do in Como".

- Claim profile at [tripadvisor.com/Owners](https://www.tripadvisor.com/Owners)
- Category: "Tours & Activities" → "Boat Tours"
- **Respond to every review within 48 hours** (Tripadvisor's
  algorithm rewards response velocity)
- After every tour: send guests a short follow-up message via
  WhatsApp with a Tripadvisor review link. Aim for 1 review per
  10 trips (industry baseline)
- Once you have 50+ reviews, rank starts to compound

#### 3. GetYourGuide

Highest-volume OTA for Lake Como. ~20–30% commission. Apply at
[getyourguide.supply](https://www.getyourguide.supply/).

Needs from the site (already shipped):
- AggregateRating + Review schema ✓
- TouristTrip schema per tour ✓
- 16:9 high-res images (some of `public/images/` are already 16:9;
  the dev should generate proper 1200×675 crops for each tour —
  see "What's left to do, A. Image optimisation")

#### 4. Viator (Tripadvisor Experiences)

Sister to Tripadvisor; same listing flows into both. Apply at
[supplier.viator.com](https://supplier.viator.com/sign-up-info).
Same documentation as GetYourGuide.

### Tier 2 — high-impact, lower urgency

#### 5. Bokun (booking system) — **recommended over FareHarbor**

Bokun is the Tripadvisor-owned booking system. Once integrated,
**a single calendar syncs to 50+ OTAs** (Viator, Tripadvisor,
GetYourGuide, Klook, Civitatis, Tiqets, Headout, Manawa, more).
Stops the double-booking risk that comes with manually managing
multiple OTAs.

- Sign up at [bokun.io](https://www.bokun.io)
- Set up products mirroring `app/content/tours.ts` (4 tours)
- Get the embed snippet for each tour
- Hand it to the dev to drop into the tour pages (see
  "What's left to do in code, E")

Why Bokun over FareHarbor:
- Native Viator + Tripadvisor sync (FareHarbor is owned by Booking
  Holdings, optimises for Booking.com)
- Lower setup friction in Europe
- Better support for European VAT and lake-fee invoicing

#### 6. Airbnb Experiences

Relaunched in 2025 with "Airbnb Originals". Best margin (Airbnb
takes 15–20%). Apply at
[airbnb.com/experiences](https://www.airbnb.com/host/experiences).
Faster onboarding than Viator.

#### 7. Booking.com Experiences

Newer, less transparent than the others. Reach via Booking.com
partner support. ~15–20% commission. Worth doing once Bokun is in
place — adds incremental volume without much effort.

#### 8. Italian-specific channels (often missed by foreign operators)

- **Lake Como Tourism Board** (lakecomotourism.it) — apply for
  preferred-supplier listing. Free, institutional credibility.
- **Musement** (TUI-owned) — strong for European group tours.
  Apply via [supplier.musement.com](https://supplier.musement.com/)
- **Italyscape** — B2B DMC. Reach out directly (sales@italyscape.com)
  about premium concierge partnerships
- **PagineGialle.it / Virgilio.it** — free local Italian directory
  listings. Low impact but frictionless

### Tier 3 — slow-burn, brand-building

#### 9. Press & editorial

These are slower wins (weeks-to-months) but compound for years
through backlinks.

- **HARO** (helpareporter.com) — journalists post requests for
  Lake Como sources every week. Sign up, set Italy/travel
  alerts, respond to relevant ones
- **TravMedia** (travmedia.com) — distribute press releases to
  travel publications
- **Lake Como local press** — La Provincia di Como, Corriere della
  Sera (Lombardia edition). One feature article = local
  link juice + walk-in interest
- **Wedding press** — Junebug Weddings, Vogue Sposa, Wedding Italy.
  Pitch the proposal/wedding angle — it's the highest-margin
  product

#### 10. Hotel concierge partnerships

The single highest-margin channel. Hotels refer their guests to
boat operators they trust; in return they expect the boat to
collect from their pontoon and to deliver guests back on time.

Top targets (in order of priority):
- **Villa d'Este** (Cernobbio) — the top one
- **Passalacqua** (Moltrasio)
- **Mandarin Oriental** (Blevio)
- **Il Sereno** (Torno)
- **Grand Hotel Tremezzo** (Tremezzo)
- **Grand Hotel Villa Serbelloni** (Bellagio)
- **Filario** (Lezzeno)
- **Casta Diva Resort** (Blevio)

Process: send a one-page PDF to the concierge desk (a
"preferred-supplier" pitch — boats, photos, a few testimonials
with hotel names), follow up by phone, offer a familiarisation
trip (free 1h tour for the head concierge + their family).
Commission: 10–15% to the hotel concierge fund is standard.

### Tier 4 — discovery

#### 11. Instagram

Already at @comoboatrental. The site already pulls the live feed
into the homepage. Suggested growth tactics:

- Post 3–5 times per week — boats, villas, guest experiences
  (with consent)
- Reels with drone footage geotagged "Lake Como"
- Hashtag mix per post: 2 mega (#LakeComo, #LagodiComo), 8 medium
  (#PrivateBoatTour, #BellagioBySea, #ItalyVacation), 8 small
  (#ComoBoatTour, #WoodenBoatLakeComo)
- **Collab posts** with influencers visiting (offer them a free
  short tour in exchange for one collab post)

#### 12. TikTok

Skip until Instagram is humming. When you're ready, the same
content rebrandable as TikTok works fine.

---

## 4. How to extend the site

### Add a new tour

1. Append a slug to `TOUR_SLUGS` in `app/content/tours.ts`
2. Add an entry to the `tours` array with EN + IT copy
   (RU + AR can be a port of EN initially — flag as TODO)
3. Pick `baseIndex` 0–3 to map to one of the 4 base tours in
   `app/translations.ts` (the homepage card). If the new tour
   doesn't fit, also add it to `translations.ts` `tours.items`
   for all 4 locales
4. `bun run build` — sitemap and route auto-generate

### Add a new destination

1. Append a slug to `DESTINATION_SLUGS` in `app/content/destinations.ts`
2. Add an entry to `destinations` with `pinId` matching a pin in
   `app/translations.ts` `PIN_BASE` (or add a new pin to
   `PIN_BASE` with lat/lng)
3. EN + IT copy required; RU/AR optional (will fall back to
   English if `copy[locale]` is missing — currently the code
   doesn't gracefully handle missing locales, so include them
   even as direct EN copies)
4. `bun run build`

### Add a new locale (e.g. German)

1. Add `"de"` to the `Locale` type in `app/translations.ts`
2. Add an entry to the `locales` array
3. Add a full translation block in `translations` for `de`
4. Add `de` keys to all `Record<Locale, ...>` objects in:
   - `app/seo.ts` (LOCALE_BCP47, LOCALE_OG)
   - `app/[locale]/layout.tsx` (titles, descs)
   - `app/content/tours.ts` (each tour's `copy`)
   - `app/content/destinations.ts`
   - `app/content/faq.ts`
   - `app/content/blog.ts` (optional — leave blank to skip blog
     for that locale)
5. Add `"de"` to the `VALID_LOCALES` array in every
   `app/[locale]/...page.tsx`
6. If the script needs a different font, add a `next/font` import
   in `app/layout.tsx`
7. `bun run build`

### Add a new schema type

1. Add a builder function to `app/jsonld.ts` returning a plain
   object
2. Import it in the relevant page's `page.tsx` and add it to the
   `combine([...])` call
3. Validate the build output at
   [validator.schema.org](https://validator.schema.org/)

---

## 5. Verification checklist

Before promoting any change to production:

1. `bun run build` — no errors, all 60+ static pages emitted
2. **Schema check**: paste the homepage URL into
   [search.google.com/test/rich-results](https://search.google.com/test/rich-results) —
   should show LocalBusiness, AggregateRating, FAQPage, Tour
3. **Lighthouse mobile**: run from Chrome DevTools on the homepage.
   Targets: Performance ≥ 90, Accessibility ≥ 95, SEO = 100
4. **Sitemap**: visit `/sitemap.xml` and confirm new pages appear
5. **hreflang**: paste any inner page URL into
   [aleydasolis.com/english/international-seo-tools/hreflang-tags-generator](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/) —
   should validate
6. **OG previews**: paste each locale homepage into
   [opengraph.xyz](https://www.opengraph.xyz/) — check that the
   image, title and description render
7. **Mobile test**: open the site on a phone, run through the
   nav, hit a tour page, confirm the toggle works
8. **Search Console** (post-launch): submit `/sitemap.xml`,
   request indexing for the 4 locale homepages and 4 lead tour
   pages

---

## 6. Useful command reference

```bash
# Local dev
bun run dev

# Production build (runs Instagram sync + Next build)
bun run build

# Local preview of the production build
bun run preview

# Manual Instagram refresh (no full build)
bun run sync:instagram
```

Deploy: push to `main` on GitHub, Vercel auto-deploys.

---

## 7. Contact for unresolved questions

The original build was pair-programmed by David Francesconi
(a non-technical person, if you have implementation questions
he'll relay them) with Claude. The architecture is documented
inline in every file. If something isn't clear from the file
comments alone, the next steps are usually:

1. Search the codebase for the constant or function name
2. Check `app/seo.ts` and `app/jsonld.ts` for the right
   primitive — most things compose from there
3. Check this document's section 4 for the extension pattern

Loris and Claudio's WhatsApp is on the homepage. They run the
business, not the website — for content questions they're the
authority; for technical questions, fall back to David.
