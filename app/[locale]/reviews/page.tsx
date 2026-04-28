// Reviews page: /<locale>/reviews/
// Pulls the existing 3 testimonials from translations.ts, exposes them
// as a Review array + AggregateRating schema. Deep page Google can
// index for "como boat rental reviews" / "lake como boat tour reviews".

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { translations, type Locale } from "../../translations";
import { InnerPageShell } from "../../components/InnerPage";
import {
  alternateLanguages,
  localeUrl,
  SITE_NAME,
  LOCALE_OG,
  RATING_VALUE,
  RATING_COUNT,
  RATING_PERIOD,
} from "../../seo";
import {
  combine,
  localBusinessJsonLd,
  reviewsJsonLd,
  breadcrumbsJsonLd,
} from "../../jsonld";

const VALID_LOCALES: Locale[] = ["en", "it", "ru", "ar"];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const TITLES: Record<Locale, string> = {
  en: "Reviews · Como Boat Rental — 4.9/5 from 87 Google guests",
  it: "Recensioni · Como Boat Rental — 4.9/5 da 87 ospiti su Google",
  ru: "Отзывы · Como Boat Rental — 4.9/5 от 87 гостей на Google",
  ar: "التقييمات · Como Boat Rental — 4.9/5 من 87 ضيف على Google",
};
const DESCS: Record<Locale, string> = {
  en: "Three seasons of guests, 87 verified Google reviews, 4.9 stars. What people say after a private boat tour with Loris and Claudio.",
  it: "Tre stagioni di ospiti, 87 recensioni verificate Google, 4.9 stelle. Cosa dicono i nostri ospiti dopo un tour privato in barca con Loris e Claudio.",
  ru: "Три сезона гостей, 87 проверенных отзывов Google, 4.9 звезды. Что говорят люди после частной прогулки с Лорисом и Клаудио.",
  ar: "ثلاثة مواسم من الضيوف، 87 تقييم موثق على Google، 4.9 نجوم. ما يقوله الضيوف بعد جولة خاصة مع لوريس وكلاوديو.",
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
    alternates: { canonical: localeUrl(locale, "/reviews"), languages: alternateLanguages("/reviews") },
    openGraph: { type: "article", title: TITLES[locale], description: DESCS[locale], url: localeUrl(locale, "/reviews"), siteName: SITE_NAME, locale: LOCALE_OG[locale] },
    twitter: { card: "summary", title: TITLES[locale], description: DESCS[locale] },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const t = translations[locale];

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: locale === "it" ? "Recensioni" : locale === "ru" ? "Отзывы" : locale === "ar" ? "التقييمات" : "Reviews", url: localeUrl(locale, "/reviews") },
  ];

  const graph = combine([
    localBusinessJsonLd(locale),
    ...reviewsJsonLd(locale),
    breadcrumbsJsonLd(trail),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell locale={locale}>
        <section className="container-x" style={{ maxWidth: 900, margin: "60px auto", padding: "0 32px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 16 }}>
            {t.testimonials.indexLabel}
          </div>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, marginBottom: 16 }}>
            {locale === "it" ? "Recensioni dei nostri ospiti" :
             locale === "ru" ? "Отзывы наших гостей" :
             locale === "ar" ? "آراء ضيوفنا" :
             "What our guests say"}
          </h1>
          <p style={{ fontFamily: "var(--display)", fontSize: 22, fontStyle: "italic", color: "var(--ink-soft)", marginBottom: 40 }}>
            {RATING_VALUE} / 5.0 · {RATING_COUNT} {locale === "it" ? "recensioni Google" : locale === "ru" ? "отзывов Google" : locale === "ar" ? "تقييمات Google" : "Google reviews"} · {RATING_PERIOD}
          </p>
          <div style={{ display: "grid", gap: 32 }}>
            {t.testimonials.items.map((rev, i) => (
              <figure key={i} style={{ borderTop: "1px solid var(--rule)", paddingTop: 24 }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 64, lineHeight: 0.6, color: "var(--gold)", marginBottom: 16 }}>“</div>
                <blockquote style={{ fontFamily: "var(--display)", fontSize: 22, lineHeight: 1.5, marginBottom: 16, fontStyle: "italic" }}>
                  {rev.quote}
                </blockquote>
                <cite style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--ink-mute)", textTransform: "uppercase" }}>
                  {rev.author} · {rev.date}
                </cite>
              </figure>
            ))}
          </div>
          <div style={{ marginTop: 60, padding: 32, background: "var(--bg-alt)", borderRadius: 4, textAlign: "center" }}>
            <a
              className="btn primary"
              href="https://www.google.com/maps/place/Como+Boat+Rental/@45.8108,9.0908,17z"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.testimonials.reviewLink} <span className="arrow">→</span>
            </a>
          </div>
        </section>
      </InnerPageShell>
    </>
  );
}
