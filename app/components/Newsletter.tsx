"use client";

// Small lead-capture band — single field ("your email") that opens a
// pre-filled mailto: requesting a sample Lake Como itinerary. The
// dev can swap the mailto: for Formspree / Mailchimp / Vercel
// serverless when the business wants real list-building.

import { useState } from "react";
import { EMAIL } from "../seo";
import type { Locale, Translation } from "../translations";
import { renderRich } from "./InnerPage";

export default function Newsletter({ t, locale }: { t: Translation; locale: Locale }) {
  const n = t.newsletter;
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string) || "";
    const body = `${n.bodyPrefix}\n\n${n.fieldEmail}: ${email}\n`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(n.subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };
  return (
    <section className="newsletter" id="newsletter">
      <div className="container-x">
        <div className="newsletter-inner">
          <div className="newsletter-copy">
            <h2 className="display">{renderRich(n.title)}</h2>
            <p>{n.subtitle}</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="nl-email" className="sr-only">{n.fieldEmail}</label>
            <input
              id="nl-email"
              name="email"
              type="email"
              required
              placeholder={n.placeholder}
              disabled={submitted}
            />
            <button type="submit" disabled={submitted}>
              {submitted ? `✓ ${n.sent}` : <>{n.cta} <span aria-hidden>→</span></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
