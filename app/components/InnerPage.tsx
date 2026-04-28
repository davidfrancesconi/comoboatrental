// Shared shell for inner-page templates (tour, destination, FAQ,
// reviews, blog post). Keeps the site's nav + footer consistent
// without re-implementing the homepage's full client behaviour.
//
// Server-component-friendly — receives all locale-specific copy as
// props and renders pure HTML.

import { translations, locales, type Locale } from "../translations";
import { localePath, EMAIL, WHATSAPP_URL, INSTAGRAM_URL } from "../seo";
import { PHONE_DISPLAY_PRIMARY, PHONE_TEL_PRIMARY } from "../seo";

// Render <em>...</em> markup as italic accents inside text content.
export function renderRich(text: string): React.ReactNode[] {
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
  return parts;
}

export function InnerPageNav({ locale }: { locale: Locale }) {
  const t = translations[locale];
  return (
    <nav className="top inner" id="topnav" style={{ position: "sticky", top: 0, background: "var(--bg)", borderBottom: "1px solid var(--rule)" }}>
      <a href={localePath(locale, "/")} className="logo">
        <span className="mark"></span>Como Boat Rental
      </a>
      <div className="links">
        <a href={localePath(locale, "/")}>{t.nav.tours.toLowerCase() === "tours" ? "Home" : t.nav.tours === "Tour" ? "Home" : "Home"}</a>
        <a href={`${localePath(locale, "/")}#tours`}>{t.nav.tours}</a>
        <a href={`${localePath(locale, "/")}#fleet`}>{t.nav.fleet}</a>
        <a href={`${localePath(locale, "/")}#contact`}>{t.nav.contact}</a>
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
    </nav>
  );
}

export function InnerPageFooter({ locale }: { locale: Locale }) {
  const t = translations[locale];
  return (
    <footer
      className="inner-footer"
      style={{
        background: "var(--ink)",
        color: "var(--bg)",
        padding: "60px 32px",
        marginTop: 80,
      }}
    >
      <div className="container-x" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 28, marginBottom: 8 }}>Como Boat Rental</div>
            <p style={{ opacity: 0.75, maxWidth: 360, fontSize: 14 }}>{t.intro.body.slice(0, 200)}…</p>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a className="btn primary primary-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {t.contact.whatsapp} <span className="arrow">→</span>
            </a>
            <a className="btn ghost" href={`mailto:${EMAIL}`} style={{ borderColor: "rgba(245,239,228,0.5)", color: "var(--bg)" }}>
              {t.contact.emailCta} <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(245,239,228,0.18)",
          paddingTop: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 12,
          opacity: 0.7,
          fontFamily: "var(--mono)",
          letterSpacing: "0.08em",
        }}>
          <span>{t.contact.rights}</span>
          <span style={{ marginLeft: "auto" }}>
            <a href={`tel:${PHONE_TEL_PRIMARY}`} style={{ color: "var(--bg)", marginRight: 16 }}>{PHONE_DISPLAY_PRIMARY}</a>
            <a href={`mailto:${EMAIL}`} style={{ color: "var(--bg)", marginRight: 16 }}>{EMAIL}</a>
            <a href={INSTAGRAM_URL} style={{ color: "var(--bg)" }}>Instagram</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// Standard wrapper used by all inner pages.
export function InnerPageShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <>
      <InnerPageNav locale={locale} />
      <main className="inner-main" style={{ minHeight: "60vh" }}>
        {children}
      </main>
      <InnerPageFooter locale={locale} />
    </>
  );
}
