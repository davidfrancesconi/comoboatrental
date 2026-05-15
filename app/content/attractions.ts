// The 13 Lake Como attractions used by:
//   - The horizontally-scrollable strip on the homepage (under the map)
//   - The dedicated /<locale>/attractions/ list page
//   - The per-attraction detail pages at /<locale>/attractions/<slug>/
//
// Each attraction has a `slug` (URL fragment) and a `pinId` (matches an
// entry in PIN_BASE in translations.ts — that's how the bidirectional
// hover between map and attractions on the homepage works).
//
// Content is rich enough to drive its own SEO page: metaTitle / metaDesc /
// headline / paragraphs / goodToKnow / cross-link to tours. Italian and
// English are hand-written for the high-volume queries in each market;
// Russian and Arabic are competent translations carrying the same
// keywords (luxury Russian travel via Dubai/Istanbul; Gulf market for
// Arabic). See docs/HANDOFF.md for native-speaker polish task.
//
// Photos in `/public/images/attractions/` are downloaded from Wikimedia
// Commons (CC BY-SA / CC0) — see CREDITS.md there.

import type { Locale } from "../translations";

export type AttractionCopy = {
  /** Short name shown on cards (~12 chars max) */
  name: string;
  /** 1-2 sentence blurb shown on the homepage card and list cards */
  blurb: string;
  /** SEO title for the detail page (~60 chars) */
  metaTitle: string;
  /** SEO description for the detail page (~150 chars) */
  metaDesc: string;
  /** Hero H1 on the detail page — may include <em> */
  headline: string;
  /** Small subtitle under the hero H1 — location/distance/quick facts */
  kicker: string;
  /** 3 body paragraphs */
  paragraphs: string[];
  /** "Good to know" bullets shown on the detail page */
  goodToKnow: string[];
};

export type Attraction = {
  /** URL slug — also used as the React key. Stable, do not change without redirects. */
  slug: string;
  /** Matches a pin id in PIN_BASE (translations.ts) — drives the bidirectional hover wiring */
  pinId: string;
  /** Photo path under /public */
  image: string;
  /** Tour slugs that visit this attraction — cross-linked on the detail page */
  toursThatVisit: string[];
  copy: Record<Locale, AttractionCopy>;
};

export const ATTRACTION_SLUGS = [
  "como",
  "bellagio",
  "villa-del-balbianello",
  "varenna",
  "villa-carlotta",
  "isola-comacina",
  "villa-la-cassinella",
  "cernobbio",
  "blevio-torno",
  "moltrasio-laglio",
  "nesso",
  "menaggio",
  "lecco",
] as const;

export type AttractionSlug = (typeof ATTRACTION_SLUGS)[number];

export const attractions: Attraction[] = [
  // ─── Como ────────────────────────────────────────────────────────
  {
    slug: "como",
    pinId: "como",
    image: "/images/attractions/como.jpg",
    toursThatVisit: ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Como",
        blurb: "The main town and our departure point — Duomo, Funicolare, Villa Olmo.",
        metaTitle: "Como Town · Where Every Lake Como Boat Tour Begins",
        metaDesc:
          "Como is the southern capital of Lake Como and the natural starting point for any private boat tour. A short guide to the town and its pontoon.",
        headline: "Como. <em>Where every Lake Como boat tour begins.</em>",
        kicker: "South-western capital · our departure pontoon · UNESCO Duomo · Funicolare to Brunate",
        paragraphs: [
          "Como is the city at the southern tip of the lake's western arm — the gateway to everything Lake Como is known for. Two thousand years old (it began as a Roman colony in 196 BC), it sits inside a circle of mountains that fall straight into the water, and its centre is small enough to walk in twenty minutes. Our pontoon is on the Lungolago Viale Geno, a five-minute stroll from Piazza Cavour and the marble Duomo.",
          "What to see in an hour: the Duomo (one of the last Gothic-and-Renaissance hybrid cathedrals in Italy), the Funicolare up to Brunate for the view back over the basin, the silk museum that traces seven centuries of weaving, and Villa Olmo — the neoclassical villa with public gardens opened in 1815. The lakefront promenade from Piazza Cavour to the Tempio Voltiano (dedicated to Como-born Alessandro Volta) is the way to feel the city.",
          "By boat from Como, the rest of the lake unfolds northward. Within fifteen minutes you're at Cernobbio and the gardens of Villa d'Este. In forty you're at George Clooney's Villa Oleandra in Laglio. The cinematic first basin — every Hollywood Lake Como scene was shot here — is yours within the first thirty minutes of any tour we run.",
        ],
        goodToKnow: [
          "Our pontoon: Lungolago Viale Geno, fronte civico 10 — 5 minutes on foot from Piazza Cavour",
          "Parking: the closest public parking is Autosilo Valduce (5 min walk) or on-street along Viale Geno",
          "Best photo of the city: from the Funicolare station in Brunate, looking back down over the basin at dusk",
        ],
      },
      it: {
        name: "Como",
        blurb: "La città capoluogo e il nostro punto di partenza — Duomo, Funicolare, Villa Olmo.",
        metaTitle: "Como · Da dove parte ogni tour in barca sul Lago di Como",
        metaDesc:
          "Como è il capoluogo meridionale del Lago di Como e il punto di partenza naturale di ogni tour privato in barca. Breve guida alla città e al nostro pontile.",
        headline: "Como. <em>Da dove parte ogni tour del lago in barca.</em>",
        kicker: "Capoluogo sud-ovest · il nostro pontile · Duomo UNESCO · Funicolare per Brunate",
        paragraphs: [
          "Como è la città all'estremità sud del ramo occidentale del lago — la porta d'ingresso a tutto ciò per cui il Lago di Como è famoso. Duemila anni di storia (nasce come colonia romana nel 196 a.C.), incassata in un anello di montagne che si tuffano dritte nell'acqua, con un centro storico percorribile a piedi in venti minuti. Il nostro pontile si trova sul Lungolago Viale Geno, a cinque minuti a piedi da Piazza Cavour e dal Duomo.",
          "Cosa vedere in un'ora: il Duomo (una delle ultime cattedrali gotico-rinascimentali d'Italia), la Funicolare che sale a Brunate per la vista sul bacino, il museo della seta che racconta sette secoli di tessitura, e Villa Olmo — la villa neoclassica con giardini pubblici aperti nel 1815. La passeggiata sul lungolago da Piazza Cavour al Tempio Voltiano (dedicato al comasco Alessandro Volta) è il modo giusto per sentire la città.",
          "Da Como in barca il resto del lago si apre verso nord. In quindici minuti siete a Cernobbio e ai giardini di Villa d'Este. In quaranta siete a Villa Oleandra di George Clooney a Laglio. Il primo bacino cinematografico — dove Hollywood ha girato ogni scena celebre del lago — si attraversa nei primi trenta minuti di qualsiasi tour.",
        ],
        goodToKnow: [
          "Il nostro pontile: Lungolago Viale Geno, fronte civico 10 — 5 minuti a piedi da Piazza Cavour",
          "Parcheggio: il più vicino è l'Autosilo Valduce (5 min a piedi) o le strisce blu lungo Viale Geno",
          "La foto migliore della città: dalla stazione superiore della Funicolare a Brunate, guardando giù sul bacino all'imbrunire",
        ],
      },
      ru: {
        name: "Комо",
        blurb: "Главный город и наша точка отправления — Дуомо, фуникулёр, Вилла Ольмо.",
        metaTitle: "Комо · Где начинается каждая прогулка по озеру Комо на лодке",
        metaDesc:
          "Комо — южная столица озера Комо и естественная точка отправления любого частного тура на лодке. Краткий гид по городу и нашей пристани.",
        headline: "Комо. <em>Где начинается каждая прогулка по озеру.</em>",
        kicker: "Юго-западная столица · наша пристань · Дуомо · фуникулёр в Брунате",
        paragraphs: [
          "Комо — город на южной оконечности западного рукава озера, ворота ко всему, чем славится озеро Комо. Две тысячи лет истории (римская колония с 196 г. до н.э.), окружённый горами, спускающимися прямо к воде. Наша пристань — на Lungolago Viale Geno, в пяти минутах ходьбы от Piazza Cavour и мраморного Дуомо.",
          "За час осмотреть: Дуомо (одна из последних готико-ренессансных гибридных соборов Италии), Фуникулёр в Брунате с видом на бассейн, музей шёлка с семью веками истории, и Виллу Ольмо — неоклассическую виллу с публичными садами 1815 года.",
          "На лодке из Комо озеро раскрывается на север. Через пятнадцать минут — Черноббио и сады Виллы д'Эсте. Через сорок — Вилла Олеандра Джорджа Клуни в Лальо. Первый кинематографический бассейн, где Голливуд снимал все знаменитые сцены — у вас в первые тридцать минут любого тура.",
        ],
        goodToKnow: [
          "Наша пристань: Lungolago Viale Geno, fronte civico 10 — 5 минут пешком от Piazza Cavour",
          "Парковка: ближайшая — Autosilo Valduce (5 мин пешком)",
          "Лучшее фото города — с верхней станции фуникулёра в Брунате на закате",
        ],
      },
      ar: {
        name: "كومو",
        blurb: "المدينة الرئيسية ونقطة انطلاقنا — الكاتدرائية والقطار المعلّق وفيلا أولمو.",
        metaTitle: "كومو · حيث تبدأ كل جولة بالقارب على بحيرة كومو",
        metaDesc:
          "كومو هي العاصمة الجنوبية لبحيرة كومو ونقطة الانطلاق الطبيعية لأي جولة قارب خاصة. دليل قصير للمدينة ولرصيفنا.",
        headline: "كومو. <em>حيث تبدأ كل جولة بالقارب على البحيرة.</em>",
        kicker: "العاصمة الجنوبية الغربية · رصيف انطلاقنا · كاتدرائية الدومو · قطار معلّق إلى برونياتي",
        paragraphs: [
          "كومو هي المدينة في الطرف الجنوبي للذراع الغربي للبحيرة — البوابة إلى كل ما تشتهر به بحيرة كومو. تاريخ يعود إلى ألفي عام (مستعمرة رومانية منذ 196 ق.م.)، تحيط بها الجبال التي تنحدر مباشرة إلى الماء. رصيفنا في Lungolago Viale Geno على بُعد خمس دقائق سيراً من ميدان Piazza Cavour والكاتدرائية الرخامية.",
          "ما يمكن مشاهدته في ساعة: الكاتدرائية (واحدة من آخر كاتدرائيات إيطاليا بمزيج قوطي-رينسانس)، القطار المعلّق إلى برونياتي مع إطلالة على الحوض، متحف الحرير الذي يحكي سبعة قرون من النسيج، وفيلا أولمو الكلاسيكية الجديدة بحدائقها العامة المفتوحة منذ 1815.",
          "من كومو بالقارب تنفتح بقية البحيرة نحو الشمال. خلال خمس عشرة دقيقة تصلون إلى تشيرنوبيو وحدائق Villa d'Este. خلال أربعين دقيقة فيلا أوليندرا لجورج كلوني في لاليو. الحوض الأول السينمائي حيث صوّرت هوليوود كل المشاهد الشهيرة — في أول ثلاثين دقيقة من أي جولة.",
        ],
        goodToKnow: [
          "رصيفنا: Lungolago Viale Geno, fronte civico 10 — 5 دقائق سيراً من Piazza Cavour",
          "المواقف: الأقرب Autosilo Valduce (5 دقائق سيراً)",
          "أفضل صورة للمدينة: من المحطة العليا للقطار المعلق في برونياتي عند الغروب",
        ],
      },
    },
  },

  // ─── Bellagio ────────────────────────────────────────────────────
  {
    slug: "bellagio",
    pinId: "bellagio",
    image: "/images/attractions/bellagio.jpg",
    toursThatVisit: ["top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Bellagio",
        blurb: "The pearl of Lake Como — promontory village where the lake splits in two.",
        metaTitle: "Bellagio by Boat · The Pearl of Lake Como — Como Boat Rental",
        metaDesc:
          "Bellagio sits on the promontory where Lake Como splits into two arms. The way to arrive is by boat. A short guide and three private tours that drop you at the village pier.",
        headline: "Bellagio. <em>The pearl of Lake Como.</em>",
        kicker: "Promontory village · 30 km north of Como · 1h by boat",
        paragraphs: [
          "Bellagio is the village on the spur of land where Lake Como divides into the Como and Lecco arms. It's been the lake's most visited stop since the Romans built villas here, and the cobbled streets behind the harbour — Salita Mella, Salita Serbelloni — climb up to terraced restaurants with views over both arms at once.",
          "Arriving by boat is the way the village wants to be seen. The ferry from Varenna takes fifteen minutes; the public boat from Como takes ninety. A private tour takes about forty minutes from Como and drops you at one of the small piers below the Grand Hotel Villa Serbelloni, ten metres from the cobbled stairs that lead up to Piazza San Giacomo.",
          "Lunch in Bellagio is the natural midpoint of a half-day private tour. The two restaurants we book most often: Bilacus, a family-run trattoria one street back from the harbour with the best mountain-style polenta and missoltini; and Salice Blu, a higher-end seasonal kitchen on the steep street up to the church. Both keep tables for guests of our boats — tell us a day in advance which one and they'll be expecting you.",
        ],
        goodToKnow: [
          "1 hour ashore is enough for lunch and the main piazza; 2 hours if you also want to walk to Punta Spartivento",
          "Cars are difficult — Bellagio's streets are stairs, not roads. Boats arrive cleanly at the pier",
          "The best photo of Bellagio is taken from the water, not from the village — bring your camera ready",
        ],
      },
      it: {
        name: "Bellagio",
        blurb: "La perla del Lago di Como — borgo del promontorio dove il lago si divide.",
        metaTitle: "Bellagio in Barca · La Perla del Lago di Como — Como Boat Rental",
        metaDesc:
          "Bellagio si trova sul promontorio dove il Lago di Como si divide in due rami. Il modo per arrivarci è la barca. Una piccola guida e tre tour privati che vi portano al pontile.",
        headline: "Bellagio. <em>La perla del Lago di Como.</em>",
        kicker: "Borgo del promontorio · 30 km a nord di Como · 1h in barca",
        paragraphs: [
          "Bellagio è il borgo sulla lingua di terra dove il Lago di Como si divide nei rami di Como e di Lecco. È la sosta più frequentata del lago da quando i Romani vi costruirono le prime ville, e le vie acciottolate alle spalle del porto — Salita Mella, Salita Serbelloni — salgono fino a ristoranti su terrazze che guardano entrambi i rami contemporaneamente.",
          "Arrivare in barca è il modo in cui il borgo vuole essere visto. Il battello da Varenna impiega quindici minuti; il pubblico da Como ne impiega novanta. Un tour privato impiega circa quaranta minuti da Como e vi sbarca a uno dei piccoli pontili sotto il Grand Hotel Villa Serbelloni, a dieci metri dalle scale che portano in Piazza San Giacomo.",
          "Il pranzo a Bellagio è il punto di mezzo naturale di un tour privato di mezza giornata. I due ristoranti che prenotiamo più spesso: Bilacus, trattoria a conduzione familiare a una via dal porto, con la migliore polenta di montagna e i missoltini del lago; e Salice Blu, cucina stagionale di livello sulla salita verso la chiesa. Entrambi tengono un tavolo per gli ospiti delle nostre barche — diteci il giorno prima quale, e vi staranno aspettando.",
        ],
        goodToKnow: [
          "1 ora a terra è sufficiente per pranzo e la piazza principale; 2 ore se volete arrivare anche a Punta Spartivento",
          "L'auto è scomoda — le vie di Bellagio sono scale, non strade. La barca arriva direttamente al pontile",
          "La foto più bella di Bellagio si scatta dall'acqua, non dal borgo — preparate la macchina fotografica",
        ],
      },
      ru: {
        name: "Беладжо",
        blurb: "Жемчужина озера Комо — деревня на мысе, где озеро делится на два рукава.",
        metaTitle: "Беладжо на Лодке из Комо · Жемчужина Озера Комо",
        metaDesc:
          "Беладжо стоит на мысе, где озеро Комо разделяется на два рукава — лучший способ добраться это частная лодка из Комо. Сорок минут до причала, гид по обеду в Bilacus или Salice Blu, и соседняя Варенна на восточном берегу.",
        headline: "Беладжо. <em>Жемчужина озера Комо.</em>",
        kicker: "Деревня на мысе · 30 км к северу от Комо · 1 час на лодке",
        paragraphs: [
          "Беладжо — деревня на длинной полоске суши, где озеро Комо делится на два рукава: Комо и Лекко. Это самая посещаемая остановка на озере с тех пор, как древние римляне построили здесь свои виллы, и мощёные улочки за гаванью — Salita Mella, Salita Serbelloni — поднимаются к террасным ресторанам с видом сразу на оба рукава озера.",
          "Прибыть в Беладжо на лодке — это способ, которым деревня хочет, чтобы её увидели. Паром из Варенны занимает пятнадцать минут; общественный катер из Комо — девяносто. Частный тур на лодке из Комо занимает около сорока минут и высаживает вас у одного из небольших причалов под Grand Hotel Villa Serbelloni, в десяти метрах от мощёных ступеней, ведущих на Piazza San Giacomo.",
          "Обед в Беладжо — естественная середина полудневного тура на лодке по озеру Комо. Два ресторана, в которых мы бронируем чаще всего: Bilacus, семейная траттория в одной улице от гавани, с лучшей горной полентой и озёрным missoltini; и Salice Blu, сезонная кухня более высокого уровня на крутой улице к церкви. Оба держат столики для гостей наших лодок — сообщите за день, и вас будут ждать.",
        ],
        goodToKnow: [
          "1 час на берегу хватает на обед и главную площадь; 2 часа — если хотите дойти до Punta Spartivento",
          "Машина неудобна — улицы Беладжо это лестницы. Лодка же причаливает прямо у деревни",
          "Лучший снимок Беладжо — с воды, не из деревни. Подготовьте камеру",
        ],
      },
      ar: {
        name: "بيلاجيو",
        blurb: "لؤلؤة بحيرة كومو — قرية الرأس حيث تنقسم البحيرة إلى ذراعين.",
        metaTitle: "جولة بالقارب إلى بيلاجيو من كومو · لؤلؤة بحيرة كومو",
        metaDesc:
          "بيلاجيو تقع على الرأس حيث تنقسم بحيرة كومو إلى ذراعين — أفضل طريقة للوصول هي القارب الخاص من كومو. أربعون دقيقة إلى الرصيف، دليل غداء، وفارينا الجارة على الضفة الشرقية.",
        headline: "بيلاجيو. <em>لؤلؤة بحيرة كومو.</em>",
        kicker: "قرية الرأس · 30 كم شمال كومو · ساعة واحدة بالقارب",
        paragraphs: [
          "بيلاجيو قرية على شريط من اليابسة حيث تنقسم بحيرة كومو إلى ذراعَي كومو وليكو. كانت أكثر محطات البحيرة زيارة منذ بنى الرومان فيها فيلاتهم الأولى، والشوارع المرصوفة خلف المرفأ — Salita Mella وSalita Serbelloni — تصعد إلى مطاعم على شرفات تطلّ على ذراعَي البحيرة في الوقت نفسه.",
          "الوصول إلى بيلاجيو بالقارب هو الطريقة التي تستحقها القرية. العبّارة من فارينا تستغرق خمس عشرة دقيقة؛ والقارب العام من كومو تسعين دقيقة. الجولة الخاصة بالقارب تستغرق نحو أربعين دقيقة من كومو وتُنزلكم عند أحد الأرصفة الصغيرة تحت Grand Hotel Villa Serbelloni، على بعد عشرة أمتار من السلالم المرصوفة المؤدية إلى ساحة Piazza San Giacomo.",
          "الغداء في بيلاجيو هو نقطة المنتصف الطبيعية لجولة نصف يوم بالقارب على بحيرة كومو. المطعمان اللذان نحجز فيهما عادةً: Bilacus، تراتوريا عائلية على بُعد شارع من المرفأ تقدم أفضل بولينتا الجبل وميسولتيني البحيرة؛ وSalice Blu، مطبخ موسمي راقٍ على الشارع المنحدر نحو الكنيسة. كلاهما يحتفظان بطاولة لضيوف قواربنا — أخبرونا قبل يوم وستجدون استقبالكم.",
        ],
        goodToKnow: [
          "ساعة على الأرض تكفي للغداء والميدان الرئيسي؛ ساعتان إن أردتم الوصول إلى Punta Spartivento",
          "السيارة غير عملية — شوارع بيلاجيو سلالم. القارب يصل مباشرة إلى الرصيف",
          "أفضل صورة لبيلاجيو تُلتقط من الماء، لا من القرية. جهّزوا الكاميرا",
        ],
      },
    },
  },

  // ─── Villa del Balbianello ───────────────────────────────────────
  {
    slug: "villa-del-balbianello",
    pinId: "balbianello",
    image: "/images/attractions/villa-del-balbianello.jpg",
    toursThatVisit: ["balbianello-nesso", "top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Villa del Balbianello",
        blurb: "Casino Royale and Star Wars — the cinematic peninsula at Lenno.",
        metaTitle: "Villa del Balbianello by Boat · Casino Royale & Star Wars Set",
        metaDesc:
          "Villa del Balbianello sits on a peninsula at Lenno, the cinematic centrepiece of Lake Como. Casino Royale, Star Wars Episode II. The villa is best seen — and reached — by boat.",
        headline: "Villa del Balbianello. <em>The lake's cinematic centrepiece.</em>",
        kicker: "Peninsula at Lenno · 17th-century villa & gardens · best from the water",
        paragraphs: [
          "Villa del Balbianello is the most photographed villa on Lake Como, and the most filmed: Casino Royale (the 'Bond convalescing' scenes), Star Wars Episode II (the wedding of Anakin and Padmé), A Month by the Lake, and a long list of fashion editorials. The villa sits at the tip of the Dosso d'Avedo peninsula, a wooded promontory near Lenno on the western shore, and the only road to it is a fifteen-minute walk through the woods. The other way to arrive — and the way Daniel Craig arrives in the Bond film — is by boat.",
          "The villa was built in 1787 on the foundations of a 13th-century Franciscan monastery and donated to the FAI (Italian National Trust) in 1988 by its last owner, the explorer Guido Monzino. The gardens, built around the loggia at the tip of the peninsula, are the only ones on the lake that wrap a building on three sides — north, west and south — giving the cypress avenue and the view from the loggia the framing the films use.",
          "From the water you see the full façade with its loggia, the cypress avenue climbing to the gardens, and the small dock where Bond steps ashore. The captain holds the boat at the cinematic angle for ten minutes. If you'd like to disembark and walk the gardens, we drop you at the FAI dock and collect you 60–90 minutes later — the FAI ticket is €20 per adult and the gardens are open mid-March to mid-November, daily except Mondays and Wednesdays.",
        ],
        goodToKnow: [
          "FAI gardens open mid-March to mid-November · daily except Mondays & Wednesdays · 10:00–18:00",
          "Disembarkation requires a FAI ticket booked in advance (€20 adult, free for FAI members)",
          "If you skip the disembarkation, 10 minutes from the water is enough for the photo",
        ],
      },
      it: {
        name: "Villa del Balbianello",
        blurb: "Casino Royale e Star Wars — la penisola cinematografica di Lenno.",
        metaTitle: "Villa del Balbianello in Barca · Set di Casino Royale e Star Wars",
        metaDesc:
          "Villa del Balbianello si trova su una penisola a Lenno, il pezzo forte cinematografico del Lago di Como. Casino Royale, Star Wars Episodio II. Si vede al meglio dall'acqua.",
        headline: "Villa del Balbianello. <em>Il pezzo forte cinematografico del lago.</em>",
        kicker: "Penisola a Lenno · villa e giardini del Settecento · al meglio dall'acqua",
        paragraphs: [
          "Villa del Balbianello è la villa più fotografata del Lago di Como, e la più filmata: Casino Royale (la scena della convalescenza di Bond), Star Wars Episodio II (il matrimonio di Anakin e Padmé), A Month by the Lake, e una lunga lista di servizi di moda. La villa si trova all'estremità della penisola del Dosso d'Avedo, un promontorio boscoso vicino a Lenno sulla sponda occidentale, e l'unica strada per arrivarci è una camminata di quindici minuti nei boschi. L'altro modo — quello che usa Daniel Craig nel film di Bond — è la barca.",
          "La villa fu costruita nel 1787 sulle fondamenta di un monastero francescano del XIII secolo e donata al FAI (Fondo per l'Ambiente Italiano) nel 1988 dall'ultimo proprietario, l'esploratore Guido Monzino. I giardini, organizzati intorno alla loggia all'estremità della penisola, sono gli unici sul lago che avvolgono un edificio su tre lati — nord, ovest e sud — dando al viale di cipressi e alla vista dalla loggia l'inquadratura che i film usano.",
          "Dall'acqua si vede la facciata intera con la loggia, il viale di cipressi che sale verso i giardini, e il piccolo molo dove Bond sbarca. Lo skipper tiene la barca nell'angolazione cinematografica per dieci minuti. Se desiderate sbarcare e visitare i giardini, vi lasciamo al molo del FAI e vi recuperiamo dopo 60–90 minuti — biglietto FAI €20 per adulto, giardini aperti da metà marzo a metà novembre, ogni giorno tranne lunedì e mercoledì.",
        ],
        goodToKnow: [
          "Giardini FAI aperti da metà marzo a metà novembre · ogni giorno tranne lunedì e mercoledì · 10:00–18:00",
          "Lo sbarco richiede biglietto FAI prenotato in anticipo (€20 adulto, gratis soci FAI)",
          "Senza sbarco, 10 minuti dall'acqua bastano per la foto",
        ],
      },
      ru: {
        name: "Вилла Бальбьянелло",
        blurb: "Casino Royale и Star Wars — кинематографический полуостров в Ленно.",
        metaTitle: "Вилла Бальбьянелло на Лодке · Casino Royale и Star Wars",
        metaDesc:
          "Вилла Бальбьянелло на полуострове в Ленно — кинематографический центр озера Комо. Casino Royale, Star Wars Episode II.",
        headline: "Вилла дель Бальбьянелло. <em>Кинематографическая жемчужина озера Комо.</em>",
        kicker: "Полуостров в Ленно · вилла и сады XVIII века · лучший вид только с воды",
        paragraphs: [
          "Вилла дель Бальбьянелло — самая фотографируемая вилла озера Комо и самая снимаемая в кино: Casino Royale (сцены «выздоровления Бонда»), Star Wars Episode II (свадьба Энакина и Падме), A Month by the Lake и длинный список модных съёмок. Вилла стоит на оконечности полуострова Доссо д'Аведо, лесистого мыса возле Ленно на западном берегу, и единственная дорога к ней — пятнадцатиминутная пешая тропа через лес. Другой способ — тот, что использует Дэниел Крейг в фильме о Бонде — это лодка.",
          "Вилла была построена в 1787 году на фундаменте францисканского монастыря XIII века и подарена FAI (Итальянскому национальному фонду) в 1988 году её последним владельцем — исследователем Гвидо Монцино. Сады, разбитые вокруг лоджии на оконечности полуострова, единственные на озере, обнимающие здание с трёх сторон — севера, запада и юга, — что и даёт аллее кипарисов и виду из лоджии тот ракурс, который используют фильмы.",
          "С воды виден весь фасад с лоджией, аллея кипарисов, поднимающаяся к садам, и небольшой причал, у которого Бонд сходит на берег. Шкипер удерживает лодку в кинематографической точке десять минут. Если хотите высадиться и пройтись по садам, мы оставим вас у причала FAI и заберём через 60–90 минут — билет FAI €20 за взрослого, сады открыты с середины марта до середины ноября, ежедневно кроме понедельников и сред.",
        ],
        goodToKnow: [
          "Сады FAI открыты с середины марта до середины ноября · ежедневно кроме пн и ср · 10:00–18:00",
          "Высадка требует билет FAI, забронированный заранее (€20 за взрослого, бесплатно для членов FAI)",
          "Без высадки 10 минут с воды достаточно для фотографии",
        ],
      },
      ar: {
        name: "فيلا بالبيانيلو",
        blurb: "كازينو رويال وحرب النجوم — شبه الجزيرة السينمائية في لينو.",
        metaTitle: "فيلا دل بالبيانيلو بالقارب · موقع كازينو رويال وحرب النجوم",
        metaDesc:
          "فيلا دل بالبيانيلو على شبه جزيرة في لينو، التحفة السينمائية لبحيرة كومو. كازينو رويال وحرب النجوم: الجزء الثاني. تُرى أفضل ما يكون من الماء.",
        headline: "فيلا دل بالبيانيلو. <em>التحفة السينمائية لبحيرة كومو.</em>",
        kicker: "شبه جزيرة لينو · فيلا وحدائق من القرن الثامن عشر · أفضل من الماء",
        paragraphs: [
          "فيلا دل بالبيانيلو هي أكثر فيلا تم تصويرها على بحيرة كومو، وأكثرها استخداماً في السينما: كازينو رويال (مشاهد تعافي بوند)، حرب النجوم: الجزء الثاني (زفاف أناكين وبادمي)، A Month by the Lake، وقائمة طويلة من التحريرات الأزيائية. تقع الفيلا في طرف شبه جزيرة Dosso d'Avedo، رأس برّي مكسوّ بالأشجار قرب لينو على الضفة الغربية، والطريق الوحيد البرّي إليها هو ممرّ مشي مدته خمس عشرة دقيقة عبر الغابة. الطريقة الأخرى للوصول — وهي التي يستخدمها دانيال كريغ في فيلم بوند — هي القارب.",
          "بُنيت الفيلا عام 1787 على أساس دير فرنسيسكاني من القرن الثالث عشر، وأهداها مالكها الأخير المستكشف Guido Monzino إلى مؤسسة FAI الإيطالية عام 1988. الحدائق، المُنظَّمة حول اللوجيا في طرف شبه الجزيرة، هي الوحيدة على البحيرة التي تحتضن المبنى من ثلاث جهات — شمالاً وغرباً وجنوباً — وهو ما يمنح ممرّ السرو والمنظر من اللوجيا التأطير الذي تستخدمه الأفلام.",
          "من على متن القارب تشاهدون الواجهة الكاملة باللوجيا، ممرّ السرو الصاعد إلى الحدائق، والرصيف الصغير حيث ينزل بوند إلى البر. يثبّت الربان القارب في الزاوية السينمائية لمدة عشر دقائق. إذا رغبتم في النزول والتجوّل في الحدائق، نُنزلكم عند رصيف FAI ونعود لاصطحابكم بعد 60 إلى 90 دقيقة — تذكرة FAI €20 للبالغ، الحدائق مفتوحة من منتصف مارس إلى منتصف نوفمبر، يومياً ما عدا الإثنين والأربعاء.",
        ],
        goodToKnow: [
          "حدائق FAI مفتوحة من منتصف مارس إلى منتصف نوفمبر · يومياً ما عدا الإثنين والأربعاء · 10:00–18:00",
          "النزول يتطلب تذكرة FAI محجوزة مسبقاً (€20 للبالغ، مجاني لأعضاء FAI)",
          "بدون نزول، 10 دقائق من الماء تكفي للصورة",
        ],
      },
    },
  },

  // ─── Varenna ─────────────────────────────────────────────────────
  {
    slug: "varenna",
    pinId: "varenna",
    image: "/images/attractions/varenna.jpg",
    toursThatVisit: ["top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Varenna",
        blurb: "The east shore's quiet jewel — pastel houses and the Passeggiata degli Innamorati.",
        metaTitle: "Varenna by Boat · The Quieter East-Shore Village",
        metaDesc:
          "Varenna sits on Lake Como's eastern shore, opposite Bellagio. Smaller, quieter, and arguably the prettiest old town on the lake. Arrive by private boat from Como.",
        headline: "Varenna. <em>The east shore's quiet jewel.</em>",
        kicker: "East-shore village · across from Bellagio · 1h 15 by boat",
        paragraphs: [
          "Varenna is what visitors hope Bellagio still is. Smaller, quieter, with a pastel-painted lakefront walk — the Passeggiata degli Innamorati — that follows the water's edge from the ferry pier to the village square. The old town climbs up the hill behind, with stone alleys, a 12th-century church, and the ruins of Castello di Vezio with views over both lakes.",
          "It's roughly an hour and fifteen minutes from Como by private boat, and the most pleasant way to combine it with Bellagio: drop in Varenna for the morning, ferry across to Bellagio for lunch (the public ferry takes fifteen minutes), and we collect you at Bellagio in the afternoon. Or invert it. Both villages are at their best with the late-afternoon light, so we time the eastern stop accordingly.",
          "For lunch in Varenna we book Ristorante La Vista, perched on the road above the village with the best terrace view of the lake on the eastern shore. Quieter and more local than the equivalents in Bellagio, with a kitchen that does pesce in carpione well.",
        ],
        goodToKnow: [
          "Smaller than Bellagio — 90 minutes ashore covers the village comfortably",
          "Castello di Vezio is a 20-minute walk up; skip if you have less than 90 minutes",
          "The lakefront walk (Passeggiata degli Innamorati) is the prettiest minute on the lake",
        ],
      },
      it: {
        name: "Varenna",
        blurb: "Il gioiello tranquillo della sponda est — case pastello e Passeggiata degli Innamorati.",
        metaTitle: "Varenna in Barca · Il Borgo Silenzioso della Sponda Est",
        metaDesc:
          "Varenna si trova sulla sponda orientale del Lago di Como, di fronte a Bellagio. Più piccola, più tranquilla, e forse il borgo storico più bello del lago.",
        headline: "Varenna. <em>Il gioiello tranquillo della sponda est.</em>",
        kicker: "Borgo di sponda est · di fronte a Bellagio · 1h 15 in barca",
        paragraphs: [
          "Varenna è quello che i visitatori sperano che Bellagio sia ancora. Più piccola, più tranquilla, con una passeggiata sul lago — la Passeggiata degli Innamorati — che segue il bordo dell'acqua dal pontile dei traghetti fino alla piazza del paese. Il borgo storico sale sulla collina dietro, con vicoli di pietra, una chiesa del XII secolo e i resti del Castello di Vezio da cui si vedono entrambi i rami.",
          "È a circa un'ora e un quarto da Como in barca privata. Il modo più piacevole di abbinarla a Bellagio: sosta a Varenna la mattina, traghetto verso Bellagio per il pranzo (il battello pubblico impiega quindici minuti), e vi recuperiamo a Bellagio il pomeriggio. Oppure invertendo. Entrambi i borghi sono al meglio con la luce tardo-pomeridiana, quindi sincronizziamo la sosta orientale di conseguenza.",
          "Per il pranzo a Varenna prenotiamo Ristorante La Vista, sopra il paese con la migliore terrazza panoramica della sponda est. Più tranquillo e più locale degli equivalenti a Bellagio, con una cucina che riesce molto bene nel pesce in carpione.",
        ],
        goodToKnow: [
          "Più piccola di Bellagio — 90 minuti a terra coprono comodamente il borgo",
          "Il Castello di Vezio è 20 minuti a piedi in salita; saltatelo se avete meno di 90 minuti",
          "La Passeggiata degli Innamorati è il minuto più bello del lago",
        ],
      },
      ru: {
        name: "Варенна",
        blurb: "Тихая жемчужина восточного берега — пастельные дома и Passeggiata degli Innamorati.",
        metaTitle: "Варенна на Лодке из Комо · Тихая Жемчужина Восточного Берега",
        metaDesc:
          "Варенна на восточном берегу озера Комо, напротив Беладжо. Меньше, тише, с самой красивой набережной озера — Passeggiata degli Innamorati. Час пятнадцать из Комо на частной лодке, обед в Ristorante La Vista.",
        headline: "Варенна. <em>Тихая жемчужина восточного берега.</em>",
        kicker: "Деревня восточного берега · напротив Беладжо · 1 ч 15 мин на лодке",
        paragraphs: [
          "Варенна — это то, чем гости надеются, что Беладжо всё ещё является. Меньше, тише, с пастельной набережной — Passeggiata degli Innamorati — которая идёт вдоль воды от паромного причала до площади деревни. Старый город поднимается на холм за ней: каменные переулки, церковь XII века и руины Castello di Vezio с видом сразу на оба рукава озера Комо.",
          "Это примерно час и пятнадцать минут от Комо на частной лодке. И самый приятный способ совместить с Беладжо: высадка в Варенне утром, паром в Беладжо на обед (общественный паром между ними идёт пятнадцать минут), и мы забираем вас в Беладжо во второй половине дня. Или наоборот. Обе деревни лучше всего смотрятся в позднем послеобеденном свете, поэтому мы синхронизируем восточную остановку соответствующим образом.",
          "На обед в Варенне мы бронируем Ristorante La Vista, расположенный на дороге над деревней с лучшим видом с террасы на восточный берег озера Комо. Тише и более локальный, чем эквиваленты в Беладжо, с кухней, особенно хорошо удающейся pesce in carpione.",
        ],
        goodToKnow: [
          "Меньше Беладжо — 90 минут на берегу комфортно покрывают деревню",
          "Castello di Vezio — 20 минут в гору; пропустите, если у вас меньше 90 минут",
          "Прогулка вдоль воды (Passeggiata degli Innamorati) — самая красивая минута на озере",
        ],
      },
      ar: {
        name: "فارينا",
        blurb: "جوهرة الضفة الشرقية الهادئة — منازل باستيل وممشى العشّاق.",
        metaTitle: "جولة بالقارب إلى فارينا · جوهرة الضفة الشرقية لبحيرة كومو",
        metaDesc:
          "فارينا تقع على الضفة الشرقية لبحيرة كومو، مقابل بيلاجيو. أصغر وأهدأ، مع أجمل ممشى على البحيرة — Passeggiata degli Innamorati. ساعة وربع من كومو على متن قارب خاص، غداء في Ristorante La Vista.",
        headline: "فارينا. <em>جوهرة الضفة الشرقية الهادئة.</em>",
        kicker: "قرية الضفة الشرقية · مقابل بيلاجيو · 1:15 بالقارب",
        paragraphs: [
          "فارينا هي ما يأمل الزوار أن تظل بيلاجيو عليه. أصغر وأهدأ، مع ممشى ساحلي بألوان الباستيل — Passeggiata degli Innamorati — يتبع حافة الماء من رصيف العبّارة إلى ساحة القرية. ترتفع البلدة القديمة على التل خلفها بأزقّة حجرية وكنيسة من القرن الثاني عشر وأطلال Castello di Vezio التي تطلّ على ذراعَي بحيرة كومو معاً.",
          "تستغرق الجولة نحو ساعة وربع من كومو على متن قارب خاص. وأكثر طريقة ممتعة للجمع بين فارينا وبيلاجيو: نُنزلكم في فارينا صباحاً، تنتقلون بالعبّارة إلى بيلاجيو للغداء (العبّارة العامة بين الضفتين تستغرق خمس عشرة دقيقة)، ونعود لاصطحابكم من بيلاجيو بعد الظهر. أو العكس. كلتا القريتين في أبهى صورة لهما تحت ضوء العصر، فنوقّت المحطة الشرقية وفقاً لذلك.",
          "للغداء في فارينا نحجز Ristorante La Vista، المُطلّ على الطريق فوق القرية ويتمتع بأفضل إطلالة من تراس على الضفة الشرقية لبحيرة كومو. أهدأ وأكثر محلية من نظرائه في بيلاجيو، بمطبخ يُتقن خصوصاً صحن pesce in carpione السمكي.",
        ],
        goodToKnow: [
          "أصغر من بيلاجيو — 90 دقيقة على الأرض تغطي القرية بكل راحة",
          "قلعة Castello di Vezio على بُعد 20 دقيقة سيراً صعوداً؛ تخطّوها إن كان لديكم أقل من 90 دقيقة",
          "ممشى Passeggiata degli Innamorati هو أجمل دقيقة على البحيرة",
        ],
      },
    },
  },

  // ─── Villa Carlotta ──────────────────────────────────────────────
  {
    slug: "villa-carlotta",
    pinId: "carlotta",
    image: "/images/attractions/carlotta.jpg",
    toursThatVisit: ["top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Villa Carlotta",
        blurb: "Botanical jewel — five hundred azaleas in bloom from April to June.",
        metaTitle: "Villa Carlotta by Boat · The Lake's Most Colourful Gardens",
        metaDesc:
          "Villa Carlotta in Tremezzo: an 18th-century palace with botanical gardens descending to the water. The most colourful villa on Lake Como from April to June.",
        headline: "Villa Carlotta. <em>The lake's botanical jewel.</em>",
        kicker: "Tremezzo · 18th-century villa & 70,000-square-metre gardens",
        paragraphs: [
          "Villa Carlotta sits on the western shore at Tremezzo, looking across to Bellagio. Built in 1690 for the Milanese banker Giorgio Clerici, then bought in the 19th century by Princess Marianna of Nassau as a wedding gift for her daughter Charlotte (hence the name), the villa is best known not for its art collection but for its gardens — seven hectares descending from the house to the lake, planted with five hundred species of azalea, rhododendron and camellia.",
          "From mid-April to mid-June the slope is in full bloom and the villa is the most colourful place on the lake. From the water the gardens fill the frame, with the pale-pink villa at the top and the ranks of azalea on the lawns below. The captain pauses for the photograph.",
          "Disembarkation is straightforward — Villa Carlotta has its own small dock and the entrance is at the dock-side ticket office. €12 per adult; the visit is unhurried at 90 minutes. We hold the boat or come back for you at the agreed time.",
        ],
        goodToKnow: [
          "Gardens at peak from mid-April to mid-June",
          "Entry €12 · open daily 9:30–18:00 from late March to early November",
          "Allow 90 minutes for the gardens; the art collection inside the villa is small but worthwhile",
        ],
      },
      it: {
        name: "Villa Carlotta",
        blurb: "Gioiello botanico — cinquecento azalee in fiore da aprile a giugno.",
        metaTitle: "Villa Carlotta in Barca · I Giardini Più Colorati del Lago",
        metaDesc:
          "Villa Carlotta a Tremezzo: palazzo del Settecento con giardini botanici che scendono fino al lago. La villa più colorata del Lago di Como da aprile a giugno.",
        headline: "Villa Carlotta. <em>Il gioiello botanico del lago.</em>",
        kicker: "Tremezzo · villa del Settecento e giardini di 70.000 m²",
        paragraphs: [
          "Villa Carlotta si trova sulla sponda occidentale a Tremezzo, di fronte a Bellagio. Costruita nel 1690 per il banchiere milanese Giorgio Clerici, poi acquistata nell'Ottocento dalla Principessa Marianna di Nassau come regalo di nozze per la figlia Carlotta (da cui il nome), la villa è famosa non tanto per la sua collezione d'arte quanto per i giardini — sette ettari che scendono dalla casa al lago, con cinquecento specie di azalee, rododendri e camelie.",
          "Da metà aprile a metà giugno il pendio è in piena fioritura e la villa è il luogo più colorato del lago. Dall'acqua i giardini riempiono l'inquadratura, con la villa rosa pallido in alto e le file di azalee sui prati sotto. Lo skipper si ferma per la foto.",
          "Lo sbarco è semplice — Villa Carlotta ha un proprio piccolo molo e l'ingresso è alla biglietteria sul pontile. €12 per adulto; la visita è tranquilla in 90 minuti. Aspettiamo la barca o torniamo a prendervi all'orario concordato.",
        ],
        goodToKnow: [
          "Giardini al massimo da metà aprile a metà giugno",
          "Ingresso €12 · aperto ogni giorno 9:30–18:00 da fine marzo a inizio novembre",
          "Calcolate 90 minuti per i giardini; la collezione d'arte interna è piccola ma ne vale la pena",
        ],
      },
      ru: {
        name: "Вилла Карлотта",
        blurb: "Ботаническая жемчужина — пятьсот азалий в цвету с апреля по июнь.",
        metaTitle: "Вилла Карлотта на Лодке · Сады Азалий на Озере Комо",
        metaDesc:
          "Вилла Карлотта в Тремеццо: дворец 1690 года с ботаническими садами, спускающимися к воде. Самая красочная вилла озера Комо с середины апреля до середины июня. Высадка возможна с билетом €12.",
        headline: "Вилла Карлотта. <em>Ботаническая жемчужина озера Комо.</em>",
        kicker: "Тремеццо · вилла XVIII века и сады 70 000 м²",
        paragraphs: [
          "Вилла Карлотта стоит на западном берегу в Тремеццо, напротив Беладжо. Построена в 1690 году для миланского банкира Джорджо Клеричи, затем приобретена в XIX веке принцессой Марианной Нассау как свадебный подарок дочери Шарлотте (отсюда и название), вилла известна не столько своей коллекцией искусства, сколько садами — семь гектаров, спускающихся от дома к озеру, засаженных пятью сотнями видов азалий, рододендронов и камелий.",
          "С середины апреля до середины июня склон в полном цветении, и вилла становится самым красочным местом на озере Комо. С воды сады заполняют кадр: бледно-розовая вилла наверху и ряды азалий на лужайках внизу. Шкипер делает паузу для фотографии.",
          "Высадка проста — у Виллы Карлотта свой небольшой причал, и вход с билетной кассой расположен прямо на нём. €12 за взрослого; визит спокойно укладывается в 90 минут. Мы держим лодку или возвращаемся за вами в согласованное время.",
        ],
        goodToKnow: [
          "Сады в пике цветения с середины апреля до середины июня",
          "Вход €12 · ежедневно 9:30–18:00 с конца марта до начала ноября",
          "Закладывайте 90 минут на сады; коллекция искусства внутри виллы небольшая, но достойная",
        ],
      },
      ar: {
        name: "فيلا كارلوتا",
        blurb: "جوهرة نباتية — خمسمئة من الأزاليا في إزهارها من أبريل إلى يونيو.",
        metaTitle: "فيلا كارلوتا بالقارب · حدائق الأزاليا على بحيرة كومو",
        metaDesc:
          "فيلا كارلوتا في تريميتسو: قصر من عام 1690 بحدائق نباتية تنحدر إلى الماء. أكثر الفيلات لوناً على بحيرة كومو من منتصف أبريل إلى منتصف يونيو. النزول ممكن بتذكرة €12.",
        headline: "فيلا كارلوتا. <em>الجوهرة النباتية لبحيرة كومو.</em>",
        kicker: "تريميتسو · فيلا القرن الثامن عشر وحدائق 70,000 م²",
        paragraphs: [
          "فيلا كارلوتا تقع على الضفة الغربية في تريميتسو مُطلّةً على بيلاجيو. بُنيت عام 1690 للمصرفي الميلاني Giorgio Clerici، ثم اشترتها في القرن التاسع عشر الأميرة ماريانا من ناساو هدية زفاف لابنتها شارلوت (ومن هنا الاسم). الفيلا مشهورة لا بمجموعتها الفنية بقدر ما هي مشهورة بحدائقها — سبعة هكتارات تنحدر من المنزل إلى البحيرة، مزروعة بخمسمئة نوع من الأزاليا والرودودندرون والكاميليا.",
          "من منتصف أبريل إلى منتصف يونيو يكون المنحدر في كامل إزهاره، وتغدو الفيلا أكثر الأماكن لوناً على بحيرة كومو. من الماء تملأ الحدائق الإطار: الفيلا بلون الوردي الباهت في الأعلى وصفوف الأزاليا على المروج تحت. يتوقف الربّان للصورة.",
          "النزول سهل — لفيلا كارلوتا رصيف خاص صغير، وشباك التذاكر يقع عند الرصيف نفسه. €12 للبالغ؛ الزيارة تستغرق 90 دقيقة براحة. نُبقي القارب أو نعود لاصطحابكم في الوقت المتفق عليه.",
        ],
        goodToKnow: [
          "ذروة الإزهار من منتصف أبريل إلى منتصف يونيو",
          "الدخول €12 · يومياً 9:30–18:00 من أواخر مارس إلى أوائل نوفمبر",
          "خصصوا 90 دقيقة للحدائق؛ المجموعة الفنية داخل الفيلا صغيرة لكنها تستحق الزيارة",
        ],
      },
    },
  },

  // ─── Isola Comacina ──────────────────────────────────────────────
  {
    slug: "isola-comacina",
    pinId: "isola_comacina",
    image: "/images/attractions/isola-comacina.jpg",
    toursThatVisit: ["top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Isola Comacina",
        blurb: "The only island on Lake Como — overgrown ruins, a single iconic restaurant.",
        metaTitle: "Isola Comacina by Boat · The Only Island on Lake Como",
        metaDesc:
          "Isola Comacina is Lake Como's only island — a wooded outcrop with Romanesque ruins, one legendary restaurant, and a back story that runs from Byzantium to a 1169 razing.",
        headline: "Isola Comacina. <em>The lake's only island.</em>",
        kicker: "Lenno basin · 600 metres long · Lokanda Comacina restaurant · ruins of seven churches",
        paragraphs: [
          "Isola Comacina is the only island on Lake Como, a 600-metre slip of land in the bay opposite Ossuccio. It looks small from the water but holds more history than most lakefront towns combined: a Byzantine refuge in the 6th century, a haven for the city of Como during Milan's wars in the 12th century, and the site of a 1169 razing so total that no one was allowed to rebuild on the island for 600 years.",
          "Today the island is a nature reserve. The ruins of seven churches — including the 5th-century Basilica of Sant'Eufemia and the Romanesque San Giovanni — are scattered among the trees, with stone footpaths connecting them. The Lokanda Comacina restaurant sits at the southern tip and has served the same nine-course meal since 1947, ending with the firing of the Maledizione dei Frati (Friars' Curse) flaming ritual.",
          "From the water you see the wooded silhouette, the long stone jetty, and the white belltower of the Lokanda peeking through the cypresses. The captain holds the boat off the south shore where the basilica ruins meet the water — the angle the postcards use.",
        ],
        goodToKnow: [
          "Disembarkation is possible via the public ferry from Ossuccio (€6 round-trip; private boats can't dock)",
          "Lokanda Comacina lunch: 12:00 sitting only, booking essential, ~€90 per person all-in (locandacomacina.it)",
          "Best month to see the ruins: April and May, before the foliage closes in",
        ],
      },
      it: {
        name: "Isola Comacina",
        blurb: "L'unica isola del Lago di Como — rovine selvagge e un solo ristorante leggendario.",
        metaTitle: "Isola Comacina in Barca · L'Unica Isola del Lago di Como",
        metaDesc:
          "L'Isola Comacina è l'unica isola del Lago di Como — uno scoglio boscoso con rovine romaniche, un solo ristorante leggendario, e una storia che corre da Bisanzio alla distruzione del 1169.",
        headline: "Isola Comacina. <em>L'unica isola del lago.</em>",
        kicker: "Bacino di Lenno · 600 metri di lunghezza · Locanda Comacina · rovine di sette chiese",
        paragraphs: [
          "L'Isola Comacina è l'unica isola del Lago di Como, una lingua di terra di 600 metri nella baia di fronte a Ossuccio. Dall'acqua sembra piccola ma porta più storia di molti borghi del lago messi insieme: rifugio bizantino nel VI secolo, asilo per la città di Como durante le guerre con Milano nel XII secolo, e teatro di una distruzione nel 1169 così totale che per 600 anni nessuno ebbe il permesso di ricostruire.",
          "Oggi l'isola è una riserva naturale. Le rovine di sette chiese — tra cui la Basilica di Sant'Eufemia del V secolo e la romanica San Giovanni — sono disseminate tra gli alberi, collegate da sentieri di pietra. La Locanda Comacina si trova all'estremità sud e serve lo stesso menu di nove portate dal 1947, che si chiude con il rito della Maledizione dei Frati.",
          "Dall'acqua si vede la sagoma boscosa, il lungo molo di pietra e il campanile bianco della Locanda che spunta tra i cipressi. Lo skipper tiene la barca al largo della sponda sud dove le rovine della basilica incontrano l'acqua — l'angolo delle cartoline.",
        ],
        goodToKnow: [
          "Sbarco possibile via traghetto pubblico da Ossuccio (€6 a/r; le barche private non possono attraccare)",
          "Pranzo alla Locanda Comacina: solo sessione delle 12:00, prenotazione obbligatoria, ~€90 a persona tutto compreso (locandacomacina.it)",
          "Mese migliore per vedere le rovine: aprile e maggio, prima che la vegetazione si chiuda",
        ],
      },
      ru: {
        name: "Изола Комачина",
        blurb: "Единственный остров на озере Комо — заросшие руины и один легендарный ресторан.",
        metaTitle: "Изола Комачина на Лодке · Единственный Остров Озера Комо",
        metaDesc:
          "Изола Комачина — единственный остров озера Комо: лесистый клочок суши с романскими руинами, одним легендарным рестораном и историей от Византии до разрушения 1169 года.",
        headline: "Изола Комачина. <em>Единственный остров озера.</em>",
        kicker: "Бассейн Ленно · 600 метров · ресторан Locanda Comacina · руины семи церквей",
        paragraphs: [
          "Изола Комачина — единственный остров на озере Комо, полоска суши 600 метров в бухте напротив Оссуччо. С воды кажется небольшой, но хранит больше истории, чем многие прибрежные города: византийское убежище в VI веке, убежище для города Комо в войнах с Миланом XII века, и место такого разрушения в 1169 году, что 600 лет никто не имел права здесь строить.",
          "Сегодня остров — природный заповедник. Руины семи церквей, включая базилику Сант'Эуфемии V века и романскую Сан Джованни, разбросаны среди деревьев и соединены каменными тропами. Locanda Comacina на южной оконечности подаёт то же меню из девяти блюд с 1947 года, заканчивающееся ритуалом «Проклятия монахов».",
          "С воды виден лесистый силуэт, длинный каменный пирс и белая колокольня Locanda между кипарисами. Шкипер удерживает лодку у южного берега, где руины базилики встречаются с водой.",
        ],
        goodToKnow: [
          "Высадка возможна общественным паромом из Оссуччо (€6 туда-обратно; частные лодки не могут причалить)",
          "Обед в Locanda Comacina: только сеанс в 12:00, бронь обязательна, ~€90 с человека (locandacomacina.it)",
          "Лучший месяц для руин: апрель–май, до того как зарастёт листвой",
        ],
      },
      ar: {
        name: "إيزولا كوماتشينا",
        blurb: "الجزيرة الوحيدة على بحيرة كومو — أطلال متشابكة ومطعم أسطوري واحد.",
        metaTitle: "إيزولا كوماتشينا بالقارب · الجزيرة الوحيدة على بحيرة كومو",
        metaDesc:
          "إيزولا كوماتشينا هي الجزيرة الوحيدة على بحيرة كومو — جزيرة مشجّرة فيها أطلال رومانية ومطعم أسطوري واحد وقصة تمتدّ من بيزنطة إلى دمار 1169.",
        headline: "إيزولا كوماتشينا. <em>الجزيرة الوحيدة على البحيرة.</em>",
        kicker: "حوض لينو · 600 متر طولاً · مطعم Locanda Comacina · أطلال سبع كنائس",
        paragraphs: [
          "إيزولا كوماتشينا هي الجزيرة الوحيدة على بحيرة كومو، شريط من اليابسة طوله 600 متر في الخليج المقابل لأوسوكيو. تبدو صغيرة من الماء لكنها تحمل تاريخاً أكثر من كثير من بلدات البحيرة مجتمعة: ملاذ بيزنطي في القرن السادس، ملجأ لمدينة كومو خلال حروبها مع ميلانو في القرن الثاني عشر، وموقع تدمير عام 1169 شامل لدرجة أنه مُنع البناء عليها لـ 600 عام.",
          "اليوم الجزيرة محمية طبيعية. تتناثر أطلال سبع كنائس — بينها كنيسة Sant'Eufemia من القرن الخامس وSan Giovanni الرومانية — بين الأشجار وتربطها مسارات حجرية. مطعم Locanda Comacina في الطرف الجنوبي يقدم نفس قائمة الأطباق التسعة منذ 1947، ينتهي بطقس 'لعنة الرهبان'.",
          "من الماء يظهر الظلّ المشجّر والرصيف الحجري الطويل وبرج الجرس الأبيض للـLocanda بين أشجار السرو. يثبّت الربان القارب قبالة الضفة الجنوبية حيث تلتقي أطلال الكنيسة بالماء.",
        ],
        goodToKnow: [
          "النزول ممكن عبر عبّارة عامة من أوسوكيو (€6 ذهاباً وإياباً؛ القوارب الخاصة لا ترسو)",
          "غداء Locanda Comacina: جلسة الساعة 12:00 فقط، الحجز إلزامي، ~€90 للشخص شامل (locandacomacina.it)",
          "أفضل شهر لرؤية الأطلال: أبريل ومايو قبل أن تتكاثف النباتات",
        ],
      },
    },
  },

  // ─── Villa La Cassinella ─────────────────────────────────────────
  {
    slug: "villa-la-cassinella",
    pinId: "cassinella",
    image: "/images/attractions/cassinella.jpg",
    toursThatVisit: ["top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Villa La Cassinella",
        blurb: "The most exclusive private villa on the lake — Branson, Madonna, the A-list.",
        metaTitle: "Villa La Cassinella by Boat · Lake Como's Most Exclusive Estate",
        metaDesc:
          "Villa La Cassinella sits in a private bay on Lake Como, rented exclusively to a single party at a time. Branson, Madonna, the A-list. See it from the water.",
        headline: "Villa La Cassinella. <em>The lake's most exclusive estate.</em>",
        kicker: "Lenno peninsula · private rental from £100,000 / week · seen only from the water",
        paragraphs: [
          "Villa La Cassinella sits in a private bay on the Lenno peninsula, a short stone's throw from Villa del Balbianello and barely visible from the road. Owned by the Bulgari-Diane heir, it is rented out as a single-party estate — you take the entire villa, staff, boats and grounds. Past renters include Richard Branson, Madonna, Justin Bieber, and most of the Hollywood A-list. The rate is roughly £100,000 per week in high season.",
          "From the water the villa rises in three terraces from a private quay, with century-old cedars framing the main façade. The captain takes the boat to the outer edge of the bay where the framing is best. We don't approach the dock — Cassinella is genuinely private and guests staying there value the seclusion as much as the building.",
          "If your trip is the trip of a lifetime, ask your captain about combining Cassinella with Villa del Balbianello and Villa Carlotta in the same morning — the three villas form the trio that defines luxury Lake Como.",
        ],
        goodToKnow: [
          "Strictly seen from the water — no public access of any kind",
          "Best month to view it: October, when the cedars and the surrounding chestnut groves turn",
          "Booking the villa itself: enquiries via thethinkinghouse.com or ultimateluxurychalets.com",
        ],
      },
      it: {
        name: "Villa La Cassinella",
        blurb: "La villa privata più esclusiva del lago — Branson, Madonna, la A-list.",
        metaTitle: "Villa La Cassinella in Barca · La Villa Più Esclusiva del Lago di Como",
        metaDesc:
          "Villa La Cassinella si trova in una baia privata sul Lago di Como, affittata a una sola famiglia per volta. Branson, Madonna, la A-list. Si vede dall'acqua.",
        headline: "Villa La Cassinella. <em>La villa più esclusiva del lago.</em>",
        kicker: "Penisola di Lenno · affitto privato da £100.000 / settimana · solo dall'acqua",
        paragraphs: [
          "Villa La Cassinella si trova in una baia privata sulla penisola di Lenno, a poche centinaia di metri da Villa del Balbianello e appena visibile dalla strada. Proprietà dell'erede Bulgari-Diane, è affittata come tenuta esclusiva — l'intera villa, lo staff, le barche e i terreni a un solo gruppo per volta. Affittatari passati includono Richard Branson, Madonna, Justin Bieber e gran parte della Hollywood A-list. La tariffa è di circa £100.000 a settimana in alta stagione.",
          "Dall'acqua la villa si alza su tre terrazze da un molo privato, con cedri centenari che incorniciano la facciata principale. Lo skipper porta la barca al limite esterno della baia dove l'inquadratura è migliore. Non ci avviciniamo al molo — Cassinella è veramente privata e gli ospiti che vi soggiornano valorizzano la riservatezza tanto quanto l'edificio.",
          "Se il vostro viaggio è il viaggio della vita, chiedete allo skipper di combinare Cassinella con Villa del Balbianello e Villa Carlotta nella stessa mattinata — le tre ville formano il trio che definisce il lusso del Lago di Como.",
        ],
        goodToKnow: [
          "Visibile solo dall'acqua — nessun accesso pubblico di alcun tipo",
          "Mese migliore per vederla: ottobre, quando i cedri e i castagneti circostanti virano",
          "Per affittare la villa stessa: enquiries via thethinkinghouse.com o ultimateluxurychalets.com",
        ],
      },
      ru: {
        name: "Вилла Ла Кассинелла",
        blurb: "Самая эксклюзивная частная вилла озера — Брэнсон, Мадонна, A-лист.",
        metaTitle: "Вилла Ла Кассинелла на Лодке · Самое Эксклюзивное Поместье Озера Комо",
        metaDesc:
          "Вилла Ла Кассинелла в частной бухте озера Комо, сдаётся одной семье за раз. Брэнсон, Мадонна, A-лист. Видна только с воды.",
        headline: "Вилла Ла Кассинелла. <em>Самое эксклюзивное поместье озера.</em>",
        kicker: "Полуостров Ленно · аренда от £100,000/неделя · только с воды",
        paragraphs: [
          "Вилла Ла Кассинелла находится в частной бухте на полуострове Ленно, в нескольких сотнях метров от Виллы дель Бальбьянелло и едва заметна с дороги. Принадлежит наследнице Bulgari-Diane, сдаётся как эксклюзивное поместье — вся вилла, персонал, лодки и территория одной группе за раз. Среди прошлых арендаторов — Ричард Брэнсон, Мадонна, Джастин Бибер и большая часть Hollywood A-list. Стоимость около £100,000 в неделю в высокий сезон.",
          "С воды вилла поднимается тремя террасами от частного причала, с вековыми кедрами, обрамляющими главный фасад. Шкипер выводит лодку к краю бухты, где композиция лучшая. Мы не приближаемся к причалу — Кассинелла действительно частная, и её гости ценят уединение не меньше самого здания.",
          "Если ваша поездка — это поездка жизни, попросите шкипера объединить Кассинеллу с Виллой Бальбьянелло и Виллой Карлотта в одно утро — это трио определяет роскошь озера Комо.",
        ],
        goodToKnow: [
          "Видна только с воды — никакого публичного доступа",
          "Лучший месяц для просмотра: октябрь, когда кедры и каштаны меняют цвет",
          "Аренда самой виллы: enquiries через thethinkinghouse.com или ultimateluxurychalets.com",
        ],
      },
      ar: {
        name: "فيلا لا كاسينيلا",
        blurb: "أكثر فيلا خاصة حصرية على البحيرة — برانسون ومادونا ونجوم الصف الأول.",
        metaTitle: "فيلا لا كاسينيلا بالقارب · أكثر عقار حصرية على بحيرة كومو",
        metaDesc:
          "فيلا لا كاسينيلا في خليج خاص على بحيرة كومو، تُؤجَّر حصرياً لمجموعة واحدة في وقت واحد. برانسون ومادونا والصف الأول. تُرى من الماء.",
        headline: "فيلا لا كاسينيلا. <em>أكثر عقار حصرية على البحيرة.</em>",
        kicker: "شبه جزيرة لينو · إيجار خاص من £100,000 أسبوعياً · من الماء فقط",
        paragraphs: [
          "فيلا لا كاسينيلا تقع في خليج خاص على شبه جزيرة لينو، على مسافة قصيرة من فيلا دل بالبيانيلو وبالكاد تُرى من الطريق. مملوكة لوريثة Bulgari-Diane، وتُؤجَّر كعقار حصري — الفيلا كاملة والطاقم والقوارب والأرض لمجموعة واحدة في وقت واحد. من المستأجرين السابقين ريتشارد برانسون ومادونا وجستن بيبر ومعظم نجوم الصف الأول. السعر حوالي £100,000 أسبوعياً في الموسم العالي.",
          "من الماء ترتفع الفيلا على ثلاثة شرفات من رصيف خاص، مع أشجار أرز عمرها قرون تؤطر الواجهة الرئيسية. يأخذ الربان القارب إلى الحافة الخارجية للخليج حيث الإطار أفضل. لا نقترب من الرصيف — كاسينيلا خاصة فعلاً، وضيوفها يقدّرون العزلة بقدر المبنى نفسه.",
          "إذا كانت رحلتكم رحلة العمر، اطلبوا من الربان جمع كاسينيلا مع فيلا دل بالبيانيلو وفيلا كارلوتا في صباح واحد — الثلاثي الذي يحدد فخامة بحيرة كومو.",
        ],
        goodToKnow: [
          "تُرى من الماء فقط — لا وصول عام بأي شكل",
          "أفضل شهر لمشاهدتها: أكتوبر حين تتحوّل ألوان شجر الأرز والكستناء حولها",
          "لتأجير الفيلا نفسها: استفسارات عبر thethinkinghouse.com أو ultimateluxurychalets.com",
        ],
      },
    },
  },

  // ─── Cernobbio ───────────────────────────────────────────────────
  {
    slug: "cernobbio",
    pinId: "cernobbio",
    image: "/images/attractions/cernobbio.jpg",
    toursThatVisit: ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Cernobbio",
        blurb: "The lake's most legendary hotel — a 1568 villa hosting the Forum Ambrosetti.",
        metaTitle: "Cernobbio & Villa d'Este by Boat · The First Stop North of Como",
        metaDesc:
          "Cernobbio is the first village north of Como. Home of the Grand Hotel Villa d'Este — the lake's most legendary hotel — and the host of the Forum Ambrosetti each September.",
        headline: "Cernobbio. <em>Where the lake begins.</em>",
        kicker: "First village north of Como · Villa d'Este pontoon · 15 minutes by boat",
        paragraphs: [
          "Cernobbio is the first proper stop on the lake. Fifteen minutes from Como by boat, the village hugs the western shore at the foot of Monte Bisbino, and its lakefront is dominated by the Grand Hotel Villa d'Este — a 1568 villa that became a hotel in 1873 and has been the lake's most legendary address ever since. We pick up regularly at its pontoon.",
          "The Forum Ambrosetti, an annual gathering of European business and political leaders, takes over Villa d'Este each September. If you're cruising past during Forum week the lake is closed off in front of the hotel for security; we plan around it. Outside that week, the gardens of the Villa Erba next door — a 19th-century neoclassical villa once owned by Luchino Visconti's family — are visible from the water and rented out for events when not hosting trade fairs.",
          "Cernobbio is a natural turning point on a one-hour tour: it's the most-photographed mile from Como and a comfortable place to bring the boat about. On longer tours we pause for a few minutes to let you absorb the façade of Villa d'Este from the water, the angle that captures the entire 1568 villa with its formal gardens.",
        ],
        goodToKnow: [
          "Pick-up from the Villa d'Este pontoon is straightforward — tell us at booking",
          "First week of September is Forum Ambrosetti — lake access in front of Villa d'Este is restricted",
          "From the water you see Villa d'Este in full; from the road, only glimpses",
        ],
      },
      it: {
        name: "Cernobbio",
        blurb: "L'hotel più leggendario del lago — una villa del 1568, sede del Forum Ambrosetti.",
        metaTitle: "Cernobbio e Villa d'Este in Barca · La Prima Tappa a Nord di Como",
        metaDesc:
          "Cernobbio è il primo paese a nord di Como. Sede del Grand Hotel Villa d'Este — il più leggendario del lago — e del Forum Ambrosetti ogni settembre.",
        headline: "Cernobbio. <em>Dove inizia il lago.</em>",
        kicker: "Primo paese a nord di Como · pontile Villa d'Este · 15 minuti in barca",
        paragraphs: [
          "Cernobbio è la prima vera tappa del lago. A quindici minuti da Como in barca, il paese abbraccia la sponda occidentale ai piedi del Monte Bisbino, e il suo lungolago è dominato dal Grand Hotel Villa d'Este — villa del 1568 diventata hotel nel 1873, da allora indirizzo più leggendario del lago. Passiamo regolarmente al suo pontile.",
          "Il Forum Ambrosetti, raduno annuale di leader del business e della politica europei, occupa Villa d'Este ogni settembre. Se navigate in quella settimana, il lago davanti all'hotel è chiuso per sicurezza; pianifichiamo attorno. Fuori dalla settimana del Forum, i giardini di Villa Erba accanto — villa neoclassica dell'Ottocento un tempo della famiglia Visconti — sono visibili dall'acqua e affittati per eventi quando non ospitano fiere.",
          "Cernobbio è un punto di virata naturale per il tour di un'ora: è il miglio più fotografato da Como e un luogo comodo per girare la barca. Nei tour più lunghi ci fermiamo qualche minuto per farvi assorbire la facciata di Villa d'Este dall'acqua, l'angolazione che cattura l'intera villa del 1568 con i giardini all'italiana.",
        ],
        goodToKnow: [
          "Il pick-up dal pontile di Villa d'Este è semplice — diteci alla prenotazione",
          "Prima settimana di settembre è Forum Ambrosetti — accesso al lago davanti a Villa d'Este limitato",
          "Dall'acqua si vede Villa d'Este intera; dalla strada solo scorci",
        ],
      },
      ru: {
        name: "Черноббио",
        blurb: "Самый легендарный отель озера — вилла 1568 года, площадка Forum Ambrosetti.",
        metaTitle: "Черноббио и Вилла д'Эсте на Лодке · Первая Остановка к Северу от Комо",
        metaDesc:
          "Черноббио — первая деревня к северу от Комо. Здесь находится Grand Hotel Villa d'Este и проходит ежегодный Forum Ambrosetti.",
        headline: "Черноббио. <em>Где начинается озеро.</em>",
        kicker: "Первая деревня к северу от Комо · 15 минут на лодке",
        paragraphs: [
          "Черноббио — первая настоящая остановка на озере. В 15 минутах от Комо на лодке, деревня обнимает западный берег у подножия Монте-Бисбино. Главная достопримечательность набережной — Grand Hotel Villa d'Este, вилла 1568 года, ставшая отелем в 1873-м и с тех пор самым легендарным адресом озера Комо. Мы регулярно подаём к её пристани.",
          "Forum Ambrosetti, ежегодное собрание европейских бизнес- и политических лидеров, занимает Villa d'Este каждый сентябрь. Если вы плывёте мимо в неделю Forum, озеро перед отелем закрыто из соображений безопасности; мы планируем маршрут с учётом этого. Вне этой недели сады Villa Erba по соседству — неоклассической виллы XIX века, когда-то принадлежавшей семье Лукино Висконти, — видны с воды.",
          "Черноббио — естественная точка разворота для часового тура: это самый фотографируемый миль от Комо. На более длинных турах мы делаем паузу, чтобы дать вам впитать фасад Villa d'Este с воды — ракурс, охватывающий всю виллу 1568 года с её регулярными садами.",
        ],
        goodToKnow: [
          "Подача от пристани Villa d'Este — сообщите при бронировании",
          "Первая неделя сентября — Forum Ambrosetti, доступ к озеру перед Villa d'Este ограничен",
          "С воды видна вся Villa d'Este; с дороги — только проблески",
        ],
      },
      ar: {
        name: "تشيرنوبيو",
        blurb: "أعرق فندق على البحيرة — فيلا من 1568 ومقرّ منتدى Ambrosetti.",
        metaTitle: "تشيرنوبيو وفيلا ديستي بالقارب · أول محطة شمال كومو",
        metaDesc:
          "تشيرنوبيو هي أول قرية شمال كومو. موطن Grand Hotel Villa d'Este — أعرق فندق على البحيرة — وموقع منتدى Ambrosetti كل سبتمبر.",
        headline: "تشيرنوبيو. <em>حيث تبدأ البحيرة.</em>",
        kicker: "أول قرية شمال كومو · 15 دقيقة بالقارب",
        paragraphs: [
          "تشيرنوبيو هي المحطة الحقيقية الأولى على البحيرة. على بُعد خمس عشرة دقيقة من كومو بالقارب، تحتضن القرية الضفة الغربية عند سفح جبل Bisbino، وتسيطر على واجهتها البحرية Grand Hotel Villa d'Este — وهي فيلا تعود إلى عام 1568 تحوّلت إلى فندق عام 1873 وأصبحت منذ ذلك الحين أعرق عنوان على بحيرة كومو. نلتقط الضيوف بانتظام عند رصيفه.",
          "ينعقد Forum Ambrosetti — التجمع السنوي لقادة الأعمال والسياسة الأوروبيين — في Villa d'Este كل سبتمبر. إن مررتم في أسبوع المنتدى تُغلق البحيرة أمام الفندق لاعتبارات أمنية؛ نخطط الجولة مع أخذ ذلك بعين الاعتبار. خارج هذا الأسبوع تُشاهَد من الماء حدائق فيلا إربا المجاورة — وهي فيلا كلاسيكية حديثة من القرن التاسع عشر كانت ملكاً لعائلة المخرج Luchino Visconti.",
          "تشيرنوبيو نقطة دوران طبيعية لجولة الساعة: هي الميل الأكثر تصويراً من كومو. في الجولات الأطول نتوقف بضع دقائق لتستطيعوا استيعاب واجهة Villa d'Este من الماء، الزاوية التي تظهر الفيلا كاملةً مع حدائقها الإيطالية الرسمية.",
        ],
        goodToKnow: [
          "الاستلام من رصيف Villa d'Este سهل — أخبرونا عند الحجز",
          "الأسبوع الأول من سبتمبر Forum Ambrosetti، الوصول إلى البحيرة أمام Villa d'Este مقيد",
          "من الماء تُرى Villa d'Este كاملة، من الشارع لمحات فقط",
        ],
      },
    },
  },

  // ─── Blevio & Torno ──────────────────────────────────────────────
  {
    slug: "blevio-torno",
    pinId: "blevio_torno",
    image: "/images/attractions/blevio.jpg",
    toursThatVisit: ["full-day-8h"],
    copy: {
      en: {
        name: "Blevio & Torno",
        blurb: "Twin villages on the eastern shore — Mandarin Oriental and Il Sereno.",
        metaTitle: "Blevio & Torno by Boat · The East Shore's Hotel Coast",
        metaDesc:
          "Blevio and Torno are twin villages on Lake Como's eastern shore, home to the Mandarin Oriental and Il Sereno. The two most architecturally daring hotels on the lake.",
        headline: "Blevio & Torno. <em>The east shore's hotel coast.</em>",
        kicker: "First two villages on the east shore · 10–20 minutes by boat · Mandarin Oriental · Il Sereno",
        paragraphs: [
          "Blevio and Torno are the first two villages on the eastern shore, ten and twenty minutes from Como respectively. They're quieter and less photographed than Cernobbio across the lake, but they have the lake's two most architecturally interesting hotels — Mandarin Oriental Lago di Como in Blevio (a 19th-century compound recently remade by Antonio Citterio) and Il Sereno in Torno (a Patricia Urquiola-designed contemporary hotel where the lobby opens directly onto a swimming pool that hangs over the lake).",
          "Both hotels have their own pontoons and we pick up there regularly. Torno itself is a small medieval village clinging to the slope — its 1480 church San Giovanni has a Romanesque doorway worth a closer look, and the lakefront piazza is one of the prettiest small spaces on the lake.",
          "Pliny the Elder is reputed to have written about a strange intermittent spring near here in his Natural History — the Fonte Pliniana, which still flows and stops on a roughly six-hour cycle. The fountain is in a Renaissance grotto on the lakefront halfway between Blevio and Torno, visible from the water as a small arched alcove cut into the cliff.",
        ],
        goodToKnow: [
          "Mandarin Oriental pontoon: pick-up by arrangement with the hotel concierge",
          "Il Sereno pontoon: same — tell us your hotel at booking and we'll handle the timing",
          "Pliny's Fountain (Fonte Pliniana) is on the cliff halfway between Blevio and Torno",
        ],
      },
      it: {
        name: "Blevio e Torno",
        blurb: "Borghi gemelli sulla sponda orientale — Mandarin Oriental e Il Sereno.",
        metaTitle: "Blevio e Torno in Barca · La Costa degli Hotel sulla Sponda Est",
        metaDesc:
          "Blevio e Torno sono i borghi gemelli sulla sponda orientale del Lago di Como, sede del Mandarin Oriental e di Il Sereno. I due hotel architettonicamente più audaci del lago.",
        headline: "Blevio e Torno. <em>La costa degli hotel della sponda est.</em>",
        kicker: "Primi due paesi della sponda est · 10–20 minuti in barca · Mandarin Oriental · Il Sereno",
        paragraphs: [
          "Blevio e Torno sono i primi due paesi sulla sponda orientale, rispettivamente a dieci e venti minuti da Como. Sono più tranquilli e meno fotografati di Cernobbio sull'altra sponda, ma ospitano i due hotel architettonicamente più interessanti del lago — Mandarin Oriental Lago di Como a Blevio (un compendio dell'Ottocento ridisegnato di recente da Antonio Citterio) e Il Sereno a Torno (hotel contemporaneo firmato Patricia Urquiola, con la lobby che apre direttamente su una piscina sospesa sopra il lago).",
          "Entrambi gli hotel hanno i propri pontili e passiamo regolarmente di lì. Torno è un piccolo borgo medievale aggrappato al pendio — la chiesa di San Giovanni del 1480 ha un portale romanico che vale uno sguardo da vicino, e la piazza sul lungolago è uno degli spazi piccoli più belli del lago.",
          "Si dice che Plinio il Vecchio scrivesse di una strana sorgente intermittente da queste parti nella sua Naturalis Historia — la Fonte Pliniana, che ancora oggi sgorga e si ferma su un ciclo di circa sei ore. La fontana è in una grotta rinascimentale sul lungolago a metà strada tra Blevio e Torno, visibile dall'acqua come una piccola nicchia ad arco scavata nella roccia.",
        ],
        goodToKnow: [
          "Pontile Mandarin Oriental: pick-up su accordo con il concierge dell'hotel",
          "Pontile Il Sereno: idem — ditelo alla prenotazione e gestiamo i tempi",
          "La Fonte Pliniana si trova sulla rupe a metà strada tra Blevio e Torno",
        ],
      },
      ru: {
        name: "Блевио и Торно",
        blurb: "Деревни-близнецы на восточном берегу — Mandarin Oriental и Il Sereno.",
        metaTitle: "Блевио и Торно на Лодке · Гостиничный Берег Восточной Стороны",
        metaDesc:
          "Блевио и Торно — деревни-близнецы на восточном берегу озера Комо, дома Mandarin Oriental и Il Sereno. Два самых архитектурно смелых отеля на озере.",
        headline: "Блевио и Торно. <em>Гостиничный берег восточной стороны.</em>",
        kicker: "Первые две деревни восточного берега · 10–20 минут на лодке",
        paragraphs: [
          "Блевио и Торно — первые две деревни на восточном берегу, в десяти и двадцати минутах от Комо. Тише и менее фотографируемы, чем Черноббио напротив, но здесь два самых интересных архитектурно отеля озера — Mandarin Oriental Lago di Como в Блевио (комплекс XIX века, недавно обновлённый Антонио Читтерио) и Il Sereno в Торно (современный отель от Патрисии Уркиолы, чей лобби открывается прямо на бассейн, нависающий над озером).",
          "У обоих отелей собственные пристани, мы регулярно подаём к ним. Сам Торно — небольшой средневековый посёлок на склоне; церковь Сан Джованни 1480 года имеет романский портал, заслуживающий внимания, а лангольаго пьяцца — одно из самых красивых малых пространств озера.",
          "По преданию Плиний Старший писал о странном переменном источнике рядом — Фонте Плиниана, до сих пор работающем по шестичасовому циклу. Фонтан в ренессансной гроте на полпути между Блевио и Торно, виден с воды как небольшая арочная ниша в скале.",
        ],
        goodToKnow: [
          "Пристань Mandarin Oriental: подача по договорённости с консьержем",
          "Пристань Il Sereno: то же — скажите при бронировании",
          "Фонте Плиниана — на скале на полпути между Блевио и Торно",
        ],
      },
      ar: {
        name: "بليفيو وتورنو",
        blurb: "قريتان توأمتان على الضفة الشرقية — Mandarin Oriental وIl Sereno.",
        metaTitle: "بليفيو وتورنو بالقارب · ساحل الفنادق على الضفة الشرقية",
        metaDesc:
          "بليفيو وتورنو قريتان توأمتان على الضفة الشرقية لبحيرة كومو، موطن Mandarin Oriental وIl Sereno. أكثر فندقَين معماريَّين جرأة على البحيرة.",
        headline: "بليفيو وتورنو. <em>ساحل الفنادق للضفة الشرقية.</em>",
        kicker: "أول قريتين على الضفة الشرقية · 10–20 دقيقة بالقارب",
        paragraphs: [
          "بليفيو وتورنو هما أول قريتين على الضفة الشرقية، على بُعد عشر دقائق وعشرين دقيقة من كومو على التوالي. أهدأ وأقل تصويراً من تشيرنوبيو المقابلة، لكنهما تستضيفان أكثر فندقَين معماريَّين إثارة للاهتمام على البحيرة — Mandarin Oriental Lago di Como في بليفيو (مجمع من القرن التاسع عشر أعاد تصميمه مؤخراً Antonio Citterio) وIl Sereno في تورنو (فندق معاصر من تصميم Patricia Urquiola، حيث تفتح اللوبي مباشرة على مسبح معلّق فوق البحيرة).",
          "للفندقين أرصفتهما الخاصة ونمر بهما بانتظام. تورنو نفسها قرية صغيرة من القرون الوسطى متعلقة بالمنحدر — كنيستها San Giovanni من عام 1480 لها بوابة رومانية تستحق النظر، وميدان الواجهة البحرية من أجمل المساحات الصغيرة على البحيرة.",
          "يُقال إن بليني الأكبر كتب عن نبع متقطّع غريب قرب هنا في تاريخه الطبيعي — Fonte Pliniana، الذي لا يزال يتدفق ويتوقف على دورة تقارب الست ساعات. النافورة في مغارة من عصر النهضة على الواجهة البحرية في منتصف الطريق بين بليفيو وتورنو، تظهر من الماء كحنية مقوّسة صغيرة محفورة في الصخر.",
        ],
        goodToKnow: [
          "رصيف Mandarin Oriental: الاستلام بالتنسيق مع كونسييرج الفندق",
          "رصيف Il Sereno: نفس الشيء — أخبرونا عند الحجز",
          "Fonte Pliniana في منحدر الصخر بين بليفيو وتورنو",
        ],
      },
    },
  },

  // ─── Moltrasio / Carate Urio / Laglio (Clooney area) ─────────────
  {
    slug: "moltrasio-laglio",
    // Iconic image for this attraction is George Clooney's Villa
    // Oleandra on the Laglio waterfront — used to be a generic hero
    // shot, now a Wikipedia/Commons photo of Laglio from the lake
    // ferry (CC-BY-SA, credit in /images/attractions/CREDITS.md).
    pinId: "oleandra",
    image: "/images/attractions/villa-oleandra.jpg",
    toursThatVisit: ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "full-day-8h"],
    copy: {
      en: {
        name: "Moltrasio, Carate Urio, Laglio",
        blurb: "Three villages strung along the western shore — Clooney's Villa Oleandra is here.",
        metaTitle: "Villa Oleandra & the Clooney Coast by Boat · Moltrasio to Laglio",
        metaDesc:
          "Moltrasio, Carate Urio and Laglio are three villages on the western shore where George Clooney owns Villa Oleandra. The most-photographed mile from Como, by boat.",
        headline: "The Clooney Coast. <em>Villa Oleandra and its three villages.</em>",
        kicker: "Western shore · 20–35 minutes by boat from Como · Villa Oleandra in Laglio",
        paragraphs: [
          "Between Cernobbio and Argegno, the western shore runs through three small villages — Moltrasio, Carate Urio and Laglio — strung together along a single waterfront road. They're not destinations in their own right (there's nothing in them to disembark for) but they hold the most photographed villas of the lake's first basin, and George Clooney's Villa Oleandra is one of them.",
          "Clooney bought Villa Oleandra in 2002 — an 18th-century neoclassical villa just at the water's edge in Laglio, recognisable from the road only by a tall gate and a single yellow ochre wall. He still owns it. The villa is visible in full only from the water, with its three-arched portico and the long lakefront balustrade dropping straight to the boat dock. The captain holds the boat at the angle the paparazzi use.",
          "Moltrasio (the first village) has Villa Passalacqua, an 18th-century Bellinian compound now one of the lake's most exclusive hotels — Bellini composed Norma here in 1831. Carate Urio is the smallest of the three, with the Cardinal pastel-coloured façade right on the water. Laglio is the village that includes Villa Oleandra; it's also where the cliffs are at their tallest before the lake widens northward.",
        ],
        goodToKnow: [
          "Villa Oleandra is visible only from the water — from the road you see the gate and nothing more",
          "Passalacqua pontoon pick-ups: arrange with the hotel concierge",
          "Best month: May or September, when the cliffs glow at golden hour",
        ],
      },
      it: {
        name: "Moltrasio, Carate Urio, Laglio",
        blurb: "Tre paesi allineati sulla sponda occidentale — qui c'è Villa Oleandra di Clooney.",
        metaTitle: "Villa Oleandra e la Costa di Clooney in Barca · Da Moltrasio a Laglio",
        metaDesc:
          "Moltrasio, Carate Urio e Laglio sono tre paesi sulla sponda occidentale dove George Clooney possiede Villa Oleandra. Il miglio più fotografato da Como, in barca.",
        headline: "La Costa di Clooney. <em>Villa Oleandra e i suoi tre paesi.</em>",
        kicker: "Sponda ovest · 20–35 minuti in barca da Como · Villa Oleandra a Laglio",
        paragraphs: [
          "Tra Cernobbio e Argegno la sponda occidentale attraversa tre piccoli paesi — Moltrasio, Carate Urio e Laglio — allineati lungo un'unica strada sul lungolago. Non sono destinazioni in sé (non c'è nulla per cui sbarcare) ma ospitano le ville più fotografate del primo bacino del lago, e Villa Oleandra di George Clooney è una di queste.",
          "Clooney ha acquistato Villa Oleandra nel 2002 — una villa neoclassica del Settecento al bordo dell'acqua a Laglio, riconoscibile dalla strada solo per un alto cancello e un'unica parete ocra gialla. La possiede ancora. La villa si vede interamente solo dall'acqua, con il portico a tre archi e la lunga balaustra del lungolago che scende dritta al molo. Lo skipper tiene la barca all'angolazione che usano i paparazzi.",
          "Moltrasio (il primo paese) ha Villa Passalacqua, un complesso belliniano del Settecento oggi uno degli hotel più esclusivi del lago — Bellini compose Norma qui nel 1831. Carate Urio è il più piccolo dei tre, con la facciata Cardinal pastello sull'acqua. Laglio è il paese che include Villa Oleandra; è anche dove le scogliere sono più alte prima che il lago si allarghi verso nord.",
        ],
        goodToKnow: [
          "Villa Oleandra è visibile solo dall'acqua — dalla strada si vede solo il cancello",
          "Pick-up al pontile di Passalacqua: da concordare col concierge dell'hotel",
          "Mese migliore: maggio o settembre, quando le scogliere si accendono nell'ora dorata",
        ],
      },
      ru: {
        name: "Мольтразио, Карате Урио, Лальо",
        blurb: "Три деревни вдоль западного берега — здесь Вилла Олеандра Клуни.",
        metaTitle: "Вилла Олеандра и Берег Клуни на Лодке · от Мольтразио до Лальо",
        metaDesc:
          "Мольтразио, Карате Урио и Лальо — три деревни западного берега, где Джордж Клуни владеет Виллой Олеандра. Самый фотографируемый миль из Комо на лодке.",
        headline: "Берег Клуни. <em>Вилла Олеандра и её три деревни.</em>",
        kicker: "Западный берег · 20–35 минут на лодке из Комо",
        paragraphs: [
          "Между Черноббио и Арденьо западный берег проходит через три небольших села — Мольтразио, Карате Урио и Лальо — нанизанных вдоль одной прибрежной дороги. Сами по себе это не пункты назначения (выходить здесь нечего), но они держат самые фотографируемые виллы первого бассейна озера, и Вилла Олеандра Джорджа Клуни — одна из них.",
          "Клуни купил Виллу Олеандра в 2002 году — неоклассическую виллу XVIII века прямо у воды в Лальо, узнаваемую с дороги только по высоким воротам и одной охристо-жёлтой стене. Он по-прежнему её владелец. Вилла видна полностью только с воды — с тройной арочной портика и длинной балюстрадой набережной, спускающейся прямо к причалу. Шкипер удерживает лодку в том ракурсе, который используют папарацци.",
          "Мольтразио (первая деревня) имеет Villa Passalacqua, белиниевский комплекс XVIII века — ныне один из самых эксклюзивных отелей озера. Беллини сочинял здесь «Норму» в 1831 году. Карате Урио — самая маленькая, с пастельным фасадом Cardinal прямо у воды. Лальо включает Виллу Олеандра и место, где утёсы достигают максимальной высоты перед расширением озера к северу.",
        ],
        goodToKnow: [
          "Вилла Олеандра видна только с воды — с дороги только ворота",
          "Подача на пристань Passalacqua: по договору с консьержем",
          "Лучший месяц: май или сентябрь, когда утёсы светятся в золотой час",
        ],
      },
      ar: {
        name: "مولتراسيو وكاراتي أوريو ولاليو",
        blurb: "ثلاث قرى على الضفة الغربية — هنا فيلا أوليندرا لكلوني.",
        metaTitle: "فيلا أوليندرا وساحل كلوني بالقارب · من مولتراسيو إلى لاليو",
        metaDesc:
          "مولتراسيو وكاراتي أوريو ولاليو ثلاث قرى على الضفة الغربية حيث يمتلك جورج كلوني فيلا أوليندرا. أكثر ميل تصويراً من كومو، بالقارب.",
        headline: "ساحل كلوني. <em>فيلا أوليندرا وقراها الثلاث.</em>",
        kicker: "الضفة الغربية · 20–35 دقيقة بالقارب من كومو",
        paragraphs: [
          "بين تشيرنوبيو وأردنيو، تمر الضفة الغربية بثلاث قرى صغيرة — مولتراسيو وكاراتي أوريو ولاليو — متراصّة على طول طريق ساحلي واحد. ليست وجهات بحد ذاتها (لا شيء يستدعي النزول) لكنها تضمّ أكثر الفيلات تصويراً في الحوض الأول للبحيرة، وفيلا أوليندرا لجورج كلوني واحدة منها.",
          "اشترى كلوني فيلا أوليندرا عام 2002 — فيلا كلاسيكية حديثة من القرن الثامن عشر عند حافة الماء في لاليو، تُعرف من الطريق ببوابة عالية وجدار واحد بلون المغرة الصفراء. لا يزال يملكها. الفيلا تُرى كاملة من الماء فقط، بمدخلها ذي الأقواس الثلاثة وحاجزها الطويل على الواجهة البحرية الذي ينحدر مباشرة إلى الرصيف. يثبّت الربان القارب في الزاوية التي يستخدمها المصورون الصحفيون.",
          "مولتراسيو (القرية الأولى) فيها Villa Passalacqua، مجمع بلليني من القرن الثامن عشر، اليوم أحد أكثر فنادق البحيرة حصرية — ألّف بلليني أوبرا Norma هنا عام 1831. كاراتي أوريو الأصغر من الثلاث، بواجهة Cardinal بألوان الباستيل على الماء. لاليو القرية التي تحتضن فيلا أوليندرا، وحيث المنحدرات في أقصى ارتفاعها قبل أن تتسع البحيرة شمالاً.",
        ],
        goodToKnow: [
          "فيلا أوليندرا تُرى من الماء فقط — من الطريق ترى البوابة فقط",
          "الاستلام من رصيف Passalacqua: بالتنسيق مع كونسييرج الفندق",
          "أفضل شهر: مايو أو سبتمبر حين تتوهّج المنحدرات في الساعة الذهبية",
        ],
      },
    },
  },

  // ─── Orrido di Nesso ─────────────────────────────────────────────
  {
    slug: "nesso",
    pinId: "nesso",
    image: "/images/attractions/nesso.jpg",
    toursThatVisit: ["balbianello-nesso", "full-day-8h"],
    copy: {
      en: {
        name: "Orrido di Nesso",
        blurb: "The hidden waterfall — visible only from the water, the most photographed gorge.",
        metaTitle: "Orrido di Nesso by Boat · The Lake's Hidden Waterfall",
        metaDesc:
          "The Orrido di Nesso is a hairline gorge on Lake Como's eastern shore where two streams collapse into the lake. Visible only from the water — bring your camera.",
        headline: "Orrido di Nesso. <em>The waterfall the road can't see.</em>",
        kicker: "East-shore gorge · 25 minutes by boat from Como",
        paragraphs: [
          "The Orrido di Nesso is a slot canyon at the village of Nesso, on Lake Como's eastern shore. Two streams — the Tuf and the Nosé — drop a vertical seventy metres into the gorge and pour into the lake at the foot of a stone bridge, the Ponte della Civera, that spans the canyon at the village level.",
          "From the road that follows the eastern shore the gorge is invisible: it's tucked between the houses of the village. From the lake, the canyon opens up between the buildings and you see the entire fall framed by the bridge above. We stop the boat about thirty metres off the gorge — close enough for the spray on a hot day, far enough to take the photograph with the bridge and the village in the frame.",
          "Above the gorge is one of the lake's prettiest small villages, with stone alleys descending to a small chapel and a covered staircase down to the canyon for the hardy walker. We don't include disembarkation — there's no proper boat dock at Nesso for our type of vessel — but we'd recommend an afternoon visit by car if the gorge captures you.",
        ],
        goodToKnow: [
          "Visible only from the water — the most reliable way to see the falls",
          "Best after spring rain (April–June) or after a summer storm — the volume varies",
          "We hold the boat about 30 m off the gorge for the photograph",
        ],
      },
      it: {
        name: "Orrido di Nesso",
        blurb: "La cascata nascosta — visibile solo dall'acqua, la gola più fotografata.",
        metaTitle: "Orrido di Nesso in Barca · La Cascata Nascosta del Lago di Como",
        metaDesc:
          "L'Orrido di Nesso è una gola sulla sponda orientale del Lago di Como dove due torrenti precipitano nel lago. Visibile solo dall'acqua.",
        headline: "Orrido di Nesso. <em>La cascata che la strada non vede.</em>",
        kicker: "Gola della sponda est · 25 minuti in barca da Como",
        paragraphs: [
          "L'Orrido di Nesso è una gola strettissima al paese di Nesso, sulla sponda orientale del Lago di Como. Due torrenti — il Tuf e il Nosé — precipitano per settanta metri verticali nella gola e si gettano nel lago ai piedi di un ponte in pietra, il Ponte della Civera, che attraversa il canyon all'altezza del paese.",
          "Dalla strada che segue la sponda est la gola è invisibile: è incastonata tra le case del paese. Dal lago, il canyon si apre tra le costruzioni e si vede l'intera cascata incorniciata dal ponte. Fermiamo la barca a circa trenta metri dalla gola — abbastanza vicino per la nebulizzazione nei giorni caldi, abbastanza lontano per inquadrare il ponte e il borgo nello scatto.",
          "Sopra la gola c'è uno dei paesi più belli del lago, con vicoli in pietra che scendono a una piccola cappella e una scalinata coperta che porta giù al canyon per chi cammina volentieri. Non includiamo lo sbarco — non c'è un molo adatto alla nostra barca a Nesso — ma se la gola vi colpisce, consigliamo una visita in auto in un pomeriggio successivo.",
        ],
        goodToKnow: [
          "Visibile solo dall'acqua — il modo più affidabile per vederla",
          "Al meglio dopo le piogge primaverili (aprile–giugno) o dopo un temporale estivo — la portata varia",
          "Teniamo la barca a circa 30 m dalla gola per la foto",
        ],
      },
      ru: {
        name: "Орридо ди Нессо",
        blurb: "Скрытый водопад — видимый только с воды, самое фотографируемое ущелье.",
        metaTitle: "Орридо ди Нессо на Лодке · Скрытый Водопад Озера Комо",
        metaDesc:
          "Орридо ди Нессо — узкое ущелье на восточном берегу озера Комо, где два ручья падают в озеро. Виден только с воды.",
        headline: "Орридо ди Нессо. <em>Водопад, которого не видно с дороги.</em>",
        kicker: "Восточный берег · 25 минут на лодке из Комо",
        paragraphs: [
          "Узкое ущелье в деревне Нессо. Два ручья падают с высоты 70 м.",
          "С дороги ущелье невидимо. С озера канyon открывается между домами.",
          "Останавливаемся в 30 м для фото с мостом и деревней в кадре.",
        ],
        goodToKnow: [
          "Виден только с воды",
          "Лучше всего апрель–июнь и после летних гроз",
          "Останавливаемся в 30 м от ущелья",
        ],
      },
      ar: {
        name: "أوريدو دي نيسو",
        blurb: "الشلال المخفي — لا يُرى إلا من الماء، الفجوة الأكثر تصويراً.",
        metaTitle: "أوريدو دي نيسو بالقارب · شلال بحيرة كومو المخفي",
        metaDesc:
          "أوريدو دي نيسو فجوة ضيقة على الضفة الشرقية لبحيرة كومو حيث يسقط جدولان في البحيرة. لا يُرى إلا من الماء.",
        headline: "أوريدو دي نيسو. <em>الشلال الذي لا تراه الطريق.</em>",
        kicker: "فجوة الضفة الشرقية · 25 دقيقة بالقارب من كومو",
        paragraphs: [
          "فجوة ضيقة في قرية نيسو. جدولان يسقطان من ارتفاع 70 متراً.",
          "من الطريق غير مرئية. من البحيرة تنفتح بين المنازل.",
          "نتوقف على بُعد 30 متراً للصورة مع الجسر والقرية.",
        ],
        goodToKnow: [
          "تُرى فقط من الماء",
          "أفضل وقت أبريل–يونيو وبعد العواصف الصيفية",
          "نتوقف على بُعد 30 متراً",
        ],
      },
    },
  },

  // ─── Menaggio ────────────────────────────────────────────────────
  {
    slug: "menaggio",
    pinId: "menaggio",
    image: "/images/attractions/menaggio.jpg",
    toursThatVisit: ["full-day-8h"],
    copy: {
      en: {
        name: "Menaggio",
        blurb: "Upper west shore — colourful lakefront, golf course, gateway to Lugano.",
        metaTitle: "Menaggio by Boat · The Upper West Shore Village",
        metaDesc:
          "Menaggio is the upper western shore's main village — a colourful lakefront promenade, the lake's only links golf course, and a half-hour mountain road to Lugano in Switzerland.",
        headline: "Menaggio. <em>The upper west shore's main village.</em>",
        kicker: "Upper west shore · 1h 30 by boat from Como · gateway to Lugano",
        paragraphs: [
          "Menaggio is the largest town on the upper western shore — the section of Lake Como above Villa Carlotta where the mountains pull back slightly and the lake widens. It's a more cosmopolitan stop than Bellagio or Varenna: a long lakefront promenade with pastel facades, a working harbour, the Menaggio & Cadenabbia Golf Club (the lake's only proper 18-hole course, founded by British residents in 1907), and a serious lake-swimming beach at the Lido di Menaggio.",
          "The town has been a summer station since the 19th century, when British families built villas here for the climate. The Hotel Britannia Excelsior and the Grand Hotel Victoria — both still operating — are the survivors of that period. The lakefront from Piazza Garibaldi to the Lido is the most pleasant 700 metres of waterfront on the upper lake.",
          "Menaggio is also the lake's gateway to Switzerland. A 25-minute mountain road climbs through the Val Menaggio to Lugano, and the lake's most easterly point — Forcola di Livigno — is 90 minutes away by car. For a full-day private tour, Menaggio is the natural northern turnaround.",
        ],
        goodToKnow: [
          "Long lakefront promenade — 90 minutes ashore covers the village + a swim",
          "The Lido di Menaggio has the best public lake-swimming beach (€10 day pass)",
          "Menaggio & Cadenabbia Golf Club is the lake's only 18-hole course (founded 1907)",
        ],
      },
      it: {
        name: "Menaggio",
        blurb: "Sponda ovest superiore — lungolago colorato, campo da golf, porta verso Lugano.",
        metaTitle: "Menaggio in Barca · Il Borgo Principale dell'Alto Lago",
        metaDesc:
          "Menaggio è il borgo principale dell'alta sponda occidentale — lungolago colorato, l'unico campo da golf del lago, e mezz'ora di strada per Lugano in Svizzera.",
        headline: "Menaggio. <em>Il borgo principale dell'alta sponda occidentale.</em>",
        kicker: "Alta sponda ovest · 1h 30 in barca da Como · porta verso Lugano",
        paragraphs: [
          "Menaggio è il paese più grande dell'alta sponda occidentale — la sezione del Lago di Como sopra Villa Carlotta dove le montagne si ritirano un po' e il lago si allarga. È una sosta più cosmopolita di Bellagio o Varenna: lungolago a tinte pastello, porto attivo, il Menaggio & Cadenabbia Golf Club (l'unico vero 18 buche del lago, fondato da residenti britannici nel 1907), e una spiaggia attrezzata al Lido di Menaggio.",
          "Il paese è stato stazione climatica estiva dal XIX secolo, quando le famiglie inglesi costruivano ville qui per il clima. L'Hotel Britannia Excelsior e il Grand Hotel Victoria — entrambi ancora operativi — sono i sopravvissuti di quell'epoca. Il lungolago da Piazza Garibaldi al Lido è i 700 metri più piacevoli dell'alto lago.",
          "Menaggio è anche la porta del lago verso la Svizzera. Una strada montana di 25 minuti sale per la Val Menaggio fino a Lugano, e il punto più orientale del lago — Forcola di Livigno — è a 90 minuti in auto. Per un tour privato di giornata, Menaggio è il punto di virata naturale a nord.",
        ],
        goodToKnow: [
          "Lungolago lungo — 90 minuti a terra coprono il paese più un bagno",
          "Il Lido di Menaggio ha la migliore spiaggia pubblica per il bagno (€10 pass giornaliero)",
          "Il Menaggio & Cadenabbia Golf Club è l'unico 18 buche del lago (fondato nel 1907)",
        ],
      },
      ru: {
        name: "Менаджо",
        blurb: "Верхний западный берег — яркая набережная, поле для гольфа, ворота в Лугано.",
        metaTitle: "Менаджо на Лодке · Главная Деревня Верхнего Западного Берега",
        metaDesc:
          "Менаджо — главная деревня верхнего западного берега озера Комо: яркая набережная, единственное поле для гольфа на озере, и полчаса горной дороги до Лугано в Швейцарии.",
        headline: "Менаджо. <em>Главная деревня верхнего западного берега.</em>",
        kicker: "Верхний западный берег · 1ч 30мин на лодке из Комо · ворота в Лугано",
        paragraphs: [
          "Менаджо — крупнейший город верхней западной стороны, выше Виллы Карлотта, где горы немного отступают и озеро расширяется. Более космополитичная остановка, чем Беладжо или Варенна: длинная пастельная набережная, рабочая гавань, гольф-клуб Менаджо-Каденаббия (единственное серьёзное поле на 18 лунок на озере, основанное британскими резидентами в 1907 году) и пляж Лидо ди Менаджо.",
          "Город был летним курортом с XIX века, когда британские семьи строили здесь виллы. Hotel Britannia Excelsior и Grand Hotel Victoria — выжившие той эпохи. Набережная от Piazza Garibaldi до Лидо — самые приятные 700 метров на верхнем озере.",
          "Менаджо — ворота озера в Швейцарию. Горная дорога в 25 минут поднимается через Val Menaggio до Лугано. Для полнодневного тура Менаджо — естественная северная точка разворота.",
        ],
        goodToKnow: [
          "Длинная набережная — 90 минут на берегу хватает на деревню и купание",
          "Lido di Menaggio — лучший общественный пляж (€10 день)",
          "Гольф-клуб Менаджо-Каденаббия — единственный 18-луночный на озере (с 1907)",
        ],
      },
      ar: {
        name: "ميناجيو",
        blurb: "أعلى الضفة الغربية — واجهة بحرية ملوّنة وملعب غولف وبوابة لوغانو.",
        metaTitle: "ميناجيو بالقارب · القرية الرئيسية للضفة الغربية العليا",
        metaDesc:
          "ميناجيو هي القرية الرئيسية للضفة الغربية العليا لبحيرة كومو — واجهة بحرية ملوّنة، ملعب الغولف الوحيد على البحيرة، ونصف ساعة بطريق جبلية إلى لوغانو في سويسرا.",
        headline: "ميناجيو. <em>القرية الرئيسية للضفة الغربية العليا.</em>",
        kicker: "أعلى الضفة الغربية · 1:30 بالقارب من كومو · بوابة لوغانو",
        paragraphs: [
          "ميناجيو هي أكبر بلدة في أعلى الضفة الغربية — جزء بحيرة كومو فوق فيلا كارلوتا حيث تتراجع الجبال قليلاً وتتسع البحيرة. محطة أكثر عالمية من بيلاجيو أو فارينا: واجهة بحرية طويلة بألوان الباستيل، مرفأ نشط، نادي ميناجيو وكادينابيا للغولف (الملعب الوحيد ذو 18 حفرة على البحيرة، أسسه مقيمون بريطانيون عام 1907)، وشاطئ للسباحة في Lido di Menaggio.",
          "كانت البلدة محطة صيف منذ القرن التاسع عشر، حين بنت العائلات البريطانية الفيلات هنا للمناخ. Hotel Britannia Excelsior وGrand Hotel Victoria — لا يزالان يعملان — ناجيا تلك الحقبة. الواجهة البحرية من Piazza Garibaldi إلى Lido هي الـ 700 متر الأكثر متعة على البحيرة العليا.",
          "ميناجيو هي أيضاً بوابة البحيرة إلى سويسرا. طريق جبلية مدتها 25 دقيقة تصعد عبر Val Menaggio إلى لوغانو. لجولة خاصة ليوم كامل، ميناجيو هي نقطة الدوران الشمالية الطبيعية.",
        ],
        goodToKnow: [
          "واجهة بحرية طويلة — 90 دقيقة على الأرض تغطي القرية مع سباحة",
          "شاطئ Lido di Menaggio أفضل شاطئ عام للسباحة (€10 يومياً)",
          "نادي ميناجيو وكادينابيا للغولف هو الوحيد بـ 18 حفرة على البحيرة (تأسس 1907)",
        ],
      },
    },
  },

  // ─── Lecco ───────────────────────────────────────────────────────
  {
    slug: "lecco",
    pinId: "lecco",
    image: "/images/attractions/lecco.jpg",
    toursThatVisit: ["full-day-8h"],
    copy: {
      en: {
        name: "Lecco",
        blurb: "The eastern arm — Manzoni's hometown, dramatic peaks dropping straight to the water.",
        metaTitle: "Lecco by Boat · The Other Arm of Lake Como",
        metaDesc:
          "Lecco is the capital of Lake Como's other arm — Alessandro Manzoni's hometown, the Resegone mountain as its backdrop, and a different lake from the touristic west.",
        headline: "Lecco. <em>The other arm of Lake Como.</em>",
        kicker: "Eastern arm · 90 minutes by boat · Manzoni's birthplace · the Resegone backdrop",
        paragraphs: [
          "Lecco is the capital of Lake Como's eastern arm — the leg of the lake that runs south-east from Bellagio toward the city of Lecco at its tip. It's a different lake from the touristic west: the mountains are taller, the towns are working towns rather than resort villages, and the boat traffic is mostly local fishermen rather than ferries to Bellagio.",
          "Alessandro Manzoni, the author of I Promessi Sposi (The Betrothed) — the foundational novel of modern Italian literature — was born in Milan but spent his childhood summers at Villa Manzoni in Lecco. The villa is now a museum, and the lake's eastern arm is the setting of the novel's first chapters. Locals will quote the opening line ('Quel ramo del lago di Como, che volge a mezzogiorno...') the way English speakers quote 'It is a truth universally acknowledged.'",
          "From the water, the Resegone — the saw-toothed mountain that dominates Lecco from the east — is the lake's most dramatic backdrop. It drops straight from 1875 metres into the water without a horizontal step. The lakefront promenade in Lecco itself runs for 2 kilometres under this view. For a full-day private tour starting at Como, Lecco is a long stretch — 90 minutes one way — but the change in landscape rewards the time.",
        ],
        goodToKnow: [
          "Lecco is 90 minutes one way by boat from Como — only feasible on a full-day tour",
          "Villa Manzoni museum: open Tuesday–Sunday, €6 entry, on the lakefront",
          "The Resegone view is best in the late afternoon when the light comes from the west",
        ],
      },
      it: {
        name: "Lecco",
        blurb: "Il ramo orientale — la città di Manzoni, picchi a strapiombo sull'acqua.",
        metaTitle: "Lecco in Barca · L'Altro Ramo del Lago di Como",
        metaDesc:
          "Lecco è il capoluogo dell'altro ramo del Lago di Como — la città natale di Alessandro Manzoni, con il Resegone come fondale e un lago diverso da quello turistico a ovest.",
        headline: "Lecco. <em>L'altro ramo del Lago di Como.</em>",
        kicker: "Ramo orientale · 90 minuti in barca · città di Manzoni · il Resegone come fondale",
        paragraphs: [
          "Lecco è il capoluogo del ramo orientale del Lago di Como — la gamba del lago che corre a sud-est da Bellagio fino alla città di Lecco alla sua estremità. È un lago diverso da quello turistico a ovest: le montagne sono più alte, i paesi sono paesi di lavoro più che villeggiature, e il traffico nautico è soprattutto pescatori locali invece di battelli per Bellagio.",
          "Alessandro Manzoni, autore de I Promessi Sposi — il romanzo fondativo della letteratura italiana moderna — è nato a Milano ma passava le estati dell'infanzia a Villa Manzoni a Lecco. La villa è oggi museo, e il ramo orientale è l'ambientazione dei primi capitoli del romanzo. I locali citano l'incipit ('Quel ramo del lago di Como, che volge a mezzogiorno...') come gli inglesi citano 'It is a truth universally acknowledged.'",
          "Dall'acqua, il Resegone — la montagna a denti di sega che domina Lecco da est — è lo sfondo più drammatico del lago. Cade dritto da 1875 metri all'acqua senza scalini orizzontali. Il lungolago di Lecco stessa scorre per 2 chilometri sotto questa vista. Per un tour privato di giornata da Como, Lecco è una tirata lunga — 90 minuti solo andata — ma il cambio di paesaggio ricompensa il tempo.",
        ],
        goodToKnow: [
          "Lecco è a 90 minuti solo andata in barca da Como — fattibile solo in un tour di giornata",
          "Museo di Villa Manzoni: aperto martedì–domenica, ingresso €6, sul lungolago",
          "La vista sul Resegone è migliore nel tardo pomeriggio con la luce da ovest",
        ],
      },
      ru: {
        name: "Лекко",
        blurb: "Восточный рукав — родной город Манцони, отвесные пики над водой.",
        metaTitle: "Лекко на Лодке · Другой Рукав Озера Комо",
        metaDesc:
          "Лекко — столица другого рукава озера Комо: родина Алессандро Манцони, с горой Резегоне как фон и совсем другое озеро, чем туристический запад.",
        headline: "Лекко. <em>Другой рукав озера Комо.</em>",
        kicker: "Восточный рукав · 90 минут на лодке · родина Манцони · фон Резегоне",
        paragraphs: [
          "Лекко — столица восточного рукава озера Комо, который идёт на юго-восток от Беладжо. Это другое озеро, не туристический запад: горы выше, города рабочие, движение по воде — местные рыбаки, а не паромы.",
          "Алессандро Манцони, автор «Обручённых» (I Promessi Sposi) — основополагающего романа современной итальянской литературы — родился в Милане, но проводил детское лето в Вилле Манцони в Лекко. Вилла теперь музей. Местные цитируют начало романа («Quel ramo del lago di Como, che volge a mezzogiorno...») как англичане цитируют «It is a truth universally acknowledged».",
          "С воды Резегоне — пилообразная гора, доминирующая над Лекко с востока — самый драматичный фон озера. Падает с 1875 метров прямо в воду без горизонтальных уступов. Набережная Лекко тянется 2 км под этим видом. Для полнодневного тура из Комо Лекко — длинный путь (90 минут в одну сторону), но смена пейзажа того стоит.",
        ],
        goodToKnow: [
          "Лекко — 90 минут в одну сторону от Комо, только на полнодневном туре",
          "Музей Виллы Манцони: вторник–воскресенье, €6, на набережной",
          "Вид на Резегоне лучше всего в позднем дневном свете с запада",
        ],
      },
      ar: {
        name: "ليكو",
        blurb: "الذراع الشرقي — مسقط رأس مانزوني، قمم تنحدر مباشرة إلى الماء.",
        metaTitle: "ليكو بالقارب · الذراع الآخر لبحيرة كومو",
        metaDesc:
          "ليكو هي عاصمة الذراع الآخر لبحيرة كومو — مسقط رأس أليساندرو مانزوني، مع جبل Resegone خلفية، وبحيرة مختلفة عن الغرب السياحي.",
        headline: "ليكو. <em>الذراع الآخر لبحيرة كومو.</em>",
        kicker: "الذراع الشرقي · 90 دقيقة بالقارب · مسقط رأس مانزوني · خلفية Resegone",
        paragraphs: [
          "ليكو هي عاصمة الذراع الشرقي لبحيرة كومو — ساق البحيرة التي تتجه جنوب-شرق من بيلاجيو حتى مدينة ليكو في طرفها. بحيرة مختلفة عن غرب السياحة: الجبال أعلى، البلدات بلدات عمل لا قرى منتجعات، وحركة القوارب صيادون محليون لا عبّارات إلى بيلاجيو.",
          "أليساندرو مانزوني، مؤلف I Promessi Sposi (المخطوبان) — الرواية المؤسسة للأدب الإيطالي الحديث — وُلد في ميلانو لكنه قضى صيف طفولته في Villa Manzoni في ليكو. الفيلا الآن متحف. السكان المحليون يقتبسون الافتتاحية ('Quel ramo del lago di Como, che volge a mezzogiorno...') كما يقتبس الإنجليز 'It is a truth universally acknowledged'.",
          "من الماء، Resegone — الجبل ذو الأسنان المنشاريّة الذي يهيمن على ليكو من الشرق — هو أكثر خلفيات البحيرة درامية. ينحدر مباشرة من 1875 متراً إلى الماء دون درجة أفقية. واجهة ليكو البحرية تمتد كيلومترين تحت هذه الإطلالة. لجولة خاصة ليوم كامل من كومو، ليكو رحلة طويلة — 90 دقيقة في الاتجاه — لكن تغير المنظر يكافئ الوقت.",
        ],
        goodToKnow: [
          "ليكو على بُعد 90 دقيقة بالقارب من كومو — ممكنة فقط في جولة ليوم كامل",
          "متحف Villa Manzoni: مفتوح الثلاثاء–الأحد، €6، على الواجهة البحرية",
          "إطلالة Resegone أفضل في فترة بعد الظهر مع ضوء من الغرب",
        ],
      },
    },
  },
];

/** IDs in PIN_BASE that the boat orbit animates between automatically.
 * The boat doesn't auto-orbit through the additional attraction pins
 * (isola_comacina, cassinella, blevio_torno, menaggio, lecco) — those
 * are only reached via hover from the side-list or attractions section. */
export const ORBIT_PIN_IDS = [
  "como",
  "cernobbio",
  "oleandra",
  "nesso",
  "argegno",
  "balbianello",
  "carlotta",
  "bellagio",
  "varenna",
];

// ─── External "Useful links" registry ────────────────────────────────
//
// Each attraction gets 3-5 curated outbound links surfaced in the
// sidebar of its detail page AND fed into the page's JSON-LD as
// `sameAs` / `subjectOf`. The label stays in its original language
// (Italian institutions are recognised by their original names; same
// rule as our toponym policy) — locale-aware UI strings ("Useful
// links" / "Link utili") live in translations.ts.
//
// Adding a new attraction? Append a new entry below keyed by slug and
// include at least: { type: "wiki" }, { type: "maps" }. The site
// degrades gracefully if a slug has no entry (sidebar panel simply
// renders nothing).

export type ExternalLinkType =
  | "official"   // The attraction's own official site
  | "maps"       // Google Maps pin
  | "wiki"       // Wikipedia (en for the EN locale; same URL for all)
  | "transport"  // Ferry / funicular / public transport operator
  | "tourism";   // Town tourism board or museum

export type ExternalLink = {
  label: string;
  url: string;
  type: ExternalLinkType;
};

/** Build a Google Maps "Search by name" URL anchored on lat/lng so
 *  the pin lands on the right spot regardless of the visitor's Maps
 *  locale. Coords come from PIN_BASE in translations.ts. */
const gmap = (name: string, lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}&query_place_id=&center=${lat},${lng}`;

export const EXTERNAL_LINKS_BY_SLUG: Record<string, ExternalLink[]> = {
  como: [
    { type: "official", label: "Funicolare di Como", url: "https://www.funicolarecomo.it" },
    { type: "official", label: "Cattedrale di Como", url: "https://www.cattedraledicomo.it" },
    { type: "wiki",     label: "Wikipedia · Como",   url: "https://en.wikipedia.org/wiki/Como" },
    { type: "maps",     label: "Google Maps",        url: gmap("Como Italy", 45.808, 9.085) },
    { type: "transport",label: "Navigazione Laghi", url: "https://www.navigazionelaghi.it" },
  ],
  bellagio: [
    { type: "tourism",  label: "Bellagio Lake Como",         url: "https://www.bellagiolakecomo.com" },
    { type: "official", label: "Giardini di Villa Melzi",    url: "https://www.giardinidivillamelzi.it" },
    { type: "official", label: "Grand Hotel Villa Serbelloni", url: "https://www.villaserbelloni.com" },
    { type: "wiki",     label: "Wikipedia · Bellagio",       url: "https://en.wikipedia.org/wiki/Bellagio,_Lombardy" },
    { type: "maps",     label: "Google Maps",                url: gmap("Bellagio Lake Como", 45.987, 9.260) },
  ],
  "villa-del-balbianello": [
    { type: "official", label: "FAI — Villa del Balbianello", url: "https://www.fondoambiente.it/luoghi/villa-del-balbianello" },
    { type: "wiki",     label: "Wikipedia · Villa del Balbianello", url: "https://en.wikipedia.org/wiki/Villa_del_Balbianello" },
    { type: "maps",     label: "Google Maps",                 url: gmap("Villa del Balbianello", 45.971, 9.197) },
  ],
  varenna: [
    { type: "official", label: "Villa Monastero",   url: "https://www.villamonastero.eu" },
    { type: "official", label: "Castello di Vezio", url: "https://www.castellodivezio.it" },
    { type: "wiki",     label: "Wikipedia · Varenna", url: "https://en.wikipedia.org/wiki/Varenna" },
    { type: "transport",label: "Navigazione Laghi · ferries", url: "https://www.navigazionelaghi.it" },
    { type: "maps",     label: "Google Maps",       url: gmap("Varenna Lake Como", 46.013, 9.284) },
  ],
  "villa-carlotta": [
    { type: "official", label: "Villa Carlotta",   url: "https://www.villacarlotta.it" },
    { type: "wiki",     label: "Wikipedia · Villa Carlotta", url: "https://en.wikipedia.org/wiki/Villa_Carlotta" },
    { type: "maps",     label: "Google Maps",      url: gmap("Villa Carlotta Tremezzo", 45.988, 9.222) },
  ],
  "isola-comacina": [
    { type: "wiki", label: "Wikipedia · Isola Comacina", url: "https://en.wikipedia.org/wiki/Isola_Comacina" },
    { type: "maps", label: "Google Maps",                url: gmap("Isola Comacina", 45.965, 9.171) },
  ],
  "villa-la-cassinella": [
    // Cassinella is a private estate with no public-facing official
    // site and no Wikipedia article — keep the entry but surface only
    // a Maps pin so the sidebar still has at least one anchor.
    { type: "maps", label: "Google Maps", url: gmap("Villa La Cassinella", 45.972, 9.202) },
  ],
  cernobbio: [
    { type: "official", label: "Villa d'Este",        url: "https://www.villadeste.com" },
    { type: "tourism",  label: "Cernobbio tourism",   url: "https://www.cernobbio.net" },
    { type: "wiki",     label: "Wikipedia · Cernobbio", url: "https://en.wikipedia.org/wiki/Cernobbio" },
    { type: "maps",     label: "Google Maps",         url: gmap("Cernobbio Lake Como", 45.844, 9.082) },
  ],
  "blevio-torno": [
    { type: "wiki", label: "Wikipedia · Blevio",          url: "https://en.wikipedia.org/wiki/Blevio" },
    { type: "wiki", label: "Wikipedia · Torno",           url: "https://en.wikipedia.org/wiki/Torno,_Lombardy" },
    { type: "maps", label: "Google Maps · Blevio / Torno", url: gmap("Blevio Torno Lake Como", 45.834, 9.108) },
  ],
  "moltrasio-laglio": [
    { type: "wiki", label: "Wikipedia · Laglio (Villa Oleandra)", url: "https://en.wikipedia.org/wiki/Laglio" },
    { type: "maps", label: "Google Maps · Laglio",                url: gmap("Laglio Lake Como", 45.864, 9.106) },
  ],
  nesso: [
    { type: "wiki", label: "Wikipedia · Nesso",          url: "https://en.wikipedia.org/wiki/Nesso" },
    { type: "maps", label: "Google Maps · Orrido di Nesso", url: gmap("Orrido di Nesso", 45.871, 9.158) },
  ],
  menaggio: [
    { type: "tourism",   label: "Menaggio tourism",  url: "https://www.menaggio.com" },
    { type: "transport", label: "Navigazione Laghi · Menaggio hub", url: "https://www.navigazionelaghi.it" },
    { type: "wiki",      label: "Wikipedia · Menaggio", url: "https://en.wikipedia.org/wiki/Menaggio" },
    { type: "maps",      label: "Google Maps",       url: gmap("Menaggio Lake Como", 46.022, 9.241) },
  ],
  lecco: [
    { type: "official", label: "Musei di Lecco (Manzoni)", url: "https://www.museilecco.org" },
    { type: "wiki",     label: "Wikipedia · Lecco",        url: "https://en.wikipedia.org/wiki/Lecco" },
    { type: "maps",     label: "Google Maps",              url: gmap("Lecco Italy", 45.853, 9.394) },
  ],
};
