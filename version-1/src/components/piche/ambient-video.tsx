"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AmbientVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting && !reduceMotion) {
          if (!video.src) {
            video.src = src;
            video.load();
          }
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.08 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
