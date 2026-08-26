import { FadeImage } from "@/components/piche/fade-image";
import { NEWS } from "@/lib/piche-data";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function NewsSection() {
  return (
    <section id="news" className="scroll-mt-(--nav-height) pt-(--space-section)">
      <div className="mb-(--space-xl) flex items-end justify-between gap-(--space-xl)">
        <h2
          className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
          style={{ lineHeight: 1.05, letterSpacing: "-0.025em" }}
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
      <div className="grid grid-cols-1 gap-(--space-lg) sm:grid-cols-3 lg:grid-rows-2 lg:aspect-3/2">
        {NEWS.map((n, i) => (
          <div
            key={n.id}
            data-reveal
            className={`group flex h-full flex-col gap-(--space-md) ${
              i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <div
              data-reveal="blur"
              className="relative aspect-4/3 overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card) sm:aspect-auto sm:flex-1"
            >
              <a
                href="#news"
                className="absolute inset-0 z-0 rounded-(--radius-md-ds) focus-visible:outline-2 focus-visible:outline-(--focus-ring) focus-visible:outline-offset-2"
              >
                <div data-parallax="0.08" className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
                  <FadeImage
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-standard) group-hover:scale-105"
                  />
                </div>
              </a>
              <PhotoCredit credit={n.credit} href={n.creditHref} />
            </div>
            <a href="#news" className="flex flex-col gap-(--space-md)">
              <span className="text-(length:--caption-md-size) font-medium text-(--text-mute)">
                {n.date}
              </span>
              <span className="text-(length:--heading-md-size) font-semibold text-(--text-primary) transition-colors duration-(--duration-base) group-hover:text-(--brand-primary)">
                {n.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
