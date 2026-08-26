"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// A pinned scrollytelling block: the section reserves extra scroll height
// and its content stays pinned below the header while you scroll through
// that range. Over that range, house1 (orig.png) slides out to the right
// and house2 slides in from the left to take its place — plain translateX,
// no easing beyond what Lenis already gives the scroll itself. Distances are
// computed in real pixels from each frame's own edge to the viewport edge
// (not a percentage of the frame's own width), so the houses travel the
// full width of the site rather than just sliding within their own small
// frame — the frame itself has no overflow-hidden, only the section around
// it does, so that full-width travel is actually visible. The left text
// reuses the site's existing [data-parallax] scroll effect (see
// motion-init.tsx) rather than a bespoke one. Reduced motion skips straight
// to the finished (house2, at rest) state.
export function ProjectAssemblySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const house1Ref = useRef<HTMLImageElement>(null);
  const house2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const frame = frameRef.current;
    const house1 = house1Ref.current;
    const house2 = house2Ref.current;
    if (!wrapper || !frame || !house1 || !house2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      house1.style.transform = `translateX(${window.innerWidth}px)`;
      house2.style.transform = "translateX(0px)";
      return;
    }

    let ticking = false;
    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;

      const frameRect = frame.getBoundingClientRect();
      const exitDistance = window.innerWidth - frameRect.left;
      const entryDistance = frameRect.right;

      house1.style.transform = `translateX(${progress * exitDistance}px)`;
      house2.style.transform = `translateX(${(progress - 1) * entryDistance}px)`;

      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-(--nav-height) z-10 flex h-[calc(100vh-var(--nav-height))] items-center overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-dark)">
        <div className="mx-auto grid w-full grid-cols-1 items-center gap-(--space-section) px-(--container-pad) py-(--space-section) lg:grid-cols-2">
          <div data-parallax="0.15" className="flex flex-col gap-(--space-lg)">
            <h2
              className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-on-dark)"
              style={{ lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              From first sketch to move-in day
            </h2>
            <p className="m-0 max-w-120 text-(length:--body-md-size) text-(--text-on-dark-mute)">
              Every PICHE home starts as a plan on paper and ends as a place
              to live.
            </p>
          </div>
          <div ref={frameRef} className="relative aspect-square">
            <Image
              ref={house1Ref}
              src="/orig.png"
              alt="Completed PICHE home"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
            <Image
              ref={house2Ref}
              src="/house2.png"
              alt="A second completed PICHE home"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
              style={{ transform: "translateX(-100vw)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
