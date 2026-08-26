import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BRAND_HEX,
  STATUS_TONES,
  cellTone,
  isDimmed,
  windowLit,
  type Cell,
  type CellUnit,
} from "./unit-highlight.ts";

const cell = (floor: number, bay: number, extra: Partial<Cell> = {}): Cell => ({
  building: "B",
  floor,
  bay,
  ...extra,
});

const unit = (floor: number, bay: number, status: CellUnit["status"]): CellUnit => ({
  id: `B-${floor}-${bay}`,
  status,
});

const NOWHERE = { selection: { building: "", floor: 0, unit: null }, hover: null };

test("an apartment nobody is looking at stays invisible", () => {
  assert.equal(cellTone(cell(2, 1), unit(2, 1, "available"), NOWHERE).opacity, 0);
});

test("the cursor answers in company blue", () => {
  const t = cellTone(cell(2, 1), unit(2, 1, "sold"), { ...NOWHERE, hover: cell(2, 1) });
  assert.equal(t.hex, BRAND_HEX);
  assert.ok(t.opacity > 0.5);
});

test("the rest of the hovered floor comes up in the same blue, quieter", () => {
  const neighbour = cellTone(cell(2, 3), unit(2, 3, "sold"), { ...NOWHERE, hover: cell(2, 1) });
  const under = cellTone(cell(2, 1), unit(2, 1, "sold"), { ...NOWHERE, hover: cell(2, 1) });
  assert.equal(neighbour.hex, BRAND_HEX);
  assert.ok(neighbour.opacity > 0);
  assert.ok(neighbour.opacity < under.opacity);
});

test("hovering leaves the floors above and below alone", () => {
  assert.equal(cellTone(cell(3, 1), unit(3, 1, "available"), { ...NOWHERE, hover: cell(2, 1) }).opacity, 0);
});

test("hovering another building leaves this one alone", () => {
  const hover = { building: "C", floor: 2, bay: 1 };
  assert.equal(cellTone(cell(2, 1), unit(2, 1, "available"), { ...NOWHERE, hover }).opacity, 0);
});

test("an opened floor shows a status colour per apartment", () => {
  const ctx = { selection: { building: "B", floor: 2, unit: null }, hover: null };
  assert.equal(cellTone(cell(2, 1), unit(2, 1, "available"), ctx).hex, STATUS_TONES.available.hex);
  assert.equal(cellTone(cell(2, 2), unit(2, 2, "reserved"), ctx).hex, STATUS_TONES.reserved.hex);
  assert.equal(cellTone(cell(2, 3), unit(2, 3, "sold"), ctx).hex, STATUS_TONES.sold.hex);
});

test("an opened floor keeps its statuses while the cursor wanders over it", () => {
  const ctx = { selection: { building: "B", floor: 2, unit: null }, hover: cell(2, 1) };
  // The neighbour is on the hovered floor and on the opened one; status wins.
  assert.equal(cellTone(cell(2, 3), unit(2, 3, "reserved"), ctx).hex, STATUS_TONES.reserved.hex);
});

test("the chosen home keeps its own colour, blue or not", () => {
  const ctx = { selection: { building: "B", floor: 2, unit: "B-2-1" }, hover: cell(2, 1) };
  const chosen = cellTone(cell(2, 1), unit(2, 1, "available"), ctx);
  assert.equal(chosen.hex, STATUS_TONES.available.hex);
  // ...and it is the loudest thing on the floor.
  assert.ok(chosen.opacity > cellTone(cell(2, 3), unit(2, 3, "available"), ctx).opacity);
});

test("a row house damps its ambient tint but not the one under the cursor", () => {
  const ctx = { selection: { building: "B", floor: 1, unit: null }, hover: null };
  const plain = cellTone(cell(1, 1), unit(1, 1, "sold"), ctx);
  const soft = cellTone(cell(1, 1, { soft: true }), unit(1, 1, "sold"), ctx);
  assert.ok(soft.opacity < plain.opacity);
  const pointed = cellTone(cell(1, 1, { soft: true }), unit(1, 1, "sold"), { ...ctx, hover: cell(1, 1) });
  assert.equal(pointed.hex, BRAND_HEX);
  assert.ok(pointed.opacity > soft.opacity);
});

test("a cell with no unit behind it reads as sold rather than blank", () => {
  const ctx = { selection: { building: "B", floor: 2, unit: null }, hover: null };
  assert.equal(cellTone(cell(2, 9), null, ctx).hex, STATUS_TONES.sold.hex);
});

test("windows light on the floor being read and the one being pointed at", () => {
  const ctx = { selection: { building: "B", floor: 2, unit: null }, hover: cell(4, 1) };
  assert.ok(windowLit(cell(2, 1), ctx));
  assert.ok(windowLit(cell(4, 3), ctx));
  assert.equal(windowLit(cell(3, 1), ctx), false);
});

test("nothing is dimmed until a building has been chosen", () => {
  assert.equal(isDimmed("A", true, { building: "", floor: 1, unit: null }), false);
  assert.equal(isDimmed("A", false, { building: "B", floor: 1, unit: null }), false);
});

test("choosing a building clears the others out of the way", () => {
  const sel = { building: "B", floor: 1, unit: null };
  assert.equal(isDimmed("A", true, sel), true);
  assert.equal(isDimmed("B", true, sel), false);
});
