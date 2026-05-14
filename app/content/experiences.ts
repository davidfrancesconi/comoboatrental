// The 4 "Beyond a tour" experience categories — surfaced as cards on
// the homepage and as dedicated SEO subpages at
// /<locale>/experiences/<slug>/.
//
// Content is adapted from Loris's legacy hub page
// (comoboatrental.it/private-boat-experiences-on-lake-como/), with
// each experience getting its own URL so Google can rank a page per
// long-tail intent ("wedding boat lake como", "lake como photoshoot
// boat", etc.) instead of one hub page trying to rank for all four.
//
// The structure intentionally mirrors content/attractions.ts — each
// experience has a localised copy block per locale, a hero image, and
// an optional list of "featured locations" that cross-link to
// attraction pages.

import type { Locale } from "../translations";

export type ExperienceCopy = {
  /** Short name used on the homepage card and breadcrumbs (~24 chars) */
  name: string;
  /** Short kicker shown above the title on the detail page */
  kicker: string;
  /** Hero H1 — may include <em> for gold accents */
  headline: string;
  /** SEO title (~60 chars) */
  metaTitle: string;
  /** SEO description (~150 chars) */
  metaDesc: string;
  /** 1-line description used on the homepage card */
  cardBlurb: string;
  /** 3-4 body paragraphs for the detail page */
  paragraphs: string[];
  /** Optional bullet list of what's included / featured */
  highlights?: string[];
  /** CTA label on the bottom of the detail page */
  ctaLabel: string;
};

export type Experience = {
  /** URL slug */
  slug: string;
  /** Hero image path under /public */
  image: string;
  /** Pin ids (matching translations.ts PIN_BASE) for featured Lake Como
   *  locations relevant to this experience. Drives cross-links to the
   *  attraction detail pages on the experience page. */
  featuredPinIds?: string[];
  copy: Record<Locale, ExperienceCopy>;
};

export const EXPERIENCE_SLUGS = [
  "weddings",
  "photoshoots",
  "captains",
  "private-tours",
] as const;

export type ExperienceSlug = (typeof EXPERIENCE_SLUGS)[number];

export const experiences: Experience[] = [
  // ─── Weddings & special occasions ───────────────────────────────
  {
    slug: "weddings",
    image: "/images/experiences/weddings.jpg",
    featuredPinIds: ["balbianello", "cernobbio", "carlotta", "bellagio"],
    copy: {
      en: {
        name: "Weddings & special occasions",
        kicker: "Lake Como · By private boat",
        headline: "Celebrate the moment on the <em>water.</em>",
        metaTitle: "Wedding & special occasion boat on Lake Como · Como Boat Rental",
        metaDesc:
          "Wedding boat transfer, marriage proposals and anniversaries on Lake Como aboard classic wooden boats with chilled Champagne and a private captain.",
        cardBlurb:
          "Weddings, proposals, anniversaries by boat. Champagne on board and bespoke service for unforgettable moments on the water.",
        paragraphs: [
          "Some moments deserve a setting that is truly unforgettable. Celebrating a special occasion on Lake Como by boat is the most elegant way to turn an important day into a timeless experience — arriving by water, surrounded by shimmering blue reflections, lush mountains and historic villas.",
          "Our luxury boat rental with professional captain is designed for weddings, proposals, anniversaries and private celebrations. Choose between our classic wooden motorboat and the polished Venetian water-taxi for a discreet, stylish arrival. Every detail is curated to reflect your vision — chilled Champagne on board and fully bespoke service.",
          "Exploring Lake Como by boat reveals hidden corners and iconic backdrops perfect for an unforgettable surprise. From a small private blessing in front of Villa del Balbianello to a sunset proposal off Bellagio, we orchestrate the moment — on the water.",
        ],
        highlights: [
          "Chilled Champagne and a curated playlist on board",
          "Discreet, multilingual captain who knows the lake intimately",
          "Wedding-day boat transfers between Villa d'Este, Villa Balbianello, Villa Carlotta and your reception",
          "Photographer-friendly stops at golden hour",
          "Full insurance and commercial passenger licence",
        ],
        ctaLabel: "Plan your private celebration",
      },
      it: {
        name: "Matrimoni e occasioni speciali",
        kicker: "Lago di Como · In barca privata",
        headline: "Celebra il momento <em>sull'acqua.</em>",
        metaTitle: "Matrimonio e occasioni speciali in barca sul Lago di Como",
        metaDesc:
          "Transfer di matrimonio in barca, proposte e anniversari sul Lago di Como a bordo di barche classiche in legno con Champagne e skipper privato.",
        cardBlurb:
          "Matrimoni, proposte, anniversari in barca. Champagne a bordo e servizio su misura per momenti indimenticabili sull'acqua.",
        paragraphs: [
          "Alcuni momenti meritano una cornice davvero indimenticabile. Celebrare un'occasione speciale sul Lago di Como in barca è il modo più elegante per trasformare un giorno importante in un'esperienza fuori dal tempo — arrivando dall'acqua, circondati dai riflessi blu, dai monti e dalle ville storiche.",
          "Il nostro noleggio barche di lusso con skipper professionista è pensato per matrimoni, proposte, anniversari e celebrazioni private. Scegli tra il nostro motoscafo classico in legno e il taxi-boat veneziano per un arrivo discreto e di stile. Ogni dettaglio è curato per riflettere la tua visione — Champagne ghiacciato a bordo e servizio interamente su misura.",
          "Esplorare il Lago di Como in barca rivela angoli nascosti e sfondi iconici, perfetti per una sorpresa indimenticabile. Da una piccola benedizione privata davanti a Villa del Balbianello a una proposta al tramonto davanti a Bellagio, orchestriamo il momento — sull'acqua.",
        ],
        highlights: [
          "Champagne ghiacciato e playlist personalizzata a bordo",
          "Skipper discreto e multilingue che conosce il lago a fondo",
          "Transfer di nozze tra Villa d'Este, Villa Balbianello, Villa Carlotta e il vostro ricevimento",
          "Fermate photographer-friendly all'ora dorata",
          "Assicurazione completa e licenza commerciale per trasporto passeggeri",
        ],
        ctaLabel: "Pianifica la tua celebrazione privata",
      },
      ru: {
        name: "Свадьбы и особые случаи",
        kicker: "Озеро Комо · На частной лодке",
        headline: "Празднуйте момент <em>на воде.</em>",
        metaTitle: "Свадьба и особые случаи на лодке · Озеро Комо",
        metaDesc:
          "Свадебный трансфер на лодке, предложения руки и сердца и юбилеи на озере Комо на классических деревянных лодках с шампанским и частным капитаном.",
        cardBlurb:
          "Свадьбы, предложения, юбилеи на лодке. Шампанское на борту и индивидуальный сервис для незабываемых моментов на воде.",
        paragraphs: [
          "Некоторые моменты заслуживают по-настоящему незабываемой обстановки. Празднование особого события на озере Комо на лодке — самый элегантный способ превратить важный день в вневременной опыт. Прибытие по воде, окружённое голубыми отражениями, горами и историческими виллами.",
          "Наша роскошная аренда лодки с профессиональным капитаном создана для свадеб, предложений, юбилеев и частных торжеств. Выберите классический деревянный катер или венецианский водный-такси для скромного и стильного прибытия. Каждая деталь продумана: охлаждённое шампанское на борту, полностью индивидуальный сервис.",
          "Прогулка по озеру Комо на лодке открывает скрытые уголки и культовые фоны, идеальные для незабываемого сюрприза. От небольшого частного благословения у Виллы Бальбьянелло до предложения на закате у Белладжо — мы оркестрируем момент на воде.",
        ],
        highlights: [
          "Охлаждённое шампанское и подобранный плейлист на борту",
          "Скромный многоязычный капитан, знающий озеро досконально",
          "Свадебные трансферы между Виллой д'Эсте, Бальбьянелло, Карлоттой и вашей церемонией",
          "Остановки для фото в золотой час",
          "Полная страховка и коммерческая лицензия на пассажирские перевозки",
        ],
        ctaLabel: "Спланируйте частное торжество",
      },
      ar: {
        name: "حفلات الزفاف والمناسبات الخاصة",
        kicker: "بحيرة كومو · على قارب خاص",
        headline: "احتفل باللحظة <em>على الماء.</em>",
        metaTitle: "حفلات الزفاف والمناسبات الخاصة بالقارب على بحيرة كومو",
        metaDesc:
          "نقل عروسٍ بالقارب وطلبات زواج وذكريات سنوية على بحيرة كومو على متن قوارب خشبية كلاسيكية مع شامبانيا وقبطان خاص.",
        cardBlurb:
          "حفلات زفاف، طلبات زواج، ذكريات على القارب. شامبانيا على المتن وخدمة مفصّلة للحظات لا تُنسى على الماء.",
        paragraphs: [
          "بعض اللحظات تستحق إطاراً لا يُنسى حقاً. الاحتفال بمناسبة خاصة على بحيرة كومو بالقارب هو الطريقة الأنيقة لتحويل يوم مهم إلى تجربة خالدة، الوصول من الماء محاطين بالانعكاسات الزرقاء، والجبال، والفلل التاريخية.",
          "خدمة تأجير القوارب الفاخرة لدينا مع قبطان محترف مصمّمة لحفلات الزفاف والخطبة والذكريات السنوية والاحتفالات الخاصة. اختر بين قارب خشبي كلاسيكي وقارب التاكسي الفينيسي للوصول الأنيق المحتشم. كل تفصيلة مدروسة — شامبانيا مبرّدة على المتن وخدمة تُفصَّل بالكامل وفق رؤيتك.",
          "استكشاف بحيرة كومو بالقارب يكشف زوايا خفيّة وخلفيات أيقونية مثالية لمفاجأة لا تُنسى. من مباركة صغيرة خاصة أمام فيلا بالبيانيلو إلى طلب يد عند الغروب أمام بيلاجيو — ننسّق اللحظة على الماء.",
        ],
        highlights: [
          "شامبانيا مبرّدة وقائمة موسيقى مختارة على المتن",
          "قبطان محتشم متعدد اللغات يعرف البحيرة بدقّة",
          "نقل يوم الزفاف بين فيلا ديستي وبالبيانيلو وكارلوتا وحفل استقبالكم",
          "محطات صديقة للمصوّر في الساعة الذهبية",
          "تأمين كامل ورخصة تجارية لنقل الركاب",
        ],
        ctaLabel: "خطّط احتفالكم الخاص",
      },
    },
  },

  // ─── Photoshoots & productions ──────────────────────────────────
  {
    slug: "photoshoots",
    image: "/images/experiences/photoshoots.jpg",
    featuredPinIds: ["cernobbio", "balbianello", "carlotta", "oleandra"],
    copy: {
      en: {
        name: "Photoshoots & productions",
        kicker: "Editorial · Pre-wedding · Fashion",
        headline: "From the water, the <em>best light.</em>",
        metaTitle: "Lake Como boat photoshoot & editorial production",
        metaDesc:
          "Private boat charter for fashion editorials, pre-wedding shoots and commercial productions on Lake Como — classic wooden boats and iconic villa backdrops.",
        cardBlurb:
          "Editorial, pre-wedding and commercial shoots aboard our wooden boats, Villa d'Este, Villa del Balbianello, golden hour on the lake.",
        paragraphs: [
          "Lake Como is one of the most iconic destinations in the world for artistic photography, weddings and exclusive productions. From the water the landscape reveals its most authentic beauty, offering a refined, intimate setting for private photo sessions, professional shoots and high-fashion editorials.",
          "Iconic backdrops like Villa Pizzo, Villa d'Este, Villa del Balbianello and Villa Erba create timeless frames. Changing light throughout the day — especially at sunset — deepens the reflections on the lake, adding atmosphere to every shot. The slow rhythm of a private boat lets each scene unfold naturally.",
          "Our fleet features classic luxury wooden boats and a traditional Venetian water-taxi, chosen for their distinctive character and timeless style. On request we arrange a full professional photographer service, tailored to private sessions, destination weddings and editorial productions.",
        ],
        highlights: [
          "Classic wooden boat or Venetian water-taxi as your moving set",
          "Backdrops include Villa d'Este, Villa del Balbianello, Villa Carlotta, Villa Erba",
          "Sunset slot reservations for golden-hour shoots",
          "Optional professional photographer + assistant on request",
          "Multilingual captain coordinating with your stylist + crew",
        ],
        ctaLabel: "Request a photoshoot quote",
      },
      it: {
        name: "Servizi fotografici e produzioni",
        kicker: "Editoriale · Pre-wedding · Moda",
        headline: "Dall'acqua, la <em>luce migliore.</em>",
        metaTitle: "Servizio fotografico in barca sul Lago di Como",
        metaDesc:
          "Charter privato per servizi fotografici editoriali, pre-wedding e produzioni commerciali sul Lago di Como — barche classiche in legno e sfondi di ville iconiche.",
        cardBlurb:
          "Riprese editoriali, pre-wedding e commerciali a bordo delle nostre barche in legno, Villa d'Este, Villa del Balbianello, ora dorata sul lago.",
        paragraphs: [
          "Il Lago di Como è una delle destinazioni più iconiche al mondo per la fotografia artistica, i matrimoni e le produzioni esclusive. Dall'acqua il paesaggio rivela la sua bellezza più autentica, offrendo una cornice raffinata e intima per sessioni fotografiche private, riprese professionali ed editoriali d'alta moda.",
          "Sfondi iconici come Villa Pizzo, Villa d'Este, Villa del Balbianello e Villa Erba creano inquadrature senza tempo. La luce che cambia durante il giorno — soprattutto al tramonto — esalta i riflessi sul lago, aggiungendo atmosfera a ogni scatto. Il ritmo lento di una barca privata lascia che ogni scena si sviluppi naturalmente.",
          "La nostra flotta comprende barche classiche in legno di lusso e un taxi-boat veneziano tradizionale, scelti per il carattere distintivo e lo stile senza tempo. Su richiesta organizziamo un servizio fotografico professionale completo, su misura per sessioni private, destination wedding e produzioni editoriali.",
        ],
        highlights: [
          "Barca classica in legno o taxi-boat veneziano come set in movimento",
          "Sfondi: Villa d'Este, Villa del Balbianello, Villa Carlotta, Villa Erba",
          "Slot al tramonto prenotabili per shoot all'ora dorata",
          "Fotografo professionista + assistente su richiesta",
          "Skipper multilingue che coordina con stylist e troupe",
        ],
        ctaLabel: "Richiedi un preventivo shooting",
      },
      ru: {
        name: "Фотосъёмки и производство",
        kicker: "Редакционные · Pre-wedding · Мода",
        headline: "С воды — <em>лучший свет.</em>",
        metaTitle: "Фотосессия на лодке на озере Комо",
        metaDesc:
          "Частный чартер для редакционных съёмок, pre-wedding и коммерческого производства на озере Комо — классические деревянные лодки и легендарные виллы.",
        cardBlurb:
          "Редакционные, свадебные и коммерческие съёмки на наших деревянных лодках, Вилла д'Эсте, Бальбьянелло, золотой час на озере.",
        paragraphs: [
          "Озеро Комо — одно из самых культовых мест в мире для художественной фотографии, свадеб и эксклюзивных съёмок. С воды пейзаж раскрывает свою самую подлинную красоту, предлагая утончённую, интимную обстановку для частных фотосессий, профессиональных съёмок и высокой моды.",
          "Иконичные фоны — Вилла Пиццо, Вилла д'Эсте, Бальбьянелло, Вилла Эрба — создают вневременные кадры. Меняющийся свет в течение дня, особенно на закате, усиливает отражения на воде и атмосферу каждого снимка. Медленный ритм частной лодки позволяет каждой сцене раскрыться естественно.",
          "Наш флот: классические роскошные деревянные лодки и традиционный венецианский водный-такси, выбранные за характер и вневременной стиль. По запросу организуем полный профессиональный фотосервис под частные сессии, destination weddings и редакционные съёмки.",
        ],
        highlights: [
          "Классическая деревянная лодка или венецианский водный-такси как движущийся сет",
          "Фоны: Вилла д'Эсте, Бальбьянелло, Карлотта, Эрба",
          "Закатные слоты под съёмки в золотой час",
          "Профессиональный фотограф + ассистент по запросу",
          "Многоязычный капитан координирует со стилистом и съёмочной группой",
        ],
        ctaLabel: "Запросить смету съёмки",
      },
      ar: {
        name: "جلسات تصوير وإنتاج",
        kicker: "تحريري · ما قبل الزفاف · أزياء",
        headline: "من الماء، <em>أفضل ضوء.</em>",
        metaTitle: "جلسة تصوير على قارب في بحيرة كومو",
        metaDesc:
          "تأجير قارب خاص لجلسات تصوير تحريرية وما قبل الزفاف وإنتاجات تجارية على بحيرة كومو — قوارب خشبية كلاسيكية وخلفيات فلل أيقونية.",
        cardBlurb:
          "تصوير تحريري وأعراس وتجاري على متن قواربنا الخشبية، فيلا ديستي وبالبيانيلو والساعة الذهبية على البحيرة.",
        paragraphs: [
          "بحيرة كومو من أكثر الوجهات أيقونية في العالم للتصوير الفني وحفلات الزفاف والإنتاجات الحصرية. من الماء، يكشف المنظر جماله الحقيقي، ويوفّر إطاراً راقياً وحميماً للجلسات الخاصة والإنتاجات الاحترافية وأعمال الأزياء الراقية.",
          "خلفيات أيقونية مثل فيلا بيتسو، فيلا ديستي، بالبيانيلو، وفيلا إربا تصنع لقطات خالدة. الضوء المتغيّر طوال اليوم — خاصة عند الغروب — يعمّق انعكاسات البحيرة ويضيف عمقاً لكل لقطة. إيقاع القارب الخاص البطيء يدع كل مشهد ينكشف بطبيعيّة.",
          "أسطولنا يضم قوارب خشبية كلاسيكية فاخرة وقارب تاكسي فينيسي تقليدي اختيرت لخصوصيتها وأناقتها الخالدة. بناءً على الطلب، نُرتّب خدمة مصوّر محترف كاملة مخصّصة لجلسات خاصة، زفافات الوجهات والإنتاجات التحريرية.",
        ],
        highlights: [
          "قارب خشبي كلاسيكي أو تاكسي فينيسي كموقع تصوير متحرك",
          "خلفيات: فيلا ديستي، بالبيانيلو، كارلوتا، إربا",
          "حجوزات وقت الغروب للساعة الذهبية",
          "مصوّر محترف ومساعد بناءً على الطلب",
          "قبطان متعدد اللغات ينسّق مع المنسّق والفريق",
        ],
        ctaLabel: "اطلب عرض سعر للتصوير",
      },
    },
  },

  // ─── Expert & qualified captains ────────────────────────────────
  {
    slug: "captains",
    image: "/images/experiences/captains.jpg",
    featuredPinIds: [],
    copy: {
      en: {
        name: "Expert & qualified captains",
        kicker: "Lake Como local captains",
        headline: "<em>Skipper-led,</em> always.",
        metaTitle: "Lake Como skipper & private captain · Como Boat Rental",
        metaDesc:
          "Every Como Boat Rental tour is led by a fully licensed local captain — experienced, multilingual, and discreet. The lake's winds, currents and best stops, in one pair of hands.",
        cardBlurb:
          "Certified, multilingual captains who know the lake like a backyard — restaurant tips, hidden coves, perfect timing with the wind.",
        paragraphs: [
          "Our boat experience on Lake Como is defined by the expertise of our captains and the quality of our exclusive classic wooden boats. The service is led by qualified local captains who hold all the required authorisations and the highest professional certifications to operate on Lake Como — their experience and discretion guarantee a safe, smooth, refined journey at all times.",
          "Beyond navigation, our captains offer real local insight — suggesting the best lakeside restaurants, the right stops along the shore, and routes tailored to weather and timing. A deep understanding of Lake Como's winds is essential: the Tivano, the morning northerly, and the Breva, which rises in the afternoon from the south, are carefully considered when planning each outing.",
          "Our fleet consists exclusively of luxury classic wooden boats, including the elegant Venetian water-taxi. Combined with professional guidance, they offer the most authentic and comfortable way to experience Lake Como — with complete confidence.",
        ],
        highlights: [
          "Italian commercial passenger licence and €5M insurance",
          "Multilingual (Italian, English; Russian and Arabic by arrangement)",
          "Reading the wind: Tivano in the morning, Breva in the afternoon",
          "Restaurant pairings, hidden swim coves, sunset spots — all built into the route",
          "Family-run · three generations on this water",
        ],
        ctaLabel: "Meet the captains · Book a tour",
      },
      it: {
        name: "Skipper esperti e qualificati",
        kicker: "Skipper locali del Lago di Como",
        headline: "Sempre con <em>skipper a bordo.</em>",
        metaTitle: "Skipper e capitano privato sul Lago di Como",
        metaDesc:
          "Ogni tour Como Boat Rental è condotto da uno skipper locale autorizzato — esperto, multilingue, discreto. Venti, correnti e migliori soste del lago in una sola mano.",
        cardBlurb:
          "Skipper certificati e multilingue che conoscono il lago come il proprio giardino — consigli ristoranti, calette nascoste, tempi perfetti con il vento.",
        paragraphs: [
          "La nostra esperienza in barca sul Lago di Como è definita dall'esperienza dei nostri skipper e dalla qualità delle nostre barche classiche in legno. Il servizio è condotto da skipper locali qualificati con tutte le autorizzazioni richieste e le più alte certificazioni professionali per operare sul Lago di Como — la loro esperienza e discrezione garantiscono un viaggio sicuro, fluido e raffinato in ogni momento.",
          "Oltre alla navigazione, gli skipper offrono una vera conoscenza locale — suggerendo i migliori ristoranti sul lago, le soste giuste lungo le rive e percorsi adattati al meteo e all'orario. Una profonda conoscenza dei venti del Lago di Como è essenziale: il Tivano, vento del nord di mattina, e la Breva, che si alza nel pomeriggio da sud, sono considerati con cura nella pianificazione di ogni uscita.",
          "La nostra flotta è composta esclusivamente da barche classiche in legno di lusso, incluso l'elegante taxi-boat veneziano. Insieme alla guida professionale, offrono il modo più autentico e confortevole di vivere il Lago di Como — in totale tranquillità.",
        ],
        highlights: [
          "Licenza italiana per trasporto passeggeri commerciale e assicurazione €5M",
          "Multilingue (italiano, inglese; russo e arabo su richiesta)",
          "Leggere il vento: Tivano al mattino, Breva al pomeriggio",
          "Abbinamenti ristoranti, calette segrete, punti tramonto — tutto integrato nel percorso",
          "Gestione familiare · tre generazioni su quest'acqua",
        ],
        ctaLabel: "Conosci gli skipper · Prenota",
      },
      ru: {
        name: "Опытные сертифицированные капитаны",
        kicker: "Местные капитаны озера Комо",
        headline: "Всегда <em>с капитаном.</em>",
        metaTitle: "Капитан и шкипер на озере Комо · Como Boat Rental",
        metaDesc:
          "Каждый тур Como Boat Rental ведёт лицензированный местный капитан — опытный, многоязычный, скромный. Ветра, течения и лучшие остановки озера — в одних руках.",
        cardBlurb:
          "Сертифицированные многоязычные капитаны, знающие озеро как свой двор — рестораны, скрытые бухты, идеальное время с ветром.",
        paragraphs: [
          "Наш опыт на лодке на озере Комо определяется опытом капитанов и качеством классических деревянных лодок. Сервис ведут квалифицированные местные капитаны с необходимыми разрешениями и высочайшими профессиональными сертификатами для работы на озере — их опыт и скромность гарантируют безопасное, плавное, утончённое путешествие в любой момент.",
          "Помимо навигации, капитаны делятся настоящими местными знаниями — рекомендуют лучшие рестораны на берегу, правильные остановки и маршруты, адаптированные к погоде и времени. Глубокое понимание ветров озера Комо — обязательно: Тивано, утренний северный, и Брева, поднимающийся днём с юга, учитываются при планировании каждой прогулки.",
          "Наш флот — исключительно роскошные классические деревянные лодки и элегантный венецианский водный-такси. В сочетании с профессиональным руководством это самый аутентичный и комфортный способ ощутить озеро Комо — с полной уверенностью.",
        ],
        highlights: [
          "Итальянская коммерческая лицензия и страховка €5M",
          "Многоязычные (итальянский, английский; русский и арабский по договорённости)",
          "Чтение ветра: Тивано утром, Брева днём",
          "Подбор ресторанов, скрытые бухты, точки заката — встроены в маршрут",
          "Семейный бизнес · три поколения на этой воде",
        ],
        ctaLabel: "Познакомьтесь с капитанами · Забронируйте",
      },
      ar: {
        name: "قباطنة خبراء ومعتمدون",
        kicker: "قباطنة محليّون لبحيرة كومو",
        headline: "دائماً مع <em>قبطان على متن.</em>",
        metaTitle: "قبطان وربّان خاص على بحيرة كومو · Como Boat Rental",
        metaDesc:
          "كل جولة مع Como Boat Rental يقودها قبطان محلي مرخّص — خبير ومتعدد اللغات ومحتشم. رياح البحيرة وتيّاراتها وأفضل محطّاتها بيدٍ واحدة.",
        cardBlurb:
          "قباطنة معتمدون متعددو اللغات يعرفون البحيرة كحديقتهم — توصيات مطاعم، خلجان مخفية، توقيت مثالي مع الريح.",
        paragraphs: [
          "تجربة قواربنا على بحيرة كومو تتميّز بخبرة قباطنتنا وجودة قواربنا الخشبية الكلاسيكية الحصرية. تقود الخدمة قباطنة محليّون مؤهّلون يحملون كل التراخيص اللازمة وأعلى الشهادات المهنية للعمل على بحيرة كومو — خبرتهم وكتمانهم يضمنان رحلة آمنة وسلسة ومتقنة في كل لحظة.",
          "خلف الملاحة، يقدّم قباطنتنا معرفةً محليّة حقيقية — يقترحون أفضل المطاعم على ضفّة البحيرة، المحطات المناسبة على الشاطئ، ومسارات تُكيَّف وفق الطقس والتوقيت. الفهم العميق لرياح كومو ضروري: التيفانو، رياح الشمال الصباحية، والبريفا، التي تنشط بعد الظهر من الجنوب، تُؤخذ بعين الاعتبار في كل خرجة.",
          "أسطولنا حصرياً من القوارب الخشبية الكلاسيكية الفاخرة، شاملاً قارب التاكسي الفينيسي الأنيق. مع التوجيه المحترف، هي الأسلوب الأكثر أصالةً وراحة لاكتشاف بحيرة كومو — بكامل الاطمئنان.",
        ],
        highlights: [
          "ترخيص إيطالي تجاري لنقل الركاب وتأمين €5M",
          "متعدد اللغات (إيطالي، إنجليزي؛ روسي وعربي حسب الترتيب)",
          "قراءة الرياح: التيفانو صباحاً، البريفا بعد الظهر",
          "اقتراحات مطاعم، خلجان سرّية، نقاط الغروب — كلها مدمجة في المسار",
          "إدارة عائلية · ثلاثة أجيال على هذه المياه",
        ],
        ctaLabel: "تعرّفوا على القباطنة · احجزوا جولة",
      },
    },
  },

  // ─── Private boat tours ─────────────────────────────────────────
  {
    slug: "private-tours",
    image: "/images/experiences/private-tours.jpg",
    featuredPinIds: ["bellagio", "balbianello", "cernobbio", "varenna"],
    copy: {
      en: {
        name: "Private boat tours",
        kicker: "Half-day · Full-day · Bespoke",
        headline: "The lake, <em>at your own pace.</em>",
        metaTitle: "Private boat tours on Lake Como · Como Boat Rental",
        metaDesc:
          "Private half-day and full-day boat charters on Lake Como aboard classic wooden boats — Bellagio, Villa del Balbianello, Varenna and beyond, with a captain who knows every cove.",
        cardBlurb:
          "Half-day and full-day private charters on classic wooden boats. Bellagio, Balbianello, Varenna at your own pace, with a captain who knows every cove.",
        paragraphs: [
          "A private boat tour on Lake Como is the most elegant way to see the lake from its most exclusive perspective. Gliding over crystal-blue water, surrounded by dramatic mountains, historic villas and shimmering reflections of light, every moment unfolds with effortless beauty.",
          "Our exclusive boat rental with professional captain offers refined sightseeing aboard classic wooden boats — including timeless mahogany motorboats and a traditional Venetian water-taxi, renowned for craftsmanship and distinctive style. Polished wood, soft light and calm navigation create an intimate atmosphere, ideal for discovering Lake Como at your own pace.",
          "On a private tour, you can swim, sunbathe or stop at one of the lake's finest restaurants, while cruising past iconic villages such as Bellagio, Cernobbio and Tremezzo and world-famous villas including Villa del Balbianello and Villa Carlotta. On request, we design fully bespoke routes with multilingual guides and premium onboard service.",
        ],
        highlights: [
          "1-hour, 2-hour, 3-hour, half-day and full-day options",
          "Swim stops at hidden coves between Nesso and Lenno",
          "Restaurant docking at Crotto dei Platani, Il Gatto Nero, La Punta Bellagio",
          "Optional lunch picnic on board",
          "Pick-up from any private pier on the lake (Villa d'Este, Mandarin Oriental, Il Sereno, Passalacqua)",
        ],
        ctaLabel: "Plan your private tour",
      },
      it: {
        name: "Tour privati in barca",
        kicker: "Mezza giornata · Giornata intera · Su misura",
        headline: "Il lago, <em>al tuo ritmo.</em>",
        metaTitle: "Tour privati in barca sul Lago di Como · Como Boat Rental",
        metaDesc:
          "Charter privati di mezza giornata e giornata intera sul Lago di Como su barche classiche in legno — Bellagio, Villa del Balbianello, Varenna e oltre, con uno skipper che conosce ogni caletta.",
        cardBlurb:
          "Charter privati di mezza giornata o giornata intera su barche classiche in legno. Bellagio, Balbianello, Varenna al tuo ritmo, con uno skipper che conosce ogni caletta.",
        paragraphs: [
          "Un tour privato in barca sul Lago di Como è il modo più elegante di vedere il lago dalla sua prospettiva più esclusiva. Scivolando sull'acqua azzurra, circondati da montagne, ville storiche e riflessi cangianti, ogni momento si svolge con bellezza naturale.",
          "Il nostro noleggio barche esclusivo con skipper professionista offre visite raffinate a bordo di barche classiche in legno — inclusi motoscafi senza tempo in mogano e un taxi-boat veneziano tradizionale, riconosciuti per artigianato e stile distintivo. Legno lucido, luce soffusa e navigazione calma creano un'atmosfera intima, ideale per scoprire il Lago di Como al tuo ritmo.",
          "Durante un tour privato puoi fare il bagno, prendere il sole o fermarti in uno dei migliori ristoranti del lago, mentre navighi davanti a borghi iconici come Bellagio, Cernobbio e Tremezzo e a ville celebri come Villa del Balbianello e Villa Carlotta. Su richiesta progettiamo percorsi completamente su misura con guide multilingue e servizio premium a bordo.",
        ],
        highlights: [
          "Opzioni: 1h, 2h, 3h, mezza giornata, giornata intera",
          "Soste bagno in calette nascoste tra Nesso e Lenno",
          "Pranzo al Crotto dei Platani, Il Gatto Nero, La Punta Bellagio",
          "Picnic a bordo su richiesta",
          "Pick-up da qualsiasi pontile privato (Villa d'Este, Mandarin Oriental, Il Sereno, Passalacqua)",
        ],
        ctaLabel: "Progetta il tuo tour privato",
      },
      ru: {
        name: "Частные туры на лодке",
        kicker: "Полдня · Целый день · По запросу",
        headline: "Озеро <em>в вашем темпе.</em>",
        metaTitle: "Частные туры на лодке по озеру Комо · Como Boat Rental",
        metaDesc:
          "Частные чартеры на полдня и целый день по озеру Комо на классических деревянных лодках — Белладжо, Вилла Бальбьянелло, Варенна и далее.",
        cardBlurb:
          "Частные чартеры на полдня или целый день на классических деревянных лодках. Белладжо, Бальбьянелло, Варенна в вашем темпе.",
        paragraphs: [
          "Частный тур на лодке по озеру Комо — самый элегантный способ увидеть озеро из самой эксклюзивной перспективы. Скольжение по кристально-голубой воде, окружённой горами, историческими виллами и переливами света — каждый момент раскрывается с непринуждённой красотой.",
          "Наша эксклюзивная аренда лодки с профессиональным капитаном предлагает утончённый осмотр на классических деревянных лодках — включая вневременные катера из красного дерева и традиционный венецианский водный-такси, известные мастерством и характером. Полированное дерево, мягкий свет и спокойная навигация создают интимную атмосферу для открытия озера в вашем темпе.",
          "В частном туре можно купаться, загорать или остановиться в одном из лучших ресторанов озера, проплывая мимо культовых деревень — Белладжо, Черноббио, Тремеццо — и знаменитых вилл, включая Бальбьянелло и Карлотту. По запросу проектируем полностью индивидуальные маршруты с многоязычными гидами и премиум-сервисом на борту.",
        ],
        highlights: [
          "Варианты: 1 ч, 2 ч, 3 ч, полдня, целый день",
          "Остановки для купания в скрытых бухтах между Нессо и Ленно",
          "Обед на причале: Crotto dei Platani, Il Gatto Nero, La Punta Bellagio",
          "Пикник на борту по запросу",
          "Подача с любого частного причала (Villa d'Este, Mandarin Oriental, Il Sereno, Passalacqua)",
        ],
        ctaLabel: "Спланируйте частный тур",
      },
      ar: {
        name: "جولات قارب خاصة",
        kicker: "نصف يوم · يوم كامل · بطلب خاص",
        headline: "البحيرة <em>بإيقاعك الخاص.</em>",
        metaTitle: "جولات قارب خاصة على بحيرة كومو · Como Boat Rental",
        metaDesc:
          "تأجير قارب خاص لنصف يوم أو يوم كامل على بحيرة كومو على متن قوارب خشبية كلاسيكية — بيلاجيو، فيلا بالبيانيلو، فارينا وما بعدها.",
        cardBlurb:
          "تأجير قارب خاص لنصف يوم أو يوم كامل على قوارب خشبية كلاسيكية. بيلاجيو، بالبيانيلو، فارينا بإيقاعكم الخاص.",
        paragraphs: [
          "جولة قارب خاصة على بحيرة كومو هي الأسلوب الأكثر أناقة لرؤية البحيرة من منظورها الأكثر حصرية. الانزلاق فوق الماء الأزرق الصافي، محاطين بالجبال والفلل التاريخية والانعكاسات اللامعة، كل لحظة تنكشف بجمال بديهي.",
          "تأجير قواربنا الحصري مع قبطان محترف يقدّم مشاهدة راقية على قوارب خشبية كلاسيكية — تشمل قوارب ماهوغني خالدة وتاكسي فينيسي تقليدي، يُعرَفان بالحرفية والأناقة. الخشب المصقول، الضوء الناعم، والملاحة الهادئة تخلق أجواءً حميمة، مثالية لاكتشاف بحيرة كومو بإيقاعكم الخاص.",
          "في جولة خاصة، يمكنكم السباحة والاستمتاع بالشمس أو التوقف في أحد أرقى مطاعم البحيرة، أثناء الإبحار قرب قرى أيقونية مثل بيلاجيو وتشيرنوبيو وتريميتسو وفلل شهيرة كفيلا بالبيانيلو وفيلا كارلوتا. بناءً على الطلب نصمّم مسارات مفصّلة بالكامل مع مرشدين متعددي اللغات وخدمة بريميوم على المتن.",
        ],
        highlights: [
          "خيارات: ساعة، ساعتان، ثلاث ساعات، نصف يوم، يوم كامل",
          "محطات سباحة في خلجان مخفية بين نيسو ولينو",
          "غداء على رصيف Crotto dei Platani و Il Gatto Nero و La Punta Bellagio",
          "بكنيك على المتن بناءً على الطلب",
          "الإقلال من أي مرفأ خاص (Villa d'Este، Mandarin Oriental، Il Sereno، Passalacqua)",
        ],
        ctaLabel: "خطّط جولتك الخاصة",
      },
    },
  },
];

export const EXPERIENCE_BY_SLUG: Record<string, Experience> = Object.fromEntries(
  experiences.map((e) => [e.slug, e]),
);
