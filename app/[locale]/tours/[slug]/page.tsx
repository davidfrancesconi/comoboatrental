// Per-tour landing page: /<locale>/tours/<slug>/
// Generated statically at build time, one HTML file per (locale × slug).
//
// This route is the long-tail SEO target for queries like
// "villa balbianello boat tour", "lake como sunset cruise", etc. Each
// page emits a TouristTrip JSON-LD node, FAQ schema for the per-tour
// FAQs, and a BreadcrumbList Home → Tours → [tour].

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tours, TOUR_SLUGS } from "../../../content/tours";
import {
  InnerPageShell,
  renderRich,
} from "../../../components/InnerPage";
import { translations, type Locale } from "../../../translations";
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
  faqPageJsonLd,
  breadcrumbsJsonLd,
} from "../../../jsonld";

const VALID_LOCALES: Locale[] = ["en", "it", "ru", "ar"];

export async function generateStaticParams() {
  const out: { locale: Locale; slug: string }[] = [];
  for (const locale of VALID_LOCALES) {
    for (const slug of TOUR_SLUGS) {
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
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return {};
  const c = tour.copy[locale];
  const url = localeUrl(locale, `/tours/${slug}`);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: url,
      languages: alternateLanguages(`/tours/${slug}`),
    },
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.metaDesc,
      url,
      siteName: SITE_NAME,
      locale: LOCALE_OG[locale],
      images: [{ url: tour.hero, width: 1200, height: 800, alt: c.headline.replace(/<[^>]+>/g, "") }],
    },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDesc, images: [tour.hero] },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) notFound();
  const c = tour.copy[locale];
  const t = translations[locale];

  // Tour-specific TouristTrip JSON-LD (richer than the homepage one)
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${localeUrl(locale, `/tours/${slug}`)}#trip`,
    name: c.headline.replace(/<[^>]+>/g, ""),
    description: c.metaDesc,
    image: `${SITE_URL}${tour.hero}`,
    touristType: "Couples, families and small groups",
    provider: { "@id": `${SITE_URL}/#business` },
    duration: `PT${tour.durationMinutes}M`,
    offers: {
      "@type": "Offer",
      price: tour.priceEUR,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: localeUrl(locale, `/tours/${slug}`),
      seller: { "@id": `${SITE_URL}/#business` },
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: c.itinerary.map((step, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "TouristAttraction", name: `${step.time} — ${step.place}` },
      })),
    },
  };

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: locale === "it" ? "Tour" : locale === "ru" ? "Туры" : locale === "ar" ? "الجولات" : "Tours", url: localeUrl(locale, "/") + "#tours" },
    { name: c.headline.replace(/<[^>]+>/g, ""), url: localeUrl(locale, `/tours/${slug}`) },
  ];

  const graph = combine([
    localBusinessJsonLd(locale),
    tourSchema,
    breadcrumbsJsonLd(trail),
    faqPageJsonLd(c.faqs, localeUrl(locale, `/tours/${slug}`)),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell locale={locale}>
        {/* Hero */}
        <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img src={tour.hero} alt={c.headline.replace(/<[^>]+>/g, "")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,31,36,0.1) 0%, rgba(26,31,36,0.55) 100%)" }} />
          </div>
          <div className="container-x" style={{ position: "relative", color: "#fff", padding: "80px 32px 48px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.85, marginBottom: 16 }}>
              {c.kicker}
            </div>
            <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, maxWidth: 900 }}>
              {renderRich(c.headline)}
            </h1>
          </div>
        </section>

        {/* Body */}
        <article className="container-x" style={{ maxWidth: 800, margin: "60px auto", padding: "0 32px" }}>
          {c.body.map((b, i) => {
            if (b.type === "h") return <h2 key={i} className="display" style={{ marginTop: 40, marginBottom: 16, fontSize: 28 }}>{b.text}</h2>;
            if (b.type === "list") return (
              <ul key={i} style={{ paddingLeft: 24, marginBottom: 24 }}>
                {b.items.map((it, k) => <li key={k} style={{ marginBottom: 8 }}>{it}</li>)}
              </ul>
            );
            return <p key={i} style={{ marginBottom: 20, fontSize: 17, lineHeight: 1.7 }}>{b.text}</p>;
          })}
        </article>

        {/* Itinerary */}
        <section className="container-x" style={{ maxWidth: 900, margin: "0 auto 60px", padding: "0 32px" }}>
          <h2 className="display" style={{ fontSize: 32, marginBottom: 24 }}>
            {locale === "it" ? "Itinerario" : locale === "ru" ? "Маршрут" : locale === "ar" ? "المسار" : "Itinerary"}
          </h2>
          <div style={{ borderTop: "1px solid var(--rule)" }}>
            {c.itinerary.map((step, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", padding: "20px 0", borderBottom: "1px solid var(--rule)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--ink-mute)" }}>{step.time}</div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 20, marginBottom: 4 }}>{step.place}</div>
                  <div style={{ color: "var(--ink-soft)", fontSize: 15 }}>{step.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Included / Not included */}
        <section className="container-x" style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <div>
            <h3 style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 12 }}>
              {locale === "it" ? "Compreso" : locale === "ru" ? "Включено" : locale === "ar" ? "مشمول" : "Included"}
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {c.included.map((it, i) => (
                <li key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--rule)", display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--gold)" }}>✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 12 }}>
              {locale === "it" ? "Non compreso" : locale === "ru" ? "Не включено" : locale === "ar" ? "غير مشمول" : "Not included"}
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {c.notIncluded.map((it, i) => (
                <li key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--rule)", display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--ink-mute)" }}>·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-x" style={{ maxWidth: 800, margin: "0 auto 80px", padding: "0 32px" }}>
          <h2 className="display" style={{ fontSize: 32, marginBottom: 24 }}>
            {locale === "it" ? "Domande frequenti" : locale === "ru" ? "Частые вопросы" : locale === "ar" ? "أسئلة متكررة" : "Frequently asked questions"}
          </h2>
          {c.faqs.map((f, i) => (
            <details key={i} style={{ borderBottom: "1px solid var(--rule)", padding: "16px 0" }}>
              <summary style={{ cursor: "pointer", fontFamily: "var(--display)", fontSize: 19, listStyle: "none" }}>{f.question}</summary>
              <p style={{ marginTop: 12, color: "var(--ink-soft)", lineHeight: 1.7 }}>{f.answer}</p>
            </details>
          ))}
        </section>

        {/* CTA block */}
        <section className="container-x" style={{ maxWidth: 900, margin: "0 auto 80px", padding: "32px", background: "var(--bg-alt)", borderRadius: 4 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
                {locale === "it" ? "Da" : locale === "ru" ? "От" : locale === "ar" ? "من" : "From"}
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 36 }}>€{tour.priceEUR}</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn primary primary-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t.contact.whatsapp} <span className="arrow">→</span>
              </a>
              <a className="btn light" href={`${localePath(locale, "/")}#contact`}>
                {t.hero.ctaReserve} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </InnerPageShell>
    </>
  );
}
