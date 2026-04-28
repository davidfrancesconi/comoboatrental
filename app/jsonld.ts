// JSON-LD schema builders. Each function returns a plain object that's
// JSON.stringify-ed and inlined into the <head> via a
// <script type="application/ld+json"> block. Validate with
// https://validator.schema.org and Google's Rich Results Test.
//
// Why this lives in its own module:
// - Builders are reusable across the homepage, tour pages, destination
//   pages and FAQ page (each surface needs a different combination).
// - When the dev needs to add a new schema type (e.g. EventReservation
//   for a future booking flow), there's a single conventional place.

import { translations, type Locale } from "./translations";
import {
  SITE_URL,
  SITE_NAME,
  EMAIL,
  PHONE_DISPLAY_PRIMARY,
  ADDRESS_STREET,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  ADDRESS_POSTAL,
  ADDRESS_COUNTRY,
  GEO_LAT,
  GEO_LNG,
  FOUNDERS,
  RATING_VALUE,
  RATING_COUNT,
  PRICE_RANGE,
  INSTAGRAM_URL,
  localeUrl,
} from "./seo";

// Strip <em>...</em> and <br/> markers from copy strings so they
// don't leak into JSON-LD plaintext fields.
function plain(s: string): string {
  return s.replace(/<em>(.*?)<\/em>/g, "$1").replace(/<br\/?>/g, " ").trim();
}

// === LocalBusiness ===========================================================
//
// The "primary entity" of the business. Carries hours, contact, geo,
// price band, founders, aggregate rating and same-as social links. Goes
// on every page (with @id stable so Google deduplicates).
export function localBusinessJsonLd(locale: Locale = "en") {
  const t = translations[locale];
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TravelAgency"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_DISPLAY_PRIMARY,
    email: EMAIL,
    description: plain(t.intro.body),
    image: `${SITE_URL}/images/hero-sunset.jpg`,
    logo: `${SITE_URL}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: ADDRESS_POSTAL,
      addressCountry: ADDRESS_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_LAT,
      longitude: GEO_LNG,
    },
    areaServed: { "@type": "Place", name: "Lake Como" },
    founder: FOUNDERS.map((name) => ({ "@type": "Person", name })),
    priceRange: PRICE_RANGE,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING_VALUE.toString(),
      reviewCount: RATING_COUNT.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [INSTAGRAM_URL],
  };
}

// === WebSite (search action) =================================================
//
// Standard "this is a website" node. Lets Google show a sitelinks
// search box for branded queries. No site search exists today, so we
// omit the SearchAction; revisit when the dev adds one.
export function websiteJsonLd(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: localeUrl(locale, "/"),
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

// === BreadcrumbList ==========================================================
//
// Surfaces the path Home → Tours → [tour] in the search result so
// Google can render breadcrumb chips beneath the title.
export function breadcrumbsJsonLd(
  trail: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: step.url,
    })),
  };
}

// === Review array ============================================================
//
// The three featured testimonials. We carry each as a Review node so
// Google can attach a star rating to specific quotes.
export function reviewsJsonLd(locale: Locale = "en") {
  const t = translations[locale];
  return t.testimonials.items.map((r, i) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${SITE_URL}/#review-${i + 1}`,
    itemReviewed: { "@id": `${SITE_URL}/#business` },
    author: { "@type": "Person", name: r.author },
    reviewBody: r.quote,
    datePublished: r.date.split("·")[0]?.trim() ?? r.date,
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
  }));
}

// === Product / Vehicle (per boat) ============================================
//
// Each boat in the fleet is a Product offered by the business, with
// price + currency. Helpful for shopping/Vehicle rich-result eligibility.
export function fleetJsonLd(locale: Locale = "en") {
  const t = translations[locale];
  return t.fleet.items.map((boat, i) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#boat-${i + 1}`,
    name: plain(boat.name),
    description: plain(boat.desc),
    image: `${SITE_URL}${i === 0 ? "/images/taxi-boat.jpg" : "/images/luxury-caddy.jpg"}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: boat.price.replace(/[^\d]/g, ""),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: boat.price.replace(/[^\d]/g, ""),
        priceCurrency: "EUR",
        unitCode: "HUR", // hour
      },
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#business` },
    },
  }));
}

// === TouristTrip (per tour) ==================================================
//
// Each tour itinerary as a TouristTrip. The four base tours come from
// translations.ts; deeper tour pages may extend with full itinerary
// nodes — see app/[locale]/tours/[slug]/page.tsx.
export function tourTripJsonLd(locale: Locale = "en", slugs: string[] = []) {
  const t = translations[locale];
  return t.tours.items.map((tour, i) => ({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${SITE_URL}/#tour-${slugs[i] ?? i + 1}`,
    name: plain(tour.title),
    description: plain(tour.desc),
    touristType: tour.meta,
    provider: { "@id": `${SITE_URL}/#business` },
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.stops.map((stop, k) => ({
        "@type": "ListItem",
        position: k + 1,
        item: { "@type": "TouristAttraction", name: stop },
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price.replace(/[^\d]/g, ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#business` },
    },
  }));
}

// === FAQPage =================================================================
//
// Frequently-asked questions. We carry a homepage-level FAQPage so
// Google can show "People also ask" eligible answers. The /faq route
// renders the same data plus extras.
export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
  baseUrl: string = SITE_URL,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

// === Place (per destination) =================================================
//
// Each destination on the map is a TouristAttraction in the right schema
// flavour (villa, town, port, nature). Used on destination pages.
export function placeJsonLd(opts: {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  type: "port" | "villa" | "town" | "nature";
  url: string;
  image?: string;
}) {
  const schemaType =
    opts.type === "villa"
      ? "TouristAttraction"
      : opts.type === "nature"
        ? "TouristAttraction"
        : "Place";
  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${opts.url}#place`,
    name: opts.name,
    description: opts.description,
    geo: { "@type": "GeoCoordinates", latitude: opts.lat, longitude: opts.lng },
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
  };
}

// === Helper: combine multiple builders into one @graph block =================
//
// Google prefers a single <script type="application/ld+json"> per page.
// `combine([…])` wraps an array of nodes in `{ "@context": ..., "@graph": [...] }`.
export function combine(
  nodes: object[],
): { "@context": string; "@graph": object[] } {
  return { "@context": "https://schema.org", "@graph": nodes };
}
