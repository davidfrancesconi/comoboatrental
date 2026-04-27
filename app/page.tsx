"use client";

import { useEffect, useRef, useState } from "react";
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

// === Lake Como map — real OSM background + pin overlay ===
type Pin = { id: string; name: string; note: string; type: string; lat: number; lng: number };

// Bounding box of /public/images/lake-como-map.jpg.
// Composed from CartoDB Positron zoom-12 tiles (clean, no ferry routes), cropped to
// the tour area, then recoloured pixel-by-pixel to a 2-tone editorial palette
// (navy land + cream water). Lat is non-linear in Web Mercator, so we convert
// lat → mercator y for accurate pin placement.
const MAP_BBOX = { north: 46.1123, south: 45.7713, west: 9.0105, east: 9.3109 };

function latToMercY(lat: number) {
  const rad = (lat * Math.PI) / 180;
  return Math.log(Math.tan(rad) + 1 / Math.cos(rad));
}
const Y_TOP = latToMercY(MAP_BBOX.north);
const Y_BOT = latToMercY(MAP_BBOX.south);

function pinPos(lat: number, lng: number) {
  const xPct = ((lng - MAP_BBOX.west) / (MAP_BBOX.east - MAP_BBOX.west)) * 100;
  const yPct = ((Y_TOP - latToMercY(lat)) / (Y_TOP - Y_BOT)) * 100;
  return { left: `${xPct}%`, top: `${yPct}%` };
}

function LakeComoMap({ pins, activeId, onActivate }: {
  pins: Pin[];
  activeId: string;
  onActivate: (id: string) => void;
}) {
  return (
    <div className="lake-zoom">
      {/* Background: real OSM-derived map of Lake Como */}
      <img
        src="/images/lake-como-map.jpg"
        alt="Lake Como map"
        className="lake-bg"
        draggable={false}
      />
      {/* Tint overlay to match editorial palette */}
      <div className="lake-tint" />

      {/* Route line — SVG positioned absolutely on top of the image */}
      <svg
        className="lake-route"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <polyline
          points={pins
            .map((p) => {
              const xPct = ((p.lng - MAP_BBOX.west) / (MAP_BBOX.east - MAP_BBOX.west)) * 100;
              const yPct = ((Y_TOP - latToMercY(p.lat)) / (Y_TOP - Y_BOT)) * 100;
              return `${xPct},${yPct}`;
            })
            .join(" ")}
          fill="none"
          stroke="#c9a36a"
          strokeWidth="0.4"
          strokeDasharray="0.8 1.2"
          opacity="0.85"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Pins overlay */}
      <div className="lake-pins">
        {pins.map((pin) => {
          const pos = pinPos(pin.lat, pin.lng);
          const isActive = pin.id === activeId;
          // Place the label on the side of the pin that has more room
          // — east-half pins get labels to their LEFT, west-half pins
          // get labels to their RIGHT, so labels never extend past the
          // map's edge.
          const labelLeft = pin.lng > (MAP_BBOX.west + MAP_BBOX.east) / 2;
          return (
            <button
              key={pin.id}
              type="button"
              className={`lake-pin lake-pin-${pin.type} ${isActive ? "active" : ""} ${labelLeft ? "label-left" : "label-right"}`}
              style={pos}
              onMouseEnter={() => onActivate(pin.id)}
              onFocus={() => onActivate(pin.id)}
              onClick={() => onActivate(pin.id)}
              aria-label={pin.name}
            >
              <span className="halo" />
              <span className="dot" />
              <span className="name">{pin.name}</span>
            </button>
          );
        })}
      </div>

      {/* Compass — simple, decorative */}
      <div className="lake-compass" aria-hidden>
        <span className="compass-label">N</span>
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#0a1218" strokeOpacity="0.4" strokeWidth="0.7" />
          <path d="M 20 6 L 24 24 L 20 20 L 16 24 Z" fill="#c9a36a" />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePin, setActivePin] = useState<string>("bellagio");
  const heroImgRef = useRef<HTMLDivElement>(null);
  const t = translations[locale];
  const isRtl = rtlLocales.includes(locale);

  // Update <html lang> and dir
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [locale, isRtl]);

  // Nav scroll state + hero parallax + map fly-in zoom on scroll.
  useEffect(() => {
    const mapCanvas = document.querySelector(".map-canvas") as HTMLElement | null;

    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Hero parallax
      const y = window.scrollY;
      if (heroImgRef.current && y < window.innerHeight) {
        heroImgRef.current.style.transform = `translateY(${y * 0.18}px) scale(${1.05 + y * 0.0001})`;
      }

      // Map fly-in zoom — peak when the section's centre crosses the
      // viewport centre. Linear distance from centre maps 1:1 to the
      // amount of zoom applied.
      if (mapCanvas) {
        const rect = mapCanvas.getBoundingClientRect();
        const vh = window.innerHeight;
        const centerOffset =
          (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
        const proximity = 1 - Math.min(1, Math.abs(centerOffset));
        // Scale 1.00 (far away) → 1.45 (centred). Easing curve: smooth-step.
        const eased = proximity * proximity * (3 - 2 * proximity);
        const scale = 1 + 0.45 * eased;
        mapCanvas.style.setProperty("--map-zoom", scale.toFixed(3));
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
            <a className="btn primary" href="#tours">
              {t.hero.ctaPrimary} <span className="arrow">→</span>
            </a>
            <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {t.hero.ctaWhatsapp}
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>{t.hero.scroll}</span>
          <span className="bar"></span>
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
            <div>
              <div className="index">
                <span>{t.tours.indexLabel}</span>
                <span>{t.tours.countLabel}</span>
              </div>
              <h3 className="display"><RichText text={t.tours.title} /></h3>
            </div>
            <div className="right">{t.tours.right}</div>
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
                  <div className="number">N°{String(i + 1).padStart(2, "0")}</div>
                </div>
                <div className="title-row">
                  <h4><RichText text={tour.title} /></h4>
                  <div className="price">{tour.price}</div>
                </div>
                <p className="descr">{tour.desc}</p>
                <div className="facts">
                  <div className="fact">
                    <span className="lbl">{t.tours.factDuration}</span>
                    <span className="val">{tour.duration}</span>
                  </div>
                  <div className="fact fact-multiline">
                    <span className="lbl">{t.tours.factStops}</span>
                    <span className="val">
                      {tour.stops.map((s, k) => <span key={k} className="line">{s}</span>)}
                    </span>
                  </div>
                  <div className="fact">
                    <span className="lbl">{t.tours.factIdeal}</span>
                    <span className="val">{tour.meta}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="fleet" id="fleet">
        <div className="container-x">
          <div className="section-head reveal">
            <div>
              <div className="index">
                <span style={{ color: "rgba(245,239,228,0.4)" }}>{t.fleet.indexLabel}</span>
                <span>{t.fleet.countLabel}</span>
              </div>
              <h3 className="display"><RichText text={t.fleet.title} /></h3>
            </div>
            <div className="right">{t.fleet.right}</div>
          </div>

          {t.fleet.items.map((boat, i) => (
            <div key={i} className="fleet-item reveal" style={i === t.fleet.items.length - 1 ? { marginBottom: 0 } : undefined}>
              <div className="img-block">
                <img src={FLEET_IMGS[i]} alt={boat.name.replace(/<[^>]+>/g, "")} loading="lazy" />
                <div className="corner-label">{boat.cornerLabel}</div>
              </div>
              <div className="text-block">
                <div className="meta" style={{ color: "rgba(245,239,228,0.5)", marginBottom: 16 }}>{boat.origin}</div>
                <h4><RichText text={boat.name} /></h4>
                <p className="descr">{boat.desc}</p>
                <div className="specs">
                  {boat.specs.map((spec, k) => (
                    <div key={k}>
                      <div className="spec-label">{spec.label}</div>
                      <div className="spec-value">{spec.value}</div>
                    </div>
                  ))}
                </div>
                <div className="price-row">
                  <div className="price"><small>{locale === "en" ? "From" : locale === "it" ? "Da" : locale === "ru" ? "От" : "من"}</small>{boat.price}</div>
                  <a className="btn" href="#contact" style={{ borderColor: "rgba(245,239,228,0.5)", color: "var(--cream)" }}>
                    {t.fleet.inquireCta} <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="map-section" id="map">
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div>
              <div className="index">
                <span>{t.map.indexLabel}</span>
                <span>{t.map.countLabel}</span>
              </div>
              <h3 className="display"><RichText text={t.map.title} /></h3>
            </div>
            <div className="right">{t.map.right}</div>
          </div>

          <div className="map-wrap">
            <div className="map-side reveal">
              <h3 className="display"><RichText text={t.map.sideTitle} /></h3>
              <p>{t.map.sideBody}</p>
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
              <div className="top-meta">
                <span>Lago di Como</span>
                <span>1:120,000</span>
              </div>
              <LakeComoMap
                pins={t.map.pins}
                activeId={activePin}
                onActivate={setActivePin}
              />
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="experiences" id="experiences">
        <div className="container-x">
          <div className="section-head reveal">
            <div>
              <div className="index">
                <span style={{ color: "rgba(245,239,228,0.4)" }}>{t.experiences.indexLabel}</span>
                <span>{t.experiences.countLabel}</span>
              </div>
              <h3 className="display"><RichText text={t.experiences.title} /></h3>
            </div>
            <div className="right">{t.experiences.right}</div>
          </div>

          <div className="exp-grid">
            {t.experiences.items.map((exp, i) => (
              <article key={i} className={`exp-card reveal ${i > 0 ? `reveal-delay-${i}` : ""}`}>
                <div className="num">N°{String(i + 1).padStart(2, "0")}</div>
                <h4><RichText text={exp.title} /></h4>
                <p>{exp.desc}</p>
                <div className="img-strip">
                  <img src={EXP_IMGS[i]} alt="" loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div>
              <div className="index">
                <span>{t.testimonials.indexLabel}</span>
                <span>{t.testimonials.countLabel}</span>
              </div>
              <h3 className="display"><RichText text={t.testimonials.title} /></h3>
            </div>
            <div className="right">{t.testimonials.right}</div>
          </div>

          <div className="test-grid">
            {t.testimonials.items.map((rev, i) => (
              <article key={i} className={`test-card reveal ${i > 0 ? `reveal-delay-${i}` : ""}`}>
                <div className="stars">★ ★ ★ ★ ★</div>
                <p className="quote">{rev.quote}</p>
                <div className="author">{rev.author}</div>
                <div className="test-meta">{rev.date}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR BASE — Google Maps embed */}
      <section className="our-base" id="our-base">
        <div className="container-x">
          <div className="section-head reveal" style={{ marginBottom: 60 }}>
            <div>
              <div className="index">
                <span>{t.ourBase.indexLabel}</span>
                <span>{t.ourBase.countLabel}</span>
              </div>
              <h3 className="display"><RichText text={t.ourBase.title} /></h3>
            </div>
            <div className="right">{t.ourBase.body}</div>
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
              }}
            >
              <span>{t.contact.indexLabel}</span>
              <span>{t.contact.hoursLabel}</span>
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
