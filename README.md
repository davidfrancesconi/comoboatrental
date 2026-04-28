# Como Boat Rental

Sito di marketing per **comoboatrental.it** — presentazione
multilingue dell'attività di tour privati in barca sul Lago di Como.

Live: deployato su Vercel da questo repo. Vercel rileva automaticamente
la config `output: "export"` e pubblica la cartella `out/`.

Questo README è il documento di handoff. Tutto ciò che serve a uno
sviluppatore front-end per clonare, far girare, modificare e
spedire il sito è qui sotto. Per la roadmap completa SEO + canali
off-site (Google Business Profile, GetYourGuide, Tripadvisor, Bokun,
hotel concierge, stampa) leggi [`docs/HANDOFF.md`](./docs/HANDOFF.md).
Per il riassunto operativo per Loris (in italiano, con focus su
azioni da fare lui) leggi [`docs/PER-LORIS.md`](./docs/PER-LORIS.md).

---

## TL;DR

```bash
git clone https://github.com/davidfrancesconi/comoboatrental.git
cd comoboatrental
bun install      # oppure: npm install
bun run dev      # http://localhost:3000
bun run build    # → HTML/CSS/JS statici in ./out/
```

Niente backend. Niente database. Niente variabili d'ambiente.
Niente API key.

---

## Stack

- **Next.js 16** (App Router) con `output: "export"` — produce una
  cartella `out/` completamente statica, deployabile su qualsiasi
  host statico (Vercel, Netlify, Cloudflare Pages, S3, GitHub
  Pages, FTP, ecc.)
- **TypeScript**
- **Tailwind CSS v4** (usato principalmente come pipeline di
  build; il grosso dello styling vive in CSS puro in
  `app/globals.css`)
- **Leaflet 1.9** per la mappa interattiva del Lago di Como (tile
  CartoDB Voyager, nessuna API key richiesta)
- **Bun** per install / build / dev. Funziona anche con
  npm/pnpm/yarn — niente codice Bun-specifico.

I font sono caricati via `next/font/google`:

- **Cormorant Garamond** — display serif (titoli, corsivi)
- **Inter** — body sans
- **JetBrains Mono** — eyebrow, label, mono caps
- **Cairo** — body e display fallback per arabo

---

## Struttura del progetto

```
.
├── app/
│   ├── layout.tsx                ← shell radice — font, manifest, preconnect, theme-color
│   ├── page.tsx                  ← redirect dalla root / a /<lingua-browser>/
│   ├── seo.ts                    ← unica fonte di verità per costanti del sito
│   ├── jsonld.ts                 ← builder schema.org
│   ├── sitemap.ts                ← generatore sitemap
│   ├── robots.ts                 ← generatore robots
│   ├── translations.ts           ← copy homepage + pin mappa, EN / IT / RU / AR
│   ├── copy-variants.ts          ← 3 varianti copy per il toggle editoriale
│   ├── globals.css               ← design system, layout, CSS di ogni sezione
│   ├── [locale]/                 ← rotte per lingua
│   │   ├── layout.tsx            ← metadati per lingua, hreflang
│   │   ├── page.tsx              ← homepage con JSON-LD @graph completo
│   │   ├── tours/[slug]/page.tsx ← landing per tour
│   │   ├── destinations/[slug]/page.tsx  ← guide per destinazione
│   │   ├── faq/page.tsx
│   │   ├── reviews/page.tsx
│   │   └── blog/[slug]/page.tsx
│   ├── content/                  ← copy lungo, in un solo posto
│   │   ├── tours.ts              ← 4 tour × 4 lingue
│   │   ├── destinations.ts       ← 6 destinazioni × 4 lingue
│   │   ├── faq.ts                ← 12 Q&A × 4 lingue
│   │   └── blog.ts               ← articoli seed
│   └── components/
│       ├── HomePage.tsx          ← UI single-page come client component
│       └── InnerPage.tsx         ← nav + footer condivisi per le pagine interne
├── public/
│   ├── images/                   ← tutte le foto + asset
│   ├── manifest.webmanifest
│   └── favicon.ico
├── docs/
│   ├── HANDOFF.md                ← questo handoff in versione completa
│   └── PER-LORIS.md              ← riassunto operativo per Loris (it)
├── scripts/
│   └── sync-instagram.mjs        ← sync feed Instagram al build
├── next.config.ts                ← `output: "export"` + image config + trailingSlash
├── tsconfig.json
└── package.json
```

Il build emette **60 pagine statiche** — homepage × 4 lingue, 4 tour
× 4 lingue, 6 destinazioni × 4 lingue, FAQ × 4, recensioni × 4,
blog × 2, più sitemap e robots.

---

## Run, build, deploy

```bash
bun install            # oppure: npm install / pnpm install
bun run dev            # dev locale — http://localhost:3000
bun run build          # build di produzione → ./out/
bun run preview        # build + preview locale su server statico
```

Per deployare:

- **Vercel** — importa il repo GitHub. L'export statico viene
  rilevato in automatico; viene pubblicata la cartella `out/`.
  Nessuna env var necessaria.
- **Netlify / Cloudflare Pages** — imposta il build command su
  `bun run build` (o `npm run build`) e la publish directory su
  `out`.
- **Qualsiasi host statico** — gira `bun run build` e carica il
  contenuto di `out/` sull'host.

---

## Design system

Token, font, colori, dimensioni tipografiche, spacing e anatomia
dei componenti vengono da un prototipo hi-fi fatto su Claude Design
(claude.ai/design). L'URL del prototipo è stato la fonte di verità
durante la build — ogni spec in questo codebase è preso verbatim
dal print v2 renderizzato.

### Token di colore (in `app/globals.css :root`)

| Variabile         | Valore                      | Uso                                              |
|-------------------|-----------------------------|--------------------------------------------------|
| `--bg`            | `#f5efe4`                   | Sfondo pergamena calda, sezioni di default       |
| `--bg-alt`        | `#ece4d4`                   | Pergamena più scura per banding di sezione       |
| `--ink`           | `#1a1f24`                   | Quasi-nero con sfumatura verde-blu               |
| `--ink-soft`      | `#4a5560`                   | Body copy su crema, testo secondario             |
| `--ink-mute`      | `#7a8590`                   | Etichette mono, testo terziario                  |
| `--rule`          | `rgba(26, 31, 36, 0.14)`    | Linee sottili e divisori                         |
| `--gold`          | `#b08a4a`                   | Oro accent (em corsivo su bg chiaro)             |
| `--gold-deep`     | `#8c6b32`                   | Oro più scuro per stati hover                    |
| `--gold-light`    | `#e8c987`                   | Oro chiaro highlight (em corsivo su bg scuro)    |

Le altre 4 palette (Fog, Terracotta, Mono, Dusk) sono override sotto
`html[data-palette="B|C|D|E"]` nello stesso file. Vedi sezione
"Toggle editoriale" sotto.

### Sistema tipografico

| Classe     | Famiglia          | Uso                                              |
|------------|-------------------|--------------------------------------------------|
| `.display` | Cormorant Garamond | Titoli, accenti italic em                       |
| `.lead`    | Cormorant Garamond italic 300 | Tagline di sezione sotto l'eyebrow   |
| `.eyebrow` | JetBrains Mono caps | Etichette di sezione (es. "01 — TOURS")        |
| body       | Inter             | Tutto il testo corrente                          |

### Anatomia di sezione

Ogni sezione di contenuto usa la stessa shape `<div class="section-head">`:

```jsx
<div className="section-head">
  <div className="label">
    <span className="eyebrow">{indexLabel}</span>
    <p className="lead">{lead}</p>
  </div>
  <div className="title">
    <h2 className="display"><RichText text={title} /></h2>
    <p>{rightDescription}</p>
  </div>
</div>
```

La griglia è `1fr 2fr` quindi la coppia eyebrow + lead sta in colonna
sinistra e titolo + descrizione a destra.

### Bottoni

Tre varianti, tutte rettangolari, mono caps:

- `.btn.primary` — riempito `--ink`, testo chiaro. CTA di default.
- `.btn.primary-gold` — riempito `--gold-light`. Usato per "Riserva
  una barca" nell'hero.
- `.btn.ghost` — testo crema, bordo crema 50%. Per sezioni scure.
- `.btn.light` — testo ink, bordo ink. Per sezioni crema.

---

## Architettura SEO & contenuti

Il sito è un export statico Next.js multi-pagina e multi-lingua,
ottimizzato per il carosello "things to do" di Google e per i rich
result "people also ask". Leggi [`docs/HANDOFF.md`](./docs/HANDOFF.md)
per l'architettura completa, lo stato del fatto/da fare, e la
checklist off-site per Google Business Profile, GetYourGuide,
Viator, Tripadvisor, Bokun, partnership con concierge degli hotel
e canali del mercato italiano.

Mappa rapida dei moduli SEO-related:

```
app/
├── seo.ts                      ← unica fonte di verità per costanti (URL, telefono, indirizzo, geo, founders, rating, helper di lingua)
├── jsonld.ts                   ← builder schema.org (LocalBusiness, TouristTrip, Product, Review, AggregateRating, FAQPage, BreadcrumbList, Place)
├── sitemap.ts                  ← generatore MetadataRoute.Sitemap
├── robots.ts                   ← generatore MetadataRoute.Robots
├── layout.tsx                  ← shell radice — font, manifest, preconnect hint, theme-color
├── page.tsx                    ← root /, redirect a /<lingua-browser>/
├── [locale]/                   ← rotte per lingua (una per /en/, /it/, /ru/, /ar/)
│   ├── layout.tsx              ← metadati per lingua, hreflang via metadata.alternates.languages
│   ├── page.tsx                ← homepage con @graph JSON-LD completo
│   ├── tours/[slug]/page.tsx   ← landing per tour
│   ├── destinations/[slug]/page.tsx  ← guide per destinazione
│   ├── faq/page.tsx
│   ├── reviews/page.tsx
│   └── blog/[slug]/page.tsx
├── content/                    ← tutto il copy lungo in un solo posto
│   ├── tours.ts                ← 4 tour × 4 lingue — ogni lingua ottimizzata per il proprio mercato
│   ├── destinations.ts         ← 6 destinazioni × 4 lingue
│   ├── faq.ts                  ← 12 Q&A × 4 lingue
│   └── blog.ts                 ← articoli seed
└── components/
    ├── HomePage.tsx            ← l'UI single-page esistente come client component
    └── InnerPage.tsx           ← nav + footer condivisi per le pagine interne
```

Il copy è ottimizzato per ogni mercato di ricerca:

- **Italiano** — scritto a mano per "noleggio barche como" (~3.600/mese),
  "tour barca lago di como" (~1.200/mese), ecc.
- **Inglese** — per il mercato globale: "lake como boat rental",
  "lake como boat tour", "private boat tour bellagio", ecc.
- **Russo** — mercato del lusso russo (via Dubai/Istanbul):
  "Аренда лодки на озере Комо", "VIP чартер озеро Комо"
- **Arabo** — mercato Gulf (UAE, Saudi, Kuwait): "تأجير قارب بحيرة كومو",
  "فيلا جورج كلوني"

Il copy russo e arabo è competente al livello SEO ma non scritto
da madrelingua — vedi `docs/HANDOFF.md` sezione G per il task
post-handoff.

---

## Toggle editoriale di anteprima (variante + palette)

Il sito spedisce un piccolo controllo flottante in alto a destra
che permette al cliente di alternare tra tre **varianti di copy**
e cinque **palette di colore** senza ricompilare. Le scelte
vengono salvate in `localStorage`, così un revisore può atterrare
su `comoboatrental.com`, scegliere una combinazione, e ritornare
sempre alla stessa.

È uno **strumento di review**. Quello che il visitatore sceglie
non cambia ciò che vedono i crawler — i metadati SEO (title,
description, Open Graph, Twitter card e JSON-LD `LocalBusiness`)
sono bakerati al build in `app/layout.tsx` e in `app/[locale]/layout.tsx`,
indipendenti dalla variante. Le varianti di copy agiscono solo
sull'inglese; passando a IT / RU / AR si vede sempre la
traduzione standard in `app/translations.ts`.

### Varianti di copy

Definite in `app/copy-variants.ts`. Ogni variante è un override
parziale che viene mergiato sopra la traduzione inglese completa.

| Codice | Etichetta   | Voce                                              |
|--------|-------------|---------------------------------------------------|
| A      | Editorial   | Lusso composto, terza persona. **Default.**       |
| B      | Founder-led | Loris e Claudio in prima persona                  |
| C      | Concierge   | Service-led, framing del giorno del tour          |

Per modificare una variante, apri `copy-variants.ts` e cambia il
campo. Servono solo i campi che vuoi sovrascrivere — il resto
cade su `translations.ts`.

### Palette

Definite in `app/globals.css` sotto `html[data-palette="A|B|C|D|E"]`.
Ogni palette è un piccolo set di custom property CSS; ogni altra
regola del foglio di stile consuma quei token, quindi cambiare
l'attributo ridipinge tutto il sito.

| Codice | Etichetta  | Mood                                       |
|--------|------------|--------------------------------------------|
| A      | Parchment  | Crema caldo + ink (default)                |
| B      | Fog        | Grigio-verde freddo, sobrio                |
| C      | Terracotta | Mediterraneo caldo, leggermente più audace |
| D      | Mono       | Quasi-monocromatico, ottone per i corsivi  |
| E      | Dusk       | Dark mode — tramonto sul lago              |

### Scegliere una combinazione finale

Quando il cliente conferma una combinazione:

1. Imposta `DEFAULT_VARIANT` e `DEFAULT_PALETTE` in cima a
   `app/components/HomePage.tsx` ai codici scelti (es. `"B"` e `"A"`).
2. Se vuoi rimuovere il toggle del tutto, cancella l'intero blocco
   `<div className="vp-toggle">…</div>` in
   `app/components/HomePage.tsx` e le regole `===== Variant + Palette toggle =====`
   in fondo a `app/globals.css`. Gli override della variante e
   della palette restano dove sono — semplicemente non sono più
   commutabili a runtime.
3. (Opzionale) aggiorna i metadati in `app/[locale]/layout.tsx`
   per matchare la copy della variante scelta. Ora sono fissi
   alla Variant A ("Editorial") per coerenza SEO.

---

## SEO

Bakerato indipendentemente dalla variante o palette scelta dal
visitatore:

- `<title>` e `<meta name="description">` per locale in
  `app/[locale]/layout.tsx`
- Open Graph + Twitter card (immagine: `/public/images/hero-sunset.jpg`)
- `<link rel="canonical">` per pagina, lingua-aware
- `<link rel="alternate" hreflang>` per ogni lingua, ogni pagina
- Robots: full index/follow, large image preview, max snippet
- `LocalBusiness` + `TravelAgency` JSON-LD inline in `<head>`
  con i founders **Loris** e **Claudio**, indirizzo completo,
  telefono, geo, orari e Instagram
- `AggregateRating` (4.9/87) su ogni pagina
- `Review` × 3 testimonianze
- `Product` + `Offer` per le 2 barche con prezzo
- `TouristTrip` per ogni tour con itinerario completo e prezzo
- `FAQPage` (homepage abbreviata, /faq completa)
- `BreadcrumbList` su ogni pagina
- `Place` / `TouristAttraction` con coordinate per ogni destinazione
- `Article` per i blog post

Aggiorna le costanti in `app/seo.ts` se cambia qualcosa
sull'attività (telefono, indirizzo, valutazione, ecc.).

---

## Internazionalizzazione

Quattro lingue, ognuna su una rotta statica:

```
/en/  — Inglese
/it/  — Italiano
/ru/  — Russo
/ar/  — Arabo (RTL)
```

La root `/` reindirizza alla lingua del browser (default `/en/`).
La detection avviene client-side; gli hreflang in head garantiscono
che Google associ correttamente le varianti di lingua.

Aggiungere il copy di una sezione significa:

1. Estendere il type `Translation` in `translations.ts`
2. Popolare il nuovo campo per tutte e quattro le lingue
3. Consumarlo in `HomePage.tsx`

Aggiungere una nuova lingua: vedi `docs/HANDOFF.md` sezione 4.

I toponimi (Bellagio, Villa del Balbianello, Cernobbio, ecc.)
restano nella forma italiana originale in tutte le lingue — sono
nomi propri e tradurli farebbe danno alla SEO.

---

## La mappa del Lago di Como

Il componente `<LakeComoMap />` in `app/components/HomePage.tsx`
è una vera mappa Leaflet interattiva, non un'immagine statica:

- Tile source: **CartoDB Voyager** (gratis, nessuna API key,
  attribuzione nascosta perché la mappa è decorativa — riattivala
  se in futuro spedirai una versione dove l'attribuzione è
  richiesta dai TOS Carto)
- Tutte le interazioni della mappa sono disabilitate (no drag,
  no zoom, no pinch). La mappa vola solo da sé
- Nove `circleMarker` con tooltip serif permanenti per le
  destinazioni, polilinea tratteggiata scura che le connette
  in ordine di crociera, e un marker SVG animato di una barca
  che orbita il percorso
- Un `IntersectionObserver` sulla `<section>` chiama
  `flyToBounds(...)` per inquadrare tutte le destinazioni quando
  la sezione entra nel viewport, e `flyTo(initialView, 10)`
  quando esce — dando alla sezione l'effetto cinematografico
  "fly-in / fly-out"

Per **spostare un pin**: modifica `lat` / `lng` in
`translations.ts` sotto `PIN_BASE`. La nuova posizione viene presa
automaticamente.

Per **rinominare un pin**: modifica `PIN_BASE[].name`. Lo stesso
nome si applica a tutte le lingue (i toponimi non si traducono).

Per **cambiare l'ordine della crociera**: riordina `PIN_BASE` (la
polilinea li traccia in ordine d'array; la lista laterale di
itinerario li mostra in ordine d'array).

La sezione legacy "Our Base" più sotto usa un semplice embed
`<iframe>` di Google Maps (nessuna API key, solo una query di
ricerca).

---

## Fotografia

Tutte le immagini barca / lago vivono in `public/images/`. La
mappatura da foto a sezione è in cima a `app/components/HomePage.tsx`:

```ts
const HERO_IMG    = "/images/hero-sunset.jpg";
const TOUR_IMGS   = ["/images/hero-1.jpg", ...];
const FLEET_IMGS  = ["/images/taxi-boat.jpg", "/images/luxury-caddy.jpg"];
const CONTACT_BG  = "/images/lake-como-discover.jpg";
```

Per cambiare una foto: metti il nuovo file in `public/images/` e
aggiorna la costante. Niente magia di image pipeline — vengono
servite così come sono e lazy-loaded via `loading="lazy"`.

Tutte le foto © Como Boat Rental.

---

## Costanti di contatto

Hard-coded in `app/seo.ts`:

```ts
export const PHONE_DISPLAY_PRIMARY = "+39 340 6487574";
export const PHONE_DISPLAY_SECONDARY = "+39 348 0689769";
export const EMAIL = "info@comoboatrental.it";
export const WHATSAPP_URL = "https://wa.me/393406487574";
export const INSTAGRAM_URL = "https://www.instagram.com/comoboatrental";
```

Il sito non ha flow di prenotazione e nessuna form di backend —
ogni CTA apre WhatsApp, apre una mail, salta alla sezione contatti
o apre il profilo Instagram.

---

## TODO noti / cose da considerare

- **Foto reali nelle card tour.** Le quattro card tour attualmente
  riusano foto hero / di crociera. Uno sviluppatore con accesso
  alla libreria foto può scattare o curare una foto eroe per tour
  e sostituire le entry in `TOUR_IMGS`.
- **Flow di prenotazione.** Attualmente ogni CTA è "Riserva una
  barca" → salta alla sezione contatti. Se l'attività vuole
  prenotazioni vere (calendario + pagamento), è un'integrazione
  backend che ancora non esiste. Il sito statico non lo preclude
  — funzioni Vercel o un widget di prenotazione separato (es.
  Bokun raccomandato — vedi `docs/HANDOFF.md`) si inseriscono
  pulitamente.
- **Feed Instagram.** La sezione Instagram prende gli ultimi 6
  post pubblici da `@comoboatrental` al **build time** via lo
  script helper `scripts/sync-instagram.mjs`. Lo script colpisce
  lo stesso endpoint web pubblico che il sito Instagram stesso
  usa (nessun API token, nessun setup Facebook Business, nessun
  servizio terzo), scarica ogni foto in `/public/images/instagram/`,
  e scrive un manifest in `/public/instagram-feed.json`. Il
  manifest è consumato da `app/components/HomePage.tsx`. Se la
  sync fallisce per qualsiasi motivo — Instagram throttling,
  cambio formato endpoint, no rete durante il build — il build
  continua e la pagina cade su un set curato di foto interne.

  Lo script gira automaticamente come hook `prebuild`, quindi
  ogni `bun run build` (o `npm run build`) rinfresca il feed.
  Per rinfrescare manualmente senza un build completo:

  ```bash
  bun run sync:instagram
  ```

  Per cambiare il profilo sorgente, imposta
  `IG_USERNAME=otherprofile` nell'environment (o modifica il
  default nello script). Per cambiare quanti post prende la
  griglia, imposta `IG_POST_LIMIT`.

  Siccome il sito è un export statico, "live" qui significa
  "fresh come dell'ultimo deploy". Un rebuild schedulato su
  Vercel (Cron Jobs → POST al deploy hook a tempi pianificati)
  tiene la griglia aggiornata senza intervento manuale. Cadenza
  suggerita: ogni 6 ore.

  Se l'endpoint pubblico che Instagram usa smettesse di
  rispondere, i fallback più puliti sono
  [Behold.so](https://behold.so) (widget di embed gratuito) o
  l'API Instagram Graph ufficiale (richiede Meta Business +
  token).
- **Form / mailing list.** Fuori scope per questo build.
- **Cookie banner.** Nessuno. Il sito non usa cookie e nessun
  analytics. Se si aggiungono analytics (Plausible, Simple
  Analytics, GA4), verifica se serve un banner per la regione
  di deploy.
- **Performance.** Il punteggio Lighthouse è nei 90 fuori dalla
  scatola. La vincita più grande disponibile è convertire le
  foto in AVIF / WebP (attualmente JPG) — `next/image` lo
  automatizzerebbe se `output: "export"` non disabilitasse il
  suo runtime. Uno script Sharp pre-build sarebbe la soluzione
  più pulita. Vedi `docs/HANDOFF.md` sezione "Cosa resta da fare,
  A".

---

## Licenza

Il codice in questo repo è privato. Tutte le foto sono proprietà
di Como Boat Rental. I tile della mappa sono © OpenStreetMap
contributors via CARTO ([ODbL](https://opendatacommons.org/licenses/odbl/))
— il credit deve essere visibile se/quando la mappa viene usata
fuori dal contesto decorativo di questo sito.
