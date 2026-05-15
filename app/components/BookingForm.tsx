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
} from "../seo";
import type { Locale, Translation } from "../translations";
import { renderRich } from "./InnerPage";

// Four tour radio options shown in the booking form — span the 1h /
// 3h / 4h / 8h ladder so the typical buyer sees their commitment
// tier without scrolling past every SKU. Indices map to positions in
// translations.ts t.tours.items (8 entries: 0=1h, 1=2h, 2=3h, 3=4h,
// 4=5h, 5=6h, 6=8h, 7=sunset).
const TOUR_KEYS: Array<{ slug: string; index: number }> = [
  { slug: "highlights-1h",       index: 0 },  // 1-hour
  { slug: "balbianello-nesso",   index: 2 },  // 3-hour
  { slug: "top-villas-half-day", index: 3 },  // 4-hour
  { slug: "full-day-8h",         index: 6 },  // 8-hour
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

            {/* Action row — submit stands alone on the left; WhatsApp +
                "we reply within the hour" sit together on the right so
                the reply note visually anchors against the green CTA. */}
            <div className="bform-actions span-2">
              <button type="submit" className="btn-submit">
                {submitted ? `✓ ${b.requestSent}` : <>{b.submitCta} <span className="arr">→</span></>}
              </button>
              <div className="bform-whatsapp-group">
                <a href={WHATSAPP_URL} className="btn-whatsapp" target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp · ${b.orWhatsApp}`}>
                  {/* Official WhatsApp glyph rendered in the brand green
                      so the secondary CTA reads as a channel switch. */}
                  <svg className="wa-logo" viewBox="0 0 32 32" aria-hidden xmlns="http://www.w3.org/2000/svg">
                    <path fill="#25D366" d="M16.001 0C7.165 0 .003 7.162.003 15.998a15.93 15.93 0 0 0 2.137 7.997L0 32l8.21-2.151a15.953 15.953 0 0 0 7.79 2.015h.001C24.836 31.864 32 24.7 32 15.864 32 7.028 24.836 0 16.001 0Z"/>
                    <path fill="#FFF" d="M23.472 19.518c-.39-.195-2.31-1.139-2.67-1.27-.358-.131-.62-.196-.88.196-.26.39-1.008 1.269-1.236 1.529-.227.26-.456.293-.846.098-.39-.195-1.65-.608-3.144-1.94-1.162-1.036-1.948-2.317-2.176-2.707-.228-.39-.024-.6.17-.795.176-.175.39-.456.585-.684.196-.228.26-.39.39-.65.13-.26.066-.488-.032-.683-.098-.195-.88-2.117-1.205-2.897-.317-.762-.64-.66-.88-.672-.227-.012-.487-.014-.747-.014-.26 0-.683.098-1.041.488-.358.39-1.366 1.334-1.366 3.256 0 1.922 1.398 3.779 1.594 4.039.195.26 2.753 4.203 6.671 5.895.932.402 1.659.642 2.225.821.935.298 1.785.256 2.458.156.75-.112 2.31-.944 2.635-1.855.325-.911.325-1.692.228-1.855-.098-.163-.358-.26-.748-.456Z"/>
                  </svg>
                  <span>{b.orWhatsApp}</span>
                </a>
                <span className="bform-reply">
                  <span className="dot" />
                  {b.replySoon}
                </span>
              </div>
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

          </aside>
        </div>
      </div>
    </section>
  );
}
