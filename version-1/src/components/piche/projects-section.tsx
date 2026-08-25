import Image from "next/image";
import { PROJECTS } from "@/lib/piche-data";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-(--space-section)">
      <div className="mb-(--space-xl) flex items-end justify-between gap-(--space-xl)">
        <div className="flex flex-col gap-(--space-sm)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
            style={{ letterSpacing: "-0.8px" }}
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
      <div className="grid grid-cols-1 gap-(--space-lg) sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((p) => (
          <div key={p.id} className="flex flex-col gap-(--space-md)">
            <div className="relative aspect-square overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card)">
              <a href={p.href} className="absolute inset-0 z-0">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </a>
              <PhotoCredit credit={p.credit} href={p.creditHref} />
              <div className="pointer-events-none absolute bottom-(--space-md) left-(--space-md) flex gap-(--space-sm)">
                <PinOverlayPill>{p.location}</PinOverlayPill>
                <PinOverlayPill tone="dark">{p.status}</PinOverlayPill>
              </div>
            </div>
            <a href={p.href} className="flex flex-col gap-(--space-md)">
              <span className="text-(length:--heading-md-size) font-semibold text-(--text-primary)">
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
