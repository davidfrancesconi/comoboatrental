// Long-form copy for the per-tour landing pages.
// Each tour has a slug + a translation object covering EN/IT/RU/AR.
//
// Italian copy is hand-written to target the high-volume queries:
//   "noleggio barche como", "tour barca lago di como",
//   "gita in barca bellagio", "noleggio barca villa balbianello".
//
// English is hand-written for the matching English long-tail.
// Russian and Arabic are competent translations carrying the same
// keywords, lighter on local idiom — the dev / a native copywriter
// can rewrite these later (see docs/HANDOFF.md).

import type { Locale } from "../translations";

export type TourBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] };

export type TourCopy = {
  /** SEO title for <title> tag */
  metaTitle: string;
  /** Meta description, ideally 140-160 chars */
  metaDesc: string;
  /** Page hero headline (may include <em> markup, no <br/>) */
  headline: string;
  /** Short kicker shown beneath the headline */
  kicker: string;
  /** Main body content in flat blocks */
  body: TourBlock[];
  /** Bullet list — what's included */
  included: string[];
  /** Bullet list — what to bring / arrange separately */
  notIncluded: string[];
  /** Itinerary timeline — mins-from-departure → location/event */
  itinerary: { time: string; place: string; note: string }[];
  /** 3-4 FAQ Q&As specific to this tour */
  faqs: { question: string; answer: string }[];
};

export type TourEntry = {
  slug: string;
  /** Index in the existing translations.ts tours.items array (0-3) */
  baseIndex: 0 | 1 | 2 | 3;
  /** Image path under /public */
  hero: string;
  /** Approximate duration in minutes for schema */
  durationMinutes: number;
  /** Numeric price in EUR for schema */
  priceEUR: number;
  /** Pin IDs (from PIN_BASE in translations.ts) this tour visits */
  pins: string[];
  /** Per-locale long-form copy */
  copy: Record<Locale, TourCopy>;
};

export const TOUR_SLUGS = [
  "highlights-1h",
  "balbianello-nesso",
  "top-villas-half-day",
  "bespoke-full-day",
] as const;

export type TourSlug = (typeof TOUR_SLUGS)[number];

export const tours: TourEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // Tour 01 — Highlights, 1 hour, the introduction cruise
  // ─────────────────────────────────────────────────────────────
  {
    slug: "highlights-1h",
    baseIndex: 0,
    hero: "/images/hero-1.jpg",
    durationMinutes: 60,
    priceEUR: 220,
    pins: ["como", "cernobbio", "oleandra"],
    copy: {
      en: {
        metaTitle: "Lake Como Highlights · 1-hour Private Boat Tour from Como",
        metaDesc:
          "An hour on the water from Como through the first basin: Villa d'Este, Villa Oleandra, the lake's most photographed shoreline. Private mahogany boat, your own captain.",
        headline: "An hour on the lake. <em>The most photographed mile.</em>",
        kicker: "1 hour · from €220 · 2–10 guests · departing Como",
        body: [
          { type: "p", text: "The introduction cruise. Sixty minutes is the shortest route to put you on the water and into the postcard. We board on the Lungolago Viale Geno in Como, slip past the lighthouse at Faro Voltiano, and head north along the western shore." },
          { type: "p", text: "Within ten minutes you're at Cernobbio, where the gardens of Villa d'Este reach the water. Another five and you're below Villa Oleandra, the property George Clooney has owned in Laglio since 2002. The mountain stops at the water, the villas sit between, and our captain holds the boat steady wherever you want a photo." },
          { type: "h", text: "Why one hour" },
          { type: "p", text: "If you have a half-day commitment elsewhere on Lake Como — a lunch reservation in Bellagio that you reach by car, a meeting at Villa d'Este, an early flight from Linate or Malpensa — sixty minutes on the water from Como gives you the lake's most-photographed villas without rearranging the day. The same trip by ferry takes ninety; by group tour, two hours." },
          { type: "h", text: "What you see" },
          { type: "p", text: "The first basin of Lake Como is the southernmost arm, the part that faces Como city. It's also the part Hollywood photographs. Casino Royale, Ocean's Twelve, A Month by the Lake and Star Wars Episode II all shot scenes within the stretch this tour covers. Our captain knows the angle for each." },
        ],
        included: [
          "Private use of the boat for the full hour",
          "Professional skipper (Loris or Claudio) — both speak English and Italian",
          "Sparkling water and ice on board",
          "Towels if you choose to swim",
          "All fuel and lake fees",
        ],
        notIncluded: [
          "Hotel transfer from Como city centre (a 5-minute walk to the pontoon)",
          "Restaurant or villa entry fees",
          "Photography (the captain is happy to take photos with your phone)",
        ],
        itinerary: [
          { time: "+0 min", place: "Como — Lungolago Viale Geno", note: "Boarding at our pontoon" },
          { time: "+5 min", place: "Faro Voltiano", note: "Past the Como lighthouse, turning north" },
          { time: "+15 min", place: "Cernobbio · Villa d'Este", note: "From the water — the only angle that captures the full façade" },
          { time: "+30 min", place: "Laglio · Villa Oleandra", note: "George Clooney's villa, since 2002" },
          { time: "+45 min", place: "Return south", note: "Same shore, different light" },
          { time: "+60 min", place: "Como — back at the pontoon", note: "Disembarkation" },
        ],
        faqs: [
          { question: "Is the captain included in the price?", answer: "Yes. The €220 covers the boat, fuel, lake fees and your captain (Loris or Claudio) for the full hour. There's no extra charge per guest up to the boat's capacity of 10." },
          { question: "Can we swim during the one-hour tour?", answer: "Yes, weather and time permitting. We carry towels and the captain will pick a swim spot in the first basin if you'd like one — most guests prefer to spend the hour cruising, but it's your call." },
          { question: "What if the weather is bad?", answer: "If the captain judges the lake unsafe (high wind, lightning), we reschedule at no charge. Light rain on its own doesn't cancel the trip — the boats have a sliding sunroof." },
          { question: "Do we need to book in advance?", answer: "In summer (June through August) yes — the calendar fills two to three weeks ahead. April, May, September and October usually have same-week availability. Message on WhatsApp for the fastest answer." },
        ],
      },
      it: {
        metaTitle: "Tour in Barca 1 Ora a Como · Cernobbio e Villa d'Este",
        metaDesc:
          "Un'ora in barca privata da Como: Villa d'Este, Villa Oleandra, il primo bacino del Lago di Como. Skipper esperto, motoscafo in mogano fatto a mano.",
        headline: "Un'ora sul lago. <em>Il miglio più fotografato d'Europa.</em>",
        kicker: "1 ora · da €220 · 2–10 persone · partenza da Como",
        body: [
          { type: "p", text: "Il tour di presentazione. Sessanta minuti sono la via più rapida per salire in barca e mettersi al centro della cartolina. Si parte dal Lungolago Viale Geno a Como, si passa il Faro Voltiano e si risale la sponda occidentale." },
          { type: "p", text: "In dieci minuti siete a Cernobbio, davanti ai giardini di Villa d'Este che scendono fino all'acqua. Altri cinque e siete sotto Villa Oleandra, la proprietà che George Clooney possiede a Laglio dal 2002. La montagna si tuffa nel lago, le ville stanno nel mezzo, e il nostro skipper tiene la barca ferma ovunque vogliate scattare." },
          { type: "h", text: "Perché un'ora" },
          { type: "p", text: "Se avete già impegni altrove sul Lago di Como — un pranzo prenotato a Bellagio raggiungibile in auto, un meeting al Villa d'Este, un volo presto da Linate o Malpensa — sessanta minuti in barca da Como vi mostrano le ville più fotografate senza riprogrammare la giornata. Lo stesso giro in traghetto richiede novanta minuti, in tour di gruppo due ore." },
          { type: "h", text: "Cosa vedrete" },
          { type: "p", text: "Il primo bacino del Lago di Como è il braccio meridionale, quello che si affaccia sulla città di Como. È anche la zona che Hollywood predilige. Casino Royale, Ocean's Twelve, A Month by the Lake e Star Wars Episodio II hanno girato scene nel tratto coperto da questo tour. Lo skipper conosce l'angolazione giusta per ognuna." },
        ],
        included: [
          "Uso privato della barca per l'ora intera",
          "Skipper professionista (Loris o Claudio) — entrambi parlano italiano e inglese",
          "Acqua frizzante e ghiaccio a bordo",
          "Asciugamani se decidete di fare un bagno",
          "Carburante e tasse del lago compresi",
        ],
        notIncluded: [
          "Transfer dall'hotel al pontile (cinque minuti a piedi dal centro di Como)",
          "Ingressi a ville e ristoranti",
          "Servizio fotografico (lo skipper è felice di scattare con il vostro telefono)",
        ],
        itinerary: [
          { time: "+0 min", place: "Como — Lungolago Viale Geno", note: "Imbarco al nostro pontile" },
          { time: "+5 min", place: "Faro Voltiano", note: "Si supera il faro di Como e si vira a nord" },
          { time: "+15 min", place: "Cernobbio · Villa d'Este", note: "Dall'acqua — l'unica prospettiva che cattura la facciata intera" },
          { time: "+30 min", place: "Laglio · Villa Oleandra", note: "La villa di George Clooney, dal 2002" },
          { time: "+45 min", place: "Rotta a sud", note: "Stessa sponda, luce diversa" },
          { time: "+60 min", place: "Como — ritorno al pontile", note: "Sbarco" },
        ],
        faqs: [
          { question: "Lo skipper è compreso nel prezzo?", answer: "Sì. I €220 coprono la barca, il carburante, le tasse del lago e lo skipper (Loris o Claudio) per l'ora intera. Non ci sono supplementi a persona fino alla capienza massima di 10 ospiti." },
          { question: "Si può fare il bagno in un'ora?", answer: "Sì, tempo e meteo permettendo. A bordo abbiamo gli asciugamani e lo skipper sceglierà un punto adatto nel primo bacino se desiderate fermarvi. La maggior parte degli ospiti preferisce navigare per l'intera ora, ma la decisione è vostra." },
          { question: "E se il tempo è brutto?", answer: "Se lo skipper giudica il lago non navigabile in sicurezza (vento forte, temporali), si riprogramma senza costi. Pioggia leggera non cancella il giro — le barche hanno il tetto apribile." },
          { question: "Bisogna prenotare con anticipo?", answer: "In estate (giugno–agosto) sì, il calendario si riempie con due-tre settimane di anticipo. Aprile, maggio, settembre e ottobre hanno solitamente disponibilità nella stessa settimana. Scriveteci su WhatsApp per la risposta più veloce." },
        ],
      },
      ru: {
        metaTitle: "Часовая Прогулка на Лодке по Озеру Комо · Виллы Деста и Олеандра",
        metaDesc:
          "Один час на частной лодке из Комо: Вилла д'Эсте, Вилла Олеандра, первый бассейн озера Комо. Опытный шкипер, моторная лодка из красного дерева.",
        headline: "Один час на озере. <em>Самая фотографируемая миля Европы.</em>",
        kicker: "1 час · от €220 · 2–10 гостей · отправление из Комо",
        body: [
          { type: "p", text: "Знакомство с озером. Шестьдесят минут — кратчайший путь к воде и к открытке. Мы отчаливаем с пристани Лунголаго Виале Джено в Комо, проходим маяк Фаро Вольтиано и идём вдоль западного берега на север." },
          { type: "p", text: "Через десять минут вы у Черноббио, где сады Виллы д'Эсте спускаются к воде. Ещё пять — и вы под Виллой Олеандра, имением Джорджа Клуни в Лальо с 2002 года. Гора падает в озеро, виллы стоят между, и наш шкипер держит лодку там, где вы хотите сделать снимок." },
          { type: "h", text: "Почему один час" },
          { type: "p", text: "Если у вас уже есть планы на Комо — обед в Беладжо, встреча в Villa d'Este, ранний рейс из Линате — час на воде из Комо покажет самые знаменитые виллы без перестройки дня." },
        ],
        included: [
          "Частное использование лодки на час",
          "Профессиональный шкипер (Лорис или Клаудио)",
          "Газированная вода и лёд на борту",
          "Полотенца, если решите искупаться",
          "Топливо и сборы озера включены",
        ],
        notIncluded: [
          "Трансфер из отеля до пристани",
          "Входные билеты на виллы и в рестораны",
          "Фотосъёмка",
        ],
        itinerary: [
          { time: "+0 мин", place: "Комо — пристань Виале Джено", note: "Посадка" },
          { time: "+15 мин", place: "Черноббио · Вилла д'Эсте", note: "Только с воды видна вся фасадная сторона" },
          { time: "+30 мин", place: "Лальо · Вилла Олеандра", note: "Вилла Джорджа Клуни" },
          { time: "+60 мин", place: "Возврат в Комо", note: "Высадка" },
        ],
        faqs: [
          { question: "Шкипер включён в стоимость?", answer: "Да. €220 покрывают лодку, топливо, сборы и шкипера на полный час, без доплат за гостя до 10 человек." },
          { question: "Можно ли искупаться?", answer: "Да, при подходящей погоде." },
          { question: "А если погода плохая?", answer: "При небезопасной воде переносим без оплаты. Лёгкий дождь не отменяет — у лодок раздвижная крыша." },
          { question: "Нужно бронировать заранее?", answer: "Летом — за две-три недели. Весной и осенью обычно есть свободные слоты в течение недели." },
        ],
      },
      ar: {
        metaTitle: "جولة بالقارب لمدة ساعة في بحيرة كومو · فيلا ديستي وفيلا أوليندرا",
        metaDesc:
          "ساعة على متن قارب خاص من كومو: فيلا ديستي، فيلا أوليندرا، الحوض الأول لبحيرة كومو. ربان محترف وقارب فاخر من خشب الماهوغني.",
        headline: "ساعة على البحيرة. <em>أكثر ميل تم تصويره في أوروبا.</em>",
        kicker: "ساعة واحدة · من €220 · 2–10 ضيوف · انطلاق من كومو",
        body: [
          { type: "p", text: "جولة التعريف. ستون دقيقة هي أقصر طريق ليكون الضيف على الماء وفي قلب البطاقة البريدية. نبدأ من رصيف لونغولاغو فيالي جينو في كومو، نمر بمنارة فارو فولتيانو ثم نتجه شمالاً على الضفة الغربية." },
          { type: "p", text: "خلال عشر دقائق تصل إلى تشيرنوبيو حيث تتدلى حدائق فيلا ديستي إلى الماء. خمس دقائق إضافية وتصبح تحت فيلا أوليندرا، عقار جورج كلوني في لاليو منذ عام 2002." },
        ],
        included: [
          "استخدام خاص للقارب طوال الساعة",
          "ربان محترف (لوريس أو كلاوديو)",
          "مياه فوارة وثلج على متن القارب",
          "مناشف للسباحة",
          "الوقود ورسوم البحيرة مشمولة",
        ],
        notIncluded: [
          "النقل من الفندق إلى الرصيف",
          "رسوم دخول الفيلات والمطاعم",
          "خدمة التصوير",
        ],
        itinerary: [
          { time: "+0", place: "كومو — رصيف فيالي جينو", note: "الصعود إلى القارب" },
          { time: "+15", place: "تشيرنوبيو · فيلا ديستي", note: "زاوية لا تُرى إلا من الماء" },
          { time: "+30", place: "لاليو · فيلا أوليندرا", note: "فيلا جورج كلوني" },
          { time: "+60", place: "العودة إلى كومو", note: "النزول" },
        ],
        faqs: [
          { question: "هل الربان مشمول في السعر؟", answer: "نعم، €220 تشمل القارب والوقود ورسوم البحيرة والربان للساعة كاملة." },
          { question: "هل يمكن السباحة خلال الساعة؟", answer: "نعم إذا سمح الطقس." },
          { question: "ماذا لو كان الطقس سيئاً؟", answer: "نعيد الجدولة دون رسوم إذا اعتبر الربان البحيرة غير آمنة." },
          { question: "هل يجب الحجز مسبقاً؟", answer: "في الصيف نعم، قبل أسبوعين إلى ثلاثة." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 02 — Balbianello & Nesso, 2.5h
  // ─────────────────────────────────────────────────────────────
  {
    slug: "balbianello-nesso",
    baseIndex: 1,
    hero: "/images/balbianello.jpg",
    durationMinutes: 150,
    priceEUR: 480,
    pins: ["como", "nesso", "argegno", "balbianello"],
    copy: {
      en: {
        metaTitle: "Villa Balbianello & Orrido di Nesso · 2.5h Boat Tour from Como",
        metaDesc:
          "Casino Royale's Villa del Balbianello and the hidden Orrido di Nesso waterfall, on a 2.5-hour private boat tour from Como aboard a hand-built mahogany boat.",
        headline: "Balbianello and Nesso. <em>The two views the lake is best known for.</em>",
        kicker: "2.5 hours · from €480 · 2–10 guests · departing Como",
        body: [
          { type: "p", text: "Two-and-a-half hours, two of the lake's defining sights, no detour. We push north from Como, hold east at Torno for the Orrido di Nesso — a hairline gorge where two streams collapse into the lake at the foot of a stone bridge — and then cross to the western shore for Villa del Balbianello, the peninsula that ends at Lenno." },
          { type: "h", text: "Orrido di Nesso" },
          { type: "p", text: "The waterfall is hidden by design. From the road that follows the eastern shore you'd miss it; from the lake, the gorge opens between the houses of the village and you see the full drop. Most operators don't include it because it adds an east-shore swing to a west-shore itinerary. We do, because it's the lake's most photographed waterfall and the village around it is the prettiest stop on this side." },
          { type: "h", text: "Villa del Balbianello" },
          { type: "p", text: "The villa where Star Wars Episode II and Casino Royale shot the iconic 'James Bond recovers' scenes. From the water you see the full 18th-century façade with its loggia, the cypress alley climbing up to the gardens, and the small dock where Daniel Craig steps ashore in the film. We hold the boat at the angle the films use." },
        ],
        included: [
          "Private use of the boat for 2.5 hours",
          "Professional skipper",
          "Sparkling water, prosecco glass on the way back",
          "Towels for swimming",
          "Fuel and lake fees",
        ],
        notIncluded: [
          "Villa del Balbianello entry ticket if you wish to disembark (€20 pp, FAI members free)",
          "Hotel transfer",
          "Restaurant reservations",
        ],
        itinerary: [
          { time: "+0 min", place: "Como — Lungolago Viale Geno", note: "Boarding" },
          { time: "+25 min", place: "Torno", note: "Pause to look back at the basin" },
          { time: "+45 min", place: "Orrido di Nesso", note: "Hidden waterfall — bring your camera" },
          { time: "+75 min", place: "Argegno", note: "Mid-lake village, optional swim stop" },
          { time: "+100 min", place: "Villa del Balbianello", note: "Cinematic peninsula, the centrepiece" },
          { time: "+125 min", place: "Return south", note: "Following the western shore" },
          { time: "+150 min", place: "Como", note: "Disembarkation" },
        ],
        faqs: [
          { question: "Can we go inside Villa del Balbianello?", answer: "Yes — the FAI (Italian National Trust) opens the gardens daily 10:00–18:00 from mid-March to mid-November (closed Mondays and Wednesdays). Tickets are €20 per adult; we can drop you at the dock and collect you 60–90 minutes later, lengthening the tour proportionally." },
          { question: "How close do we get to Orrido di Nesso?", answer: "We stop the boat about thirty metres off the gorge — close enough for the spray on a hot day, far enough to see the bridge and the village above it framing the waterfall. The captain lets you direct the framing." },
          { question: "Is 2.5 hours enough for both?", answer: "Yes — this is the route's purpose. If you'd rather have a longer stop at one of the two sights, the four-hour 'Half-Day Top Villas' tour gives you a full hour at Balbianello and an extra stop at Villa Carlotta." },
        ],
      },
      it: {
        metaTitle: "Tour in Barca a Villa del Balbianello e Orrido di Nesso · 2.5 ore",
        metaDesc:
          "Villa del Balbianello (Casino Royale) e l'Orrido di Nesso in una gita in barca privata di 2 ore e mezza da Como, su motoscafo in mogano fatto a mano.",
        headline: "Balbianello e Nesso. <em>Le due vedute simbolo del lago.</em>",
        kicker: "2 ore e mezza · da €480 · 2–10 persone · partenza da Como",
        body: [
          { type: "p", text: "Due ore e mezza, due luoghi simbolo, zero deviazioni. Si parte da Como verso nord, si tiene la sponda est fino all'Orrido di Nesso — la gola sottile dove due torrenti precipitano nel lago ai piedi di un ponte di pietra — e si attraversa per Villa del Balbianello, la penisola che chiude la baia di Lenno." },
          { type: "h", text: "L'Orrido di Nesso" },
          { type: "p", text: "La cascata è nascosta per natura. Dalla strada che segue la sponda orientale non si vede; dal lago, la gola si apre tra le case del paese e si scopre l'intera cascata. La maggior parte degli operatori non la include perché aggiunge una virata a est in un itinerario di solito tutto a ovest. Noi la facciamo, perché è la cascata più fotografata del lago e il borgo che la circonda è la sosta più bella di questa sponda." },
          { type: "h", text: "Villa del Balbianello" },
          { type: "p", text: "La villa di Star Wars Episodio II e Casino Royale, dove James Bond si riprende dopo l'avvelenamento. Dall'acqua si vede la facciata del Settecento con la loggia, il viale di cipressi che sale ai giardini e il piccolo molo dove Daniel Craig sbarca nel film. Lo skipper tiene la barca esattamente dall'angolazione che i film hanno scelto." },
        ],
        included: [
          "Uso privato della barca per 2.5 ore",
          "Skipper professionista",
          "Acqua frizzante, calice di prosecco al ritorno",
          "Asciugamani per il bagno",
          "Carburante e tasse del lago",
        ],
        notIncluded: [
          "Biglietto d'ingresso a Villa del Balbianello se desiderate sbarcare (€20 a persona, gratis per soci FAI)",
          "Transfer dall'hotel",
          "Prenotazioni ristoranti",
        ],
        itinerary: [
          { time: "+0 min", place: "Como — Lungolago Viale Geno", note: "Imbarco" },
          { time: "+25 min", place: "Torno", note: "Pausa per la vista sul bacino" },
          { time: "+45 min", place: "Orrido di Nesso", note: "Cascata nascosta — preparate la macchina fotografica" },
          { time: "+75 min", place: "Argegno", note: "Villaggio centro lago, sosta bagno opzionale" },
          { time: "+100 min", place: "Villa del Balbianello", note: "La penisola del cinema, il pezzo forte" },
          { time: "+125 min", place: "Rotta a sud", note: "Lungo la sponda occidentale" },
          { time: "+150 min", place: "Como", note: "Sbarco" },
        ],
        faqs: [
          { question: "Si può visitare l'interno di Villa del Balbianello?", answer: "Sì — il FAI apre i giardini ogni giorno dalle 10:00 alle 18:00 da metà marzo a metà novembre (chiuso lunedì e mercoledì). Biglietto €20 per adulto. Vi sbarchiamo al molo e vi recuperiamo dopo 60–90 minuti, allungando il tour di conseguenza." },
          { question: "Quanto ci si avvicina all'Orrido di Nesso?", answer: "Fermiamo la barca a circa trenta metri dalla gola — abbastanza vicino per sentire la nebulizzazione nei giorni caldi, abbastanza lontano per inquadrare il ponte e il borgo che incorniciano la cascata." },
          { question: "Bastano 2 ore e mezza per entrambi?", answer: "Sì, è proprio l'obiettivo della rotta. Se preferite una sosta più lunga, il tour di 'Mezza Giornata Ville Top' di 4 ore vi dà un'ora intera a Balbianello e una sosta in più a Villa Carlotta." },
        ],
      },
      ru: {
        metaTitle: "Вилла Бальбьянелло и Орридо ди Нессо · 2.5-часовая прогулка из Комо",
        metaDesc:
          "Вилла Бальбьянелло (Casino Royale) и водопад Орридо ди Нессо на частной 2.5-часовой прогулке из Комо на лодке из красного дерева.",
        headline: "Бальбьянелло и Нессо. <em>Два главных вида озера.</em>",
        kicker: "2.5 часа · от €480 · 2–10 гостей",
        body: [
          { type: "p", text: "Два с половиной часа, две главные достопримечательности, без отклонений. Мы идём из Комо на север, держимся восточного берега до Орридо ди Нессо, затем пересекаем озеро к Вилле Бальбьянелло." },
          { type: "h", text: "Орридо ди Нессо" },
          { type: "p", text: "Водопад скрыт от берега — увидеть его можно только с воды." },
          { type: "h", text: "Вилла Бальбьянелло" },
          { type: "p", text: "Вилла из Casino Royale и Star Wars — фасад XVIII века, аллея кипарисов и причал из фильма." },
        ],
        included: ["Частное использование лодки 2.5 часа", "Шкипер", "Вода и просекко", "Полотенца", "Топливо и сборы"],
        notIncluded: ["Вход на виллу (€20)", "Трансфер", "Рестораны"],
        itinerary: [
          { time: "+0", place: "Комо", note: "Посадка" },
          { time: "+45", place: "Орридо ди Нессо", note: "Водопад" },
          { time: "+100", place: "Вилла Бальбьянелло", note: "Главная остановка" },
          { time: "+150", place: "Комо", note: "Высадка" },
        ],
        faqs: [
          { question: "Можно зайти на виллу?", answer: "Да, FAI открывает сады с 10:00 до 18:00 с середины марта до середины ноября, кроме понедельника и среды. €20 за вход." },
          { question: "Хватит ли 2.5 часов?", answer: "Да, это и есть цель маршрута." },
          { question: "Близко к водопаду?", answer: "Около 30 метров от ущелья." },
        ],
      },
      ar: {
        metaTitle: "فيلا بالبيانيلو وأوريدو دي نيسو · جولة بالقارب من كومو",
        metaDesc:
          "فيلا بالبيانيلو (كازينو رويال) وشلال أوريدو دي نيسو في جولة خاصة لمدة ساعتين ونصف على متن قارب من خشب الماهوغني من كومو.",
        headline: "بالبيانيلو ونيسو. <em>المنظران الأشهر للبحيرة.</em>",
        kicker: "2.5 ساعة · من €480 · 2–10 ضيوف",
        body: [
          { type: "p", text: "ساعتان ونصف، معلمان رئيسيان، دون أي انحراف. ننطلق من كومو شمالاً، نلتزم بالضفة الشرقية حتى أوريدو دي نيسو ثم نعبر إلى الفيلا." },
          { type: "h", text: "أوريدو دي نيسو" },
          { type: "p", text: "الشلال مخفي بطبيعته ولا يُرى إلا من الماء." },
          { type: "h", text: "فيلا بالبيانيلو" },
          { type: "p", text: "موقع تصوير كازينو رويال وحرب النجوم — واجهة من القرن الثامن عشر وممر السرو." },
        ],
        included: ["استخدام خاص للقارب 2.5 ساعة", "ربان", "مياه وبروسيكو", "مناشف", "الوقود والرسوم"],
        notIncluded: ["تذكرة الفيلا (€20)", "النقل", "حجوزات المطاعم"],
        itinerary: [
          { time: "+0", place: "كومو", note: "الصعود" },
          { time: "+45", place: "أوريدو دي نيسو", note: "الشلال" },
          { time: "+100", place: "فيلا بالبيانيلو", note: "المحطة الرئيسية" },
          { time: "+150", place: "كومو", note: "النزول" },
        ],
        faqs: [
          { question: "هل يمكن دخول الفيلا؟", answer: "نعم، تفتح FAI الحدائق يومياً من 10:00 إلى 18:00 من منتصف مارس إلى منتصف نوفمبر." },
          { question: "هل ساعتان ونصف كافية؟", answer: "نعم، هذا هو هدف الجولة." },
          { question: "كم نقترب من الشلال؟", answer: "حوالي 30 متراً من الفجوة." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 03 — Half-Day Top Villas, 4h
  // ─────────────────────────────────────────────────────────────
  {
    slug: "top-villas-half-day",
    baseIndex: 2,
    hero: "/images/bellagio.jpg",
    durationMinutes: 240,
    priceEUR: 780,
    pins: ["balbianello", "carlotta", "bellagio"],
    copy: {
      en: {
        metaTitle: "Half-Day Lake Como Boat Tour · Balbianello, Carlotta, Bellagio",
        metaDesc:
          "Four-hour private boat tour of Lake Como's three signature villas — Balbianello, Carlotta, Balbiano (House of Gucci) — with a stop in Bellagio or Varenna.",
        headline: "Three villas, one Bellagio stop. <em>The half day the lake deserves.</em>",
        kicker: "4 hours · from €780 · 2–10 guests · departing Como",
        body: [
          { type: "p", text: "Four hours is the natural length of Lake Como by boat. Long enough to reach the upper basin and back, short enough to keep the day flexible. The route covers the three villas the lake is named for — Balbianello, Carlotta, Balbiano — and gives you a one-hour stop in Bellagio or Varenna for lunch." },
          { type: "h", text: "Villa del Balbianello" },
          { type: "p", text: "Casino Royale, Star Wars Episode II. From the water, the loggia and the cypress avenue. We pause for ten minutes at the cinematic angle." },
          { type: "h", text: "Villa Carlotta" },
          { type: "p", text: "Tremezzo. The 17th-century palace with its azalea and rhododendron gardens descending to the water — the most colourful villa on the lake from April to June. Disembarkation possible if you arrange the FAI ticket." },
          { type: "h", text: "Villa Balbiano · the House of Gucci villa" },
          { type: "p", text: "Ossuccio. Where Ridley Scott shot the lakeside scenes of House of Gucci in 2021. Less photographed than Balbianello, no less impressive — and it's open for private rentals through Aman, so the captain often sees the wedding setups when we pass." },
          { type: "h", text: "Bellagio or Varenna · your call" },
          { type: "p", text: "After the villas we drop you in Bellagio (west shore, the 'pearl' of Lake Como) or Varenna (east shore, smaller and quieter). One hour ashore for lunch. We hold a table at one of three trusted restaurants — tell us a day in advance which one and they'll be expecting you." },
        ],
        included: [
          "Private use of the boat for 4 hours",
          "Professional skipper",
          "Sparkling water, prosecco aperitivo on the return leg",
          "Towels for swimming",
          "Fuel, lake fees",
          "Restaurant reservation in Bellagio or Varenna (we don't take a kickback — direct booking, our trusted shortlist)",
        ],
        notIncluded: [
          "Lunch (typically €60–120 per person)",
          "Villa entry tickets (Balbianello €20, Carlotta €12)",
          "Hotel transfer",
        ],
        itinerary: [
          { time: "+0 min", place: "Como — Lungolago Viale Geno", note: "Boarding" },
          { time: "+45 min", place: "Villa del Balbianello", note: "Cinematic angle, photo pause" },
          { time: "+75 min", place: "Villa Carlotta", note: "Garden façade" },
          { time: "+90 min", place: "Villa Balbiano · Ossuccio", note: "Where House of Gucci was shot" },
          { time: "+105 min", place: "Bellagio (or Varenna)", note: "Disembarkation, one hour ashore" },
          { time: "+165 min", place: "Re-embark", note: "Aperitivo on the return" },
          { time: "+240 min", place: "Como", note: "Disembarkation" },
        ],
        faqs: [
          { question: "Can we choose between Bellagio and Varenna?", answer: "Yes — choose at booking or on the morning. Bellagio is the larger village with more lunch options; Varenna is smaller, quieter, and has the better-kept old-town streets. Both work for the time we have." },
          { question: "Is lunch included?", answer: "No. We make the reservation but you settle directly at the restaurant — typical full lunches with wine come to €60–120 per person at our shortlist (Bilacus or Salice Blu in Bellagio; Ristorante La Vista in Varenna)." },
          { question: "Can we extend by an hour for a swim stop?", answer: "Yes. If you tell us at booking we'll add an hour for €120 and add a swim stop at Faggeto or one of the lake's quieter coves between villas." },
          { question: "Is this tour suitable for a wedding party?", answer: "It's suitable for groups up to 10. For larger wedding parties we charter a second boat — message us with the headcount." },
        ],
      },
      it: {
        metaTitle: "Tour in Barca Mezza Giornata sul Lago di Como · Balbianello, Carlotta, Bellagio",
        metaDesc:
          "Tour privato in barca di 4 ore sul Lago di Como: Villa del Balbianello, Villa Carlotta, Villa Balbiano (House of Gucci) con sosta a Bellagio o Varenna.",
        headline: "Tre ville, una sosta a Bellagio. <em>La mezza giornata che il lago merita.</em>",
        kicker: "4 ore · da €780 · 2–10 persone · partenza da Como",
        body: [
          { type: "p", text: "Quattro ore è la durata naturale del Lago di Como in barca. Abbastanza per arrivare al bacino superiore e tornare, abbastanza poco per tenere flessibile la giornata. La rotta tocca le tre ville simbolo del lago — Balbianello, Carlotta, Balbiano — e vi dà un'ora di sosta a Bellagio o Varenna per il pranzo." },
          { type: "h", text: "Villa del Balbianello" },
          { type: "p", text: "Casino Royale, Star Wars Episodio II. Dall'acqua, la loggia e il viale di cipressi. Sosta di dieci minuti dall'angolazione cinematografica." },
          { type: "h", text: "Villa Carlotta" },
          { type: "p", text: "Tremezzo. Il palazzo del Seicento con i giardini di azalee e rododendri che scendono fino all'acqua — la villa più colorata del lago da aprile a giugno." },
          { type: "h", text: "Villa Balbiano · la villa di House of Gucci" },
          { type: "p", text: "Ossuccio. Dove Ridley Scott ha girato le scene sul lago di House of Gucci nel 2021. Meno fotografata di Balbianello, non meno imponente — è affittabile in privato attraverso Aman, e capita spesso che lo skipper veda gli allestimenti per matrimoni quando passiamo." },
          { type: "h", text: "Bellagio o Varenna · scegliete voi" },
          { type: "p", text: "Dopo le ville vi sbarchiamo a Bellagio (sponda ovest, la 'perla' del lago) o Varenna (sponda est, più piccola e più tranquilla). Un'ora a terra per pranzo. Teniamo un tavolo in uno dei tre ristoranti di fiducia — diteci il giorno prima quale e vi staranno aspettando." },
        ],
        included: [
          "Uso privato della barca per 4 ore",
          "Skipper professionista",
          "Acqua frizzante, aperitivo con prosecco al ritorno",
          "Asciugamani per il bagno",
          "Carburante e tasse del lago",
          "Prenotazione del ristorante a Bellagio o Varenna (nessuna commissione — prenotiamo direttamente, è la nostra rosa di fiducia)",
        ],
        notIncluded: [
          "Pranzo (tipicamente €60–120 a persona)",
          "Biglietti d'ingresso alle ville (Balbianello €20, Carlotta €12)",
          "Transfer dall'hotel",
        ],
        itinerary: [
          { time: "+0 min", place: "Como — Lungolago Viale Geno", note: "Imbarco" },
          { time: "+45 min", place: "Villa del Balbianello", note: "Angolazione cinematografica, sosta foto" },
          { time: "+75 min", place: "Villa Carlotta", note: "Facciata sui giardini" },
          { time: "+90 min", place: "Villa Balbiano · Ossuccio", note: "Set di House of Gucci" },
          { time: "+105 min", place: "Bellagio (o Varenna)", note: "Sbarco, un'ora a terra" },
          { time: "+165 min", place: "Reimbarco", note: "Aperitivo al ritorno" },
          { time: "+240 min", place: "Como", note: "Sbarco" },
        ],
        faqs: [
          { question: "Si può scegliere tra Bellagio e Varenna?", answer: "Sì — sceglietelo alla prenotazione o la mattina stessa. Bellagio è il borgo più grande con più scelta per pranzo; Varenna è più piccolo, più tranquillo, con un centro storico meglio conservato." },
          { question: "Il pranzo è compreso?", answer: "No. Facciamo la prenotazione ma pagate direttamente al ristorante — un pranzo completo con vino costa €60–120 a persona nei nostri ristoranti consigliati (Bilacus o Salice Blu a Bellagio; La Vista a Varenna)." },
          { question: "Si può aggiungere un'ora per il bagno?", answer: "Sì. Avvisateci alla prenotazione, aggiungiamo un'ora per €120 con sosta bagno a Faggeto o in una delle calette più tranquille tra le ville." },
          { question: "È adatto per un gruppo matrimoniale?", answer: "Va bene per gruppi fino a 10 persone. Per gruppi più grandi noleggiamo una seconda barca — scriveteci con il numero di ospiti." },
        ],
      },
      ru: {
        metaTitle: "Полудневной Тур на Лодке по Озеру Комо · Бальбьянелло, Карлотта, Беладжо",
        metaDesc:
          "4-часовая частная прогулка по озеру Комо: Вилла Бальбьянелло, Вилла Карлотта, Вилла Бальбьяно (Дом Gucci) с остановкой в Беладжо или Варенне.",
        headline: "Три виллы, остановка в Беладжо. <em>Полдня, которые заслуживает озеро.</em>",
        kicker: "4 часа · от €780 · 2–10 гостей",
        body: [
          { type: "p", text: "Четыре часа — естественная продолжительность Комо на лодке. Маршрут охватывает три виллы — Бальбьянелло, Карлотта, Бальбьяно — и даёт час в Беладжо или Варенне на обед." },
          { type: "h", text: "Вилла Бальбьянелло" },
          { type: "p", text: "Casino Royale и Star Wars. Лоджия и аллея кипарисов с воды." },
          { type: "h", text: "Вилла Карлотта" },
          { type: "p", text: "Тремеццо. Дворец XVII века с азалиями и рододендронами в апреле–июне." },
          { type: "h", text: "Вилла Бальбьяно — Дом Gucci" },
          { type: "p", text: "Где Ридли Скотт снимал сцены House of Gucci." },
          { type: "h", text: "Беладжо или Варенна — на выбор" },
          { type: "p", text: "Час на берегу для обеда в одном из проверенных ресторанов." },
        ],
        included: ["Частная лодка 4 часа", "Шкипер", "Вода, просекко", "Полотенца", "Топливо и сборы", "Бронь ресторана"],
        notIncluded: ["Обед €60–120", "Входы (Бальбьянелло €20, Карлотта €12)", "Трансфер"],
        itinerary: [
          { time: "+0", place: "Комо", note: "Посадка" },
          { time: "+45", place: "Бальбьянелло", note: "Фотопауза" },
          { time: "+75", place: "Карлотта", note: "Сады" },
          { time: "+105", place: "Беладжо/Варенна", note: "Обед, 1 час" },
          { time: "+240", place: "Комо", note: "Высадка" },
        ],
        faqs: [
          { question: "Беладжо или Варенна?", answer: "На выбор при бронировании или утром." },
          { question: "Обед включён?", answer: "Нет, оплачивается отдельно в ресторане." },
          { question: "Можно добавить час на купание?", answer: "Да, +€120." },
        ],
      },
      ar: {
        metaTitle: "جولة نصف يوم بالقارب على بحيرة كومو · بالبيانيلو وكارلوتا وبيلاجيو",
        metaDesc:
          "جولة خاصة بالقارب لمدة 4 ساعات على بحيرة كومو: فيلا بالبيانيلو وفيلا كارلوتا وفيلا بالبيانو (House of Gucci) مع توقف في بيلاجيو أو فارينا.",
        headline: "ثلاث فيلات وتوقف في بيلاجيو. <em>نصف يوم تستحقه البحيرة.</em>",
        kicker: "4 ساعات · من €780 · 2–10 ضيوف",
        body: [
          { type: "p", text: "أربع ساعات هي المدة الطبيعية لبحيرة كومو بالقارب. يغطي المسار الفيلات الثلاث الرمزية ويمنحكم ساعة في بيلاجيو أو فارينا للغداء." },
          { type: "h", text: "فيلا بالبيانيلو" },
          { type: "p", text: "كازينو رويال وحرب النجوم — اللوجيا وممر السرو." },
          { type: "h", text: "فيلا كارلوتا" },
          { type: "p", text: "قصر القرن السابع عشر مع حدائق الأزاليا في أبريل–يونيو." },
          { type: "h", text: "فيلا بالبيانو · موقع House of Gucci" },
          { type: "p", text: "حيث صور ريدلي سكوت مشاهد البحيرة في فيلم House of Gucci." },
          { type: "h", text: "بيلاجيو أو فارينا · حسب الاختيار" },
          { type: "p", text: "ساعة على الأرض للغداء في أحد المطاعم الموثوقة." },
        ],
        included: ["استخدام خاص للقارب 4 ساعات", "الربان", "مياه وبروسيكو", "مناشف", "الوقود والرسوم", "حجز المطعم"],
        notIncluded: ["الغداء €60–120", "تذاكر الفيلات (بالبيانيلو €20، كارلوتا €12)", "النقل"],
        itinerary: [
          { time: "+0", place: "كومو", note: "الصعود" },
          { time: "+45", place: "بالبيانيلو", note: "وقفة تصوير" },
          { time: "+75", place: "كارلوتا", note: "الحدائق" },
          { time: "+105", place: "بيلاجيو/فارينا", note: "غداء ساعة" },
          { time: "+240", place: "كومو", note: "النزول" },
        ],
        faqs: [
          { question: "بيلاجيو أم فارينا؟", answer: "خياركم عند الحجز." },
          { question: "هل الغداء مشمول؟", answer: "لا، يُدفع مباشرة في المطعم." },
          { question: "هل يمكن إضافة ساعة للسباحة؟", answer: "نعم، €120." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 04 — Bespoke full-day, 6-8h
  // ─────────────────────────────────────────────────────────────
  {
    slug: "bespoke-full-day",
    baseIndex: 3,
    hero: "/images/luxury-cruise.jpg",
    durationMinutes: 480,
    priceEUR: 1400,
    pins: ["como", "balbianello", "carlotta", "bellagio", "varenna"],
    copy: {
      en: {
        metaTitle: "Lake Como Full-Day Private Boat Charter · Bespoke Itinerary",
        metaDesc:
          "Six to eight hours, planned around your day on Lake Como. Hotel pontoon pick-up, cinematic villas, swim stops, lakeside lunch reservation, sunset return.",
        headline: "Eight hours, your itinerary. <em>The lake on its own terms.</em>",
        kicker: "6–8 hours · from €1,400 · 2–10 guests · pick-up at any hotel pontoon",
        body: [
          { type: "p", text: "When the day is the destination. We pick you up at your hotel's pontoon — Villa d'Este, Passalacqua, Mandarin Oriental, Il Sereno, Grand Hotel Tremezzo, Villa Serbelloni — at any time you choose, and we plan the day backwards from how you'd like to end it." },
          { type: "h", text: "What a typical day looks like" },
          { type: "p", text: "10:00 — pick-up at your hotel pontoon. 11:00 — Villa del Balbianello, with disembarkation if you've arranged the FAI ticket. 12:30 — swim stop at Faggeto or one of the secret coves below the cliffs. 14:00 — lunch at a lakeside restaurant we book for you (Crotto del Misto on the eastern shore, La Punta in Bellagio, or Locanda La Tirlindana in Sala Comacina). 16:00 — Bellagio for an hour ashore. 17:30 — Varenna at golden hour. 19:00 — return to your hotel." },
          { type: "p", text: "We adjust on the day. If the wind picks up in the upper basin we hold to the southern villas. If the morning is grey we wait an hour and start at Cernobbio. If you want to skip lunch and chase a longer swim, that's the day." },
          { type: "h", text: "What we plan for you" },
          { type: "p", text: "Restaurant reservations at any of our trusted lakeside places. Photographer onboard if you want one — we know two professionals who shoot with us regularly. Champagne and a cheese-and-charcuterie board if you want lunch on the boat. Florist delivery to the hotel pontoon if you're proposing." },
        ],
        included: [
          "Private use of the boat for 6 to 8 hours",
          "Professional skipper",
          "Hotel pontoon pick-up anywhere on the lake",
          "Sparkling and still water, prosecco, soft drinks",
          "Towels and lake-temperature lookup before swim stops",
          "Restaurant reservations at our shortlist",
          "Fuel, lake fees, all logistics",
        ],
        notIncluded: [
          "Lunch (€80–180 per person depending on venue)",
          "Villa entry tickets",
          "Photographer (if requested, we introduce; €350–600 for the day)",
          "Florist or special requests (we coordinate, you settle)",
        ],
        itinerary: [
          { time: "+0", place: "Hotel pontoon", note: "Pick-up at the time you choose" },
          { time: "Morning", place: "First villas", note: "Balbianello, Carlotta or Cernobbio depending on weather" },
          { time: "Midday", place: "Swim stop", note: "Faggeto or one of the secret coves" },
          { time: "Lunch", place: "Lakeside restaurant", note: "Crotto del Misto, La Punta, or Tirlindana" },
          { time: "Afternoon", place: "Bellagio + Varenna", note: "An hour ashore in each, if you want both" },
          { time: "Sunset", place: "Western shore", note: "The light moves down the lake from north to south" },
          { time: "Return", place: "Hotel pontoon", note: "Drop-off when the day's done" },
        ],
        faqs: [
          { question: "How does pricing work for 6 vs 8 hours?", answer: "€1,400 covers six hours; €1,800 covers eight. The boat is yours either way — the difference is fuel and skipper time. We don't charge per guest." },
          { question: "Can you handle a wedding proposal?", answer: "Yes, often. We coordinate the florist, the photographer, the timing — you tell us your hotel and the moment you want, we plan the rest. There's no extra coordination fee." },
          { question: "Which hotels do you collect from?", answer: "All of them. The pontoons we use most are Villa d'Este (Cernobbio), Passalacqua (Moltrasio), Mandarin Oriental (Blevio), Il Sereno (Torno), Grand Hotel Tremezzo (Tremezzo), Grand Hotel Villa Serbelloni (Bellagio). If your villa rental has a private pier, we can pick you up there too — send us the coordinates." },
          { question: "Is lunch on the boat possible?", answer: "Yes. We arrange a cheese, salumi and seafood board with prosecco for €40 per person, and you spend the lunch on the water rather than ashore. Tell us a day in advance." },
        ],
      },
      it: {
        metaTitle: "Charter Privato Giornata Intera sul Lago di Como · Itinerario su Misura",
        metaDesc:
          "Sei o otto ore di tour privato sul Lago di Como, su misura: pick-up al pontile dell'hotel, ville cinematografiche, pranzo sul lago, ritorno al tramonto.",
        headline: "Otto ore, il vostro itinerario. <em>Il lago alle vostre condizioni.</em>",
        kicker: "6–8 ore · da €1.400 · 2–10 persone · pick-up a qualsiasi pontile d'hotel",
        body: [
          { type: "p", text: "Quando la giornata è la destinazione. Vi prendiamo al pontile del vostro hotel — Villa d'Este, Passalacqua, Mandarin Oriental, Il Sereno, Grand Hotel Tremezzo, Villa Serbelloni — all'ora che scegliete voi, e pianifichiamo la giornata partendo da come volete chiuderla." },
          { type: "h", text: "Una giornata tipo" },
          { type: "p", text: "10:00 — pick-up al pontile dell'hotel. 11:00 — Villa del Balbianello, con sbarco se avete prenotato il biglietto FAI. 12:30 — sosta bagno a Faggeto o in una delle calette nascoste sotto le rocce. 14:00 — pranzo sul lago (Crotto del Misto sulla sponda est, La Punta a Bellagio, o La Tirlindana a Sala Comacina). 16:00 — Bellagio, un'ora a terra. 17:30 — Varenna nell'ora dorata. 19:00 — ritorno in hotel." },
          { type: "p", text: "Adattiamo durante il giorno. Se nel bacino superiore tira vento, restiamo alle ville del sud. Se la mattina è grigia, aspettiamo un'ora e iniziamo da Cernobbio. Se preferite saltare il pranzo per un bagno più lungo, è la giornata che chiedete voi." },
          { type: "h", text: "Cosa organizziamo per voi" },
          { type: "p", text: "Prenotazioni nei nostri ristoranti di fiducia sul lago. Fotografo a bordo se lo desiderate — conosciamo due professionisti che lavorano spesso con noi. Champagne e tagliere di salumi e formaggi se preferite il pranzo a bordo. Consegna del fioraio al pontile dell'hotel se state organizzando una proposta di matrimonio." },
        ],
        included: [
          "Uso privato della barca per 6 o 8 ore",
          "Skipper professionista",
          "Pick-up al pontile dell'hotel ovunque sul lago",
          "Acqua frizzante e naturale, prosecco, bibite",
          "Asciugamani e verifica temperatura dell'acqua prima delle soste bagno",
          "Prenotazioni nei nostri ristoranti consigliati",
          "Carburante, tasse del lago, tutta la logistica",
        ],
        notIncluded: [
          "Pranzo (€80–180 a persona a seconda del locale)",
          "Biglietti d'ingresso alle ville",
          "Fotografo (se richiesto vi presentiamo; €350–600 per la giornata)",
          "Fioraio o richieste speciali (coordiniamo noi, voi pagate)",
        ],
        itinerary: [
          { time: "Pick-up", place: "Pontile dell'hotel", note: "All'ora che scegliete voi" },
          { time: "Mattina", place: "Prime ville", note: "Balbianello, Carlotta o Cernobbio a seconda del tempo" },
          { time: "Mezzogiorno", place: "Sosta bagno", note: "Faggeto o una caletta nascosta" },
          { time: "Pranzo", place: "Ristorante sul lago", note: "Crotto del Misto, La Punta o Tirlindana" },
          { time: "Pomeriggio", place: "Bellagio + Varenna", note: "Un'ora in ciascuno, se volete entrambi" },
          { time: "Tramonto", place: "Sponda ovest", note: "La luce si sposta da nord a sud" },
          { time: "Ritorno", place: "Pontile dell'hotel", note: "Sbarco a fine giornata" },
        ],
        faqs: [
          { question: "Come funziona il prezzo tra 6 e 8 ore?", answer: "€1.400 per sei ore; €1.800 per otto. La barca è vostra in entrambi i casi — la differenza è il carburante e il tempo dello skipper. Non addebitiamo a persona." },
          { question: "Si può organizzare una proposta di matrimonio?", answer: "Sì, spesso. Coordiniamo fioraio, fotografo, tempistiche — voi ci dite l'hotel e il momento, noi pianifichiamo il resto. Nessun costo extra di coordinamento." },
          { question: "Da quali hotel passate per il pick-up?", answer: "Tutti. I pontili che usiamo più spesso: Villa d'Este (Cernobbio), Passalacqua (Moltrasio), Mandarin Oriental (Blevio), Il Sereno (Torno), Grand Hotel Tremezzo, Grand Hotel Villa Serbelloni (Bellagio). Se la villa che avete affittato ha un pontile privato, vi prendiamo lì — mandateci le coordinate." },
          { question: "È possibile pranzare a bordo?", answer: "Sì. Organizziamo un tagliere di formaggi, salumi e prodotti del lago con prosecco a €40 a persona, e si pranza in navigazione invece che a terra. Avvisateci il giorno prima." },
        ],
      },
      ru: {
        metaTitle: "Полнодневный Частный Чартер по Озеру Комо · Индивидуальный Маршрут",
        metaDesc:
          "Шесть–восемь часов на озере Комо по вашему графику: подача к пристани отеля, виллы, купание, ресторан на берегу, возвращение на закате.",
        headline: "Восемь часов, ваш маршрут. <em>Озеро на ваших условиях.</em>",
        kicker: "6–8 часов · от €1,400 · 2–10 гостей · подача к любой пристани",
        body: [
          { type: "p", text: "Когда день — это пункт назначения. Мы забираем вас от пристани вашего отеля — Villa d'Este, Passalacqua, Mandarin Oriental, Il Sereno, Grand Hotel Tremezzo — в любое выбранное время." },
          { type: "h", text: "Типичный день" },
          { type: "p", text: "10:00 — посадка. 11:00 — Вилла Бальбьянелло. 12:30 — купание у Фаджето. 14:00 — обед в ресторане на берегу. 16:00 — Беладжо. 17:30 — Варенна на закате. 19:00 — возврат в отель." },
          { type: "p", text: "Корректируем по ходу дня — погода, желание, всё гибко." },
          { type: "h", text: "Что мы организуем" },
          { type: "p", text: "Бронь ресторана, фотограф на борту, шампанское и канапе, доставка цветов на пристань — для предложения руки и сердца." },
        ],
        included: ["Частная лодка 6–8 часов", "Шкипер", "Подача к пристани", "Вода, просекко", "Полотенца", "Бронь ресторана", "Топливо и сборы"],
        notIncluded: ["Обед €80–180", "Входы на виллы", "Фотограф €350–600", "Особые запросы"],
        itinerary: [
          { time: "+0", place: "Пристань отеля", note: "Подача" },
          { time: "Утро", place: "Виллы", note: "Бальбьянелло/Карлотта" },
          { time: "День", place: "Купание", note: "Фаджето" },
          { time: "Обед", place: "Ресторан", note: "На берегу" },
          { time: "Вечер", place: "Беладжо/Варенна", note: "По часу" },
          { time: "Закат", place: "Западный берег", note: "Золотой час" },
          { time: "Возврат", place: "Отель", note: "Высадка" },
        ],
        faqs: [
          { question: "6 или 8 часов?", answer: "€1,400 за 6 ч, €1,800 за 8 ч." },
          { question: "Помолвка на лодке?", answer: "Да, мы организуем всё." },
          { question: "Откуда забираете?", answer: "С любой пристани отеля или виллы." },
          { question: "Обед на борту?", answer: "Да, тарелка сыров и просекко за €40 с человека." },
        ],
      },
      ar: {
        metaTitle: "تأجير قارب خاص ليوم كامل على بحيرة كومو · مسار حسب الطلب",
        metaDesc:
          "ست إلى ثماني ساعات على بحيرة كومو حسب جدولكم: استلام من رصيف الفندق، الفيلات، السباحة، غداء على البحيرة، العودة عند الغروب.",
        headline: "ثماني ساعات، مساركم. <em>البحيرة حسب شروطكم.</em>",
        kicker: "6–8 ساعات · من €1,400 · 2–10 ضيوف · استلام من رصيف الفندق",
        body: [
          { type: "p", text: "عندما يكون اليوم نفسه هو الوجهة. نأتي إليكم على رصيف فندقكم — Villa d'Este أو Passalacqua أو Mandarin Oriental أو Il Sereno — في الوقت الذي تختارونه." },
          { type: "h", text: "يوم نموذجي" },
          { type: "p", text: "10:00 الاستلام. 11:00 فيلا بالبيانيلو. 12:30 سباحة في فاجيتو. 14:00 غداء على البحيرة. 16:00 بيلاجيو. 17:30 فارينا عند الغروب. 19:00 العودة إلى الفندق." },
          { type: "p", text: "نتأقلم مع الطقس والرغبات أثناء اليوم." },
          { type: "h", text: "ما نخطط لكم" },
          { type: "p", text: "حجوزات المطاعم، مصور على القارب، شامبانيا، توصيل الزهور إلى الرصيف لطلبات الزواج." },
        ],
        included: ["قارب خاص 6–8 ساعات", "الربان", "الاستلام من الرصيف", "مياه وبروسيكو", "مناشف", "حجز المطعم", "الوقود والرسوم"],
        notIncluded: ["الغداء €80–180", "تذاكر الفيلات", "المصور €350–600", "الطلبات الخاصة"],
        itinerary: [
          { time: "+0", place: "رصيف الفندق", note: "الاستلام" },
          { time: "الصباح", place: "الفيلات", note: "بالبيانيلو/كارلوتا" },
          { time: "الظهر", place: "السباحة", note: "فاجيتو" },
          { time: "الغداء", place: "المطعم", note: "على البحيرة" },
          { time: "العصر", place: "بيلاجيو/فارينا", note: "ساعة في كل منهما" },
          { time: "الغروب", place: "الضفة الغربية", note: "الساعة الذهبية" },
          { time: "العودة", place: "الفندق", note: "النزول" },
        ],
        faqs: [
          { question: "6 أم 8 ساعات؟", answer: "€1,400 لست ساعات، €1,800 لثماني." },
          { question: "طلب زواج على القارب؟", answer: "نعم، ننسق كل شيء." },
          { question: "من أي فندق تأخذوننا؟", answer: "أي رصيف فندق أو فيلا." },
          { question: "الغداء على القارب؟", answer: "نعم، طبق أجبان وبروسيكو €40 للشخص." },
        ],
      },
    },
  },
];

// Helper for sitemap.ts and route generation.
export const TOUR_SLUGS_LIST: string[] = TOUR_SLUGS.map((s) => s);
export { TOUR_SLUGS_LIST as TOUR_SLUGS_FOR_SITEMAP };
