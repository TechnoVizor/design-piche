"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/piche/wordmark";
import { SearchBar } from "@/components/piche/search-bar";
import { LangSwitch } from "@/components/piche/lang-switch";
import { PicheButton } from "@/components/piche/piche-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About us" },
  { href: "#news", label: "News" },
  { href: "#contacts", label: "Contacts" },
];

const CHOOSER_URL = "https://piche-chooser.vercel.app/";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b bg-(--surface-canvas) transition-[box-shadow,border-color] duration-(--duration-base) ease-(--ease-standard)",
        scrolled
          ? "border-transparent shadow-[0_1px_0_var(--border-hairline),0_8px_24px_-16px_rgba(0,0,0,0.25)]"
          : "border-(--border-hairline) shadow-none",
      )}
    >
      <div className="mx-auto flex h-(--nav-height) max-w-(--container-max) items-center gap-(--space-lg) px-(--container-pad)">
        <a
          href={CHOOSER_URL}
          className="flex shrink-0 items-center gap-(--space-xs) text-(length:--body-sm-size) font-semibold text-(--text-mute) transition-colors duration-(--duration-base) hover:text-(--brand-primary)"
        >
          <ArrowLeft className="size-4" />
          Versions
        </a>
        <span className="h-5 w-px shrink-0 bg-(--border-hairline)" />
        <Link href="#top" className="flex shrink-0 items-center">
          <Wordmark text="PICHE" size={26} />
        </Link>
        <nav className="hidden shrink-0 gap-(--space-lg) whitespace-nowrap lg:flex">
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
