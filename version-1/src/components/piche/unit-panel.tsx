"use client";

import { formatMoney, type Site, type Unit } from "@/lib/piche-data";
import type { Selection } from "@/lib/piche-scene";
import { STATUS_TONES } from "@/lib/unit-highlight";
import { PicheButton } from "@/components/piche/piche-button";
import { FilterChip } from "@/components/piche/filter-chip";

export type UnitPanelProps = {
  site: Site;
  units: Unit[];
  selection: Selection;
  onSelect: (sel: Selection) => void;
};

export function UnitPanel({ site, units, selection, onSelect }: UnitPanelProps) {
  const building =
    site.buildings.find((b) => b.id === selection.building) ?? site.buildings[0];
  const mine = units.filter((u) => u.building === building.id);
  const available = mine.filter((u) => u.status === "available").length;
  const isRow = building.kind === "row";
  const listed = isRow ? mine : mine.filter((u) => u.floor === selection.floor);

  const floors: number[] = [];
  if (!isRow) for (let f = building.floors; f >= 1; f--) floors.push(f);

  const pickBuilding = (id: string) => {
    const b = site.buildings.find((x) => x.id === id);
    if (!b) return;
    const floor = b.kind === "row" ? 1 : Math.min(selection.floor, b.floors);
    const first = units.find((u) => u.building === id && u.floor === floor);
    onSelect({ building: id, floor, unit: first ? first.id : null });
  };

  const pickFloor = (floor: number) => {
    const first = mine.find((u) => u.floor === floor);
    onSelect({ building: building.id, floor, unit: first ? first.id : null });
  };

  return (
    <aside className="flex flex-col gap-(--space-lg) rounded-(--radius-lg-ds) bg-(--surface-card) p-(--space-xxl)">
      <div className="flex flex-col gap-(--space-xxs)">
        <span className="text-(length:--caption-md-size) font-medium text-(--text-mute)">
          {site.name} · {site.location}
        </span>
        <span
          className="text-(length:--heading-xl-size) font-bold text-(--text-primary)"
          style={{ letterSpacing: "-1.2px" }}
        >
          {isRow ? building.name : `${building.name} · Floor ${selection.floor}`}
        </span>
        <span className="text-(length:--body-sm-size) text-(--text-mute)">
          {isRow
            ? `${building.bays} houses · ${available} available`
            : `${building.floors} floors · ${mine.length} apartments · ${available} available`}
        </span>
      </div>

      {site.buildings.length > 1 && (
        <div className="flex flex-col gap-(--space-sm)">
          <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">
            Building
          </span>
          <div className="flex flex-wrap gap-(--space-sm)">
            {site.buildings.map((b) => (
              <FilterChip
                key={b.id}
                active={b.id === building.id}
                onClick={() => pickBuilding(b.id)}
              >
                {b.name}
              </FilterChip>
            ))}
          </div>
        </div>
      )}

      {!isRow && (
        <div className="flex flex-col gap-(--space-sm)">
          <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">
            Floor
          </span>
          <div className="flex flex-wrap gap-(--space-sm)">
            {floors.map((f) => (
              <FilterChip key={f} active={f === selection.floor} onClick={() => pickFloor(f)}>
                Floor {f}
              </FilterChip>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-(--space-sm)">
        <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">
          {isRow ? "Houses in this terrace" : "Apartments on this floor"}
        </span>
        <div className="flex flex-col">
          {listed.map((u) => {
            const t = STATUS_TONES[u.status];
            const isSelected = u.id === selection.unit;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => onSelect({ building: u.building, floor: u.floor, unit: u.id })}
                className="-mx-(--space-sm) grid grid-cols-[1fr_auto] items-center gap-x-(--space-md) gap-y-(--space-sm) rounded-(--radius-sm-ds) border-0 border-b border-(--border-hairline) px-(--space-sm) py-(--space-md) text-left transition-colors duration-(--duration-base) ease-(--ease-standard) hover:bg-(--surface-canvas)"
                style={{ background: isSelected ? "var(--surface-canvas)" : "transparent" }}
              >
                <span className="whitespace-nowrap text-(length:--body-strong-size) font-semibold text-(--text-primary)">
                  {u.name}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-(length:--caption-md-size) font-medium"
                  style={{ background: t.chip, color: t.ink }}
                >
                  {t.label}
                </span>
                <span className="text-(length:--body-sm-size) text-(--text-mute)">
                  {u.rooms} rooms · {u.area} m²
                </span>
                <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">
                  {formatMoney(u.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-(--space-sm)">
        <PicheButton asChild fullWidth>
          <a href="#contacts">Apply for a viewing</a>
        </PicheButton>
        <a
          href="#contacts"
          className="text-center text-(length:--body-sm-size) font-semibold text-(--text-link)"
        >
          Price list and floor plans →
        </a>
      </div>
    </aside>
  );
}
