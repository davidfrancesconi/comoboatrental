// Per-destination page: /<locale>/destinations/<slug>/
// Targets queries like "bellagio boat tour", "villa balbianello by boat",
// "varenna sail" — destination-keyword + boat-intent long-tail.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  destinations,
  DESTINATION_SLUGS,
} from "../../../content/destinations";
import { tours } from "../../../content/tours";
import { translations, type Locale } from "../../../translations";
import {
  InnerPageShell,
  renderRich,
} from "../../../components/InnerPage";
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
    for (const slug of DESTINATION_SLUGS) {
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
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};
  const c = dest.copy[locale];
  const url = localeUrl(locale, `/destinations/${slug}`);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: url,
      languages: alternateLanguages(`/destinations/${slug}`),
    },
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.metaDesc,
      url,
      siteName: SITE_NAME,
      locale: LOCALE_OG[locale],
      images: [{ url: dest.hero, width: 1200, height: 800, alt: c.headline.replace(/<[^>]+>/g, "") }],
    },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDesc, images: [dest.hero] },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();
  const c = dest.copy[locale];
  const t = translations[locale];

  // Find geo coordinates from PIN_BASE via translations.map.pins
  const pin = t.map.pins.find((p) => p.id === dest.pinId);

  const place = pin
    ? placeJsonLd({
        id: dest.slug,
        name: pin.name,
        description: c.metaDesc,
        lat: pin.lat,
        lng: pin.lng,
        type: pin.type as "port" | "villa" | "town" | "nature",
        url: localeUrl(locale, `/destinations/${slug}`),
        image: `${SITE_URL}${dest.hero}`,
      })
    : null;

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: locale === "it" ? "Destinazioni" : locale === "ru" ? "Направления" : locale === "ar" ? "الوجهات" : "Destinations", url: localeUrl(locale, "/") + "#map" },
    { name: pin?.name ?? dest.slug, url: localeUrl(locale, `/destinations/${slug}`) },
  ];

  const graph = combine([
    localBusinessJsonLd(locale),
    ...(place ? [place] : []),
    breadcrumbsJsonLd(trail),
  ]);

  // Tours that visit this destination (for cross-link)
  const visitingTours = dest.copy[locale].toursThatVisit
    .map((tslug) => tours.find((tt) => tt.slug === tslug))
    .filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell locale={locale}>
        {/* Hero */}
        <section style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img src={dest.hero} alt={c.headline.replace(/<[^>]+>/g, "")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,31,36,0.05) 0%, rgba(26,31,36,0.5) 100%)" }} />
          </div>
          <div className="container-x" style={{ position: "relative", color: "#fff", padding: "80px 32px 48px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.85, marginBottom: 16 }}>
              {c.kicker}
            </div>
            <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05 }}>
              {renderRich(c.headline)}
            </h1>
          </div>
        </section>

        {/* Body */}
        <article className="container-x" style={{ maxWidth: 800, margin: "60px auto", padding: "0 32px" }}>
          {c.paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: 24, fontSize: 17, lineHeight: 1.7 }}>{p}</p>
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
                <span style={{ color: "var(--gold)" }}>·</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cross-link to tours that visit this destination */}
        {visitingTours.length > 0 && (
          <section className="container-x" style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 32px" }}>
            <h2 className="display" style={{ fontSize: 32, marginBottom: 24 }}>
              {locale === "it" ? "Tour che includono questa tappa" : locale === "ru" ? "Туры с этой остановкой" : locale === "ar" ? "جولات تشمل هذه المحطة" : "Tours that include this destination"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {visitingTours.map((tour) => tour && (
                <a
                  key={tour.slug}
                  href={localePath(locale, `/tours/${tour.slug}`)}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    border: "1px solid var(--rule)",
                    padding: 24,
                    borderRadius: 4,
                    transition: "background 0.18s",
                  }}
                >
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 8 }}>
                    €{tour.priceEUR} · {tour.durationMinutes >= 60 ? `${Math.round(tour.durationMinutes / 60)}h` : `${tour.durationMinutes} min`}
                  </div>
                  <h3 className="display" style={{ fontSize: 22, marginBottom: 8 }}>{renderRich(tour.copy[locale].headline)}</h3>
                  <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>{tour.copy[locale].kicker}</p>
                </a>
              ))}
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
