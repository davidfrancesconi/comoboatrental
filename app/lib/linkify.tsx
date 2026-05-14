// linkify — server-renderable helper that turns plain attraction copy
// and blog text into rich React nodes with three kinds of links:
//
//   1. Internal cross-links to other /<locale>/attractions/<slug>/
//      pages. The first occurrence of each attraction's known aliases
//      becomes an anchor.
//   2. Authority outbound links for well-known entities mentioned in
//      body copy ("FAI", "Navigazione Laghi", "Funicolare di Como").
//      Open in a new tab.
//   3. The existing markup primitives the site already supports —
//      <em>…</em> for gold italic accents and <br/> line breaks —
//      preserved verbatim so this helper is a strict superset of
//      renderRich() in InnerPage.tsx.
//
// Designed for SSR (static export). Pure server component, no JS.
//
// Why first-occurrence-only? Density without keyword-stuffing. Google
// punishes pages that link the same phrase 12 times; one well-placed
// link per entity per page is the sweet spot.

import type { ReactNode } from "react";
import type { Locale } from "../translations";
import { attractions } from "../content/attractions";
import { localePath } from "../seo";

type Alias = {
  /** Phrase to match in body copy. Case-insensitive whole-word match. */
  pattern: string;
  /** href the matched phrase should point to. */
  href: string;
  /** External links open in a new tab; internal stay in-tab. */
  external: boolean;
  /** Used to skip self-links on attraction detail pages. */
  attractionSlug?: string;
};

/** Authority entities that appear repeatedly in our copy — these get
 *  fixed outbound links regardless of which page is rendering. Keep
 *  the list short; every new entry is a vote that the entity is
 *  worth signalling to Google as a "we know this is authoritative"
 *  endorsement. */
const AUTHORITY_ALIASES: { pattern: string; href: string }[] = [
  { pattern: "FAI",                href: "https://www.fondoambiente.it" },
  { pattern: "Navigazione Laghi",  href: "https://www.navigazionelaghi.it" },
  { pattern: "Funicolare di Como", href: "https://www.funicolarecomo.it" },
  { pattern: "Funicolare",         href: "https://www.funicolarecomo.it" }, // shorter fallback
  // Movie + Star Wars references are intentionally NOT linked — film
  // databases add no SEO weight for a boat-tour business.
];

/** Build the alias table for a given locale. Attraction names are
 *  pulled from the localised content so "Bellagio" and "Beladzo" both
 *  resolve when the body is Russian. Longer aliases come first so
 *  "Villa del Balbianello" matches before "Villa", and "Villa
 *  Carlotta" before "Carlotta". */
function buildAliases(locale: Locale): Alias[] {
  const out: Alias[] = [];

  for (const a of attractions) {
    const href = localePath(locale, `/attractions/${a.slug}`);
    const name = a.copy[locale].name;
    // The full localised name itself is always an alias.
    out.push({ pattern: name, href, external: false, attractionSlug: a.slug });
    // Pull "Villa X" → "X" shortcut for villa attractions so "Carlotta"
    // matches once we've already shown "Villa Carlotta" further up.
    if (/^Villa /i.test(name)) {
      const short = name.replace(/^Villa\s+/i, "").replace(/^del\s+/i, "");
      if (short.length >= 5 && short !== name) {
        out.push({ pattern: short, href, external: false, attractionSlug: a.slug });
      }
    }
  }

  for (const auth of AUTHORITY_ALIASES) {
    out.push({ pattern: auth.pattern, href: auth.href, external: true });
  }

  // Long patterns first so "Villa del Balbianello" is matched before
  // "Balbianello" alone — otherwise we'd anchor the shorter alias
  // mid-string and miss the long one.
  out.sort((a, b) => b.pattern.length - a.pattern.length);
  return out;
}

/** Escape a string for safe insertion into a RegExp. */
function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Returns React nodes for the input string with internal and external
 *  links wired up. Each alias is replaced at most once across the
 *  ENTIRE text (not per paragraph) so the helper has to be called with
 *  a shared `used` Set when the caller wants single-mention across
 *  several paragraphs of the same page. */
export function linkify(
  text: string,
  locale: Locale,
  opts: {
    /** Slug of the current page so we don't self-link. */
    currentSlug?: string;
    /** Shared across paragraphs of one page — caller passes the same
     *  Set so each alias links at most once per page. Pass `new Set()`
     *  per call if first-occurrence-per-string is acceptable. */
    used?: Set<string>;
  } = {},
): ReactNode[] {
  const used = opts.used ?? new Set<string>();
  const aliases = buildAliases(locale);

  // We render the existing <em> and <br/> primitives alongside links,
  // so first split the text on those markers, then run the linkifier
  // over each plain-text run independently.
  const out: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const emMatch = remaining.match(/^<em>(.*?)<\/em>/);
    const brMatch = remaining.match(/^<br\/?>/);
    if (emMatch) {
      out.push(<em key={key++}>{emMatch[1]}</em>);
      remaining = remaining.slice(emMatch[0].length);
      continue;
    }
    if (brMatch) {
      out.push(<br key={key++} />);
      remaining = remaining.slice(brMatch[0].length);
      continue;
    }
    const next = remaining.search(/<em>|<br\/?>/);
    const chunk = next === -1 ? remaining : remaining.slice(0, next);
    remaining = next === -1 ? "" : remaining.slice(next);

    // Linkify chunk
    let cursor = 0;
    while (cursor < chunk.length) {
      // Find the EARLIEST alias hit in the remaining chunk. Longest
      // aliases are first in the table but we still need to scan all
      // because we want to anchor at the lowest index, not the longest.
      let bestIdx = -1;
      let bestAlias: Alias | null = null;
      let bestLen = 0;
      for (const alias of aliases) {
        if (used.has(alias.pattern)) continue;
        if (alias.attractionSlug === opts.currentSlug) continue;
        const re = new RegExp(`\\b${escapeRe(alias.pattern)}\\b`, "i");
        const m = chunk.slice(cursor).match(re);
        if (!m || m.index === undefined) continue;
        const at = cursor + m.index;
        if (bestIdx === -1 || at < bestIdx || (at === bestIdx && m[0].length > bestLen)) {
          bestIdx = at;
          bestAlias = alias;
          bestLen = m[0].length;
        }
      }

      if (bestIdx === -1 || !bestAlias) {
        if (cursor < chunk.length) out.push(chunk.slice(cursor));
        break;
      }

      if (bestIdx > cursor) out.push(chunk.slice(cursor, bestIdx));
      const matchedText = chunk.slice(bestIdx, bestIdx + bestLen);
      used.add(bestAlias.pattern);
      if (bestAlias.external) {
        out.push(
          <a key={key++} href={bestAlias.href} target="_blank" rel="noopener noreferrer">
            {matchedText}
          </a>,
        );
      } else {
        out.push(
          <a key={key++} href={bestAlias.href}>
            {matchedText}
          </a>,
        );
      }
      cursor = bestIdx + bestLen;
    }
  }

  return out;
}
