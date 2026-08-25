import Image from "next/image";
import { PicheButton } from "@/components/piche/piche-button";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";
import { PhotoCredit } from "@/components/piche/photo-credit";

export function HeroSection() {
  return (
    <>
      <section className="hero-in flex flex-col items-center gap-(--space-xl) py-(--space-section) pb-(--space-xxl) text-center">
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

      <section
        data-reveal="scale"
        className="group relative aspect-21/9 overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-dark)"
      >
        <Image
          src="https://images.unsplash.com/photo-1755103114153-eb0a66e3725a?fm=jpg&q=70&w=2000&auto=format&fit=crop"
          alt="All PICHE projects in one video"
          fill
          sizes="(min-width: 1280px) 1232px, 100vw"
          className="object-cover transition-transform duration-700 ease-(--ease-standard) group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-(--space-lg)">
          <span className="relative flex h-22 w-22 items-center justify-center rounded-full bg-(--surface-canvas) text-2xl text-(--text-primary) shadow-lg transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover:scale-110">
            <span className="absolute inset-0 hidden rounded-full bg-(--surface-canvas)/60 group-hover:block group-hover:animate-ping" />
            <span className="relative">▶</span>
          </span>
          <PinOverlayPill>
            Intro video · all of our projects in one video
          </PinOverlayPill>
        </div>
        <PhotoCredit
          credit="Photo by Haberdoedas on Unsplash"
          href="https://unsplash.com/@haberdoedas"
        />
      </section>
    </>
  );
}
