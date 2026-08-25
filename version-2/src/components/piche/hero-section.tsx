import { DsButton } from "./ds-button";
import { ImageSlot, PhotoCredit } from "./image-slot";
import { PHOTOS } from "@/lib/piche-data";

export function HeroSection() {
  return (
    <section id="top" className="relative h-[720px] overflow-hidden bg-(--carbon-dark)">
      <div className="absolute inset-0">
        <ImageSlot
          photo={PHOTOS.facadeDark}
          alt="All PICHE living projects"
          sizes="100vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/72 from-0% via-black/42 via-42% to-black/12 to-100%" />
        <PhotoCredit photo={PHOTOS.facadeDark} />
      </div>
      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-(--container-max) flex-col justify-end gap-6 px-8 pb-[88px]">
        <h1 className="type-hero max-w-[900px] text-pretty text-(--text-on-dark)">
          New Apartments for Sale – Energy-Efficient Homes in a Modern Living
          Environment
        </h1>
        <p className="type-promo max-w-[720px] text-pretty text-(--pale-silver)">
          Choose your home in new developments across Rīga, Mārupe and the
          surrounding areas
        </p>
        <div className="pointer-events-auto flex items-center gap-4">
          <DsButton href="#projects" className="min-w-[150px]">
            View projects
          </DsButton>
          <DsButton
            href="#explore"
            variant="secondary-translucent"
            className="min-w-[150px]"
          >
            Explore in 3D
          </DsButton>
        </div>
      </div>
    </section>
  );
}
