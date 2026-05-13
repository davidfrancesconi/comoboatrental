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
import { MiniLakeMap } from "../../../components/MiniLakeMap";
import {
  EMAIL,
  PHONE_DISPLAY_PRIMARY,
  PHONE_TEL_PRIMARY,
  GEO_LAT,
  GEO_LNG,
} from "../../../seo";
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

  // Adjacent attractions in lake order (PIN_BASE-derived). Wraps at ends.
  const currentIdx = ATTRACTION_SLUGS.indexOf(attraction.slug as never);
  const prevAttraction = currentIdx > 0
    ? attractions.find((a) => a.slug === ATTRACTION_SLUGS[currentIdx - 1])
    : attractions.find((a) => a.slug === ATTRACTION_SLUGS[ATTRACTION_SLUGS.length - 1]);
  const nextAttraction = currentIdx < ATTRACTION_SLUGS.length - 1
    ? attractions.find((a) => a.slug === ATTRACTION_SLUGS[currentIdx + 1])
    : attractions.find((a) => a.slug === ATTRACTION_SLUGS[0]);

  // Quick distance from Como (haversine) — gives the sidebar stats card
  // a sensible "X km · ~Y min by boat" line per attraction without
  // requiring hand-curated facts for all 13.
  let distanceKm = 0;
  let timeMinutes = 0;
  if (pin) {
    const R = 6371; // earth km
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(pin.lat - GEO_LAT);
    const dLng = toRad(pin.lng - GEO_LNG);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(GEO_LAT)) * Math.cos(toRad(pin.lat)) * Math.sin(dLng / 2) ** 2;
    distanceKm = Math.round(2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    // ~25 knots cruising = ~45 km/h. So time ≈ km / 45 * 60. Round up.
    timeMinutes = Math.max(5, Math.round((distanceKm / 45) * 60 / 5) * 5);
  }
  const fromComoLabel =
    locale === "it" ? "min in barca da Como" :
    locale === "ru" ? "мин на лодке от Комо" :
    locale === "ar" ? "دقيقة بالقارب من كومو" :
    "min by boat from Como";

  const addToTourLabel =
    locale === "it" ? "Aggiungilo a un tour" :
    locale === "ru" ? "Добавить к туру" :
    locale === "ar" ? "أضِفه إلى جولة" :
    "Add to a tour";
  const reserveBoatToLabel =
    locale === "it" ? "Riserva una barca verso" :
    locale === "ru" ? "Закажите лодку до" :
    locale === "ar" ? "احجز قاربًا إلى" :
    "Reserve a boat to";
  const adjacentPrevLabel =
    locale === "it" ? "Precedente" :
    locale === "ru" ? "Предыдущая" :
    locale === "ar" ? "السابقة" :
    "Previous";
  const adjacentNextLabel =
    locale === "it" ? "Successiva" :
    locale === "ru" ? "Следующая" :
    locale === "ar" ? "التالية" :
    "Next";
  const ofLabel =
    locale === "it" ? "di" :
    locale === "ru" ? "из" :
    locale === "ar" ? "من" :
    "of";

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

        {/* Article body — 60/40 grid with sticky sidebar (mini-map +
            quick-facts + side CTA) on the right. */}
        <article className="attr-article">
          <div className="attr-main">
            {c.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <h2 className="display" style={{ fontSize: "clamp(26px, 2.4vw, 34px)", margin: "44px 0 14px" }}>
              {locale === "it" ? "Buono a sapersi." : locale === "ru" ? "Полезно знать." : locale === "ar" ? "معلومات مفيدة." : "Good to know."}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, borderTop: "1px solid var(--rule)" }}>
              {c.goodToKnow.map((g, i) => (
                <li key={i} style={{
                  padding: "12px 0",
                  borderBottom: "1px solid var(--rule)",
                  display: "flex",
                  gap: 14,
                  fontSize: 15.5,
                  lineHeight: 1.5,
                  color: "var(--ink-soft)",
                }}>
                  <span style={{ color: "var(--gold)", flex: "none", fontWeight: 700 }}>·</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="attr-aside">
            <MiniLakeMap
              activePinId={attraction.pinId}
              activeLabel={pin?.name ?? attraction.slug}
              statsHeadline={`${distanceKm} km`}
              statsSub={`~${timeMinutes} ${fromComoLabel}`}
            />

            <a href="#contact" className="side-cta">
              <div className="k">{addToTourLabel}</div>
              <div className="v">
                {reserveBoatToLabel} <em>{pin?.name?.split(" · ")[0] ?? c.name}</em>
                <span className="arr">→</span>
              </div>
            </a>

            <div className="side-secondary">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <span>{t.contact.whatsapp}</span><span className="arr">→</span>
              </a>
              <a href={`mailto:${EMAIL}`}>
                <span>{EMAIL}</span><span className="arr">→</span>
              </a>
              <a href={`tel:${PHONE_TEL_PRIMARY}`}>
                <span>{PHONE_DISPLAY_PRIMARY}</span><span className="arr">→</span>
              </a>
            </div>
          </aside>
        </article>

        {/* Tours that visit — full-bleed band with bg-alt. Same TourCard
            component as the homepage carousel so they stay in sync. */}
        {visitingTourIndices.length > 0 && (
          <section style={{ background: "var(--bg-alt)", padding: "clamp(60px, 8vw, 100px) 0", borderTop: "1px solid var(--rule)" }}>
            <div className="container-x" style={{ maxWidth: 1280, padding: "0 32px" }}>
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
            </div>
          </section>
        )}

        {/* Adjacent destinations nav — geographic order along the lake. */}
        {prevAttraction && nextAttraction && (
          <nav className="attr-adj" aria-label="Adjacent destinations">
            <a className="prev" href={localePath(locale, `/attractions/${prevAttraction.slug}`)}>
              <span className="arr">←</span>
              <span>
                <span className="dir">{adjacentPrevLabel} · {String(currentIdx).padStart(2, "0")} {ofLabel} {String(ATTRACTION_SLUGS.length).padStart(2, "0")}</span>
                <span className="name">{prevAttraction.copy[locale].name}</span>
              </span>
            </a>
            <a className="next" href={localePath(locale, `/attractions/${nextAttraction.slug}`)}>
              <span className="arr">→</span>
              <span>
                <span className="dir">{adjacentNextLabel} · {String(currentIdx + 2).padStart(2, "0")} {ofLabel} {String(ATTRACTION_SLUGS.length).padStart(2, "0")}</span>
                <span className="name">{nextAttraction.copy[locale].name}</span>
              </span>
            </a>
          </nav>
        )}

      </InnerPageShell>
    </>
  );
}
