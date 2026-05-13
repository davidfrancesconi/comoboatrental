// The 13 attractions shown in the horizontally-scrollable section below
// the map. Each card has a `pinId` matching one entry in PIN_BASE
// (translations.ts) — that's how the bidirectional hover (pin → attraction
// scroll, attraction → boat move) is wired.
//
// Photos in `/public/images/attractions/` are mostly downloaded from
// Wikimedia Commons (CC BY-SA / CC0) — see /public/images/attractions/CREDITS.md.
// A few are reused from /public/images/ where the existing photography
// already covers the location well.

import type { Locale } from "../translations";

export type AttractionCopy = { name: string; blurb: string };

export type Attraction = {
  id: string;
  /** Matches a pin id in PIN_BASE (translations.ts). All 13 attractions
   * have a corresponding pin — hover on either centres both. */
  pinId: string;
  /** Path under /public */
  image: string;
  copy: Record<Locale, AttractionCopy>;
};

export const attractions: Attraction[] = [
  {
    id: "como",
    pinId: "como",
    image: "/images/attractions/como.jpg",
    copy: {
      en: { name: "Como", blurb: "The main town and our departure point — Duomo, Funicolare, Villa Olmo." },
      it: { name: "Como", blurb: "La città capoluogo e il nostro punto di partenza — Duomo, Funicolare, Villa Olmo." },
      ru: { name: "Комо", blurb: "Главный город и наша точка отправления — Дуомо, фуникулёр, Вилла Ольмо." },
      ar: { name: "كومو", blurb: "المدينة الرئيسية ونقطة انطلاقنا — الكاتدرائية والقطار المعلّق وفيلا أولمو." },
    },
  },
  {
    id: "bellagio",
    pinId: "bellagio",
    image: "/images/bellagio.jpg",
    copy: {
      en: { name: "Bellagio", blurb: "The pearl of Lake Como — promontory village where the lake splits in two." },
      it: { name: "Bellagio", blurb: "La perla del Lago di Como — borgo del promontorio dove il lago si divide." },
      ru: { name: "Беладжо", blurb: "Жемчужина озера Комо — деревня на мысе, где озеро делится на два рукава." },
      ar: { name: "بيلاجيو", blurb: "لؤلؤة بحيرة كومو — قرية الرأس حيث تنقسم البحيرة إلى ذراعين." },
    },
  },
  {
    id: "balbianello",
    pinId: "balbianello",
    image: "/images/balbianello.jpg",
    copy: {
      en: { name: "Villa del Balbianello", blurb: "Casino Royale and Star Wars — the cinematic peninsula at Lenno." },
      it: { name: "Villa del Balbianello", blurb: "Casino Royale e Star Wars — la penisola cinematografica di Lenno." },
      ru: { name: "Вилла Бальбьянелло", blurb: "Casino Royale и Star Wars — кинематографический полуостров в Ленно." },
      ar: { name: "فيلا بالبيانيلو", blurb: "كازينو رويال وحرب النجوم — شبه الجزيرة السينمائية في لينو." },
    },
  },
  {
    id: "varenna",
    pinId: "varenna",
    image: "/images/attractions/varenna.jpg",
    copy: {
      en: { name: "Varenna", blurb: "The east shore's quiet jewel — pastel houses and the Passeggiata degli Innamorati." },
      it: { name: "Varenna", blurb: "Il gioiello tranquillo della sponda est — case pastello e Passeggiata degli Innamorati." },
      ru: { name: "Варенна", blurb: "Тихая жемчужина восточного берега — пастельные дома и Passeggiata degli Innamorati." },
      ar: { name: "فارينا", blurb: "جوهرة الضفة الشرقية الهادئة — منازل باستيل وممشى العشّاق." },
    },
  },
  {
    id: "carlotta",
    pinId: "carlotta",
    image: "/images/attractions/carlotta.jpg",
    copy: {
      en: { name: "Villa Carlotta & Tremezzo", blurb: "Botanical jewel — five hundred azaleas in bloom from April to June." },
      it: { name: "Villa Carlotta e Tremezzo", blurb: "Gioiello botanico — cinquecento azalee in fiore da aprile a giugno." },
      ru: { name: "Вилла Карлотта и Тремеццо", blurb: "Ботаническая жемчужина — пятьсот азалий в цвету с апреля по июнь." },
      ar: { name: "فيلا كارلوتا وتريميتسو", blurb: "جوهرة نباتية — خمسمئة من الأزاليا في إزهارها من أبريل إلى يونيو." },
    },
  },
  {
    id: "isola_comacina",
    pinId: "isola_comacina",
    image: "/images/attractions/isola-comacina.jpg",
    copy: {
      en: { name: "Isola Comacina", blurb: "The only island on Lake Como — overgrown ruins, a single iconic restaurant." },
      it: { name: "Isola Comacina", blurb: "L'unica isola del Lago di Como — rovine selvagge e un solo ristorante leggendario." },
      ru: { name: "Изола Комачина", blurb: "Единственный остров на озере Комо — заросшие руины и один легендарный ресторан." },
      ar: { name: "إيزولا كوماتشينا", blurb: "الجزيرة الوحيدة على بحيرة كومو — أطلال متشابكة ومطعم أسطوري واحد." },
    },
  },
  {
    id: "cassinella",
    pinId: "cassinella",
    image: "/images/attractions/cassinella.jpg",
    copy: {
      en: { name: "Villa La Cassinella", blurb: "The most exclusive private villa on the lake — Branson, Madonna, the A-list." },
      it: { name: "Villa La Cassinella", blurb: "La villa privata più esclusiva del lago — Branson, Madonna, la A-list." },
      ru: { name: "Вилла Ла Кассинелла", blurb: "Самая эксклюзивная частная вилла озера — Брэнсон, Мадонна, A-лист." },
      ar: { name: "فيلا لا كاسينيلا", blurb: "أكثر فيلا خاصة حصرية على البحيرة — برانسون ومادونا ونجوم الصف الأول." },
    },
  },
  {
    id: "cernobbio",
    pinId: "cernobbio",
    image: "/images/attractions/cernobbio.jpg",
    copy: {
      en: { name: "Cernobbio · Villa d'Este", blurb: "The lake's most legendary hotel — a 1568 villa hosting the Forum Ambrosetti." },
      it: { name: "Cernobbio · Villa d'Este", blurb: "L'hotel più leggendario del lago — una villa del 1568, sede del Forum Ambrosetti." },
      ru: { name: "Черноббио · Вилла д'Эсте", blurb: "Самый легендарный отель озера — вилла 1568 года, площадка Forum Ambrosetti." },
      ar: { name: "تشيرنوبيو · فيلا ديستي", blurb: "أعرق فندق على البحيرة — فيلا من 1568 ومقرّ منتدى Ambrosetti." },
    },
  },
  {
    id: "blevio_torno",
    pinId: "blevio_torno",
    image: "/images/attractions/blevio.jpg",
    copy: {
      en: { name: "Blevio & Torno", blurb: "Twin villages on the eastern shore — Mandarin Oriental and Il Sereno." },
      it: { name: "Blevio e Torno", blurb: "Borghi gemelli sulla sponda orientale — Mandarin Oriental e Il Sereno." },
      ru: { name: "Блевио и Торно", blurb: "Деревни-близнецы на восточном берегу — Mandarin Oriental и Il Sereno." },
      ar: { name: "بليفيو وتورنو", blurb: "قريتان توأمتان على الضفة الشرقية — Mandarin Oriental وIl Sereno." },
    },
  },
  {
    id: "oleandra",
    pinId: "oleandra",
    image: "/images/hero-1.jpg",
    copy: {
      en: { name: "Moltrasio, Carate Urio, Laglio", blurb: "Three villages strung along the western shore — Clooney's Villa Oleandra is here." },
      it: { name: "Moltrasio, Carate Urio, Laglio", blurb: "Tre paesi allineati sulla sponda occidentale — qui c'è Villa Oleandra di Clooney." },
      ru: { name: "Мольтразио, Карате Урио, Лальо", blurb: "Три деревни вдоль западного берега — здесь Вилла Олеандра Клуни." },
      ar: { name: "مولتراسيو وكاراتي أوريو ولاليو", blurb: "ثلاث قرى على الضفة الغربية — هنا فيلا أوليندرا لكلوني." },
    },
  },
  {
    id: "nesso",
    pinId: "nesso",
    image: "/images/attractions/nesso.jpg",
    copy: {
      en: { name: "Orrido di Nesso", blurb: "The hidden waterfall — visible only from the water, the most photographed gorge." },
      it: { name: "Orrido di Nesso", blurb: "La cascata nascosta — visibile solo dall'acqua, la gola più fotografata." },
      ru: { name: "Орридо ди Нессо", blurb: "Скрытый водопад — видимый только с воды, самое фотографируемое ущелье." },
      ar: { name: "أوريدو دي نيسو", blurb: "الشلال المخفي — لا يُرى إلا من الماء، الفجوة الأكثر تصويراً." },
    },
  },
  {
    id: "menaggio",
    pinId: "menaggio",
    image: "/images/attractions/menaggio.jpg",
    copy: {
      en: { name: "Menaggio", blurb: "Upper west shore — colourful lakefront, golf course, gateway to Lugano." },
      it: { name: "Menaggio", blurb: "Sponda ovest superiore — lungolago colorato, campo da golf, porta verso Lugano." },
      ru: { name: "Менаджо", blurb: "Верхний западный берег — яркая набережная, поле для гольфа, ворота в Лугано." },
      ar: { name: "ميناجيو", blurb: "أعلى الضفة الغربية — واجهة بحرية ملوّنة وملعب غولف وبوابة لوغانو." },
    },
  },
  {
    id: "lecco",
    pinId: "lecco",
    image: "/images/attractions/lecco.jpg",
    copy: {
      en: { name: "Lecco", blurb: "The eastern arm — Manzoni's hometown, dramatic peaks dropping straight to the water." },
      it: { name: "Lecco", blurb: "Il ramo orientale — la città di Manzoni, picchi a strapiombo sull'acqua." },
      ru: { name: "Лекко", blurb: "Восточный рукав — родной город Манцони, отвесные пики над водой." },
      ar: { name: "ليكو", blurb: "الذراع الشرقي — مسقط رأس مانزوني، قمم تنحدر مباشرة إلى الماء." },
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
