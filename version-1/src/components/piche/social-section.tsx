import Image from "next/image";
import { SOCIAL_IMAGES } from "@/lib/piche-data";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function SocialSection() {
  return (
    <section className="pt-(--space-section)">
      <div className="mb-(--space-xl) flex items-end justify-between gap-(--space-xl)">
        <div className="flex flex-col gap-(--space-sm)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
            style={{ letterSpacing: "-0.8px" }}
          >
            From our living projects
          </h2>
          <p className="m-0 text-(length:--body-md-size) text-(--text-mute)">
            Social media posts about the homes we are building right now
          </p>
        </div>
        <a
          href="#"
          className="text-(length:--link-md-size) font-semibold text-(--text-link)"
        >
          Follow PICHE →
        </a>
      </div>
      <div className="grid grid-cols-2 gap-(--grid-gutter) lg:grid-cols-4">
        {SOCIAL_IMAGES.map((s) => (
          <div
            key={s.id}
            className="relative aspect-square overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card)"
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
            <PhotoCredit credit={s.credit} href={s.creditHref} />
          </div>
        ))}
      </div>
    </section>
  );
}
