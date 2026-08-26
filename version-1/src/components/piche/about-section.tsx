import { FadeImage } from "@/components/piche/fade-image";
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
            style={{ lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Real estate developer in Latvia
          </h2>
          <p className="m-0 text-(length:--body-md-size) leading-[1.4] text-(--text-body)">
            <a href="https://piche.eu" className="font-semibold">
              PICHE
            </a>{" "}
            has been building homes, business parks and industrial facilities
            across Latvia for more than 20 years.
          </p>
          <div className="flex gap-(--space-xl)">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-(--space-xxs)">
                <StatCounter
                  value={s.value}
                  className="whitespace-nowrap tracking-[-0.02em] font-(family-name:--font-display) text-(length:--heading-xl-size) font-bold text-(--text-primary)"
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
          data-reveal="blur"
          className="group relative aspect-4/3 overflow-hidden rounded-(--radius-md-ds) bg-(--surface-secondary)"
        >
          <div data-parallax="0.1" className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
            <FadeImage
              src="/images/piche/about-team.webp"
              alt="PICHE project team reviewing residential development plans"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-(--ease-standard) group-hover:scale-105"
            />
          </div>
          <PhotoCredit
            credit="Concept visualization"
            href=""
          />
        </div>
      </div>
    </section>
  );
}
