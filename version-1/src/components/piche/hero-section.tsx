"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeImage } from "@/components/piche/fade-image";
import { PicheButton } from "@/components/piche/piche-button";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";
import { FilterChip } from "@/components/piche/filter-chip";
import { PROJECTS } from "@/lib/piche-data";

const HERO_CATEGORIES = [
  {
    id: "projects",
    label: "All projects",
    video: "/hero.mp4",
    pill: "PICHE residential projects",
    title: "New apartments",
    highlight: "for sale",
    description:
      "Energy-efficient homes across Rīga, Mārupe and the surrounding areas",
  },
  {
    id: "architecture",
    label: "Architecture",
    video: "/videos/residential-aerial.mp4",
    pill: "Architecture · neighbourhoods shaped around people",
    title: "Designed around",
    highlight: "everyday life",
    description:
      "Considered buildings, green courtyards and connections that make coming home feel easy",
  },
  {
    id: "interiors",
    label: "Interiors",
    video: "/videos/modern-interior.mp4",
    pill: "Interiors · light, calm and functional",
    title: "Space to make",
    highlight: "your own",
    description:
      "Bright, practical rooms with thoughtful details and the flexibility to grow with you",
  },
  {
    id: "home-life",
    label: "Life at home",
    video: "/videos/new-home-lifestyle.mp4",
    pill: "Life at home · new beginnings",
    title: "A place for",
    highlight: "new beginnings",
    description:
      "Homes made for first mornings, shared plans and all the moments that follow",
  },
] as const;

// One full-height rounded frame instead of a stack of bands: the intro video
// fills it and the headline, chips, buttons and flagship card all sit on top
// of the footage rather than above or below it.
export function HeroSection() {
  const flagship = PROJECTS[0];
  const [activeId, setActiveId] = useState<(typeof HERO_CATEGORIES)[number]["id"]>(
    HERO_CATEGORIES[0].id,
  );
  const [previousId, setPreviousId] = useState<string | null>(null);
  const [readyId, setReadyId] = useState<string>(HERO_CATEGORIES[0].id);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = HERO_CATEGORIES.find((item) => item.id === activeId) ?? HERO_CATEGORIES[0];

  useEffect(
    () => () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    },
    [],
  );

  const selectCategory = (id: (typeof HERO_CATEGORIES)[number]["id"]) => {
    if (id === activeId) return;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setPreviousId(activeId);
    setActiveId(id);
  };

  const finishVideoTransition = (id: string) => {
    if (id !== activeId) return;
    setReadyId(id);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setPreviousId(null), 720);
  };

  return (
    <section className="mb-(--space-section) pt-(--space-lg)">
      {/* grid-cols-1 rather than a bare `grid`: the implicit column would size
          itself to the widest text inside and push the whole frame past the
          viewport on a phone. minmax(0,1fr) pins it to the frame instead. */}
      {/* isolate + explicit z on every layer: the video is absolutely
          positioned, so without a stacking context of its own it would paint
          above the static scrim and overlay text that are meant to sit on it. */}
      <div className="relative isolate grid min-h-[calc(100svh-var(--nav-height)-var(--space-xl))] grid-cols-1 overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-dark)">
        <div className="relative z-0 col-start-1 row-start-1 overflow-hidden">
          <div
            data-parallax="0.1"
            className="absolute inset-x-0 top-[-8%] bottom-[-8%]"
          >
            {HERO_CATEGORIES.filter(
              (category) => category.id === activeId || category.id === previousId,
            ).map((category) => {
              const isActive = category.id === activeId;
              const isReady = readyId === category.id;

              return (
                <video
                  key={category.id}
                  src={category.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={category.id === HERO_CATEGORIES[0].id ? "auto" : "metadata"}
                  aria-hidden="true"
                  onCanPlay={() => finishVideoTransition(category.id)}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-(--ease-standard) ${
                    isActive ? "z-10" : "z-0"
                  } ${isActive && !isReady ? "opacity-0" : "opacity-100"}`}
                />
              );
            })}
          </div>
        </div>

        {/* Legibility scrim: weighted to the bottom, where the headline sits,
            so the sky at the top of the frame stays open. */}
        <div
          aria-hidden="true"
          className="z-10 col-start-1 row-start-1 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.45)_32%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.28)_100%)]"
        />

        {/* justify-end below sm, where the pill is hidden and justify-between
            would collapse to flex-start and strand the copy at the top. */}
        <div className="z-20 col-start-1 row-start-1 flex min-w-0 flex-col justify-end gap-(--space-xl) p-(--space-xl) sm:justify-between sm:p-(--space-xxl) lg:p-12">
          {/* Hidden on phones: at that width it wraps to two lines and eats the
              room the headline needs, and the footage reads as video anyway. */}
          <div className="hidden min-w-0 justify-end sm:flex">
            <PinOverlayPill tone="dark">
              {active.pill}
            </PinOverlayPill>
          </div>

          <div className="flex w-full min-w-0 flex-col items-start gap-(--space-xl) lg:flex-row lg:items-end lg:justify-between lg:gap-(--space-section)">
            <div className="hero-in flex w-full min-w-0 flex-col items-start gap-(--space-lg) lg:max-w-4xl">
              <div className="flex flex-wrap gap-(--space-sm)">
                {HERO_CATEGORIES.map((category) => (
                  <FilterChip
                    key={category.id}
                    tone="dark"
                    active={category.id === activeId}
                    onClick={() => selectCategory(category.id)}
                  >
                    {category.label}
                  </FilterChip>
                ))}
              </div>

              <h1
                key={`heading-${active.id}`}
                className="m-0 font-(family-name:--font-display) text-(length:--display-hero-size) font-semibold text-(--text-on-dark)"
                style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
              >
                {active.title}
                <span className="mt-[0.14em] block">
                  <span className="inline-block rounded-[0.18em] bg-(--brand-primary) px-[0.24em] py-[0.16em] leading-none text-(--text-on-primary)">
                    {active.highlight}
                  </span>
                </span>
              </h1>

              <p
                key={`description-${active.id}`}
                className="m-0 w-full text-pretty text-(length:--heading-lg-size) leading-[1.35] text-(--text-on-dark-mute) lg:max-w-140"
              >
                {active.description}
              </p>

              <div className="flex flex-wrap gap-(--space-md)">
                <PicheButton asChild>
                  <a href="#projects">See all projects</a>
                </PicheButton>
                <PicheButton asChild variant="secondary">
                  <a href="#explore">Explore in 3D</a>
                </PicheButton>
              </div>
            </div>

            <a
              href={flagship.href}
              className="group flex w-full min-w-0 items-center gap-(--space-lg) rounded-(--radius-md-ds) bg-white/12 p-(--space-lg) backdrop-blur-md transition-colors duration-(--duration-base) ease-(--ease-standard) hover:bg-white/22 lg:max-w-105 lg:shrink-0"
            >
              <div className="relative aspect-square h-18 w-18 shrink-0 overflow-hidden rounded-(--radius-sm-ds) bg-(--surface-dark)">
                <FadeImage
                  src={flagship.image}
                  alt={flagship.name}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-(--space-xxs) text-left">
                <span className="text-(length:--body-sm-size) font-semibold text-(--brand-primary)">
                  {flagship.status}
                </span>
                <span className="text-(length:--heading-md-size) font-semibold text-balance text-(--text-on-dark)">
                  {flagship.name}
                </span>
                <span className="truncate text-(length:--body-sm-size) text-(--text-on-dark-mute)">
                  {flagship.meta}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 text-(length:--heading-lg-size) text-(--text-on-dark-mute) transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Scroll cue — centred at the foot of the frame, the one strip the
            headline (left) and the flagship card (right) both leave free. */}
        <div className="pointer-events-none z-20 col-start-1 row-start-1 hidden items-end justify-center pb-(--space-xl) lg:flex">
          <a
            href="#projects"
            aria-label="Scroll to the projects"
            className="scroll-cue pointer-events-auto grid size-11 place-items-center rounded-(--radius-full-ds) bg-white/15 text-(--text-on-dark) backdrop-blur-md transition-colors duration-(--duration-base) ease-(--ease-standard) hover:bg-white/30"
          >
            <ChevronDown className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
