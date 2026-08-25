import { BANKS } from "@/lib/piche-data";

export function BanksSection() {
  return (
    <section className="pt-(--space-section)">
      <div className="flex flex-col gap-(--space-xl) rounded-(--radius-lg-ds) bg-(--surface-card) p-(--space-xxl)">
        <div className="flex flex-col gap-(--space-sm)">
          <h2
            className="m-0 text-(length:--heading-xl-size) font-bold text-(--text-primary)"
            style={{ letterSpacing: "-1.2px" }}
          >
            Choose a bank
          </h2>
          <p className="m-0 text-(length:--body-md-size) text-(--text-mute)">
            Financing partners for buying a home. Click to view offer.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-(--space-md) sm:grid-cols-3 lg:grid-cols-6">
          {BANKS.map((bank) => (
            <a
              key={bank.name}
              href={bank.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-22 items-center justify-center rounded-(--radius-md-ds) bg-(--surface-canvas) text-(length:--body-strong-size) font-semibold text-(--text-primary) hover:text-(--brand-primary)"
            >
              {bank.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
