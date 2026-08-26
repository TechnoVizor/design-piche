"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { InlineMessage } from "@/components/piche/inline-message";

// Sits as the first child of the wrapper spanning Explore3D through Contact
// (see page.tsx). `bottom`-anchored sticky only engages while scrolling *up*
// past an element, not while scrolling down through it — the opposite of
// what a "stays pinned while you scroll down" bar needs. So instead this is
// `top: 0` sticky (the well-understood, scroll-down-pinning direction) on a
// full-viewport-height shell, with the bar itself flex-aligned to the
// bottom of that shell. `position: sticky` still reserves its box's height
// in normal flow (unlike `fixed`), so a negative bottom margin equal to
// that height cancels the gap it would otherwise push into the page. The
// shell is pointer-events-none (it overlays all the content below it)
// except where the actual bar sits.
export function StickyViewingBar() {
  const [sent, setSent] = useState(false);

  return (
    <div className="sticky top-0 z-30 mb-[-100dvh] flex h-dvh items-end justify-center pb-(--space-lg) pointer-events-none">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="pointer-events-auto flex w-full max-w-160 items-center gap-(--space-md) rounded-(--radius-full-ds) bg-(--surface-canvas) p-(--space-sm) pl-(--space-lg) shadow-[0_20px_44px_-16px_rgba(0,0,0,0.35)]"
      >
        {sent ? (
          <div className="flex-1">
            <InlineMessage tone="success">
              Thanks — our sales team will be in touch shortly.
            </InlineMessage>
          </div>
        ) : (
          <input
            required
            placeholder="Tell us what you're looking for — we'll arrange a viewing"
            className="min-w-0 flex-1 border-none bg-transparent text-(length:--body-md-size) text-(--text-primary) outline-none placeholder:text-(--text-mute)"
          />
        )}
        <button
          type="submit"
          aria-label="Send request"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-(--text-primary) text-(--surface-canvas) transition-transform duration-(--duration-fast) ease-(--ease-standard) hover:scale-105 active:scale-95"
        >
          <ArrowUp className="size-4.5" />
        </button>
      </form>
    </div>
  );
}
