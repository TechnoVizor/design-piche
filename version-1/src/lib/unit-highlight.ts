// Everything the 3D model and the side panel have to agree on about one
// apartment: what colour a sale status is, and which of the overlapping hover
// and selection rules wins for a given cell. No three.js in here, so the
// decision table can be read — and tested — on its own.
import type { Unit } from "./piche-data";

/**
 * One apartment as the model knows it. `soft` marks the oversized targets a
 * row terrace uses: a whole two-storey house is a single cell there, so an
 * ambient tint at full strength would swamp the terrace.
 */
export type Cell = { building: string; floor: number; bay: number; soft?: boolean };

export type Selection = { building: string; floor: number; unit: string | null };

/** The home sitting in a cell, or null where the model has no unit for it. */
export type CellUnit = { id: string; status: Unit["status"] };

export type HighlightContext = {
  selection: Selection;
  /** The cell under the cursor, or null when the pointer is off the model. */
  hover: Cell | null;
};

/** Company blue — the same value as `--brand-primary` in globals.css. */
export const BRAND_HEX = "#13b5ca";

/**
 * The three sale states. `hex` paints the 3D overlay, `chip`/`ink` dress the
 * pills in the panel and the legend, so no colour is spelled out twice.
 */
export const STATUS_TONES = {
  available: { label: "Available", hex: "#27a35c", chip: "#dcf1e5", ink: "#166b3a" },
  reserved: { label: "Reserved", hex: "#e0a410", chip: "#fbeecc", ink: "#7d5a00" },
  sold: { label: "Sold", hex: "#c93a2c", chip: "#f9dfdc", ink: "#9e0a0a" },
} as const;

/** Legend order: what a buyer can act on comes first. */
export const STATUS_ORDER: Unit["status"][] = ["available", "reserved", "sold"];

export type Tone = { hex: string; opacity: number };

const HIDDEN: Tone = { hex: BRAND_HEX, opacity: 0 };

const onSameFloor = (cell: Cell, of: { building: string; floor: number } | null) =>
  of !== null && cell.building === of.building && cell.floor === of.floor;

const isSameCell = (a: Cell, b: Cell) => onSameFloor(a, b) && a.bay === b.bay;

/**
 * How one apartment overlay should look. The order of the rules is the whole
 * design:
 *
 *  1. the chosen home always keeps its own status colour, so the pick never
 *     hides the one fact it was chosen for;
 *  2. the cursor always answers in company blue, on the apartment itself and,
 *     more quietly, across the rest of that floor;
 *  3. an opened floor keeps showing its statuses even while the cursor
 *     wanders over it — clicking a floor is how you ask for them.
 */
export function cellTone(cell: Cell, unit: CellUnit | null, ctx: HighlightContext): Tone {
  const status = STATUS_TONES[unit ? unit.status : "sold"];
  const hovered = ctx.hover !== null && isSameCell(cell, ctx.hover);

  if (unit !== null && unit.id === ctx.selection.unit) {
    return { hex: status.hex, opacity: hovered ? 0.92 : 0.78 };
  }
  if (hovered) return { hex: BRAND_HEX, opacity: 0.55 };

  const soft = cell.soft ? 0.5 : 1;
  if (onSameFloor(cell, ctx.selection)) return { hex: status.hex, opacity: 0.42 * soft };
  if (onSameFloor(cell, ctx.hover)) return { hex: BRAND_HEX, opacity: 0.22 * soft };
  return HIDDEN;
}

/** Panes light up on the floor being read and on the one being pointed at. */
export function windowLit(cell: Cell, ctx: HighlightContext): boolean {
  return onSameFloor(cell, ctx.selection) || onSameFloor(cell, ctx.hover);
}

/**
 * True while a building should be faded out of the way. Isolating waits for a
 * building to actually be chosen, so a site always opens showing every block.
 */
export function isDimmed(buildingId: string, isolated: boolean, selection: Selection): boolean {
  return isolated && selection.building !== "" && buildingId !== selection.building;
}
