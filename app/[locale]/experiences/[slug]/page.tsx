// Per-experience subpage: /<locale>/experiences/<slug>/
//
// One generated page per (locale × experience) = 4 × 4 = 16 static
// pages. Each is a deep landing surface for the long-tail intent of
// that experience — "lake como wedding boat", "lake como photoshoot
// boat", "lake como private captain", "lake como private boat tour".
//
// Mirrors the structure of the attraction detail template: hero with
// image + headline, 3-4 body paragraphs, highlights list, featured
// Lake Como locations (cross-links to attraction pages), single
// consolidated CTA to #contact on the homepage.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXPERIENCE_BY_SLUG, EXPERIENCE_SLUGS, experiences } from "../../../content/experiences";
import { attractions } from "../../../content/attractions";
import { translations, type Locale } from "../../../translations";
import { InnerPageShell, renderRich } from "../../../components/InnerPage";
import { linkify } from "../../../lib/linkify";
import {
  alternateLanguages,
  localeUrl,
  localePath,
  SITE_NAME,
  SITE_URL,
  LOCALE_OG,
} from "../../../seo";
import {
  combine,
  localBusinessJsonLd,
  breadcrumbsJsonLd,
} from "../../../jsonld";

const VALID_LOCALES: Locale[] = ["en", "it", "ru", "ar"];

export async function generateStaticParams() {
  const out: { locale: Locale; slug: string }[] = [];
  for (const locale of VALID_LOCALES) {
    for (const slug of EXPERIENCE_SLUGS) {
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
  const exp = EXPERIENCE_BY_SLUG[slug];
  if (!exp) return {};
  const c = exp.copy[locale];
  const url = localeUrl(locale, `/experiences/${slug}`);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: url,
      languages: alternateLanguages(`/experiences/${slug}`),
    },
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.metaDesc,
      url,
      siteName: SITE_NAME,
      locale: LOCALE_OG[locale],
      images: [{ url: exp.image, width: 1200, height: 800, alt: c.headline.replace(/<[^>]+>/g, "") }],
    },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDesc, images: [exp.image] },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const exp = EXPERIENCE_BY_SLUG[slug];
  if (!exp) notFound();
  const c = exp.copy[locale];
  const t = translations[locale];

  const experiencesLabel =
    locale === "it" ? "Esperienze" :
    locale === "ru" ? "Опыты" :
    locale === "ar" ? "التجارب" :
    "Experiences";

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: experiencesLabel, url: localeUrl(locale, "/experiences") },
    { name: c.name, url: localeUrl(locale, `/experiences/${slug}`) },
  ];

  const graph = combine([
    localBusinessJsonLd(locale),
    breadcrumbsJsonLd(trail),
  ]);

  // Featured Lake Como locations — cross-link to attraction pages for
  // the pins listed in featuredPinIds. Skips silently if a pin has no
  // attraction page (e.g. argegno).
  const featuredAttractions = (exp.featuredPinIds ?? [])
    .map((pinId) => attractions.find((a) => a.pinId === pinId))
    .filter((a): a is NonNullable<typeof a> => !!a);

  const featuredLabel =
    locale === "it" ? "Tappe in evidenza" :
    locale === "ru" ? "Ключевые места" :
    locale === "ar" ? "محطات مميّزة" :
    "Featured Lake Como locations";

  const highlightsLabel =
    locale === "it" ? "Cosa è incluso" :
    locale === "ru" ? "Что входит" :
    locale === "ar" ? "ماذا يشمل" :
    "Highlights";

  // One shared `used` Set across body + highlights + featured stops
  // so each entity links at most once on the page.
  const used = new Set<string>();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell
        locale={locale}
        breadcrumbs={[
          { label: experiencesLabel, href: localePath(locale, "/experiences") },
          { label: c.name },
        ]}
      >
        {/* Hero */}
        <section style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img
              src={exp.image}
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
            <p key={i} style={{ marginBottom: 20, fontSize: 17, lineHeight: 1.7 }}>
              {linkify(p, locale, { used })}
            </p>
          ))}
        </article>

        {/* Highlights */}
        {c.highlights && c.highlights.length > 0 && (
          <section className="container-x" style={{ maxWidth: 800, margin: "0 auto 60px", padding: "0 32px" }}>
            <h2 className="display" style={{ fontSize: "clamp(24px, 2.4vw, 32px)", marginBottom: 16 }}>
              {highlightsLabel}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, borderTop: "1px solid var(--rule)" }}>
              {c.highlights.map((h, i) => (
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
                  <span>{linkify(h, locale, { used })}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Featured locations — cross-link to attraction pages */}
        {featuredAttractions.length > 0 && (
          <section style={{ background: "var(--bg-alt)", padding: "clamp(60px, 8vw, 100px) 0", borderTop: "1px solid var(--rule)" }}>
            <div className="container-x" style={{ maxWidth: 1100, padding: "0 32px" }}>
              <h2 className="display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 24 }}>
                {featuredLabel}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                {featuredAttractions.map((a) => {
                  const ac = a.copy[locale];
                  return (
                    <a
                      key={a.slug}
                      href={localePath(locale, `/attractions/${a.slug}`)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "96px 1fr",
                        gap: 16,
                        padding: 12,
                        background: "var(--bg)",
                        border: "1px solid var(--rule)",
                        textDecoration: "none",
                        color: "var(--ink)",
                        transition: "border-color 0.15s ease",
                      }}
                    >
                      <div style={{ width: 96, height: 96, overflow: "hidden", background: "var(--bg-alt)" }}>
                        <img src={a.image} alt={ac.name} loading="lazy" width="192" height="192" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: "var(--display)", fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{ac.name}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.45, color: "var(--ink-soft)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {ac.blurb}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="container-x" style={{ maxWidth: 900, margin: "60px auto 80px", padding: "32px", background: "var(--bg-alt)", borderRadius: 4 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(22px, 2.4vw, 30px)", fontStyle: "italic", color: "var(--ink-soft)" }}>
              {c.ctaLabel}
            </div>
            <a className="btn primary primary-gold" href={`${localePath(locale, "/")}#contact`}>
              {t.hero.ctaReserve} <span className="arrow">→</span>
            </a>
          </div>
        </section>
      </InnerPageShell>
    </>
  );
}
