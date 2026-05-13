// Attractions index page: /<locale>/attractions/
// Mirrors the structure of lakecomoboattour.it/lake-como-attractions/
// — a grid of 13 attraction cards, each linking to its dedicated
// detail page at /<locale>/attractions/<slug>/.
//
// This is the primary SEO target for queries like "lake como
// attractions", "attrazioni lago di como", and equivalents in RU/AR.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { attractions } from "../../content/attractions";
import { translations, type Locale } from "../../translations";
import { InnerPageShell, renderRich } from "../../components/InnerPage";
import {
  alternateLanguages,
  localeUrl,
  localePath,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = translations[locale];
  const url = localeUrl(locale, "/attractions");
  return {
    title: t.attractions.pageMetaTitle,
    description: t.attractions.pageMetaDesc,
    alternates: { canonical: url, languages: alternateLanguages("/attractions") },
    openGraph: {
      type: "website",
      title: t.attractions.pageMetaTitle,
      description: t.attractions.pageMetaDesc,
      url,
      siteName: SITE_NAME,
      locale: LOCALE_OG[locale],
      images: [{ url: "/images/balbianello.jpg", width: 1200, height: 800, alt: "Lake Como attractions" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.attractions.pageMetaTitle,
      description: t.attractions.pageMetaDesc,
      images: ["/images/balbianello.jpg"],
    },
  };
}

export default async function AttractionsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const t = translations[locale];

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    {
      name: locale === "it" ? "Attrazioni" : locale === "ru" ? "Достопримечательности" : locale === "ar" ? "معالم" : "Attractions",
      url: localeUrl(locale, "/attractions"),
    },
  ];

  // ItemList JSON-LD — Google understands this as a curated list of
  // tourist attractions, which can drive a "Lake Como things to do"
  // rich-card carousel in search results.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${localeUrl(locale, "/attractions")}#list`,
    name: t.attractions.pageMetaTitle,
    description: t.attractions.pageMetaDesc,
    numberOfItems: attractions.length,
    itemListElement: attractions.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localeUrl(locale, `/attractions/${a.slug}`),
      name: a.copy[locale].name,
    })),
  };

  const graph = combine([
    localBusinessJsonLd(locale),
    itemList,
    breadcrumbsJsonLd(trail),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell
        locale={locale}
        breadcrumbs={[
          {
            label:
              locale === "it" ? "Attrazioni" : locale === "ru" ? "Достопримечательности" : locale === "ar" ? "معالم" : "Attractions",
          },
        ]}
      >
        <section className="container-x" style={{ maxWidth: 1100, margin: "60px auto 40px", padding: "0 32px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 16 }}>
            {t.attractions.indexLabel}
          </div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 64px)", lineHeight: 1.05, marginBottom: 24 }}>
            {renderRich(t.attractions.pageHeadline)}
          </h1>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 720, lineHeight: 1.6 }}>
            {t.attractions.pageIntro}
          </p>
        </section>

        <section className="container-x attractions-grid-wrap" style={{ maxWidth: 1280, margin: "0 auto 80px", padding: "0 32px" }}>
          <div className="attractions-grid">
            {attractions.map((a) => (
              <a
                key={a.slug}
                className="attraction-list-card"
                href={localePath(locale, `/attractions/${a.slug}`)}
              >
                <div className="img-wrap">
                  <img
                    src={a.image}
                    alt={a.copy[locale].name}
                    loading="lazy"
                    width="640"
                    height="480"
                  />
                </div>
                <div className="body">
                  <h2>{a.copy[locale].name}</h2>
                  <p>{a.copy[locale].blurb}</p>
                  <span className="cta">
                    {t.attractions.readMore} <span className="arrow">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="container-x" style={{ maxWidth: 900, margin: "0 auto 80px", padding: "32px", background: "var(--bg-alt)", borderRadius: 4 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "var(--display)", fontSize: 22, fontStyle: "italic", color: "var(--ink-soft)", maxWidth: 560 }}>
              {t.contact.lead}
            </p>
            <a className="btn primary primary-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {t.contact.whatsapp} <span className="arrow">→</span>
            </a>
          </div>
        </section>
      </InnerPageShell>
    </>
  );
}
