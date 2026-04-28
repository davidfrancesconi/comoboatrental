// FAQ page: /<locale>/faq/
// Full FAQ list as a deep page Google can index for "como boat rental
// faq" or "lake como private boat questions" queries. The same data
// feeds the abbreviated FAQPage block on each homepage.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQS } from "../../content/faq";
import { type Locale } from "../../translations";
import {
  InnerPageShell,
} from "../../components/InnerPage";
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
  faqPageJsonLd,
  breadcrumbsJsonLd,
} from "../../jsonld";

const VALID_LOCALES: Locale[] = ["en", "it", "ru", "ar"];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const TITLES: Record<Locale, string> = {
  en: "FAQ · Lake Como Boat Rental — Como Boat Rental",
  it: "Domande Frequenti · Noleggio Barche Lago di Como",
  ru: "Частые Вопросы · Аренда Лодки на Озере Комо",
  ar: "أسئلة متكررة · تأجير قوارب بحيرة كومو",
};
const DESCS: Record<Locale, string> = {
  en: "Captain, weather, swimming, lunch reservations, child welcome, accessibility — every common question about a private boat tour on Lake Como, answered.",
  it: "Skipper, meteo, bagno, prenotazioni pranzo, bambini, accessibilità — ogni domanda comune su un tour privato in barca sul Lago di Como, con risposte.",
  ru: "Шкипер, погода, купание, рестораны, дети, доступность — каждый частый вопрос о частной прогулке на лодке по озеру Комо.",
  ar: "الربان والطقس والسباحة وحجوزات الغداء والأطفال وإمكانية الوصول — كل سؤال شائع عن جولة قارب خاصة على بحيرة كومو.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  return {
    title: TITLES[locale],
    description: DESCS[locale],
    alternates: { canonical: localeUrl(locale, "/faq"), languages: alternateLanguages("/faq") },
    openGraph: { type: "article", title: TITLES[locale], description: DESCS[locale], url: localeUrl(locale, "/faq"), siteName: SITE_NAME, locale: LOCALE_OG[locale] },
    twitter: { card: "summary", title: TITLES[locale], description: DESCS[locale] },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const faqs = FAQS[locale];

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: locale === "it" ? "Domande frequenti" : locale === "ru" ? "Вопросы" : locale === "ar" ? "أسئلة" : "FAQ", url: localeUrl(locale, "/faq") },
  ];

  const graph = combine([
    localBusinessJsonLd(locale),
    faqPageJsonLd(faqs, localeUrl(locale, "/faq")),
    breadcrumbsJsonLd(trail),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell locale={locale}>
        <section className="container-x" style={{ maxWidth: 800, margin: "60px auto", padding: "0 32px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 16 }}>
            {locale === "it" ? "Domande frequenti" : locale === "ru" ? "Часто задаваемые вопросы" : locale === "ar" ? "أسئلة متكررة" : "Frequently asked questions"}
          </div>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, marginBottom: 40 }}>
            {locale === "it" ? "Le domande che ci fate più spesso" :
             locale === "ru" ? "Ответы на частые вопросы" :
             locale === "ar" ? "الأسئلة التي تطرحونها كثيراً" :
             "The questions we hear most"}
          </h1>
          <div>
            {faqs.map((f, i) => (
              <details key={i} style={{ borderBottom: "1px solid var(--rule)", padding: "20px 0" }} open={i < 3}>
                <summary style={{ cursor: "pointer", fontFamily: "var(--display)", fontSize: 22, listStyle: "none" }}>{f.question}</summary>
                <p style={{ marginTop: 12, color: "var(--ink-soft)", lineHeight: 1.7, fontSize: 16 }}>{f.answer}</p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: 60, padding: 32, background: "var(--bg-alt)", borderRadius: 4 }}>
            <p style={{ fontFamily: "var(--display)", fontSize: 22, fontStyle: "italic", color: "var(--ink-soft)", marginBottom: 16 }}>
              {locale === "it" ? "Non trovate la vostra domanda? Scriveteci." :
               locale === "ru" ? "Нет вашего вопроса? Напишите нам." :
               locale === "ar" ? "لا تجدون سؤالكم؟ راسلونا." :
               "Don't see your question? Drop us a line."}
            </p>
            <a className="btn primary primary-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp <span className="arrow">→</span>
            </a>
          </div>
        </section>
      </InnerPageShell>
    </>
  );
}
