"use client";

import { SITES, buildUnits, formatMoney } from "@/lib/piche-data";
import { useDwell } from "@/lib/use-dwell";

/** Precomputed once — the data is static, so this never needs recomputing. */
const STATS = SITES.map((site) => {
  const units = buildUnits(site);
  const available = units.filter((u) => u.status === "available");
  return {
    site,
    homes: units.length,
    available: available.length,
    from: available.length
      ? Math.min(...available.map((u) => u.price))
      : Math.min(...units.map((u) => u.price)),
  };
});

export type ProjectListProps = {
  focusedId: string | null;
  onFocus: (id: string | null) => void;
  onOpen: (id: string) => void;
};

export function ProjectList({ focusedId, onFocus, onOpen }: ProjectListProps) {
  const dwell = useDwell(onFocus);

  return (
    <aside className="flex flex-col gap-(--space-lg) rounded-(--radius-lg-ds) bg-(--surface-card) p-(--space-xxl)">
      <div className="flex flex-col gap-(--space-xxs)">
        <span className="text-(length:--caption-md-size) font-medium text-(--text-mute)">
          PICHE developments
        </span>
        <span
          className="text-(length:--heading-xl-size) font-bold text-(--text-primary)"
          style={{ letterSpacing: "-1.2px" }}
        >
          Four places in Latvia
        </span>
        <span className="text-(length:--body-sm-size) text-(--text-mute)">
          Rest on a marker or a row below to fly there, then open it in 3D.
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        {STATS.map(({ site, homes, available, from }) => {
          const isFocused = site.id === focusedId;
          return (
            <button
              key={site.id}
              type="button"
              onPointerEnter={(e) => {
                if (e.pointerType === "touch") return;
                dwell.start(site.id);
              }}
              onPointerLeave={dwell.cancel}
              onFocus={() => dwell.fireNow(site.id)}
              onBlur={dwell.cancel}
              onClick={() => onOpen(site.id)}
              className="-mx-(--space-sm) grid grid-cols-[1fr_auto] items-center gap-x-(--space-md) gap-y-(--space-xs) rounded-(--radius-sm-ds) border-0 border-b border-(--border-hairline) px-(--space-sm) py-(--space-md) text-left transition-colors duration-(--duration-base) ease-(--ease-standard) hover:bg-(--surface-canvas)"
              style={{ background: isFocused ? "var(--surface-canvas)" : "transparent" }}
            >
              <span className="text-(length:--body-strong-size) font-semibold text-(--text-primary)">
                {site.name}
              </span>
              <span
                className="rounded-full px-2.5 py-1 text-(length:--caption-md-size) font-medium"
                style={
                  site.status === "In sales"
                    ? { background: "var(--status-success-bg)", color: "var(--status-success)" }
                    : { background: "var(--surface-secondary)", color: "var(--text-mute)" }
                }
              >
                {site.status}
              </span>
              <span className="col-span-2 text-(length:--body-sm-size) text-(--text-mute)">
                {site.blurb}
              </span>
              <span className="text-(length:--body-sm-size) text-(--text-mute)">
                {site.location} · {homes} homes · {available} available
              </span>
              <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">
                from {formatMoney(from)}
              </span>
              <span
                className="col-span-2 text-(length:--body-sm-size) font-semibold text-(--text-link)"
                style={{ opacity: isFocused ? 1 : 0.55 }}
              >
                See the houses in 3D →
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
