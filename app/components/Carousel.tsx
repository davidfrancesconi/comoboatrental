"use client";

// Shared horizontal-carousel widgets — ScrollArrows + CarouselDots.
// Lifted out of HomePage.tsx so server-rendered pages (attraction
// detail, /experiences/[slug], etc.) can wrap their `.tours-grid`
// (or any horizontally-scrollable strip) with the same affordances
// as the homepage carousels: arrows on the sides + dot indicators
// underneath + a peek of the adjacent card.

import { useEffect, useRef, useState } from "react";

/**
 * Left/right arrows that scroll a horizontal carousel by ~80% of its
 * visible width. The arrows auto-disable themselves when there's no
 * more content to scroll to in that direction.
 */
export function ScrollArrows({
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

/**
 * Dot indicators under a horizontal scroller. Tracks which card is
 * currently closest to the viewport centre via a scroll listener and
 * lets the user jump to any card by clicking the matching dot.
 *
 * When `autoAdvanceMobile` is true and the viewport is ≤720px, the
 * carousel auto-advances one card every 2 seconds. Any user
 * interaction (touchstart, mousedown, wheel) pauses the auto-advance
 * for 5 seconds so it doesn't fight the visitor.
 */
export function CarouselDots({
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

  useEffect(() => {
    if (!autoAdvanceMobile) return;
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 720px)");
    let intervalId: number | undefined;
    const tick = () => {
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

/**
 * Wrapper for a horizontal scroller that lives inside a server
 * component (attraction detail, experience detail). Owns the
 * scroller ref so it can attach ScrollArrows + CarouselDots without
 * needing the parent server page to thread refs around.
 *
 * Render the cards as children — the wrapper paints the
 * `.scroller-frame` shell, the `.tours-grid`-styled scroller, the
 * left/right arrows and the dot indicators underneath.
 */
export function ClientCarousel({
  children,
  count,
  label,
  className = "tours-grid",
}: {
  children: React.ReactNode;
  count: number;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="scroller-frame">
      <div ref={ref} className={className}>
        {children}
      </div>
      <ScrollArrows scrollerRef={ref} label={label} />
      <CarouselDots scrollerRef={ref} count={count} />
    </div>
  );
}
