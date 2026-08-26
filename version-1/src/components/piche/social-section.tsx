import { FadeImage } from "@/components/piche/fade-image";
import { AmbientVideo } from "@/components/piche/ambient-video";
import { PhotoCredit } from "@/components/piche/photo-credit";

const SOCIAL_MEDIA = [
  {
    id: "residential-aerial",
    type: "video" as const,
    src: "/videos/residential-aerial.mp4",
    poster: "/images/piche/social-balcony.webp",
    credit: "Video by N E · Pexels",
    creditHref:
      "https://www.pexels.com/video/exterior-design-of-a-residential-building-4308110/",
  },
  {
    id: "new-home-lifestyle",
    type: "video" as const,
    src: "/videos/new-home-lifestyle.mp4",
    poster: "/images/piche/news-move-in.webp",
    credit: "Video by Ketut Subiyanto · Pexels",
    creditHref:
      "https://www.pexels.com/video/a-couple-moving-in-together-on-a-new-place-4277904/",
  },
  {
    id: "modern-interior",
    type: "video" as const,
    src: "/videos/modern-interior.mp4",
    poster: "/images/piche/social-interior.webp",
    credit: "Video by Taryn Elliott · Pexels",
    creditHref: "https://www.pexels.com/video/modern-living-room-3769951/",
  },
  {
    id: "material-detail",
    type: "image" as const,
    src: "/images/piche/social-material.webp",
    credit: "Concept visualization",
    creditHref: "",
  },
];

export function SocialSection() {
  return (
    <section className="pt-(--space-section)">
      <div className="mb-(--space-xl) flex items-end justify-between gap-(--space-xl)">
        <div className="flex flex-col gap-(--space-sm)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
            style={{ lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Life, in motion
          </h2>
          <p className="m-0 text-(length:--body-md-size) text-(--text-mute)">
            Architecture, interiors and the everyday moments that make a home
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-(--grid-gutter) lg:grid-cols-4 lg:grid-rows-2 lg:aspect-16/7">
        {SOCIAL_MEDIA.map((media, i) => (
          <div
            key={media.id}
            data-reveal="blur"
            style={{ "--i": i } as React.CSSProperties}
            className={`group relative aspect-square overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card) lg:aspect-auto ${
              i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <div data-parallax="0.08" className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
              {media.type === "video" ? (
                <AmbientVideo
                  src={media.src}
                  poster={media.poster}
                  className="transition-transform duration-700 ease-(--ease-standard) group-hover:scale-105"
                />
              ) : (
                <FadeImage
                  src={media.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-(--ease-standard) group-hover:scale-110"
                />
              )}
            </div>
            <PhotoCredit credit={media.credit} href={media.creditHref} />
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
