import { test } from "node:test";
import assert from "node:assert/strict";
import {
  computeBarPlacement,
  computeDockWidth,
  computeTravelProgress,
  hasReplyRoute,
  slotRestDistance,
} from "./viewing-request";

test("an e-mail alone is a way back", () => {
  assert.ok(hasReplyRoute({ email: "a@b.lv", phone: "" }));
});

test("a phone number alone is a way back", () => {
  assert.ok(hasReplyRoute({ email: "", phone: "+371 22 333 333" }));
});

test("whitespace is not a way back", () => {
  assert.equal(hasReplyRoute({ email: "  ", phone: "\t" }), false);
});

test("the slot's resting distance survives being measured mid-scroll", () => {
  // Same slot, 240px further down the page: 900 - 780 === 900 - 540 - 240.
  assert.equal(slotRestDistance(780, 900, 0), 120);
  assert.equal(slotRestDistance(540, 900, 240), 120);
});

test("progress runs from 0 to 1 over the stretched gap", () => {
  // 120 - 16 docked gap, stretched by the 2.5x headroom.
  assert.equal(computeTravelProgress(0, 120), 0);
  assert.ok(computeTravelProgress(130, 120) < 1);
  assert.equal(computeTravelProgress(260, 120), 1);
  assert.equal(computeTravelProgress(9999, 120), 1);
});

test("reduced motion flips at the halfway mark instead of easing", () => {
  assert.equal(computeTravelProgress(120, 120, true), 0);
  assert.equal(computeTravelProgress(140, 120, true), 1);
});

test("the bar descends without bouncing as the hero scrolls away", () => {
  // The slot rides up with the hero while progress pulls the bar down; the
  // sum of the two has to stay monotonic or the bar visibly lifts first.
  // Checked across the range of heights the slot can land at in the layout.
  const viewport = { width: 1440, height: 900 };
  for (const restY of [56, 112, 240, 460]) {
    let previous = Infinity;
    for (let scrollY = 0; scrollY <= 1400; scrollY += 4) {
      const slot = { left: 72, bottom: viewport.height - restY - scrollY, width: 640 };
      const { y } = computeBarPlacement(
        slot,
        viewport,
        computeTravelProgress(scrollY, restY),
      );
      assert.ok(
        y <= previous + 1e-9,
        `slot at ${restY}: y rose at scrollY ${scrollY} (${y} > ${previous})`,
      );
      previous = y;
    }
    assert.equal(Math.round(previous), 16, `slot at ${restY} never docked`);
  }
});

test("at rest the bar sits exactly on its hero slot", () => {
  const placement = computeBarPlacement(
    { left: 72, bottom: 780, width: 640 },
    { width: 1440, height: 900 },
    0,
  );
  assert.deepEqual(placement, { x: 72, y: 120, width: 640 });
});

test("docked, the bar is centred and clear of the viewport foot", () => {
  const placement = computeBarPlacement(
    { left: 72, bottom: 780, width: 640 },
    { width: 1440, height: 900 },
    1,
  );
  assert.deepEqual(placement, { x: 400, y: 16, width: 640 });
});

test("a narrow viewport keeps a gutter on either side", () => {
  assert.equal(computeDockWidth(375), 327);
  assert.equal(computeDockWidth(1440), 640);
});
