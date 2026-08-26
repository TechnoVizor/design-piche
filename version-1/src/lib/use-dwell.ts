"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * How long a pointer must rest on a target before it counts as intent.
 * Long enough that sweeping the cursor across the map does nothing, short
 * enough that it does not feel broken. The pin draws a matching ring.
 */
export const DWELL_MS = 1200;

/**
 * Fires `onFire` once a pointer has rested on the same target for `delay`.
 * Leaving the target before then cancels it silently.
 */
export function useDwell(onFire: (id: string) => void, delay: number = DWELL_MS) {
  const timer = useRef<number | null>(null);
  const latest = useRef(onFire);

  useEffect(() => {
    latest.current = onFire;
  }, [onFire]);

  const cancel = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(
    (id: string) => {
      cancel();
      timer.current = window.setTimeout(() => {
        timer.current = null;
        latest.current(id);
      }, delay);
    },
    [cancel, delay],
  );

  /** Skip the wait — keyboard focus and taps are already deliberate. */
  const fireNow = useCallback(
    (id: string) => {
      cancel();
      latest.current(id);
    },
    [cancel],
  );

  useEffect(() => cancel, [cancel]);

  return { start, cancel, fireNow };
}
