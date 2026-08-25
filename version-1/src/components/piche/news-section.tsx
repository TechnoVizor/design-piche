import Image from "next/image";
import { NEWS } from "@/lib/piche-data";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function NewsSection() {
  return (
    <section id="news" className="pt-(--space-section)">
      <div className="mb-(--space-xl) flex items-end justify-between gap-(--space-xl)">
        <h2
          className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
          style={{ letterSpacing: "-0.8px" }}
        >
          News
        </h2>
        <a
          href="#news"
          className="text-(length:--link-md-size) font-semibold text-(--text-link)"
        >
          All news →
        </a>
      </div>
      <div className="grid grid-cols-1 gap-(--space-lg) sm:grid-cols-3">
        {NEWS.map((n) => (
          <div key={n.id} className="flex flex-col gap-(--space-md)">
            <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card)">
              <a href="#news" className="absolute inset-0 z-0">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </a>
              <PhotoCredit credit={n.credit} href={n.creditHref} />
            </div>
            <a href="#news" className="flex flex-col gap-(--space-md)">
              <span className="text-(length:--caption-md-size) font-medium text-(--text-mute)">
                {n.date}
              </span>
              <span className="text-(length:--heading-md-size) font-semibold text-(--text-primary)">
                {n.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
