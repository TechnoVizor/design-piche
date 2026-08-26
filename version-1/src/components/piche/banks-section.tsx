import Image from "next/image";
import { BANKS } from "@/lib/piche-data";

export function BanksSection() {
  return (
    <section id="financing" className="scroll-mt-(--nav-height) pt-(--space-section)">
      <div className="flex flex-col gap-(--space-xl) rounded-(--radius-lg-ds) bg-(--surface-card) p-(--space-xxl)">
        <div className="flex flex-col gap-(--space-sm)">
          <h2
            className="m-0 text-(length:--heading-xl-size) font-bold text-(--text-primary)"
            style={{ letterSpacing: "-0.03em" }}
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
              aria-label={`View ${bank.name} home financing offer`}
              title={bank.name}
              className="group flex h-22 items-center justify-center rounded-(--radius-md-ds) bg-(--surface-canvas) px-(--space-md) transition-[background-color,box-shadow,transform] duration-(--duration-base) ease-(--ease-standard) hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_20px_-12px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={bank.logo}
                alt=""
                width={bank.logoWidth}
                height={bank.logoHeight}
                className={`${bank.logoClass} h-auto w-auto object-contain transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover:scale-[1.04]`}
              />
              <span className="sr-only">{bank.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
