"use client";

// BoatGallery — small in-card photo carousel for the fleet section.
// Three things this widget does that the generic <ClientCarousel>
// doesn't:
//
//   1. Arrows and dot indicators are overlaid INSIDE the photo frame
//      (semi-transparent button on the left edge and right edge;
//      dots floating along the bottom centre). The site-wide carousel
//      puts these outside the frame; for the boat card we want the
//      visitor to immediately read "there's more inside this frame".
//
//   2. A persistent "peek" hint — a thin slice of the next photo
//      visible at the right edge of the frame, even when on the first
//      slide. This is the strongest possible affordance for "scroll
//      me horizontally".
//
//   3. Placeholder slots — boats currently have 1-3 real photos.
//      Loris will add more. Passing { src: null, label } renders a
//      muted slot saying "Photo coming from Loris" so the layout is
//      in place without faking content.

import { useEffect, useRef, useState } from "react";

export type BoatPhoto = {
  /** Image path under /public, or null for a placeholder slot */
  src: string | null;
  /** Alt text (real photo) or placeholder label (null src) */
  alt: string;
};

export function BoatGallery({
  photos,
  cornerLabel,
}: {
  photos: BoatPhoto[];
  /** Small overlay tag at top-left of the frame (e.g. "WATER LIMOUSINE") */
  cornerLabel?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(photos.length > 1);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      // Active = closest child to centre
      const centre = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < el.children.length; i++) {
        const card = el.children[i] as HTMLElement;
        const cardCentre = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(cardCentre - centre);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      setActive(bestIdx);
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
  }, [photos.length]);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };
  const goTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="boat-img boat-gallery">
      <div className="boat-gallery-track" ref={scrollerRef}>
        {photos.map((p, i) => (
          <div className="boat-gallery-slide" key={i}>
            {p.src ? (
              <img src={p.src} alt={p.alt} loading="lazy" width="1200" height="800" />
            ) : (
              <div className="boat-gallery-placeholder">
                <span className="ph-icon" aria-hidden>📷</span>
                <span className="ph-label">{p.alt}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {cornerLabel && <span className="badge">{cornerLabel}</span>}

      {/* Edge hints — thin diagonal-gradient overlays that fade the
          frame edges in/out depending on whether more content sits in
          that direction. Cue to the visitor: "the photo continues
          off-screen". */}
      <span className={`gallery-edge gallery-edge-left ${canLeft ? "visible" : ""}`} aria-hidden />
      <span className={`gallery-edge gallery-edge-right ${canRight ? "visible" : ""}`} aria-hidden />

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="gallery-arrow gallery-arrow-left"
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            aria-label="Previous photo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="gallery-arrow gallery-arrow-right"
            onClick={() => scroll(1)}
            disabled={!canRight}
            aria-label="Next photo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="gallery-dots" role="tablist" aria-label="Photo position">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className={`gallery-dot ${i === active ? "active" : ""}`}
                aria-label={`Show photo ${i + 1}`}
                aria-selected={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
