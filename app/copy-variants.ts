// Copy variants — three SEO/positioning options for the homepage.
//
// Surfaces the *headline* English copy that changes between variants
// (hero, intro, section titles + lead-ins, contact). The Italian /
// Russian / Arabic translations in translations.ts always render
// regardless — variants are an English-only experiment for SEO and
// positioning review.
//
// At runtime, the visitor flips between A / B / C using the toggle
// in the top-right. The merge happens in app/page.tsx — variant
// fields override the matching translation fields, anything unset
// falls through to the original translation.
//
// Variant characters and tone:
//   A — "Editorial"    Restrained luxury, third-person. Matches the
//                      original v2 design brief. Reads like a Wallpaper*
//                      column. Default.
//   B — "Founder-led"  Loris and Claudio in their own voice. Warmer,
//                      personal, slightly proud. Skews higher trust.
//   C — "Concierge"    Service-led, day-of-trip framing. Lots of
//                      "we", verbs first. Reads like a butler's pitch.

export type Variant = "A" | "B" | "C";

export const variants: { code: Variant; label: string; tagline: string }[] = [
  { code: "A", label: "Editorial",   tagline: "Restrained luxury" },
  { code: "B", label: "Founder-led", tagline: "Loris & Claudio" },
  { code: "C", label: "Concierge",   tagline: "Service-led" },
];

// Partial deep-merge shape — every field optional so a variant can
// override only the lines it cares about.
export type CopyOverride = {
  hero?: { title?: string; sub?: string };
  intro?: { eyebrow?: string; title?: string; body?: string };
  tours?: { lead?: string; title?: string; right?: string };
  fleet?: { lead?: string; title?: string; right?: string };
  map?: { lead?: string; title?: string; right?: string; sideTitle?: string; sideBody?: string };
  experiences?: { lead?: string; title?: string; right?: string };
  testimonials?: { lead?: string; title?: string; right?: string };
  instagram?: { title?: string; right?: string };
  contact?: { lead?: string; title?: string };
};

export const copyVariants: Record<Variant, CopyOverride> = {
  // ────────────────────────────────────────────────────────────────
  // Variant A — Editorial (default; matches translations.ts verbatim)
  // ────────────────────────────────────────────────────────────────
  A: {},

  // ────────────────────────────────────────────────────────────────
  // Variant B — Founder-led ("we" = Loris and Claudio)
  // ────────────────────────────────────────────────────────────────
  B: {
    hero: {
      title: "Lake Como.<br/>The way <em>we know it.</em>",
      sub: "We're Loris and Claudio, third-generation lake skippers. Our boats are mahogany, hand-built, and ours. Half-day private tours from Como, at your pace.",
    },
    intro: {
      eyebrow: "Loris & Claudio · Skippers, Lake Como",
      title: "Two skippers, two wooden boats, <em>one lake we grew up on.</em>",
      body: "Our grandfathers fished these waters; our fathers built boats here. We know which villas catch the morning light, where the wind drops at four, and which café in Bellagio still keeps a table for the same families it has for sixty years. That's what we bring on board.",
    },
    tours: {
      lead: "Four routes we know by heart.",
      title: "Private cruises with <em>one of us at the helm.</em>",
      right: "Every itinerary is one we've shaped over years on the lake. Villa Balbianello, Bellagio, Varenna, and the corners only locals find.",
    },
    fleet: {
      lead: "Our two boats. One each.",
      title: "Both <em>mahogany.</em> Both <em>ours.</em>",
      right: "Claudio takes the Venetian taxi, Loris the mahogany caddy. We maintain them ourselves between trips, the same way our fathers taught us, sliding sunroofs, leather seating, full HiFi, no detail left for someone else to handle.",
    },
    map: {
      lead: "Our route, north from Como.",
      title: "The stops we <em>weave together,</em> over a single morning.",
      right: "Nine destinations, traced south to north. We pick the order on the day, based on the wind, the light, and what you've come for.",
      sideTitle: "Where we'll <em>take you.</em>",
      sideBody: "Nine stops, traced south to north. We weave them into one private morning at your pace, and we adjust on the water if the wind has other ideas.",
    },
    experiences: {
      lead: "When the day matters more.",
      title: "We've been part of <em>weddings, proposals, films.</em>",
      right: "Champagne, photographers, a private chef on the foredeck, our regulars know we'll handle the rest. Tell us what you're planning and we'll make the lake match.",
    },
    testimonials: {
      lead: "What our guests say.",
      title: "Three seasons, <em>87 reviews.</em>",
      right: "We read every one. The five-star ones, and the rare four-star ones we learn from.",
    },
    instagram: {
      title: "Our days on <em>the lake.</em>",
      right: "Most mornings on Lake Como look like this. Follow along on Instagram.",
    },
    contact: {
      lead: "Write to us, we read every message ourselves.",
      title: "Tell us what <em>you're planning.</em>",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // Variant C — Concierge (service-led, action verbs, day-of-trip)
  // ────────────────────────────────────────────────────────────────
  C: {
    hero: {
      title: "Lake Como, <em>privately.</em><br/>From Como, by mahogany boat.",
      sub: "Half-day and full-day private tours of Lake Como. Hotel pick-up, captain, refreshments, the lake's most photographed villas. We handle the day, you arrive on the water.",
    },
    intro: {
      eyebrow: "Como Boat Rental · Concierge & Captains",
      title: "We plan, we drive, we pour the prosecco, <em>you watch the lake go by.</em>",
      body: "From the moment we collect you at your hotel pontoon to the moment we drop you back at sunset, every detail is handled. Pick-up, refreshments, captain, photography stops, lakeside lunch reservations, return. You bring the day. We handle the rest.",
    },
    tours: {
      lead: "Four tours, every detail handled.",
      title: "Pick a route. <em>We'll take it from there.</em>",
      right: "Each tour comes with hotel pick-up, a multilingual captain, on-board refreshments and photography stops at every iconic villa.",
    },
    fleet: {
      lead: "Two mahogany boats, kept showroom-fresh.",
      title: "Step on board, <em>you're already on holiday.</em>",
      right: "Sliding sunroofs for sun and shade, leather seating, ice in the minibar, towels for swimmers, full HiFi if you want music. Everything you'd ask for, already there.",
    },
    map: {
      lead: "Nine destinations, one private day.",
      title: "We'll <em>weave them together</em> at your pace.",
      right: "Hotel pick-up at Villa d'Este or Mandarin, photography at Balbianello, lunch reservation in Bellagio, swim stop on the way back. We arrange. You enjoy.",
      sideTitle: "We'll <em>weave them in</em>, at your pace.",
      sideBody: "Nine stops, south to north. Tell us which matter most and we'll plan the route, the timing and the lunch reservation around them.",
    },
    experiences: {
      lead: "Whatever the occasion, we organise it.",
      title: "Weddings. Proposals. <em>The whole day, planned.</em>",
      right: "From sunset proposals at Villa Balbianello to editorial shoots at Villa d'Este, we co-ordinate the photographer, the florist, the champagne and the timing.",
    },
    testimonials: {
      lead: "What our guests say afterwards.",
      title: "4.9 stars across <em>three seasons.</em>",
      right: "Reviews collected from Google, verified guests of Como Boat Rental.",
    },
    instagram: {
      title: "A day on the lake, <em>seen from the boat.</em>",
      right: "Photography from our captains, posted as the season unfolds.",
    },
    contact: {
      lead: "Tell us your hotel and your dates, we'll plan the day.",
      title: "Reserve <em>your boat day.</em>",
    },
  },
};

// Helper — recursively merge a (possibly partial) override object into a
// base object. Used in page.tsx to layer a CopyOverride on top of a full
// Translation. Only fields present in the override get applied; everything
// else (locale-specific copy, place names, prices, etc.) passes through
// untouched.
//
// The signature is intentionally loose — DeepPartial<T> is awkward to
// express precisely without bloating this file. The runtime contract is
// what matters: object → recurse, undefined → skip, anything else →
// overwrite.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeVariant<T extends object>(base: T, override: any): T {
  if (!override) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(override)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = mergeVariant(
        ((base as Record<string, unknown>)[k] as object) ?? {},
        v,
      );
    } else if (v !== undefined) {
      out[k] = v;
    }
  }
  return out as T;
}
