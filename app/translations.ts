export type Locale = "en" | "it" | "ru" | "ar";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "ru", label: "RU" },
  { code: "ar", label: "AR" },
];

export const rtlLocales: Locale[] = ["ar"];

type Tour = {
  duration: string;
  title: string; // can include <em>...</em> markup
  desc: string;
  meta: string; // e.g. "Couples · Photo · 2+ guests"
  price: string;
  stops: string[];
};

type Boat = {
  origin: string; // e.g. "Hand-built in Venice, 1920"
  cornerLabel: string;
  name: string; // can include <em>...</em>
  desc: string;
  specs: { label: string; value: string }[];
  price: string;
};

type Experience = {
  title: string; // can include <em>...</em>
  desc: string;
};

type Review = {
  quote: string;
  author: string;
  date: string;
};

type MapPin = {
  id: string;
  name: string;
  note: string;
  type: "port" | "villa" | "town" | "nature";
  lat: number;
  lng: number;
};

export type Translation = {
  nav: { tours: string; fleet: string; map: string; attractions: string; experiences: string; contact: string };
  hero: {
    location: string;
    title: string; // <em> markup allowed
    sub: string;
    ctaPrimary: string;
    ctaReserve: string;
    ctaWhatsapp: string;
    scroll: string;
    trust: string[];
    /** Price tier line under the subhead — anchors the entry price */
    priceTier: string;
  };
  intro: { eyebrow: string; title: string; body: string };
  tours: {
    indexLabel: string;
    lead: string;
    title: string;
    right: string;
    factDuration: string;
    factStops: string;
    factIdeal: string;
    factFrom: string;
    items: Tour[];
  };
  fleet: {
    indexLabel: string;
    lead: string;
    title: string;
    right: string;
    inquireCta: string;
    items: Boat[];
  };
  map: {
    indexLabel: string;
    lead: string;
    title: string;
    right: string;
    sideTitle: string;
    sideBody: string;
    pins: MapPin[];
  };
  attractions: {
    indexLabel: string;
    lead: string;
    title: string;
    right: string;
    /** Dedicated /[locale]/attractions/ page only */
    pageMetaTitle: string;
    pageMetaDesc: string;
    pageHeadline: string;
    pageIntro: string;
    readMore: string;
  };
  experiences: {
    indexLabel: string;
    lead: string;
    title: string;
    right: string;
    items: Experience[];
  };
  testimonials: {
    indexLabel: string;
    lead: string;
    title: string;
    right: string;
    score: string;          // e.g. "4.9"
    scoreOutOf: string;     // e.g. "/ 5.0"
    reviewCount: string;    // e.g. "Based on 87 Google reviews"
    reviewPeriod: string;   // e.g. "2023–2025"
    reviewLink: string;     // e.g. "Read all on Google →"
    items: Review[];
  };
  instagram: {
    indexLabel: string;
    lead: string;
    title: string;
    right: string;
    cta: string;
  };
  ourBase: {
    indexLabel: string;
    countLabel: string;
    title: string;
    body: string;
    address: string;
    directionsCta: string;
  };
  contact: {
    indexLabel: string;
    lead: string;          // small italic line, e.g. "We reply within an hour, every day, 9–20."
    hoursLabel: string;
    title: string;
    phoneLabel: string;
    emailLabel: string;
    headOfficeLabel: string;
    boatParkingLabel: string;
    headOffice: string;
    boatParking: string;
    whatsapp: string;
    emailCta: string;
    instagramCta: string;
    rights: string;
    safety: string;
  };
  /** Inline booking-request form (replaces the old static contact block). */
  bookingForm: {
    indexLabel: string;        // e.g. "06 — Reservations"
    lead: string;              // small italic, e.g. "Plan a tour."
    title: string;             // headline with <em>, e.g. "Tell us when you're <em>here.</em>"
    subtitle: string;
    fieldDate: string;
    fieldTime: string;
    timeMorning: string;
    timeAfternoon: string;
    timeSunset: string;
    timeFull: string;
    timeUndecided: string;
    fieldTour: string;
    fieldParty: string;
    partyHint: string;
    partyMore: string;
    partyFewer: string;
    fieldPickup: string;
    pickupComo: string;
    pickupVillaDEste: string;
    pickupBellagio: string;
    pickupHotel: string;
    pickupOther: string;
    fieldName: string;
    namePlaceholder: string;
    fieldEmail: string;
    fieldMessage: string;
    messagePlaceholder: string;
    optional: string;
    submitCta: string;
    orWhatsApp: string;
    replySoon: string;
    requestSent: string;
    emailSubject: string;
    // Sidebar
    sidePhoneLabel: string;
    sidePhoneNote: string;
    sideEmailLabel: string;
    sideEmailNote: string;
    sideAddressLabel: string;
    sideAddressNote: string;
    trustGoogleReviews: string;
    trustReviewsGuests: string;
    trustInsuredLabel: string;
    trustInsuredNote: string;
  };
  floatPill: string;
};

// Place names stay in their original Italian form across all locales (proper nouns).
// Coordinates are real geographic lat/lng, plotted at runtime onto the OSM-derived
// background map at /public/images/lake-como-map.jpg. Order follows the natural
// cruise itinerary (south up the west shore, cross east for Nesso, back to west,
// continue up to Bellagio, then cross east to Varenna).
const PIN_BASE: { id: string; name: string; type: MapPin["type"]; lat: number; lng: number }[] = [
  // Orbit pins (the boat's automatic cruise route — south to north along the western shore)
  { id: "como",          name: "Como",                       type: "port",   lat: 45.808, lng: 9.085 },
  { id: "cernobbio",     name: "Cernobbio · Villa d'Este",   type: "villa",  lat: 45.844, lng: 9.082 },
  { id: "oleandra",      name: "Villa Oleandra",             type: "villa",  lat: 45.864, lng: 9.106 },
  { id: "nesso",         name: "Orrido di Nesso",            type: "nature", lat: 45.871, lng: 9.158 },
  { id: "argegno",       name: "Argegno",                    type: "town",   lat: 45.929, lng: 9.130 },
  { id: "balbianello",   name: "Villa del Balbianello",      type: "villa",  lat: 45.971, lng: 9.197 },
  { id: "carlotta",      name: "Villa Carlotta",             type: "villa",  lat: 45.988, lng: 9.222 },
  { id: "bellagio",      name: "Bellagio",                   type: "town",   lat: 45.987, lng: 9.260 },
  { id: "varenna",       name: "Varenna",                    type: "town",   lat: 46.013, lng: 9.284 },
  // Additional attraction pins (off the orbit route — boat doesn't auto-orbit through these,
  // but they're visible as markers and respond to hover from the side-list and attractions section)
  { id: "blevio_torno",  name: "Blevio · Torno",             type: "town",   lat: 45.834, lng: 9.108 },
  { id: "isola_comacina",name: "Isola Comacina",             type: "nature", lat: 45.965, lng: 9.171 },
  { id: "cassinella",    name: "Villa Cassinella",           type: "villa",  lat: 45.972, lng: 9.202 },
  { id: "menaggio",      name: "Menaggio",                   type: "town",   lat: 46.022, lng: 9.241 },
  { id: "lecco",         name: "Lecco",                      type: "town",   lat: 45.853, lng: 9.394 },
];

const buildPins = (notes: string[]): MapPin[] =>
  PIN_BASE.map((p, i) => ({ ...p, note: notes[i] }));

export const translations: Record<Locale, Translation> = {
  en: {
    nav: { tours: "Tours", fleet: "Fleet", map: "Map", attractions: "Attractions", experiences: "Experiences", contact: "Contact" },
    hero: {
      location: "Lago di Como · Italia",
      title: "Lake Como.<br/>By <em>private boat.</em>",
      sub: "Cruise the lake aboard classic wooden boats with a professional local captain, Bellagio, Varenna, Balbianello and the lake's hidden corners.",
      ctaPrimary: "Browse tours",
      ctaReserve: "Reserve a boat",
      ctaWhatsapp: "Chat on WhatsApp",
      scroll: "Scroll",
      trust: ["Fully insured", "Certified captains", "Since 2018", "★ 4.9 / 87 reviews"],
      priceTier: "From €220 · 1-hour tour up to €1,400 · full-day charter",
    },
    intro: {
      eyebrow: "Como Boat Rental, Est. on the Lake",
      title: "Cruise Lake Como aboard hand-built wooden boats, <em>la dolce vita</em>, on the water.",
      body: "From the first basin and George Clooney's Villa Oleandra to the cinematic gardens of Villa del Balbianello and the hidden waterfall at Nesso, every itinerary is shaped around you, your guests and the rhythm of the lake.",
    },
    tours: {
      indexLabel: "(01) — Tours",
      lead: "Four ways to see the lake.",
      title: "Private cruises with <em>your own captain.</em>",
      right: "Personalised itineraries to the most iconic destinations of Lake Como, Villa Balbianello, Bellagio, Varenna and the lake's quiet corners.",
      factDuration: "Duration",
      factStops: "Stops",
      factIdeal: "Best for",
      factFrom: "From",
      items: [
        {
          duration: "1 hour", title: "Lake Como Highlights",
          desc: "A short scenic loop of the first basin, the quickest way onto the water and into the lake's most photographed corners.",
          meta: "Couples · first-time", price: "from €220",
          stops: ["Como", "Cernobbio", "Villa d'Este", "Villa Oleandra"],
        },
        {
          duration: "2.5 hours", title: "Balbianello & Nesso",
          desc: "Iconic Villa del Balbianello from the water, Casino Royale set, with a stop at the Orrido di Nesso waterfall.",
          meta: "Couples · small groups", price: "from €480",
          stops: ["Como", "Nesso", "Argegno", "Balbianello"],
        },
        {
          duration: "4 hours", title: "Half-Day Top Villas",
          desc: "Villa del Balbianello, Villa Carlotta and Villa Balbiano, House of Gucci, with a one-hour stop in Bellagio or Varenna.",
          meta: "Families · groups", price: "from €780",
          stops: ["Balbianello", "Carlotta", "Balbiano", "Bellagio"],
        },
        {
          duration: "6–8 hours", title: "Full-Day Bespoke",
          desc: "Built around your day, hotel pick-up at Villa d'Este, Passalacqua or Mandarin Oriental, swimming, lakeside lunch, hidden gems.",
          meta: "Exclusivity", price: "from €1,400",
          stops: ["Pick-up", "Swim stop", "Lunch", "Sunset"],
        },
      ],
    },
    fleet: {
      indexLabel: "(04) — Fleet",
      lead: "Hand-built wooden boats.",
      title: "Two boats. Both <em>mahogany.</em>",
      right: "Maintained to a higher standard than the lake demands. Sliding sunroofs, leather seating, full HiFi, every detail considered.",
      inquireCta: "Inquire",
      items: [
        {
          origin: "Hand-built in Venice, 1920", cornerLabel: "Water Limousine",
          name: "Venetian <em>Wooden Taxi.</em>",
          desc: "Hand-built in Venice since 1920. A 9.5-metre boat with mahogany finishes, sliding sunroof and minibar. The most refined way to glide across the lake.",
          specs: [
            { label: "Length", value: "9.5 m" },
            { label: "Capacity", value: "10 guests" },
            { label: "Engine", value: "Volvo Penta · 250 HP" },
            { label: "On board", value: "HiFi · Minibar · USB" },
          ],
          price: "€300 / hour",
        },
        {
          origin: "Restored mahogany, Lake Como", cornerLabel: "Mahogany Caddy",
          name: "Luxury Classic <em>Wooden Boat.</em>",
          desc: "A refined 8.20-metre wooden caddy with generous deck and large stern swim platform, capable of forty knots in full comfort, ideal for cruising in style.",
          specs: [
            { label: "Length", value: "8.2 m" },
            { label: "Capacity", value: "6 guests" },
            { label: "Engine", value: "Hyundai · 300 HP" },
            { label: "On board", value: "HiFi · Minibar · USB" },
          ],
          price: "€350 / hour",
        },
      ],
    },
    map: {
      indexLabel: "(02) — The Lake",
      lead: "Where we cruise.",
      title: "Iconic <em>destinations,</em> woven into a single day.",
      right: "From the southern tip at Como up the west shore to Bellagio, Varenna and the lake's quietest corners. Hover or tap any destination to locate it.",
      sideTitle: "Iconic <em>destinations.</em>",
      sideBody: "Nine stops, traced south to north along the lake's most photographed shoreline. Your captain weaves them into one private itinerary, at your pace.",
      pins: buildPins(["Departure", "15 min", "Clooney", "Waterfall", "Mid-lake", "Iconic", "Tremezzo", "The Pearl", "East shore", "Twin villages", "Hidden island", "Most exclusive", "Upper west", "Lecco arm"]),
    },
    attractions: {
      indexLabel: "(03) — Attractions",
      lead: "Every corner of the lake.",
      title: "The thirteen places worth <em>arriving by boat.</em>",
      right: "Hover any pin on the map or any card below to centre it on both. The boat will navigate to it.",
      pageMetaTitle: "Lake Como Attractions · 13 Places to See by Boat",
      pageMetaDesc:
        "A guide to the 13 places on Lake Como worth arriving by boat — Bellagio, Varenna, Villa del Balbianello, Cernobbio, Villa Carlotta, Isola Comacina and more.",
      pageHeadline: "Lake Como attractions, <em>seen from the water.</em>",
      pageIntro:
        "Lake Como is a 46-kilometre lake with two arms, more than a hundred villas along its shores, and a handful of postcard-perfect villages clinging to mountain slopes. These are the thirteen places worth arriving at by boat — the ones a private cruise from Como is built around. Tap any to read the full guide.",
      readMore: "Read more",
    },
    experiences: {
      indexLabel: "(05) — Beyond a Tour",
      lead: "Tailor-made experiences.",
      title: "For the moments that <em>matter most.</em>",
      right: "From wedding proposals at sunset to editorial productions at Villa d'Este, we orchestrate the moment, on the water.",
      items: [
        { title: "Weddings & special occasions",  desc: "Weddings, proposals, anniversaries by boat. Champagne on board and bespoke service for unforgettable moments on the water." },
        { title: "Photoshoots & productions",     desc: "Editorial, wedding and commercial shoots aboard our wooden boats, Villa d'Este, Villa Balbianello, golden hour on the lake." },
        { title: "Local captains as concierges",  desc: "Certified, multilingual captains who know the lake like a backyard, restaurant tips, hidden coves, perfect timing with the wind." },
      ],
    },
    testimonials: {
      indexLabel: "(06) — Guests",
      lead: "What people say.",
      title: "Reviewed across <em>three seasons.</em>",
      right: "Reviews collected from Google, verified guests of Como Boat Rental.",
      score: "4.9",
      scoreOutOf: "/ 5.0",
      reviewCount: "Based on 87 Google reviews",
      reviewPeriod: "2023–2025",
      reviewLink: "Read all on Google",
      items: [
        { quote: "The tour was absolutely amazing. Lake Como is stunning, and the boat ride made the experience unforgettable. Highly recommend to anyone visiting Como.", author: "Dima", date: "August 2025 · Google" },
        { quote: "Great experience renting a private boat for 2 hours. Giacomo was very easy to deal with, clear with the explanation, and reassuring for someone who had never driven a boat before. Grazie Giacomo, till next time!", author: "William Lau", date: "October 2024 · Google" },
        { quote: "What a fantastic experience being taken on a boat with the captain. The trip was incredible.", author: "Dana Walfisz", date: "June 2024 · Google" },
      ],
    },
    instagram: {
      indexLabel: "(07) — Follow",
      lead: "@comoboatrental",
      title: "Lake Como, <em>every day.</em>",
      right: "From sunrise photoshoots to sunset proposals, follow along on Instagram.",
      cta: "Follow on Instagram",
    },
    ourBase: {
      indexLabel: "(08) — Our Base",
      countLabel: "45.81°N · 9.09°E",
      title: "Where you'll <em>find us.</em>",
      body: "Our pontoon sits on the Lungolago Viale Geno in Como, a five-minute walk from Como city centre. Boarding, departures and pick-ups happen here.",
      address: "Lungolago Viale Geno, fronte civico 10, 22100 Como (IT)",
      directionsCta: "Open in Google Maps",
    },
    contact: {
      indexLabel: "(08) — Reservations",
      lead: "We reply within an hour, every day, 9–20.",
      hoursLabel: "Hours",
      title: "Plan your <em>boat experience.</em>",
      phoneLabel: "Phone", emailLabel: "Email",
      headOfficeLabel: "Hours", boatParkingLabel: "Where",
      headOffice: "Every day · 9:00–20:00",
      boatParking: "Viale Geno, 10<br/>22100 Como · Italy<br/><small>boat parking</small>",
      whatsapp: "WhatsApp", emailCta: "Email us", instagramCta: "Instagram",
      rights: "© 2026 Como Boat Rental, P.IVA IT03998950137",
      safety: "All boats fully insured · Safety gear on board",
    },
    bookingForm: {
      indexLabel: "(09) — Reservations",
      lead: "Plan a tour.",
      title: "Tell us when you're <em>here.</em>",
      subtitle: "Pick a day, a tour and your party size — we confirm availability the same day, every day, year-round.",
      fieldDate: "When",
      fieldTime: "Time of day",
      timeMorning: "Morning (9 – 12)",
      timeAfternoon: "Afternoon (13 – 17)",
      timeSunset: "Sunset (17 – sundown)",
      timeFull: "Full day (flexible)",
      timeUndecided: "Not sure yet",
      fieldTour: "Tour",
      fieldParty: "Party size",
      partyHint: "2 – 10 guests",
      partyMore: "More guests",
      partyFewer: "Fewer guests",
      fieldPickup: "Pick-up point",
      pickupComo: "Como · Viale Geno (default)",
      pickupVillaDEste: "Cernobbio · Villa d'Este pier",
      pickupBellagio: "Bellagio · Pescallo dock",
      pickupHotel: "Hotel pick-up (we arrange transfer)",
      pickupOther: "Other — tell us below",
      fieldName: "Name",
      namePlaceholder: "First & last name",
      fieldEmail: "Email",
      fieldMessage: "Anything we should know?",
      messagePlaceholder: "Hotel, dietary preferences, special occasion, etc.",
      optional: "optional",
      submitCta: "Request availability",
      orWhatsApp: "Or WhatsApp",
      replySoon: "We reply within the hour",
      requestSent: "Request sent — we reply within the hour",
      emailSubject: "Lake Como private boat tour request",
      sidePhoneLabel: "Direct contact",
      sidePhoneNote: "Loris or Claudio · Italian and English fluent",
      sideEmailLabel: "Email",
      sideEmailNote: "Replied within the hour, every hour we're awake",
      sideAddressLabel: "Where you board",
      sideAddressNote: "Boat parking · five minutes from Como city centre on foot",
      trustGoogleReviews: "Google reviews",
      trustReviewsGuests: "verified guests",
      trustInsuredLabel: "Insured",
      trustInsuredNote: "Full Italian commercial passenger licence",
    },
    floatPill: "Chat on WhatsApp",
  },

  it: {
    nav: { tours: "Tour", fleet: "Flotta", map: "Mappa", attractions: "Attrazioni", experiences: "Esperienze", contact: "Contatti" },
    hero: {
      location: "Lago di Como · Italia",
      title: "Lago di Como.<br/>In <em>barca privata.</em>",
      sub: "Naviga il lago a bordo di barche classiche in legno con uno skipper professionista locale, Bellagio, Varenna, Balbianello e gli angoli nascosti del lago.",
      ctaPrimary: "Vedi i tour",
      ctaReserve: "Prenota una barca",
      ctaWhatsapp: "Scrivici su WhatsApp",
      scroll: "Scorri",
      trust: ["Tutto assicurato", "Skipper certificati", "Dal 2018", "★ 4.9 / 87 recensioni"],
      priceTier: "Da €220 · tour di 1 ora fino a €1.400 · charter giornata intera",
    },
    intro: {
      eyebrow: "Como Boat Rental, Sul Lago dal 2010",
      title: "Naviga il Lago di Como su barche in legno fatte a mano, <em>la dolce vita</em>, sull'acqua.",
      body: "Dal primo bacino e Villa Oleandra di George Clooney ai giardini cinematografici di Villa del Balbianello e alla cascata nascosta di Nesso, ogni itinerario è costruito attorno a te, ai tuoi ospiti e al ritmo del lago.",
    },
    tours: {
      indexLabel: "(01) — Tour",
      lead: "Quattro modi per vedere il lago.",
      title: "Crociere private con <em>il tuo skipper.</em>",
      right: "Itinerari personalizzati verso le destinazioni più iconiche del Lago di Como, Villa del Balbianello, Bellagio, Varenna e gli angoli silenziosi del lago.",
      factDuration: "Durata",
      factStops: "Tappe",
      factIdeal: "Ideale per",
      factFrom: "Da",
      items: [
        {
          duration: "1 ora", title: "Highlights del Lago",
          desc: "Un breve giro panoramico del primo bacino, il modo più rapido per scendere sull'acqua e raggiungere gli angoli più fotografati del lago.",
          meta: "Coppie · prima visita", price: "da € 220",
          stops: ["Como", "Cernobbio", "Villa d'Este", "Villa Oleandra"],
        },
        {
          duration: "2,5 ore", title: "Balbianello e Nesso",
          desc: "L'iconica Villa del Balbianello vista dall'acqua, set di Casino Royale, con sosta all'Orrido di Nesso.",
          meta: "Coppie · piccoli gruppi", price: "da € 480",
          stops: ["Como", "Nesso", "Argegno", "Balbianello"],
        },
        {
          duration: "4 ore", title: "Mezza Giornata, Le Ville",
          desc: "Villa del Balbianello, Villa Carlotta e Villa Balbiano, House of Gucci, con una sosta di un'ora a Bellagio o Varenna.",
          meta: "Famiglie · gruppi", price: "da € 780",
          stops: ["Balbianello", "Carlotta", "Balbiano", "Bellagio"],
        },
        {
          duration: "6–8 ore", title: "Giornata Intera Su Misura",
          desc: "Costruito intorno alla tua giornata, pick-up a Villa d'Este, Passalacqua o Mandarin Oriental, bagno, pranzo a riva, gemme nascoste.",
          meta: "Esclusività", price: "da € 1.400",
          stops: ["Pick-up", "Sosta bagno", "Pranzo", "Tramonto"],
        },
      ],
    },
    fleet: {
      indexLabel: "(04) — Flotta",
      lead: "Barche in legno fatte a mano.",
      title: "Due barche. Entrambe <em>in mogano.</em>",
      right: "Mantenute a uno standard più alto di quanto il lago richieda. Tetti apribili, sedute in pelle, HiFi completo, ogni dettaglio considerato.",
      inquireCta: "Richiedi",
      items: [
        {
          origin: "Costruito a mano a Venezia, 1920", cornerLabel: "Limousine d'Acqua",
          name: "Taxi <em>Veneziano in Legno.</em>",
          desc: "Costruito a mano a Venezia dal 1920. Una barca di 9,5 metri con finiture in mogano, tetto apribile e minibar. Il modo più raffinato di scivolare sul lago.",
          specs: [
            { label: "Lunghezza", value: "9,5 m" },
            { label: "Capacità", value: "10 ospiti" },
            { label: "Motore", value: "Volvo Penta · 250 CV" },
            { label: "A bordo", value: "HiFi · Minibar · USB" },
          ],
          price: "€ 300 / ora",
        },
        {
          origin: "Mogano restaurato, Lago di Como", cornerLabel: "Caddy in Mogano",
          name: "Motoscafo Classico <em>in Legno.</em>",
          desc: "Un raffinato motoscafo di 8,20 metri con coperta ampia e grande piattaforma poppiera per il bagno, fino a quaranta nodi in pieno comfort, ideale per crociere di classe.",
          specs: [
            { label: "Lunghezza", value: "8,2 m" },
            { label: "Capacità", value: "6 ospiti" },
            { label: "Motore", value: "Hyundai · 300 CV" },
            { label: "A bordo", value: "HiFi · Minibar · USB" },
          ],
          price: "€ 350 / ora",
        },
      ],
    },
    map: {
      indexLabel: "(02) — Il Lago",
      lead: "Dove navighiamo.",
      title: "Destinazioni <em>iconiche,</em> intrecciate in una sola giornata.",
      right: "Dalla punta sud di Como su per la sponda ovest fino a Bellagio, Varenna e gli angoli più silenziosi del lago. Passa il mouse o tocca una destinazione per individuarla.",
      sideTitle: "Destinazioni <em>iconiche.</em>",
      sideBody: "Nove tappe, da sud a nord lungo la sponda più fotografata del lago. Il tuo skipper le intreccia in un unico itinerario privato, al tuo ritmo.",
      pins: buildPins(["Partenza", "15 min", "Clooney", "Cascata", "Centro lago", "Iconica", "Tremezzo", "La Perla", "Sponda est", "Borghi gemelli", "Isola nascosta", "Più esclusiva", "Alto ovest", "Ramo di Lecco"]),
    },
    attractions: {
      indexLabel: "(03) — Attrazioni",
      lead: "Ogni angolo del lago.",
      title: "Le tredici tappe che <em>meritano l'arrivo in barca.</em>",
      right: "Passa il mouse su un pin della mappa o su una card qui sotto: l'altro si allinea e la barca naviga verso quel punto.",
      pageMetaTitle: "Attrazioni del Lago di Como · 13 Tappe da Vedere in Barca",
      pageMetaDesc:
        "Guida alle 13 tappe del Lago di Como che meritano l'arrivo in barca — Bellagio, Varenna, Villa del Balbianello, Cernobbio, Villa Carlotta, Isola Comacina e altre.",
      pageHeadline: "Le attrazioni del Lago di Como, <em>viste dall'acqua.</em>",
      pageIntro:
        "Il Lago di Como è un lago di 46 chilometri con due rami, più di cento ville lungo le sponde e un pugno di borghi da cartolina aggrappati ai pendii delle montagne. Queste sono le tredici tappe che meritano l'arrivo in barca — quelle attorno a cui si costruisce un tour privato da Como. Toccatene una per leggere la guida completa.",
      readMore: "Scopri di più",
    },
    experiences: {
      indexLabel: "(05) — Oltre il Tour",
      lead: "Esperienze su misura.",
      title: "Per i momenti che <em>contano di più.</em>",
      right: "Dalle proposte di matrimonio al tramonto alle produzioni editoriali a Villa d'Este, orchestriamo il momento, sull'acqua.",
      items: [
        { title: "Matrimoni e occasioni speciali", desc: "Matrimoni, proposte, anniversari in barca. Champagne a bordo e servizio personalizzato per momenti indimenticabili sull'acqua." },
        { title: "Servizi fotografici e produzioni", desc: "Riprese editoriali, di matrimonio e commerciali a bordo delle nostre barche in legno, Villa d'Este, Villa Balbianello, ora dorata sul lago." },
        { title: "Skipper come concierge",         desc: "Skipper certificati e multilingue che conoscono il lago come il proprio giardino, consigli ristoranti, calette nascoste, tempi perfetti con il vento." },
      ],
    },
    testimonials: {
      indexLabel: "(06) — Ospiti",
      lead: "Cosa dicono.",
      title: "Recensiti in <em>tre stagioni.</em>",
      right: "Recensioni raccolte da Google, ospiti verificati di Como Boat Rental.",
      score: "4,9",
      scoreOutOf: "/ 5,0",
      reviewCount: "Basato su 87 recensioni Google",
      reviewPeriod: "2023–2025",
      reviewLink: "Leggi tutto su Google",
      items: [
        { quote: "Tour assolutamente fantastico. Il Lago di Como è stupendo e il giro in barca ha reso l'esperienza indimenticabile. Lo consiglio a chiunque visiti Como.", author: "Dima", date: "Agosto 2025 · Google" },
        { quote: "Bellissima esperienza con una barca privata per 2 ore. Giacomo è stato chiarissimo nelle spiegazioni e rassicurante per chi non aveva mai guidato una barca. Grazie Giacomo, alla prossima!", author: "William Lau", date: "Ottobre 2024 · Google" },
        { quote: "Esperienza bellissima. La consiglio molto. Giacomo ragazzo simpaticissimo, numero uno!", author: "Giulia Primiceri", date: "Settembre 2024 · Google" },
      ],
    },
    instagram: {
      indexLabel: "(07) — Seguici",
      lead: "@comoboatrental",
      title: "Il Lago di Como, <em>ogni giorno.</em>",
      right: "Dai servizi fotografici all'alba alle proposte al tramonto, seguici su Instagram.",
      cta: "Segui su Instagram",
    },
    ourBase: {
      indexLabel: "(08) — La nostra base",
      countLabel: "45,81°N · 9,09°E",
      title: "Dove ci <em>trovi.</em>",
      body: "Il nostro pontile si trova sul Lungolago Viale Geno a Como, a cinque minuti a piedi dal centro città. Imbarco, partenze e pick-up avvengono qui.",
      address: "Lungolago Viale Geno, fronte civico 10, 22100 Como (IT)",
      directionsCta: "Apri in Google Maps",
    },
    contact: {
      indexLabel: "(08) — Prenotazioni",
      lead: "Rispondiamo entro un'ora, tutti i giorni, 9–20.",
      hoursLabel: "Orari",
      title: "Pianifica la tua <em>esperienza in barca.</em>",
      phoneLabel: "Telefono", emailLabel: "Email",
      headOfficeLabel: "Orari", boatParkingLabel: "Dove",
      headOffice: "Tutti i giorni · 9:00–20:00",
      boatParking: "Viale Geno, 10<br/>22100 Como · Italia<br/><small>posto barca</small>",
      whatsapp: "WhatsApp", emailCta: "Scrivici", instagramCta: "Instagram",
      rights: "© 2026 Como Boat Rental, P.IVA IT03998950137",
      safety: "Tutte le barche assicurate · Equipaggiamento di sicurezza a bordo",
    },
    bookingForm: {
      indexLabel: "(09) — Prenotazioni",
      lead: "Pianifica un tour.",
      title: "Dicci quando <em>arrivi.</em>",
      subtitle: "Scegli giorno, tour e numero di ospiti — confermiamo la disponibilità in giornata, tutto l'anno.",
      fieldDate: "Quando",
      fieldTime: "Fascia oraria",
      timeMorning: "Mattina (9 – 12)",
      timeAfternoon: "Pomeriggio (13 – 17)",
      timeSunset: "Tramonto (17 – al tramonto)",
      timeFull: "Tutto il giorno (flessibile)",
      timeUndecided: "Da decidere",
      fieldTour: "Tour",
      fieldParty: "Numero ospiti",
      partyHint: "2 – 10 ospiti",
      partyMore: "Più ospiti",
      partyFewer: "Meno ospiti",
      fieldPickup: "Pick-up",
      pickupComo: "Como · Viale Geno (default)",
      pickupVillaDEste: "Cernobbio · pontile Villa d'Este",
      pickupBellagio: "Bellagio · molo di Pescallo",
      pickupHotel: "Pick-up in hotel (organizziamo il transfer)",
      pickupOther: "Altro — diccelo sotto",
      fieldName: "Nome",
      namePlaceholder: "Nome e cognome",
      fieldEmail: "Email",
      fieldMessage: "Qualcosa che dobbiamo sapere?",
      messagePlaceholder: "Hotel, preferenze alimentari, occasione speciale, ecc.",
      optional: "facoltativo",
      submitCta: "Richiedi disponibilità",
      orWhatsApp: "O via WhatsApp",
      replySoon: "Rispondiamo entro l'ora",
      requestSent: "Richiesta inviata — rispondiamo entro l'ora",
      emailSubject: "Richiesta tour privato in barca Lago di Como",
      sidePhoneLabel: "Contatto diretto",
      sidePhoneNote: "Loris o Claudio · italiano e inglese fluenti",
      sideEmailLabel: "Email",
      sideEmailNote: "Rispondiamo entro l'ora, tutte le ore in cui siamo svegli",
      sideAddressLabel: "Dove ci si imbarca",
      sideAddressNote: "Posto barca · cinque minuti a piedi dal centro di Como",
      trustGoogleReviews: "Recensioni Google",
      trustReviewsGuests: "ospiti verificati",
      trustInsuredLabel: "Assicurati",
      trustInsuredNote: "Licenza italiana per trasporto passeggeri commerciale",
    },
    floatPill: "Scrivici su WhatsApp",
  },

  ru: {
    nav: { tours: "Туры", fleet: "Флот", map: "Карта", attractions: "Места", experiences: "Опыты", contact: "Контакты" },
    hero: {
      location: "Озеро Комо · Италия",
      title: "Озеро Комо.<br/>На <em>частной лодке.</em>",
      sub: "Прогулки по озеру на классических деревянных лодках с профессиональным местным капитаном, Белладжо, Варенна, Бальбьянелло и скрытые уголки озера.",
      ctaPrimary: "Посмотреть туры",
      ctaReserve: "Забронировать лодку",
      ctaWhatsapp: "Написать в WhatsApp",
      scroll: "Прокрутка",
      trust: ["Полная страховка", "Сертифицированные капитаны", "С 2018 года", "★ 4.9 / 87 отзывов"],
      priceTier: "От €220 · тур на 1 час до €1,400 · чартер на целый день",
    },
    intro: {
      eyebrow: "Como Boat Rental, На озере",
      title: "Прогулки по озеру Комо на деревянных лодках ручной работы, <em>la dolce vita</em>, на воде.",
      body: "От первого бассейна и Виллы Олеандры Джорджа Клуни до кинематографичных садов Виллы дель Бальбьянелло и скрытого водопада в Нессо, каждый маршрут построен под вас, ваших гостей и ритм озера.",
    },
    tours: {
      indexLabel: "(01) — Туры",
      lead: "Четыре способа увидеть озеро.",
      title: "Частные круизы <em>с вашим капитаном.</em>",
      right: "Индивидуальные маршруты к самым легендарным местам озера Комо, Вилла Бальбьянелло, Белладжо, Варенна и тихие уголки озера.",
      factDuration: "Длительность",
      factStops: "Остановки",
      factIdeal: "Идеально для",
      factFrom: "От",
      items: [
        {
          duration: "1 час", title: "Главные виды Комо",
          desc: "Короткая живописная петля по первому бассейну, самый быстрый способ выйти на воду и оказаться в самых фотографируемых уголках озера.",
          meta: "Пары · первое посещение", price: "от € 220",
          stops: ["Комо", "Чернобьо", "Вилла д'Эсте", "Вилла Олеандра"],
        },
        {
          duration: "2,5 часа", title: "Бальбьянелло и Нессо",
          desc: "Легендарная Вилла дель Бальбьянелло с воды, съёмки «Казино Рояль», с остановкой у водопада Орридо ди Нессо.",
          meta: "Пары · небольшие группы", price: "от € 480",
          stops: ["Комо", "Нессо", "Ардженьо", "Бальбьянелло"],
        },
        {
          duration: "4 часа", title: "Полдня, Главные Виллы",
          desc: "Вилла дель Бальбьянелло, Вилла Карлотта и Вилла Бальбьяно, Дом Gucci, с часовой остановкой в Белладжо или Варенне.",
          meta: "Семьи · группы", price: "от € 780",
          stops: ["Бальбьянелло", "Карлотта", "Бальбьяно", "Белладжо"],
        },
        {
          duration: "6–8 часов", title: "Полный День На Заказ",
          desc: "Построен вокруг вашего дня, трансфер от Villa d'Este, Passalacqua или Mandarin Oriental, купание, обед на берегу, скрытые жемчужины.",
          meta: "Эксклюзивность", price: "от € 1 400",
          stops: ["Трансфер", "Купание", "Обед", "Закат"],
        },
      ],
    },
    fleet: {
      indexLabel: "(04) — Флот",
      lead: "Деревянные лодки ручной работы.",
      title: "Две лодки. Обе <em>из красного дерева.</em>",
      right: "Поддерживаемые на уровне выше, чем требует озеро. Раздвижные крыши, кожаные сиденья, полное HiFi, каждая деталь продумана.",
      inquireCta: "Запросить",
      items: [
        {
          origin: "Изготовлен вручную в Венеции, 1920", cornerLabel: "Водный Лимузин",
          name: "Венецианское <em>Деревянное Такси.</em>",
          desc: "Изготовлен вручную в Венеции с 1920 года. Лодка длиной 9,5 м с отделкой из красного дерева, раздвижной крышей и мини-баром. Самый изысканный способ скользить по озеру.",
          specs: [
            { label: "Длина", value: "9,5 м" },
            { label: "Вместимость", value: "10 гостей" },
            { label: "Двигатель", value: "Volvo Penta · 250 л.с." },
            { label: "На борту", value: "HiFi · Минибар · USB" },
          ],
          price: "€ 300 / час",
        },
        {
          origin: "Реставрированное красное дерево, Комо", cornerLabel: "Катер из Красного Дерева",
          name: "Классический <em>Деревянный Катер.</em>",
          desc: "Изысканный 8,20 м катер с просторной палубой и большой кормовой платформой, до сорока узлов в полном комфорте, идеален для стильных круизов.",
          specs: [
            { label: "Длина", value: "8,2 м" },
            { label: "Вместимость", value: "6 гостей" },
            { label: "Двигатель", value: "Hyundai · 300 л.с." },
            { label: "На борту", value: "HiFi · Минибар · USB" },
          ],
          price: "€ 350 / час",
        },
      ],
    },
    map: {
      indexLabel: "(02) — Озеро",
      lead: "Где мы плаваем.",
      title: "Знаковые <em>места,</em> сплетённые в один день.",
      right: "От южной оконечности у Комо вверх по западному берегу до Белладжо, Варенны и самых тихих уголков озера. Наведите курсор или коснитесь точки, чтобы её найти.",
      sideTitle: "Знаковые <em>места.</em>",
      sideBody: "Девять остановок, прослеженных с юга на север вдоль самого фотографируемого берега озера. Капитан собирает их в единый частный маршрут, в вашем темпе.",
      pins: buildPins(["Отправление", "15 мин", "Клуни", "Водопад", "Центр озера", "Знаковая", "Тремеццо", "Жемчужина", "Восточный берег", "Деревни-близнецы", "Скрытый остров", "Самая эксклюзивная", "Верхний запад", "Рукав Лекко"]),
    },
    attractions: {
      indexLabel: "(03) — Достопримечательности",
      lead: "Каждый уголок озера.",
      title: "Тринадцать мест, к которым <em>стоит подойти на лодке.</em>",
      right: "Наведите курсор на пин на карте или на карточку ниже — другой выровняется, и лодка пойдёт к этой точке.",
      pageMetaTitle: "Достопримечательности Озера Комо · 13 Мест к Подходу на Лодке",
      pageMetaDesc:
        "Гид по 13 местам озера Комо, к которым стоит подойти на лодке — Беладжо, Варенна, Вилла Бальбьянелло, Черноббио, Вилла Карлотта, Изола Комачина и другие.",
      pageHeadline: "Достопримечательности озера Комо <em>с воды.</em>",
      pageIntro:
        "Озеро Комо — это 46-километровое озеро с двумя рукавами, более ста вилл вдоль берегов и горстка идеальных деревень на горных склонах. Вот тринадцать мест, к которым стоит подойти на лодке — то, вокруг чего строится частный тур из Комо. Нажмите на любое, чтобы прочитать полный гид.",
      readMore: "Узнать больше",
    },
    experiences: {
      indexLabel: "(05) — Больше чем тур",
      lead: "Индивидуальные опыты.",
      title: "Для моментов, которые <em>важнее всего.</em>",
      right: "От предложений руки и сердца на закате до редакционных съёмок на Вилле д'Эсте, мы оркестрируем момент, на воде.",
      items: [
        { title: "Свадьбы и особые случаи",   desc: "Свадьбы, предложения, юбилеи на лодке. Шампанское на борту и индивидуальный сервис для незабываемых моментов на воде." },
        { title: "Фотосъёмки и производство", desc: "Редакционные, свадебные и коммерческие съёмки на наших деревянных лодках, Вилла д'Эсте, Вилла Бальбьянелло, золотой час на озере." },
        { title: "Капитаны как консьержи",    desc: "Сертифицированные многоязычные капитаны, знающие озеро как свой двор, рестораны, скрытые бухты, идеальное время с ветром." },
      ],
    },
    testimonials: {
      indexLabel: "(06) — Гости",
      lead: "Что говорят.",
      title: "Проверено в <em>трёх сезонах.</em>",
      right: "Отзывы с Google, проверенные гости Como Boat Rental.",
      score: "4,9",
      scoreOutOf: "/ 5,0",
      reviewCount: "На основании 87 отзывов Google",
      reviewPeriod: "2023–2025",
      reviewLink: "Читать все на Google",
      items: [
        { quote: "Тур был абсолютно потрясающим. Озеро Комо великолепно, а прогулка на лодке сделала впечатления незабываемыми. Очень рекомендую всем.", author: "Дима", date: "Август 2025 · Google" },
        { quote: "Отличный сервис!", author: "Ксения Кутусов", date: "Июль 2024 · Google" },
        { quote: "Идеальная прогулка на лодке! Замечательный гид. Очень рекомендую.", author: "Анастасия Чуньюкина", date: "Июнь 2024 · Google" },
      ],
    },
    instagram: {
      indexLabel: "(07) — Подписаться",
      lead: "@comoboatrental",
      title: "Озеро Комо, <em>каждый день.</em>",
      right: "От рассветных фотосессий до закатных предложений — следите в Instagram.",
      cta: "Подписаться в Instagram",
    },
    ourBase: {
      indexLabel: "(08) — Наша база",
      countLabel: "45,81°N · 9,09°E",
      title: "Где <em>нас найти.</em>",
      body: "Наш причал находится на набережной Lungolago Viale Geno в Комо, в пяти минутах ходьбы от центра города. Посадка, отправление и трансферы, здесь.",
      address: "Lungolago Viale Geno, напротив дома 10, 22100 Комо (Италия)",
      directionsCta: "Открыть в Google Maps",
    },
    contact: {
      indexLabel: "(08) — Бронирование",
      lead: "Отвечаем в течение часа, каждый день, 9–20.",
      hoursLabel: "Часы",
      title: "Спланируйте <em>опыт на воде.</em>",
      phoneLabel: "Телефон", emailLabel: "Email",
      headOfficeLabel: "Часы", boatParkingLabel: "Где",
      headOffice: "Каждый день · 9:00–20:00",
      boatParking: "Viale Geno, 10<br/>22100 Комо · Италия<br/><small>стоянка лодок</small>",
      whatsapp: "WhatsApp", emailCta: "Написать", instagramCta: "Instagram",
      rights: "© 2026 Como Boat Rental, НДС IT03998950137",
      safety: "Все лодки застрахованы · Спасательное оборудование на борту",
    },
    bookingForm: {
      indexLabel: "(09) — Бронирование",
      lead: "Спланируйте тур.",
      title: "Скажите, когда <em>будете здесь.</em>",
      subtitle: "Выберите день, тур и число гостей — подтверждаем доступность в день обращения, круглый год.",
      fieldDate: "Когда",
      fieldTime: "Время дня",
      timeMorning: "Утро (9 – 12)",
      timeAfternoon: "День (13 – 17)",
      timeSunset: "Закат (17 – закат)",
      timeFull: "Весь день (гибко)",
      timeUndecided: "Ещё не решил(а)",
      fieldTour: "Тур",
      fieldParty: "Количество гостей",
      partyHint: "2 – 10 гостей",
      partyMore: "Больше гостей",
      partyFewer: "Меньше гостей",
      fieldPickup: "Место подачи",
      pickupComo: "Комо · Viale Geno (по умолчанию)",
      pickupVillaDEste: "Черноббио · пристань Villa d'Este",
      pickupBellagio: "Беладжо · причал Pescallo",
      pickupHotel: "Подача в отель (организуем трансфер)",
      pickupOther: "Другое — напишите ниже",
      fieldName: "Имя",
      namePlaceholder: "Имя и фамилия",
      fieldEmail: "Email",
      fieldMessage: "Что нам стоит знать?",
      messagePlaceholder: "Отель, предпочтения, особый случай и т. д.",
      optional: "необязательно",
      submitCta: "Проверить доступность",
      orWhatsApp: "Или WhatsApp",
      replySoon: "Отвечаем в течение часа",
      requestSent: "Запрос отправлен — ответим в течение часа",
      emailSubject: "Запрос частного тура на лодке озеро Комо",
      sidePhoneLabel: "Прямой контакт",
      sidePhoneNote: "Лорис или Клаудио · итальянский и английский свободно",
      sideEmailLabel: "Email",
      sideEmailNote: "Отвечаем в течение часа, в часы бодрствования",
      sideAddressLabel: "Где садитесь на лодку",
      sideAddressNote: "Стоянка лодок · пять минут пешком от центра Комо",
      trustGoogleReviews: "Отзывы Google",
      trustReviewsGuests: "проверенных гостей",
      trustInsuredLabel: "Застрахованы",
      trustInsuredNote: "Полная итальянская коммерческая пассажирская лицензия",
    },
    floatPill: "Написать в WhatsApp",
  },

  ar: {
    nav: { tours: "الجولات", fleet: "الأسطول", map: "الخريطة", attractions: "معالم", experiences: "التجارب", contact: "اتصل بنا" },
    hero: {
      location: "بحيرة كومو · إيطاليا",
      title: "بحيرة كومو.<br/>على متن <em>قارب خاص.</em>",
      sub: "أبحر في البحيرة على متن قوارب خشبية كلاسيكية مع قبطان محلي محترف, بيلاجيو، فارينا، بالبيانيلو والزوايا الخفية للبحيرة.",
      ctaPrimary: "تصفّح الجولات",
      ctaReserve: "احجز قارباً",
      ctaWhatsapp: "تواصل عبر واتساب",
      scroll: "تمرير",
      trust: ["تأمين شامل", "قباطنة معتمدون", "منذ 2018", "★ 4.9 / 87 تقييماً"],
      priceTier: "من €220 · جولة لمدة ساعة وحتى €1,400 · يوم كامل خاص",
    },
    intro: {
      eyebrow: "Como Boat Rental, على البحيرة",
      title: "أبحر في بحيرة كومو على قوارب خشبية مصنوعة يدوياً, <em>الدولتشي فيتا</em>، على الماء.",
      body: "من الحوض الأول وفيلا أوليندرا لجورج كلوني إلى حدائق فيلا ديل بالبيانيلو السينمائية والشلال الخفي في نيسو, كل مسار مصمم حولك وحول ضيوفك وإيقاع البحيرة.",
    },
    tours: {
      indexLabel: "(01) — الجولات",
      lead: "أربع طرق لرؤية البحيرة.",
      title: "جولات خاصة <em>مع قبطانك.</em>",
      right: "مسارات مخصصة إلى أشهر وجهات بحيرة كومو, فيلا ديل بالبيانيلو، بيلاجيو، فارينا والزوايا الهادئة للبحيرة.",
      factDuration: "المدة",
      factStops: "المحطات",
      factIdeal: "مناسب لـ",
      factFrom: "من",
      items: [
        {
          duration: "ساعة واحدة", title: "أبرز معالم كومو",
          desc: "جولة قصيرة خلابة في الحوض الأول, أسرع طريقة للوصول إلى الماء والزوايا الأكثر تصويراً للبحيرة.",
          meta: "للأزواج · زيارة أولى", price: "من 220 €",
          stops: ["كومو", "تشيرنوبيو", "فيلا ديستي", "فيلا أوليندرا"],
        },
        {
          duration: "2.5 ساعة", title: "بالبيانيلو ونيسو",
          desc: "فيلا ديل بالبيانيلو الأيقونية من الماء, موقع تصوير «كازينو رويال», مع توقف عند شلال أوريدو دي نيسو.",
          meta: "للأزواج · مجموعات صغيرة", price: "من 480 €",
          stops: ["كومو", "نيسو", "أرجينيو", "بالبيانيلو"],
        },
        {
          duration: "4 ساعات", title: "نصف يوم, كبرى الفيلات",
          desc: "فيلا ديل بالبيانيلو، فيلا كارلوتا وفيلا بالبيانو, بيت Gucci, مع توقف لمدة ساعة في بيلاجيو أو فارينا.",
          meta: "للعائلات · مجموعات", price: "من 780 €",
          stops: ["بالبيانيلو", "كارلوتا", "بالبيانو", "بيلاجيو"],
        },
        {
          duration: "6–8 ساعات", title: "يوم كامل مفصّل",
          desc: "مصمَّم حول يومك, نقل من فنادق Villa d'Este أو Passalacqua أو Mandarin Oriental، سباحة، غداء على البحيرة، جواهر خفية.",
          meta: "حصرية", price: "من 1.400 €",
          stops: ["نقل", "سباحة", "غداء", "غروب"],
        },
      ],
    },
    fleet: {
      indexLabel: "(04) — الأسطول",
      lead: "قوارب خشبية مصنوعة يدوياً.",
      title: "قاربان. كلاهما <em>من الماهوغني.</em>",
      right: "تتم صيانتهما بمعيار أعلى مما تتطلبه البحيرة. سقوف منزلقة، مقاعد جلدية، نظام HiFi كامل, كل تفصيلة مدروسة.",
      inquireCta: "استفسر",
      items: [
        {
          origin: "صنع يدوياً في البندقية, 1920", cornerLabel: "ليموزين مائي",
          name: "تاكسي البندقية <em>الخشبي.</em>",
          desc: "صنع يدوياً في البندقية منذ 1920. قارب بطول 9.5 م بتشطيبات الماهوغني، سقف منزلق ومينيبار. أرقى طريقة للانزلاق فوق البحيرة.",
          specs: [
            { label: "الطول", value: "9.5 م" },
            { label: "السعة", value: "10 ضيوف" },
            { label: "المحرك", value: "Volvo Penta · 250 حصان" },
            { label: "على المتن", value: "HiFi · مينيبار · USB" },
          ],
          price: "300 € / ساعة",
        },
        {
          origin: "ماهوغني مرمَّم, بحيرة كومو", cornerLabel: "قارب ماهوغني",
          name: "قارب <em>خشبي كلاسيكي فاخر.</em>",
          desc: "قارب خشبي راقٍ بطول 8.20 م بسطح واسع ومنصة سباحة خلفية كبيرة, حتى أربعين عقدة براحة تامة، مثالي للجولات الفخمة.",
          specs: [
            { label: "الطول", value: "8.2 م" },
            { label: "السعة", value: "6 ضيوف" },
            { label: "المحرك", value: "Hyundai · 300 حصان" },
            { label: "على المتن", value: "HiFi · مينيبار · USB" },
          ],
          price: "350 € / ساعة",
        },
      ],
    },
    map: {
      indexLabel: "(02) — البحيرة",
      lead: "أين نُبحر.",
      title: "وجهات <em>أيقونية،</em> منسوجة في يوم واحد.",
      right: "من الطرف الجنوبي عند كومو صعوداً على طول الضفة الغربية إلى بيلاجيو وفارينا وأهدأ زوايا البحيرة. مرّر فوق وجهة أو انقرها لتحديد موقعها.",
      sideTitle: "وجهات <em>أيقونية.</em>",
      sideBody: "تسع محطات، متتبَّعة من الجنوب إلى الشمال على طول أكثر شواطئ البحيرة تصويراً. يضفّرها قبطانك في مسار خاص واحد, بإيقاعك.",
      pins: buildPins(["انطلاق", "15 دقيقة", "كلوني", "شلال", "وسط البحيرة", "أيقونية", "تريميتزو", "اللؤلؤة", "الضفة الشرقية", "قريتان توأمتان", "جزيرة مخفية", "الأكثر حصرية", "أعلى الغرب", "ذراع ليكو"]),
    },
    attractions: {
      indexLabel: "(03) — معالم",
      lead: "كل زاوية من البحيرة.",
      title: "ثلاث عشرة وجهة <em>تستحقّ الوصول بالقارب.</em>",
      right: "مرّر فوق أي دبوس على الخريطة أو أي بطاقة بالأسفل: يتمحور الآخر معه ويتجه القارب إليه.",
      pageMetaTitle: "معالم بحيرة كومو · 13 وجهة تستحقّ الوصول بالقارب",
      pageMetaDesc:
        "دليل إلى 13 وجهة على بحيرة كومو تستحقّ الوصول بالقارب — بيلاجيو وفارينا وفيلا بالبيانيلو وتشيرنوبيو وفيلا كارلوتا وإيزولا كوماتشينا وغيرها.",
      pageHeadline: "معالم بحيرة كومو <em>من الماء.</em>",
      pageIntro:
        "بحيرة كومو بطول 46 كيلومتراً ولها ذراعان، وأكثر من مئة فيلا على ضفافها، وحفنة من القرى البطاقة-البريدية المتشبّثة بالمنحدرات الجبلية. هذه هي الوجهات الثلاث عشرة التي تستحقّ الوصول إليها بالقارب — التي تُبنى حولها جولة خاصة من كومو. انقر على أي منها لقراءة الدليل الكامل.",
      readMore: "اقرأ المزيد",
    },
    experiences: {
      indexLabel: "(05) — أكثر من جولة",
      lead: "تجارب مفصّلة.",
      title: "للحظات التي <em>تعني أكثر.</em>",
      right: "من طلبات الزواج عند الغروب إلى الإنتاج التحريري في فيلا ديستي, نُنسّق اللحظة، على الماء.",
      items: [
        { title: "حفلات الزفاف والمناسبات الخاصة", desc: "حفلات زفاف، طلبات زواج، ذكرى سنوية على القارب. شامبانيا على المتن وخدمة مخصصة للحظات لا تُنسى على الماء." },
        { title: "جلسات التصوير والإنتاج",         desc: "تصوير تحريري وأعراس وتجاري على متن قواربنا الخشبية, فيلا ديستي، فيلا بالبيانيلو، الساعة الذهبية على البحيرة." },
        { title: "قباطنة كأمناء استقبال",          desc: "قباطنة معتمدون يتحدثون عدة لغات يعرفون البحيرة كحديقتهم, توصيات مطاعم، خلجان مخفية، توقيت مثالي مع الريح." },
      ],
    },
    testimonials: {
      indexLabel: "(06) — الضيوف",
      lead: "ماذا يقولون.",
      title: "مُقَيَّمون عبر <em>ثلاثة مواسم.</em>",
      right: "مراجعات من Google, ضيوف موثَّقون لـ Como Boat Rental.",
      score: "4.9",
      scoreOutOf: "/ 5.0",
      reviewCount: "بناءً على 87 تقييماً على Google",
      reviewPeriod: "2023–2025",
      reviewLink: "اقرأ الكل على Google",
      items: [
        { quote: "كانت الجولة رائعة تماماً. بحيرة كومو خلابة، ورحلة القارب جعلت التجربة لا تُنسى. أوصي بها لكل من يزور كومو.", author: "ديما", date: "أغسطس 2025 · Google" },
        { quote: "تجربة رائعة لاستئجار قارب خاص لساعتين. كان جياكومو واضحاً جداً ومطمئناً. شكراً يا جياكومو، إلى المرة القادمة!", author: "ويليام لاو", date: "أكتوبر 2024 · Google" },
        { quote: "تجربة رائعة على متن القارب مع القبطان. كانت رحلة لا تصدق.", author: "دانا والفيش", date: "يونيو 2024 · Google" },
      ],
    },
    instagram: {
      indexLabel: "(07) — تابعنا",
      lead: "@comoboatrental",
      title: "بحيرة كومو، <em>كل يوم.</em>",
      right: "من جلسات تصوير الفجر إلى عروض الزواج عند الغروب، تابعنا على إنستغرام.",
      cta: "تابعنا على إنستغرام",
    },
    ourBase: {
      indexLabel: "(08) — قاعدتنا",
      countLabel: "45.81°N · 9.09°E",
      title: "أين <em>تجدنا.</em>",
      body: "يقع رصيفنا على Lungolago Viale Geno في كومو، على بُعد خمس دقائق سيراً من وسط المدينة. الصعود والمغادرة والاستقبال يتم هنا.",
      address: "Lungolago Viale Geno, أمام رقم 10، 22100 كومو (إيطاليا)",
      directionsCta: "فتح في خرائط Google",
    },
    contact: {
      indexLabel: "(08) — الحجوزات",
      lead: "نرد خلال ساعة، كل يوم، 9–20.",
      hoursLabel: "ساعات",
      title: "خطّط <em>تجربتك على القارب.</em>",
      phoneLabel: "الهاتف", emailLabel: "البريد الإلكتروني",
      headOfficeLabel: "ساعات", boatParkingLabel: "أين",
      headOffice: "كل يوم · 9:00–20:00",
      boatParking: "Viale Geno, 10<br/>22100 كومو · إيطاليا<br/><small>موقف القوارب</small>",
      whatsapp: "واتساب", emailCta: "مراسلتنا", instagramCta: "إنستغرام",
      rights: "© 2026 Como Boat Rental, الرقم الضريبي IT03998950137",
      safety: "جميع القوارب مؤمَّنة · معدات السلامة على المتن",
    },
    bookingForm: {
      indexLabel: "(09) — الحجوزات",
      lead: "خطّط لجولة.",
      title: "أخبِرنا متى <em>تأتي.</em>",
      subtitle: "اختر اليوم والجولة وعدد الضيوف — نؤكّد التوفر في اليوم نفسه، طوال العام.",
      fieldDate: "متى",
      fieldTime: "وقت اليوم",
      timeMorning: "الصباح (9 – 12)",
      timeAfternoon: "بعد الظهر (13 – 17)",
      timeSunset: "الغروب (17 – حتى الغروب)",
      timeFull: "اليوم كامل (مرن)",
      timeUndecided: "غير محدد بعد",
      fieldTour: "الجولة",
      fieldParty: "عدد الضيوف",
      partyHint: "2 – 10 ضيوف",
      partyMore: "ضيوف أكثر",
      partyFewer: "ضيوف أقل",
      fieldPickup: "نقطة الانطلاق",
      pickupComo: "كومو · Viale Geno (افتراضي)",
      pickupVillaDEste: "تشيرنوبيو · رصيف Villa d'Este",
      pickupBellagio: "بيلاجيو · رصيف Pescallo",
      pickupHotel: "الاستلام من الفندق (ننسّق النقل)",
      pickupOther: "أخرى — أخبرنا أدناه",
      fieldName: "الاسم",
      namePlaceholder: "الاسم واللقب",
      fieldEmail: "البريد الإلكتروني",
      fieldMessage: "هل هناك ما ينبغي أن نعرفه؟",
      messagePlaceholder: "الفندق، التفضيلات الغذائية، مناسبة خاصة، إلخ.",
      optional: "اختياري",
      submitCta: "اطلب التوفر",
      orWhatsApp: "أو واتساب",
      replySoon: "نرد خلال ساعة",
      requestSent: "تم إرسال الطلب — نرد خلال ساعة",
      emailSubject: "طلب جولة قارب خاصة على بحيرة كومو",
      sidePhoneLabel: "تواصل مباشر",
      sidePhoneNote: "لوريس أو كلاوديو · الإيطالية والإنجليزية بطلاقة",
      sideEmailLabel: "البريد الإلكتروني",
      sideEmailNote: "نردّ خلال ساعة، كل ساعة نكون فيها مستيقظين",
      sideAddressLabel: "حيث تصعد على القارب",
      sideAddressNote: "موقف القوارب · خمس دقائق سيراً من وسط كومو",
      trustGoogleReviews: "تقييمات Google",
      trustReviewsGuests: "ضيوف موثّقون",
      trustInsuredLabel: "مؤمَّنون",
      trustInsuredNote: "ترخيص إيطالي تجاري كامل لنقل الركاب",
    },
    floatPill: "تواصل عبر واتساب",
  },
};
