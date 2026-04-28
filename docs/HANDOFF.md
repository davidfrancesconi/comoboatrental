# Como Boat Rental — handoff per lo sviluppatore

Questo documento è il passaggio di consegne tra il lavoro di fondazione
fatto da David e lo sviluppatore front-end che porterà avanti il sito
per Loris e Claudio. Copre solo gli aspetti tecnici:

1. **Cosa c'è già nel codice** — ogni superficie SEO e di contenuto
   attualmente in produzione
2. **Come pubblicare il sito** — comandi, deploy, hosting
3. **Cosa resta da fare in codice** — task tecnici concreti
4. **Come estendere il sito** — aggiungere tour, destinazioni,
   articoli blog, lingue, tipi di schema
5. **Checklist di verifica**
6. **Comandi utili e contatti**

Per le attività **fuori dal sito** che servono a far rendere il
progetto (Google Business Profile, OTA come GetYourGuide e
Viator, sistema di prenotazione Bokun, partnership con concierge
degli hotel, stampa, foto da commissionare, decisioni di copy
e palette) leggi il documento parallelo
[`PER-LORIS.md`](./PER-LORIS.md). Quel documento è scritto per
Loris in italiano-discorsivo, non tecnico, e contiene tutte le
checklist di iscrizione alle piattaforme.

Se prendi in mano il progetto da zero, leggi nell'ordine — le sezioni
si costruiscono l'una sull'altra.

---

## 1. Cosa c'è già nel codice

### Architettura

- **Next.js 16, App Router, `output: "export"`.** Il sito è una
  single-page app esportata staticamente, con un'architettura
  multi-pagina pensata per la SEO. Il build produce una cartella
  `out/` ospitabile ovunque (oggi su Vercel collegato a GitHub).
- **Routing per locale** sotto `app/[locale]/...`. Visitando `/`,
  il visitatore viene reindirizzato sulla lingua preferita del suo
  browser (fallback su `/en/`). Ognuno tra `/en/`, `/it/`, `/ru/`,
  `/ar/` è un URL reale crawlabile, con i propri metadati, JSON-LD,
  hreflang e blocco Open Graph.
- **60 pagine statiche** generate al build:
  - 4 varianti homepage (una per lingua)
  - 4 tour × 4 lingue = 16 pagine tour
  - 6 destinazioni × 4 lingue = 24 pagine destinazioni
  - 4 pagine FAQ
  - 4 pagine recensioni
  - 1 articolo blog in 2 lingue (EN, IT) = 2 pagine blog
  - `/sitemap.xml`, `/robots.txt`
  - redirect dalla root `/`

### Infrastruttura SEO

Lo sviluppatore deve sapere dove trovare le cose che gli verranno
chieste di aggiornare.

| Cosa | File | Note |
|---|---|---|
| Costanti del sito (URL, telefono, indirizzo, geo, founders, rating) | `app/seo.ts` | Unica fonte di verità. Modifica qui, non in 12 posti diversi |
| Builder JSON-LD schema.org | `app/jsonld.ts` | LocalBusiness, TouristTrip, Product, Review, AggregateRating, FAQPage, BreadcrumbList, Place. Restituisce oggetti puri; le pagine fanno JSON.stringify dentro `<script type="application/ld+json">` |
| Sitemap (auto-generato) | `app/sitemap.ts` | Elenca ogni lingua × pagina con alternates hreflang per voce |
| Robots (auto-generato) | `app/robots.ts` | Allow-all + puntatore al sitemap |
| Manifest | `public/manifest.webmanifest` | Collegato in `app/layout.tsx` |
| Title e description per locale | `app/[locale]/layout.tsx` | Il blocco metadata della homepage in ogni lingua |

### Dati di contenuto

Tutto il copy di lunga forma vive in `app/content/` come oggetti
TypeScript piani. Lo sviluppatore non deve mai scavare nei file dei
componenti per aggiornare il copy.

| File | Contenuto |
|---|---|
| `app/content/tours.ts` | 4 tour × 4 lingue — copy completo, itinerario, incluso/non incluso, FAQ, prezzi |
| `app/content/destinations.ts` | 6 destinazioni × 4 lingue — guida, "buono a sapersi", cross-link ai tour |
| `app/content/faq.ts` | 12 Q&A × 4 lingue — schema FAQ in homepage + `/<locale>/faq/` |
| `app/content/blog.ts` | Un articolo seed in EN + IT |

Ogni lingua è ottimizzata sul mercato di ricerca corrispondente:

- **Italiano**: scritto a mano per "noleggio barche como" (~3.600/mese),
  "tour barca lago di como" (~1.200/mese), "gita in barca bellagio"
  (~800/mese), "noleggio barca villa balbianello" (~450/mese). I
  concorrenti diretti Il Medeghino e Taxi Boat Varenna oggi dominano
  queste query.
- **Inglese**: scritto a mano per il mercato inglese globale — "lake
  como boat rental", "lake como boat tour", "private boat tour
  bellagio", "villa balbianello boat tour", "lake como sunset cruise".
  metaTitle e metaDesc di ogni pagina tour e destinazione attaccano
  questi pattern.
- **Russo**: mirato sul mercato russo del lusso che ancora raggiunge
  il Lago di Como passando per Dubai e Istanbul — "Аренда лодки на
  озере Комо", "Прогулка на лодке Комо", "Вилла Бальбьянелло Casino
  Royale", "VIP чартер озеро Комо". Body 200-400 parole per pagina
  (parità con EN/IT), con itinerario completo e i riferimenti
  cinematografici che i viaggiatori russi conoscono.
- **Arabo**: focus sul mercato Gulf (Emirati, Arabia Saudita, Kuwait —
  il segmento ad altissimo margine per il Lago di Como) — "تأجير قارب
  بحيرة كومو", "جولة بحرية بحيرة كومو", "فيلا جورج كلوني", "شهر
  العسل بحيرة كومو". Riconosce le preferenze dei viaggiatori Gulf
  (privacy, opzioni halal-friendly nel charter giornaliero) senza
  forzare la cosa.

Il copy russo e arabo è competente a livello SEO (keyword giuste,
struttura giusta, lunghezza giusta) ma non scritto da madrelingua.
Un copywriter nativo russo e un copywriter Gulf-market arabo
affilerebbero ulteriormente cadenza e idioma — vedi sezione "Cosa
resta da fare, G".

### Tipi di schema coperti

- `LocalBusiness` + `TravelAgency` (con founders, geo, orari, sameAs)
- `WebSite`
- `AggregateRating` (4.9/87, su ogni pagina)
- `Review` × 3 testimonianze (su /reviews + homepage)
- `Product` × 2 barche con `Offer` + `UnitPriceSpecification`
- `TouristTrip` × 4 tour con `ItemList` di itinerario e `Offer`
- `FAQPage` (homepage abbreviata, `/faq` completa)
- `BreadcrumbList` (ogni pagina)
- `TouristAttraction` / `Place` × 6 destinazioni con `geo`
- `Article` (blog)

### Altre superfici già spedite

- **Toggle editoriale di anteprima** (pannello flottante in alto a
  destra): permette di alternare tra 3 varianti di copy × 5 palette
  di colore. Salvataggio in localStorage. **Per revisione cliente
  solamente — non impatta sulla SEO** (i metadati sono indipendenti
  dalla variante e bakerati al build). Da rimuovere quando Loris ha
  scelto; vedi sezione "Cosa resta da fare, D" sotto.
- **Feed Instagram live**: `scripts/sync-instagram.mjs` gira come
  `prebuild` e prende gli ultimi 6 post pubblici da `@comoboatrental`
  scrivendoli in `public/instagram-feed.json`, con ogni tile che
  porta la sua accessibility caption come alt text.
- **Switcher locale**: naviga tra `/en/`, `/it/`, `/ru/`, `/ar/` via
  URL reali (non stato JS). L'attributo `<html lang>` e `dir` cambia
  prima del paint grazie a un piccolo script inline in
  `app/layout.tsx`.

---

## 2. Come pubblicare il sito

### Setup locale

```bash
git clone https://github.com/davidfrancesconi/comoboatrental.git
cd comoboatrental
bun install            # oppure: npm install / pnpm install
bun run dev            # dev locale — http://localhost:3000
```

Niente env var, niente API key, niente backend.

### Build di produzione

```bash
bun run build          # → ./out/ (HTML/CSS/JS statici)
bun run preview        # build + preview locale su server statico
```

Il `prebuild` hook gira `scripts/sync-instagram.mjs` che pulla i
6 post più recenti da `@comoboatrental` e li scrive in
`public/instagram-feed.json`. Se la sync fallisce (rate limit,
endpoint cambiato, no rete) il build continua e il feed cade su
foto interne curate.

### Deploy

- **Vercel** (configurazione attuale): push su `main` su GitHub e
  Vercel auto-deploya. Rileva automaticamente `output: "export"`
  e pubblica la cartella `out/`. Nessuna env var necessaria.
- **Netlify / Cloudflare Pages**: build command `bun run build`,
  publish directory `out`.
- **Qualsiasi host statico** (S3, GitHub Pages, FTP): gira
  `bun run build` e carica il contenuto di `out/`.

### Cron per Instagram (opzionale)

Siccome il feed è bakerato al build, la freschezza dipende dal
deploy. Per tenere la griglia Instagram aggiornata senza
intervento manuale:

- Vercel → Settings → Cron Jobs
- POST a un deploy hook ogni 6 ore

In alternativa Loris può chiedere un rebuild manuale o si può
sostituire il feed con un widget embedded ([Behold.so](https://behold.so)
gratis, o l'API Graph ufficiale che richiede Meta Business).

---

## 3. Cosa resta da fare in codice

Nessuno di questi è bloccante — il sito parte e si posiziona
competitivo così com'è. Affronta nell'ordine di impatto-per-ora.

### A. Ottimizzazione immagini (penalità Lighthouse)

È il TODO più vecchio del README. Tutte le foto sono JPG, nessuna
ha varianti AVIF/WebP, non tutti i tag `<img>` portano width/height
(la maggior parte sì, alcuni no). Il Cumulative Layout Shift è
mediocre.

La fix pulita:

- Aggiungi `sharp` alle `dependencies` (è già in
  `trustedDependencies`)
- Scrivi `scripts/optimise-images.mjs` che scansiona
  `public/images/` come `prebuild`, genera fratelli `.avif` e
  `.webp`, ed emette un manifest che mappa
  `originale → { avif, webp, w, h }`
- Sostituisci `<img src=…>` con blocchi `<picture>`: source
  AVIF → source WebP → fallback JPG
- Usa il manifest per iniettare attributi width/height ovunque

Tempo stimato: 2-3 ore. I punteggi Lighthouse Performance e CLS
salgono di 5-15 punti.

### B. Vera immagine OG cover

`public/images/hero-sunset.jpg` è 1586×2410 (taglio verticale).
I metadati dichiarano 1200×630 (default OG). Oggi funziona ma il
crop non è perfetto.

Genera `public/images/og-cover.jpg` come 1200×630 vero e proprio,
con wordmark + tagline impressi (idealmente per lingua — 4 versioni).
Collega in `app/[locale]/layout.tsx` `openGraph.images`.

### C. Set di favicon migliore

`public/favicon.ico` è il file 32×32 multi-risoluzione esistente.
Per il punteggio PWA e per icone Apple Touch / Android Home Screen
proper, genera:

- `public/icon-192.png` (192×192)
- `public/icon-512.png` (512×512)
- `public/apple-touch-icon.png` (180×180)
- `public/safari-pinned-tab.svg` (monocromatica)

Aggiorna l'array icons in `manifest.webmanifest` e
`app/layout.tsx` metadata.icons. Sorgente più semplice: genera da
un SVG pulito del wordmark "Como Boat Rental" (o di una sagoma di
barca) usando [realfavicongenerator.net](https://realfavicongenerator.net).

### D. Lock-in della variante + palette

In questo momento i visitatori vedono un toggle flottante in alto
a destra. Quando Loris sceglie una combinazione (vedi `PER-LORIS.md`):

1. Modifica `DEFAULT_VARIANT` e `DEFAULT_PALETTE` in cima a
   `app/components/HomePage.tsx` con i codici scelti
2. Cancella l'intero blocco `<div className="vp-toggle">…</div>`
3. Cancella le regole `===== Variant + Palette toggle =====` in
   fondo a `app/globals.css`

Il copy della variante e il CSS della palette rimangono dove sono
— il toggle diventa solo hardcoded.

### E. Widget di prenotazione sulle pagine tour

Loris potrebbe iscriversi a **Bokun** (sistema di prenotazione di
proprietà di Tripadvisor) — vedi `PER-LORIS.md`. Quando lo fa,
ogni pagina tour può ricevere un calendario di disponibilità
embeddato sopra il blocco FAQ. Bokun fornisce uno snippet iframe.

Inseriscilo in `app/[locale]/tours/[slug]/page.tsx` tra il blocco
CTA e il blocco FAQ. Considera anche di mostrare uno stato di
"loading" mentre l'iframe Bokun si carica e di garantire che
l'altezza dell'iframe non causi CLS.

### F. Cadenza blog

Il blog ha un solo articolo seed. Aggiungere articoli è meccanico:

1. Aggiungi uno slug a `BLOG_SLUGS` in `app/content/blog.ts`
2. Aggiungi una entry all'oggetto `blog` con copy EN + IT
3. `bun run build` rigenera il sitemap e aggiunge il nuovo
   articolo a `/<locale>/blog/<slug>/`

Articoli successivi suggeriti:
- "How to visit Villa del Balbianello by boat"
- "Wooden boats vs fibreglass on Lake Como — what to look for"
- "Lake Como wedding proposal by boat: a planning guide"
- "George Clooney's Villa Oleandra: what you can and can't see"

### G. Pass nativo russo + arabo

Il copy RU e AR è keyword-targeted e della giusta lunghezza
(200-400 parole per pagina, parità con EN/IT). Quello che manca
è il 10-15% finale di rifinitura che solo un madrelingua porta:
cadenza naturale, idioma, scelte di registro.

Per il russo un madrelingua dovrebbe:

- Affilare i titoli homepage (`app/translations.ts` blocco `ru`)
  per cadenza
- Aggiustare il registro delle FAQ — il fraseggio attuale è
  corretto ma leggermente formale per il mercato del lusso
- Verificare le translitterazioni dei toponimi (Bellagio →
  Беладжо, Cernobbio → Черноббио sono le convenzioni usate)

Per l'arabo un copywriter Gulf-market dovrebbe:

- Affilare il registro dialettale — il copy attuale è in arabo
  standard moderno (MSA), che va bene per la SEO ma è leggermente
  rigido per i viaggiatori Gulf abituati a marketing con
  influenze khaleeji
- Decidere se aggiungere un framing più forte di viaggio
  multi-generazionale / familiare nella pagina del charter
  giornaliero
- Verificare le translitterazioni (Bellagio → بيلاجيو,
  Balbianello → بالبيانيلو sono le convenzioni usate)

File: `app/translations.ts` (sezioni RU/AR), `app/content/tours.ts`
(copy RU/AR in ogni tour), `app/content/destinations.ts`
(copy RU/AR in ogni destinazione), `app/content/faq.ts` (FAQ RU/AR).

### H. Performance & accessibilità

Vincite veloci rimaste:

- Aggiungi una media query `prefers-reduced-motion` per disabilitare
  la barca animata sulla mappa Leaflet (`HomePage.tsx`, il loop
  rAF `step()`)
- Sostituisci gli accordion FAQ `<details>` con bottoni
  `aria-expanded` propri per accessibilità con screen reader
- Audita i tag `<img>` che mancano width/height (qualcuno è
  scivolato — cerca nel codice)
- Aggiungi polyfill `inert` per il menu mobile quando chiuso

---

## 4. Come estendere il sito

### Aggiungere un nuovo tour

1. Aggiungi uno slug a `TOUR_SLUGS` in `app/content/tours.ts`
2. Aggiungi una entry all'array `tours` con copy EN + IT
   (RU + AR può essere un porto dall'EN inizialmente — segna
   come TODO)
3. Scegli `baseIndex` 0-3 per mappare a uno dei 4 tour base in
   `app/translations.ts` (la card homepage). Se il nuovo tour
   non si adatta, aggiungilo anche a `translations.ts`
   `tours.items` per tutte le 4 lingue
4. `bun run build` — sitemap e rotta auto-generano

### Aggiungere una nuova destinazione

1. Aggiungi uno slug a `DESTINATION_SLUGS` in
   `app/content/destinations.ts`
2. Aggiungi una entry a `destinations` con `pinId` matchante un
   pin in `app/translations.ts` `PIN_BASE` (o aggiungi un pin
   nuovo a `PIN_BASE` con lat/lng)
3. Copy EN + IT richiesti; RU/AR opzionali (cadrà su EN se
   `copy[locale]` manca — al momento il codice non gestisce
   gracefulmente locali mancanti, quindi includili anche come
   copia diretta dell'EN)
4. `bun run build`

### Aggiungere una nuova lingua (es. tedesco)

1. Aggiungi `"de"` al type `Locale` in `app/translations.ts`
2. Aggiungi una entry all'array `locales`
3. Aggiungi un blocco di traduzione completo in `translations`
   per `de`
4. Aggiungi le chiavi `de` a tutti gli oggetti `Record<Locale, ...>`
   in:
   - `app/seo.ts` (LOCALE_BCP47, LOCALE_OG)
   - `app/[locale]/layout.tsx` (titles, descs)
   - `app/content/tours.ts` (`copy` di ogni tour)
   - `app/content/destinations.ts`
   - `app/content/faq.ts`
   - `app/content/blog.ts` (opzionale — lascia vuoto per
     saltare il blog in quella lingua)
5. Aggiungi `"de"` all'array `VALID_LOCALES` in ogni
   `app/[locale]/...page.tsx`
6. Se la scrittura richiede un font diverso, aggiungi un import
   `next/font` in `app/layout.tsx`
7. `bun run build`

### Aggiungere un nuovo tipo di schema

1. Aggiungi una funzione builder in `app/jsonld.ts` che restituisce
   un oggetto piano
2. Importala nella `page.tsx` rilevante e aggiungila alla
   chiamata `combine([...])`
3. Valida l'output del build su
   [validator.schema.org](https://validator.schema.org/)

---

## 5. Checklist di verifica

Prima di promuovere qualsiasi modifica in produzione:

1. `bun run build` — nessun errore, tutte le 60+ pagine statiche
   emesse
2. **Schema check**: incolla la URL homepage in
   [search.google.com/test/rich-results](https://search.google.com/test/rich-results) —
   deve mostrare LocalBusiness, AggregateRating, FAQPage, Tour
3. **Lighthouse mobile**: gira da Chrome DevTools sulla homepage.
   Target: Performance ≥ 90, Accessibility ≥ 95, SEO = 100
4. **Sitemap**: visita `/sitemap.xml` e verifica che le nuove
   pagine compaiano
5. **hreflang**: incolla qualsiasi URL pagina interna in
   [aleydasolis.com/english/international-seo-tools/hreflang-tags-generator](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/) —
   deve validare
6. **OG previews**: incolla ogni homepage di lingua in
   [opengraph.xyz](https://www.opengraph.xyz/) — verifica che
   immagine, titolo e descrizione si renderizzino
7. **Test mobile**: apri il sito su un telefono, gira nella
   nav, vai su una pagina tour, conferma che il toggle
   funzioni
8. **Search Console** (post-launch): submitta `/sitemap.xml`,
   richiedi indicizzazione per le 4 homepage di lingua e per
   4 pagine tour principali

---

## 6. Comandi utili e contatti

```bash
# Dev locale
bun run dev

# Build di produzione (gira sync Instagram + Next build)
bun run build

# Preview locale del build di produzione
bun run preview

# Refresh manuale Instagram (senza build completo)
bun run sync:instagram
```

Deploy: push su `main` su GitHub, Vercel auto-deploya.

### Contatto per domande non risolte

Il build originale è stato pair-programmato da David Francesconi
(non-tecnico, se hai domande di implementazione le inoltra) con
Claude. L'architettura è documentata inline in ogni file. Se
qualcosa non è chiaro dai commenti del file da solo, i prossimi
passi sono di solito:

1. Cerca nel codebase il nome della costante o della funzione
2. Controlla `app/seo.ts` e `app/jsonld.ts` per la primitiva
   giusta — la maggior parte delle cose si compone da lì
3. Controlla la sezione 4 di questo documento per il pattern
   di estensione

WhatsApp di Loris e Claudio sono in homepage. Loro gestiscono
il business, non il sito web — per domande sui contenuti sono
loro l'autorità; per domande tecniche, fai riferimento a David.
