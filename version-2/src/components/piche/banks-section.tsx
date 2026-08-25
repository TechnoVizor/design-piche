import { BANKS } from "@/lib/piche-data";

export function BanksSection() {
  return (
    <section
      id="banks"
      className="mx-auto flex scroll-mt-16 max-w-(--container-max) flex-col gap-8 px-8 py-16"
    >
      <div className="flex flex-col gap-2">
        <h2 className="type-section text-(--text-heading)">Choose a bank</h2>
        <span className="type-body text-(--text-tertiary)">
          Click to view offer
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {BANKS.map((b) => (
          <a
            key={b.name}
            href={b.href}
            target="_blank"
            rel="noopener"
            className="type-category flex h-[88px] items-center justify-center rounded-(--radius-control) border border-(--border-divider) bg-(--white) text-(--text-heading) transition-[border-color,color] duration-[.33s] hover:border-(--electric-blue) hover:text-(--electric-blue)"
          >
            {b.name}
          </a>
        ))}
      </div>
    </section>
  );
}
