import { CreditChip, ImageSlot } from "./image-slot";
import { PROJECTS } from "@/lib/piche-data";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-(--container-max) px-8 py-16">
      <div className="mb-8 flex items-baseline justify-between gap-8">
        <h2 className="type-section text-(--text-heading)">Living projects</h2>
        <a href="#projects" className="type-sublink text-(--text-tertiary)">
          All projects
        </a>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <a key={p.name} href="#explore" className="block">
            <div className="relative aspect-16/10 overflow-hidden rounded-(--radius-card) bg-(--surface-alt)">
              <ImageSlot
                photo={p.photo}
                alt={p.name}
                sizes="(max-width: 768px) 100vw, 675px"
              />
              <CreditChip photo={p.photo} />
            </div>
            <div className="flex items-baseline justify-between gap-4 pt-4">
              <div className="flex flex-col gap-1">
                <span className="type-product text-(--text-heading)">{p.name}</span>
                <span className="type-body tracking-[0.12em] text-(--text-tertiary)">
                  {p.location}
                </span>
              </div>
              <span className="type-body text-(--electric-blue)">{p.status}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
