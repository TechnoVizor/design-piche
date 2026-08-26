"use client";

import { useMemo, useState } from "react";
import { SITES, buildUnits, type Site } from "@/lib/piche-data";
import type { Selection } from "@/lib/piche-scene";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ProjectMap } from "@/components/piche/project-map";
import { ProjectList } from "@/components/piche/project-list";
import { BuildingViewer } from "@/components/piche/building-viewer";
import { UnitPanel } from "@/components/piche/unit-panel";

/** Units for every site, built once — the data is static. */
const UNITS_BY_SITE = new Map(SITES.map((s) => [s.id, buildUnits(s)]));

function defaultSelection(site: Site): Selection {
  const b = site.buildings[0];
  const floor = b.kind === "row" ? 1 : Math.min(3, b.floors);
  const units = UNITS_BY_SITE.get(site.id) ?? [];
  const first = units.find((u) => u.building === b.id && u.floor === floor);
  return { building: b.id, floor, unit: first ? first.id : null };
}

/** Map fades out while the camera is still flying in, then the 3D takes over. */
const FADE_MS = 420;
const FADE_DELAY_MS = 830;

export function ExploreSection() {
  const reduced = useReducedMotion();

  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [siteId, setSiteId] = useState<string | null>(null);
  const [mode, setMode] = useState<"map" | "project">("map");
  const [selection, setSelection] = useState<Selection>(() => defaultSelection(SITES[0]));
  const [spin, setSpin] = useState(true);

  const site = siteId ? (SITES.find((s) => s.id === siteId) ?? null) : null;
  const units = useMemo(() => (site ? (UNITS_BY_SITE.get(site.id) ?? []) : []), [site]);

  const openStart = (id: string) => setOpeningId(id);

  const openDone = (id: string) => {
    const next = SITES.find((s) => s.id === id);
    if (!next) return;
    setSiteId(id);
    setSelection(defaultSelection(next));
    setSpin(!reduced);
    setMode("project");
    setOpeningId(null);
  };

  const backToMap = () => {
    setMode("map");
    setOpeningId(null);
    if (siteId) setFocusedId(siteId);
  };

  const showingProject = mode === "project" && site !== null;
  const mapOpacity = showingProject ? 0 : openingId ? 0 : 1;

  return (
    <section id="explore" className="scroll-mt-(--nav-height) pt-(--space-section)">
      <div className="mb-(--space-xl) flex flex-col gap-(--space-sm)">
        <h2
          className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
          style={{ letterSpacing: "-0.8px" }}
        >
          {showingProject ? "See the houses in 3D" : "Find your home in Latvia"}
        </h2>
        <p className="m-0 max-w-155 text-(length:--body-md-size) text-(--text-mute)">
          {showingProject && site
            ? `${site.name}, ${site.location}. Drag to rotate the model, press a building to open its floors, then pick a home to see its price, status and plan.`
            : "Four developments across Latvia. Rest the cursor on a marker for a moment and the map flies in; click to walk through that project's buildings in 3D."}
        </p>
      </div>

      <div
        data-reveal
        className="grid grid-cols-1 items-stretch gap-(--space-lg) lg:grid-cols-[minmax(0,1fr)_480px]"
      >
        <div className="relative min-h-155 overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-card)">
          <div
            className="absolute inset-0"
            style={{
              opacity: mapOpacity,
              pointerEvents: showingProject ? "none" : "auto",
              transition: reduced
                ? "none"
                : `opacity ${FADE_MS}ms var(--ease-standard) ${openingId ? FADE_DELAY_MS : 0}ms`,
            }}
          >
            <ProjectMap
              focusedId={focusedId}
              onFocus={setFocusedId}
              openingId={openingId}
              onOpenStart={openStart}
              onOpenDone={openDone}
            />
          </div>

          {site && (
            <div
              className="absolute inset-0"
              style={{
                opacity: showingProject ? 1 : 0,
                pointerEvents: showingProject ? "auto" : "none",
                transition: reduced ? "none" : `opacity ${FADE_MS}ms var(--ease-standard)`,
              }}
            >
              <BuildingViewer
                site={site}
                units={units}
                selection={selection}
                onSelect={setSelection}
                spin={spin && showingProject}
                onSpinChange={setSpin}
                onBack={backToMap}
                active={showingProject}
              />
            </div>
          )}
        </div>

        {showingProject && site ? (
          <UnitPanel site={site} units={units} selection={selection} onSelect={setSelection} />
        ) : (
          <ProjectList focusedId={focusedId} onFocus={setFocusedId} onOpen={openStart} />
        )}
      </div>
    </section>
  );
}
