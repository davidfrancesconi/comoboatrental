// Build-time sitemap generator. Next.js produces /sitemap.xml from this
// MetadataRoute.Sitemap export under `output: "export"`.
//
// What's listed:
//   - Homepage in every locale  (/, /it/, /ru/, /ar/)
//   - Per-tour pages            (/<locale>/tours/<slug>/, 4 slugs × 4 locales)
//   - Per-destination pages     (/<locale>/destinations/<slug>/, 6 × 4)
//   - FAQ + Reviews + Blog seed (/<locale>/faq/, /<locale>/reviews/, /<locale>/blog/<slug>/)
//
// Each entry includes hreflang alternates so Google associates the
// locale variants together.

import type { MetadataRoute } from "next";
import { locales, type Locale } from "./translations";
import { TOUR_SLUGS } from "./content/tours";
import { DESTINATION_SLUGS } from "./content/destinations";
import { BLOG_SLUGS } from "./content/blog";
import { localeUrl, alternateLanguages, LOCALE_BCP47 } from "./seo";

export const dynamic = "force-static";

function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  priority = 0.8,
): MetadataRoute.Sitemap[number][] {
  return locales.map(({ code }: { code: Locale }) => {
    const langs: Record<string, string> = {};
    (Object.keys(LOCALE_BCP47) as Locale[]).forEach((loc) => {
      langs[LOCALE_BCP47[loc]] = localeUrl(loc, path);
    });
    return {
      url: localeUrl(code, path),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: alternateLanguages(path) },
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  // Homepage
  out.push(...entry("/", "weekly", 1.0));

  // Tours
  for (const slug of TOUR_SLUGS) {
    out.push(...entry(`/tours/${slug}`, "monthly", 0.9));
  }

  // Destinations
  for (const slug of DESTINATION_SLUGS) {
    out.push(...entry(`/destinations/${slug}`, "monthly", 0.7));
  }

  // FAQ + Reviews
  out.push(...entry("/faq", "monthly", 0.6));
  out.push(...entry("/reviews", "monthly", 0.6));

  // Blog
  for (const slug of BLOG_SLUGS) {
    out.push(...entry(`/blog/${slug}`, "monthly", 0.5));
  }

  return out;
}
