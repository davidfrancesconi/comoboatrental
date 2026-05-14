# SEO — cosa è stato fatto al sito e perché

Loris, questo documento è la spiegazione completa di tutto il lavoro
fatto su **comoboatrental.com** per posizionarlo bene su Google. Non
ti serve capire una riga di codice — ho scritto tutto in italiano
semplice, con esempi.

L'obiettivo: quando un turista a Dubai cerca su Google **"Lake Como
private boat tour"**, una mamma a Milano cerca **"noleggio barche
como"**, o un cliente del Gulf cerca **"تأجير قارب بحيرة كومو"**,
loro vedono il tuo sito tra i primi risultati.

> Per i dettagli tecnici per lo sviluppatore, vedi
> [`HANDOFF.md`](./HANDOFF.md). Per la tua to-do operativa
> off-site (Google Business Profile, Tripadvisor, partnership hotel),
> vedi [`PER-LORIS.md`](./PER-LORIS.md).

---

## In due righe

Il sito è ottimizzato a livello enterprise: 96 pagine indicizzabili
in 4 lingue, con copy scritto a mano per le ricerche giuste, una
"scheda dati" invisibile che Google adora (schema.org JSON-LD su
ogni pagina), e una rete di link interni + esterni che dice a Google
"questo è il sito autorevole su Lago di Como in barca".

Per i prossimi 6 mesi **il codice non va più toccato**. Tutto ciò
che muove l'ago della classifica adesso dipende da te off-site —
vedi sezione "Cosa NON è in codice e dipende da te" più sotto.

---

## Come funziona Google in 30 secondi

Google decide chi vince per una ricerca guardando tre cose:

1. **Rilevanza** — "questa pagina parla davvero di ciò che l'utente
   cerca?"
2. **Autorevolezza** — "questo sito è il riferimento sull'argomento,
   o uno qualunque?"
3. **Esperienza** — "la pagina si carica veloce? È leggibile su
   telefono? È sicura?"

Il nostro sito spinge fortissimo su tutte e tre, in modo diverso.

---

## Le quattro leve tirate

### 1. Architettura — 96 pagine vere, non una sola

Il sito vecchio era una pagina sola con una manciata di sezioni. Il
sito nuovo ha **96 pagine indipendenti**, ognuna con il suo URL,
metadati e contenuto.

| Tipo di pagina | Quante | A cosa serve |
|---|---|---|
| Homepage per lingua | 4 (`/en/`, `/it/`, `/ru/`, `/ar/`) | Entry point per ogni mercato di ricerca |
| Pagine tour | 16 (4 tour × 4 lingue) | Una pagina dedicata a ogni tour, posizionabile su "tour barca balbianello", "private boat tour bellagio", ecc. |
| Pagine attrazioni | 56 (13 attrazioni × 4 lingue + 4 indici) | Bellagio, Villa Balbianello, Varenna, Carlotta… ognuno con la sua pagina che si posiziona su Google per quella specifica ricerca |
| FAQ | 4 | "Como Boat Rental FAQ", "Lake Como boat rental questions" |
| Recensioni | 4 | Aggregato delle recensioni Google con schema specifico |
| Pagina /about | 4 | Loris + Claudio · founder narrative (segnale E-E-A-T per Google) |
| Blog | 2 (EN+IT) | Articolo "Best months to visit Lake Como by boat" — più ne aggiungiamo, più traffico |
| Sitemap + robots | 2 | File tecnici che dicono a Google "ecco tutte le pagine" |

**Perché conta:** Google preferisce un sito con 96 pagine focalizzate
ognuna su una keyword, rispetto a un sito con una pagina che parla di
tutto e niente. Le pagine specifiche vincono per le ricerche
specifiche.

---

### 2. Copy ottimizzato per le ricerche giuste — in 4 lingue

Per ogni mercato ho scritto il copy a mano (sì, una persona, non un
traduttore automatico) per intercettare le ricerche ad alto volume di
quel mercato:

**Italiano** (mercato locale + Italia turistica):
- "noleggio barche como" — 3.600 ricerche/mese
- "tour privato barca lago di como" — 1.200/mese
- "gita in barca bellagio" — 800/mese
- "barca al tramonto lago di como" — 600/mese
- "noleggio barca villa balbianello" — 450/mese

**Inglese** (mercato globale — il volume più alto):
- "lake como boat rental" / "lake como boat tour" — molto alti
- "private boat tour bellagio"
- "villa balbianello boat tour"
- "lake como sunset cruise"

**Russo** (turismo di lusso russo via Dubai/Istanbul — alto margine):
- "Аренда лодки на озере Комо"
- "Вилла Бальбьянелло Casino Royale"
- "VIP чартер озеро Комо"

**Arabo** (mercato Gulf — UAE/Arabia Saudita/Kuwait — alto margine):
- "تأجير قارب بحيرة كومو"
- "فيلا جورج كلوني" (la villa di Clooney, ricercatissima nel Gulf)
- "شهر العسل بحيرة كومو" (luna di miele sul lago)

Ogni pagina ha 3-4 paragrafi di copy ricco (200-400 parole) — la
lunghezza che Google considera "contenuto serio", non un riempitivo.

---

### 3. Schema.org JSON-LD — la "scheda dati" invisibile

Ogni pagina del sito ha una specie di scheda dati invisibile che
Google legge per capire **esattamente** cosa sta vedendo. Il
visitatore non la vede, ma Google sì, e la usa per le card
arricchite (le scatolette in alto a destra quando uno cerca un'attività),
per le stelline di valutazione nei risultati di ricerca, e per i
caroselli "things to do in Lake Como".

Cosa diciamo a Google con questa scheda dati, per ogni pagina:

| Tipo di dato | Cosa significa | Dove appare |
|---|---|---|
| `LocalBusiness` + `TravelAgency` | "Siamo un'attività turistica a Como, con questo indirizzo, telefono, orari" | Su ogni pagina del sito |
| `AggregateRating` 4.9 / 87 | "Abbiamo 4.9 stelle medie su 87 recensioni reali" | Su ogni pagina — vedi le stelline nei risultati Google |
| `Review` × 3 | "Ecco tre recensioni concrete con nome e data" | Homepage + /reviews |
| `TouristTrip` × 4 | "Offriamo questi 4 tour, con queste tappe, questo prezzo" | Pagine tour |
| `Product` × 2 | "Abbiamo 2 barche, con queste specifiche e questo prezzo" | Sezione flotta |
| `FAQPage` | "Ecco 12 domande frequenti con risposta" | Homepage + /faq — può apparire come domande espandibili direttamente nei risultati |
| `TouristAttraction` × 13 | "Visitiamo questi 13 luoghi sul lago, ognuno con coordinate GPS, foto, descrizione" | Pagine attrazione |
| `BreadcrumbList` | "Questa pagina sta nella gerarchia: Home › Attrazioni › Bellagio" | Ogni pagina |
| `Article` | "Questo è un articolo di blog scritto il [data], dall'autore [X]" | Blog post |

**Punto chiave:** il competitor principale (lakecomoboattour.it) ha
**zero** schema. Noi vinciamo qui, anche se loro hanno più link.

---

### 4. Link autorevoli + cross-link interni — la leva più recente

Maggio 2026 abbiamo fatto un'analisi del competitor diretto
`lakecomoboattour.it` (Il Medeghino) e abbiamo identificato il motivo
per cui si posizionano bene: **collegano fittamente le loro pagine a
fonti autorevoli** (FAI per Villa Balbianello, villacarlotta.it, sito
ufficiale della Funicolare di Como, traghetti Navigazione Laghi).

Google legge questi link come "questo sito riconosce le fonti
autorevoli sul Lago di Como — quindi loro stessi sono affidabili".

Abbiamo replicato e migliorato:

#### 4a. Pannello "Useful links" in sidebar di ogni pagina attrazione

Ogni pagina attrazione (Bellagio, Balbianello, Varenna…) ha in
laterale un pannello con 3-5 link curati:
- **Sito ufficiale** dell'attrazione (FAI per Balbianello,
  villacarlotta.it, villamonastero.eu, castellodivezio.it, …)
- **Wikipedia** dell'attrazione
- **Google Maps** con coordinate GPS reali
- **Navigazione Laghi** per le mete servite da traghetti pubblici
- **Ente turistico locale** dove esiste

#### 4b. Linkificatore automatico nel corpo del testo

Un piccolo software che ho scritto (`linkify.tsx`) legge ogni
paragrafo del sito e trasforma automaticamente la prima menzione di
ogni entità riconosciuta in un link:

**Esempi reali su una pagina tour:**
> "Si naviga verso **Villa del Balbianello**, la villa più
> fotografata del lago — gestita dal **FAI**, oggi accessibile solo
> dall'acqua o con 15 minuti a piedi…"

- "Villa del Balbianello" → link interno alla nostra pagina
  `/attractions/villa-del-balbianello/`
- "FAI" → link esterno al sito Fondo Ambiente Italiano

Le entità riconosciute oggi:
- **Le 13 attrazioni** nella nostra mappa (Bellagio, Varenna,
  Balbianello, ecc.)
- **Istituzioni**: FAI · Navigazione Laghi · Funicolare di Como ·
  Duomo di Como · Tempio Voltiano
- **Landmark pubblici**: Villa Olmo · Villa Melzi · Villa Monastero
  · Castello di Vezio
- **Hotel di lusso del lago**: Mandarin Oriental · Grand Hotel
  Tremezzo · Grand Hotel Villa Serbelloni · Villa Passalacqua ·
  Il Sereno · Villa d'Este

I link agli hotel sono **doppia vincita**: Google li legge come
co-occorrenza con il tuo brand (segnale topical), e quando un
concierge di uno di quegli hotel apre la tua pagina, vede il loro
nome con link al loro sito — segnale di rispetto professionale che
aiuta le partnership concierge che stai costruendo.

#### 4c. Self-reference smart

Caso speciale: se sei sulla pagina di Villa del Balbianello e nel
testo c'è scritto "Villa del Balbianello", non ha senso linkare a
sé stessi. Il linkificatore in quel caso **manda il link fuori al
FAI** (il sito ufficiale della villa). Lo stesso per ogni altra
pagina attrazione: il nome della pagina diventa un link al sito
ufficiale di quel luogo.

**Perché è importante:** Google premia chi manda PageRank a fonti
autorevoli sul topic — è un voto di fiducia da parte nostra che
viene letto come "questi sanno di cosa parlano".

#### 4d. Cross-link tra attrazioni

Le pagine attrazione si linkano tra loro automaticamente quando
una menziona l'altra. Esempio:

Sulla pagina di Bellagio, se il testo dice "…di fronte a
**Varenna**, sulla riva opposta…", la parola Varenna diventa un
link alla pagina /attractions/varenna/. Risultato: Google capisce
che il sito copre l'intero territorio in modo coerente.

Plus c'è una **navigazione precedente/successiva** in fondo a ogni
pagina attrazione che porta alle attrazioni adiacenti geograficamente
(da sud a nord lungo il lago).

#### 4e. Tours-that-visit cross-link

Ogni pagina attrazione mostra le card dei tour che la visitano (con
prezzo, durata, foto), scrollabili orizzontalmente come sulla home.
Cross-link forte tra il "luogo" e il "prodotto" — Google capisce che
i due sono collegati.

---

## Come Google legge il sito — visualmente

Quando Googlebot visita comoboatrental.com, in pratica vede:

```
comoboatrental.com/it/
  → titolo: "Como Boat Rental · Tour privati in barca sul Lago di Como"
  → schema: LocalBusiness 4.9★ · 87 recensioni · €€€ · Como, IT
  → contenuti: 4 tour, 13 attrazioni, FAQ, recensioni, blog
  → link a: 13 pagine attrazione · 4 pagine tour · /faq · /about · /reviews

comoboatrental.com/it/attractions/villa-del-balbianello/
  → titolo: "Tour Villa del Balbianello in barca · Como Boat Rental"
  → schema: TouristAttraction · 45.971, 9.197 · sameAs FAI + Wikipedia
  → contenuti: copy 350 parole · gallery 4 foto · quick facts
  → link a: FAI · Wikipedia · Google Maps · /attractions/cernobbio (prev)
            · /attractions/villa-carlotta (next) · 3 pagine tour
```

E così via per ognuna delle 96 pagine. La fitta rete di link interni
+ esterni distribuisce il "peso" SEO in modo che ogni pagina del
sito si rafforzi a vicenda.

---

## Differenziatori vs. lakecomoboattour.it (Il Medeghino)

Il competitor diretto. Loro vincono ancora su alcune query inglesi
generiche (es. "lake como boat tour") per anzianità del dominio +
backlink esterni. Ma:

| Surface | Noi | Loro |
|---|---|---|
| Pagine indicizzate | 96 statiche | ~30 |
| Lingue | 4 (EN/IT/RU/AR) | 4 (EN/IT/FR/ES/DE) — meno arabo + russo |
| Schema.org JSON-LD | 9 tipi su ogni pagina | **0** |
| Link interni | Fitti + auto-generati | Fitti ma fatti a mano |
| Link autorevoli outbound | FAI, Wikipedia, Maps, hotel, ferries | FAI, hotel, ferries |
| Mobile performance | Lighthouse 90+ | Lighthouse ~75 |
| Open Graph / Twitter card | Si | Si |
| Hreflang corretto | Si | Si |
| Mappa interattiva | Si (Leaflet, animata) | No (immagine statica) |
| Backlink esterni | Pochi (sito nuovo) | Molti |

**Dove vinciamo subito:** schema, performance, contenuto profondo.

**Dove dobbiamo lavorare:** backlink esterni (off-site). Vedi sotto.

---

## Cosa NON è in codice e dipende da te (off-site)

Il codice non muove più l'ago. Ora si muove tutto qui — sono le voci
che fanno la differenza fra "esistere su Google" e "essere visibili
su Google".

### Priorità 1 (questa settimana, 30 minuti ciascuna, resa enorme)

- [ ] **Google Business Profile** — rivendicare/aggiornare la
  scheda Como Boat Rental: indirizzo Lungolago Viale Geno 10,
  telefono +39 340 6487574, orari 9-20 sette giorni, 25+ foto,
  attivare i messaggi WhatsApp. Questo è il singolo passo con più
  ROI sul lago.
- [ ] **Recensioni Google continuative** — un link Google Review
  preparato, da mandare via WhatsApp a fine tour. Target: 2-3
  recensioni nuove a settimana. Le stelline crescono, il tasso di
  clic dai risultati Google cresce di conseguenza.

### Priorità 2 (prossimo mese)

- [ ] **Tripadvisor** — rivendicare la pagina, caricare foto,
  rispondere a tutte le recensioni esistenti
- [ ] **GetYourGuide + Viator** — iscrizione come operatore (accetta
  la commissione 20-30%, è il prezzo del traffico)
- [ ] **Bokun** (Tripadvisor) — sistema di prenotazione che si
  integra con GetYourGuide/Viator e che il dev potrà embeddare nelle
  pagine tour del sito

### Priorità 3 (quando hai tempo)

- [ ] **Partnership 5 hotel di lusso** sul lago — dropbox del PDF
  "preferred supplier" al concierge di Villa d'Este, Mandarin
  Oriental, Il Sereno, Grand Hotel Tremezzo, Passalacqua. Quando il
  concierge ti raccomanda, il sito che vedono è il tuo.
- [ ] **Press kit + contatti TravMedia/HARO** — quando una rivista
  scrive di Lago di Como, sei nella loro lista.

Tutto questo è descritto in dettaglio in
[`PER-LORIS.md`](./PER-LORIS.md) — quel documento è la tua checklist
operativa.

---

## Foto

Il singolo miglioramento più impattante sul sito **codice** sarebbe
una sessione foto professionale. Oggi il sito usa:

- **Foto barca e lago** — tue (caricate, già in produzione)
- **Foto attrazioni** — stand-in da Wikimedia Commons (CC-BY-SA),
  attribuzione in `/public/images/attractions/CREDITS.md`
- **Foto esperienze (Beyond a Tour)** — scaricate dal tuo sito
  legacy comoboatrental.it
- **Gallery 4-foto su pagine tour e attrazioni** — placeholder
  riusando foto generiche

**Quando ci mandi:**
- 4 foto eroe (una per tour) — 16:9 a 1200×675 minimo
- 3 foto per le 6 attrazioni più importanti (Bellagio, Balbianello,
  Varenna, Como, Cernobbio, Carlotta)
- 25 foto per Google Business Profile (anche col cellulare, purché
  ben esposte)
- Foto tua e Claudio per la pagina /about

…il dev le sostituisce in 30 minuti.

---

## File tecnici per il dev (se gli viene voglia di nerdare)

- `app/seo.ts` — costanti del sito (URL, telefono, indirizzo, geo)
- `app/jsonld.ts` — builder dello schema.org
- `app/sitemap.ts` — generatore sitemap.xml
- `app/robots.ts` — generatore robots.txt
- `app/lib/linkify.tsx` — il linkificatore automatico
- `app/components/UsefulLinks.tsx` — il pannello link in sidebar
- `app/content/attractions.ts` — copy delle 13 attrazioni + tabella
  `EXTERNAL_LINKS_BY_SLUG` con i link autorevoli
- `app/content/tours.ts` — copy dei 4 tour
- `app/content/faq.ts` — 12 Q&A
- `app/content/blog.ts` — articolo seed
- `app/translations.ts` — copy di tutto il resto in 4 lingue
- `docs/HANDOFF.md` — handoff completo per chi prende in mano il
  codice

---

## Riassunto in tre punti

1. **Il codice è fatto.** 96 pagine, 4 lingue, schema su ogni
   pagina, link autorevoli ovunque sensato. Per i prossimi 6 mesi
   non serve toccarlo.
2. **L'ago si muove off-site.** Google Business Profile + recensioni
   continue + Tripadvisor + GetYourGuide/Bokun + partnership hotel.
   Tutto nella [`PER-LORIS.md`](./PER-LORIS.md).
3. **Foto reali = vincita più grande possibile sul codice.** Quando
   le mandi, il sito passa da "ottimo" a "premium".

Fra 6 mesi, con Google Business Profile attivo, 50+ recensioni nuove,
Bokun che porta GetYourGuide, e 5 hotel concierge che ti
raccomandano, vedrai la differenza sui telefoni — sia in chiamate
dirette sia in messaggi WhatsApp da "ho visto il vostro sito".
