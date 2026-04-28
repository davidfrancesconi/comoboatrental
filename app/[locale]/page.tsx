// Locale homepage. Server component that emits the per-locale JSON-LD
// graph and renders the client-side HomePage.

import { notFound } from "next/navigation";
import HomePage from "../components/HomePage";
import type { Locale } from "../translations";
import {
  localBusinessJsonLd,
  websiteJsonLd,
  reviewsJsonLd,
  fleetJsonLd,
  tourTripJsonLd,
  faqPageJsonLd,
  breadcrumbsJsonLd,
  combine,
} from "../jsonld";
import { FAQS } from "../content/faq";
import { TOUR_SLUGS } from "../content/tours";
import { localeUrl, SITE_NAME } from "../seo";

const VALID_LOCALES: Locale[] = ["en", "it", "ru", "ar"];

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!VALID_LOCALES.includes(locale)) notFound();

  // Build a single @graph with all relevant schema types so Google
  // sees one consistent block per page.
  const graph = combine([
    localBusinessJsonLd(locale),
    websiteJsonLd(locale),
    breadcrumbsJsonLd([{ name: SITE_NAME, url: localeUrl(locale, "/") }]),
    ...reviewsJsonLd(locale),
    ...fleetJsonLd(locale),
    ...tourTripJsonLd(locale, TOUR_SLUGS as unknown as string[]),
    faqPageJsonLd(FAQS[locale].slice(0, 8), localeUrl(locale, "/")),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <HomePage locale={locale} />
    </>
  );
}
