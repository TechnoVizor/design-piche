import { ImageSlot, PhotoCredit } from "./image-slot";
import { PHOTOS } from "@/lib/piche-data";

const STATS = [
  { value: "200+", label: "Buildings developed" },
  { value: "6 M m²", label: "Total area" },
  { value: "300+", label: "Professionals" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-(--container-max) grid-cols-1 items-center gap-16 px-8 py-16 lg:grid-cols-2"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-card)">
        <ImageSlot
          photo={PHOTOS.livingWide}
          alt="Inside a PICHE home"
          sizes="(max-width: 1024px) 100vw, 660px"
        />
        <PhotoCredit photo={PHOTOS.livingWide} />
      </div>
      <div className="flex max-w-[560px] flex-col gap-(--space-3)">
        <h2 className="type-section text-(--text-heading)">
          Real estate developer in Latvia – modern apartments, flats and homes
        </h2>
        <p className="text-pretty text-[15px]/[24px] text-(--text-body)">
          <a href="https://piche.eu" className="text-(--electric-blue)">
            PICHE
          </a>{" "}
          is a leading real estate developer in Latvia with more than 20 years of
          experience, offering high-quality apartments, flats, and homes for
          modern living. The company specializes not only in residential
          development, but also in the design, construction, and management of
          business parks, industrial buildings, warehouses, logistics and
          production facilities, office spaces, apartment buildings, and row
          houses.
        </p>
        <p className="text-pretty text-[15px]/[24px] text-(--text-body)">
          PICHE’s portfolio includes more than 200 designed and developed
          buildings with a total area exceeding 6 million m². The company’s team
          consists of more than 300 professionals – architects, designers,
          engineers, IT specialists, project managers, and construction experts –
          ensuring full-cycle real estate development in Latvia.
        </p>
        <div className="flex gap-16 pt-2">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="type-section text-(--text-heading)">{s.value}</span>
              <span className="type-body text-(--text-tertiary)">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
