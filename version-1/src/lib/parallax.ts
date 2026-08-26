// Maps an element's position to a clamped, inverse scroll offset — a positive
// distance from the viewport center produces a negative offset, so the
// element lags behind normal scroll (the parallax effect).
export function computeParallaxOffset(
  elementTop: number,
  elementHeight: number,
  viewportHeight: number,
  speed: number,
  maxOffset: number,
): number {
  const distanceFromCenter = elementTop + elementHeight / 2 - viewportHeight / 2;
  return Math.max(-maxOffset, Math.min(maxOffset, -distanceFromCenter * speed));
}
