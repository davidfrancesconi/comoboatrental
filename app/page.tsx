"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { translations, locales, rtlLocales, type Locale } from "./translations";

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
  "/images/hero-1.jpg",          // Tour 01 — first basin / villas
  "/images/balbianello.jpg",     // Tour 02 — Balbianello & Nesso
  "/images/bellagio.jpg",        // Tour 03 — Bellagio + top villas
  "/images/luxury-cruise.jpg",   // Tour 04 — full-day bespoke
];
// Boat 01 = Venetian water taxi (taxi-boat photo from 2026/03 — aerial of long water limo).
// Boat 02 = Luxury wooden caddy (16-scaled = the blue/mahogany Riva-style at Villa d'Este).
const FLEET_IMGS = ["/images/taxi-boat.jpg", "/images/luxury-caddy.jpg"];
const EXP_IMGS = ["/images/wedding.jpg", "/images/photoshoot.jpg", "/images/tour-experience.jpg"];
const CONTACT_BG = "/images/lake-como-discover.jpg";

// Static curated grid that mimics the WordPress Smash Balloon Instagram feed
// from the legacy site. Each tile links to the live Instagram profile.
// Order chosen to match the rough sequence shown on the legacy comoboatrental.it
// — flagship boat shot first, then alternating wide/scenic ↔ portrait/lifestyle:
//   1. Flagship: portrait of model on the Riva, Villa d'Este behind  (hero-1)
//   2. Scenic:   the Riva at sunset on open water                    (hero-sunset)
//   3. People:   wedding/proposal moment on board                    (wedding)
//   4. Architecture: Villa del Balbianello                          (balbianello)
//   5. Lifestyle: aerial of the wooden caddy at speed                (luxury-cruise)
//   6. Town:     Bellagio waterfront                                  (bellagio)
// To swap for a real auto-updating feed, see README "Instagram feed" section.
const INSTAGRAM_TILES = [
  "/images/hero-1.jpg",
  "/images/hero-sunset.jpg",
  "/images/wedding.jpg",
  "/images/balbianello.jpg",
  "/images/luxury-cruise.jpg",
  "/images/bellagio.jpg",
];

// Render <em>...</em> as italic accent inside a heading without dangerouslySetInnerHTML.
function RichText({ text }: { text: string }) {
  // Splits on <em>...</em> and <br/>; nothing else
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

// === Lake Como map — interactive Leaflet with CartoDB Voyager tiles ===
type Pin = { id: string; name: string; note: string; type: string; lat: number; lng: number };

const INITIAL_VIEW: [number, number] = [45.95, 9.25];
const INITIAL_ZOOM = 10;

function LakeComoMap({ pins, activeId, onActivate, sectionRef }: {
  pins: Pin[];
  activeId: string;
  onActivate: (id: string) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Record<string, any>>({});

  // Init map once
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

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      // Polyline route (dashed, ink) connecting all pins in order
      L.polyline(
        pins.map((p) => [p.lat, p.lng] as [number, number]),
        { color: "#2a3943", weight: 1.6, opacity: 0.55, dashArray: "4, 6" }
      ).addTo(map);

      // Circle markers + permanent name tooltips
      pins.forEach((pin) => {
        const m = L.circleMarker([pin.lat, pin.lng], {
          radius: 6,
          fillColor: "#fff",
          color: "#2a3943",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(map);
        m.bindTooltip(pin.name, {
          direction: "top",
          offset: [0, -10],
          permanent: true,
          className: "stop-label",
        });
        m.on("mouseover", () => onActivate(pin.id));
        m.on("click", () => onActivate(pin.id));
        markersRef.current[pin.id] = m;
      });

      // Animated boat marker (Riva-style mahogany, top-down)
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
      const boat = L.marker([pins[0].lat, pins[0].lng], { icon: boatIcon, interactive: false }).addTo(map);

      // Bearing helper
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

      // Animation: cruise leg-by-leg, pause at each, loop
      const LEG_MS = 3500;
      const PAUSE_MS = 700;
      let legIdx = 0;
      let legStart = performance.now();
      let pausing = false;
      let pauseUntil = 0;
      const coords = pins.map((p) => [p.lat, p.lng] as [number, number]);
      let curBearing = bearing(coords[0], coords[1]);

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const step = (now: number) => {
        if (pausing) {
          if (now >= pauseUntil) {
            pausing = false;
            legIdx = (legIdx + 1) % (coords.length - 1 || 1);
            legStart = now;
            curBearing = bearing(coords[legIdx], coords[(legIdx + 1) % coords.length]);
            rotate(curBearing);
          }
        } else {
          const from = coords[legIdx];
          const to = coords[(legIdx + 1) % coords.length];
          const t = Math.min((now - legStart) / LEG_MS, 1);
          boat.setLatLng([lerp(from[0], to[0], t), lerp(from[1], to[1], t)]);
          rotate(curBearing);
          if (t >= 1) {
            pausing = true;
            pauseUntil = now + PAUSE_MS;
            if (legIdx >= coords.length - 1) legIdx = -1;
          }
        }
        rafId = requestAnimationFrame(step);
      };
      let rafId = requestAnimationFrame(step);
      setTimeout(() => rotate(curBearing), 0);

      mapRef.current = map;

      // Intersection observer on the section: fly to fit-bounds when in view,
      // fly back to wide initial view when out
      const sec = sectionRef.current;
      if (sec) {
        const bounds = L.latLngBounds(coords);
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
          { threshold: 0.4 }
        );
        io.observe(sec);
        // Cleanup
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

  // Re-bind tooltip text when locale changes (pin names are translated)
  useEffect(() => {
    pins.forEach((pin) => {
      const m = markersRef.current[pin.id];
      if (m) m.setTooltipContent(pin.name);
    });
  }, [pins]);

  // Apply active styling on the marker corresponding to activeId
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const tip = m.getTooltip()?.getElement?.();
      if (id === activeId) {
        m.setStyle({ fillColor: "#8c6a3f", radius: 9 });
        tip?.classList.add("active");
        m.setLatLng(m.getLatLng()); // nudge tooltip reposition
        if (mapRef.current) mapRef.current.panTo(m.getLatLng(), { animate: true, duration: 0.6 });
      } else {
        m.setStyle({ fillColor: "#fff", radius: 6 });
        tip?.classList.remove("active");
      }
    });
  }, [activeId]);

  return <div className="lake-map" ref={containerRef} />;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePin, setActivePin] = useState<string>("bellagio");
  const heroImgRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLElement>(null);
  const t = translations[locale];
  const isRtl = rtlLocales.includes(locale);

  // Update <html lang> and dir
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [locale, isRtl]);

  // Nav scroll state + hero parallax. The map fly-in zoom is now driven by
  // Leaflet's flyToBounds / flyTo via an IntersectionObserver inside the
  // LakeComoMap component, so we no longer manage --map-zoom ourselves.
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

  // Reveal-on-scroll observer (after each render so dynamic locale content gets observed)
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

  return (
    <>
      <nav className={`top ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`} id="topnav">
        <a href="#top" className="logo">
          <span className="mark"></span>Como Boat Rental
        </a>
        <div className="links">
          <a href="#tours">{t.nav.tours}</a>
          <a href="#fleet">{t.nav.fleet}</a>
          <a href="#map">{t.nav.map}</a>
          <a href="#experiences">{t.nav.experiences}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="lang">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              className={l.code === locale ? "active" : ""}
              aria-label={`Switch to ${l.label}`}
            >
              {l.label}
            </button>
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

      {/* Mobile menu drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <a href="#tours" onClick={() => setMenuOpen(false)}>{t.nav.tours}</a>
          <a href="#fleet" onClick={() => setMenuOpen(false)}>{t.nav.fleet}</a>
          <a href="#map" onClick={() => setMenuOpen(false)}>{t.nav.map}</a>
          <a href="#experiences" onClick={() => setMenuOpen(false)}>{t.nav.experiences}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="scene">
          <div
            className="scene-img"
            ref={heroImgRef}
            style={{ backgroundImage: `url(${HERO_IMG})` }}
          />
          <div className="scene-overlay" />
          <div className="scene-grain" />
        </div>
        <div className="content">
          <div className="location reveal is-visible">
            <span className="line"></span>
            <span className="meta">{t.hero.location}</span>
          </div>
          <h1 className="display reveal is-visible">
            <RichText text={t.hero.title} />
          </h1>
          <p className="sub reveal is-visible reveal-delay-1">{t.hero.sub}</p>
          <div className="cta-row reveal is-visible reveal-delay-2">
            {/* Ghost CTA — browse the tours */}
            <a className="btn" href="#tours">
              {t.hero.ctaPrimary}
            </a>
            {/* Filled gold CTA — reserve a boat (jumps to contact) */}
            <a className="btn primary primary-gold" href="#contact">
              {t.hero.ctaReserve} <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>{t.hero.scroll}</span>
          <span className="bar"></span>
        </div>
        {/* Trust strip — small mono caps along the bottom of the hero,
            with a gold dot before each entry. Hidden on phones. */}
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
          <h2 className="reveal reveal-delay-1">
            <RichText text={t.intro.title} />
          </h2>
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
              <h3 className="display"><RichText text={t.tours.title} /></h3>
              <p>{t.tours.right}</p>
            </div>
          </div>

          <div className="tours-grid">
            {t.tours.items.map((tour, i) => (
              <article
                key={i}
                className={`tour-card reveal ${i % 2 === 1 ? "reveal-delay-1" : ""}`}
                onClick={() => { window.location.hash = "#contact"; }}
              >
                <div className="img-wrap">
                  <img src={TOUR_IMGS[i]} alt={tour.title.replace(/<[^>]+>/g, "")} loading="lazy" />
                  <div className="duration-tag">{tour.duration}</div>
                  <div className="price-tag">
                    <span className="from-label">{t.tours.factFrom}</span>
                    <b>{tour.price.replace(/^[^\d]*/, "").replace(/[^\d.,]/g, "").replace(/^/, "€")}</b>
                  </div>
                </div>
                <h4><RichText text={tour.title} /></h4>
                <p className="descr">{tour.desc}</p>
                {/* Itinerary stops as a flow with → arrows between them */}
                <div className="itinerary">
                  {tour.stops.map((s, k) => (
                    <span className="stop" key={k}>{s}</span>
                  ))}
                </div>
                {/* Three-cell meta row pinned to the bottom for easy scanning */}
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MAP — between Tours and Fleet, per v2 design.
          Sticky two-column layout: scrolling list on the left, sticky
          interactive Leaflet map on the right. The map fly-zooms to fit the
          itinerary when the section enters the viewport. */}
      <section className="map-section" id="map" ref={mapSectionRef}>
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div className="label">
              <span className="eyebrow">{t.map.indexLabel}</span>
              <p className="lead">{t.map.lead}</p>
            </div>
            <div className="title">
              <h3 className="display"><RichText text={t.map.title} /></h3>
              <p>{t.map.right}</p>
            </div>
          </div>

          <div className="map-wrap">
            <div className="map-side reveal">
              <p className="map-intro">{t.map.sideBody}</p>
              <div className="map-pin-list">
                {t.map.pins.map((pin, i) => (
                  <div
                    key={pin.id}
                    className={`pin-row ${pin.id === activePin ? "active" : ""}`}
                    onMouseEnter={() => setActivePin(pin.id)}
                    onClick={() => setActivePin(pin.id)}
                  >
                    <span className="pin-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pin-name">{pin.name}</span>
                    <span className="pin-meta">{pin.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="map-canvas reveal reveal-delay-1">
              <LakeComoMap
                pins={t.map.pins}
                activeId={activePin}
                onActivate={setActivePin}
                sectionRef={mapSectionRef}
              />
            </div>
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
              <h3 className="display"><RichText text={t.fleet.title} /></h3>
              <p>{t.fleet.right}</p>
            </div>
          </div>

          <div className="fleet-grid">
            {t.fleet.items.map((boat, i) => (
              <article key={i} className="boat-card reveal">
                <div className="boat-img">
                  <img src={FLEET_IMGS[i]} alt={boat.name.replace(/<[^>]+>/g, "")} loading="lazy" />
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
                    <span className="label">{locale === "en" ? "From" : locale === "it" ? "Da" : locale === "ru" ? "От" : "من"}</span>
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
              <h3 className="display"><RichText text={t.experiences.title} /></h3>
              <p>{t.experiences.right}</p>
            </div>
          </div>

          <div className="exp-row">
            {t.experiences.items.map((exp, i) => (
              <article key={i} className={`exp-card reveal ${i > 0 ? `reveal-delay-${i}` : ""}`}>
                <div className="num">{String(i + 1).padStart(2, "0")} /</div>
                <h4><RichText text={exp.title} /></h4>
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
              <h3 className="display"><RichText text={t.testimonials.title} /></h3>
              <p>{t.testimonials.right}</p>
            </div>
          </div>

          {/* Aggregate rating header — score, stars, period, link inline */}
          <div className="testi-rating reveal">
            <div className="testi-score">
              {t.testimonials.score}<span className="out">{t.testimonials.scoreOutOf}</span>
            </div>
            <div className="testi-stars">★ ★ ★ ★ ★</div>
            <div className="meta">
              {t.testimonials.reviewCount} · {t.testimonials.reviewPeriod} ·{" "}
              <a
                href="https://www.google.com/maps/place/Como+Boat+Rental/@45.8108,9.0908,17z"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.testimonials.reviewLink} →
              </a>
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

      {/* INSTAGRAM — static curated grid linking to the live profile.
          NOTE for the dev: this is intentionally NOT a live feed. To pull the
          real Instagram feed, drop in a Behold.so / LightWidget / Elfsight
          embed inside `.ig-grid` and remove the static tiles. See README. */}
      <section className="instagram" id="instagram">
        <div className="container-x">
          <div className="section-head reveal">
            <div className="label">
              <span className="eyebrow">{t.instagram.indexLabel}</span>
              <p className="lead">{t.instagram.lead}</p>
            </div>
            <div className="title">
              <h3 className="display"><RichText text={t.instagram.title} /></h3>
              <p>{t.instagram.right}</p>
            </div>
          </div>

          <div className="ig-grid reveal">
            {INSTAGRAM_TILES.map((src, i) => (
              <a
                key={i}
                className="ig-tile"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open @comoboatrental on Instagram (post ${i + 1})`}
              >
                <img src={src} alt="" loading="lazy" />
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

      {/* OUR BASE — Google Maps embed */}
      <section className="our-base" id="our-base">
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div className="label">
              <span className="eyebrow">{t.ourBase.indexLabel}</span>
              <p className="lead">{t.ourBase.countLabel}</p>
            </div>
            <div className="title">
              <h3 className="display"><RichText text={t.ourBase.title} /></h3>
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
          <img src={CONTACT_BG} alt="" />
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

          <h3 className="reveal reveal-delay-1"><RichText text={t.contact.title} /></h3>

          <div className="contact-grid reveal reveal-delay-1">
            <div className="col">
              <h5>{t.contact.phoneLabel}</h5>
              <a href={`tel:${PHONE_1_TEL}`}>{PHONE_1_DISP}</a>
              <a href={`tel:${PHONE_2_TEL}`}>{PHONE_2_DISP}</a>
            </div>
            <div className="col">
              <h5>{t.contact.emailLabel}</h5>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="col">
              <h5>{t.contact.headOfficeLabel}</h5>
              <p dangerouslySetInnerHTML={{ __html: t.contact.headOffice }} />
            </div>
            <div className="col">
              <h5>{t.contact.boatParkingLabel}</h5>
              <p dangerouslySetInnerHTML={{ __html: t.contact.boatParking }} />
            </div>
          </div>

          <div className="cta-block reveal">
            <a className="btn primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {t.contact.whatsapp} <span className="arrow">→</span>
            </a>
            <a
              className="btn"
              href={`mailto:${EMAIL}`}
              style={{ borderColor: "rgba(245,239,228,0.5)", color: "var(--cream)" }}
            >
              {t.contact.emailCta} <span className="arrow">→</span>
            </a>
            <a
              className="btn"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderColor: "rgba(245,239,228,0.5)", color: "var(--cream)" }}
            >
              {t.contact.instagramCta} <span className="arrow">→</span>
            </a>
          </div>

          <div className="footer-bottom">
            <span>{t.contact.rights}</span>
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
