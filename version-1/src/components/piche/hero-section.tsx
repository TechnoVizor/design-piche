import Image from "next/image";
import { PicheButton } from "@/components/piche/piche-button";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function HeroSection() {
  return (
    <>
      <section className="flex flex-col items-center gap-(--space-xl) py-(--space-section) pb-(--space-xxl) text-center">
        <h1
          className="m-0 max-w-245 font-(family-name:--font-display) text-(length:--display-xl-size) font-semibold text-(--text-primary)"
          style={{ lineHeight: 1.1, letterSpacing: "-1.2px" }}
        >
          New apartments for sale – energy-efficient homes in a modern living
          environment
        </h1>
        <p className="m-0 max-w-180 text-(length:--heading-lg-size) leading-[1.35] text-(--text-body)">
          Choose your home in new developments across Rīga, Mārupe and the
          surrounding areas
        </p>
        <div className="flex gap-(--space-md)">
          <PicheButton asChild>
            <a href="#projects">See all projects</a>
          </PicheButton>
          <PicheButton asChild variant="secondary">
            <a href="#explore">Explore in 3D</a>
          </PicheButton>
        </div>
      </section>

      <section className="relative aspect-21/9 overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-dark)">
        <Image
          src="https://images.unsplash.com/photo-1759845565036-cbecbcfcb8e2?auto=format&fit=crop&crop=entropy&q=70&w=1680&h=720"
          alt="All PICHE projects in one video"
          fill
          sizes="(min-width: 1280px) 1232px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-(--space-lg)">
          <span className="flex h-22 w-22 items-center justify-center rounded-full bg-(--surface-canvas) text-2xl text-(--text-primary)">
            ▶
          </span>
          <PinOverlayPill>
            Intro video · all of our projects in one video
          </PinOverlayPill>
        </div>
        <PhotoCredit
          credit="Photo by Joachim Lesne on Unsplash"
          href="https://unsplash.com/@joaching"
        />
      </section>
    </>
  );
}
