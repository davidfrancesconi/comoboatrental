// About / founder page — placeholder until Loris provides the real
// photo and biographical copy. The structure mirrors what the live
// page should be: a 60/40 with founder photo on the left and a short
// bio on the right. SEO-wise this is the E-E-A-T page — Google
// rewards owner-operator content heavily in travel-experience SERPs.
//
// To make this go live:
//   1. Loris sends a portrait photo of him + Claudio on the boat
//      (or one of each)
//   2. Loris sends 200 words of background — how they started, the
//      family tradition, what makes their captaincy specific
//   3. Replace ABOUT[locale].body[] with real copy
//   4. Replace the placeholder portrait src with the photo path
// See docs/PER-LORIS.md for the full ask.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "../../translations";
import { InnerPageShell } from "../../components/InnerPage";
import { linkify } from "../../lib/linkify";
import {
  alternateLanguages,
  localeUrl,
  SITE_NAME,
  LOCALE_OG,
  WHATSAPP_URL,
} from "../../seo";
import {
  combine,
  localBusinessJsonLd,
  breadcrumbsJsonLd,
} from "../../jsonld";

const VALID_LOCALES: Locale[] = ["en", "it", "ru", "ar"];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const ABOUT: Record<Locale, {
  pageTitle: string;
  metaDesc: string;
  eyebrow: string;
  headline: string;
  body: string[];
  ctaLine: string;
  ctaBtn: string;
}> = {
  en: {
    pageTitle: "About · Loris and Claudio — Como Boat Rental",
    metaDesc:
      "Loris and Claudio run Como Boat Rental — third-generation lake skippers, two mahogany boats. The founders behind the private tours on Lake Como.",
    eyebrow: "About",
    headline: "Loris and Claudio. <em>The skippers behind the boats.</em>",
    body: [
      "We're Loris and Claudio — third-generation lake skippers and the people you'll meet at the pontoon. The boats are ours. We've grown up on Lake Como and we know which villas catch the morning light, where the wind drops at four in the afternoon, and which café in Bellagio still keeps a table for the same families it has for sixty years.",
      "Claudio takes the Venetian wooden taxi — a 9.5-metre boat hand-built in Venice in 1920, since restored to the standard the lake demands. Loris takes the mahogany caddy. Between us we run every tour ourselves; we don't outsource captaincy. Whichever of us is at the helm, you're with one of the founders.",
      // PLACEHOLDER — final copy from Loris pending. See docs/PER-LORIS.md.
      "[Placeholder paragraph — Loris to provide: family history, when the business started, what defines a Como Boat Rental day.]",
    ],
    ctaLine: "Want us to plan your day on the lake?",
    ctaBtn: "Send a request",
  },
  it: {
    pageTitle: "Chi siamo · Loris e Claudio — Como Boat Rental",
    metaDesc:
      "Loris e Claudio gestiscono Como Boat Rental — skipper di terza generazione, due barche in mogano. I fondatori dietro i tour privati sul Lago di Como.",
    eyebrow: "Chi siamo",
    headline: "Loris e Claudio. <em>Gli skipper dietro le barche.</em>",
    body: [
      "Siamo Loris e Claudio — skipper di terza generazione sul Lago di Como e le persone che troverete al pontile. Le barche sono nostre. Siamo cresciuti sul lago e sappiamo quali ville prendono la luce del mattino, dove cade il vento alle quattro del pomeriggio, e quale caffè a Bellagio tiene ancora un tavolo per le stesse famiglie da sessant'anni.",
      "Claudio guida il taxi veneziano in legno — barca di 9,5 metri costruita a mano a Venezia nel 1920, restaurata allo standard che il lago merita. Loris guida il caddy in mogano. Tra noi due copriamo ogni tour personalmente; non subappaltiamo la conduzione. Chiunque dei due sia al timone, siete con uno dei fondatori.",
      // PLACEHOLDER
      "[Paragrafo placeholder — Loris fornirà: storia familiare, quando è iniziata l'attività, cosa definisce una giornata Como Boat Rental.]",
    ],
    ctaLine: "Vuoi che pianifichiamo la tua giornata sul lago?",
    ctaBtn: "Invia richiesta",
  },
  ru: {
    pageTitle: "О нас · Лорис и Клаудио — Como Boat Rental",
    metaDesc:
      "Лорис и Клаудио управляют Como Boat Rental — шкиперы в третьем поколении, две лодки из красного дерева. Основатели частных туров по озеру Комо.",
    eyebrow: "О нас",
    headline: "Лорис и Клаудио. <em>Шкиперы за штурвалом.</em>",
    body: [
      "Мы Лорис и Клаудио — шкиперы в третьем поколении на озере Комо. Лодки наши. Мы выросли на озере и знаем, какие виллы ловят утренний свет, где утихает ветер в четыре дня и в каком кафе в Беладжо до сих пор держат столик для тех же семей шестьдесят лет подряд.",
      "Клаудио ведёт венецианский деревянный такси — 9,5-метровую лодку, построенную в Венеции в 1920 году. Лорис ведёт мотолодку из красного дерева. Каждый тур ведёт один из нас лично — мы не передаём управление.",
      "[Заполнитель — Лорис предоставит: семейная история, когда началось дело, что определяет день Como Boat Rental.]",
    ],
    ctaLine: "Хотите, чтобы мы спланировали ваш день на озере?",
    ctaBtn: "Отправить запрос",
  },
  ar: {
    pageTitle: "من نحن · لوريس وكلاوديو — Como Boat Rental",
    metaDesc:
      "لوريس وكلاوديو يديران Como Boat Rental — ربّانان من الجيل الثالث، قاربان من خشب الماهوغني. مؤسسا الجولات الخاصة على بحيرة كومو.",
    eyebrow: "من نحن",
    headline: "لوريس وكلاوديو. <em>الربّانان وراء القوارب.</em>",
    body: [
      "نحن لوريس وكلاوديو — ربّانان من الجيل الثالث على بحيرة كومو، والشخصان اللذان ستلتقيان بهما على الرصيف. القوارب لنا. نشأنا على هذه البحيرة ونعرف أيّ الفيلات تلتقط ضوء الصباح وأين تخمد الرياح في الرابعة بعد الظهر وأيّ مقهى في بيلاجيو لا يزال يحتفظ بطاولة لنفس العائلات منذ ستين عاماً.",
      "كلاوديو يقود تاكسي البندقية الخشبي — قارب طوله 9.5 متر صُنع يدوياً في البندقية عام 1920 وأُعيد ترميمه. لوريس يقود قارب كادي الماهوغني. كل جولة يقودها أحدنا شخصياً، ولا نوكِل القيادة لأي طرف ثالث.",
      "[فقرة مؤقتة — لوريس سيقدم: تاريخ العائلة، متى بدأت الأعمال، ما يميز يوماً مع Como Boat Rental.]",
    ],
    ctaLine: "هل تريدون أن نخطّط ليومكم على البحيرة؟",
    ctaBtn: "أرسلوا طلباً",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const a = ABOUT[locale];
  const url = localeUrl(locale, "/about");
  return {
    title: a.pageTitle,
    description: a.metaDesc,
    alternates: { canonical: url, languages: alternateLanguages("/about") },
    openGraph: {
      type: "profile",
      title: a.pageTitle,
      description: a.metaDesc,
      url,
      siteName: SITE_NAME,
      locale: LOCALE_OG[locale],
      images: [{ url: "/images/hero-1.jpg", width: 1200, height: 800, alt: "Loris and Claudio — Como Boat Rental" }],
    },
    twitter: { card: "summary_large_image", title: a.pageTitle, description: a.metaDesc, images: ["/images/hero-1.jpg"] },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const a = ABOUT[locale];

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: a.eyebrow, url: localeUrl(locale, "/about") },
  ];

  const graph = combine([
    localBusinessJsonLd(locale),
    breadcrumbsJsonLd(trail),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell locale={locale} breadcrumbs={[{ label: a.eyebrow }]}>
        <section className="about-page container-x">
          <div className="about-grid">
            <div className="about-photo">
              {/* Placeholder portrait — replace with photo of Loris + Claudio.
                  Using an existing hero image for now so the layout works. */}
              <img
                src="/images/hero-1.jpg"
                alt="Loris and Claudio on Lake Como — Como Boat Rental"
                width="900"
                height="1200"
              />
              <div className="about-photo-caption">
                <span className="dot" />
                Loris &amp; Claudio · Como
              </div>
            </div>
            <div className="about-body">
              <div className="eyebrow">{a.eyebrow}</div>
              <h1 className="display">
                {a.headline.split(/<\/?em>/).map((part, i) =>
                  i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>,
                )}
              </h1>
              {(() => {
                const used = new Set<string>();
                return a.body.map((p, i) => (
                  <p key={i}>{linkify(p, locale, { used })}</p>
                ));
              })()}
              <div className="about-cta">
                <p>{a.ctaLine}</p>
                <a className="btn primary primary-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  {a.ctaBtn} <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </InnerPageShell>
    </>
  );
}
