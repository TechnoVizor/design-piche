export function ExploreSection() {
  return (
    <section id="explore" className="bg-(--surface-alt) py-16">
      <div className="mx-auto max-w-(--container-max) px-8">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 className="type-section text-(--text-heading)">
            Find your home on the map
          </h2>
          <span className="type-body text-(--text-tertiary)">
            Open a project, rotate the buildings, pick a floor and an apartment.
          </span>
        </div>
        <iframe
          src="/piche-explorer.html"
          title="PICHE project explorer"
          className="mt-8 h-[640px] w-full rounded-(--radius-card) border-0 bg-(--white)"
        />
      </div>
    </section>
  );
}
