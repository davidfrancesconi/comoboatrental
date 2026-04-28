// Centralised SEO constants. Anything that ends up in <meta>, JSON-LD,
// sitemap, robots, manifest, or per-page metadata pulls from this file
// so a dev (or non-technical owner) has one place to update business
// facts when they change. See docs/HANDOFF.md.

import type { Locale } from "./translations";

export const SITE_URL = "https://comoboatrental.com";
export const SITE_NAME = "Como Boat Rental";
export const SITE_LEGAL = "Como Boat Rental, P.IVA IT03998950137";

// Contact + location facts. Mirror these into the Google Business Profile
// listing — see docs/HANDOFF.md "Google Business Profile" section.
export const PHONE_DISPLAY_PRIMARY = "+39 340 6487574";
export const PHONE_DISPLAY_SECONDARY = "+39 348 0689769";
export const PHONE_TEL_PRIMARY = "+393406487574";
export const PHONE_TEL_SECONDARY = "+393480689769";
export const EMAIL = "info@comoboatrental.it";
export const WHATSAPP_URL = "https://wa.me/393406487574";
export const INSTAGRAM_URL = "https://www.instagram.com/comoboatrental";

export const ADDRESS_STREET = "Lungolago Viale Geno, 10";
export const ADDRESS_LOCALITY = "Como";
export const ADDRESS_REGION = "Lombardy";
export const ADDRESS_POSTAL = "22100";
export const ADDRESS_COUNTRY = "IT";
export const GEO_LAT = 45.808;
export const GEO_LNG = 9.085;

export const FOUNDERS = ["Loris", "Claudio"] as const;

// Reviews. The 4.9★ / 87-review headline displayed in the testimonials
// strip is exposed as schema.org AggregateRating across every page so
// Google can surface it as a rich-result rating where eligible.
export const RATING_VALUE = 4.9;
export const RATING_COUNT = 87;
export const RATING_PERIOD = "2023–2025";

export const PRICE_RANGE = "€€€";

// Locale → BCP-47 + Open Graph locale code. Used in hreflang and
// og:locale / og:locale:alternate generation.
export const LOCALE_BCP47: Record<Locale, string> = {
  en: "en",
  it: "it",
  ru: "ru",
  ar: "ar",
};

export const LOCALE_OG: Record<Locale, string> = {
  en: "en_GB",
  it: "it_IT",
  ru: "ru_RU",
  ar: "ar_001",
};

// URL helper. Returns the absolute URL for a given locale + path.
// All locales are prefixed (/en/, /it/, /ru/, /ar/); the bare root /
// redirects to /en/. Uniform prefixing keeps the route tree symmetric
// and lets `app/[locale]/...` handle every page.
//
//   localeUrl("en", "/")             → https://comoboatrental.com/en/
//   localeUrl("it", "/")             → https://comoboatrental.com/it/
//   localeUrl("it", "/tours/balbianello-nesso") → https://comoboatrental.com/it/tours/balbianello-nesso/
export function localeUrl(locale: Locale, path = "/"): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

// Convert a relative path under a locale to its localised URL fragment
// (no host). Used in <a href> on inner pages.
//
//   localePath("it", "/tours/bespoke") → "/it/tours/bespoke/"
//   localePath("en", "/")              → "/en/"
export function localePath(locale: Locale, path = "/"): string {
  const base = `/${locale}`;
  if (path === "/" || path === "") return `${base}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}${clean.endsWith("/") ? "" : "/"}`;
}

// Build the alternates.languages map for a given path. Feeds
// metadata.alternates.languages so Next.js emits hreflang per locale.
export function alternateLanguages(path = "/"): Record<string, string> {
  const langs: Record<string, string> = {};
  (Object.keys(LOCALE_BCP47) as Locale[]).forEach((loc) => {
    langs[LOCALE_BCP47[loc]] = localeUrl(loc, path);
  });
  langs["x-default"] = localeUrl("en", path);
  return langs;
}
