const FOOTER_COLUMNS = [
  {
    title: "Projects",
    links: [
      "Priežu Rezidences apartments",
      "Priežu Rezidences row houses",
      "Mežaparka rezidences",
      "Krūmiņsala 29",
    ],
  },
  {
    title: "Company",
    links: ["About us", "News", "Contacts", "piche.eu"],
  },
  {
    title: "Buying a home",
    links: [
      "Price lists",
      "Financing partners",
      "Apply for a viewing",
      "Frequently asked questions",
    ],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Cookie settings", "Terms of use"],
  },
];

export function SiteFooter({
  brand = "PICHE",
  legal = "© 2026 PICHE. All rights reserved.",
}: {
  brand?: string;
  legal?: string;
}) {
  return (
    <footer className="border-t border-(--border-hairline) bg-(--surface-canvas) px-(--container-pad) py-(--space-section)">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-2 gap-(--space-xxl) sm:grid-cols-4">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-(--space-md)">
            <span className="text-(length:--body-sm-size) font-bold text-(--text-primary)">
              {col.title}
            </span>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-(length:--body-sm-size) text-(--text-mute) no-underline hover:text-(--text-primary)"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-(--container-max) items-center gap-(--space-md) pt-(--space-xxl)">
        <span
          className="font-(family-name:--font-display) font-bold text-(--brand-primary)"
          style={{ fontSize: 16, letterSpacing: "-0.4px" }}
        >
          {brand}
        </span>
        <span className="text-(length:--caption-sm-size) text-(--text-mute)">
          {legal}
        </span>
      </div>
    </footer>
  );
}
