// Per-attraction detail page: /<locale>/attractions/<slug>/
//
// One generated page per (locale × slug) = 4 × 13 = 52 static pages.
// Each page is a deep SEO target for queries like "bellagio by boat",
// "villa balbianello private tour", "Аренда лодки Беладжо" etc.
//
// Structure: hero with the attraction photo + headline, three body
// paragraphs, "good to know" bullets, and cross-links to the tours
// that visit this attraction.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { attractions, ATTRACTION_SLUGS } from "../../../content/attractions";
import { translations, type Locale } from "../../../translations";
import { InnerPageShell, renderRich } from "../../../components/InnerPage";
import { TourCard, TOUR_SLUG_TO_INDEX, TOUR_CARD_IMAGES } from "../../../components/TourCard";
import {
  alternateLanguages,
  localeUrl,
  localePath,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_URL,
  LOCALE_OG,
} from "../../../seo";
import {
  combine,
  localBusinessJsonLd,
  breadcrumbsJsonLd,
  placeJsonLd,
} from "../../../jsonld";

const VALID_LOCALES: Locale[] = ["en", "it", "ru", "ar"];

export async function generateStaticParams() {
  const out: { locale: Locale; slug: string }[] = [];
  for (const locale of VALID_LOCALES) {
    for (const slug of ATTRACTION_SLUGS) {
      out.push({ locale, slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const attraction = attractions.find((a) => a.slug === slug);
  if (!attraction) return {};
  const c = attraction.copy[locale];
  const url = localeUrl(locale, `/attractions/${slug}`);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: url,
      languages: alternateLanguages(`/attractions/${slug}`),
    },
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.metaDesc,
      url,
      siteName: SITE_NAME,
      locale: LOCALE_OG[locale],
      images: [{ url: attraction.image, width: 1200, height: 800, alt: c.headline.replace(/<[^>]+>/g, "") }],
    },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDesc, images: [attraction.image] },
  };
}

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const attraction = attractions.find((a) => a.slug === slug);
  if (!attraction) notFound();
  const c = attraction.copy[locale];
  const t = translations[locale];

  // Find pin coordinates for the place schema
  const pin = t.map.pins.find((p) => p.id === attraction.pinId);

  const place = pin
    ? placeJsonLd({
        id: attraction.slug,
        name: pin.name,
        description: c.metaDesc,
        lat: pin.lat,
        lng: pin.lng,
        type: pin.type as "port" | "villa" | "town" | "nature",
        url: localeUrl(locale, `/attractions/${slug}`),
        image: `${SITE_URL}${attraction.image}`,
      })
    : null;

  const attractionsLabel = locale === "it" ? "Attrazioni" : locale === "ru" ? "Достопримечательности" : locale === "ar" ? "معالم" : "Attractions";

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: attractionsLabel, url: localeUrl(locale, "/attractions") },
    { name: pin?.name ?? attraction.slug, url: localeUrl(locale, `/attractions/${slug}`) },
  ];

  const graph = combine([
    localBusinessJsonLd(locale),
    ...(place ? [place] : []),
    breadcrumbsJsonLd(trail),
  ]);

  // Map the attraction's toursThatVisit slugs to indices into the
  // homepage tour list (translations.ts t.tours.items), so we can render
  // each tour as a full homepage-style TourCard.
  const visitingTourIndices = attraction.toursThatVisit
    .map((tslug) => ({ slug: tslug, idx: TOUR_SLUG_TO_INDEX[tslug] }))
    .filter((x): x is { slug: string; idx: number } => x.idx !== undefined);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell
        locale={locale}
        breadcrumbs={[
          { label: attractionsLabel, href: localePath(locale, "/attractions") },
          { label: pin?.name ?? attraction.slug },
        ]}
      >
        {/* Hero */}
        <section style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img
              src={attraction.image}
              alt={c.headline.replace(/<[^>]+>/g, "")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,31,36,0.05) 0%, rgba(26,31,36,0.55) 100%)" }} />
          </div>
          <div className="container-x" style={{ position: "relative", color: "#fff", padding: "80px 32px 48px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.85, marginBottom: 16 }}>
              {c.kicker}
            </div>
            <h1 className="display" style={{ fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.05 }}>
              {renderRich(c.headline)}
            </h1>
          </div>
        </section>

        {/* Body */}
        <article className="container-x" style={{ maxWidth: 800, margin: "60px auto 40px", padding: "0 32px" }}>
          {c.paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: 24, fontSize: 17, lineHeight: 1.7 }}>
              {p}
            </p>
          ))}
        </article>

        {/* Good to know */}
        <section className="container-x" style={{ maxWidth: 800, margin: "0 auto 60px", padding: "0 32px" }}>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 16 }}>
            {locale === "it" ? "Buono a sapersi" : locale === "ru" ? "Полезно знать" : locale === "ar" ? "معلومات مفيدة" : "Good to know"}
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {c.goodToKnow.map((g, i) => (
              <li key={i} style={{ padding: "12px 0", borderBottom: "1px solid var(--rule)", display: "flex", gap: 12 }}>
                <span style={{ color: "var(--gold)", flex: "none" }}>·</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tours that visit — rendered with the same TourCard component
            used on the homepage tours carousel, so the cards stay in
            visual sync. CSS class .tour-card already gives the right
            styling; here we wrap in a simple grid (not the homepage
            carousel) since attractions typically have 1–4 tours visiting. */}
        {visitingTourIndices.length > 0 && (
          <section className="container-x attraction-tours-section" style={{ maxWidth: 1280, margin: "0 auto 80px", padding: "0 32px" }}>
            <h2 className="display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 32 }}>
              {locale === "it"
                ? "Tour che includono questa tappa"
                : locale === "ru"
                  ? "Туры с этой остановкой"
                  : locale === "ar"
                    ? "جولات تشمل هذه المحطة"
                    : "Tours that include this attraction"}
            </h2>
            <div className="attraction-tours-grid">
              {visitingTourIndices.map(({ slug: tourSlug, idx }) => {
                const tour = t.tours.items[idx];
                if (!tour) return null;
                return (
                  <TourCard
                    key={tourSlug}
                    tour={tour}
                    slug={tourSlug}
                    image={TOUR_CARD_IMAGES[tourSlug]}
                    t={t}
                    locale={locale}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="container-x" style={{ maxWidth: 900, margin: "0 auto 80px", padding: "32px", background: "var(--bg-alt)", borderRadius: 4 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "var(--display)", fontSize: 22, fontStyle: "italic", color: "var(--ink-soft)" }}>
              {t.contact.lead}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a className="btn primary primary-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t.contact.whatsapp} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

      </InnerPageShell>
    </>
  );
}
