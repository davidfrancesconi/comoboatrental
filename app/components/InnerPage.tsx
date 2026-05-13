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
  // The "logo" on inner pages doubles as the back-to-home affordance.
  // We swap the decorative mark dot used on the homepage for an explicit
  // ← arrow so visitors immediately understand clicking the wordmark
  // takes them back to the homepage.
  const homeLabel =
    locale === "it" ? "Home" : locale === "ru" ? "Главная" : locale === "ar" ? "الرئيسية" : "Home";
  return (
    <nav
      className="top inner"
      id="topnav"
      style={{
        position: "sticky",
        top: 0,
        background: "var(--bg)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <a
        href={localePath(locale, "/")}
        className="logo back-link"
        aria-label={`${homeLabel} — Como Boat Rental`}
      >
        <span className="back-arrow" aria-hidden>←</span>
        <span className="wordmark">Como Boat Rental</span>
      </a>
      <div className="links">
        <a href={localePath(locale, "/")}>{homeLabel}</a>
        <a href={`${localePath(locale, "/")}#tours`}>{t.nav.tours}</a>
        <a href={`${localePath(locale, "/")}#map`}>{t.nav.attractions}</a>
        <a href={localePath(locale, "/about")}>{t.nav.about}</a>
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

// Breadcrumb trail — visual companion to the BreadcrumbList JSON-LD
// already emitted on each inner page. Provides a clear visual path
// back through the hierarchy: Home › Attractions › Bellagio.
//
// Sits just under the nav at the top of each inner page so the visitor
// always knows where they are and can step back one or two levels
// without searching for a "back" button.
export function Breadcrumbs({
  locale,
  trail,
}: {
  locale: Locale;
  /** Ordered path. The first crumb is typically the locale homepage; the
   * last crumb is the current page (rendered as text, not a link). */
  trail: { label: string; href?: string }[];
}) {
  const homeLabel =
    locale === "it" ? "Home" : locale === "ru" ? "Главная" : locale === "ar" ? "الرئيسية" : "Home";
  // Always start with Home as the first crumb if the caller didn't add it.
  const full =
    trail[0]?.href === localePath(locale, "/")
      ? trail
      : [{ label: homeLabel, href: localePath(locale, "/") }, ...trail];
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {full.map((c, i) => {
          const isLast = i === full.length - 1;
          return (
            <li key={i}>
              {c.href && !isLast ? (
                <a href={c.href}>{c.label}</a>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
              {!isLast && <span className="sep" aria-hidden>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Prominent "Back to home" affordance for the bottom of inner pages —
// a clearly-clickable button-style link with an arrow, sized so visitors
// can't mistake it for decoration. Replaces the previous tiny dot/text
// at the end of detail pages.
export function BackToHome({ locale }: { locale: Locale }) {
  const label =
    locale === "it" ? "Torna alla home" :
    locale === "ru" ? "Вернуться на главную" :
    locale === "ar" ? "العودة إلى الرئيسية" :
    "Back to home";
  return (
    <div className="back-to-home-wrap">
      <a href={localePath(locale, "/")} className="back-to-home" aria-label={label}>
        <span className="arrow" aria-hidden>←</span>
        <span className="label">{label}</span>
      </a>
    </div>
  );
}

// Standard wrapper used by all inner pages.
export function InnerPageShell({
  locale,
  children,
  breadcrumbs,
}: {
  locale: Locale;
  children: React.ReactNode;
  /** Optional breadcrumb trail rendered right under the nav. If omitted,
   * no breadcrumbs are shown (use it on pages where the hero IS the
   * primary location indicator, e.g. /attractions index). */
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <>
      <InnerPageNav locale={locale} />
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs locale={locale} trail={breadcrumbs} />
      )}
      <main className="inner-main" style={{ minHeight: "60vh" }}>
        {children}
      </main>
      <BackToHome locale={locale} />
      <InnerPageFooter locale={locale} />
    </>
  );
}
