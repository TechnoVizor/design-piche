"use client";

import { useEffect } from "react";
import { computeParallaxOffset } from "@/lib/parallax";

export function MotionInit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ponytail: [data-reveal] is still off. Its CSS animation uses
    // `animation-fill-mode: both`, so the instant .reveal-in is added the
    // element jumps to the 0% keyframe (opacity:0) before easing back in —
    // an already-visible element blinks to invisible first. Parallax below
    // just writes a --parallax-y var with no class-toggle animation, so it
    // doesn't have that failure mode and can run on its own.

    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const MAX_OFFSET = 48;

    let ticking = false;
    const updateParallax = () => {
      for (const el of parallaxEls) {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        const rect = el.getBoundingClientRect();
        const offset = computeParallaxOffset(
          rect.top,
          rect.height,
          window.innerHeight,
          speed,
          MAX_OFFSET,
        );
        el.style.setProperty("--parallax-y", `${offset}px`);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    };

    if (parallaxEls.length > 0) {
      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
