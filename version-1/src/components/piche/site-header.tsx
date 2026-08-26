"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/piche/wordmark";
import { SearchBar } from "@/components/piche/search-bar";
import { LangSwitch } from "@/components/piche/lang-switch";
import { PicheButton } from "@/components/piche/piche-button";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About us" },
  { href: "#news", label: "News" },
  { href: "#contacts", label: "Contacts" },
];

// How far the page has to scroll before the header has finished morphing from
// the full-bleed bar into the floating pill. Long enough that the change reads
// as a gradual settle rather than a snap the instant the page moves.
const HEADER_MORPH_DISTANCE = 360;

// Smoothstep — eases the morph in and out of its endpoints so the header does
// not visibly start moving on the first pixel of scroll, or stop dead on the
// last one.
const ease = (t: number) => t * t * (3 - 2 * t);

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    let last = -1;

    const apply = () => {
      ticking = false;
      const t = Math.min(Math.max(window.scrollY, 0) / HEADER_MORPH_DISTANCE, 1);
      // Quantising to 3 decimals keeps sub-pixel scroll jitter from writing a
      // new value (and so re-styling the header) on every single frame.
      const p = Math.round(ease(t) * 1000) / 1000;
      if (p === last) return;
      last = p;
      el.style.setProperty("--header-progress", String(p));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={ref} className="header-morph sticky top-0 z-30">
      <div className="header-morph-shell mx-auto flex h-(--nav-height) items-center gap-(--space-lg) border bg-(--surface-canvas) px-(--container-pad)">
        <Link href="#top" className="flex shrink-0 items-center">
          <Wordmark text="PICHE" size={30} />
        </Link>
        <nav className="ml-(--space-xl) hidden shrink-0 gap-(--space-xl) whitespace-nowrap lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-(length:--body-strong-size) font-semibold text-(--text-primary) transition-colors duration-(--duration-base) hover:text-(--brand-primary)"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-(--brand-primary) transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="hidden min-w-0 flex-1 justify-end md:flex">
          <SearchBar
            placeholder="Search projects, apartments, locations"
            className="w-full max-w-90 min-w-35 flex-1"
          />
        </div>
        <div className="ml-auto flex items-center gap-(--space-lg) md:ml-0">
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <PicheButton asChild size="md">
            <a href="#contacts">Apply now</a>
          </PicheButton>
        </div>
      </div>
    </header>
  );
}
