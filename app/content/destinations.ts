// Long-form copy for the per-destination pages.
//
// Slugs follow PIN_BASE in app/translations.ts so destinations and the
// homepage map share the same identifier. Geo coordinates are also
// pulled from PIN_BASE — see app/[locale]/destinations/[slug]/page.tsx.

import type { Locale } from "../translations";

export type DestinationCopy = {
  metaTitle: string;
  metaDesc: string;
  /** Page hero headline (may include <em>) */
  headline: string;
  kicker: string;
  /** 2–4 paragraphs of body copy */
  paragraphs: string[];
  /** Slugs of tours that visit this destination, for cross-linking */
  toursThatVisit: string[];
  /** A small "good to know" bullet list */
  goodToKnow: string[];
};

export const DESTINATION_SLUGS = [
  "bellagio",
  "varenna",
  "villa-del-balbianello",
  "villa-carlotta",
  "cernobbio",
  "nesso",
] as const;

export type DestinationSlug = (typeof DESTINATION_SLUGS)[number];

export type DestinationEntry = {
  slug: DestinationSlug;
  /** Pin id in PIN_BASE (translations.ts) */
  pinId: string;
  hero: string;
  copy: Record<Locale, DestinationCopy>;
};

export const destinations: DestinationEntry[] = [
  // ─── Bellagio ─────────────────────────────────────────────────
  {
    slug: "bellagio",
    pinId: "bellagio",
    hero: "/images/bellagio.jpg",
    copy: {
      en: {
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
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "1 hour ashore is enough for lunch and the main piazza; 2 hours if you also want to walk to Punta Spartivento",
          "Cars are difficult — Bellagio's streets are stairs, not roads. Boats arrive cleanly at the pier",
          "The best photo of Bellagio is taken from the water, not from the village — bring your camera ready",
        ],
      },
      it: {
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
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "1 ora a terra è sufficiente per pranzo e la piazza principale; 2 ore se volete arrivare anche a Punta Spartivento",
          "L'auto è scomoda — le vie di Bellagio sono scale, non strade. La barca arriva direttamente al pontile",
          "La foto più bella di Bellagio si scatta dall'acqua, non dal borgo — preparate la macchina fotografica",
        ],
      },
      ru: {
        metaTitle: "Беладжо на Лодке из Комо · Жемчужина Озера Комо",
        metaDesc:
          "Беладжо стоит на мысе, где озеро Комо разделяется на два рукава — лучший способ добраться это частная лодка из Комо. Сорок минут до причала под Гранд Отелем Villa Serbelloni, гид по обеду в Bilacus или Salice Blu, и сосед — Варенна на восточном берегу.",
        headline: "Беладжо. <em>Жемчужина озера Комо.</em>",
        kicker: "Деревня на мысе · 30 км к северу от Комо · 1 час на лодке",
        paragraphs: [
          "Беладжо — деревня на длинной полоске суши, где озеро Комо делится на два рукава: Комо и Лекко. Это самая посещаемая остановка на озере с тех пор, как древние римляне построили здесь свои виллы, и мощёные улочки за гаванью — Salita Mella, Salita Serbelloni — поднимаются к террасным ресторанам с видом сразу на оба рукава озера.",
          "Прибыть в Беладжо на лодке — это способ, которым деревня хочет, чтобы её увидели. Паром из Варенны занимает пятнадцать минут; общественный катер из Комо — девяносто. Частный тур на лодке из Комо занимает около сорока минут и высаживает вас у одного из небольших причалов под Grand Hotel Villa Serbelloni, в десяти метрах от мощёных ступеней, ведущих на Piazza San Giacomo.",
          "Обед в Беладжо — естественная середина полудневного тура на лодке по озеру Комо. Два ресторана, в которых мы бронируем чаще всего: Bilacus, семейная траттория в одной улице от гавани, с лучшей горной полентой и озёрным missoltini; и Salice Blu, сезонная кухня более высокого уровня на крутой улице к церкви. Оба держат столики для гостей наших лодок — сообщите за день, и вас будут ждать.",
        ],
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "1 час на берегу хватает на обед и главную площадь; 2 часа — если хотите дойти до Punta Spartivento",
          "Машина неудобна — улицы Беладжо это лестницы. Лодка же причаливает прямо у деревни",
          "Лучший снимок Беладжо — с воды, не из деревни. Подготовьте камеру",
        ],
      },
      ar: {
        metaTitle: "جولة بالقارب إلى بيلاجيو من كومو · لؤلؤة بحيرة كومو",
        metaDesc:
          "بيلاجيو تقع على الرأس حيث تنقسم بحيرة كومو إلى ذراعين — أفضل طريقة للوصول هي القارب الخاص من كومو. أربعون دقيقة إلى الرصيف تحت فندق Villa Serbelloni الكبير، دليل غداء في Bilacus أو Salice Blu، وفارينا الجارة على الضفة الشرقية.",
        headline: "بيلاجيو. <em>لؤلؤة بحيرة كومو.</em>",
        kicker: "قرية الرأس · 30 كم شمال كومو · ساعة واحدة بالقارب",
        paragraphs: [
          "بيلاجيو قرية على شريط من اليابسة حيث تنقسم بحيرة كومو إلى ذراعَي كومو وليكو. كانت أكثر محطات البحيرة زيارة منذ بنى الرومان فيها فيلاتهم الأولى، والشوارع المرصوفة خلف المرفأ — Salita Mella وSalita Serbelloni — تصعد إلى مطاعم على شرفات تطلّ على ذراعَي البحيرة في الوقت نفسه.",
          "الوصول إلى بيلاجيو بالقارب هو الطريقة التي تستحقها القرية. العبّارة من فارينا تستغرق خمس عشرة دقيقة؛ والقارب العام من كومو تسعين دقيقة. الجولة الخاصة بالقارب تستغرق نحو أربعين دقيقة من كومو وتُنزلكم عند أحد الأرصفة الصغيرة تحت Grand Hotel Villa Serbelloni، على بعد عشرة أمتار من السلالم المرصوفة المؤدية إلى ساحة Piazza San Giacomo.",
          "الغداء في بيلاجيو هو نقطة المنتصف الطبيعية لجولة نصف يوم بالقارب على بحيرة كومو. المطعمان اللذان نحجز فيهما عادةً: Bilacus، تراتوريا عائلية على بُعد شارع من المرفأ تقدم أفضل بولينتا الجبل وميسولتيني البحيرة؛ وSalice Blu، مطبخ موسمي راقٍ على الشارع المنحدر نحو الكنيسة. كلاهما يحتفظان بطاولة لضيوف قواربنا — أخبرونا قبل يوم وستجدون استقبالكم.",
        ],
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "ساعة على الأرض تكفي للغداء والميدان الرئيسي؛ ساعتان إن أردتم الوصول إلى Punta Spartivento",
          "السيارة غير عملية — شوارع بيلاجيو سلالم. القارب يصل مباشرة إلى الرصيف",
          "أفضل صورة لبيلاجيو تُلتقط من الماء، لا من القرية. جهّزوا الكاميرا",
        ],
      },
    },
  },

  // ─── Varenna ─────────────────────────────────────────────────
  {
    slug: "varenna",
    pinId: "varenna",
    hero: "/images/balbianello.jpg",
    copy: {
      en: {
        metaTitle: "Varenna by Boat · The Quieter East-Shore Village — Como Boat Rental",
        metaDesc:
          "Varenna sits on Lake Como's eastern shore, opposite Bellagio. Smaller, quieter, and arguably the prettiest old town on the lake. Arrive by private boat from Como.",
        headline: "Varenna. <em>The east shore's quiet jewel.</em>",
        kicker: "East-shore village · across from Bellagio · 1h 15 by boat",
        paragraphs: [
          "Varenna is what visitors hope Bellagio still is. Smaller, quieter, with a pastel-painted lakefront walk — the Passeggiata degli Innamorati — that follows the water's edge from the ferry pier to the village square. The old town climbs up the hill behind, with stone alleys, a 12th-century church, and the ruins of Castello di Vezio with views over both lakes.",
          "It's roughly an hour and fifteen minutes from Como by private boat, and the most pleasant way to combine it with Bellagio: drop in Varenna for the morning, ferry across to Bellagio for lunch (the public ferry takes fifteen minutes), and we collect you at Bellagio in the afternoon. Or invert it. Both villages are at their best with the late-afternoon light, so we time the eastern stop accordingly.",
          "For lunch in Varenna we book Ristorante La Vista, perched on the road above the village with the best terrace view of the lake on the eastern shore. Quieter and more local than the equivalents in Bellagio, with a kitchen that does pesce in carpione well.",
        ],
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Smaller than Bellagio — 90 minutes ashore covers the village comfortably",
          "Castello di Vezio is a 20-minute walk up; skip if you have less than 90 minutes",
          "The lakefront walk (Passeggiata degli Innamorati) is the prettiest minute on the lake",
        ],
      },
      it: {
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
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Più piccola di Bellagio — 90 minuti a terra coprono comodamente il borgo",
          "Il Castello di Vezio è 20 minuti a piedi in salita; saltatelo se avete meno di 90 minuti",
          "La Passeggiata degli Innamorati è il minuto più bello del lago",
        ],
      },
      ru: {
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
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Меньше Беладжо — 90 минут на берегу комфортно покрывают деревню",
          "Castello di Vezio — 20 минут в гору; пропустите, если у вас меньше 90 минут",
          "Прогулка вдоль воды (Passeggiata degli Innamorati) — самая красивая минута на озере",
        ],
      },
      ar: {
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
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "أصغر من بيلاجيو — 90 دقيقة على الأرض تغطي القرية بكل راحة",
          "قلعة Castello di Vezio على بُعد 20 دقيقة سيراً صعوداً؛ تخطّوها إن كان لديكم أقل من 90 دقيقة",
          "ممشى Passeggiata degli Innamorati هو أجمل دقيقة على البحيرة",
        ],
      },
    },
  },

  // ─── Villa del Balbianello ───────────────────────────────────
  {
    slug: "villa-del-balbianello",
    pinId: "balbianello",
    hero: "/images/balbianello.jpg",
    copy: {
      en: {
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
        toursThatVisit: ["balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "FAI gardens open mid-March to mid-November · daily except Mondays & Wednesdays · 10:00–18:00",
          "Disembarkation requires a FAI ticket booked in advance (€20 adult, free for FAI members)",
          "If you skip the disembarkation, 10 minutes from the water is enough for the photo",
        ],
      },
      it: {
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
        toursThatVisit: ["balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Giardini FAI aperti da metà marzo a metà novembre · ogni giorno tranne lunedì e mercoledì · 10:00–18:00",
          "Lo sbarco richiede biglietto FAI prenotato in anticipo (€20 adulto, gratis soci FAI)",
          "Senza sbarco, 10 minuti dall'acqua bastano per la foto",
        ],
      },
      ru: {
        metaTitle: "Вилла дель Бальбьянелло на Лодке · Casino Royale, Star Wars",
        metaDesc:
          "Вилла дель Бальбьянелло — кинематографический центр озера Комо на полуострове в Ленно. Места съёмок Casino Royale и Star Wars Episode II. Лучший вид с воды; частный тур на лодке из Комо с возможностью высадки в саду FAI.",
        headline: "Вилла дель Бальбьянелло. <em>Кинематографическая жемчужина озера Комо.</em>",
        kicker: "Полуостров в Ленно · вилла и сады XVIII века · лучший вид только с воды",
        paragraphs: [
          "Вилла дель Бальбьянелло — самая фотографируемая вилла озера Комо и самая снимаемая в кино: Casino Royale (сцены «выздоровления Бонда»), Star Wars Episode II (свадьба Энакина и Падме), A Month by the Lake и длинный список модных съёмок. Вилла стоит на оконечности полуострова Доссо д'Аведо, лесистого мыса возле Ленно на западном берегу, и единственная дорога к ней — пятнадцатиминутная пешая тропа через лес. Другой способ — тот, что использует Дэниел Крейг в фильме о Бонде — это лодка.",
          "Вилла была построена в 1787 году на фундаменте францисканского монастыря XIII века и подарена FAI (Итальянскому национальному фонду) в 1988 году её последним владельцем — исследователем Гвидо Монцино. Сады, разбитые вокруг лоджии на оконечности полуострова, единственные на озере, обнимающие здание с трёх сторон — севера, запада и юга, — что и даёт аллее кипарисов и виду из лоджии тот ракурс, который используют фильмы.",
          "С воды виден весь фасад с лоджией, аллея кипарисов, поднимающаяся к садам, и небольшой причал, у которого Бонд сходит на берег. Шкипер удерживает лодку в кинематографической точке десять минут. Если хотите высадиться и пройтись по садам, мы оставим вас у причала FAI и заберём через 60–90 минут — билет FAI €20 за взрослого, сады открыты с середины марта до середины ноября, ежедневно кроме понедельников и сред.",
        ],
        toursThatVisit: ["balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Сады FAI открыты с середины марта до середины ноября · ежедневно кроме пн и ср · 10:00–18:00",
          "Высадка требует билет FAI, забронированный заранее (€20 за взрослого, бесплатно для членов FAI)",
          "Без высадки 10 минут с воды достаточно для фотографии",
        ],
      },
      ar: {
        metaTitle: "فيلا دل بالبيانيلو بالقارب · كازينو رويال وحرب النجوم",
        metaDesc:
          "فيلا دل بالبيانيلو على شبه جزيرة في لينو، التحفة السينمائية لبحيرة كومو. موقع تصوير كازينو رويال وحرب النجوم: الجزء الثاني. تُرى في أبهى صورها من الماء؛ جولة قارب خاصة من كومو مع إمكانية النزول في حدائق FAI.",
        headline: "فيلا دل بالبيانيلو. <em>التحفة السينمائية لبحيرة كومو.</em>",
        kicker: "شبه جزيرة لينو · فيلا وحدائق من القرن الثامن عشر · أفضل من الماء",
        paragraphs: [
          "فيلا دل بالبيانيلو هي أكثر فيلا تم تصويرها على بحيرة كومو، وأكثرها استخداماً في السينما: كازينو رويال (مشاهد تعافي بوند)، حرب النجوم: الجزء الثاني (زفاف أناكين وبادمي)، A Month by the Lake، وقائمة طويلة من التحريرات الأزيائية. تقع الفيلا في طرف شبه جزيرة Dosso d'Avedo، رأس برّي مكسوّ بالأشجار قرب لينو على الضفة الغربية، والطريق الوحيد البرّي إليها هو ممرّ مشي مدته خمس عشرة دقيقة عبر الغابة. الطريقة الأخرى للوصول — وهي التي يستخدمها دانيال كريغ في فيلم بوند — هي القارب.",
          "بُنيت الفيلا عام 1787 على أساس دير فرنسيسكاني من القرن الثالث عشر، وأهداها مالكها الأخير المستكشف Guido Monzino إلى مؤسسة FAI الإيطالية عام 1988. الحدائق، المُنظَّمة حول اللوجيا في طرف شبه الجزيرة، هي الوحيدة على البحيرة التي تحتضن المبنى من ثلاث جهات — شمالاً وغرباً وجنوباً — وهو ما يمنح ممرّ السرو والمنظر من اللوجيا التأطير الذي تستخدمه الأفلام.",
          "من على متن القارب تشاهدون الواجهة الكاملة باللوجيا، ممرّ السرو الصاعد إلى الحدائق، والرصيف الصغير حيث ينزل بوند إلى البر. يثبّت الربان القارب في الزاوية السينمائية لمدة عشر دقائق. إذا رغبتم في النزول والتجوّل في الحدائق، نُنزلكم عند رصيف FAI ونعود لاصطحابكم بعد 60 إلى 90 دقيقة — تذكرة FAI €20 للبالغ، الحدائق مفتوحة من منتصف مارس إلى منتصف نوفمبر، يومياً ما عدا الإثنين والأربعاء.",
        ],
        toursThatVisit: ["balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "حدائق FAI مفتوحة من منتصف مارس إلى منتصف نوفمبر · يومياً ما عدا الإثنين والأربعاء · 10:00–18:00",
          "النزول يتطلب تذكرة FAI محجوزة مسبقاً (€20 للبالغ، مجاني لأعضاء FAI)",
          "بدون نزول، 10 دقائق من الماء تكفي للصورة",
        ],
      },
    },
  },

  // ─── Villa Carlotta ──────────────────────────────────────────
  {
    slug: "villa-carlotta",
    pinId: "carlotta",
    hero: "/images/balbianello.jpg",
    copy: {
      en: {
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
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Gardens at peak from mid-April to mid-June",
          "Entry €12 · open daily 9:30–18:00 from late March to early November",
          "Allow 90 minutes for the gardens; the art collection inside the villa is small but worthwhile",
        ],
      },
      it: {
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
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Giardini al massimo da metà aprile a metà giugno",
          "Ingresso €12 · aperto ogni giorno 9:30–18:00 da fine marzo a inizio novembre",
          "Calcolate 90 minuti per i giardini; la collezione d'arte interna è piccola ma ne vale la pena",
        ],
      },
      ru: {
        metaTitle: "Вилла Карлотта на Лодке · Сады Азалий и Рододендронов на Озере Комо",
        metaDesc:
          "Вилла Карлотта в Тремеццо: дворец 1690 года с ботаническими садами, спускающимися к воде. Самая красочная вилла озера Комо с середины апреля до середины июня. Высадка возможна с билетом €12. Лучше всего видно с воды.",
        headline: "Вилла Карлотта. <em>Ботаническая жемчужина озера Комо.</em>",
        kicker: "Тремеццо · вилла XVIII века и сады 70 000 м²",
        paragraphs: [
          "Вилла Карлотта стоит на западном берегу в Тремеццо, напротив Беладжо. Построена в 1690 году для миланского банкира Джорджо Клеричи, затем приобретена в XIX веке принцессой Марианной Нассау как свадебный подарок дочери Шарлотте (отсюда и название), вилла известна не столько своей коллекцией искусства, сколько садами — семь гектаров, спускающихся от дома к озеру, засаженных пятью сотнями видов азалий, рододендронов и камелий.",
          "С середины апреля до середины июня склон в полном цветении, и вилла становится самым красочным местом на озере Комо. С воды сады заполняют кадр: бледно-розовая вилла наверху и ряды азалий на лужайках внизу. Шкипер делает паузу для фотографии.",
          "Высадка проста — у Виллы Карлотта свой небольшой причал, и вход с билетной кассой расположен прямо на нём. €12 за взрослого; визит спокойно укладывается в 90 минут. Мы держим лодку или возвращаемся за вами в согласованное время.",
        ],
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Сады в пике цветения с середины апреля до середины июня",
          "Вход €12 · ежедневно 9:30–18:00 с конца марта до начала ноября",
          "Закладывайте 90 минут на сады; коллекция искусства внутри виллы небольшая, но достойная",
        ],
      },
      ar: {
        metaTitle: "فيلا كارلوتا بالقارب · حدائق الأزاليا والرودودندرون على بحيرة كومو",
        metaDesc:
          "فيلا كارلوتا في تريميتسو: قصر من عام 1690 بحدائق نباتية تنحدر إلى الماء. أكثر الفيلات لوناً على بحيرة كومو من منتصف أبريل إلى منتصف يونيو. النزول ممكن بتذكرة €12. تُرى في أبهى صورها من الماء.",
        headline: "فيلا كارلوتا. <em>الجوهرة النباتية لبحيرة كومو.</em>",
        kicker: "تريميتسو · فيلا القرن الثامن عشر وحدائق 70,000 م²",
        paragraphs: [
          "فيلا كارلوتا تقع على الضفة الغربية في تريميتسو مُطلّةً على بيلاجيو. بُنيت عام 1690 للمصرفي الميلاني Giorgio Clerici، ثم اشترتها في القرن التاسع عشر الأميرة ماريانا من ناساو هدية زفاف لابنتها شارلوت (ومن هنا الاسم). الفيلا مشهورة لا بمجموعتها الفنية بقدر ما هي مشهورة بحدائقها — سبعة هكتارات تنحدر من المنزل إلى البحيرة، مزروعة بخمسمئة نوع من الأزاليا والرودودندرون والكاميليا.",
          "من منتصف أبريل إلى منتصف يونيو يكون المنحدر في كامل إزهاره، وتغدو الفيلا أكثر الأماكن لوناً على بحيرة كومو. من الماء تملأ الحدائق الإطار: الفيلا بلون الوردي الباهت في الأعلى وصفوف الأزاليا على المروج تحت. يتوقف الربّان للصورة.",
          "النزول سهل — لفيلا كارلوتا رصيف خاص صغير، وشباك التذاكر يقع عند الرصيف نفسه. €12 للبالغ؛ الزيارة تستغرق 90 دقيقة براحة. نُبقي القارب أو نعود لاصطحابكم في الوقت المتفق عليه.",
        ],
        toursThatVisit: ["top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "ذروة الإزهار من منتصف أبريل إلى منتصف يونيو",
          "الدخول €12 · يومياً 9:30–18:00 من أواخر مارس إلى أوائل نوفمبر",
          "خصصوا 90 دقيقة للحدائق؛ المجموعة الفنية داخل الفيلا صغيرة لكنها تستحق الزيارة",
        ],
      },
    },
  },

  // ─── Cernobbio ──────────────────────────────────────────────
  {
    slug: "cernobbio",
    pinId: "cernobbio",
    hero: "/images/hero-1.jpg",
    copy: {
      en: {
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
        toursThatVisit: ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Pick-up from the Villa d'Este pontoon is straightforward — tell us at booking",
          "First week of September is Forum Ambrosetti — lake access in front of Villa d'Este is restricted",
          "From the water you see Villa d'Este in full; from the road, only glimpses",
        ],
      },
      it: {
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
        toursThatVisit: ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Il pick-up dal pontile di Villa d'Este è semplice — diteci alla prenotazione",
          "Prima settimana di settembre è Forum Ambrosetti — accesso al lago davanti a Villa d'Este limitato",
          "Dall'acqua si vede Villa d'Este intera; dalla strada solo scorci",
        ],
      },
      ru: {
        metaTitle: "Черноббио и Вилла д'Эсте на Лодке · Первая Остановка из Комо",
        metaDesc:
          "Черноббио — первая деревня к северу от Комо, в 15 минутах на частной лодке. Дом Grand Hotel Villa d'Este (с 1568 года) — самой легендарной виллы озера Комо. Подача от пристани Villa d'Este или включается в часовой тур.",
        headline: "Черноббио. <em>Где начинается озеро Комо.</em>",
        kicker: "Первая деревня к северу от Комо · 15 минут на лодке",
        paragraphs: [
          "Черноббио — первая настоящая остановка озера. В пятнадцати минутах от Комо на лодке деревня обнимает западный берег у подножия Монте-Бисбино, и её набережная во главе с Grand Hotel Villa d'Este — виллой 1568 года, ставшей отелем в 1873-м и с тех пор самым легендарным адресом озера Комо. Мы регулярно делаем подачу у его причала.",
          "Forum Ambrosetti, ежегодное собрание европейских бизнес- и политических лидеров, занимает Villa d'Este каждый сентябрь. Если вы плывёте мимо в неделю Forum, озеро перед отелем закрыто из соображений безопасности; мы планируем маршрут с учётом этого. Вне этой недели сады Villa Erba по соседству — неоклассической виллы XIX века, когда-то принадлежавшей семье Лукино Висконти, — видны с воды и сдаются для мероприятий, когда не принимают торговые ярмарки.",
          "Черноббио — естественная точка разворота для часового тура: это самый фотографируемый миль от Комо и удобное место, чтобы развернуть лодку. На более длинных турах мы делаем паузу на несколько минут, чтобы дать вам впитать фасад Villa d'Este с воды — ракурс, охватывающий всю виллу 1568 года с её регулярными садами.",
        ],
        toursThatVisit: ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "Подача от пристани Villa d'Este — сообщите при бронировании",
          "Первая неделя сентября — Forum Ambrosetti, доступ к озеру перед Villa d'Este ограничен",
          "С воды видна вся Villa d'Este; с дороги — только проблески",
        ],
      },
      ar: {
        metaTitle: "تشيرنوبيو وفيلا ديستي بالقارب · أول محطة شمال كومو",
        metaDesc:
          "تشيرنوبيو هي أول قرية شمال مدينة كومو، على بُعد 15 دقيقة بالقارب الخاص. موطن Grand Hotel Villa d'Este (منذ عام 1568) — أعرق فندق على بحيرة كومو. استلام من رصيف Villa d'Este أو ضمن جولة الساعة.",
        headline: "تشيرنوبيو. <em>حيث تبدأ بحيرة كومو.</em>",
        kicker: "أول قرية شمال كومو · 15 دقيقة بالقارب",
        paragraphs: [
          "تشيرنوبيو هي المحطة الحقيقية الأولى على البحيرة. على بُعد خمس عشرة دقيقة من كومو بالقارب، تحتضن القرية الضفة الغربية عند سفح جبل Bisbino، وتسيطر على واجهتها البحرية Grand Hotel Villa d'Este — وهي فيلا تعود إلى عام 1568 تحوّلت إلى فندق عام 1873 وأصبحت منذ ذلك الحين أعرق عنوان على بحيرة كومو. نلتقط الضيوف بانتظام عند رصيفه.",
          "ينعقد Forum Ambrosetti — التجمع السنوي لقادة الأعمال والسياسة الأوروبيين — في Villa d'Este كل سبتمبر. إن مررتم في أسبوع المنتدى تُغلق البحيرة أمام الفندق لاعتبارات أمنية؛ نخطط الجولة مع أخذ ذلك بعين الاعتبار. خارج هذا الأسبوع تُشاهَد من الماء حدائق فيلا إربا المجاورة — وهي فيلا كلاسيكية حديثة من القرن التاسع عشر كانت ملكاً لعائلة المخرج Luchino Visconti — وتؤجَّر للفعاليات حين لا تستضيف معارض تجارية.",
          "تشيرنوبيو نقطة دوران طبيعية لجولة الساعة: هي الميل الأكثر تصويراً من كومو ومكان مريح لإعادة توجيه القارب. في الجولات الأطول نتوقف بضع دقائق لتستطيعوا استيعاب واجهة Villa d'Este من الماء، الزاوية التي تظهر الفيلا كاملةً مع حدائقها الإيطالية الرسمية.",
        ],
        toursThatVisit: ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "bespoke-full-day"],
        goodToKnow: [
          "الاستلام من رصيف Villa d'Este سهل — أخبرونا عند الحجز",
          "الأسبوع الأول من سبتمبر Forum Ambrosetti، الوصول إلى البحيرة أمام Villa d'Este مقيد",
          "من الماء تُرى Villa d'Este كاملة، من الشارع لمحات فقط",
        ],
      },
    },
  },

  // ─── Orrido di Nesso ─────────────────────────────────────────
  {
    slug: "nesso",
    pinId: "nesso",
    hero: "/images/balbianello.jpg",
    copy: {
      en: {
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
        toursThatVisit: ["balbianello-nesso", "bespoke-full-day"],
        goodToKnow: [
          "Visible only from the water — the most reliable way to see the falls",
          "Best after spring rain (April–June) or after a summer storm — the volume varies",
          "We hold the boat about 30 m off the gorge for the photograph",
        ],
      },
      it: {
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
        toursThatVisit: ["balbianello-nesso", "bespoke-full-day"],
        goodToKnow: [
          "Visibile solo dall'acqua — il modo più affidabile per vederla",
          "Al meglio dopo le piogge primaverili (aprile–giugno) o dopo un temporale estivo — la portata varia",
          "Teniamo la barca a circa 30 m dalla gola per la foto",
        ],
      },
      ru: {
        metaTitle: "Орридо ди Нессо на Лодке · Скрытый Водопад Озера Комо",
        metaDesc:
          "Орридо ди Нессо — узкое ущелье на восточном берегу озера Комо, где два горных ручья обрушиваются в озеро у каменного моста. Видна только с воды; включена в наш 2.5-часовой частный тур из Комо.",
        headline: "Орридо ди Нессо. <em>Водопад, которого не видно с дороги.</em>",
        kicker: "Ущелье восточного берега · 25 минут на лодке из Комо",
        paragraphs: [
          "Орридо ди Нессо — узкий каньон в деревне Нессо на восточном берегу озера Комо. Два ручья — Туф и Носе — падают вертикально с семидесяти метров в ущелье и впадают в озеро у подножия каменного моста, Понте-делла-Чивера, перекинутого через каньон на уровне деревни.",
          "С дороги, идущей по восточному берегу, ущелье невидимо: оно зажато между домами деревни. С озера каньон открывается между постройками, и виден весь перепад в обрамлении моста сверху. Мы останавливаем лодку примерно в тридцати метрах от ущелья — достаточно близко, чтобы почувствовать брызги в жаркий день, и достаточно далеко, чтобы в кадре оказались мост и деревня.",
          "Над ущельем — одна из самых красивых маленьких деревень озера: каменные переулки спускаются к небольшой часовне, и есть крытая лестница к каньону для выносливых пешеходов. Высадку мы не предлагаем — в Нессо нет подходящего причала для нашего типа лодки, — но если ущелье вас захватит, рекомендуем посетить его на машине во второй половине дня.",
        ],
        toursThatVisit: ["balbianello-nesso", "bespoke-full-day"],
        goodToKnow: [
          "Виден только с воды — самый надёжный способ увидеть водопад",
          "Лучше всего после весенних дождей (апрель–июнь) или после летней грозы — объём меняется",
          "Удерживаем лодку примерно в 30 м от ущелья для фотографии",
        ],
      },
      ar: {
        metaTitle: "أوريدو دي نيسو بالقارب · شلال بحيرة كومو المخفي",
        metaDesc:
          "أوريدو دي نيسو فجوة ضيقة على الضفة الشرقية لبحيرة كومو حيث يتساقط جدولان جبليان في البحيرة عند جسر حجري. لا يُرى إلا من الماء؛ ضمن جولتنا الخاصة لمدة 2.5 ساعة من كومو.",
        headline: "أوريدو دي نيسو. <em>الشلال الذي لا تراه الطريق.</em>",
        kicker: "فجوة الضفة الشرقية · 25 دقيقة بالقارب من كومو",
        paragraphs: [
          "أوريدو دي نيسو وادٍ ضيق عند قرية نيسو على الضفة الشرقية لبحيرة كومو. جدولان — Tuf وNosé — يسقطان عمودياً من ارتفاع سبعين متراً في الوادي ويصبّان في البحيرة عند قدم جسر حجري يُسمّى Ponte della Civera، يمتدّ عبر الوادي عند مستوى القرية.",
          "من الطريق التي تسير على الضفة الشرقية يكون الوادي خفياً تماماً: فهو متوارٍ بين بيوت القرية. أما من البحيرة فينفتح الوادي بين المباني ويظهر السقوط بأكمله مؤطَّراً بالجسر في الأعلى. نوقف القارب على بُعد ثلاثين متراً تقريباً من الفجوة — قريب بما يكفي للشعور برذاذ الماء في الأيام الحارة، وبعيد بما يكفي ليظهر الجسر والقرية في الصورة.",
          "فوق الوادي تقع إحدى أجمل قرى البحيرة الصغيرة: أزقّة حجرية تنحدر إلى كنيسة صغيرة وسلالم مغطّاة تنزل إلى الوادي للقادرين على المشي. لا نشمل النزول — لا يوجد رصيف مناسب لقاربنا في نيسو — لكن إن أسرتكم الفجوة فننصحكم بزيارة لاحقة بالسيارة في فترة بعد الظهر.",
        ],
        toursThatVisit: ["balbianello-nesso", "bespoke-full-day"],
        goodToKnow: [
          "تُرى فقط من الماء — الطريقة الأكثر موثوقية لمشاهدة الشلال",
          "في أفضل صورة بعد أمطار الربيع (أبريل–يونيو) أو بعد عاصفة صيفية — يتفاوت تدفّقه",
          "نُبقي القارب على بُعد نحو 30 متراً من الفجوة لأخذ الصورة",
        ],
      },
    },
  },
];
