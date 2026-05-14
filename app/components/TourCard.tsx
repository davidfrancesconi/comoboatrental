// Reusable "tour card" — same visual treatment used in the homepage
// carousel (.tours-grid) and in the "tours that include this attraction"
// strip on each attraction detail page. Extracted so both places stay
// in sync automatically — change the card once, it changes everywhere.
//
// The card content is driven by the homepage tour data shape
// (translations.ts Translation.tours.items[i]), which has all the
// surface fields needed for the card: duration, title, desc, meta,
// price, stops. The slug + image come from the parent context.

import { renderRich } from "./InnerPage";
import { localePath } from "../seo";
import type { Locale, Translation } from "../translations";

type TourItem = Translation["tours"]["items"][number];

export function TourCard({
  tour,
  slug,
  image,
  t,
  locale,
}: {
  tour: TourItem;
  slug: string;
  image: string;
  t: Translation;
  locale: Locale;
}) {
  const cleanTitle = tour.title.replace(/<[^>]+>/g, "");
  // Squeeze "€220" out of price strings like "from €220" / "da €220" / "от €220"
  const priceCompact = tour.price
    .replace(/^[^\d]*/, "")
    .replace(/[^\d.,]/g, "")
    .replace(/^/, "€");
  // Strip the "from/da/от/من" prefix from the price string for the meta-row
  // since the row already has a "FROM" label above the value — avoids the
  // double-from rendering ("FROM / from €220" → "FROM / €220").
  const priceValue = tour.price.replace(/^[^\d€]*/, "").trim();
  return (
    <article className="tour-card">
      <a href={localePath(locale, `/tours/${slug}`)} style={{ display: "contents" }}>
        <div className="img-wrap">
          <img
            src={image}
            alt={`${cleanTitle} — ${tour.duration} private boat tour from Como`}
            loading="lazy"
            width="900"
            height="600"
          />
          <div className="duration-tag">{tour.duration}</div>
          <div className="price-tag">
            <span className="from-label">{t.tours.factFrom}</span>
            <b>{priceCompact}</b>
          </div>
        </div>
        <h3>{renderRich(tour.title)}</h3>
        <p className="descr">{tour.desc}</p>
        <div className="itinerary">
          {tour.stops.map((s, k) => (
            <span className="stop" key={k}>{s}</span>
          ))}
        </div>
        <div className="meta-row">
          <div className="meta-cell">
            <span className="k">{t.tours.factDuration}</span>
            <span className="v">{tour.duration}</span>
          </div>
          <div className="meta-cell">
            <span className="k">{t.tours.factIdeal}</span>
            <span className="v">{tour.meta}</span>
          </div>
          <div className="meta-cell">
            <span className="k">{t.tours.factFrom ?? "From"}</span>
            <span className="v">{priceValue}</span>
          </div>
        </div>
      </a>
    </article>
  );
}

/** Map: attractions.ts toursThatVisit slug → index in translations.ts tours.items.
 * 11 entries since the May 2026 expansion to match competitor SKU coverage. */
export const TOUR_SLUG_TO_INDEX: Record<string, number> = {
  "highlights-1h": 0,
  "cernobbio-2h": 1,
  "balbianello-nesso": 2,
  "boat-palace-4h": 3,
  "top-villas-half-day": 4,
  "first-basin-5h": 5,
  "centre-lake-6h": 6,
  "sunset-cruise": 7,
  "dinner-tour": 8,
  "photoshoot-tour": 9,
  "bespoke-full-day": 10,
};

/** Image paths for each homepage tour card, by slug. */
export const TOUR_CARD_IMAGES: Record<string, string> = {
  "highlights-1h": "/images/hero-1.jpg",
  "cernobbio-2h": "/images/attractions/cernobbio.jpg",
  "balbianello-nesso": "/images/balbianello.jpg",
  "boat-palace-4h": "/images/attractions/villa-del-balbianello.jpg",
  "top-villas-half-day": "/images/attractions/bellagio.jpg",
  "first-basin-5h": "/images/attractions/villa-del-balbianello.jpg",
  "centre-lake-6h": "/images/attractions/bellagio.jpg",
  "sunset-cruise": "/images/hero-sunset.jpg",
  "dinner-tour": "/images/luxury-cruise.jpg",
  "photoshoot-tour": "/images/experiences/photoshoots.jpg",
  "bespoke-full-day": "/images/luxury-cruise.jpg",
};
