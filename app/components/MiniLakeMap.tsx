// MiniLakeMap — a tiny stylised SVG of Lake Como (Y-shape, two arms)
// with all 14 attraction pins, one of which is highlighted as "active"
// and gets a gold halo + label tag. Used in the sticky sidebar of each
// attraction detail page to anchor "where on the lake" for the visitor.
//
// Lifted verbatim from the Claude Design `Attraction Subpage.html` mock
// (SVG path data and pin coordinates). The pin coordinate space is
// 600 × 750; we position pins as percentages so the map scales
// responsively. Static SVG — no Leaflet, no JS animation, lightweight
// enough to inline on every attraction page (~6KB).

import type { CSSProperties } from "react";

type PinPos = { id: string; x: number; y: number; label?: string };

// SVG viewBox coordinates for each PIN_BASE id. Hand-positioned to
// approximate the real lake geometry — south-west arm runs from bottom
// of the SVG up to the centre split, then west and east arms diverge.
const MAP_PINS: Record<string, PinPos> = {
  como:           { id: "como",            x:  96, y: 672 },
  blevio_torno:   { id: "blevio_torno",    x: 135, y: 598 },
  cernobbio:      { id: "cernobbio",       x: 105, y: 575 },
  oleandra:       { id: "oleandra",        x: 141, y: 517 },
  nesso:          { id: "nesso",           x: 188, y: 455 },
  argegno:        { id: "argegno",         x: 220, y: 365 },
  isola_comacina: { id: "isola_comacina",  x: 291, y: 245 },
  balbianello:    { id: "balbianello",     x: 330, y: 235 },
  cassinella:     { id: "cassinella",      x: 368, y: 222 },
  carlotta:       { id: "carlotta",        x: 418, y: 202 },
  menaggio:       { id: "menaggio",        x: 455, y: 188 },
  bellagio:       { id: "bellagio",        x: 478, y: 218 },
  varenna:        { id: "varenna",         x: 515, y: 130 },
  lecco:          { id: "lecco",           x: 540, y: 720 },
};

const VBW = 600;
const VBH = 750;

export function MiniLakeMap({
  activePinId,
  activeLabel,
  statsHeadline,
  statsSub,
}: {
  /** Which pin to highlight (matches a PIN_BASE id) */
  activePinId: string;
  /** Label string shown beside the active pin */
  activeLabel: string;
  /** Big mono caps line in the bottom-right corner — e.g. "22 km" */
  statsHeadline: string;
  /** Mono caps sub-line — e.g. "~25 min by boat from Como" */
  statsSub: string;
}) {
  return (
    <div className="minimap" aria-hidden>
      <span className="label">Lago di Como</span>

      <svg viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="xMidYMid meet">
        {/* Faint contour hatching */}
        <g opacity="0.14" stroke="#7a6a52" strokeWidth="0.4" fill="none">
          <path d="M 30 130 Q 90 118 150 134" />
          <path d="M 28 200 Q 88 188 148 204" />
          <path d="M 26 280 Q 86 268 146 284" />
          <path d="M 40 380 Q 100 372 160 388" />
          <path d="M 60 480 Q 116 472 172 486" />
          <path d="M 80 600 Q 128 594 176 608" />
          <path d="M 290 130 Q 350 118 410 130" />
          <path d="M 280 210 Q 345 200 410 210" />
          <path d="M 330 410 Q 380 402 430 416" />
          <path d="M 410 610 Q 442 604 474 618" />
          <path d="M 575 230 Q 555 230 540 244" />
          <path d="M 580 110 Q 555 108 530 120" />
        </g>

        {/* Lake — Y-shape (Como arm + Lecco arm + Alto Lario) */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="rgba(20, 50, 70, 0.7)">
            <path d="M 92 690 Q 110 600 145 510 Q 175 420 215 340 Q 255 280 320 255 Q 380 235 440 220 Q 470 215 480 215" strokeWidth="60" />
            <path d="M 470 230 Q 510 130 540 60 L 558 0" strokeWidth="48" />
            <path d="M 478 270 Q 495 380 510 490 Q 525 600 538 745" strokeWidth="42" />
            <path d="M 320 250 Q 380 235 440 220 Q 470 215 480 220" strokeWidth="80" />
          </g>
          <g stroke="rgba(70, 105, 125, 0.55)">
            <path d="M 92 690 Q 110 600 145 510 Q 175 420 215 340 Q 255 280 320 255 Q 380 235 440 220 Q 470 215 480 215" strokeWidth="57" />
            <path d="M 470 230 Q 510 130 540 60 L 558 0" strokeWidth="45" />
            <path d="M 478 270 Q 495 380 510 490 Q 525 600 538 745" strokeWidth="39" />
            <path d="M 320 250 Q 380 235 440 220 Q 470 215 480 220" strokeWidth="77" />
          </g>
        </g>

        {/* Faint region labels */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1" fill="rgba(26,31,36,0.35)">
          <text x="34" y="450" fontWeight="500" transform="rotate(-78 34 450)">RAMO DI COMO</text>
          <text x="558" y="430" fontWeight="500" transform="rotate(82 558 430)">RAMO DI LECCO</text>
          <text x="540" y="80" fontWeight="500" transform="rotate(78 540 80)">ALTO LARIO</text>
        </g>
      </svg>

      {/* Pins overlaid in HTML for easy hover/active styling */}
      <div className="minimap-pins">
        {Object.values(MAP_PINS).map((p) => {
          const isActive = p.id === activePinId;
          const style: CSSProperties = {
            left: `${(p.x / VBW) * 100}%`,
            top: `${(p.y / VBH) * 100}%`,
          };
          return (
            <span key={p.id} className={`minimap-pin ${isActive ? "is-active" : ""}`} style={style}>
              <span className="dot" />
              {isActive && <span className="tag">{activeLabel}</span>}
            </span>
          );
        })}
      </div>

      <div className="stats">
        <b>{statsHeadline}</b>
        <br />
        {statsSub}
      </div>
    </div>
  );
}
