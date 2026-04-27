# Como Boat Rental

Source code for the **comoboatrental.it** marketing site — a single-page,
multilingual presentation of the private boat tour business on Lake Como.

The site is **fully static**: no database, no CMS, no server-side rendering.
A `bun run build` (or `npm run build`) produces a self-contained `out/` folder
that can be deployed to any static host — Vercel, Netlify, Cloudflare Pages,
S3, an FTP server, or GitHub Pages.

## Stack

- **Next.js 16** (App Router) with `output: "export"` → static HTML/CSS/JS
- **Tailwind CSS v4** + custom CSS in `app/globals.css`
- **TypeScript**
- **Bun** for install / build (works the same with `npm` or `pnpm`)

No backend, no API routes, no environment variables.

## Project layout

```
site/
├── app/
│   ├── page.tsx          ← the entire single-page site (one client component)
│   ├── translations.ts   ← copy + map pin data for EN / IT / RU / AR
│   ├── globals.css       ← design system, layout, every section's CSS
│   └── layout.tsx        ← document shell, font loading, metadata
├── public/images/        ← all photography + the OSM-derived lake map (.jpg)
├── next.config.ts        ← `output: "export"` static export
└── package.json
```

The full site is rendered from `app/page.tsx`. All copy lives in
`app/translations.ts` — adding a section means extending the `Translation`
type, populating it for each locale, and consuming it in `page.tsx`.

## Run / build

```bash
bun install            # or: npm install
bun run dev            # local dev server on http://localhost:3000
bun run build          # produces ./out/ — fully static, ready to deploy
```

To preview the static build locally:

```bash
bun run build
npx serve out          # any static file server works
```

## Deployment

Drop the contents of `out/` onto any static host. On Vercel, importing the
repo from GitHub deploys it automatically — `output: "export"` is detected
and the `out/` folder is published.

## Languages

Four locales are supported, all rendered client-side from a single
`translations.ts` data object:

- **EN** — English
- **IT** — Italian
- **RU** — Russian
- **AR** — Arabic (with RTL layout)

The locale switcher is in the top navigation. Switching updates `<html lang>`
and `<html dir>` and re-renders all translated text. Place names (Bellagio,
Villa del Balbianello, etc.) stay in their original Italian form across all
languages — these are proper nouns.

## The map

The "Where we cruise" section uses a real OpenStreetMap-derived map
(`public/images/lake-como-map.jpg`, composed from zoom-11 OSM tiles and
tinted with a CSS sepia filter). Destination pins are positioned at runtime
from real lat/lng coordinates via Web Mercator projection — the bounding box
of the cropped map is declared in `MAP_BBOX` in `page.tsx`. To move a pin,
edit its `lat` / `lng` in `translations.ts`.

The "Our base" section uses a Google Maps embed (no API key needed —
straight iframe with a search query for the business name).

## Contact

The site has no booking flow and no backend forms — guests reach out via:

- WhatsApp (`https://wa.me/393406487574`)
- Phone (`+39 340 6487574` / `+39 348 0689769`)
- Email (`info@comoboatrental.it`)
- Instagram (`@comoboatrental`)

These are hard-coded constants at the top of `app/page.tsx`.

## License

All photography is the property of Como Boat Rental.
The OpenStreetMap-derived map background is © OpenStreetMap contributors,
licensed under [ODbL](https://opendatacommons.org/licenses/odbl/).
