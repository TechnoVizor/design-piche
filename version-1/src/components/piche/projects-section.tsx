import { FadeImage } from "@/components/piche/fade-image";
import { PROJECTS } from "@/lib/piche-data";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-(--nav-height) pt-(--space-section)">
      <div className="mb-(--space-xl) flex items-end justify-between gap-(--space-xl)">
        <div className="flex flex-col gap-(--space-sm)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
            style={{ lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Our living projects
          </h2>
          <p className="m-0 text-(length:--body-md-size) text-(--text-mute)">
            Apartments and row houses in Mārupe, Rīga and the surrounding
            areas
          </p>
        </div>
        <a
          href="#projects"
          className="text-(length:--link-md-size) font-semibold text-(--text-link)"
        >
          All projects →
        </a>
      </div>
      <div className="grid grid-cols-1 gap-(--space-lg) sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:aspect-16/7">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className={`group flex h-full flex-col gap-(--space-md) transition-transform duration-(--duration-base) ease-(--ease-standard) hover:-translate-y-1 ${
              i === 0
                ? "lg:col-span-2 lg:row-span-2"
                : i === 1
                  ? "lg:col-span-2"
                  : "lg:col-span-1"
            }`}
          >
            <div
              data-reveal="blur"
              className="relative aspect-square overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card) lg:aspect-auto lg:flex-1"
            >
              <a
                href={p.href}
                className="absolute inset-0 z-0 rounded-(--radius-md-ds) focus-visible:outline-2 focus-visible:outline-(--focus-ring) focus-visible:outline-offset-2"
              >
                <div data-parallax="0.08" className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
                  <FadeImage
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-standard) group-hover:scale-105"
                  />
                </div>
              </a>
              <PhotoCredit credit={p.credit} href={p.creditHref} />
              <div className="pointer-events-none absolute bottom-(--space-md) left-(--space-md) flex gap-(--space-sm)">
                <PinOverlayPill>{p.location}</PinOverlayPill>
                <PinOverlayPill tone="dark">{p.status}</PinOverlayPill>
              </div>
            </div>
            <a href={p.href} className="flex flex-col gap-(--space-md)">
              <span className="text-(length:--heading-md-size) font-semibold text-(--text-primary) transition-colors duration-(--duration-base) group-hover:text-(--brand-primary)">
                {p.name}
              </span>
              <span className="text-(length:--body-sm-size) text-(--text-mute)">
                {p.meta}
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
