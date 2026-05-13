"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  translations,
  locales,
  rtlLocales,
  type Locale,
} from "../translations";
import {
  copyVariants,
  mergeVariant,
  variants,
  type Variant,
} from "../copy-variants";
import { localePath } from "../seo";
import { attractions, ORBIT_PIN_IDS } from "../content/attractions";

// Five interchangeable colour palettes — defined in app/globals.css under
// html[data-palette="A|B|C|D|E"]. The toggle just sets the attribute;
// every CSS rule consumes the same tokens and re-paints automatically.
type Palette = "A" | "B" | "C" | "D" | "E";
const PALETTES: { code: Palette; label: string; tagline: string }[] = [
  { code: "A", label: "Parchment", tagline: "Warm cream + ink" },
  { code: "B", label: "Fog", tagline: "Cool grey-green" },
  { code: "C", label: "Terracotta", tagline: "Warm Mediterranean" },
  { code: "D", label: "Mono", tagline: "Near-monochrome" },
  { code: "E", label: "Dusk", tagline: "Dark mode · sunset" },
];

const DEFAULT_VARIANT: Variant = "A";
const DEFAULT_PALETTE: Palette = "A";
const VARIANT_LS_KEY = "cbr.variant";
const PALETTE_LS_KEY = "cbr.palette";

// === Site constants (locale-independent) ===
const PHONE_1_DISP = "+39 340 6487574";
const PHONE_2_DISP = "+39 348 0689769";
const PHONE_1_TEL = "+393406487574";
const PHONE_2_TEL = "+393480689769";
const EMAIL = "info@comoboatrental.it";
const WHATSAPP_URL = "https://wa.me/393406487574";
const INSTAGRAM_URL = "https://www.instagram.com/comoboatrental";

// === Image map: each section uses real photos from /public/images ===
const HERO_IMG = "/images/hero-sunset.jpg";
const TOUR_IMGS = [
  "/images/hero-1.jpg",
  "/images/balbianello.jpg",
  "/images/bellagio.jpg",
  "/images/luxury-cruise.jpg",
];
const FLEET_IMGS = ["/images/taxi-boat.jpg", "/images/luxury-caddy.jpg"];
const CONTACT_BG = "/images/lake-como-discover.jpg";

import instagramManifest from "../../public/instagram-feed.json";
type IgPost = { shortcode: string; src: string; permalink: string; alt: string };
const INSTAGRAM_FALLBACK: IgPost[] = [
  { shortcode: "fallback-1", src: "/images/hero-1.jpg",        permalink: "https://www.instagram.com/comoboatrental/", alt: "Lake Como wooden boat tour, golden hour over the western shore" },
  { shortcode: "fallback-2", src: "/images/hero-sunset.jpg",   permalink: "https://www.instagram.com/comoboatrental/", alt: "Mahogany boat anchored off Cernobbio at sunset, Lake Como" },
  { shortcode: "fallback-3", src: "/images/wedding.jpg",       permalink: "https://www.instagram.com/comoboatrental/", alt: "Wedding aboard a private boat on Lake Como" },
  { shortcode: "fallback-4", src: "/images/balbianello.jpg",   permalink: "https://www.instagram.com/comoboatrental/", alt: "Villa del Balbianello from the water, the Casino Royale angle" },
  { shortcode: "fallback-5", src: "/images/luxury-cruise.jpg", permalink: "https://www.instagram.com/comoboatrental/", alt: "Full-day private cruise on Lake Como aboard a mahogany caddy" },
  { shortcode: "fallback-6", src: "/images/bellagio.jpg",      permalink: "https://www.instagram.com/comoboatrental/", alt: "Approaching Bellagio by boat, Lake Como" },
];
const INSTAGRAM_POSTS: IgPost[] =
  Array.isArray(instagramManifest) && instagramManifest.length > 0
    ? (instagramManifest as IgPost[])
    : INSTAGRAM_FALLBACK;

// Render <em>...</em> as italic accent inside a heading without dangerouslySetInnerHTML.
function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const emMatch = remaining.match(/^<em>(.*?)<\/em>/);
    const brMatch = remaining.match(/^<br\/?>/);
    if (emMatch) {
      parts.push(<em key={key++}>{emMatch[1]}</em>);
      remaining = remaining.slice(emMatch[0].length);
    } else if (brMatch) {
      parts.push(<br key={key++} />);
      remaining = remaining.slice(brMatch[0].length);
    } else {
      const next = remaining.search(/<em>|<br\/?>/);
      if (next === -1) {
        parts.push(<span key={key++}>{remaining}</span>);
        remaining = "";
      } else {
        parts.push(<span key={key++}>{remaining.slice(0, next)}</span>);
        remaining = remaining.slice(next);
      }
    }
  }
  return <>{parts}</>;
}

// Left/right arrows that scroll a horizontal carousel by ~80% of its visible
// width. The arrows hide themselves when there's no more content to scroll
// to in that direction. Reused for both the Tours carousel and the
// Attractions strip.
function ScrollArrows({
  scrollerRef,
  label,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  label: string;
}) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollerRef]);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        className="scroll-arrow scroll-arrow-left"
        onClick={() => scroll(-1)}
        disabled={!canLeft}
        aria-label={`${label} — scroll left`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        className="scroll-arrow scroll-arrow-right"
        onClick={() => scroll(1)}
        disabled={!canRight}
        aria-label={`${label} — scroll right`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </>
  );
}

// Dot indicators under a horizontal scroller — like the bottom of the
// Il Medeghino carousel screenshot. Tracks which card is currently
// closest to centre via a scroll listener, lets the user jump to any
// card by clicking the matching dot.
//
// When `autoAdvanceMobile` is true and the viewport is mobile-sized
// (≤720px), the carousel auto-advances one card every 2 seconds.
// Any user interaction (touchstart, mousedown, wheel) pauses the
// auto-advance for 5 seconds so it doesn't fight the visitor.
function CarouselDots({
  scrollerRef,
  count,
  autoAdvanceMobile = false,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  count: number;
  autoAdvanceMobile?: boolean;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const lastUserInteractionRef = useRef(0);
  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  // Find the card whose centre is closest to the scroller's viewport
  // centre, and mark its dot active.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const containerCenter = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      const cards = el.children;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setActiveIdx(bestIdx);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollerRef, count]);

  // Track user interaction so auto-advance can pause politely.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const mark = () => {
      lastUserInteractionRef.current = Date.now();
    };
    el.addEventListener("touchstart", mark, { passive: true });
    el.addEventListener("mousedown", mark);
    el.addEventListener("wheel", mark, { passive: true });
    return () => {
      el.removeEventListener("touchstart", mark);
      el.removeEventListener("mousedown", mark);
      el.removeEventListener("wheel", mark);
    };
  }, [scrollerRef]);

  // Auto-advance every 2s on mobile only.
  useEffect(() => {
    if (!autoAdvanceMobile) return;
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 720px)");
    let intervalId: number | undefined;
    const tick = () => {
      // Pause for 5s after any user interaction.
      if (Date.now() - lastUserInteractionRef.current < 5000) return;
      const el = scrollerRef.current;
      if (!el) return;
      const next = (activeIdxRef.current + 1) % count;
      const card = el.children[next] as HTMLElement | undefined;
      if (!card) return;
      const target = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
      el.scrollTo({ left: target, behavior: "smooth" });
    };
    const setup = (isMobile: boolean) => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
      if (isMobile) intervalId = window.setInterval(tick, 2000);
    };
    setup(mql.matches);
    const onChange = () => setup(mql.matches);
    mql.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [autoAdvanceMobile, count, scrollerRef]);

  const goTo = (idx: number) => {
    lastUserInteractionRef.current = Date.now();
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const target = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <div className="carousel-dots" role="tablist" aria-label="Carousel position">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          className={`carousel-dot ${i === activeIdx ? "active" : ""}`}
          aria-label={`Go to slide ${i + 1}`}
          aria-selected={i === activeIdx}
          onClick={() => goTo(i)}
        />
      ))}
    </div>
  );
}

// === Lake Como map — interactive Leaflet with CartoDB Voyager tiles ===
type Pin = { id: string; name: string; note: string; type: string; lat: number; lng: number };

const INITIAL_VIEW: [number, number] = [45.95, 9.25];
const INITIAL_ZOOM = 10;

function LakeComoMap({
  pins,
  activeId,
  onActivate,
  sectionRef,
  userInteracting,
}: {
  pins: Pin[];
  activeId: string;
  onActivate: (id: string) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
  /** When true, the boat lerps toward `activeId` instead of running
   * the automatic orbit. Driven by mouse hover on the pin list or
   * attractions section in the parent component. */
  userInteracting: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Record<string, any>>({});

  // Mirror reactive state into refs so the long-lived rAF loop can read
  // current values without being torn down and rebuilt every render.
  const userInteractingRef = useRef(false);
  const targetPinIdRef = useRef<string | null>(null);
  useEffect(() => { userInteractingRef.current = userInteracting; }, [userInteracting]);
  useEffect(() => { targetPinIdRef.current = activeId; }, [activeId]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;
      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
      }).setView(INITIAL_VIEW, INITIAL_ZOOM);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // Separate orbit pins (boat auto-cruises through these) from extra
      // attraction pins (markers only, no orbit). The polyline traces only
      // the orbit route, which is the editorial cruise itinerary; the rest
      // are reachable via hover from the side-list / attractions section.
      const orbitPins = pins.filter((p) => ORBIT_PIN_IDS.includes(p.id));

      L.polyline(
        orbitPins.map((p) => [p.lat, p.lng] as [number, number]),
        { color: "#2a3943", weight: 1.6, opacity: 0.55, dashArray: "4, 6" },
      ).addTo(map);

      pins.forEach((pin) => {
        const m = L.circleMarker([pin.lat, pin.lng], {
          radius: 6,
          fillColor: "#fff",
          color: "#2a3943",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(map);
        m.bindTooltip(pin.name, { direction: "top", offset: [0, -10], permanent: true, className: "stop-label" });
        m.on("mouseover", () => onActivate(pin.id));
        m.on("click", () => onActivate(pin.id));
        markersRef.current[pin.id] = m;
      });

      const boatIcon = L.divIcon({
        className: "boat-marker",
        html: `<svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="56" rx="10" ry="2" fill="#fff" opacity="0.55"/>
          <ellipse cx="20" cy="52" rx="6" ry="1.4" fill="#fff" opacity="0.4"/>
          <path d="M20 4 C 28 12, 30 22, 30 36 L 30 46 C 30 50, 26 52, 20 52 C 14 52, 10 50, 10 46 L 10 36 C 10 22, 12 12, 20 4 Z" fill="#5a2a14" stroke="#2a1208" stroke-width="0.6"/>
          <path d="M13 30 C 15 22, 17 14, 20 8" stroke="#3d1c0d" stroke-width="0.4" fill="none" opacity="0.6"/>
          <path d="M27 30 C 25 22, 23 14, 20 8" stroke="#3d1c0d" stroke-width="0.4" fill="none" opacity="0.6"/>
          <path d="M20 14 C 25 20, 26 28, 26 36 L 26 44 C 26 47, 23 48, 20 48 C 17 48, 14 47, 14 44 L 14 36 C 14 28, 15 20, 20 14 Z" fill="#EFEBE1" stroke="#8a4a2a" stroke-width="0.4"/>
          <path d="M15 26 Q 20 23, 25 26 L 24 29 Q 20 27, 16 29 Z" fill="#a8c5d6" stroke="#333" stroke-width="0.4"/>
          <rect x="15.5" y="32" width="3.5" height="5" rx="0.6" fill="#c9a878" stroke="#5a2a14" stroke-width="0.3"/>
          <rect x="21" y="32" width="3.5" height="5" rx="0.6" fill="#c9a878" stroke="#5a2a14" stroke-width="0.3"/>
          <rect x="15" y="40" width="10" height="4" rx="0.6" fill="#c9a878" stroke="#5a2a14" stroke-width="0.3"/>
          <circle cx="20" cy="9" r="0.9" fill="#d4d4d4" stroke="#333" stroke-width="0.3"/>
        </svg>`,
        iconSize: [40, 60],
        iconAnchor: [20, 30],
      });
      const boat = L.marker([orbitPins[0].lat, orbitPins[0].lng], { icon: boatIcon, interactive: false }).addTo(map);

      const bearing = (from: [number, number], to: [number, number]) => {
        const dLng = ((to[1] - from[1]) * Math.PI) / 180;
        const lat1 = (from[0] * Math.PI) / 180;
        const lat2 = (to[0] * Math.PI) / 180;
        const y = Math.sin(dLng) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
        return (Math.atan2(y, x) * 180) / Math.PI;
      };
      const rotate = (deg: number) => {
        const svg = boat.getElement()?.querySelector("svg") as SVGElement | null;
        if (svg) svg.style.transform = `rotate(${deg}deg)`;
      };

      const LEG_MS = 3500;
      const PAUSE_MS = 700;
      // Boat auto-orbits along the orbit pins (editorial cruise itinerary).
      // Hovering side-list pins or attraction cards switches the boat into
      // "follow target" mode via userInteractingRef + targetPinIdRef.
      const orbitCoords = orbitPins.map((p) => [p.lat, p.lng] as [number, number]);
      let legIdx = 0;
      let legStart = performance.now();
      let pausing = false;
      let pauseUntil = 0;
      let curBearing = bearing(orbitCoords[0], orbitCoords[1]);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const LERP_SPEED = 0.12; // per-frame lerp toward hover target (~0.5s at 60fps to traverse a leg)
      const step = (now: number) => {
        if (userInteractingRef.current && targetPinIdRef.current) {
          // User-driven mode: smoothly chase the active pin's coordinates.
          const target = pins.find((p) => p.id === targetPinIdRef.current);
          if (target) {
            const cur = boat.getLatLng();
            const dLat = target.lat - cur.lat;
            const dLng = target.lng - cur.lng;
            const newLat = cur.lat + dLat * LERP_SPEED;
            const newLng = cur.lng + dLng * LERP_SPEED;
            boat.setLatLng([newLat, newLng]);
            // Only rotate when we're meaningfully moving (avoid jitter near target).
            if (Math.hypot(dLat, dLng) > 0.0003) {
              rotate(bearing([cur.lat, cur.lng], [target.lat, target.lng]));
            }
            // Reset orbit phase so when user disengages, it resumes cleanly.
            legStart = now;
            pausing = false;
          }
        } else if (pausing) {
          if (now >= pauseUntil) {
            pausing = false;
            legIdx = (legIdx + 1) % (orbitCoords.length - 1 || 1);
            legStart = now;
            curBearing = bearing(orbitCoords[legIdx], orbitCoords[(legIdx + 1) % orbitCoords.length]);
            rotate(curBearing);
          }
        } else {
          const from = orbitCoords[legIdx];
          const to = orbitCoords[(legIdx + 1) % orbitCoords.length];
          const t = Math.min((now - legStart) / LEG_MS, 1);
          boat.setLatLng([lerp(from[0], to[0], t), lerp(from[1], to[1], t)]);
          rotate(curBearing);
          if (t >= 1) {
            pausing = true;
            pauseUntil = now + PAUSE_MS;
            if (legIdx >= orbitCoords.length - 1) legIdx = -1;
          }
        }
        rafId = requestAnimationFrame(step);
      };
      let rafId = requestAnimationFrame(step);
      setTimeout(() => rotate(curBearing), 0);
      mapRef.current = map;

      const sec = sectionRef.current;
      if (sec) {
        // Fit the bounds around ALL pins (orbit + attraction extras) so the
        // fly-zoom takes in the whole lake even with Lecco/Menaggio added.
        const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng] as [number, number]));
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                map.flyToBounds(bounds, { animate: true, duration: 2, padding: [40, 40] });
              } else {
                map.flyTo(INITIAL_VIEW, INITIAL_ZOOM, { animate: true, duration: 1.5 });
              }
            });
          },
          { threshold: 0.4 },
        );
        io.observe(sec);
        return () => {
          io.disconnect();
          cancelAnimationFrame(rafId);
        };
      }
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = {};
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pins.forEach((pin) => {
      const m = markersRef.current[pin.id];
      if (m) m.setTooltipContent(pin.name);
    });
  }, [pins]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const tip = m.getTooltip()?.getElement?.();
      if (id === activeId) {
        m.setStyle({ fillColor: "#8c6a3f", radius: 9 });
        tip?.classList.add("active");
        m.setLatLng(m.getLatLng());
        if (mapRef.current) mapRef.current.panTo(m.getLatLng(), { animate: true, duration: 0.6 });
      } else {
        m.setStyle({ fillColor: "#fff", radius: 6 });
        tip?.classList.remove("active");
      }
    });
  }, [activeId]);

  return <div className="lake-map" ref={containerRef} />;
}

export default function HomePage({ locale }: { locale: Locale }) {
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT);
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);
  const [togglePanelOpen, setTogglePanelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePin, setActivePin] = useState<string>("bellagio");
  // True whenever the user is hovering the pin list or the attractions
  // scroller. Disengages the boat's automatic orbit and switches it to
  // "follow target pin" mode (see LakeComoMap rAF loop).
  const [userInteracting, setUserInteracting] = useState(false);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLElement>(null);
  const attractionsScrollRef = useRef<HTMLDivElement>(null);
  const toursScrollRef = useRef<HTMLDivElement>(null);

  // Apply variant copy override on top of the active locale. Variant copy
  // is English-only.
  const baseT = translations[locale];
  const t = locale === "en" ? mergeVariant(baseT, copyVariants[variant]) : baseT;
  const isRtl = rtlLocales.includes(locale);

  // Hydrate variant + palette from localStorage on mount.
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(VARIANT_LS_KEY);
      const p = window.localStorage.getItem(PALETTE_LS_KEY);
      if (v === "A" || v === "B" || v === "C") setVariant(v);
      if (p === "A" || p === "B" || p === "C" || p === "D" || p === "E") setPalette(p);
    } catch {
      /* ignore */
    }
  }, []);

  // Persist + apply palette to <html data-palette="X">
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
    try { window.localStorage.setItem(PALETTE_LS_KEY, palette); } catch { /* noop */ }
  }, [palette]);

  useEffect(() => {
    try { window.localStorage.setItem(VARIANT_LS_KEY, variant); } catch { /* noop */ }
  }, [variant]);

  // Keep <html lang> + dir in sync with the prop (in case the runtime
  // route changes — e.g. via the locale switcher).
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [locale, isRtl]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const y = window.scrollY;
      if (heroImgRef.current && y < window.innerHeight) {
        heroImgRef.current.style.transform = `translateY(${y * 0.18}px) scale(${1.05 + y * 0.0001})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [locale]);

  // When the user is hovering pin-list / attractions, smoothly scroll the
  // attractions scroller so the card matching the active pin is centered.
  // We only auto-scroll the attractions container (not the page), so this
  // has no effect on visitor scroll position.
  useEffect(() => {
    if (!userInteracting || !attractionsScrollRef.current) return;
    const container = attractionsScrollRef.current;
    const card = container.querySelector<HTMLElement>(`[data-pin-id="${activePin}"]`);
    if (!card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta = (cardRect.left + cardRect.width / 2) - (containerRect.left + containerRect.width / 2);
    container.scrollBy({ left: delta, behavior: "smooth" });
  }, [activePin, userInteracting]);

  const fromLabel = locale === "en" ? "From" : locale === "it" ? "Da" : locale === "ru" ? "От" : "من";

  return (
    <>
      {/* Editorial preview toggle — see README. */}
      <div className={`vp-toggle ${togglePanelOpen ? "open" : ""}`} aria-label="Editorial preview controls">
        <button
          className="vp-toggle-pill"
          onClick={() => setTogglePanelOpen((v) => !v)}
          aria-expanded={togglePanelOpen}
        >
          <span className="vp-dot" />
          <span className="vp-pill-label">
            <span>Variant {variant}</span>
            <span className="vp-sep">·</span>
            <span>Palette {palette}</span>
          </span>
          <span className="vp-caret">{togglePanelOpen ? "×" : "▾"}</span>
        </button>
        {togglePanelOpen && (
          <div className="vp-panel" role="dialog">
            <div className="vp-row">
              <div className="vp-row-label">Copy</div>
              <div className="vp-row-options">
                {variants.map((v) => (
                  <button
                    key={v.code}
                    className={`vp-chip ${variant === v.code ? "active" : ""}`}
                    onClick={() => setVariant(v.code)}
                    title={v.tagline}
                  >
                    <span className="vp-chip-code">{v.code}</span>
                    <span className="vp-chip-label">{v.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="vp-row">
              <div className="vp-row-label">Palette</div>
              <div className="vp-row-options">
                {PALETTES.map((p) => (
                  <button
                    key={p.code}
                    className={`vp-chip ${palette === p.code ? "active" : ""}`}
                    onClick={() => setPalette(p.code)}
                    title={p.tagline}
                  >
                    <span className="vp-chip-code">{p.code}</span>
                    <span className="vp-chip-label">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="vp-foot">English copy only · SEO baked in regardless</div>
          </div>
        )}
      </div>

      <nav className={`top ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`} id="topnav">
        <a href={localePath(locale, "/")} className="logo">
          <span className="mark"></span>Como Boat Rental
        </a>
        <div className="links">
          <a href="#tours">{t.nav.tours}</a>
          <a href="#map">{t.nav.map}</a>
          <a href="#attractions">{t.nav.attractions}</a>
          <a href="#fleet">{t.nav.fleet}</a>
          <a href="#experiences">{t.nav.experiences}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="lang">
          {locales.map((l) => (
            <a
              key={l.code}
              href={localePath(l.code, "/")}
              className={l.code === locale ? "active" : ""}
              aria-label={`Switch to ${l.label}`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          className="burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <a href="#tours" onClick={() => setMenuOpen(false)}>{t.nav.tours}</a>
          <a href="#map" onClick={() => setMenuOpen(false)}>{t.nav.map}</a>
          <a href="#attractions" onClick={() => setMenuOpen(false)}>{t.nav.attractions}</a>
          <a href="#fleet" onClick={() => setMenuOpen(false)}>{t.nav.fleet}</a>
          <a href="#experiences" onClick={() => setMenuOpen(false)}>{t.nav.experiences}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="scene">
          <div className="scene-img" ref={heroImgRef} style={{ backgroundImage: `url(${HERO_IMG})` }}
               role="img"
               aria-label="Hand-built mahogany boat on Lake Como at sunset, with the Como mountains in the background" />
          <div className="scene-overlay" />
          <div className="scene-grain" />
        </div>
        <div className="content">
          <div className="location reveal is-visible">
            <span className="line"></span>
            <span className="meta">{t.hero.location}</span>
          </div>
          <h1 className="display reveal is-visible"><RichText text={t.hero.title} /></h1>
          <p className="sub reveal is-visible reveal-delay-1">{t.hero.sub}</p>
          <div className="cta-row reveal is-visible reveal-delay-2">
            <a className="btn" href="#tours">{t.hero.ctaPrimary}</a>
            <a className="btn primary primary-gold" href="#contact">
              {t.hero.ctaReserve} <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>{t.hero.scroll}</span>
          <span className="bar"></span>
        </div>
        <div className="hero-trust">
          {t.hero.trust.map((line, i) => (
            <span key={i}><span className="dot" />{line}</span>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="intro">
        <div className="container-x">
          <div className="eyebrow reveal">{t.intro.eyebrow}</div>
          <h2 className="reveal reveal-delay-1"><RichText text={t.intro.title} /></h2>
          <p className="body-text reveal reveal-delay-2">{t.intro.body}</p>
        </div>
      </section>

      {/* TOURS */}
      <section className="tours" id="tours">
        <div className="container-x">
          <div className="section-head reveal">
            <div className="label">
              <span className="eyebrow">{t.tours.indexLabel}</span>
              <p className="lead">{t.tours.lead}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.tours.title} /></h2>
              <p>{t.tours.right}</p>
            </div>
          </div>

          <div className="scroller-frame">
            <div className="tours-grid" ref={toursScrollRef} aria-label="Lake Como private boat tours">
            {t.tours.items.map((tour, i) => {
              const slugs = ["highlights-1h", "balbianello-nesso", "top-villas-half-day", "bespoke-full-day"];
              return (
                <article key={i} className={`tour-card reveal ${i % 2 === 1 ? "reveal-delay-1" : ""}`}>
                  <a href={localePath(locale, `/tours/${slugs[i]}`)} style={{ display: "contents" }}>
                    <div className="img-wrap">
                      <img src={TOUR_IMGS[i]} alt={`${tour.title.replace(/<[^>]+>/g, "")} — ${tour.duration} private boat tour from Como`} loading="lazy" width="900" height="600" />
                      <div className="duration-tag">{tour.duration}</div>
                      <div className="price-tag">
                        <span className="from-label">{t.tours.factFrom}</span>
                        <b>{tour.price.replace(/^[^\d]*/, "").replace(/[^\d.,]/g, "").replace(/^/, "€")}</b>
                      </div>
                    </div>
                    <h3><RichText text={tour.title} /></h3>
                    <p className="descr">{tour.desc}</p>
                    <div className="itinerary">
                      {tour.stops.map((s, k) => (<span className="stop" key={k}>{s}</span>))}
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
                        <span className="v">{tour.price}</span>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
            </div>
            <ScrollArrows scrollerRef={toursScrollRef} label="Tours" />
            <CarouselDots scrollerRef={toursScrollRef} count={t.tours.items.length} autoAdvanceMobile />
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="map-section" id="map" ref={mapSectionRef}>
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div className="label">
              <span className="eyebrow">{t.map.indexLabel}</span>
              <p className="lead">{t.map.lead}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.map.title} /></h2>
              <p>{t.map.right}</p>
            </div>
          </div>

          <div className="map-wrap">
            <div className="map-side reveal">
              <p className="map-intro">{t.map.sideBody}</p>
              <div
                className="map-pin-list"
                onMouseEnter={() => setUserInteracting(true)}
                onMouseLeave={() => setUserInteracting(false)}
              >
                {t.map.pins.map((pin, i) => {
                  // Map pin id (PIN_BASE) → attraction slug. Built from
                  // the attractions content data so adding a new pin/attraction
                  // pair automatically wires the link.
                  const pinSlug = attractions.find((a) => a.pinId === pin.id)?.slug;
                  return (
                  <a
                    key={pin.id}
                    href={pinSlug ? localePath(locale, `/attractions/${pinSlug}`) : "#"}
                    className={`pin-row ${pin.id === activePin ? "active" : ""}`}
                    onMouseEnter={() => setActivePin(pin.id)}
                    onClick={(e) => {
                      // Pins without an attraction page (e.g. Argegno) just
                      // activate the hover state, don't navigate.
                      if (!pinSlug) {
                        e.preventDefault();
                        setActivePin(pin.id);
                      }
                    }}
                  >
                    <span className="pin-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pin-name">{pin.name}</span>
                    <span className="pin-meta">{pin.note}</span>
                  </a>
                  );
                })}
              </div>
            </div>

            <div className="map-canvas reveal reveal-delay-1">
              <LakeComoMap
                pins={t.map.pins}
                activeId={activePin}
                onActivate={setActivePin}
                sectionRef={mapSectionRef}
                userInteracting={userInteracting}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ATTRACTIONS — horizontally-scrollable strip of the 13 places worth
          arriving by boat. Hovering a card moves the boat marker on the map
          above and highlights the matching pin in the side-list (and vice
          versa — see the .map-pin-list mouseenter wiring). */}
      <section className="attractions-section" id="attractions">
        <div className="container-x">
          <div className="section-head reveal">
            <div className="label">
              <span className="eyebrow">{t.attractions.indexLabel}</span>
              <p className="lead">{t.attractions.lead}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.attractions.title} /></h2>
              <p>{t.attractions.right}</p>
            </div>
          </div>

          <div
            className="scroller-frame"
            onMouseEnter={() => setUserInteracting(true)}
            onMouseLeave={() => setUserInteracting(false)}
          >
            <div
              className="attractions-scroller"
              ref={attractionsScrollRef}
              aria-label="Lake Como attractions, scroll horizontally"
            >
            {attractions.map((a) => (
              <article
                key={a.slug}
                className={`attraction-card ${a.pinId === activePin ? "active" : ""}`}
                data-pin-id={a.pinId}
                onMouseEnter={() => setActivePin(a.pinId)}
              >
                <a href={localePath(locale, `/attractions/${a.slug}`)} style={{ display: "contents" }}>
                  <div className="img-wrap">
                    <img
                      src={a.image}
                      alt={a.copy[locale].name}
                      loading="lazy"
                      width="640"
                      height="480"
                    />
                  </div>
                  <h3>{a.copy[locale].name}</h3>
                  <p>{a.copy[locale].blurb}</p>
                </a>
              </article>
            ))}
            </div>
            <ScrollArrows scrollerRef={attractionsScrollRef} label="Attractions" />
            <CarouselDots scrollerRef={attractionsScrollRef} count={attractions.length} autoAdvanceMobile />
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="fleet" id="fleet">
        <div className="container-x">
          <div className="section-head reveal">
            <div className="label">
              <span className="eyebrow">{t.fleet.indexLabel}</span>
              <p className="lead">{t.fleet.lead}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.fleet.title} /></h2>
              <p>{t.fleet.right}</p>
            </div>
          </div>

          <div className="fleet-grid">
            {t.fleet.items.map((boat, i) => (
              <article key={i} className="boat-card reveal">
                <div className="boat-img">
                  <img src={FLEET_IMGS[i]} alt={`${boat.name.replace(/<[^>]+>/g, "")} — Como Boat Rental fleet`} loading="lazy" width="1200" height="800" />
                  <span className="badge">{boat.cornerLabel}</span>
                </div>
                <h3><RichText text={boat.name} /></h3>
                <p>{boat.desc}</p>
                <div className="boat-specs">
                  {boat.specs.map((spec, k) => (
                    <div key={k} className="spec">
                      <span className="k">{spec.label}</span>
                      <span className="v">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="boat-foot">
                  <div className="boat-price">
                    <span className="label">{fromLabel}</span>
                    <span className="v">{boat.price}</span>
                  </div>
                  <a className="btn ghost" href="#contact">
                    {t.fleet.inquireCta} <span className="arrow">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="experiences" id="experiences">
        <div className="container-x">
          <div className="section-head reveal">
            <div className="label">
              <span className="eyebrow">{t.experiences.indexLabel}</span>
              <p className="lead">{t.experiences.lead}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.experiences.title} /></h2>
              <p>{t.experiences.right}</p>
            </div>
          </div>

          <div className="exp-row">
            {t.experiences.items.map((exp, i) => (
              <article key={i} className={`exp-card reveal ${i > 0 ? `reveal-delay-${i}` : ""}`}>
                <div className="num">{String(i + 1).padStart(2, "0")} /</div>
                <h3><RichText text={exp.title} /></h3>
                <p>{exp.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div className="label">
              <span className="eyebrow">{t.testimonials.indexLabel}</span>
              <p className="lead">{t.testimonials.lead}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.testimonials.title} /></h2>
              <p>{t.testimonials.right}</p>
            </div>
          </div>

          <div className="testi-rating reveal">
            <div className="testi-score">
              {t.testimonials.score}<span className="out">{t.testimonials.scoreOutOf}</span>
            </div>
            <div className="testi-stars">★ ★ ★ ★ ★</div>
            <div className="meta">
              {t.testimonials.reviewCount} · {t.testimonials.reviewPeriod} ·{" "}
              <a href={localePath(locale, "/reviews")}>{t.testimonials.reviewLink} →</a>
            </div>
          </div>

          <div className="testi-grid">
            {t.testimonials.items.map((rev, i) => (
              <figure key={i} className={`testi reveal ${i > 0 ? `reveal-delay-${i}` : ""}`}>
                <span className="quote-mark" aria-hidden>“</span>
                <blockquote>{rev.quote}</blockquote>
                <cite>
                  <span className="name">{rev.author}</span>
                  <span className="when">{rev.date}</span>
                </cite>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="instagram" id="instagram">
        <div className="container-x">
          <div className="section-head reveal">
            <div className="label">
              <span className="eyebrow">{t.instagram.indexLabel}</span>
              <p className="lead">{t.instagram.lead}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.instagram.title} /></h2>
              <p>{t.instagram.right}</p>
            </div>
          </div>

          <div className="ig-grid reveal">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.shortcode}
                className="ig-tile"
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={post.alt || `Open Instagram post ${post.shortcode}`}
                title={post.alt || undefined}
              >
                <img src={post.src} alt={post.alt || `Como Boat Rental Instagram ${post.shortcode}`} loading="lazy" width="600" height="600" />
                <span className="ig-overlay" aria-hidden>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <div className="ig-cta reveal reveal-delay-1">
            <a className="btn light" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              {t.instagram.cta} <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* OUR BASE */}
      <section className="our-base" id="our-base">
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div className="label">
              <span className="eyebrow">{t.ourBase.indexLabel}</span>
              <p className="lead">{t.ourBase.countLabel}</p>
            </div>
            <div className="title">
              <h2 className="display"><RichText text={t.ourBase.title} /></h2>
              <p>{t.ourBase.body}</p>
            </div>
          </div>

          <div className="map-embed-wrap reveal">
            <iframe
              title="Como Boat Rental — Lungolago Viale Geno"
              src="https://www.google.com/maps?q=Como+Boat+Rental,+Lungolago+Viale+Geno,+22100+Como+CO&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-embed-footer">
              <p className="map-embed-address">{t.ourBase.address}</p>
              <a
                className="btn light"
                href="https://www.google.com/maps/dir/?api=1&destination=Como+Boat+Rental,+Lungolago+Viale+Geno,+22100+Como+CO"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.ourBase.directionsCta} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="bg-img">
          <img src={CONTACT_BG} alt="Lake Como at golden hour, the western shore from a private boat" loading="lazy" width="2000" height="1200" />
        </div>
        <div className="container-x">
          <div
            className="reveal"
            style={{ borderTop: "1px solid rgba(245,239,228,0.18)", paddingTop: 32, marginBottom: 48 }}
          >
            <div
              className="index"
              style={{
                fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em",
                color: "rgba(245,239,228,0.4)", display: "flex", justifyContent: "space-between",
                gap: 24, flexWrap: "wrap",
              }}
            >
              <span>{t.contact.indexLabel}</span>
              <span className="section-lead" style={{ color: "rgba(245,239,228,0.7)" }}>{t.contact.lead}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1"><RichText text={t.contact.title} /></h2>

          <div className="contact-grid reveal reveal-delay-1" itemScope itemType="https://schema.org/PostalAddress">
            <div className="col">
              <h3>{t.contact.phoneLabel}</h3>
              <a href={`tel:${PHONE_1_TEL}`} itemProp="telephone">{PHONE_1_DISP}</a>
              <a href={`tel:${PHONE_2_TEL}`}>{PHONE_2_DISP}</a>
            </div>
            <div className="col">
              <h3>{t.contact.emailLabel}</h3>
              <a href={`mailto:${EMAIL}`} itemProp="email">{EMAIL}</a>
            </div>
            <div className="col">
              <h3>{t.contact.headOfficeLabel}</h3>
              <p dangerouslySetInnerHTML={{ __html: t.contact.headOffice }} />
            </div>
            <div className="col">
              <h3>{t.contact.boatParkingLabel}</h3>
              <p dangerouslySetInnerHTML={{ __html: t.contact.boatParking }} />
            </div>
          </div>

          <div className="cta-block reveal">
            <a className="btn primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {t.contact.whatsapp} <span className="arrow">→</span>
            </a>
            <a className="btn" href={`mailto:${EMAIL}`}
               style={{ borderColor: "rgba(245,239,228,0.5)", color: "var(--cream)" }}>
              {t.contact.emailCta} <span className="arrow">→</span>
            </a>
            <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
               style={{ borderColor: "rgba(245,239,228,0.5)", color: "var(--cream)" }}>
              {t.contact.instagramCta} <span className="arrow">→</span>
            </a>
          </div>

          <div className="footer-bottom" style={{ flexWrap: "wrap", gap: 16 }}>
            <span>{t.contact.rights}</span>
            <span>
              <a href={localePath(locale, "/faq")} style={{ color: "rgba(245,239,228,0.7)", marginRight: 16 }}>FAQ</a>
              <a href={localePath(locale, "/reviews")} style={{ color: "rgba(245,239,228,0.7)" }}>Reviews</a>
            </span>
            <span>{t.contact.safety}</span>
          </div>
        </div>
      </section>

      <a className={`float-pill ${scrolled ? "visible" : ""}`} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d1820" }}></span>
        {t.floatPill}
      </a>
    </>
  );
}
