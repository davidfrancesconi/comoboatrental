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
  /** Index in the existing translations.ts tours.items array */
  baseIndex: number;
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

// Eight private boat tours, matching the lakecomoboattour.it product
// menu minus the four excluded SKUs (tailor made, dinner, photoshoot,
// boat-palace). The duration ladder (1h → 8h) plus the sunset cruise
// is the standard Lake Como long-tail keyword set every operator
// targets. Order is short → long, with the themed sunset at the end.
export const TOUR_SLUGS = [
  "highlights-1h",
  "cernobbio-2h",
  "balbianello-nesso",
  "top-villas-half-day",
  "first-basin-5h",
  "centre-lake-6h",
  "full-day-8h",
  "sunset-cruise",
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
        metaTitle: "Прогулка на Лодке по Озеру Комо · 1 Час · Виллы Клуни и д'Эсте",
        metaDesc:
          "Часовая частная прогулка на лодке по озеру Комо из Комо: Вилла д'Эсте в Черноббио, Вилла Олеандра Джорджа Клуни в Лальо. Опытный шкипер, мотолодка из красного дерева ручной работы. От €220 на лодку.",
        headline: "Час на озере Комо. <em>Самая фотографируемая миля Европы.</em>",
        kicker: "1 час · от €220 на лодку · до 10 гостей · отправление из Комо",
        body: [
          { type: "p", text: "Знакомство с озером Комо. Шестьдесят минут — кратчайший способ оказаться на воде и в самом сердце итальянской открытки. Мы отчаливаем с пристани Лунголаго Виале Джено в центре Комо, проходим маяк Фаро Вольтиано и идём на север вдоль западного берега озера." },
          { type: "p", text: "Через десять минут вы у Черноббио, где сады Гранд Отеля Вилла д'Эсте — самой легендарной виллы озера Комо с 1568 года — спускаются прямо к воде. Ещё пять минут — и вы под Виллой Олеандра, имением Джорджа Клуни в Лальо с 2002 года. Гора уходит в озеро, виллы стоят между ними, и наш шкипер держит мотолодку там, где вы хотите сделать снимок." },
          { type: "h", text: "Почему именно один час" },
          { type: "p", text: "Если у вас уже есть планы на день — обед в Беладжо, встреча в Villa d'Este, ранний рейс из Милана-Линате или Мальпенсы — часовая частная прогулка на лодке из Комо покажет самые знаменитые виллы озера без необходимости перестраивать график. Тот же маршрут на общественном катере занимает девяносто минут, в групповом туре — два часа." },
          { type: "h", text: "Что вы увидите с воды" },
          { type: "p", text: "Первый бассейн озера Комо — это южный рукав, обращённый к городу Комо. Это та часть озера, которую снимает Голливуд. Casino Royale, Ocean's Twelve, A Month by the Lake и Star Wars Episode II — все снимали сцены в той зоне, которую охватывает наш часовой тур. Шкипер знает правильный угол для каждой виллы." },
        ],
        included: [
          "Частное использование лодки на полный час",
          "Профессиональный шкипер (Лорис или Клаудио) — оба свободно говорят по-английски и по-итальянски",
          "Газированная и негазированная вода, лёд на борту",
          "Полотенца на случай купания",
          "Топливо и сборы озера включены",
        ],
        notIncluded: [
          "Трансфер из отеля до нашей пристани (5 минут пешком от центра Комо)",
          "Входные билеты на виллы и в рестораны",
          "Профессиональная фотосъёмка (шкипер с радостью сделает фото на ваш телефон)",
        ],
        itinerary: [
          { time: "+0 мин", place: "Комо — пристань Лунголаго Виале Джено", note: "Посадка на нашу лодку" },
          { time: "+5 мин", place: "Маяк Фаро Вольтиано", note: "Проходим маяк Комо, поворот на север" },
          { time: "+15 мин", place: "Черноббио · Вилла д'Эсте", note: "Только с воды виден весь фасад с садами" },
          { time: "+30 мин", place: "Лальо · Вилла Олеандра", note: "Вилла Джорджа Клуни с 2002 года" },
          { time: "+45 мин", place: "Возврат на юг", note: "Тот же берег, другой свет" },
          { time: "+60 мин", place: "Комо — возврат к пристани", note: "Высадка" },
        ],
        faqs: [
          { question: "Шкипер включён в стоимость аренды лодки?", answer: "Да. €220 покрывают лодку, топливо, сборы озера и шкипера (Лорис или Клаудио) на полный час. Доплат за гостя до максимальной вместимости 10 человек нет." },
          { question: "Можно ли купаться во время часовой прогулки?", answer: "Да, при подходящей погоде. На борту есть полотенца, и шкипер выберет место для купания в первом бассейне озера Комо. Большинство гостей предпочитают потратить весь час на навигацию, но решение за вами." },
          { question: "Что делать, если погода плохая?", answer: "Если шкипер сочтёт озеро Комо небезопасным (сильный ветер, гроза), мы переносим прогулку без оплаты. Лёгкий дождь сам по себе не отменяет тур — у наших мотолодок раздвижная крыша." },
          { question: "Нужно ли бронировать заранее?", answer: "Летом (с июня по август) рекомендуем бронировать за две-три недели; календарь заполняется быстро. Апрель, май, сентябрь и октябрь обычно имеют свободные слоты в ту же неделю. Напишите в WhatsApp для быстрого ответа." },
        ],
      },
      ar: {
        metaTitle: "تأجير قارب بحيرة كومو · جولة ساعة من كومو · فيلا جورج كلوني",
        metaDesc:
          "جولة بحرية خاصة لمدة ساعة على بحيرة كومو من مدينة كومو: فيلا ديستي في تشيرنوبيو، فيلا جورج كلوني في لاليو، الحوض الأول للبحيرة. ربان محترف، قارب فاخر من خشب الماهوغني المصنوع يدوياً. من €220 للقارب.",
        headline: "ساعة على بحيرة كومو. <em>أكثر ميل بحري تم تصويره في أوروبا.</em>",
        kicker: "ساعة واحدة · من €220 للقارب · حتى 10 ضيوف · انطلاق من كومو",
        body: [
          { type: "p", text: "جولة التعريف ببحيرة كومو. ستون دقيقة هي الطريق الأقصر ليجد الضيف نفسه على الماء في قلب البطاقة البريدية الإيطالية. ننطلق من رصيف لونغولاغو فيالي جينو في وسط مدينة كومو، نعبر منارة فارو فولتيانو ثم نتجه شمالاً على طول الضفة الغربية لبحيرة كومو." },
          { type: "p", text: "خلال عشر دقائق تصل إلى تشيرنوبيو، حيث تنحدر حدائق فندق فيلا ديستي الكبير — أعرق فندق على بحيرة كومو منذ عام 1568 — مباشرة إلى الماء. خمس دقائق إضافية وتمر تحت فيلا أوليندرا، عقار النجم جورج كلوني في لاليو منذ عام 2002. الجبل ينحدر إلى البحيرة، والفيلات تقع بينهما، وربّاننا يثبّت القارب في الزاوية التي تريدها للصورة." },
          { type: "h", text: "لماذا ساعة واحدة" },
          { type: "p", text: "إذا كان لديكم التزامات أخرى على بحيرة كومو — غداء محجوز في بيلاجيو يمكن الوصول إليه بالسيارة، اجتماع في فندق Villa d'Este، رحلة طيران مبكرة من ميلانو-لينيت أو مالبينسا — فإن ستين دقيقة على الماء انطلاقاً من كومو ترُكم أشهر فيلات البحيرة دون الحاجة إلى إعادة جدولة اليوم. الطريق نفسه بالعبّارة العامة يستغرق تسعين دقيقة، وفي الجولات الجماعية ساعتين." },
          { type: "h", text: "ما تشاهدونه من القارب" },
          { type: "p", text: "الحوض الأول لبحيرة كومو هو الذراع الجنوبي المُطلّ على مدينة كومو. هذا هو الجزء الذي تختاره هوليوود للتصوير: Casino Royale وOcean's Twelve وA Month by the Lake وحرب النجوم — الجزء الثاني، جميعها صوّرت مشاهد في المنطقة التي تغطيها هذه الجولة. الربان يعرف الزاوية المناسبة لكل فيلا." },
        ],
        included: [
          "استخدام خاص للقارب طوال الساعة كاملة",
          "ربان محترف (لوريس أو كلاوديو) — كلاهما يتحدثان الإنجليزية والإيطالية بطلاقة",
          "مياه فوارة وعادية وثلج على متن القارب",
          "مناشف في حال أردتم السباحة",
          "الوقود ورسوم البحيرة مشمولة بالكامل",
        ],
        notIncluded: [
          "النقل من الفندق إلى الرصيف (5 دقائق سيراً من وسط كومو)",
          "رسوم دخول الفيلات والمطاعم",
          "خدمة التصوير الاحترافية (يسعد الربان بالتقاط الصور بهاتفكم)",
        ],
        itinerary: [
          { time: "+0 د", place: "كومو — رصيف لونغولاغو فيالي جينو", note: "الصعود إلى القارب" },
          { time: "+5 د", place: "منارة فارو فولتيانو", note: "نتجاوز منارة كومو ونلف شمالاً" },
          { time: "+15 د", place: "تشيرنوبيو · فيلا ديستي", note: "زاوية لا تُرى الواجهة الكاملة منها إلا من الماء" },
          { time: "+30 د", place: "لاليو · فيلا أوليندرا", note: "فيلا النجم جورج كلوني منذ 2002" },
          { time: "+45 د", place: "العودة جنوباً", note: "نفس الضفة بضوء مختلف" },
          { time: "+60 د", place: "كومو — العودة إلى الرصيف", note: "النزول" },
        ],
        faqs: [
          { question: "هل أجرة الربان مشمولة في سعر تأجير القارب؟", answer: "نعم. مبلغ €220 يغطي القارب والوقود ورسوم البحيرة وأجرة الربان (لوريس أو كلاوديو) للساعة كاملة. لا توجد رسوم إضافية لكل ضيف حتى السعة القصوى وهي 10 أشخاص." },
          { question: "هل يمكن السباحة خلال جولة الساعة الواحدة؟", answer: "نعم، إذا سمح الطقس بذلك. على متن القارب مناشف، وسيختار الربان مكاناً مناسباً للسباحة في الحوض الأول لبحيرة كومو إن رغبتم. معظم الضيوف يفضلون قضاء الساعة كاملة في الإبحار، لكن القرار لكم." },
          { question: "ماذا يحدث إذا كان الطقس سيئاً؟", answer: "إذا اعتبر الربان أن بحيرة كومو غير آمنة (رياح قوية أو عواصف رعدية)، نعيد جدولة الجولة دون أي رسوم. المطر الخفيف وحده لا يلغي الجولة — قواربنا مزودة بسقف منزلق." },
          { question: "هل من الضروري الحجز المسبق؟", answer: "في الصيف (من يونيو إلى أغسطس) نعم، يُنصح بالحجز قبل أسبوعين إلى ثلاثة. أبريل ومايو وسبتمبر وأكتوبر عادةً ما تتوفر فيها مواعيد في نفس الأسبوع. تواصلوا معنا عبر واتساب للحصول على إجابة سريعة." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 02 — Balbianello & Nesso, 2.5h
  // ─────────────────────────────────────────────────────────────
  {
    slug: "balbianello-nesso",
    baseIndex: 2, // 3-hour slot in the menu (positions sunset at 7, 8-hour at 6)
    hero: "/images/balbianello.jpg",
    durationMinutes: 150,
    priceEUR: 480,
    pins: ["como", "nesso", "argegno", "balbianello"],
    copy: {
      en: {
        metaTitle: "Villa Balbianello & Orrido di Nesso · 2.5h Boat Tour from Como",
        metaDesc:
          "Casino Royale's Villa del Balbianello and the hidden Orrido di Nesso waterfall, on a 2.5-hour private boat tour from Como aboard a hand-built mahogany boat.",
        headline: "Balbianello & Nesso. <em>The two views the lake is best known for.</em>",
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
        metaTitle: "Вилла Бальбьянелло на Лодке · Casino Royale · 2.5 Часа из Комо",
        metaDesc:
          "Частная 2.5-часовая прогулка на лодке по озеру Комо: Вилла Бальбьянелло (место съёмок Casino Royale и Star Wars) и скрытый водопад Орридо ди Нессо. Из Комо, на лодке из красного дерева, со шкипером. От €480 на лодку.",
        headline: "Бальбьянелло и Нессо. <em>Два символа озера Комо.</em>",
        kicker: "2.5 часа · от €480 на лодку · до 10 гостей · отправление из Комо",
        body: [
          { type: "p", text: "Два с половиной часа, две знаковые достопримечательности озера Комо, без лишних отклонений. Мы выходим из Комо на север, держимся восточного берега до Орридо ди Нессо — узкого ущелья, где два горных потока обрушиваются в озеро у каменного моста, — а затем пересекаем озеро к Вилле дель Бальбьянелло, полуострову у Ленно на западном берегу." },
          { type: "h", text: "Орридо ди Нессо" },
          { type: "p", text: "Водопад скрыт самой природой. С дороги, идущей по восточному берегу, его не видно — он спрятан между домами деревни. С озера же ущелье открывается между постройками, и виден весь перепад. Большинство операторов не включают его в маршрут, потому что это требует крюка к восточному берегу. Мы включаем — это самый фотографируемый водопад озера Комо, а сама деревня вокруг — красивейшая остановка на этой стороне." },
          { type: "h", text: "Вилла дель Бальбьянелло" },
          { type: "p", text: "Вилла, где снимались культовые сцены «выздоровления Бонда» в Casino Royale и свадьба Энакина и Падме в Star Wars Episode II. С воды видна вся фасадная сторона XVIII века с лоджией, аллея кипарисов, поднимающаяся к садам, и небольшой причал, у которого Дэниел Крейг сходит на берег в фильме. Шкипер удерживает лодку именно в той точке, которую выбрали кинокамеры." },
          { type: "h", text: "Что включает маршрут" },
          { type: "p", text: "По желанию мы можем высадить вас на причале FAI у Виллы Бальбьянелло (билет €20 на взрослого, сады открыты с середины марта до середины ноября, кроме понедельников и сред). Прогулка тогда продлевается на 60–90 минут — за дополнительную плату по часам." },
        ],
        included: [
          "Частное использование лодки на 2.5 часа",
          "Профессиональный шкипер (Лорис или Клаудио)",
          "Газированная вода, бокал просекко на обратном пути",
          "Полотенца для купания",
          "Топливо и сборы озера",
        ],
        notIncluded: [
          "Билет в Виллу Бальбьянелло (€20 за взрослого, бесплатно для членов FAI)",
          "Трансфер из отеля",
          "Бронь ресторанов",
        ],
        itinerary: [
          { time: "+0 мин", place: "Комо — пристань Лунголаго Виале Джено", note: "Посадка" },
          { time: "+25 мин", place: "Торно", note: "Пауза с видом на первый бассейн" },
          { time: "+45 мин", place: "Орридо ди Нессо", note: "Скрытый водопад — приготовьте камеру" },
          { time: "+75 мин", place: "Арденьо", note: "Деревня в центре озера, опциональная остановка для купания" },
          { time: "+100 мин", place: "Вилла дель Бальбьянелло", note: "Кинематографический полуостров, главное место маршрута" },
          { time: "+125 мин", place: "Возврат на юг", note: "По западному берегу" },
          { time: "+150 мин", place: "Комо", note: "Высадка" },
        ],
        faqs: [
          { question: "Можно ли зайти внутрь Виллы дель Бальбьянелло?", answer: "Да. FAI (Итальянский национальный фонд) открывает сады ежедневно с 10:00 до 18:00 с середины марта до середины ноября (кроме понедельников и сред). Билет €20 за взрослого. Мы высадим вас на причале и заберём через 60–90 минут, продлив тур пропорционально." },
          { question: "Насколько близко мы подходим к Орридо ди Нессо?", answer: "Останавливаем лодку примерно в тридцати метрах от ущелья — достаточно близко, чтобы почувствовать брызги в жаркий день, и достаточно далеко, чтобы в кадр попал каменный мост и деревня, обрамляющие водопад." },
          { question: "Достаточно ли 2.5 часов на оба места?", answer: "Да — именно для этого и составлен маршрут. Если хотите более длинную остановку у одного из мест, четырёхчасовой тур «Половина дня — лучшие виллы» даёт целый час у Бальбьянелло и дополнительную остановку у Виллы Карлотта." },
          { question: "Подходит ли тур для предложения руки и сердца?", answer: "Да, очень. Мы координируем флористов, фотографа, шампанское — скажите ваш отель и желаемое время, остальное организуем мы. Без дополнительной платы за координацию." },
        ],
      },
      ar: {
        metaTitle: "جولة بحرية فيلا بالبيانيلو وشلال نيسو · 2.5 ساعة · بحيرة كومو",
        metaDesc:
          "جولة بحرية خاصة لمدة ساعتين ونصف على بحيرة كومو: فيلا بالبيانيلو (موقع تصوير كازينو رويال وحرب النجوم) وشلال أوريدو دي نيسو المخفي. انطلاق من كومو على متن قارب فاخر من خشب الماهوغني مع ربان محترف. من €480 للقارب.",
        headline: "بالبيانيلو ونيسو. <em>أيقونتا بحيرة كومو.</em>",
        kicker: "ساعتان ونصف · من €480 للقارب · حتى 10 ضيوف · انطلاق من كومو",
        body: [
          { type: "p", text: "ساعتان ونصف، معلمان رمزيان لبحيرة كومو، دون أي انحراف عن المسار. ننطلق من كومو شمالاً ونلتزم بالضفة الشرقية حتى أوريدو دي نيسو، الفجوة الضيقة التي يتساقط فيها مجريان جبليان في البحيرة عند قدم جسر حجري، ثم نعبر البحيرة إلى فيلا دل بالبيانيلو، شبه الجزيرة الواقعة قرب لينو على الضفة الغربية." },
          { type: "h", text: "أوريدو دي نيسو" },
          { type: "p", text: "الشلال مخفي بطبيعته. من الطريق التي تسير على الضفة الشرقية لا يمكن رؤيته — فهو متوارٍ بين بيوت القرية. أما من البحيرة فتنفتح الفجوة بين المباني ويظهر السقوط بأكمله. معظم متعهدي الجولات البحرية لا يضمّون هذه المحطة لأنها تعني انعطافاً نحو الضفة الشرقية في مسار يتمحور عادةً حول الضفة الغربية. نحن نضمّها لأنها أكثر شلال تم تصويره على بحيرة كومو، والقرية المحيطة بها هي أجمل توقف على هذه الضفة." },
          { type: "h", text: "فيلا دل بالبيانيلو" },
          { type: "p", text: "الفيلا التي صوّر فيها فيلم كازينو رويال مشهد تعافي جيمس بوند، وفيلم حرب النجوم: الجزء الثاني زفاف أناكين وبادمي. من على متن القارب تشاهدون الواجهة الكاملة من القرن الثامن عشر مع اللوجيا، وممر السرو الذي يصعد إلى الحدائق، والرصيف الصغير حيث ينزل دانيال كريغ في الفيلم. الربّان يثبّت القارب في الزاوية ذاتها التي اختارتها كاميرات السينما." },
          { type: "h", text: "ما يشمله المسار" },
          { type: "p", text: "بإمكاننا إنزالكم عند رصيف FAI في فيلا بالبيانيلو إذا رغبتم في زيارة الحدائق (التذكرة €20 للبالغ، الحدائق مفتوحة من منتصف مارس إلى منتصف نوفمبر، ما عدا الإثنين والأربعاء). تمتد الجولة عندئذ 60 إلى 90 دقيقة إضافية مقابل تكلفة إضافية بالساعة." },
        ],
        included: [
          "استخدام خاص للقارب لمدة ساعتين ونصف",
          "ربان محترف (لوريس أو كلاوديو)",
          "مياه فوارة وكأس بروسيكو في طريق العودة",
          "مناشف للسباحة",
          "الوقود ورسوم البحيرة",
        ],
        notIncluded: [
          "تذكرة دخول فيلا بالبيانيلو (€20 للبالغ، مجاني لأعضاء FAI)",
          "النقل من الفندق",
          "حجوزات المطاعم",
        ],
        itinerary: [
          { time: "+0 د", place: "كومو — رصيف لونغولاغو فيالي جينو", note: "الصعود" },
          { time: "+25 د", place: "تورنو", note: "وقفة لمشاهدة الحوض الأول" },
          { time: "+45 د", place: "أوريدو دي نيسو", note: "الشلال المخفي — جهّزوا الكاميرا" },
          { time: "+75 د", place: "أردنيو", note: "قرية وسط البحيرة، توقف اختياري للسباحة" },
          { time: "+100 د", place: "فيلا دل بالبيانيلو", note: "شبه الجزيرة السينمائية، المحطة الرئيسية" },
          { time: "+125 د", place: "العودة جنوباً", note: "عبر الضفة الغربية" },
          { time: "+150 د", place: "كومو", note: "النزول" },
        ],
        faqs: [
          { question: "هل يمكن دخول فيلا دل بالبيانيلو؟", answer: "نعم. مؤسسة FAI الإيطالية تفتح الحدائق يومياً من الساعة 10:00 حتى 18:00 من منتصف مارس إلى منتصف نوفمبر (ما عدا الإثنين والأربعاء). التذكرة €20 للبالغ. ننزلكم عند الرصيف ونعود لاصطحابكم بعد 60–90 دقيقة مع تمديد الجولة بشكل متناسب." },
          { question: "إلى أي مدى يقترب القارب من شلال أوريدو دي نيسو؟", answer: "نوقف القارب على بعد ثلاثين متراً تقريباً من الفجوة — قريب بما يكفي للشعور برذاذ الماء في الأيام الحارة، وبعيد بما يكفي ليظهر الجسر والقرية وهما يحيطان بالشلال في الصورة." },
          { question: "هل ساعتان ونصف كافيتان للموقعين معاً؟", answer: "نعم — هذا بالضبط هدف هذا المسار. إذا فضّلتم وقتاً أطول في إحدى المحطتين، فجولة 'نصف يوم — أفخم الفيلات' لمدة 4 ساعات تمنحكم ساعة كاملة في بالبيانيلو إضافة إلى وقفة في فيلا كارلوتا." },
          { question: "هل الجولة مناسبة لطلب الزواج؟", answer: "نعم، هذه إحدى أكثر المناسبات التي ننظمها. ننسق التوقيت والزهور والمصور والشمبانيا — أخبرونا بالفندق والوقت الذي تريدونه ونتولى البقية. دون أي رسوم تنسيق إضافية." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 03 — Half-Day Top Villas, 4h
  // ─────────────────────────────────────────────────────────────
  {
    slug: "top-villas-half-day",
    baseIndex: 3,
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
        metaTitle: "Полдня на Лодке по Озеру Комо · Бальбьянелло, Карлотта, Беладжо",
        metaDesc:
          "Четырёхчасовой частный тур на лодке по озеру Комо: Вилла дель Бальбьянелло (Casino Royale), Вилла Карлотта, Вилла Бальбьяно (House of Gucci) с часовой остановкой на обед в Беладжо или Варенне. Из Комо, на лодке из красного дерева. От €780.",
        headline: "Три виллы и Беладжо. <em>Полдня, которые озеро Комо заслуживает.</em>",
        kicker: "4 часа · от €780 на лодку · до 10 гостей · отправление из Комо",
        body: [
          { type: "p", text: "Четыре часа — естественная продолжительность тура по озеру Комо на лодке. Достаточно, чтобы добраться до верхнего бассейна и вернуться, и при этом достаточно коротко, чтобы день оставался гибким. Маршрут охватывает три знаменитейшие виллы озера — Бальбьянелло, Карлотта, Бальбьяно — и даёт вам часовую остановку в Беладжо или Варенне для обеда." },
          { type: "h", text: "Вилла дель Бальбьянелло" },
          { type: "p", text: "Casino Royale, Star Wars Episode II. С воды видна лоджия XVIII века и аллея кипарисов. Десятиминутная пауза в кинематографической точке." },
          { type: "h", text: "Вилла Карлотта" },
          { type: "p", text: "Тремеццо. Дворец 1690 года с садами азалий и рододендронов, спускающимися к воде, — самая красочная вилла озера Комо с апреля по июнь. По желанию возможна высадка с билетом FAI." },
          { type: "h", text: "Вилла Бальбьяно — Дом Gucci" },
          { type: "p", text: "Оссуччо. Здесь Ридли Скотт в 2021 году снимал сцены на озере для фильма House of Gucci. Менее известна, чем Бальбьянелло, но столь же впечатляюща — её сдают в частный наём через Aman, и шкипер часто видит свадебные приготовления, когда мы проходим рядом." },
          { type: "h", text: "Беладжо или Варенна — на ваш выбор" },
          { type: "p", text: "После вилл мы высаживаем вас в Беладжо (западный берег, «жемчужина» озера) или в Варенне (восточный берег, тише и меньше). Час на берегу для обеда. Мы держим столик в одном из трёх проверенных ресторанов — Bilacus или Salice Blu в Беладжо, La Vista в Варенне. Сообщите за день, и вас будут ждать." },
        ],
        included: [
          "Частное использование лодки на 4 часа",
          "Профессиональный шкипер",
          "Газированная вода, аперитив с просекко на обратном пути",
          "Полотенца для купания",
          "Топливо и сборы озера",
          "Бронь ресторана в Беладжо или Варенне",
        ],
        notIncluded: [
          "Обед (обычно €60–120 на гостя)",
          "Входные билеты на виллы (Бальбьянелло €20, Карлотта €12)",
          "Трансфер из отеля",
        ],
        itinerary: [
          { time: "+0 мин", place: "Комо — пристань Лунголаго Виале Джено", note: "Посадка" },
          { time: "+45 мин", place: "Вилла дель Бальбьянелло", note: "Кинематографический ракурс, фотопауза" },
          { time: "+75 мин", place: "Вилла Карлотта", note: "Фасад с садами" },
          { time: "+90 мин", place: "Вилла Бальбьяно · Оссуччо", note: "Место съёмок House of Gucci" },
          { time: "+105 мин", place: "Беладжо (или Варенна)", note: "Высадка, час на берегу" },
          { time: "+165 мин", place: "Возврат на борт", note: "Аперитив на обратном пути" },
          { time: "+240 мин", place: "Комо", note: "Высадка" },
        ],
        faqs: [
          { question: "Беладжо или Варенна — что выбрать?", answer: "На выбор при бронировании или утром в день тура. Беладжо больше, с более широким выбором ресторанов; Варенна меньше и тише, с лучше сохранившимся старым центром." },
          { question: "Обед включён в стоимость?", answer: "Нет. Мы делаем бронь, но вы рассчитываетесь напрямую в ресторане — полноценный обед с вином стоит €60–120 на гостя в наших проверенных местах (Bilacus или Salice Blu в Беладжо, La Vista в Варенне)." },
          { question: "Можно добавить час на купание?", answer: "Да. Сообщите при бронировании, добавим час за €120 и сделаем остановку для купания в одной из тихих бухт между виллами." },
          { question: "Подходит ли тур для свадебной группы?", answer: "Да, для групп до 10 человек. Для более крупных свадебных групп зафрахтуем вторую лодку — напишите нам количество гостей." },
        ],
      },
      ar: {
        metaTitle: "جولة نصف يوم بالقارب على بحيرة كومو · بالبيانيلو، كارلوتا، بيلاجيو",
        metaDesc:
          "جولة خاصة بالقارب لمدة 4 ساعات على بحيرة كومو: فيلا دل بالبيانيلو (كازينو رويال)، فيلا كارلوتا، فيلا بالبيانو (موقع تصوير House of Gucci) مع توقف ساعة في بيلاجيو أو فارينا للغداء. انطلاق من كومو على متن قارب فاخر من خشب الماهوغني. من €780.",
        headline: "ثلاث فيلات وتوقف في بيلاجيو. <em>نصف يوم تستحقه بحيرة كومو.</em>",
        kicker: "4 ساعات · من €780 للقارب · حتى 10 ضيوف · انطلاق من كومو",
        body: [
          { type: "p", text: "أربع ساعات هي المدة الطبيعية لجولة بحيرة كومو بالقارب. كافية للوصول إلى الحوض العلوي والعودة، وقصيرة بما يكفي ليبقى اليوم مرناً. المسار يغطي الفيلات الرمزية الثلاث للبحيرة — بالبيانيلو وكارلوتا وبالبيانو — ويمنحكم ساعة كاملة في بيلاجيو أو فارينا للغداء." },
          { type: "h", text: "فيلا دل بالبيانيلو" },
          { type: "p", text: "كازينو رويال وحرب النجوم: الجزء الثاني. من على متن القارب تشاهدون اللوجيا وممر السرو. توقف عشر دقائق في الزاوية السينمائية." },
          { type: "h", text: "فيلا كارلوتا" },
          { type: "p", text: "تريميتسو. قصر بُني عام 1690 مع حدائق الأزاليا والرودودندرون التي تنحدر إلى الماء — أكثر فيلات بحيرة كومو لوناً من أبريل إلى يونيو. النزول ممكن إذا كانت لديكم تذكرة FAI." },
          { type: "h", text: "فيلا بالبيانو · موقع تصوير House of Gucci" },
          { type: "p", text: "أوسوكيو. حيث صور ريدلي سكوت في عام 2021 مشاهد البحيرة في فيلم House of Gucci. أقل تصويراً من بالبيانيلو لكن لا تقل روعة — تُؤجّر بشكل خاص عبر Aman، وكثيراً ما يرى الربان تحضيرات حفلات الزفاف عند المرور بها." },
          { type: "h", text: "بيلاجيو أو فارينا — حسب اختياركم" },
          { type: "p", text: "بعد الفيلات، ننزلكم في بيلاجيو (الضفة الغربية، 'لؤلؤة' بحيرة كومو) أو في فارينا (الضفة الشرقية، أصغر وأهدأ). ساعة على الأرض للغداء. نحجز لكم طاولة في أحد ثلاثة مطاعم موثوقة — Bilacus أو Salice Blu في بيلاجيو، أو La Vista في فارينا. أخبرونا قبل يوم بالاختيار وستجدون استقبالكم." },
        ],
        included: [
          "استخدام خاص للقارب لمدة 4 ساعات",
          "ربان محترف",
          "مياه فوارة، أبريتيف بروسيكو في طريق العودة",
          "مناشف للسباحة",
          "الوقود ورسوم البحيرة",
          "حجز المطعم في بيلاجيو أو فارينا",
        ],
        notIncluded: [
          "الغداء (عادةً €60–120 للضيف)",
          "تذاكر دخول الفيلات (بالبيانيلو €20، كارلوتا €12)",
          "النقل من الفندق",
        ],
        itinerary: [
          { time: "+0 د", place: "كومو — رصيف لونغولاغو فيالي جينو", note: "الصعود" },
          { time: "+45 د", place: "فيلا دل بالبيانيلو", note: "زاوية سينمائية، توقف للتصوير" },
          { time: "+75 د", place: "فيلا كارلوتا", note: "الواجهة المُطلّة على الحدائق" },
          { time: "+90 د", place: "فيلا بالبيانو · أوسوكيو", note: "موقع تصوير House of Gucci" },
          { time: "+105 د", place: "بيلاجيو (أو فارينا)", note: "النزول، ساعة على الأرض" },
          { time: "+165 د", place: "إعادة الصعود", note: "أبريتيف في طريق العودة" },
          { time: "+240 د", place: "كومو", note: "النزول" },
        ],
        faqs: [
          { question: "بيلاجيو أم فارينا — أيهما أختار؟", answer: "الاختيار لكم عند الحجز أو في صباح اليوم. بيلاجيو قرية أكبر بمزيد من خيارات الغداء؛ فارينا أصغر وأهدأ ومركزها التاريخي محفوظ بشكل أفضل." },
          { question: "هل الغداء مشمول في السعر؟", answer: "لا. نقوم بالحجز لكنكم تدفعون مباشرة في المطعم — الغداء الكامل مع النبيذ يكلف عادةً €60–120 للضيف في مطاعمنا الموثوقة (Bilacus أو Salice Blu في بيلاجيو، La Vista في فارينا)." },
          { question: "هل يمكن إضافة ساعة للسباحة؟", answer: "نعم. أخبرونا عند الحجز ونضيف ساعة بمبلغ €120 مع توقف للسباحة في إحدى الخلجان الهادئة بين الفيلات." },
          { question: "هل الجولة مناسبة لمجموعة زفاف؟", answer: "نعم، للمجموعات حتى 10 أشخاص. للمجموعات الأكبر نستأجر قارباً ثانياً — راسلونا بعدد الضيوف." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 05 — Cernobbio & Villa d'Este, 2 hours
  // ─────────────────────────────────────────────────────────────
  {
    slug: "cernobbio-2h",
    baseIndex: 1,
    hero: "/images/attractions/cernobbio.jpg",
    durationMinutes: 120,
    priceEUR: 400,
    pins: ["como", "cernobbio", "oleandra", "blevio_torno"],
    copy: {
      en: {
        metaTitle: "Lake Como 2-hour private boat tour · Cernobbio & Villa d'Este",
        metaDesc: "2-hour private boat tour from Como — Cernobbio, Villa d'Este, Villa Olmo and Moltrasio's celebrity coastline, with a local captain. From €400.",
        headline: "Cernobbio & <em>Villa d'Este,</em> 2 hours.",
        kicker: "From Como · 2-hour private cruise",
        body: [
          { type: "p", text: "Two hours is the sweet spot for guests who want more than a teaser without committing to a half-day. From the Como pontoon we head along the celebrity coastline — Villa Olmo, Cernobbio with Villa d'Este's century-old plane trees on the water, then up to Villa Oleandra (George Clooney's place in Laglio) and Villa Passalacqua (Moltrasio)." },
          { type: "p", text: "We slow down for photos and answer questions about who lives where, what was filmed where, and why this stretch of shoreline has been the Italian aristocracy's holiday escape for 500 years. Free time to swim or just sit with a glass of prosecco." },
          { type: "p", text: "The classic 2-hour route, with optional extension by 30 minutes if everyone's having fun and we have the slot." },
        ],
        included: ["Private boat with skipper", "Fuel and harbour fees", "Bottled water, ice, towels", "Prosecco on board (1 bottle / 4 guests)", "Discreet narration in IT/EN"],
        notIncluded: ["Stops onshore at villas (entry fees, dock fees)", "Sit-down lunch ashore", "Pick-up from villas outside the first basin"],
        itinerary: [
          { time: "0:00", place: "Como · Lungolago Viale Geno", note: "Boarding, safety briefing, prosecco poured." },
          { time: "0:20", place: "Cernobbio · Villa d'Este", note: "We pass close — the century-old plane trees and the 1568 hotel facade from the water." },
          { time: "0:45", place: "Villa Oleandra · Laglio", note: "Clooney's house, the swim platform, the boathouse." },
          { time: "1:10", place: "Moltrasio · Villa Passalacqua", note: "The yellow Belle Époque hotel and the smaller villas of the Como Riviera." },
          { time: "1:40", place: "Return to Como", note: "A loop past Villa Olmo and back to the pontoon." },
        ],
        faqs: [
          { question: "Can we swim during a 2-hour tour?", answer: "Yes — we pause at a quiet cove between Cernobbio and Moltrasio. 15 minutes in the water doesn't slow us down." },
          { question: "What if the weather turns?", answer: "We decide morning-of based on the actual lake. If we cancel, full refund. If we shorten, pro-rata refund." },
          { question: "Is this enough to see Villa del Balbianello?", answer: "No — Balbianello is 60 minutes one-way from Como. You need the 3-hour or 4-hour tour for that. This one stays in the first basin." },
        ],
      },
      it: {
        metaTitle: "Tour barca 2 ore Lago di Como · Cernobbio e Villa d'Este",
        metaDesc: "Tour privato in barca 2 ore da Como — Cernobbio, Villa d'Este, Villa Olmo e la costa delle celebrità di Moltrasio. Skipper locale. Da €400.",
        headline: "Cernobbio e <em>Villa d'Este,</em> 2 ore.",
        kicker: "Da Como · Crociera privata di 2 ore",
        body: [
          { type: "p", text: "Due ore è il giusto compromesso per chi vuole più di un assaggio senza impegnare mezza giornata. Dal pontile di Como costeggiamo la riviera delle ville — Villa Olmo, Cernobbio con i platani secolari di Villa d'Este sull'acqua, poi su fino a Villa Oleandra (la casa di George Clooney a Laglio) e Villa Passalacqua (Moltrasio)." },
          { type: "p", text: "Rallentiamo per le foto e raccontiamo chi vive dove, cosa è stato girato dove e perché questo tratto di costa è il rifugio dell'aristocrazia italiana da 500 anni. Tempo libero per fare il bagno o stare con un calice di prosecco." },
          { type: "p", text: "Il percorso classico di 2 ore, estendibile di 30 minuti se tutto fila e abbiamo lo slot disponibile." },
        ],
        included: ["Barca privata con skipper", "Carburante e ormeggi", "Acqua, ghiaccio, asciugamani", "Prosecco a bordo (1 bottiglia / 4 ospiti)", "Racconto discreto in IT/EN"],
        notIncluded: ["Soste a terra alle ville (ingressi, ormeggio)", "Pranzo a terra", "Pick-up da ville fuori dal primo bacino"],
        itinerary: [
          { time: "0:00", place: "Como · Lungolago Viale Geno", note: "Imbarco, briefing di sicurezza, prosecco versato." },
          { time: "0:20", place: "Cernobbio · Villa d'Este", note: "Passiamo accanto — platani secolari e facciata del 1568 visti dall'acqua." },
          { time: "0:45", place: "Villa Oleandra · Laglio", note: "La casa di Clooney, la piattaforma, il bottesino." },
          { time: "1:10", place: "Moltrasio · Villa Passalacqua", note: "L'hotel giallo Belle Époque e le ville minori della riviera di Como." },
          { time: "1:40", place: "Rientro a Como", note: "Anello davanti a Villa Olmo e ritorno al pontile." },
        ],
        faqs: [
          { question: "Si può fare il bagno in 2 ore?", answer: "Sì — fermata in una caletta tranquilla tra Cernobbio e Moltrasio. 15 minuti in acqua non rallentano il giro." },
          { question: "Cosa succede se il tempo cambia?", answer: "Decidiamo la mattina stessa in base al lago reale. Se annulliamo, rimborso completo. Se accorciamo, rimborso pro-rata." },
          { question: "Basta per vedere Villa del Balbianello?", answer: "No — Balbianello è a 60 minuti di sola andata da Como. Serve il tour di 3 o 4 ore. Questo resta nel primo bacino." },
        ],
      },
      ru: {
        metaTitle: "Тур на лодке 2 часа · Озеро Комо · Cernobbio и Villa d'Este",
        metaDesc: "Частный тур на лодке 2 часа из Комо — Cernobbio, Villa d'Este, Villa Olmo и побережье знаменитостей Moltrasio. Местный капитан. От €400.",
        headline: "Cernobbio и <em>Villa d'Este,</em> 2 часа.",
        kicker: "Из Комо · Частная прогулка 2 часа",
        body: [
          { type: "p", text: "Два часа — оптимально для тех, кто хочет больше, чем тизер, без обязательств полудня. От пристани Комо мы идём вдоль побережья знаменитостей — Villa Olmo, Cernobbio с вековыми платанами Villa d'Este, далее Villa Oleandra (дом Клуни в Laglio) и Villa Passalacqua (Moltrasio)." },
          { type: "p", text: "Замедляемся для фото и рассказываем, кто где живёт и что где снимали. Свободное время для купания или просто бокала просекко." },
        ],
        included: ["Частная лодка с капитаном", "Топливо и стоянка", "Вода, лёд, полотенца", "Просекко на борту", "Рассказ на IT/EN"],
        notIncluded: ["Высадки на берегу", "Обед на берегу", "Подача с вилл вне первого бассейна"],
        itinerary: [
          { time: "0:00", place: "Como · Lungolago Viale Geno", note: "Посадка, инструктаж, просекко." },
          { time: "0:20", place: "Cernobbio · Villa d'Este", note: "Проходим рядом — платаны и фасад 1568 года с воды." },
          { time: "0:45", place: "Villa Oleandra · Laglio", note: "Дом Клуни." },
          { time: "1:10", place: "Moltrasio · Villa Passalacqua", note: "Жёлтый отель Belle Époque." },
          { time: "1:40", place: "Возвращение в Комо", note: "Петля у Villa Olmo и обратно." },
        ],
        faqs: [
          { question: "Можно купаться?", answer: "Да — остановка в спокойной бухте, 15 минут." },
          { question: "А если погода?", answer: "Решаем утром. Отмена — возврат, сокращение — пропорционально." },
          { question: "Хватает на Villa del Balbianello?", answer: "Нет — туда нужен 3-4-часовой тур." },
        ],
      },
      ar: {
        metaTitle: "جولة قارب ساعتان · بحيرة كومو · تشيرنوبيو وفيلا ديستي",
        metaDesc: "جولة قارب خاصة ساعتان من كومو — تشيرنوبيو، فيلا ديستي، فيلا أولمو وساحل مشاهير مولتراسيو. قبطان محلي. من €400.",
        headline: "تشيرنوبيو و<em>فيلا ديستي،</em> ساعتان.",
        kicker: "من كومو · جولة ساعتان خاصة",
        body: [
          { type: "p", text: "ساعتان هو الخيار الأمثل لمن يريد أكثر من تذوّق دون الالتزام بنصف يوم. من رصيف كومو نصعد بمحاذاة ساحل المشاهير — فيلا أولمو، تشيرنوبيو مع أشجار فيلا ديستي على الماء، ثم فيلا أوليندرا (منزل كلوني في لاليو) وفيلا باسالاكوا (مولتراسيو)." },
          { type: "p", text: "نُبطئ للصور ونحكي من يسكن أين. وقت حر للسباحة أو الجلوس مع كأس بروسيكو." },
        ],
        included: ["قارب خاص مع قبطان", "وقود ورسوم رصيف", "مياه وثلج ومناشف", "بروسيكو على المتن", "سرد بالإيطالية/الإنجليزية"],
        notIncluded: ["نزولات على الشاطئ عند الفلل", "غداء على البر", "الإقلال من فلل خارج الحوض الأول"],
        itinerary: [
          { time: "0:00", place: "كومو · Lungolago Viale Geno", note: "الصعود، إيضاح السلامة، بروسيكو." },
          { time: "0:20", place: "تشيرنوبيو · فيلا ديستي", note: "نمرّ قريباً — الأشجار والواجهة من الماء." },
          { time: "0:45", place: "فيلا أوليندرا · لاليو", note: "منزل كلوني." },
          { time: "1:10", place: "مولتراسيو · فيلا باسالاكوا", note: "الفندق الأصفر." },
          { time: "1:40", place: "العودة إلى كومو", note: "دورة عند فيلا أولمو والعودة." },
        ],
        faqs: [
          { question: "هل يمكن السباحة؟", answer: "نعم — توقف 15 دقيقة في خليج هادئ." },
          { question: "والطقس؟", answer: "نقرّر صباحاً. إلغاء = استرداد كامل، تقصير = جزئي." },
          { question: "هل تكفي لفيلا بالبيانيلو؟", answer: "لا — تحتاج جولة 3 أو 4 ساعات." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 07 — First Basin & Balbianello, 5 hours
  // ─────────────────────────────────────────────────────────────
  {
    slug: "first-basin-5h",
    baseIndex: 4,
    hero: "/images/balbianello.jpg",
    durationMinutes: 300,
    priceEUR: 820,
    pins: ["como", "cernobbio", "nesso", "argegno", "isola_comacina", "balbianello"],
    copy: {
      en: {
        metaTitle: "Lake Como 5-hour private boat tour · First basin + Balbianello",
        metaDesc: "Five hours on Lake Como — Como, Cernobbio, Moltrasio, Nesso, Villa del Balbianello and Isola Comacina with swim stop and lakeside lunch. From €820.",
        headline: "First basin & <em>Balbianello,</em> 5 hours.",
        kicker: "From Como · 5-hour private cruise with lunch slot",
        body: [
          { type: "p", text: "Five hours is the route we recommend most often — long enough to cross out of the first basin and reach Villa del Balbianello, short enough that you're back in Como with time to dress for dinner. The classic Lake Como day on the water." },
          { type: "p", text: "We leave Como mid-morning, hug the western shore past Cernobbio, Moltrasio and Laglio, then cut across to the Orrido di Nesso waterfall (visible only from the lake), continue up past Argegno to Isola Comacina for a swim, and finish at Villa del Balbianello — photos from the water at the most cinematic stretch of shoreline on the lake." },
          { type: "p", text: "Lunch is at one of our preferred lake-side restaurants — Crotto dei Platani in Brienno, La Cucina della Marianna in Cadenabbia, or onboard if you prefer a picnic with prosecco. We handle the dock booking." },
        ],
        included: ["Private boat with skipper for 5 hours", "Fuel, harbour fees, parking", "Bottled water, prosecco, towels", "Lake-side restaurant docking + reservation", "Multilingual discreet narration"],
        notIncluded: ["Lunch (typically €40-70/guest at our preferred restaurants)", "Villa entry tickets if you want to step inside (€10-20 per villa)", "Pick-up from villas outside the first basin (add €100)"],
        itinerary: [
          { time: "0:00", place: "Como · Lungolago Viale Geno", note: "Boarding, briefing, prosecco." },
          { time: "0:45", place: "Cernobbio + Villa d'Este", note: "Slow pass for photos." },
          { time: "1:15", place: "Orrido di Nesso", note: "The waterfall under the bridge — only visible from a boat." },
          { time: "2:00", place: "Lunch · Crotto dei Platani or onboard", note: "Lake-side, ~75 minutes." },
          { time: "3:30", place: "Isola Comacina · swim", note: "30-minute swim stop in the cove." },
          { time: "4:00", place: "Villa del Balbianello", note: "Slow pass from the water, the iconic angle." },
          { time: "5:00", place: "Return to Como", note: "" },
        ],
        faqs: [
          { question: "Can we step inside Villa del Balbianello?", answer: "The dock is FAI-managed and the slot must be booked separately — if you want to step inside, book our Boat & Villa Tour (4 hours, with a guided villa visit included)." },
          { question: "Is lunch flexible?", answer: "Yes — we can book Crotto dei Platani (Brienno), Il Gatto Nero (Cernobbio), La Punta (Bellagio) or arrange an onboard picnic. Tell us at booking." },
          { question: "What's the difference vs the 6-hour tour?", answer: "The 6-hour adds Bellagio + Varenna (centre lake). The 5-hour stays in the first basin + Balbianello and is the better-value pick for first-time visitors." },
        ],
      },
      it: {
        metaTitle: "Tour barca 5 ore · Lago di Como · Primo bacino + Balbianello",
        metaDesc: "Cinque ore sul Lago di Como — Como, Cernobbio, Moltrasio, Nesso, Villa del Balbianello e Isola Comacina con sosta bagno e pranzo. Da €820.",
        headline: "Primo bacino e <em>Balbianello,</em> 5 ore.",
        kicker: "Da Como · Crociera privata 5 ore con pranzo",
        body: [
          { type: "p", text: "Cinque ore è il percorso che consigliamo più spesso — abbastanza lungo per uscire dal primo bacino e raggiungere Villa del Balbianello, abbastanza breve per essere di nuovo a Como in tempo per cambiarsi per cena. La giornata classica sul lago." },
          { type: "p", text: "Partiamo a metà mattina, costeggiamo la riva ovest oltre Cernobbio, Moltrasio e Laglio, poi tagliamo verso l'Orrido di Nesso (visibile solo dal lago), continuiamo oltre Argegno fino all'Isola Comacina per il bagno, e finiamo a Villa del Balbianello — foto dall'acqua nel tratto più cinematografico del lago." },
          { type: "p", text: "Pranzo in uno dei nostri ristoranti preferiti — Crotto dei Platani a Brienno, La Cucina della Marianna a Cadenabbia, o picnic a bordo se preferisci. Gestiamo noi la prenotazione." },
        ],
        included: ["Barca privata con skipper per 5 ore", "Carburante, ormeggi, parcheggio", "Acqua, prosecco, asciugamani", "Attracco al ristorante + prenotazione", "Racconto multilingue discreto"],
        notIncluded: ["Pranzo (€40-70/ospite ai ristoranti consigliati)", "Biglietti d'ingresso ville (€10-20)", "Pick-up fuori dal primo bacino (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como · Lungolago Viale Geno", note: "Imbarco, briefing, prosecco." },
          { time: "0:45", place: "Cernobbio + Villa d'Este", note: "Passaggio lento per le foto." },
          { time: "1:15", place: "Orrido di Nesso", note: "La cascata sotto il ponte — visibile solo dalla barca." },
          { time: "2:00", place: "Pranzo · Crotto dei Platani o a bordo", note: "Sul lago, ~75 minuti." },
          { time: "3:30", place: "Isola Comacina · bagno", note: "30 minuti di sosta bagno nella caletta." },
          { time: "4:00", place: "Villa del Balbianello", note: "Passaggio lento dall'acqua, l'angolo iconico." },
          { time: "5:00", place: "Rientro a Como", note: "" },
        ],
        faqs: [
          { question: "Si entra a Villa del Balbianello?", answer: "Il pontile è FAI e lo slot va prenotato a parte — se vuoi entrare, prenota il Boat & Villa Tour (4 ore con visita guidata inclusa)." },
          { question: "Il pranzo è flessibile?", answer: "Sì — Crotto dei Platani (Brienno), Il Gatto Nero (Cernobbio), La Punta (Bellagio), o picnic a bordo. Dicci tu in fase di prenotazione." },
          { question: "Differenza con 6 ore?", answer: "Il 6 ore aggiunge Bellagio + Varenna (centro lago). Il 5 ore resta nel primo bacino + Balbianello — miglior rapporto qualità-prezzo per la prima volta." },
        ],
      },
      ru: {
        metaTitle: "Тур 5 часов · Озеро Комо · Первый бассейн + Balbianello",
        metaDesc: "5 часов на озере Комо — Cernobbio, Nesso, Villa del Balbianello, Isola Comacina с купанием и обедом. От €820.",
        headline: "Первый бассейн и <em>Balbianello,</em> 5 часов.",
        kicker: "Из Комо · 5 часов с обедом",
        body: [
          { type: "p", text: "Пять часов — наш самый рекомендуемый маршрут. Хватает выйти за первый бассейн и дойти до Villa del Balbianello, но не так долго, чтобы пропустить ужин. Классический день на озере." },
          { type: "p", text: "Mid-morning из Комо вдоль западного берега до Cernobbio, Moltrasio, Laglio, потом через Orrido di Nesso (видно только с воды) к Isola Comacina на купание, и финал у Villa del Balbianello." },
        ],
        included: ["Частная лодка с капитаном 5ч", "Топливо и стоянки", "Вода, просекко, полотенца", "Бронь ресторана", "Многоязычный рассказ"],
        notIncluded: ["Обед (€40-70/гостя)", "Билеты на виллы", "Подача вне первого бассейна (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como", note: "Посадка, инструктаж, просекко." },
          { time: "0:45", place: "Cernobbio", note: "Фото." },
          { time: "1:15", place: "Orrido di Nesso", note: "Водопад под мостом." },
          { time: "2:00", place: "Обед", note: "У воды, 75 минут." },
          { time: "3:30", place: "Isola Comacina", note: "Купание 30 минут." },
          { time: "4:00", place: "Villa del Balbianello", note: "С воды." },
          { time: "5:00", place: "Возврат в Комо", note: "" },
        ],
        faqs: [
          { question: "Заходим в Balbianello?", answer: "Нет — для этого нужен Boat & Villa Tour 4 часа." },
          { question: "Где обед?", answer: "Crotto dei Platani, Il Gatto Nero или пикник на борту." },
          { question: "Разница с 6ч?", answer: "6ч добавляет Bellagio и Varenna." },
        ],
      },
      ar: {
        metaTitle: "جولة 5 ساعات · بحيرة كومو · الحوض الأول + بالبيانيلو",
        metaDesc: "خمس ساعات على بحيرة كومو — تشيرنوبيو، أوريدو دي نيسو، فيلا بالبيانيلو، إيزولا كوماتشينا مع سباحة وغداء. من €820.",
        headline: "الحوض الأول و<em>بالبيانيلو،</em> 5 ساعات.",
        kicker: "من كومو · 5 ساعات مع غداء",
        body: [
          { type: "p", text: "خمس ساعات — مسارنا الأكثر توصية. كافٍ للخروج من الحوض الأول والوصول إلى فيلا بالبيانيلو، وقصير بما يكفي للعودة إلى كومو قبل العشاء." },
          { type: "p", text: "نغادر منتصف الصباح، نلامس الضفة الغربية حتى تشيرنوبيو ومولتراسيو ولاليو، ثم نعبر إلى أوريدو دي نيسو ومن ثم إيزولا كوماتشينا للسباحة، وننهي عند فيلا بالبيانيلو." },
        ],
        included: ["قارب خاص مع قبطان 5س", "وقود ومرافئ", "مياه وبروسيكو ومناشف", "حجز المطعم", "سرد متعدد اللغات"],
        notIncluded: ["الغداء (€40-70/ضيف)", "تذاكر الفلل", "إقلال خارج الحوض الأول (+€100)"],
        itinerary: [
          { time: "0:00", place: "كومو", note: "صعود، بروسيكو." },
          { time: "0:45", place: "تشيرنوبيو", note: "صور." },
          { time: "1:15", place: "أوريدو دي نيسو", note: "الشلال." },
          { time: "2:00", place: "غداء", note: "75 دقيقة." },
          { time: "3:30", place: "إيزولا كوماتشينا", note: "سباحة 30د." },
          { time: "4:00", place: "فيلا بالبيانيلو", note: "من الماء." },
          { time: "5:00", place: "العودة", note: "" },
        ],
        faqs: [
          { question: "هل ندخل بالبيانيلو؟", answer: "لا — يحتاج جولة Boat & Villa 4 ساعات." },
          { question: "الغداء؟", answer: "مطاعم على الماء أو بكنيك." },
          { question: "الفرق مع 6 ساعات؟", answer: "6 ساعات تضيف بيلاجيو وفارينا." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 08 — Centre Lake (Bellagio + Varenna), 6 hours
  // ─────────────────────────────────────────────────────────────
  {
    slug: "centre-lake-6h",
    baseIndex: 5,
    hero: "/images/attractions/bellagio.jpg",
    durationMinutes: 360,
    priceEUR: 950,
    pins: ["como", "cernobbio", "balbianello", "carlotta", "bellagio", "varenna", "menaggio"],
    copy: {
      en: {
        metaTitle: "Lake Como 6-hour boat tour · Bellagio, Varenna and centre lake",
        metaDesc: "Six hours on Lake Como — first basin, Villa del Balbianello, Bellagio, Varenna with lunch stop. The classic full-lake itinerary. From €950.",
        headline: "Bellagio, Varenna & <em>centre lake,</em> 6 hours.",
        kicker: "From Como · 6-hour cruise to the three-armed centre",
        body: [
          { type: "p", text: "The centre of Lake Como — where the three arms meet at the Punta Spartivento — is 45 minutes from Como by boat. Add the time to do the first basin properly on the way up and you're looking at a 6-hour day. The most complete lake itinerary we offer at a fixed price." },
          { type: "p", text: "Morning departure from Como, slow pass of Villa d'Este and the celebrity coastline, then up past Villa del Balbianello and Villa Carlotta to Bellagio for a 90-minute lunch stop in the village. Afternoon cuts across to Varenna for the lighthouse view and Villa Monastero, then back south past Menaggio and home." },
          { type: "p", text: "If you only have one day on Lake Como and you want to actually see the whole thing, this is the tour." },
        ],
        included: ["Private boat with skipper for 6 hours", "Fuel, ormeggi, parking", "Bottled water, prosecco, towels", "Restaurant booking in Bellagio", "Time onshore in Bellagio + Varenna"],
        notIncluded: ["Lunch (€50-90/guest in Bellagio)", "Villa entry tickets if you want to step inside", "Pick-up outside the first basin (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como · departure", note: "Boarding, briefing, prosecco." },
          { time: "0:45", place: "Cernobbio + Villa d'Este", note: "Slow pass." },
          { time: "1:30", place: "Villa del Balbianello", note: "Photos from the water." },
          { time: "2:15", place: "Bellagio · lunch", note: "90-minute stop. La Punta or Bilacus by default." },
          { time: "4:00", place: "Varenna", note: "Castello di Vezio from the lake, the painted houses." },
          { time: "4:45", place: "Menaggio cross-over", note: "Back south along the west shore." },
          { time: "6:00", place: "Return to Como", note: "" },
        ],
        faqs: [
          { question: "Can we step off in Varenna?", answer: "Yes — we dock for 20-30 minutes at the public pontile. Enough to walk the lakefront and look up at Castello di Vezio. For a longer visit, add the 8-hour tour." },
          { question: "What about Villa Carlotta?", answer: "We pass it slowly — but at 6 hours the schedule doesn't include a stop inside. For Villa Carlotta visit + lake tour, see the Boat & Villa Tour (4 hours)." },
          { question: "Is 6 hours enough for swimming?", answer: "Yes — we typically build in a 20-30 minute swim stop near Isola Comacina on the way down or near Lezzeno on the way back, water and weather permitting." },
        ],
      },
      it: {
        metaTitle: "Tour barca 6 ore · Lago di Como · Bellagio, Varenna e centro lago",
        metaDesc: "Sei ore sul Lago di Como — primo bacino, Balbianello, Bellagio, Varenna con pranzo. Itinerario classico completo. Da €950.",
        headline: "Bellagio, Varenna e <em>centro lago,</em> 6 ore.",
        kicker: "Da Como · 6 ore fino al centro lago tre rami",
        body: [
          { type: "p", text: "Il centro del Lago di Como — dove i tre rami si incontrano a Punta Spartivento — è a 45 minuti da Como in barca. Aggiungi il tempo per fare bene il primo bacino e siamo a 6 ore. L'itinerario lago completo più ricco che offriamo a prezzo fisso." },
          { type: "p", text: "Partenza al mattino da Como, passaggio lento davanti a Villa d'Este e alla riviera delle celebrità, poi su per Villa del Balbianello e Villa Carlotta fino a Bellagio per una sosta pranzo di 90 minuti. Pomeriggio attraverso a Varenna per il faro e Villa Monastero, poi rientro a sud passando da Menaggio." },
          { type: "p", text: "Se hai un solo giorno sul Lago di Como e vuoi davvero vederlo tutto, questo è il tour." },
        ],
        included: ["Barca privata con skipper per 6 ore", "Carburante, ormeggi, parcheggio", "Acqua, prosecco, asciugamani", "Prenotazione ristorante a Bellagio", "Tempo a terra a Bellagio e Varenna"],
        notIncluded: ["Pranzo (€50-90/ospite a Bellagio)", "Ingressi ville", "Pick-up fuori primo bacino (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como · partenza", note: "Imbarco, briefing, prosecco." },
          { time: "0:45", place: "Cernobbio + Villa d'Este", note: "Passaggio lento." },
          { time: "1:30", place: "Villa del Balbianello", note: "Foto dall'acqua." },
          { time: "2:15", place: "Bellagio · pranzo", note: "Sosta di 90 minuti. La Punta o Bilacus di default." },
          { time: "4:00", place: "Varenna", note: "Castello di Vezio dal lago, case colorate." },
          { time: "4:45", place: "Traversata Menaggio", note: "Rientro sud lungo la riva ovest." },
          { time: "6:00", place: "Rientro a Como", note: "" },
        ],
        faqs: [
          { question: "Si scende a Varenna?", answer: "Sì — sosta di 20-30 minuti al pontile pubblico. Abbastanza per camminare sul lungolago. Per visita più lunga, vedi il tour 8 ore." },
          { question: "E Villa Carlotta?", answer: "Passaggio lento — ma 6 ore non includono visita interna. Per Carlotta + lago, vedi Boat & Villa Tour (4 ore)." },
          { question: "Si fa il bagno?", answer: "Sì — sosta di 20-30 minuti vicino a Isola Comacina o Lezzeno, meteo permettendo." },
        ],
      },
      ru: {
        metaTitle: "Тур 6 часов · Озеро Комо · Bellagio, Varenna, центр озера",
        metaDesc: "6 часов на озере Комо — первый бассейн, Balbianello, Bellagio, Varenna с обедом. Классический полный маршрут. От €950.",
        headline: "Bellagio, Varenna и <em>центр озера,</em> 6 часов.",
        kicker: "Из Комо · 6 часов до Punta Spartivento",
        body: [
          { type: "p", text: "Центр озера Комо — где три рукава сходятся у Punta Spartivento — в 45 минутах от Комо. Плюс время на первый бассейн = 6 часов. Самый полный маршрут озера за фикс-цену." },
          { type: "p", text: "Утром из Комо, медленно мимо Villa d'Este, затем Villa del Balbianello и Carlotta, в Bellagio на 90 минут обеда. После — через Varenna и обратно через Menaggio." },
        ],
        included: ["Частная лодка с капитаном 6ч", "Топливо и стоянка", "Вода, просекко, полотенца", "Бронь ресторана Bellagio", "Время на берегу"],
        notIncluded: ["Обед (€50-90/гостя)", "Билеты на виллы", "Подача вне первого бассейна (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como", note: "Посадка." },
          { time: "0:45", place: "Cernobbio + Villa d'Este", note: "" },
          { time: "1:30", place: "Villa del Balbianello", note: "Фото." },
          { time: "2:15", place: "Bellagio · обед", note: "90 минут." },
          { time: "4:00", place: "Varenna", note: "Castello di Vezio." },
          { time: "4:45", place: "Menaggio", note: "Возврат на запад." },
          { time: "6:00", place: "Возврат в Comо", note: "" },
        ],
        faqs: [
          { question: "Высадка в Varenna?", answer: "Да — 20-30 минут." },
          { question: "А Carlotta?", answer: "Только проход — для входа Boat & Villa Tour." },
          { question: "Купание?", answer: "20-30 минут у Isola Comacina или Lezzeno." },
        ],
      },
      ar: {
        metaTitle: "جولة 6 ساعات · بحيرة كومو · بيلاجيو وفارينا ومركز البحيرة",
        metaDesc: "6 ساعات على بحيرة كومو — الحوض الأول، بالبيانيلو، بيلاجيو، فارينا مع غداء. مسار كلاسيكي شامل. من €950.",
        headline: "بيلاجيو وفارينا و<em>مركز البحيرة،</em> 6 ساعات.",
        kicker: "من كومو · 6 ساعات إلى Punta Spartivento",
        body: [
          { type: "p", text: "مركز بحيرة كومو — حيث تلتقي الأذرع الثلاثة عند Punta Spartivento — 45 دقيقة من كومو بالقارب. زد وقت الحوض الأول وتُصبح 6 ساعات. أكمل مسار للبحيرة بسعر ثابت." },
          { type: "p", text: "نغادر صباحاً من كومو، نمر بفيلا ديستي وبالبيانيلو وكارلوتا، نتوقف 90 دقيقة في بيلاجيو للغداء، ثم نعبر إلى فارينا والعودة جنوباً مروراً بمناجيو." },
        ],
        included: ["قارب خاص مع قبطان 6س", "وقود ومرافئ", "مياه وبروسيكو ومناشف", "حجز مطعم بيلاجيو", "وقت على البر"],
        notIncluded: ["الغداء (€50-90)", "تذاكر الفلل", "إقلال خارج الحوض الأول (+€100)"],
        itinerary: [
          { time: "0:00", place: "كومو", note: "صعود." },
          { time: "0:45", place: "تشيرنوبيو + فيلا ديستي", note: "" },
          { time: "1:30", place: "فيلا بالبيانيلو", note: "صور." },
          { time: "2:15", place: "بيلاجيو · غداء", note: "90 دقيقة." },
          { time: "4:00", place: "فارينا", note: "Castello di Vezio." },
          { time: "4:45", place: "مناجيو", note: "العودة غرباً." },
          { time: "6:00", place: "العودة", note: "" },
        ],
        faqs: [
          { question: "هل ننزل في فارينا؟", answer: "نعم — 20-30 دقيقة." },
          { question: "وفيلا كارلوتا؟", answer: "نمر فقط — للزيارة الداخلية انظر Boat & Villa Tour." },
          { question: "هل يمكن السباحة؟", answer: "نعم، 20-30 دقيقة عند Isola Comacina أو Lezzeno." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 07 — Full Day, 8 hours · Como → Bellagio → Varenna → return
  // ─────────────────────────────────────────────────────────────
  {
    slug: "full-day-8h",
    baseIndex: 6,
    hero: "/images/luxury-cruise.jpg",
    durationMinutes: 480,
    priceEUR: 1200,
    pins: ["como", "cernobbio", "balbianello", "carlotta", "bellagio", "varenna", "menaggio", "nesso"],
    copy: {
      en: {
        metaTitle: "Lake Como 8-hour private boat tour · full day Como, Bellagio, Varenna",
        metaDesc: "Lake Como full-day 8-hour private boat tour — Como, Cernobbio, Villa del Balbianello, Bellagio, Varenna, Menaggio with two swim stops and lakeside lunch. From €1,200.",
        headline: "Full <em>day</em> on the lake, 8 hours.",
        kicker: "From Como · 8-hour private cruise · the full lake",
        body: [
          { type: "p", text: "Eight hours is the full Lake Como day — long enough to cross out of the first basin, reach the three-armed centre at Punta Spartivento, dock for a proper lunch in Bellagio, stretch your legs in Varenna and still return to Como before sunset. The complete tour we recommend for first-time visitors with one day to spare." },
          { type: "p", text: "Morning departure from Como, slow pass of Villa d'Este and the celebrity coastline, up past Villa del Balbianello and Villa Carlotta to Bellagio for a 90-minute lunch stop in the village. Afternoon cuts across to Varenna for the lighthouse view, Villa Monastero and Castello di Vezio, then back south past Menaggio and a second swim stop near Lezzeno before home." },
          { type: "p", text: "More relaxed than the 6-hour tour — same coverage but with proper time at each stop. The right pick if you want to actually feel like you've spent a day on the water rather than ticking off a list." },
        ],
        included: ["Private boat with skipper for 8 hours", "Fuel, harbour fees, parking", "Bottled water, prosecco, towels", "Restaurant booking in Bellagio", "Time onshore in Bellagio + Varenna", "Two swim stops"],
        notIncluded: ["Lunch (€50-90/guest in Bellagio)", "Villa entry tickets if you want to step inside", "Pick-up outside the first basin (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como · Lungolago Viale Geno", note: "Boarding, briefing, prosecco." },
          { time: "0:45", place: "Cernobbio · Villa d'Este", note: "Slow pass for photos." },
          { time: "1:30", place: "Villa del Balbianello", note: "Iconic angle from the water." },
          { time: "2:15", place: "Villa Carlotta · Tremezzo", note: "Pass + photos." },
          { time: "2:45", place: "Bellagio · 90-min lunch", note: "La Punta or Bilacus by default." },
          { time: "4:30", place: "Varenna", note: "Castello di Vezio + Villa Monastero from the lake, short walk onshore." },
          { time: "5:30", place: "Menaggio cross-over", note: "Cross back to the western shore." },
          { time: "6:30", place: "Swim stop · Lezzeno cove", note: "30-min swim if water and weather allow." },
          { time: "8:00", place: "Return to Como", note: "" },
        ],
        faqs: [
          { question: "Difference vs the 6-hour tour?", answer: "Same itinerary, more time on land. 6-hour skips the second swim stop and gives you 60 minutes in Bellagio; 8-hour adds a Varenna walk, 90 minutes in Bellagio and a second swim stop on the way home. Worth the extra €250 if you have the day." },
          { question: "Can we change the route?", answer: "Yes — the 8 hours is yours. We can prioritise Balbianello + a FAI villa visit, swap Bellagio for Tremezzo, or dock at a private hotel pier for lunch (Mandarin Oriental, Il Sereno, Passalacqua). Tell us at booking." },
          { question: "Is lunch flexible?", answer: "Yes — Bellagio is the default because the dock is best and the restaurants are reliable. We can also book Crotto dei Platani (Brienno), Il Gatto Nero (Cernobbio) or La Cucina della Marianna (Cadenabbia). Onboard picnic is also possible." },
          { question: "When should we depart?", answer: "9:00 or 9:30 most of the year. In peak summer we can shift to 8:30 to avoid the midday glare on the photos. Final time confirmed the evening before based on weather." },
        ],
      },
      it: {
        metaTitle: "Tour barca 8 ore · Lago di Como · giornata intera Como Bellagio Varenna",
        metaDesc: "Tour privato in barca 8 ore sul Lago di Como — Como, Cernobbio, Villa del Balbianello, Bellagio, Varenna, Menaggio con due soste bagno e pranzo sul lago. Da €1.200.",
        headline: "Giornata <em>intera</em> sul lago, 8 ore.",
        kicker: "Da Como · Crociera privata 8 ore · l'intero lago",
        body: [
          { type: "p", text: "Otto ore è la giornata completa sul Lago di Como — abbastanza per uscire dal primo bacino, raggiungere il centro a tre rami a Punta Spartivento, attraccare per un pranzo vero a Bellagio, sgranchirsi le gambe a Varenna e rientrare a Como prima del tramonto. Il tour completo che consigliamo per chi visita il lago per la prima volta con una giornata libera." },
          { type: "p", text: "Partenza al mattino da Como, passaggio lento davanti a Villa d'Este e alla riviera delle celebrità, su per Villa del Balbianello e Villa Carlotta fino a Bellagio per una sosta pranzo di 90 minuti. Pomeriggio attraverso a Varenna per il faro, Villa Monastero e il Castello di Vezio, poi rientro a sud passando da Menaggio con una seconda sosta bagno vicino a Lezzeno." },
          { type: "p", text: "Più rilassato del tour di 6 ore — stessa copertura ma con tempo vero a ogni sosta. La scelta giusta se vuoi davvero sentire di aver passato una giornata sull'acqua e non solo spuntato una lista." },
        ],
        included: ["Barca privata con skipper per 8 ore", "Carburante, ormeggi, parcheggio", "Acqua, prosecco, asciugamani", "Prenotazione ristorante a Bellagio", "Tempo a terra a Bellagio e Varenna", "Due soste bagno"],
        notIncluded: ["Pranzo (€50-90/ospite a Bellagio)", "Ingressi ville", "Pick-up fuori primo bacino (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como · Lungolago Viale Geno", note: "Imbarco, briefing, prosecco." },
          { time: "0:45", place: "Cernobbio · Villa d'Este", note: "Passaggio lento per le foto." },
          { time: "1:30", place: "Villa del Balbianello", note: "L'angolo iconico dall'acqua." },
          { time: "2:15", place: "Villa Carlotta · Tremezzo", note: "Passaggio + foto." },
          { time: "2:45", place: "Bellagio · pranzo 90 min", note: "La Punta o Bilacus di default." },
          { time: "4:30", place: "Varenna", note: "Castello di Vezio + Villa Monastero dal lago, breve sosta a terra." },
          { time: "5:30", place: "Traversata Menaggio", note: "Rientro sulla riva ovest." },
          { time: "6:30", place: "Sosta bagno · caletta Lezzeno", note: "30 min se acqua e meteo permettono." },
          { time: "8:00", place: "Rientro a Como", note: "" },
        ],
        faqs: [
          { question: "Differenza con il tour di 6 ore?", answer: "Stesso itinerario, più tempo a terra. 6 ore salta la seconda sosta bagno e dà 60 minuti a Bellagio; 8 ore aggiunge una passeggiata a Varenna, 90 minuti a Bellagio e una seconda sosta bagno al ritorno. Vale i €250 extra se hai la giornata." },
          { question: "Si può cambiare il percorso?", answer: "Sì — le 8 ore sono tue. Possiamo dare priorità a Balbianello + visita FAI, sostituire Bellagio con Tremezzo, o attraccare a un pontile privato d'hotel (Mandarin Oriental, Il Sereno, Passalacqua). Dicci tu in fase di prenotazione." },
          { question: "Il pranzo è flessibile?", answer: "Sì — Bellagio è il default perché il pontile è il migliore e i ristoranti affidabili. Possiamo anche prenotare Crotto dei Platani (Brienno), Il Gatto Nero (Cernobbio) o La Cucina della Marianna (Cadenabbia). Picnic a bordo possibile." },
          { question: "A che ora partire?", answer: "9:00 o 9:30 quasi sempre. Nei mesi di punta possiamo anticipare a 8:30 per evitare il riverbero di mezzogiorno sulle foto. Orario definitivo confermato la sera prima in base al meteo." },
        ],
      },
      ru: {
        metaTitle: "Тур 8 часов · Озеро Комо · полный день Komo Bellagio Varenna",
        metaDesc: "Частный тур на лодке 8 часов на озере Комо — Комо, Cernobbio, Villa del Balbianello, Bellagio, Varenna, Menaggio с двумя купаниями и обедом. От €1.200.",
        headline: "Полный <em>день</em> на озере, 8 часов.",
        kicker: "Из Комо · 8 часов · всё озеро",
        body: [
          { type: "p", text: "Восемь часов — полный день на озере Комо. Достаточно, чтобы выйти из первого бассейна, дойти до центра у Punta Spartivento, причалить на полноценный обед в Bellagio, размять ноги в Varenna и вернуться в Комо до заката. Полный тур, который мы рекомендуем гостям с одним свободным днём." },
          { type: "p", text: "Утренний выход из Комо, медленно мимо Villa d'Este, Villa del Balbianello, Villa Carlotta, в Bellagio на 90 минут обеда. После — Varenna с маяком, Villa Monastero и Castello di Vezio, обратно через Menaggio со второй купальной остановкой у Lezzeno." },
          { type: "p", text: "Более расслабленный чем 6-часовой — то же покрытие, но с реальным временем на каждой остановке." },
        ],
        included: ["Частная лодка с капитаном 8ч", "Топливо, стоянки, парковка", "Вода, просекко, полотенца", "Бронь ресторана в Bellagio", "Время на берегу Bellagio + Varenna", "Две купальные остановки"],
        notIncluded: ["Обед (€50-90/гостя)", "Билеты на виллы", "Подача вне первого бассейна (+€100)"],
        itinerary: [
          { time: "0:00", place: "Como", note: "Посадка, инструктаж, просекко." },
          { time: "0:45", place: "Cernobbio · Villa d'Este", note: "" },
          { time: "1:30", place: "Villa del Balbianello", note: "С воды." },
          { time: "2:15", place: "Villa Carlotta · Tremezzo", note: "Проход + фото." },
          { time: "2:45", place: "Bellagio · обед 90 мин", note: "La Punta или Bilacus." },
          { time: "4:30", place: "Varenna", note: "Castello di Vezio, прогулка." },
          { time: "5:30", place: "Menaggio", note: "Обратно на запад." },
          { time: "6:30", place: "Купание · Lezzeno", note: "30 минут." },
          { time: "8:00", place: "Возврат в Comо", note: "" },
        ],
        faqs: [
          { question: "Разница с 6ч?", answer: "Те же остановки, больше времени на берегу. 8ч добавляет прогулку Varenna, обед 90 мин в Bellagio, вторую купальную остановку." },
          { question: "Можно изменить маршрут?", answer: "Да — 8 часов ваши. Можем поменять Bellagio на Tremezzo, причалить в Mandarin Oriental или Il Sereno." },
          { question: "Обед?", answer: "Bellagio по умолчанию. Также Crotto dei Platani, Il Gatto Nero, La Cucina della Marianna." },
          { question: "Когда выходить?", answer: "9:00 или 9:30. Летом можем 8:30 чтобы избежать полуденного блика." },
        ],
      },
      ar: {
        metaTitle: "جولة 8 ساعات · بحيرة كومو · يوم كامل كومو بيلاجيو فارينا",
        metaDesc: "جولة قارب خاصة 8 ساعات على بحيرة كومو — كومو، تشيرنوبيو، فيلا بالبيانيلو، بيلاجيو، فارينا، مناجيو مع توقفي سباحة وغداء. من €1.200.",
        headline: "<em>يوم كامل</em> على البحيرة، 8 ساعات.",
        kicker: "من كومو · 8 ساعات · البحيرة كاملة",
        body: [
          { type: "p", text: "ثماني ساعات هو اليوم الكامل على بحيرة كومو — كافٍ للخروج من الحوض الأول، الوصول إلى مركز الأذرع الثلاثة عند Punta Spartivento، الرسو لغداء حقيقي في بيلاجيو، التجوّل في فارينا والعودة قبل الغروب." },
          { type: "p", text: "الانطلاق صباحاً من كومو، مرور بطيء بفيلا ديستي وفيلا بالبيانيلو وفيلا كارلوتا، توقف غداء 90 دقيقة في بيلاجيو. بعد الظهر إلى فارينا للمنارة وفيلا موناستيرو وقلعة فيتسيو، ثم العودة جنوباً عبر مناجيو مع توقف سباحة ثاني قرب ليتسينو." },
          { type: "p", text: "أكثر استرخاءً من جولة 6 ساعات — نفس التغطية لكن مع وقت حقيقي في كل محطة." },
        ],
        included: ["قارب خاص مع قبطان 8س", "وقود ومرافئ وموقف", "مياه وبروسيكو ومناشف", "حجز مطعم في بيلاجيو", "وقت على البر في بيلاجيو وفارينا", "توقفان للسباحة"],
        notIncluded: ["الغداء (€50-90/ضيف)", "تذاكر الفلل", "إقلال خارج الحوض الأول (+€100)"],
        itinerary: [
          { time: "0:00", place: "كومو", note: "صعود، إيضاح، بروسيكو." },
          { time: "0:45", place: "تشيرنوبيو · فيلا ديستي", note: "" },
          { time: "1:30", place: "فيلا بالبيانيلو", note: "من الماء." },
          { time: "2:15", place: "فيلا كارلوتا · تريميتسو", note: "" },
          { time: "2:45", place: "بيلاجيو · غداء 90د", note: "La Punta أو Bilacus." },
          { time: "4:30", place: "فارينا", note: "قلعة فيتسيو، تجوّل." },
          { time: "5:30", place: "مناجيو", note: "العودة غرباً." },
          { time: "6:30", place: "سباحة · ليتسينو", note: "30د." },
          { time: "8:00", place: "العودة", note: "" },
        ],
        faqs: [
          { question: "الفرق مع 6 ساعات؟", answer: "نفس المحطات، وقت أكبر على البر. 8 ساعات تضيف تجوّل فارينا، غداء 90د في بيلاجيو، توقف سباحة ثاني." },
          { question: "هل يمكن تعديل المسار؟", answer: "نعم — الثماني ساعات لكم. يمكن تبديل بيلاجيو بتريميتسو أو الرسو في Mandarin Oriental أو Il Sereno." },
          { question: "الغداء؟", answer: "بيلاجيو افتراضياً. أيضاً Crotto dei Platani، Il Gatto Nero، La Cucina della Marianna." },
          { question: "متى الانطلاق؟", answer: "9:00 أو 9:30. صيفاً يمكن 8:30 لتجنب وهج الظهيرة." },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Tour 08 — Sunset Cruise, 1.5 hours
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sunset-cruise",
    baseIndex: 7,
    // Note: sunset-cruise stays at index 7 (last slot in the menu)
    hero: "/images/hero-sunset.jpg",
    durationMinutes: 90,
    priceEUR: 350,
    pins: ["como", "cernobbio", "oleandra"],
    copy: {
      en: {
        metaTitle: "Lake Como sunset cruise · 1.5 hours private boat with prosecco",
        metaDesc: "Lake Como sunset cruise — 90 minutes on a classic wooden boat with prosecco, golden-hour photos and the lake's most romantic light. From €350.",
        headline: "Sunset <em>cruise.</em>",
        kicker: "From Como · 90 minutes at golden hour",
        body: [
          { type: "p", text: "Lake Como's light changes more dramatically in the last ninety minutes of the day than in any other moment. The lake turns from blue to molten gold, the villas catch their best light, and the wind drops to nothing — the conditions every Lake Como photographer chases." },
          { type: "p", text: "Departure 90 minutes before sunset from Como, slow cruise along the first-basin coastline — Villa Olmo, Cernobbio with Villa d'Este, Moltrasio — past Laglio and back. Prosecco poured, the captain stops where the light is best, you take your photos." },
          { type: "p", text: "The most-booked tour for proposals, anniversaries and 'last evening on Lake Como' goodbye dinners on board." },
        ],
        included: ["Private boat with skipper", "Prosecco (1 bottle / 4 guests) and ice", "Bottled water and a light snack platter", "Towels and a cashmere blanket if it gets cool", "Sunset-spot positioning advice from the captain"],
        notIncluded: ["Sit-down dinner ashore (see our Dinner Tour for that)", "Pick-up from hotels outside the first basin (+€80)"],
        itinerary: [
          { time: "T-90 min", place: "Como · Lungolago Viale Geno", note: "Boarding, briefing, prosecco poured." },
          { time: "T-60 min", place: "Cernobbio · Villa d'Este", note: "The 16th-century facade in golden light." },
          { time: "T-30 min", place: "Moltrasio · Villa Passalacqua", note: "Belle Époque yellow against the cliff." },
          { time: "T-0", place: "Sunset · open water off Laglio", note: "The captain stops where the light is best." },
          { time: "T+30 min", place: "Return to Como", note: "Past Villa Oleandra in the blue hour." },
        ],
        faqs: [
          { question: "What time does the cruise start?", answer: "Sunset varies by month — June around 21:00, October around 18:45. We book the slot 90 minutes before sunset so we're on open water at the moment the sun drops behind the western ridge." },
          { question: "Is this OK for a proposal?", answer: "Yes — most of our proposals happen on this slot. Tell us at booking and we arrange flowers, a champagne upgrade, a discreet timing cue with the captain. No coordination fee." },
          { question: "What if it's cloudy?", answer: "Cloudy sunsets often photograph better than clear ones — the sky lights up rather than going monochrome. We don't cancel for clouds, only for rain/wind. Full refund if we have to cancel for weather." },
        ],
      },
      it: {
        metaTitle: "Crociera al tramonto Lago di Como · 90 minuti in barca con prosecco",
        metaDesc: "Crociera al tramonto sul Lago di Como — 90 minuti su barca classica in legno con prosecco, ora dorata e la luce più romantica del lago. Da €350.",
        headline: "Crociera al <em>tramonto.</em>",
        kicker: "Da Como · 90 minuti nell'ora dorata",
        body: [
          { type: "p", text: "La luce del Lago di Como cambia più drammaticamente negli ultimi novanta minuti della giornata che in qualsiasi altro momento. Il lago passa dal blu all'oro fuso, le ville catturano la loro luce migliore, e il vento cala — le condizioni che ogni fotografo del lago insegue." },
          { type: "p", text: "Partenza 90 minuti prima del tramonto da Como, crociera lenta lungo la costa del primo bacino — Villa Olmo, Cernobbio con Villa d'Este, Moltrasio — fino a Laglio e ritorno. Prosecco versato, lo skipper si ferma dove la luce è migliore, tu scatti." },
          { type: "p", text: "Il tour più prenotato per proposte, anniversari e cene di addio 'ultima sera sul Lago di Como' a bordo." },
        ],
        included: ["Barca privata con skipper", "Prosecco (1 bottiglia / 4 ospiti) e ghiaccio", "Acqua e tagliere leggero", "Asciugamani e plaid in cashmere se rinfresca", "Posizionamento per il tramonto dal capitano"],
        notIncluded: ["Cena a terra (vedi il Dinner Tour)", "Pick-up da hotel fuori primo bacino (+€80)"],
        itinerary: [
          { time: "T-90 min", place: "Como · Lungolago Viale Geno", note: "Imbarco, briefing, prosecco versato." },
          { time: "T-60 min", place: "Cernobbio · Villa d'Este", note: "La facciata del XVI secolo in luce dorata." },
          { time: "T-30 min", place: "Moltrasio · Villa Passalacqua", note: "Il giallo Belle Époque contro la roccia." },
          { time: "T-0", place: "Tramonto · acqua aperta verso Laglio", note: "Lo skipper si ferma dove la luce è migliore." },
          { time: "T+30 min", place: "Rientro a Como", note: "Davanti a Villa Oleandra nell'ora blu." },
        ],
        faqs: [
          { question: "A che ora parte?", answer: "Il tramonto varia per mese — giugno verso le 21:00, ottobre verso le 18:45. Prenotiamo lo slot 90 minuti prima del tramonto." },
          { question: "Va bene per una proposta?", answer: "Sì — la maggior parte delle nostre proposte avvengono in questo slot. Dicci tu in fase di prenotazione e organizziamo fiori, upgrade champagne, timing discreto col capitano. Senza costi di coordinazione." },
          { question: "E se è nuvoloso?", answer: "I tramonti nuvolosi spesso vengono meglio in foto dei sereni. Annulliamo solo per pioggia/vento. Rimborso completo se annulliamo noi per meteo." },
        ],
      },
      ru: {
        metaTitle: "Закатная прогулка · Озеро Комо · 90 минут с просекко",
        metaDesc: "Закатная прогулка по озеру Комо — 90 минут на классической деревянной лодке с просекко, золотой час и самый романтичный свет озера. От €350.",
        headline: "Закатная <em>прогулка.</em>",
        kicker: "Из Комо · 90 минут в золотой час",
        body: [
          { type: "p", text: "Свет озера Комо в последние 90 минут дня меняется драматичнее, чем в любое другое время. Озеро переходит от синего к расплавленному золоту, виллы ловят свой лучший свет, ветер стихает." },
          { type: "p", text: "Отправление за 90 минут до заката из Комо, медленный круг по первому бассейну — Villa d'Este, Moltrasio, Laglio. Просекко налит, капитан останавливается где свет лучший." },
        ],
        included: ["Частная лодка с капитаном", "Просекко и лёд", "Вода и лёгкая закуска", "Полотенца и кашемировый плед", "Совет капитана по точкам заката"],
        notIncluded: ["Ужин на берегу (см. Dinner Tour)", "Подача вне первого бассейна (+€80)"],
        itinerary: [
          { time: "T-90 мин", place: "Comо", note: "Посадка, просекко." },
          { time: "T-60 мин", place: "Cernobbio · Villa d'Este", note: "Фасад в золотом свете." },
          { time: "T-30 мин", place: "Moltrasio", note: "" },
          { time: "T-0", place: "Закат · открытая вода у Laglio", note: "Капитан выбирает точку." },
          { time: "T+30 мин", place: "Возврат в Comо", note: "Голубой час у Villa Oleandra." },
        ],
        faqs: [
          { question: "Во сколько?", answer: "Зависит от месяца — июнь ~21:00, октябрь ~18:45." },
          { question: "Подходит для предложения?", answer: "Да — большинство наших предложений в этом слоте. Цветы и шампанское по запросу." },
          { question: "А если облачно?", answer: "Облачные закаты часто красивее. Отмена только при дожде/ветре." },
        ],
      },
      ar: {
        metaTitle: "جولة الغروب · بحيرة كومو · 90 دقيقة مع بروسيكو",
        metaDesc: "جولة الغروب على بحيرة كومو — 90 دقيقة على قارب خشبي كلاسيكي مع بروسيكو، ساعة ذهبية وأرومانسية إضاءة في البحيرة. من €350.",
        headline: "جولة <em>الغروب.</em>",
        kicker: "من كومو · 90 دقيقة في الساعة الذهبية",
        body: [
          { type: "p", text: "ضوء بحيرة كومو يتغير في آخر 90 دقيقة من النهار أكثر من أي وقت آخر. تتحول البحيرة من الأزرق إلى الذهب المنصهر، تلتقط الفلل أفضل ضوءها، وتهدأ الريح." },
          { type: "p", text: "الانطلاق قبل الغروب بـ 90 دقيقة من كومو، رحلة بطيئة في الحوض الأول — فيلا ديستي، مولتراسيو، لاليو. بروسيكو على المتن، القبطان يتوقف حيث الضوء الأفضل." },
        ],
        included: ["قارب خاص مع قبطان", "بروسيكو وثلج", "مياه ووجبة خفيفة", "مناشف وغطاء كشمير", "نصائح القبطان لأفضل نقاط الغروب"],
        notIncluded: ["عشاء على البر (انظر Dinner Tour)", "إقلال من خارج الحوض الأول (+€80)"],
        itinerary: [
          { time: "T-90د", place: "كومو", note: "صعود، بروسيكو." },
          { time: "T-60د", place: "تشيرنوبيو · فيلا ديستي", note: "الواجهة في الضوء الذهبي." },
          { time: "T-30د", place: "مولتراسيو", note: "" },
          { time: "T-0", place: "الغروب · مياه مفتوحة قرب لاليو", note: "القبطان يختار النقطة." },
          { time: "T+30د", place: "العودة إلى كومو", note: "الساعة الزرقاء قرب فيلا أوليندرا." },
        ],
        faqs: [
          { question: "في أي وقت؟", answer: "يعتمد على الشهر — يونيو ~21:00، أكتوبر ~18:45." },
          { question: "هل تناسب طلب يد؟", answer: "نعم — أغلب طلباتنا في هذا التوقيت. ورود وشمبانيا حسب الطلب." },
          { question: "وإذا كانت غائمة؟", answer: "غروب الغيوم غالباً أجمل تصويراً. الإلغاء فقط لمطر/ريح." },
        ],
      },
    },
  },

];

// Helper for sitemap.ts and route generation.
export const TOUR_SLUGS_LIST: string[] = TOUR_SLUGS.map((s) => s);
export { TOUR_SLUGS_LIST as TOUR_SLUGS_FOR_SITEMAP };
