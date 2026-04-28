// Blog seed — one evergreen post in EN + IT.
// The dev can extend this pattern: add an entry to BLOG_POSTS, run
// `bun run build`, and the post appears at /<locale>/blog/<slug>/
// with a sitemap entry, JSON-LD Article schema and BreadcrumbList.

import type { Locale } from "../translations";

export type BlogParagraph =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  metaTitle: string;
  metaDesc: string;
  /** Article H1 (may include <em>) */
  title: string;
  /** Author byline — Loris, Claudio or "Como Boat Rental" */
  author: string;
  /** ISO date */
  datePublished: string;
  /** Hero image */
  hero: string;
  /** Article body */
  body: BlogParagraph[];
};

export const BLOG_SLUGS = ["best-months-lake-como-by-boat"] as const;
export type BlogSlug = (typeof BLOG_SLUGS)[number];

export const blog: Record<BlogSlug, Partial<Record<Locale, BlogPost>>> = {
  "best-months-lake-como-by-boat": {
    en: {
      metaTitle: "The Best Months to Visit Lake Como by Boat — A Skipper's Guide",
      metaDesc:
        "Month-by-month guide to Lake Como by boat from a third-generation lake skipper. Weather, light, lake temperature, crowds, and the right itinerary for each season.",
      title: "The best months to visit Lake Como <em>by boat</em>",
      author: "Loris and Claudio",
      datePublished: "2026-04-01",
      hero: "/images/hero-sunset.jpg",
      body: [
        { type: "p", text: "We've been running boats on Lake Como long enough to know that the right month makes more difference than the right villa. Here's the year, from the perspective of someone who reads the lake's mood for a living." },
        { type: "h", text: "April — green and quiet" },
        { type: "p", text: "The first month we run regularly. The water is still cold (16–18°C, no swimming yet) but the light is the cleanest of the year and the villas have just opened. Villa Carlotta's azaleas are ten days from peak; Villa del Balbianello is open Tuesdays through Sundays. Restaurants in Bellagio are uncrowded and the staff have time. Best month for photographers, second-best for honeymoons." },
        { type: "h", text: "May — peak Carlotta" },
        { type: "p", text: "The colour month. Villa Carlotta's gardens are at full bloom from the second week of May through the first week of June; the lake gets warm enough to swim from mid-month (20°C). Bookings tighten — by mid-May we're full two to three weeks ahead. The best month if you want everything blooming and everything open." },
        { type: "h", text: "June — high season starts" },
        { type: "p", text: "The lake fills up. Wedding season is in full swing and Bellagio's restaurants take wedding parties most weekends. We start collecting from the hotel pontoons (Villa d'Este, Passalacqua, Mandarin Oriental) more than from our Como pontoon. Water is 23–24°C, swims are possible everywhere. Book three weeks ahead." },
        { type: "h", text: "July & August — busy and beautiful" },
        { type: "p", text: "The hot months. The lake has a heat haze that makes the photos softer; the villas are very busy. Forum Ambrosetti hasn't started yet (early September) so Villa d'Este is at its busiest in late August. Best for swimming — the upper basin warms to 25°C and the secret coves below the cliffs are at their nicest. We'd suggest morning starts for cooler air." },
        { type: "h", text: "September — the secret month" },
        { type: "p", text: "The month locals would pick if they only had one. The water is still warm (23°C through mid-September), the light has turned softer, the crowds thin, and the first week is Forum Ambrosetti so the lake's most famous hotel is closed off but everywhere else is uncrowded. Villas open, restaurants relaxed, photographers happy. Our most-booked month after May." },
        { type: "h", text: "October — golden light" },
        { type: "p", text: "Honeymoon month. The lake takes on the autumn colour around the second week — yellows from the chestnut groves on the eastern shore, copper from the maples around Bellagio. Water is too cold for most swims (18°C) but the light is the warmest of the year. Villas close at the end of the month (Villa del Balbianello mid-November, Villa Carlotta first week of November)." },
        { type: "h", text: "November to March — quiet, on appointment" },
        { type: "p", text: "We don't run regular tours, but for charters with the right occasion we do. The lake under low cloud and snow on the mountains is the version that locals love most — empty, atmospheric, and the boats are kept in pristine condition for the rare commission." },
        { type: "h", text: "Our recommendation" },
        { type: "p", text: "If you can choose freely: late May or mid-September. Carlotta is in flower in May; Bellagio is uncrowded in September. Both have stable weather and the warmest light of the year. April and October are the runner-up months for travellers who prefer quiet over heat. July and August are best avoided unless you're chasing the swimming." },
      ],
    },
    it: {
      metaTitle: "I Mesi Migliori per Visitare il Lago di Como in Barca — Guida di uno Skipper",
      metaDesc:
        "Guida mese per mese al Lago di Como in barca, scritta da uno skipper di terza generazione. Tempo, luce, temperatura dell'acqua, affollamento, itinerario giusto per ogni stagione.",
      title: "I mesi migliori per visitare il Lago di Como <em>in barca</em>",
      author: "Loris e Claudio",
      datePublished: "2026-04-01",
      hero: "/images/hero-sunset.jpg",
      body: [
        { type: "p", text: "Lavoriamo in barca sul Lago di Como da abbastanza tempo per sapere che il mese giusto conta più della villa giusta. Ecco l'anno, dalla prospettiva di chi legge l'umore del lago per mestiere." },
        { type: "h", text: "Aprile — verde e silenzio" },
        { type: "p", text: "Il primo mese in cui usciamo con regolarità. L'acqua è ancora fredda (16–18°C, niente bagni) ma la luce è la più pulita dell'anno e le ville hanno appena aperto. Le azalee di Villa Carlotta sono a dieci giorni dal picco; Villa del Balbianello apre dal martedì alla domenica. I ristoranti di Bellagio sono vuoti e lo staff ha tempo. Mese migliore per i fotografi, secondo per le lune di miele." },
        { type: "h", text: "Maggio — Carlotta al massimo" },
        { type: "p", text: "Il mese del colore. I giardini di Villa Carlotta sono in piena fioritura dalla seconda settimana di maggio alla prima di giugno; il lago si scalda abbastanza per il bagno da metà mese (20°C). Le prenotazioni si chiudono — da metà maggio siamo pieni con due-tre settimane di anticipo. Il mese migliore se volete tutto fiorito e tutto aperto." },
        { type: "h", text: "Giugno — inizia l'alta stagione" },
        { type: "p", text: "Il lago si riempie. La stagione dei matrimoni è in pieno e i ristoranti di Bellagio ospitano feste nuziali ogni weekend. Iniziamo a passare a prendere gli ospiti ai pontili degli hotel (Villa d'Este, Passalacqua, Mandarin Oriental) più che al nostro pontile di Como. L'acqua è a 23–24°C, si fa il bagno ovunque. Prenotate con tre settimane di anticipo." },
        { type: "h", text: "Luglio e agosto — pieni e bellissimi" },
        { type: "p", text: "I mesi caldi. C'è una caligine sul lago che rende le foto più morbide; le ville sono affollate. Il Forum Ambrosetti non è ancora cominciato (inizio settembre), quindi Villa d'Este è al suo massimo a fine agosto. Migliori per i bagni — il bacino superiore arriva a 25°C e le calette sotto le rocce danno il meglio. Consigliamo partenze al mattino per l'aria più fresca." },
        { type: "h", text: "Settembre — il mese segreto" },
        { type: "p", text: "Il mese che i locali sceglierebbero se ne potessero scegliere solo uno. L'acqua è ancora calda (23°C fino a metà settembre), la luce diventa più morbida, l'affollamento si riduce, e nella prima settimana c'è il Forum Ambrosetti — quindi l'hotel più famoso del lago è chiuso ma tutto il resto è tranquillo. Ville aperte, ristoranti rilassati, fotografi felici. Dopo maggio è il nostro mese con più prenotazioni." },
        { type: "h", text: "Ottobre — luce dorata" },
        { type: "p", text: "Mese da luna di miele. Il lago prende i colori dell'autunno verso la seconda settimana — gialli dai castagneti della sponda est, rame dagli aceri di Bellagio. Acqua troppo fredda per la maggior parte dei bagni (18°C), ma la luce è la più calda dell'anno. Le ville chiudono a fine mese (Villa del Balbianello metà novembre, Villa Carlotta prima settimana di novembre)." },
        { type: "h", text: "Da novembre a marzo — silenzio, su appuntamento" },
        { type: "p", text: "Non facciamo tour regolari, ma per charter con la giusta occasione sì. Il lago sotto le nuvole basse e con la neve sulle montagne è la versione che i locali amano di più — vuoto, atmosferico, e le barche sono tenute al massimo per la commissione rara." },
        { type: "h", text: "Il nostro consiglio" },
        { type: "p", text: "Se potete scegliere liberamente: fine maggio o metà settembre. Carlotta è in fiore a maggio; Bellagio è vuota a settembre. Entrambi hanno tempo stabile e la luce più calda dell'anno. Aprile e ottobre sono i mesi di seconda scelta per chi preferisce il silenzio al caldo. Luglio e agosto sono da evitare se non state cercando il bagno." },
      ],
    },
  },
};
