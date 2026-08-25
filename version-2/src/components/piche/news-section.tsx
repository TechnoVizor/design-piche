import { CreditChip, ImageSlot } from "./image-slot";
import { NEWS, SOCIAL } from "@/lib/piche-data";

export function NewsSection() {
  return (
    <section id="news" className="scroll-mt-16 bg-(--surface-alt) py-16">
      <div className="mx-auto max-w-(--container-max) px-8">
        <div className="mb-8 flex items-baseline justify-between gap-8">
          <h2 className="type-section text-(--text-heading)">News</h2>
          <a href="#news" className="type-sublink text-(--text-tertiary)">
            All news
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {NEWS.map((n) => (
            <a
              key={n.title}
              href="#news"
              className="group block overflow-hidden rounded-(--radius-card) bg-(--white)"
            >
              <div className="relative aspect-video">
                <ImageSlot
                  photo={n.photo}
                  alt={n.title}
                  sizes="(max-width: 768px) 100vw, 440px"
                />
                <CreditChip photo={n.photo} />
              </div>
              <div className="flex flex-col gap-2 p-(--space-3)">
                <span className="type-body text-(--text-tertiary)">{n.date}</span>
                <span className="text-pretty text-[17px]/[24px] font-medium text-(--text-heading)">
                  {n.title}
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-(--space-3)">
          <div className="flex items-baseline justify-between gap-8">
            <h3 className="type-category text-(--text-heading)">
              From our social channels
            </h3>
            <span className="type-body text-(--text-tertiary)">
              Living projects only
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {SOCIAL.map((s, i) => (
              <a
                key={i}
                href="#news"
                className="group relative block aspect-square overflow-hidden rounded-(--radius-card)"
              >
                <ImageSlot
                  photo={s.photo}
                  alt={s.label}
                  sizes="(max-width: 768px) 50vw, 325px"
                />
                <CreditChip photo={s.photo} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
