"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Existing scroll-linked effects (parallax, marquee) read the native
// scrollY/scroll events; Lenis's default mode drives the real scroll
// position via window.scrollTo each frame, so those keep working untouched.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis();

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
