"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1200;
// ease-out-quart
const ease = (t: number) => 1 - Math.pow(1 - t, 4);

export function StatCounter({ value, className }: { value: string; className?: string }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(target ?? 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    // display already equals target from the initial useState — nothing to
    // do here for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        // Reset to 0 only now, inside the callback: the initial render kept
        // the final value visible (SSR/no-JS correctness) until we're
        // actually about to animate up to it.
        setDisplay(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          setDisplay(Math.round(target * ease(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : `${display}${suffix}`}
    </span>
  );
}
