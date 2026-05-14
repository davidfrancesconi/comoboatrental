// UsefulLinks — sidebar panel listing curated outbound authority
// links per attraction (FAI, official villa site, Google Maps,
// Wikipedia, Navigazione Laghi ferries, etc.).
//
// Sits under the quick-facts card on attraction detail pages and
// gives Google a clear "we recognise these authoritative sources"
// signal. Same set of links feeds JSON-LD `sameAs` and `subjectOf`
// on the page — so the signal is both human-visible and machine-
// readable.
//
// Pure server markup, no JS. Each link opens in a new tab so the
// visitor doesn't leave the attraction page.

import type { ExternalLink, ExternalLinkType } from "../content/attractions";
import type { Translation } from "../translations";

// Tiny glyph per link type — purely decorative, real meaning lives in
// the visible type label next to it.
const GLYPH: Record<ExternalLinkType, string> = {
  official:  "⌂",
  maps:      "◎",
  wiki:      "ⓘ",
  transport: "⛴",
  tourism:   "✺",
};

export function UsefulLinks({
  links,
  t,
}: {
  links: ExternalLink[];
  t: Translation;
}) {
  if (!links || links.length === 0) return null;
  const heading = t.attractions.usefulLinksHeading;
  const typeLabels = t.attractions.usefulLinkTypes;
  return (
    <div className="useful-links" aria-label={heading}>
      <h4 className="useful-links-head">{heading}</h4>
      <ul className="useful-links-list">
        {links.map((l) => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noopener noreferrer">
              <span className="ul-glyph" aria-hidden>{GLYPH[l.type]}</span>
              <span className="ul-label">{l.label}</span>
              <span className="ul-type" aria-hidden>{typeLabels[l.type]}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
