import Image from "next/image";
import { PhotoCredit } from "@/components/piche/photo-credit";
import { StatCounter } from "@/components/piche/stat-counter";

const STATS = [
  { value: "200+", label: "buildings designed and developed" },
  { value: "6M m²", label: "total developed area" },
  { value: "300+", label: "professionals in the team" },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-(--nav-height) pt-(--space-section)">
      <div className="grid grid-cols-1 items-center gap-(--space-section) rounded-(--radius-lg-ds) bg-(--surface-card) p-(--space-xxl) lg:grid-cols-2">
        <div className="flex flex-col gap-(--space-lg)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
            style={{ letterSpacing: "-0.8px" }}
          >
            Real estate developer in Latvia
          </h2>
          <p className="m-0 text-(length:--body-md-size) leading-[1.4] text-(--text-body)">
            <a href="https://piche.eu" className="font-semibold">
              PICHE
            </a>{" "}
            is a leading real estate developer in Latvia with more than 20
            years of experience, offering high-quality apartments, flats and
            homes for modern living. The company also designs, builds and
            manages business parks, industrial buildings, warehouses,
            logistics and production facilities, offices, apartment buildings
            and row houses.
          </p>
          <div className="flex gap-(--space-xl)">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-(--space-xxs)">
                <StatCounter
                  value={s.value}
                  className="whitespace-nowrap tracking-[-0.4px] font-(family-name:--font-display) text-(length:--heading-xl-size) font-bold text-(--text-primary)"
                />
                <span className="text-(length:--body-sm-size) text-(--text-mute)">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <a
            href="https://piche.eu"
            className="text-(length:--link-md-size) font-semibold text-(--text-link)"
          >
            More about PICHE at piche.eu →
          </a>
        </div>
        <div
          data-reveal="scale"
          className="relative aspect-4/3 overflow-hidden rounded-(--radius-md-ds) bg-(--surface-secondary)"
        >
          <Image
            src="https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?fm=jpg&q=70&w=1200&auto=format&fit=crop"
            alt="PICHE site"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <PhotoCredit
            credit="Photo by Lumbardh Plluzhina on Unsplash"
            href="https://unsplash.com/@bardhplluzhina"
          />
        </div>
      </div>
    </section>
  );
}
