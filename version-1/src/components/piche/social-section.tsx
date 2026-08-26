import { FadeImage } from "@/components/piche/fade-image";
import { SOCIAL_IMAGES } from "@/lib/piche-data";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function SocialSection() {
  return (
    <section className="pt-(--space-section)">
      <div className="mb-(--space-xl) flex items-end justify-between gap-(--space-xl)">
        <div className="flex flex-col gap-(--space-sm)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
            style={{ lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            From our living projects
          </h2>
          <p className="m-0 text-(length:--body-md-size) text-(--text-mute)">
            Social media posts about the homes we are building right now
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-(--grid-gutter) lg:grid-cols-4 lg:grid-rows-2 lg:aspect-16/7">
        {SOCIAL_IMAGES.map((s, i) => (
          <div
            key={s.id}
            data-reveal="blur"
            style={{ "--i": i } as React.CSSProperties}
            className={`group relative aspect-square overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card) lg:aspect-auto ${
              i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <div data-parallax="0.08" className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
              <FadeImage
                src={s.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-(--ease-standard) group-hover:scale-110"
              />
            </div>
            <PhotoCredit credit={s.credit} href={s.creditHref} />
          </div>
        ))}
        <a
          href="#"
          className="group flex flex-col items-start justify-between gap-(--space-lg) overflow-hidden rounded-(--radius-md-ds) bg-(--surface-dark) p-(--space-lg) text-(--text-on-dark) transition-colors duration-(--duration-base) ease-(--ease-standard) hover:bg-(--ink-900)"
        >
          <span className="text-(length:--heading-md-size) font-semibold">
            Follow PICHE
          </span>
          <span className="text-(length:--display-lg-size) transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
