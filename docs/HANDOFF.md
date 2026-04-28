# Como Boat Rental — handoff per lo sviluppatore

Questo documento è il passaggio di consegne tra il lavoro di fondazione
fatto da David e lo sviluppatore front-end che porterà avanti il sito
per Loris e Claudio. Copre:

1. **Cosa c'è già nel codice** — ogni superficie SEO e di contenuto
   attualmente in produzione
2. **Cosa resta da fare in codice** — task concreti che lo sviluppatore
   dovrebbe prendere subito
3. **Cosa deve fare Loris (o chiunque gestisca il business) fuori dal
   sito** — Google Business Profile, listing OTA, sistema di
   prenotazione, stampa
4. **Come estendere il sito** — aggiungere tour, destinazioni, articoli
   blog, lingue, tipi di schema

Se prendi in mano il progetto da zero, leggi nell'ordine — le sezioni
si costruiscono l'una sull'altra.

Tutta la documentazione tecnica (commenti nei file, README, questo
documento) è in inglese o italiano a seconda del file. Il codice
stesso è in inglese standard. La parte rivolta a Loris vive in
`docs/PER-LORIS.md`.

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
  scelto; vedi sezione "Cosa resta da fare" sotto.
- **Feed Instagram live**: `scripts/sync-instagram.mjs` gira come
  `prebuild` e prende gli ultimi 6 post pubblici da `@comoboatrental`
  scrivendoli in `public/instagram-feed.json`, con ogni tile che
  porta la sua accessibility caption come alt text.
- **Switcher locale**: naviga tra `/en/`, `/it/`, `/ru/`, `/ar/` via
  URL reali (non stato JS). L'attributo `<html lang>` e `dir` cambia
  prima del paint grazie a un piccolo script inline in
  `app/layout.tsx`.

---

## 2. Cosa resta da fare in codice

Affronta nell'ordine di impatto-per-ora. Nessuna è bloccante — il sito
parte e si posiziona competitivo così com'è.

### A. Ottimizzazione immagini (altrimenti penalità Lighthouse)

È il TODO più vecchio del README. Tutte le foto sono JPG, nessuna
ha varianti AVIF/WebP, non tutti i tag img portano width/height
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
a destra. Quando Loris sceglie una combinazione:

1. Modifica `DEFAULT_VARIANT` e `DEFAULT_PALETTE` in cima a
   `app/components/HomePage.tsx` con i codici scelti
2. Cancella l'intero blocco `<div className="vp-toggle">…</div>`
3. Cancella le regole `===== Variant + Palette toggle =====` in
   fondo a `app/globals.css`

Il copy della variante e il CSS della palette rimangono dove sono
— il toggle diventa solo hardcoded.

### E. Widget di prenotazione sulle pagine tour

Quando Loris si iscrive a **Bokun** (vedi sezione 3 sotto), ogni
pagina tour riceve un calendario di disponibilità embeddato sopra
il blocco FAQ. Bokun fornisce uno snippet iframe — incollalo in
`app/[locale]/tours/[slug]/page.tsx` tra il blocco CTA e il
blocco FAQ.

### F. Cadenza blog

Il blog ha un solo articolo seed. Aggiungere articoli è meccanico:

1. Aggiungi uno slug a `BLOG_SLUGS` in `app/content/blog.ts`
2. Aggiungi una entry all'oggetto `blog` con copy EN + IT
3. `bun run build` rigenera il sitemap e aggiunge il nuovo
   articolo a `/<locale>/blog/<slug>/`

Articoli successivi suggeriti:
- "How to visit Villa del Balbianello by boat" (corrisponde al
  contenuto #1 di Nagi nei ranking)
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
  aria-expanded propri per friendliness con screen reader
- Audita i tag `<img>` che mancano width/height (qualcuno è
  scivolato — cerca nel codice)
- Aggiungi polyfill `inert` per il menu mobile quando chiuso

---

## 3. Cosa deve fare Loris (o David) fuori dal sito

Il sito è una fondazione. La maggior parte del traffico per un
operatore del Lago di Como arriva da canali che non crawlano il
tuo sito — ti listano nel proprio catalogo. Il sito comunque deve
*supportare* quei canali (con schema corretto, OG card, deep link),
e questo è fatto — ma registrazioni e attività continua sono
lavoro fuori sito.

Ordinato per impatto-per-ora per un operatore di barche private
sul Lago di Como:

### Tier 1 — must-have

#### 1. Google Business Profile

Gratis. Driver delle ricerche mobile "near me". Setup ~30 min,
manutenzione continua ~30 min/settimana.

**Checklist setup:**

- Iscriviti a [business.google.com](https://business.google.com/)
  con la mail con cui Loris gestisce il business
- **Categoria primaria**: "Boat tour agency"
- **Categorie secondarie**: "Tour operator", "Sightseeing tour
  agency"
- **Indirizzo**: Lungolago Viale Geno, 10, 22100 Como CO, Italy
- **Telefono**: +39 340 6487574
- **Sito web**: https://comoboatrental.com/it/
- **Orari**: Lun–Dom 09:00–20:00 (tutto l'anno)
- **Service area**: Lake Como (la regione geografica, non solo
  Como)
- **Attributi**: "Accepts reservations", "Family-friendly",
  "Wheelchair accessible" (se vero), "LGBTQ+ friendly"
- **Lista servizi** (come voci separate con descrizione + prezzo):
  1. *Lake Como Highlights* · 1h · €220
  2. *Balbianello & Nesso* · 2.5h · €480
  3. *Half-Day Top Villas* · 4h · €780
  4. *Full-Day Bespoke Charter* · 6–8h · da €1.400
  5. *Charter matrimoni e occasioni speciali*
  6. *Charter shooting fotografici e produzioni*
- **Foto**: caricane almeno 25 — barche, ville viste dall'acqua,
  skipper al timone, ospiti a bordo (con consenso), dettagli
  (cruscotto in mogano, sedute in pelle)
- **Q&A seeding**: copia le FAQ da `app/content/faq.ts` e
  pre-popola la sezione Q&A in modo che i visitatori vedano
  subito le risposte
- **Cadenza post** (continua nel tempo, ~30 min/settimana):
  - Lun — meteo della settimana + disponibilità
  - Gio — foto del tour del weekend precedente
  - Dom (in stagione) — foto del tramonto

#### 2. Tripadvisor

Gratis. La singola piattaforma di recensioni più importante per
il Lago di Como. Obiettivo: top 10 in "Things to Do in Como".

- Rivendica il profilo su [tripadvisor.com/Owners](https://www.tripadvisor.com/Owners)
- Categoria: "Tours & Activities" → "Boat Tours"
- **Rispondi a ogni recensione entro 48 ore** (l'algoritmo
  Tripadvisor premia la velocità di risposta)
- Dopo ogni tour: manda al cliente un breve messaggio
  WhatsApp con il link Tripadvisor per lasciare la recensione.
  Obiettivo: 1 recensione ogni 10 tour (baseline di settore)
- Quando arrivi a 50+ recensioni, il posizionamento parte da
  solo

#### 3. GetYourGuide

L'OTA con più volume per il Lago di Como. Commissione ~20-30%.
Application su [getyourguide.supply](https://www.getyourguide.supply/).

Cose richieste dal sito (già spedite):
- AggregateRating + schema Review ✓
- Schema TouristTrip per ogni tour ✓
- Immagini ad alta risoluzione 16:9 (alcune in `public/images/`
  sono già 16:9; lo sviluppatore deve generare crop appropriati
  1200×675 per ogni tour — vedi "Cosa resta da fare, A.
  Ottimizzazione immagini")

#### 4. Viator (Tripadvisor Experiences)

Sorella di Tripadvisor; lo stesso listing va in entrambi.
Application su [supplier.viator.com](https://supplier.viator.com/sign-up-info).
Stessa documentazione di GetYourGuide.

### Tier 2 — alto impatto, urgenza inferiore

#### 5. Bokun (sistema di prenotazione) — **consigliato rispetto a FareHarbor**

Bokun è il sistema di prenotazione di proprietà di Tripadvisor.
Una volta integrato, **un solo calendario si sincronizza con 50+
OTA** (Viator, Tripadvisor, GetYourGuide, Klook, Civitatis, Tiqets,
Headout, Manawa, e altri). Elimina il rischio di doppie
prenotazioni che viene dal gestire più OTA manualmente.

1. Iscriviti su [bokun.io](https://www.bokun.io)
2. Crea i prodotti che rispecchiano `app/content/tours.ts`
   (4 tour)
3. Prendi lo snippet embed per ogni tour
4. Passalo allo sviluppatore per inserirlo nelle pagine tour
   (vedi "Cosa resta da fare in codice, E")

Perché Bokun e non FareHarbor:
- Sync nativo con Viator + Tripadvisor (FareHarbor è di
  Booking Holdings, ottimizzato per Booking.com)
- Minore frizione di setup in Europa
- Migliore supporto per IVA europea e fatturazione tasse del lago

#### 6. Airbnb Experiences

Rilanciato nel 2025 con "Airbnb Originals". Margine migliore
(Airbnb prende 15-20%). Application su
[airbnb.com/experiences](https://www.airbnb.com/host/experiences).
Onboarding più veloce di Viator.

#### 7. Booking.com Experiences

Più nuovo, meno trasparente degli altri. Si raggiunge tramite il
supporto partner di Booking.com. Commissione ~15-20%. Vale la
pena farlo una volta che Bokun è in piedi — aggiunge volume
incrementale senza grande sforzo.

#### 8. Canali specifici italiani (spesso ignorati dagli operatori stranieri)

- **Lake Como Tourism Board** (lakecomotourism.it) — fai domanda
  per essere preferred-supplier listing. Gratis, credibilità
  istituzionale.
- **Musement** (di TUI) — forte per gruppi turistici europei.
  Application via [supplier.musement.com](https://supplier.musement.com/)
- **Italyscape** — DMC B2B. Contattali direttamente
  (sales@italyscape.com) per partnership concierge premium
- **PagineGialle.it / Virgilio.it** — directory locali italiane,
  iscrizione gratuita. Impatto basso ma frizione nulla

### Tier 3 — slow-burn, brand-building

#### 9. Stampa & editoriale

Vincite più lente (settimane-mesi) ma compongono per anni
attraverso i backlink.

- **HARO** (helpareporter.com) — giornalisti pubblicano
  richieste di fonti su Lake Como ogni settimana. Iscriviti,
  imposta alert su Italia/travel, rispondi a quelle rilevanti
- **TravMedia** (travmedia.com) — distribuisci comunicati
  stampa a pubblicazioni travel
- **Stampa locale Lake Como** — La Provincia di Como, Corriere
  della Sera (edizione Lombardia). Un articolo feature = link
  juice locale + interesse walk-in
- **Stampa wedding** — Junebug Weddings, Vogue Sposa, Wedding
  Italy. Pitcha l'angolo proposta/matrimonio — è il prodotto a
  margine più alto

#### 10. Partnership concierge hotel

Il singolo canale a margine più alto. Gli hotel indirizzano
i loro ospiti verso operatori barca di fiducia; in cambio si
aspettano che la barca passi al loro pontile e riporti gli
ospiti puntuali.

Target principali (in ordine di priorità):
- **Villa d'Este** (Cernobbio) — il top
- **Passalacqua** (Moltrasio)
- **Mandarin Oriental** (Blevio)
- **Il Sereno** (Torno)
- **Grand Hotel Tremezzo** (Tremezzo)
- **Grand Hotel Villa Serbelloni** (Bellagio)
- **Filario** (Lezzeno)
- **Casta Diva Resort** (Blevio)

Processo: manda un PDF di una pagina al concierge desk (un
"preferred-supplier pitch" — barche, foto, qualche testimonial
con i nomi degli hotel), richiama dopo qualche giorno, offri
un giro di familiarizzazione (1 ora di tour gratuito per il
head concierge + famiglia). Commissione: 10-15% al fondo
concierge dell'hotel è standard.

### Tier 4 — discovery

#### 11. Instagram

Già su @comoboatrental. Il sito mostra automaticamente le ultime
6 foto in homepage. Tattiche di crescita suggerite:

- Post 3-5 volte a settimana — barche, ville, esperienze ospiti
  (con consenso)
- Reels con riprese drone geotaggati "Lake Como"
- Mix hashtag per post: 2 mega (#LakeComo, #LagodiComo), 8 medi
  (#PrivateBoatTour, #BellagioBySea, #ItalyVacation), 8 piccoli
  (#ComoBoatTour, #WoodenBoatLakeComo)
- **Collab post** con influencer in visita (offri un giro
  corto gratuito in cambio di un post collab)

#### 12. TikTok

Salta finché Instagram non gira a regime. Quando sei pronto, lo
stesso contenuto rebrandato come TikTok funziona perfettamente.

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

## 6. Riferimento comandi utili

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

---

## 7. Contatto per domande non risolte

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
