// Blog post page: /<locale>/blog/<slug>/
// One seed post in EN + IT — see app/content/blog.ts. The dev can
// extend this pattern by adding entries to BLOG_POSTS.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blog, BLOG_SLUGS } from "../../../content/blog";
import { type Locale } from "../../../translations";
import {
  InnerPageShell,
  renderRich,
} from "../../../components/InnerPage";
import {
  alternateLanguages,
  localeUrl,
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
  for (const slug of BLOG_SLUGS) {
    for (const locale of VALID_LOCALES) {
      // Skip locales without copy for this post.
      if (blog[slug][locale]) out.push({ locale, slug });
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
  const post = blog[slug as keyof typeof blog]?.[locale];
  if (!post) return {};
  const url = localeUrl(locale, `/blog/${slug}`);
  return {
    title: post.metaTitle,
    description: post.metaDesc,
    alternates: { canonical: url, languages: alternateLanguages(`/blog/${slug}`) },
    openGraph: { type: "article", title: post.metaTitle, description: post.metaDesc, url, siteName: SITE_NAME, locale: LOCALE_OG[locale], images: [{ url: post.hero, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.metaDesc, images: [post.hero] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const post = blog[slug as keyof typeof blog]?.[locale];
  if (!post) notFound();

  const trail = [
    { name: SITE_NAME, url: localeUrl(locale, "/") },
    { name: "Blog", url: localeUrl(locale, "/blog/" + slug) },
  ];

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${localeUrl(locale, `/blog/${slug}`)}#article`,
    headline: post.metaTitle,
    description: post.metaDesc,
    image: `${SITE_URL}${post.hero}`,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${SITE_URL}/#business` },
    datePublished: post.datePublished,
    inLanguage: locale,
    mainEntityOfPage: localeUrl(locale, `/blog/${slug}`),
  };

  const graph = combine([localBusinessJsonLd(locale), article, breadcrumbsJsonLd(trail)]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <InnerPageShell locale={locale}>
        <article className="container-x" style={{ maxWidth: 800, margin: "60px auto", padding: "0 32px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 16 }}>
            {post.author} · {new Date(post.datePublished).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
          </div>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, marginBottom: 32 }}>
            {renderRich(post.title)}
          </h1>
          <img src={post.hero} alt={post.metaTitle} style={{ width: "100%", marginBottom: 40, borderRadius: 4 }} loading="eager" />
          <div>
            {post.body.map((b, i) => {
              if (b.type === "h") return <h2 key={i} className="display" style={{ marginTop: 32, marginBottom: 16, fontSize: 28 }}>{b.text}</h2>;
              if (b.type === "list") return <ul key={i} style={{ paddingLeft: 24, marginBottom: 24 }}>{b.items.map((it, k) => <li key={k} style={{ marginBottom: 8 }}>{it}</li>)}</ul>;
              return <p key={i} style={{ marginBottom: 20, fontSize: 17, lineHeight: 1.7 }}>{b.text}</p>;
            })}
          </div>
        </article>
      </InnerPageShell>
    </>
  );
}
