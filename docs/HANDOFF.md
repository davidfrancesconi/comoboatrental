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
- **88 pagine statiche** generate al build:
  - 4 varianti homepage (una per lingua)
  - 4 tour × 4 lingue = 16 pagine tour
  - 4 pagine indice attrazioni (una per lingua) + 13 attrazioni × 4 lingue = 56 pagine attrazioni
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
| `app/content/attractions.ts` | 13 attrazioni × 4 lingue — slug, pinId, copy completo (metaTitle, paragraphs, goodToKnow, cross-link ai tour) per pagina dettaglio. Stesso file alimenta lo strip homepage, la lista `/attractions/` e i 13 page dedicate |
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
- `TouristAttraction` / `Place` × 13 attrazioni con `geo`
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

### D. Lock-in della variante + palette ✓ FATTO

Il toggle flottante (Variant + Palette) è stato rimosso dalla
produzione. Variante e palette sono ora hardcoded a "A · A"
(Editorial + Parchment). Il CSS delle altre 4 palette e il copy
delle altre 2 varianti restano nei file per riferimento futuro —
se Loris vuole rivisitare la scelta, basta ripristinare il
blocco `<div className="vp-toggle">…</div>` dalla git history.

### E. Widget di prenotazione sulle pagine tour

Loris potrebbe iscriversi a **Bokun** (sistema di prenotazione di
proprietà di Tripadvisor) — vedi `PER-LORIS.md`. Quando lo fa,
ogni pagina tour può ricevere un calendario di disponibilità
embeddato sopra il blocco FAQ. Bokun fornisce uno snippet iframe.

Inseriscilo in `app/[locale]/tours/[slug]/page.tsx` tra il blocco
CTA e il blocco FAQ. Considera anche di mostrare uno stato di
"loading" mentre l'iframe Bokun si carica e di garantire che
l'altezza dell'iframe non causi CLS.

### E-bis. Booking Form sulla home — mailto fallback

La sezione contatti della home è stata sostituita con una
**Booking Form inline** (`app/components/BookingForm.tsx`) con
data, fascia oraria, tour, party-size, pick-up, nome, email,
messaggio. **Il submit oggi apre il client email dell'utente
via `mailto:` precompilato** — soluzione zero-backend per il sito
statico Vercel. Quando il dev vuole upgradare a un flow vero che
arrivi in inbox senza passare dal client utente, tre opzioni
ordinate da semplice a complessa:

1. **Formspree** (formspree.io, free 50 submissions/mese) —
   sostituire `onSubmit` con `<form action="https://formspree.io/f/XXX" method="POST">`,
   togliere il preventDefault. Email automatica a info@. Zero
   codice backend, 5 minuti di setup.
2. **Vercel serverless function** — creare
   `app/api/booking/route.ts` (richiede passare a output
   "standalone" invece di "export", o usare Edge Function),
   POST via fetch, Vercel manda mail via Resend / SendGrid.
   Più lavoro ma controllo totale.
3. **Web3Forms** o **Netlify Forms** — simili a Formspree.

Per ora il mailto: funziona, è universale, gratis, e mantiene
zero dipendenze.

Lo stesso pattern vale per **`app/components/Newsletter.tsx`**
(slim band "Send me a sample itinerary" appena prima della
Booking Form): submit `mailto:` precompilato verso `info@`. Quando
il dev wire up Formspree o Mailchimp/Brevo per costruire una mailing
list vera, basta sostituire l'`onSubmit` con un POST.

### E-ter. Iterazione Claude Design (maggio 2026) — features già live

Tutta la **iterazione di redesign Claude Design** (bundle
`api.anthropic.com/v1/design/h/ClVcnISGVbOjHsRFrF0qwQ`, maggio 2026)
è stata implementata, **eccetto** il footer sitemap-style (item #17,
deliberatamente saltato: il sitemap.xml copre già il crawl depth,
i link humans-facing rimangono nel pannello footer compatto). Cose
da sapere per il dev che subentra:

- **`<BookingForm>`** (`app/components/BookingForm.tsx`): client
  component con state per stepper party-size (2–10), radio tour
  con prezzo, dropdown pick-up, mailto handler. **Sidebar include
  ora l'embed Google Maps della base** (era una sezione "Our Base"
  separata, mergiata qui per ridurre lo scroll).
- **`<Newsletter>`** (`app/components/Newsletter.tsx`): band slim
  con email field + mailto. Sostituibile con Formspree/Mailchimp
  come sopra.
- **Pagina dettaglio attrazione** (`app/[locale]/attractions/[slug]/page.tsx`):
  layout 60/40 con sidebar sticky. La sidebar contiene:
  - **`<MiniLakeMap>`** (`app/components/MiniLakeMap.tsx`) — SVG
    statico del profilo Y del Lago di Como, pin in oro per
    l'attrazione attiva, label + distance box. Pin position
    derivata da `PIN_BASE` (stesso array usato dalla mappa
    Leaflet della home).
  - **Quick-facts card** — 4 righe: Where (regione lago), Distance
    from Como (km + min, via haversine inline), Type (port/villa/
    town/nature da `PIN_BASE`), Best season (Maggio–Settembre,
    generico). Se Loris fornisce in futuro fact più precisi
    (Entry fee, Open hours, Photographs spots), si possono
    estendere a 7 righe — vedi commento in cima al file.
  - **CTA "Add to a tour"** — anchor a `#booking` con label
    contestualizzato all'attrazione.
- **Adjacent destinations nav** in fondo alla pagina attrazione:
  `← Previous · 07 of 14 · Isola Comacina | Next · 09 of 14 · Villa La Cassinella →`.
  L'ordine deriva da `ATTRACTION_SLUGS` in
  `app/content/attractions.ts` (geo-ordered south to north).
- **Photo gallery placeholder** (1 hero + 3 thumbs) sulle pagine
  tour e attrazione. Oggi riusa stock images da `/public/images/`;
  quando Loris fornisce le foto per attrazione/tour, basta
  sostituire le costanti in cima alla pagina.
- **Pagina /about**: founder narrative (Loris + Claudio) con
  copy placeholder marcato `[Placeholder]` dove serve la storia
  vera. Vedi `PER-LORIS.md` per cosa scrivere.
- **FAQ accordion homepage**: prime 6 Q&A da `FAQS[locale]`
  (`app/content/faq.ts`) sopra il form di booking. Cattura
  oggetti FAQPage JSON-LD a livello pagina.
- **Section "Explore the Lake"**: heading umbrella che copre
  sia il blocco mappa (Leaflet animato) sia lo strip attrazioni.
  Riduce due section-head ridondanti a uno.
- **Sezione Experiences + Instagram condensate**: niente più
  big section-head, solo eyebrow + h2 + cards. Riduce lo scroll
  prima del CTA principale.
- **Renumber sezioni home** in ordine corretto: 01 Tours, 02
  Explore the Lake, 03 Fleet, 04 Beyond a Tour, 05 Guests, 06
  Follow, 07 FAQ, 08 Sample itinerary, 09 Reservations (era
  duplicato 03 → fixato).
- **Hero**: rimosso il double-CTA "Browse tours" + "Reserve a
  boat". Tenuto solo "Reserve a boat →" gold come CTA primario.
  Aggiunta riga `from €220 · 1-hour tour up to €1,400 · full-day
  charter` sotto subhead (`t.hero.priceTier`).
- **Tour card price**: cambiato da `**€220** from` a `<small>from</small>
  **€220**` per coerenza visiva.
- **Toggle VP rimosso**: vedi sezione D sopra (✓ FATTO).

### E-quater. Foto reali (placeholder oggi)

Le gallerie photo (1 hero + 3 thumbs) sulle pagine tour e
attrazione usano oggi **stock images** dalla cartella esistente
`/public/images/`. La struttura della galleria è pronta — basta
sostituire le costanti in cima alle rispettive `page.tsx` con i
path delle foto reali quando Loris le fornisce. Vedi
`PER-LORIS.md` per la lista esatta delle foto richieste.

### E-quinquies. Item esplicitamente differiti dalla Claude Design v2

Implementato tutto dal bundle Claude Design **eccetto**:

- **Footer sitemap-style con link a 14 attrazioni + 4 tour**
  (item #17 della lista Claude Design). Saltato a ragion veduta:
  il `sitemap.xml` copre già il crawl depth per Google; per gli
  umani la nav esistente + i cross-link dalla home bastano. Se
  Loris vuole un footer-mega in futuro è un'aggiunta di 30
  minuti — può vivere come componente `<FooterSitemap />` in
  `app/components/InnerPage.tsx` e essere mostrato sotto
  `<InnerPageFooter />`.
- **Unified Map+Attractions con mappa sticky a sinistra + cards
  scrollabili a destra** (item #13 della lista Claude Design).
  Tenuto le due sezioni separate (umbrella "Explore the Lake"
  + Leaflet map + attractions strip). Motivazione: la mappa
  Leaflet animata con barca-orbiting è la firma visiva della
  home; la versione unified Claude Design usava una SVG statica
  che è meno cinematografica.

### E-sexies. SEO link strategy (maggio 2026)

Dopo un'analisi del competitor `lakecomoboattour.it` (dense outbound
+ internal linking è la loro arma SEO principale) abbiamo aggiunto:

**Per ogni attrazione:** pannello "Useful links" in sidebar con
3-5 URL curati — Wikipedia, sito ufficiale (FAI, villacarlotta.it,
funicolarecomo.it…), Google Maps con coordinate, e dove ha senso
Navigazione Laghi o ente turismo locale.

I dati vivono in **`EXTERNAL_LINKS_BY_SLUG`** in
`app/content/attractions.ts` — una tabella `Record<slug,
ExternalLink[]>` separata dalle `attractions[]`, così la copy del
contenuto resta pulita.

**Aggiungere link a un'attrazione nuova:** appendi un'entry al
record. Tipi disponibili: `official` / `maps` / `wiki` / `transport`
/ `tourism`. Almeno una `maps` per ogni nuova entry; ideale anche
una `wiki`. Le etichette restano nella lingua originale (Italian
institutions are recognised by their original names — stessa logica
dei toponimi).

**Auto-linkifier interno:** il helper `app/lib/linkify.tsx` scansiona
qualunque stringa di body copy e trasforma la PRIMA occorrenza di
ogni nome di attrazione (Bellagio, Villa del Balbianello, Carlotta,
ecc.) in un link `<a>` verso la pagina attrazione corrispondente. Si
applica a:
- paragrafi e bullet "Good to know" delle pagine attrazione
- step itinerario delle pagine tour
- body del blog
- whitelist di entità autorevoli ("FAI", "Navigazione Laghi",
  "Funicolare di Como") che ottengono link esterno fisso

Il helper rispetta `<em>` e `<br/>` (è un superset di `renderRich`).
Skippa self-link (un'attrazione non linka sé stessa).

**JSON-LD:** `placeJsonLd()` ora emette `sameAs` (Wikipedia + sito
ufficiale per ogni attrazione) e `subjectOf`. Sul homepage,
`localBusinessJsonLd()` accetta `mentions` — passiamo i 13 URL
delle pagine attrazione per dire esplicitamente "questa attività
copre questi luoghi".

**Cosa NON è ancora linkato:**
- Tag film (Casino Royale / Star Wars per Balbianello) — saltato
  perché link a IMDb non aiutano SEO di un'attività turistica
- Cross-network di brand siblings (il competitor punta a Amalfi /
  Maggiore) — niente brand sibling da puntare oggi

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
(copy RU/AR in ogni tour), `app/content/attractions.ts`
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

### Aggiungere una nuova attrazione

1. Aggiungi uno slug a `ATTRACTION_SLUGS` in
   `app/content/attractions.ts`
2. Aggiungi una entry a `attractions` con `pinId` matchante un
   pin in `app/translations.ts` `PIN_BASE` (o aggiungi un pin
   nuovo a `PIN_BASE` con lat/lng + le note per tutte e 4 le lingue)
3. Riempi il blocco `copy` per tutte e 4 le lingue: `name`, `blurb`,
   `metaTitle`, `metaDesc`, `headline`, `kicker`, `paragraphs[]`,
   `goodToKnow[]`
4. Imposta `toursThatVisit` con gli slug dei tour che visitano
   l'attrazione (cross-link sulla pagina dettaglio)
5. Aggiungi un'entry a `EXTERNAL_LINKS_BY_SLUG` (stesso file) con
   3-5 link autorevoli — almeno una `maps` e una `wiki` quando
   esistono; vedi sezione E-sexies sopra per il pattern completo
6. `bun run build` — la pagina dettaglio, l'entry nella lista
   `/attractions/`, la card nello strip homepage e la voce in
   sitemap.xml si generano automaticamente

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
   - `app/content/attractions.ts`
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
