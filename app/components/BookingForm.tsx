"use client";

// Inline booking-request form, replacing the old static contact section.
// Ported from the Claude Design `Booking Form.html` mock (dark "ink"
// background, ivory text, gold accents). The mock uses the same v2
// design tokens already in globals.css, so the styling lifted directly.
//
// Submit behaviour: we build a pre-filled mailto: URL with every field
// concatenated in the body and the visitor's email client opens with
// the message ready to send. No backend, no third-party form service,
// no PII leaving the visitor's machine until they hit Send. The dev
// can later swap the mailto handler for a Formspree POST or a Vercel
// serverless function — see docs/HANDOFF.md.

import { useRef, useState } from "react";
import {
  EMAIL,
  PHONE_DISPLAY_PRIMARY,
  PHONE_TEL_PRIMARY,
  WHATSAPP_URL,
  ADDRESS_STREET,
  ADDRESS_LOCALITY,
  RATING_VALUE,
  RATING_COUNT,
  RATING_PERIOD,
} from "../seo";
import type { Locale, Translation } from "../translations";
import { renderRich } from "./InnerPage";

// 4 tour slugs + their display name + price come from translations so
// they stay in sync with the homepage tour grid.
const TOUR_KEYS: Array<{ slug: string; index: 0 | 1 | 2 | 3 }> = [
  { slug: "highlights-1h", index: 0 },
  { slug: "balbianello-nesso", index: 1 },
  { slug: "top-villas-half-day", index: 2 },
  { slug: "bespoke-full-day", index: 3 },
];

export default function BookingForm({ t, locale }: { t: Translation; locale: Locale }) {
  const b = t.bookingForm;
  const [party, setParty] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const stepParty = (delta: number) => {
    setParty((p) => Math.max(2, Math.min(10, p + delta)));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const tourIdx = parseInt((data.get("tour") as string) ?? "1", 10);
    const tourName = t.tours.items[tourIdx]?.title.replace(/<[^>]+>/g, "") ?? "Unspecified";
    const tourPrice = t.tours.items[tourIdx]?.price ?? "";
    // Compose the mailto body in a readable email layout
    const body = [
      `${b.fieldDate}: ${data.get("date") || "—"}`,
      `${b.fieldTime}: ${data.get("time") || "—"}`,
      `${b.fieldTour}: ${tourName} (${tourPrice})`,
      `${b.fieldParty}: ${party}`,
      `${b.fieldPickup}: ${data.get("pickup") || "—"}`,
      `${b.fieldName}: ${data.get("name") || "—"}`,
      `${b.fieldEmail}: ${data.get("email") || "—"}`,
      "",
      `${b.fieldMessage}:`,
      (data.get("message") as string) || "—",
    ].join("\n");
    const subject = `${b.emailSubject} — ${tourName}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    // Optimistic UI — show "request sent" state after the mailto opens
    setSubmitted(true);
  };

  return (
    <section className="booking" id="contact">
      <div className="booking-inner">
        <div className="booking-head">
          <div className="label">
            <span className="ix">{b.indexLabel}</span>
            <p>{b.lead}</p>
          </div>
          <div className="title">
            <h2><span className="display">{renderRich(b.title)}</span></h2>
            <p>{b.subtitle}</p>
          </div>
        </div>

        <div className="booking-body">
          {/* ─── Form ─── */}
          <form className="bform" ref={formRef} onSubmit={handleSubmit} noValidate={false}>
            <div className="field">
              <label htmlFor="b-date">
                {b.fieldDate} <span className="req">*</span>
              </label>
              <input id="b-date" name="date" type="date" required min={new Date().toISOString().slice(0, 10)} />
            </div>

            <div className="field">
              <label htmlFor="b-time">{b.fieldTime}</label>
              <select id="b-time" name="time" defaultValue="sunset">
                <option value="morning">{b.timeMorning}</option>
                <option value="afternoon">{b.timeAfternoon}</option>
                <option value="sunset">{b.timeSunset}</option>
                <option value="full">{b.timeFull}</option>
                <option value="undecided">{b.timeUndecided}</option>
              </select>
            </div>

            <div className="field span-2">
              <label>
                {b.fieldTour} <span className="req">*</span>
              </label>
              <div className="tour-radio">
                {TOUR_KEYS.map((tk, i) => {
                  const tour = t.tours.items[tk.index];
                  const title = tour.title.replace(/<[^>]+>/g, "");
                  // Squeeze "from €220" out of price strings
                  return (
                    <div key={tk.slug}>
                      <input
                        type="radio"
                        id={`tour-${i}`}
                        name="tour"
                        value={i}
                        defaultChecked={i === 1}
                      />
                      <label htmlFor={`tour-${i}`}>
                        {title}
                        <small>{tour.duration} · {tour.price}</small>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="field">
              <label>
                {b.fieldParty} <span className="req">*</span>
              </label>
              <div>
                <span className="stepper">
                  <button type="button" onClick={() => stepParty(-1)} aria-label={b.partyFewer}>−</button>
                  <span className="val">{party}</span>
                  <button type="button" onClick={() => stepParty(1)} aria-label={b.partyMore}>+</button>
                </span>
                <span className="stepper-hint">{b.partyHint}</span>
              </div>
            </div>

            <div className="field">
              <label htmlFor="b-pickup">{b.fieldPickup}</label>
              <select id="b-pickup" name="pickup" defaultValue="como">
                <option value="como">{b.pickupComo}</option>
                <option value="villa-d-este">{b.pickupVillaDEste}</option>
                <option value="bellagio">{b.pickupBellagio}</option>
                <option value="hotel">{b.pickupHotel}</option>
                <option value="other">{b.pickupOther}</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="b-name">
                {b.fieldName} <span className="req">*</span>
              </label>
              <input id="b-name" name="name" type="text" required placeholder={b.namePlaceholder} />
            </div>

            <div className="field">
              <label htmlFor="b-email">
                {b.fieldEmail} <span className="req">*</span>
              </label>
              <input id="b-email" name="email" type="email" required placeholder="you@example.com" />
            </div>

            <div className="field span-2">
              <label htmlFor="b-msg">
                {b.fieldMessage} <span style={{ opacity: 0.5 }}>({b.optional})</span>
              </label>
              <textarea id="b-msg" name="message" placeholder={b.messagePlaceholder} />
            </div>

            <div className="bform-actions span-2">
              <button type="submit" className="btn-submit">
                {submitted ? `✓ ${b.requestSent}` : <>{b.submitCta} <span className="arr">→</span></>}
              </button>
              <a href={WHATSAPP_URL} className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 32 32" aria-hidden>
                  <path d="M16 3C8.8 3 3 8.8 3 16c0 2.5.7 4.9 2 7L3 29l6.2-1.9c2 1.1 4.4 1.7 6.8 1.7 7.2 0 13-5.8 13-13S23.2 3 16 3zm6 18.4c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.6-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.2-.7.2-.2.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 3.4 1.4 3.4.9 4 .9.6 0 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5z" />
                </svg>
                {b.orWhatsApp}
              </a>
              <span className="bform-reply">
                <span className="dot" />
                {b.replySoon}
              </span>
            </div>
          </form>

          {/* ─── Sidebar ─── */}
          <aside className="bside">
            <div className="bside-block">
              <h4>{b.sidePhoneLabel}</h4>
              <div className="v">
                <a href={`tel:${PHONE_TEL_PRIMARY}`}>{PHONE_DISPLAY_PRIMARY}</a>
              </div>
              <small>{b.sidePhoneNote}</small>
            </div>

            <div className="bside-block">
              <h4>{b.sideEmailLabel}</h4>
              <div className="v">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
              <small>{b.sideEmailNote}</small>
            </div>

            <div className="bside-block">
              <h4>{b.sideAddressLabel}</h4>
              <div className="v">
                {ADDRESS_STREET} · {ADDRESS_LOCALITY}
              </div>
              <small>{b.sideAddressNote}</small>
              {/* Embedded Google Maps showing the pontoon — merged from the
                  former "Our Base" section so visitors see the location
                  inline with the booking flow. */}
              <div className="bside-map">
                <iframe
                  title="Como Boat Rental — Lungolago Viale Geno"
                  src="https://www.google.com/maps?q=Como+Boat+Rental,+Lungolago+Viale+Geno,+22100+Como+CO&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  className="bside-directions"
                  href="https://www.google.com/maps/dir/?api=1&destination=Como+Boat+Rental,+Lungolago+Viale+Geno,+22100+Como+CO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {b.directionsCta} →
                </a>
              </div>
            </div>

            <div className="trust">
              <div className="item">
                <span className="gold">{RATING_VALUE}</span>
                <span>
                  ★ {b.trustGoogleReviews}
                  <small>
                    {RATING_COUNT} {b.trustReviewsGuests} · {RATING_PERIOD}
                  </small>
                </span>
              </div>
              <div className="item">
                <span className="gold">€5M</span>
                <span>
                  {b.trustInsuredLabel}
                  <small>{b.trustInsuredNote}</small>
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
