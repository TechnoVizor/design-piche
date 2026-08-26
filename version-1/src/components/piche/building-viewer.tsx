"use client";

import { useEffect, useRef, useState } from "react";
import type { Site, Unit } from "@/lib/piche-data";
import { createScene, type SceneHandle, type Selection } from "@/lib/piche-scene";
import { STATUS_ORDER, STATUS_TONES } from "@/lib/unit-highlight";
import { PicheButton } from "@/components/piche/piche-button";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";

export type BuildingViewerProps = {
  site: Site;
  units: Unit[];
  selection: Selection;
  onSelect: (sel: Selection) => void;
  /** True once a building has been opened and the others were cleared away. */
  isolated: boolean;
  onIsolatedChange: (on: boolean) => void;
  spin: boolean;
  onSpinChange: (on: boolean) => void;
  onBack: () => void;
  /** False while the map is on top — the render loop pauses. */
  active: boolean;
};

export function BuildingViewer({
  site,
  units,
  selection,
  onSelect,
  isolated,
  onIsolatedChange,
  spin,
  onSpinChange,
  onBack,
  active,
}: BuildingViewerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneHandle | null>(null);
  const hintTimer = useRef<number | null>(null);
  const [hint, setHint] = useState(false);

  const live = useRef({ units, onSelect, onSpinChange, onIsolatedChange });
  useEffect(() => {
    live.current = { units, onSelect, onSpinChange, onIsolatedChange };
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = createScene(host, {
      onPick(d) {
        const u = live.current.units.find(
          (x) => x.building === d.building && x.floor === d.floor && x.bay === d.bay,
        );
        live.current.onSelect({
          building: d.building,
          floor: d.floor,
          unit: u ? u.id : null,
        });
      },
      onClear() {
        live.current.onIsolatedChange(false);
      },
      onDragStart() {
        live.current.onSpinChange(false);
      },
      onScrollHint() {
        setHint(true);
        if (hintTimer.current !== null) window.clearTimeout(hintTimer.current);
        hintTimer.current = window.setTimeout(() => setHint(false), 1600);
      },
    });
    sceneRef.current = scene;

    return () => {
      if (hintTimer.current !== null) window.clearTimeout(hintTimer.current);
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.setSite(site, units);
  }, [site, units]);

  useEffect(() => {
    sceneRef.current?.setSelection(selection);
  }, [selection]);

  useEffect(() => {
    sceneRef.current?.setIsolated(isolated);
  }, [isolated]);

  useEffect(() => {
    sceneRef.current?.setSpin(spin);
  }, [spin]);

  useEffect(() => {
    sceneRef.current?.setActive(active);
  }, [active]);

  const selectedUnit = units.find((u) => u.id === selection.unit);

  return (
    <div className="absolute inset-0">
      <div ref={hostRef} className="absolute inset-0 cursor-grab" />

      <div className="absolute top-(--space-lg) left-(--space-lg) flex flex-wrap items-center gap-(--space-sm)">
        <PicheButton variant="secondary" size="sm" onClick={onBack}>
          ‹ Back to map
        </PicheButton>
        {isolated && site.buildings.length > 1 && (
          <PicheButton variant="secondary" size="sm" onClick={() => onIsolatedChange(false)}>
            Show all buildings
          </PicheButton>
        )}
        <PinOverlayPill>
          {selectedUnit
            ? `${selectedUnit.name} · ${selectedUnit.rooms} rooms · ${selectedUnit.area} m²`
            : "Drag to orbit · click an apartment"}
        </PinOverlayPill>
      </div>

      <div className="absolute top-(--space-lg) right-(--space-lg) flex gap-(--space-sm)">
        <PicheButton
          variant="secondary"
          size="sm"
          onClick={() => sceneRef.current?.zoomBy(-1)}
          aria-label="Zoom in"
        >
          +
        </PicheButton>
        <PicheButton
          variant="secondary"
          size="sm"
          onClick={() => sceneRef.current?.zoomBy(1)}
          aria-label="Zoom out"
        >
          −
        </PicheButton>
        <PicheButton variant="secondary" size="sm" onClick={() => sceneRef.current?.resetView()}>
          Reset view
        </PicheButton>
        <PicheButton variant="secondary" size="sm" onClick={() => onSpinChange(!spin)}>
          {spin ? "Stop rotation" : "Rotate"}
        </PicheButton>
      </div>

      <div className="absolute bottom-(--space-lg) left-(--space-lg) flex flex-wrap items-center gap-x-(--space-lg) gap-y-(--space-md) rounded-(--radius-lg-ds) bg-(--surface-canvas) px-3.5 py-2.5">
        {STATUS_ORDER.map((status) => (
          <span
            key={status}
            className="flex items-center gap-(--space-sm) text-(length:--caption-md-size) text-(--text-body)"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: STATUS_TONES[status].hex }}
            />
            {STATUS_TONES[status].label}
          </span>
        ))}
      </div>

      {/* Shown when a plain wheel scroll passed through to the page, so the
          zoom gesture is discoverable without ever trapping the scroll. */}
      <span
        aria-live="polite"
        className="pointer-events-none absolute right-(--space-lg) bottom-(--space-lg) rounded-(--radius-full-ds) bg-(--surface-dark) px-3 py-1.5 text-(length:--caption-md-size) text-(--text-on-dark) transition-opacity duration-(--duration-base) ease-(--ease-standard)"
        style={{ opacity: hint ? 1 : 0 }}
      >
        Pinch or ⌘ + scroll to zoom · or use + / −
      </span>
    </div>
  );
}
