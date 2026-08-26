import { FadeImage } from "@/components/piche/fade-image";
import { PicheButton } from "@/components/piche/piche-button";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";
import { SearchBar } from "@/components/piche/search-bar";
import { FilterChip } from "@/components/piche/filter-chip";
import { PROJECTS } from "@/lib/piche-data";

const CATEGORIES = ["Apartments", "Row houses", "Business parks", "Offices"];

export function HeroSection() {
  const flagship = PROJECTS[0];

  return (
    <>
      <section className="hero-in flex flex-col items-center gap-(--space-xl) py-(--space-section) pb-(--space-xxl) text-center">
        <h1
          className="m-0 max-w-245 font-(family-name:--font-display) text-(length:--display-xl-size) font-semibold text-(--text-primary)"
          style={{ lineHeight: 1.02, letterSpacing: "-0.03em" }}
        >
          New apartments for sale
        </h1>
        <p className="m-0 max-w-180 text-(length:--heading-lg-size) leading-[1.35] text-(--text-body)">
          Energy-efficient homes across Rīga, Mārupe and the surrounding areas
        </p>
        <div className="flex gap-(--space-md)">
          <PicheButton asChild>
            <a href="#projects">See all projects</a>
          </PicheButton>
          <PicheButton asChild variant="secondary">
            <a href="#explore">Explore in 3D</a>
          </PicheButton>
        </div>
      </section>

      <div
        data-parallax="0.35"
        className="relative z-20 mx-auto -mb-8 w-full max-w-2xl px-(--space-lg)"
      >
        <div className="rounded-(--radius-full-ds) bg-(--surface-canvas) p-(--space-sm) shadow-[0_20px_44px_-16px_rgba(0,0,0,0.22)]">
          <SearchBar placeholder="Search projects, apartments, locations" />
        </div>
      </div>

      <section
        data-reveal="scale"
        className="group relative aspect-21/9 overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-dark)"
      >
        <div data-parallax="0.12" className="absolute inset-x-0 -top-[12%] -bottom-[12%]">
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="All PICHE projects in one video"
            className="h-full w-full object-cover transition-transform duration-700 ease-(--ease-standard) group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-(--space-lg)">
          <PinOverlayPill>
            Intro video · all of our projects in one video
          </PinOverlayPill>
        </div>
        <div className="absolute inset-x-0 bottom-(--space-xxl) flex flex-wrap justify-center gap-(--space-sm) px-(--space-lg)">
          {CATEGORIES.map((category, i) => (
            <FilterChip key={category} active={i === 0}>
              {category}
            </FilterChip>
          ))}
        </div>
      </section>

      <div
        data-parallax="0.35"
        className="relative z-20 mx-auto -mt-8 w-full max-w-3xl px-(--space-lg)"
      >
        <a
          href={flagship.href}
          className="flex items-center gap-(--space-lg) rounded-(--radius-lg-ds) bg-(--surface-canvas) p-(--space-lg) shadow-[0_20px_44px_-16px_rgba(0,0,0,0.22)] transition-transform duration-(--duration-base) ease-(--ease-standard) hover:-translate-y-1"
        >
          <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card)">
            <FadeImage
              src={flagship.image}
              alt={flagship.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-(--space-xxs) text-left">
            <span className="text-(length:--body-sm-size) font-semibold text-(--brand-primary)">
              {flagship.status}
            </span>
            <span className="truncate text-(length:--heading-md-size) font-semibold text-(--text-primary)">
              {flagship.name}
            </span>
            <span className="truncate text-(length:--body-sm-size) text-(--text-mute)">
              {flagship.meta}
            </span>
          </div>
          <span className="shrink-0 text-(length:--heading-lg-size) text-(--text-mute)">
            →
          </span>
        </a>
      </div>
    </>
  );
}
