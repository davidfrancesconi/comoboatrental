# Como Boat Rental

Marketing site for **comoboatrental.it** — a single-page, multilingual
presentation of the private boat tour business on Lake Como.

Live: deployed to Vercel from this repo. Vercel auto-detects the
`output: "export"` config and publishes the `out/` folder.

This README is the handoff document. Everything a front-end dev needs to
clone, run, modify and ship the site is below.

---

## TL;DR

```bash
git clone https://github.com/davidfrancesconi/comoboatrental.git
cd comoboatrental
bun install      # or: npm install
bun run dev      # http://localhost:3000
bun run build    # → static HTML/CSS/JS in ./out/
```

No backend. No database. No environment variables. No API keys.

---

## Stack

- **Next.js 16** (App Router) with `output: "export"` — produces a
  fully static `out/` folder, deployable to any static host
  (Vercel, Netlify, Cloudflare Pages, S3, GitHub Pages, FTP, etc.)
- **TypeScript**
- **Tailwind CSS v4** (mostly used as a build pipeline; the bulk of
  styling lives in plain CSS in `app/globals.css`)
- **Leaflet 1.9** for the interactive Lake Como map (CartoDB Voyager
  tiles, no API key needed)
- **Bun** for install / build / dev. Anything that works with
  npm/pnpm/yarn works here too — no Bun-specific code.

Fonts are loaded via `next/font/google`:

- **Cormorant Garamond** — display serif (headlines, italics)
- **Inter** — body sans
- **JetBrains Mono** — eyebrows, labels, mono caps
- **Cairo** — Arabic body and display fallback

---

## Project layout

```
.
├── app/
│   ├── page.tsx          ← the entire single-page site (one client component)
│   ├── translations.ts   ← all copy + map pin data, EN / IT / RU / AR
│   ├── globals.css       ← design system, layout, every section's CSS
│   ├── layout.tsx        ← document shell, font loading, metadata
│   └── favicon.ico
├── public/
│   └── images/           ← all photography + assets
├── next.config.ts        ← `output: "export"` + image config
├── tsconfig.json
└── package.json
```

`app/page.tsx` is one big client component (`"use client"`) that
renders every section of the site. There is no per-section file split —
the section breakpoints inside `page.tsx` are just JSX comments
(`{/* HERO */}`, `{/* TOURS */}`, etc.) and the order in JSX matches
the order on the page.

If you want to refactor into per-section components, the natural
boundaries are:

- `<Hero />`
- `<Tours />`
- `<Map />` (already isolated as `<LakeComoMap />` for the Leaflet
  instance)
- `<Fleet />`
- `<Experiences />`
- `<Testimonials />`
- `<OurBase />`
- `<Contact />`

---

## Run, build, deploy

```bash
bun install            # or: npm install / pnpm install
bun run dev            # local dev — http://localhost:3000
bun run build          # production build → ./out/
bun run preview        # build + preview locally on a static server
```

To deploy:

- **Vercel** — import the GitHub repo. Static export is detected
  automatically; the `out/` folder is published. No env vars needed.
- **Netlify / Cloudflare Pages** — set the build command to
  `bun run build` (or `npm run build`) and the publish directory to
  `out`.
- **Any static host** — run `bun run build` and upload the contents
  of `out/` to your host.

---

## Design system

Tokens, fonts, colours, type sizes, spacing and component anatomy come
from a hi-fi prototype made in Claude Design (claude.ai/design). The
prototype URL was the source of truth during the build — every spec
in this codebase is taken verbatim from the rendered v2 print.

### Colour tokens (in `app/globals.css :root`)

| Variable          | Value                       | Use                                         |
|-------------------|-----------------------------|---------------------------------------------|
| `--bg`            | `#f5efe4`                   | Warm parchment background, default sections |
| `--bg-alt`        | `#ece4d4`                   | Dimmer parchment for section banding        |
| `--ink`           | `#1a1f24`                   | Near-black with a green-blue tint           |
| `--ink-soft`      | `#4a5560`                   | Body copy on cream, secondary text          |
| `--ink-mute`      | `#7a8590`                   | Mono labels, tertiary text                  |
| `--rule`          | `rgba(26, 31, 36, 0.14)`    | Hairlines and dividers                      |
| `--gold`          | `#b08a4a`                   | Accent gold (italic em on light bg)         |
| `--gold-deep`     | `#8c6b32`                   | Darker gold for hover states                |
| `--gold-light`    | `#e8c987`                   | Lighter highlight gold (italic em on dark)  |

### Type system

| Class      | Family            | Use                                           |
|------------|-------------------|-----------------------------------------------|
| `.display` | Cormorant Garamond | Headlines, italic em accents                  |
| `.lead`    | Cormorant Garamond italic 300 | Section taglines under the eyebrow |
| `.eyebrow` | JetBrains Mono caps | Section labels (e.g. "01 — TOURS")           |
| body       | Inter             | All running prose                             |

### Section anatomy

Every content section uses the same `<div class="section-head">` shape:

```jsx
<div className="section-head">
  <div className="label">
    <span className="eyebrow">{indexLabel}</span>
    <p className="lead">{lead}</p>
  </div>
  <div className="title">
    <h3 className="display"><RichText text={title} /></h3>
    <p>{rightDescription}</p>
  </div>
</div>
```

The grid is `1fr 2fr` so the eyebrow + lead pair sits in the
left column and the title + description in the right.

### Buttons

Three button variants, all rectangle, mono caps:

- `.btn.primary` — filled `--ink`, light text. Default CTA.
- `.btn.primary-gold` — filled `--gold-light`. Used for "Reserve a
  boat" in the hero.
- `.btn.ghost` — cream text, 50% cream border. For dark sections.
- `.btn.light` — ink text, ink border. For cream sections.

---

## Internationalisation

Four locales, all client-rendered from one `app/translations.ts`
object. There is no routing per locale — switching the language
updates React state, which re-renders the page in place and toggles
`<html lang>` and `<html dir>`.

```
EN — English
IT — Italian
RU — Russian
AR — Arabic (RTL)
```

Adding a section's copy means:

1. Extend the `Translation` type in `translations.ts`
2. Populate the new field for all four locales
3. Consume it in `page.tsx`

Adding a new locale means:

1. Add the locale code to the `Locale` type
2. Add an entry to the `locales` array (used by the language switcher)
3. Add a full translation block in `translations`
4. If the script runs RTL, push the locale into `rtlLocales`
5. If the script needs a font that the existing `Cairo` fallback
   doesn't cover, add a new `next/font` import in `layout.tsx`

Place names (Bellagio, Villa del Balbianello, Cernobbio, etc.) stay
in their original Italian form across all locales — they're proper
nouns and translating them would actively harm SEO.

---

## The Lake Como map

The `<LakeComoMap />` component in `page.tsx` is a real interactive
Leaflet map, not a static image:

- Tile source: **CartoDB Voyager** (free, no API key, attribution
  hidden because the map is decorative — re-enable it if you ever
  ship a version where the attribution is required by Carto's TOS)
- All map interactions are disabled (no drag, no zoom, no pinch).
  The map only flies on its own
- Nine `circleMarker`s with permanent serif tooltips for the
  destinations, dashed dark polyline connecting them in cruise
  order, and an animated SVG boat marker that orbits the route
- An `IntersectionObserver` on the `<section>` calls
  `flyToBounds(...)` to fit all destinations when the section enters
  the viewport, and `flyTo(initialView, 10)` when it leaves —
  giving the section the cinematic "fly-in / fly-out" effect

To **move a pin**: edit the `lat` / `lng` in `translations.ts`
under `PIN_BASE`. The new position is picked up automatically.

To **rename a pin**: edit `PIN_BASE[].name`. Same name applies to
all locales (place names don't translate).

To **change the cruise route order**: reorder `PIN_BASE` (the
polyline traces them in array order; the side itinerary list
displays them in array order too).

The legacy "Our Base" section below uses a plain Google Maps
`<iframe>` embed (no API key, just a search query).

---

## Photography

All boat / lake imagery lives in `public/images/`. The mapping from
photo to section is at the top of `app/page.tsx`:

```ts
const HERO_IMG    = "/images/hero-sunset.jpg";
const TOUR_IMGS   = ["/images/hero-1.jpg", ...];
const FLEET_IMGS  = ["/images/taxi-boat.jpg", "/images/luxury-caddy.jpg"];
const EXP_IMGS    = ["/images/wedding.jpg", ...];
const CONTACT_BG  = "/images/lake-como-discover.jpg";
```

To swap a photo: drop the new file into `public/images/` and update
the constant. No image-pipeline magic — these are served as-is and
lazy-loaded via `loading="lazy"`.

All photography © Como Boat Rental.

---

## Contact constants

Hard-coded at the top of `app/page.tsx`:

```ts
const PHONE_1_DISP = "+39 340 6487574";
const PHONE_2_DISP = "+39 348 0689769";
const EMAIL        = "info@comoboatrental.it";
const WHATSAPP_URL = "https://wa.me/393406487574";
const INSTAGRAM_URL = "https://www.instagram.com/comoboatrental";
```

The site has no booking flow and no backend forms — every CTA either
opens WhatsApp, opens an email, jumps to the contact section, or
opens the Instagram profile.

---

## Known TODOs / things to consider

- **Real photography in tour cards.** The four tour cards currently
  reuse hero / cruise photography. A dev with access to the photo
  library could shoot or curate one explicit hero photo per tour
  and replace the entries in `TOUR_IMGS`.
- **Booking flow.** Currently every CTA is "Reserve a boat" → jumps
  to the contact section. If the business wants real bookings (calendar
  + payment), that's a backend integration that doesn't exist yet.
  The static site doesn't preclude it — Vercel functions or a separate
  booking widget (e.g. FareHarbor, Bokun) drop in cleanly.
- **Live Instagram feed.** The Instagram section is a **static
  curated grid of 6 thumbnails** (`INSTAGRAM_TILES` in `page.tsx`)
  that all link out to the live profile. The legacy site used the
  WordPress Smash Balloon plugin to auto-pull posts — that plugin
  obviously doesn't apply here. To restore the live feed, the
  cleanest options are:
   - **[Behold.so](https://behold.so)** — free for one widget, one
     `<script>` tag and a `<div data-behold-id="...">` in place of
     `.ig-grid` and the static tiles. Updates hourly.
   - **[LightWidget](https://lightwidget.com)** or
     **[Elfsight](https://elfsight.com/instagram-feed-instashow/)** —
     similar iframe-embed widgets, mostly free.
   - **Official Instagram Embed** — manual per-post, but reliable
     and has no third-party badge.
   - **Instagram Graph API** — official auto-feed, but requires a
     Facebook Business account, App, long-lived access token, and
     server-side refresh logic. Overkill for a static site unless
     the client already has Meta Business set up.
  When the live feed lands, drop the `INSTAGRAM_TILES` array and the
  `.ig-grid` markup; replace with the widget's snippet.
- **Form / mailing list.** Out of scope for this build.
- **Cookie banner.** None. The site uses no cookies and no analytics.
  If analytics are added (Plausible, Simple Analytics, GA4), check
  whether a banner is needed for the deployment region.
- **Performance.** Lighthouse score is in the 90s out of the box.
  The biggest win available is converting the photography to AVIF /
  WebP (currently JPG) — `next/image` would automate this if `output: "export"` weren't disabling its runtime. A pre-build Sharp script would be the cleanest solution.

---

## Licence

The code in this repo is private. All photography is the property of
Como Boat Rental. Map tiles are © OpenStreetMap contributors via
CARTO ([ODbL](https://opendatacommons.org/licenses/odbl/)) — credit
must be visible if/when the map is used outside this site's
decorative context.
