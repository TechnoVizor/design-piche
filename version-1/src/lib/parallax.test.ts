import { test } from "node:test";
import assert from "node:assert/strict";
import { computeParallaxOffset } from "./parallax";

test("element centered in viewport gets no offset", () => {
  assert.equal(Math.abs(computeParallaxOffset(400, 200, 1000, 0.15, 48)), 0);
});

test("element below center lags behind (negative offset)", () => {
  const offset = computeParallaxOffset(700, 200, 1000, 0.15, 48);
  assert.ok(offset < 0);
});

test("element above center gets pushed ahead (positive offset)", () => {
  const offset = computeParallaxOffset(-400, 200, 1000, 0.15, 48);
  assert.ok(offset > 0);
});

test("large distance clamps to maxOffset", () => {
  assert.equal(computeParallaxOffset(5000, 200, 1000, 0.15, 48), -48);
  assert.equal(computeParallaxOffset(-5000, 200, 1000, 0.15, 48), 48);
});
