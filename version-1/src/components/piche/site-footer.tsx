import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/piche/wordmark";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Residential projects", href: "#projects" },
      { label: "Explore in 3D", href: "#explore" },
      { label: "Financing partners", href: "#financing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "News", href: "#news" },
      { label: "Contacts", href: "#contacts" },
      { label: "PICHE Group", href: "https://piche.eu" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Priežu Rezidences", href: "#projects" },
      { label: "Mežaparka rezidences", href: "#projects" },
      { label: "Krūmiņsala 29", href: "#projects" },
    ],
  },
];

const FOOTER_LINK_CLASS =
  "w-fit text-(length:--body-sm-size) text-(--text-on-dark-mute) transition-colors duration-(--duration-base) hover:text-(--text-on-dark) focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-primary)";

export function SiteFooter({
  brand = "PICHE",
  legal = "© 2026 PICHE. All rights reserved.",
}: {
  brand?: string;
  legal?: string;
}) {
  return (
    <footer className="bg-(--surface-dark) px-(--container-pad) pb-(--space-xxl) text-(--text-on-dark)">
      <div className="mx-auto max-w-[1560px] border-t border-white/12 pt-[clamp(3rem,6vw,5rem)]">
        <div className="grid gap-[clamp(3rem,7vw,7rem)] lg:grid-cols-[minmax(320px,1.1fr)_minmax(0,1fr)]">
          <div className="flex max-w-[560px] flex-col items-start gap-(--space-xl)">
            <Wordmark text={brand} size={38} />
            <p
              className="m-0 text-balance font-(family-name:--font-display) text-[clamp(1.75rem,3.2vw,3.5rem)] font-semibold"
              style={{ lineHeight: 1.04, letterSpacing: "-0.045em" }}
            >
              Thoughtful homes for the way life is lived.
            </p>
            <a
              href="#contacts"
              className="group mt-(--space-sm) inline-flex items-center gap-(--space-md) rounded-full border border-white/20 py-2 pr-2 pl-5 font-semibold transition-[border-color,background-color] duration-(--duration-base) hover:border-white/40 hover:bg-white/6"
            >
              Apply for a viewing
              <span className="flex size-9 items-center justify-center rounded-full bg-(--brand-primary) text-(--text-on-primary)">
                <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-(--space-xl) gap-y-(--space-xxl) sm:grid-cols-3">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-(--space-md)">
                <h3 className="m-0 text-(length:--body-sm-strong-size) font-semibold text-(--text-on-dark)">
                  {col.title}
                </h3>
                <div className="flex flex-col gap-(--space-md)">
                  {col.links.map((link) => (
                    <a key={link.label} href={link.href} className={FOOTER_LINK_CLASS}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-[clamp(3rem,7vw,7rem)] flex flex-col gap-(--space-lg) border-t border-white/12 pt-(--space-xl) sm:flex-row sm:items-center sm:justify-between">
          <span className="text-(length:--caption-sm-size) text-(--text-on-dark-mute)">
            {legal}
          </span>
          <div id="privacy-policy" className="flex flex-wrap gap-x-(--space-xl) gap-y-(--space-md)">
            <a href="#privacy-policy" className={FOOTER_LINK_CLASS}>
              Privacy policy
            </a>
            <a href="#privacy-policy" className={FOOTER_LINK_CLASS}>
              Cookie settings
            </a>
            <a href="#privacy-policy" className={FOOTER_LINK_CLASS}>
              Terms of use
            </a>
            <a href="#top" className={FOOTER_LINK_CLASS}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
