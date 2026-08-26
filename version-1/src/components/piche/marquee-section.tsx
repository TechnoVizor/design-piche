"use client";

import { useEffect, useRef } from "react";

const TAGS = ["New apartments", "Business parks", "Industrial facilities", "Rīga", "Mārupe"];
const REPEATS = 3;
const BASE_SPEED = 40; // px/sec, steady drift when the page is idle
const SCROLL_VELOCITY_GAIN = 0.6;
const VELOCITY_DECAY = 0.94; // per-frame decay back toward the base speed

function TickerBlock({ tags }: { tags: string[] }) {
  return (
    <div className="flex shrink-0 items-center gap-(--space-xl) pr-(--space-xl)">
      {Array.from({ length: REPEATS }, (_, rep) =>
        tags.map((tag) => (
          <span
            key={`${rep}-${tag}`}
            className="flex items-center gap-(--space-xl) whitespace-nowrap font-(family-name:--font-display) text-(length:--display-xl-size) font-bold uppercase text-(--text-primary)"
            style={{ letterSpacing: "-0.02em" }}
          >
            {tag}
            <span className="text-(--brand-primary)">·</span>
          </span>
        )),
      )}
    </div>
  );
}

// direction flips which way the row drifts by default; the two rows moving
// opposite ways (and speeding up/reversing together on scroll) is what
// produces the crossing effect between them.
function MarqueeRow({ tags, direction }: { tags: string[]; direction: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let velocity = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const onScroll = () => {
      const scrollY = window.scrollY;
      velocity += (scrollY - lastScrollY) * SCROLL_VELOCITY_GAIN;
      lastScrollY = scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let frame = requestAnimationFrame(function tick(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      velocity *= VELOCITY_DECAY;
      offset += direction * (BASE_SPEED + velocity) * dt;

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        offset = ((offset % halfWidth) + halfWidth) % halfWidth;
      }
      track.style.transform = `translateX(${-offset}px)`;

      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [direction]);

  return (
    <div ref={trackRef} className="flex w-max will-change-transform">
      <TickerBlock tags={tags} />
      <TickerBlock tags={tags} />
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section aria-hidden="true" className="select-none overflow-hidden py-(--space-xl)">
      <div className="flex flex-col gap-(--space-md)">
        <MarqueeRow tags={TAGS} direction={1} />
        <MarqueeRow tags={[...TAGS].reverse()} direction={-1} />
      </div>
    </section>
  );
}
