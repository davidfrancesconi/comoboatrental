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
        metaTitle: "Аренда Лодки на Озере Комо на Целый День · VIP Чартер из Комо",
        metaDesc:
          "Полнодневный частный чартер на озере Комо (6–8 часов) по вашему графику: подача к пристани отеля (Villa d'Este, Passalacqua, Mandarin), виллы, купание, обед на берегу, возвращение на закате. От €1,400 на лодку.",
        headline: "Восемь часов на озере Комо. <em>Ваш маршрут, ваш день.</em>",
        kicker: "6–8 часов · от €1,400 на лодку · до 10 гостей · подача к любой пристани отеля",
        body: [
          { type: "p", text: "Когда день — это и есть пункт назначения. Мы забираем вас прямо с пристани вашего отеля — Villa d'Este, Passalacqua, Mandarin Oriental, Il Sereno, Grand Hotel Tremezzo, Villa Serbelloni — в любое выбранное вами время, и планируем день в обратном порядке: от того, как вы хотите его завершить." },
          { type: "h", text: "Как выглядит типичный день" },
          { type: "p", text: "10:00 — подача к пристани отеля. 11:00 — Вилла дель Бальбьянелло, с высадкой при наличии билета FAI. 12:30 — остановка для купания у Фаджето или в одной из укромных бухт под скалами. 14:00 — обед в ресторане на берегу, который мы бронируем для вас (Crotto del Misto на восточном берегу, La Punta в Беладжо или Locanda La Tirlindana в Сала-Комачина). 16:00 — Беладжо, час на берегу. 17:30 — Варенна в золотой час. 19:00 — возврат в отель." },
          { type: "p", text: "Корректируем маршрут по ходу дня. Если в верхнем бассейне поднимается ветер, остаёмся у южных вилл. Если утро серое, ждём час и начинаем с Черноббио. Если хотите пропустить обед в пользу более длинного купания — это ваш день." },
          { type: "h", text: "Что мы организуем для вас" },
          { type: "p", text: "Брони в наших проверенных ресторанах на берегу. Фотограф на борту, если хотите — мы знаем двух профессионалов, регулярно работающих с нами. Шампанское и тарелка сыров с салями, если предпочитаете обед на воде. Доставка цветов на пристань отеля, если планируется предложение руки и сердца." },
        ],
        included: [
          "Частное использование лодки на 6 или 8 часов",
          "Профессиональный шкипер (Лорис или Клаудио)",
          "Подача к любой пристани отеля на озере Комо",
          "Газированная и негазированная вода, просекко, безалкогольные напитки",
          "Полотенца и проверка температуры воды перед остановками для купания",
          "Брони в наших проверенных ресторанах",
          "Топливо, сборы озера, вся логистика",
        ],
        notIncluded: [
          "Обед (€80–180 на гостя в зависимости от ресторана)",
          "Входные билеты на виллы",
          "Фотограф (по запросу — €350–600 на день)",
          "Флорист или особые запросы (координируем мы, оплачиваете вы)",
        ],
        itinerary: [
          { time: "Подача", place: "Пристань отеля", note: "В выбранное вами время" },
          { time: "Утро", place: "Первые виллы", note: "Бальбьянелло, Карлотта или Черноббио — по погоде" },
          { time: "Полдень", place: "Остановка для купания", note: "Фаджето или одна из укромных бухт" },
          { time: "Обед", place: "Ресторан на берегу", note: "Crotto del Misto, La Punta или Tirlindana" },
          { time: "После обеда", place: "Беладжо + Варенна", note: "По часу в каждом, если хотите оба" },
          { time: "Закат", place: "Западный берег", note: "Свет уходит с севера на юг" },
          { time: "Возврат", place: "Пристань отеля", note: "Высадка по окончании дня" },
        ],
        faqs: [
          { question: "Как устроена цена за 6 и 8 часов?", answer: "€1,400 покрывают шесть часов; €1,800 — восемь. Лодка ваша в обоих случаях — разница в топливе и времени шкипера. Доплат за гостя нет." },
          { question: "Можно ли организовать предложение руки и сердца?", answer: "Да, это одна из самых частых причин бронирования. Мы координируем флориста, фотографа, тайминг — вы говорите отель и желаемый момент, мы планируем остальное. Без дополнительной платы за координацию." },
          { question: "От каких отелей вы делаете подачу?", answer: "От всех. Чаще всего работаем с Villa d'Este (Черноббио), Passalacqua (Мольтразио), Mandarin Oriental (Блевио), Il Sereno (Торно), Grand Hotel Tremezzo, Grand Hotel Villa Serbelloni (Беладжо). Если у вашей арендованной виллы есть свой причал, мы заберём вас и оттуда — пришлите координаты." },
          { question: "Можно ли пообедать на борту?", answer: "Да. Организуем тарелку сыров, салями и продуктов озера с просекко за €40 на гостя — обед проходит на воде, а не на берегу. Сообщите за день." },
        ],
      },
      ar: {
        metaTitle: "تأجير يخت بحيرة كومو ليوم كامل · جولة VIP خاصة · شهر العسل",
        metaDesc:
          "تأجير قارب فاخر على بحيرة كومو ليوم كامل (6–8 ساعات) حسب جدولكم: استلام من رصيف الفندق (Villa d'Este، Passalacqua، Mandarin)، الفيلات السينمائية، السباحة، غداء على البحيرة، العودة عند الغروب. مثالي لشهر العسل والعائلات. من €1,400 للقارب.",
        headline: "ثماني ساعات على بحيرة كومو. <em>مساركم وشروطكم.</em>",
        kicker: "6–8 ساعات · من €1,400 للقارب · حتى 10 ضيوف · استلام من أي رصيف فندق",
        body: [
          { type: "p", text: "عندما يكون اليوم نفسه هو الوجهة. نأتي إليكم مباشرة على رصيف فندقكم — Villa d'Este أو Passalacqua أو Mandarin Oriental أو Il Sereno أو Grand Hotel Tremezzo أو Villa Serbelloni — في الوقت الذي تختارونه، ونخطط اليوم بشكل عكسي بدءاً من اللحظة التي تريدون أن ينتهي بها." },
          { type: "h", text: "يوم نموذجي" },
          { type: "p", text: "10:00 الاستلام من رصيف الفندق. 11:00 فيلا دل بالبيانيلو، مع النزول إن كانت لديكم تذكرة FAI. 12:30 توقف للسباحة في فاجيتو أو في إحدى الخلجان السرية تحت الصخور. 14:00 غداء في مطعم على البحيرة نحجزه لكم (Crotto del Misto على الضفة الشرقية، La Punta في بيلاجيو، أو Locanda La Tirlindana في سالا كوماتشينا). 16:00 بيلاجيو، ساعة على الأرض. 17:30 فارينا في الساعة الذهبية. 19:00 العودة إلى الفندق." },
          { type: "p", text: "نتأقلم مع الطقس ورغباتكم خلال اليوم. إذا اشتدت الرياح في الحوض العلوي، نبقى عند الفيلات الجنوبية. إذا كان الصباح ضبابياً، ننتظر ساعة ونبدأ من تشيرنوبيو. إذا فضّلتم تخطّي الغداء لصالح سباحة أطول، فهذا اليوم الذي تطلبونه." },
          { type: "h", text: "ما ننظمه لكم" },
          { type: "p", text: "حجوزات في مطاعم البحيرة الموثوقة. مصور على متن القارب إن رغبتم — نعرف محترفَين يعملان معنا بانتظام. شمبانيا وطبق أجبان وأنواع لحوم باردة إذا فضّلتم الغداء على متن القارب. توصيل الزهور إلى رصيف الفندق إذا كنتم تخططون لطلب زواج. ندرك أيضاً متطلبات ضيوفنا من منطقة الخليج: نوفّر خصوصية كاملة على متن القارب وننسّق مع المطاعم لتقديم خيارات حلال." },
        ],
        included: [
          "استخدام خاص للقارب لمدة 6 أو 8 ساعات",
          "ربان محترف (لوريس أو كلاوديو)",
          "استلام من أي رصيف فندق على بحيرة كومو",
          "مياه فوارة وعادية، بروسيكو، مشروبات غازية",
          "مناشف وفحص حرارة المياه قبل التوقفات للسباحة",
          "حجوزات في مطاعمنا الموثوقة",
          "الوقود ورسوم البحيرة وكامل التنسيق اللوجستي",
        ],
        notIncluded: [
          "الغداء (€80–180 للضيف بحسب المطعم)",
          "تذاكر دخول الفيلات",
          "المصور (عند الطلب — €350–600 لليوم)",
          "الفلوريست أو الطلبات الخاصة (نتولى التنسيق وأنتم تدفعون)",
        ],
        itinerary: [
          { time: "الاستلام", place: "رصيف الفندق", note: "في الوقت الذي تختارونه" },
          { time: "الصباح", place: "الفيلات الأولى", note: "بالبيانيلو أو كارلوتا أو تشيرنوبيو حسب الطقس" },
          { time: "الظهيرة", place: "توقف للسباحة", note: "فاجيتو أو إحدى الخلجان السرية" },
          { time: "الغداء", place: "مطعم على البحيرة", note: "Crotto del Misto، La Punta، أو Tirlindana" },
          { time: "بعد الظهر", place: "بيلاجيو + فارينا", note: "ساعة في كل منهما إن أردتم الاثنين" },
          { time: "الغروب", place: "الضفة الغربية", note: "الضوء يتحرك من الشمال إلى الجنوب" },
          { time: "العودة", place: "رصيف الفندق", note: "النزول عند انتهاء اليوم" },
        ],
        faqs: [
          { question: "ما الفرق بين 6 و 8 ساعات؟", answer: "€1,400 لست ساعات، €1,800 لثماني ساعات. القارب لكم في الحالتين — الفرق هو الوقود ووقت الربان. لا توجد رسوم لكل ضيف." },
          { question: "هل يمكن تنظيم طلب زواج على القارب؟", answer: "نعم، إنها إحدى أكثر المناسبات التي ننظمها. ننسق الفلوريست والمصور والتوقيت — أخبرونا بالفندق واللحظة، ونتولى البقية. دون رسوم تنسيق إضافية." },
          { question: "من أي فنادق تستلمون الضيوف؟", answer: "من جميع الفنادق. الأرصفة التي نتعامل معها أكثر هي Villa d'Este (تشيرنوبيو)، Passalacqua (مولتراسيو)، Mandarin Oriental (بليفيو)، Il Sereno (تورنو)، Grand Hotel Tremezzo، Grand Hotel Villa Serbelloni (بيلاجيو). إذا كان لفيلتكم المؤجَّرة رصيف خاص، نأتي إليه — أرسلوا لنا الإحداثيات." },
          { question: "هل يمكن تناول الغداء على متن القارب؟", answer: "نعم. ننظم طبق أجبان وأنواع لحوم باردة ومنتجات من البحيرة مع بروسيكو بسعر €40 للضيف، وتقضون الغداء على الماء بدلاً من الأرض. أخبرونا قبل يوم. يمكننا أيضاً ترتيب خيارات حلال عند الطلب." },
        ],
      },
    },
  },
];

// Helper for sitemap.ts and route generation.
export const TOUR_SLUGS_LIST: string[] = TOUR_SLUGS.map((s) => s);
export { TOUR_SLUGS_LIST as TOUR_SLUGS_FOR_SITEMAP };
