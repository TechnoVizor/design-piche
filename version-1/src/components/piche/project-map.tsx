"use client";

import { useEffect, useRef, useState } from "react";
import type * as LeafletNS from "leaflet";
import "leaflet/dist/leaflet.css";
import { SITES } from "@/lib/piche-data";
import { useDwell } from "@/lib/use-dwell";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Whole-country framing — the point of the map is "where in Latvia". */
const LATVIA_CENTER: [number, number] = [56.85, 24.6];
const LATVIA_ZOOM = 7;
/** Below this the projects overlap, so they are shown grouped by town. */
const SITE_ZOOM = 10.5;
const FOCUS_ZOOM = 15;
const OPEN_ZOOM = 17;

type Cluster = { id: string; label: string; lat: number; lng: number; count: number };

const CLUSTERS: Cluster[] = Object.values(
  SITES.reduce<Record<string, Cluster & { latSum: number; lngSum: number }>>((acc, s) => {
    const c = (acc[s.location] ??= {
      id: s.location,
      label: s.location,
      lat: 0,
      lng: 0,
      count: 0,
      latSum: 0,
      lngSum: 0,
    });
    c.count += 1;
    c.latSum += s.coords[1];
    c.lngSum += s.coords[0];
    c.lat = c.latSum / c.count;
    c.lng = c.lngSum / c.count;
    return acc;
  }, {}),
);

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function pinHtml(label: string, badge = "") {
  return `<span class="piche-pin${badge ? " piche-pin--cluster" : ""}">
    <svg class="piche-pin__ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" /></svg>
    <span class="piche-pin__dot">${esc(badge)}</span>
    <span class="piche-pin__label">${esc(label)}</span>
  </span>`;
}

export type ProjectMapProps = {
  focusedId: string | null;
  onFocus: (id: string | null) => void;
  /** Set by the caller once something asked to be opened; drives the fly-in. */
  openingId: string | null;
  /** A pin was clicked — the caller should set `openingId`. */
  onOpenStart: (id: string) => void;
  /** Fly-in finished — the caller can swap in the 3D view. */
  onOpenDone: (id: string) => void;
};

export function ProjectMap({
  focusedId,
  onFocus,
  openingId,
  onOpenStart,
  onOpenDone,
}: ProjectMapProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const siteEls = useRef(new Map<string, HTMLElement>());
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  const siteDwell = useDwell((id) => onFocus(id));
  const clusterDwell = useDwell((id) => {
    const c = CLUSTERS.find((x) => x.id === id);
    const map = mapRef.current;
    if (!c || !map) return;
    if (reduced) map.setView([c.lat, c.lng], 12, { animate: false });
    else map.flyTo([c.lat, c.lng], 12, { duration: 0.9 });
  });

  // DOM listeners are attached once, so they read the current callbacks
  // through a ref rather than capturing the first render's copies.
  const live = useRef({
    onFocus,
    onOpenStart,
    onOpenDone,
    siteDwell,
    clusterDwell,
    reduced,
    focusedId,
  });
  useEffect(() => {
    live.current = {
      onFocus,
      onOpenStart,
      onOpenDone,
      siteDwell,
      clusterDwell,
      reduced,
      focusedId,
    };
  });

  // Both entry points — a pin click and a row click in the side list — land
  // here, so the fly-in is written once.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !openingId) return;
    const site = SITES.find((s) => s.id === openingId);
    if (!site) return;
    if (live.current.reduced) {
      live.current.onOpenDone(openingId);
      return;
    }
    map.flyTo([site.coords[1], site.coords[0]], OPEN_ZOOM, { duration: 1.2 });
    const t = window.setTimeout(() => live.current.onOpenDone(openingId), 1250);
    return () => window.clearTimeout(t);
  }, [openingId, ready]);

  useEffect(() => {
    let disposed = false;
    let map: LeafletNS.Map | null = null;
    const els = siteEls.current;

    (async () => {
      const L = (await import("leaflet")).default;
      if (disposed || !hostRef.current) return;

      map = L.map(hostRef.current, {
        center: LATVIA_CENTER,
        zoom: LATVIA_ZOOM,
        minZoom: 6,
        maxZoom: 19,
        zoomControl: false,
        // Never swallow the page scroll — zoom is on the buttons and on pinch.
        scrollWheelZoom: false,
        attributionControl: true,
      });

      // OpenStreetMap's own tiles need no API key. CARTO's basemaps now
      // watermark every tile unless you pass one. The warm-grey look comes
      // from a CSS filter on .leaflet-tile-pane instead.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const siteLayer = L.layerGroup();
      const clusterLayer = L.layerGroup().addTo(map);

      const wire = (
        elm: HTMLElement,
        id: string,
        kind: "site" | "cluster",
        label: string,
      ) => {
        elm.setAttribute("tabindex", "0");
        elm.setAttribute("role", "button");
        elm.setAttribute("aria-label", label);

        const dwell = () => (kind === "site" ? live.current.siteDwell : live.current.clusterDwell);
        const begin = () => {
          elm.classList.add("is-dwelling");
          dwell().start(id);
        };
        const end = () => {
          elm.classList.remove("is-dwelling");
          dwell().cancel();
        };
        const commit = () => {
          elm.classList.remove("is-dwelling");
          dwell().fireNow(id);
        };

        elm.addEventListener("pointerenter", (e) => {
          // Touch has no hover, so a tap is the deliberate act — act at once.
          if ((e as PointerEvent).pointerType === "touch") return;
          begin();
        });
        elm.addEventListener("pointerleave", end);
        elm.addEventListener("focus", commit);
        elm.addEventListener("blur", end);
        elm.addEventListener("keydown", (e) => {
          const k = (e as KeyboardEvent).key;
          if (k !== "Enter" && k !== " ") return;
          e.preventDefault();
          if (kind === "site") live.current.onOpenStart(id);
          else commit();
        });
        elm.addEventListener("click", (e) => {
          e.stopPropagation();
          if (kind === "cluster") commit();
          else live.current.onOpenStart(id);
        });
      };

      // Leaflet builds a marker's element when the marker joins a map, and
      // builds a fresh one every time its layer is re-added. Wiring on "add"
      // is therefore the only place that survives the zoom-level layer swap.
      const addPin = (
        lat: number,
        lng: number,
        html: string,
        id: string,
        kind: "site" | "cluster",
        label: string,
        layer: LeafletNS.LayerGroup,
      ) => {
        const mk = L.marker([lat, lng], {
          icon: L.divIcon({ className: "piche-pin-wrap", html, iconSize: [40, 40], iconAnchor: [20, 20] }),
          keyboard: false,
          riseOnHover: true,
        });
        const attach = () => {
          const elm = mk.getElement();
          if (!elm) return;
          if (kind === "site") {
            els.set(id, elm);
            elm.classList.toggle("is-focused", live.current.focusedId === id);
          }
          wire(elm, id, kind, label);
        };
        mk.on("add", attach);
        mk.addTo(layer);
        attach();
      };

      for (const c of CLUSTERS) {
        addPin(
          c.lat,
          c.lng,
          pinHtml(`${c.label} · ${c.count}`, String(c.count)),
          c.id,
          "cluster",
          `${c.label}, ${c.count} projects`,
          clusterLayer,
        );
      }

      for (const s of SITES) {
        addPin(
          s.coords[1],
          s.coords[0],
          pinHtml(s.name),
          s.id,
          "site",
          `${s.name}, ${s.location}. Open in 3D`,
          siteLayer,
        );
      }

      const syncLayers = () => {
        if (!map) return;
        const zoomedIn = map.getZoom() >= SITE_ZOOM;
        if (zoomedIn && !map.hasLayer(siteLayer)) siteLayer.addTo(map);
        if (!zoomedIn && map.hasLayer(siteLayer)) map.removeLayer(siteLayer);
        if (zoomedIn && map.hasLayer(clusterLayer)) map.removeLayer(clusterLayer);
        if (!zoomedIn && !map.hasLayer(clusterLayer)) clusterLayer.addTo(map);
      };
      map.on("zoomend", syncLayers);
      syncLayers();

      if (disposed) {
        map.remove();
        map = null;
        return;
      }
      mapRef.current = map;
      setReady(true);
    })();

    return () => {
      disposed = true;
      els.clear();
      if (map) map.remove();
      mapRef.current = null;
    };
  }, []);

  // Fly wherever the focus went — pins and list rows both feed this.
  useEffect(() => {
    const map = mapRef.current;
    // While a fly-in is running it owns the camera; do not fight it.
    if (!map || !ready || openingId) return;

    if (!focusedId) {
      if (reduced) map.setView(LATVIA_CENTER, LATVIA_ZOOM, { animate: false });
      else map.flyTo(LATVIA_CENTER, LATVIA_ZOOM, { duration: 0.9 });
      return;
    }
    const site = SITES.find((s) => s.id === focusedId);
    if (!site) return;
    if (reduced) map.setView([site.coords[1], site.coords[0]], FOCUS_ZOOM, { animate: false });
    else map.flyTo([site.coords[1], site.coords[0]], FOCUS_ZOOM, { duration: 1.1 });
  }, [focusedId, ready, reduced, openingId]);

  // Keep the focused pin visibly marked.
  useEffect(() => {
    siteEls.current.forEach((elm, id) => {
      elm.classList.toggle("is-focused", id === focusedId);
    });
  }, [focusedId, ready]);

  const zoom = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.setZoom(map.getZoom() + delta);
  };

  return (
    <div className="absolute inset-0">
      <div ref={hostRef} className="absolute inset-0 rounded-(--radius-lg-ds)" />

      <div className="pointer-events-none absolute inset-(--space-lg) z-1200 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-(--space-md)">
          {focusedId ? (
            <button
              type="button"
              onClick={() => onFocus(null)}
              className="pointer-events-auto inline-flex h-8 items-center rounded-(--radius-full-ds) bg-(--surface-canvas) px-3 text-(length:--button-sm-size) font-bold text-(--text-primary) hover:bg-(--surface-secondary)"
            >
              ‹ All of Latvia
            </button>
          ) : (
            <span />
          )}
          <div className="pointer-events-auto flex flex-col gap-1">
            <button
              type="button"
              onClick={() => zoom(1)}
              aria-label="Zoom in"
              className="h-9 w-9 rounded-(--radius-sm-ds) bg-(--surface-canvas) text-(length:--body-md-size) font-bold text-(--text-primary) hover:bg-(--surface-secondary)"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => zoom(-1)}
              aria-label="Zoom out"
              className="h-9 w-9 rounded-(--radius-sm-ds) bg-(--surface-canvas) text-(length:--body-md-size) font-bold text-(--text-primary) hover:bg-(--surface-secondary)"
            >
              −
            </button>
          </div>
        </div>

        <span className="pointer-events-auto max-w-100 self-start rounded-(--radius-full-ds) bg-(--surface-canvas) px-3 py-1.5 text-(length:--caption-md-size) text-(--text-body)">
          Rest on a marker for a moment to zoom in · click to open it in 3D
        </span>
      </div>
    </div>
  );
}
