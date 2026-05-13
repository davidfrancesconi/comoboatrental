"use client";

// MiniLakeMap — small Leaflet map of Lake Como used in the sticky
// sidebar of each attraction detail page. Same tile source as the
// homepage hero map (CartoDB Voyager) so the visual language stays
// consistent: real lake geometry, no hand-drawn stylisation, all 14
// attraction pins visible, the active one highlighted in gold with a
// label tag. Interactions are fully disabled — it's a "you are here"
// thumbnail, not a navigation tool.
//
// Replaces the prior hand-drawn SVG Y-shape that looked rough next to
// the cinematic Leaflet map on the homepage.

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { translations } from "../translations";

// Cherry-pick the lat/lng list out of the English translation block —
// pin coords are locale-agnostic and live there alongside the homepage
// map data.
const PINS = translations.en.map.pins;

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
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

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
      }).setView([45.94, 9.22], 10);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 },
      ).addTo(map);

      // Faint dashed polyline through the orbit route (south → Bellagio)
      // — same as the homepage but thinner, just to hint that pins sit
      // on a navigable route.
      const orbitOrder = [
        "como",
        "cernobbio",
        "oleandra",
        "nesso",
        "argegno",
        "balbianello",
        "carlotta",
        "bellagio",
        "varenna",
      ];
      const orbitPath = orbitOrder
        .map((id) => PINS.find((p) => p.id === id))
        .filter((p): p is (typeof PINS)[number] => !!p)
        .map((p) => [p.lat, p.lng] as [number, number]);
      L.polyline(orbitPath, {
        color: "#2a3943",
        weight: 1.2,
        opacity: 0.4,
        dashArray: "3, 5",
      }).addTo(map);

      // Draw non-active pins as small grey circleMarkers.
      PINS.forEach((pin) => {
        if (pin.id === activePinId) return;
        L.circleMarker([pin.lat, pin.lng], {
          radius: 3.2,
          fillColor: "#fff",
          color: "#2a3943",
          weight: 1.2,
          opacity: 0.85,
          fillOpacity: 0.9,
        }).addTo(map);
      });

      // Draw the active pin LAST so it sits on top, in gold + with a
      // permanent label tooltip.
      const active = PINS.find((p) => p.id === activePinId);
      if (active) {
        // Soft outer halo first
        L.circleMarker([active.lat, active.lng], {
          radius: 11,
          fillColor: "#b08a4a",
          color: "#b08a4a",
          weight: 0,
          opacity: 0.2,
          fillOpacity: 0.2,
        }).addTo(map);
        // The main gold pin
        const marker = L.circleMarker([active.lat, active.lng], {
          radius: 6.5,
          fillColor: "#b08a4a",
          color: "#1a1f24",
          weight: 1.6,
          opacity: 1,
          fillOpacity: 1,
        }).addTo(map);
        marker.bindTooltip(activeLabel, {
          direction: "right",
          offset: [10, 0],
          permanent: true,
          className: "minimap-label",
        });
      }

      // Fit bounds so every pin is visible with a bit of padding.
      const bounds = L.latLngBounds(
        PINS.map((p) => [p.lat, p.lng] as [number, number]),
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [22, 22], animate: false });
      }

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activePinId, activeLabel]);

  return (
    <div className="minimap">
      <div className="minimap-canvas" ref={containerRef} aria-hidden />
      <span className="minimap-corner-label">Lago di Como</span>
      <div className="minimap-stats">
        <span className="hd">{statsHeadline}</span>
        <span className="sub">{statsSub}</span>
      </div>
    </div>
  );
}
