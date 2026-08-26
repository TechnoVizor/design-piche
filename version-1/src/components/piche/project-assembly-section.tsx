import Image from "next/image";

export function ProjectAssemblySection() {
  return (
    <section className="overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-dark)">
      <div className="grid grid-cols-1 items-center gap-(--space-section) px-(--container-pad) py-(--space-section) lg:grid-cols-2">
        <div className="flex flex-col gap-(--space-lg)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-on-dark)"
            style={{ lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            From first sketch to move-in day
          </h2>
          <p className="m-0 max-w-120 text-(length:--body-md-size) text-(--text-on-dark-mute)">
            Every PICHE home starts as a plan on paper and ends as a place to
            live.
          </p>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/orig.png"
            alt="Completed PICHE home"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
