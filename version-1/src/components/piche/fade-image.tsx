"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

// A tiny solid-tone SVG — Next blurs it into a soft placeholder, so photos
// resolve from blur to sharp instead of popping in at full brightness the
// instant they decode (which read as a flash/flare against the page).
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU1ZTAiLz48L3N2Zz4=";

// The opacity fade is applied via inline style, not a Tailwind class: every
// call site's className carries its own `transition-transform` (for hover
// effects), and tailwind-merge treats that as the same conflict group as
// `transition-opacity` — the caller's class would silently win and delete
// the fade, turning it into an instant pop instead of a fade.
// The inline `transition` shorthand also has to name `scale` itself: Tailwind
// v4's hover-zoom utility (group-hover:scale-105) animates the native CSS
// `scale` property, not `transform` — and an inline shorthand always wins
// over the className's transition-* longhands for the same properties, so
// without `scale` listed here the hover zoom snapped instead of easing.
export function FadeImage({ style, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and spread in via ...props
    <Image
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition:
          "opacity 500ms var(--ease-standard), scale 700ms var(--ease-standard)",
      }}
    />
  );
}
