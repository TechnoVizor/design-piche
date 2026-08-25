import { PicheLogoFull } from "./logo";

const COLUMNS = [
  {
    title: "Projects",
    links: [
      { label: "Priežu Rezidences row houses", href: "#projects" },
      { label: "Priežu Rezidences apartments", href: "#projects" },
      { label: "Mežaparka rezidences", href: "#projects" },
      { label: "Krūmiņsala 29", href: "#projects" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "News", href: "#news" },
      { label: "Contacts", href: "#contacts" },
      { label: "Explore in 3D", href: "#explore" },
    ],
  },
  {
    title: "Buying",
    links: [
      { label: "Choose a bank", href: "#banks" },
      { label: "Apply now", href: "#contacts" },
      { label: "Privacy policy", href: "#contacts" },
      { label: "Cookie settings", href: "#contacts" },
    ],
  },
];

const footerLink =
  "type-body text-(--silver-fog) transition-[color] duration-[.33s] hover:text-(--white)";

export function SiteFooter() {
  return (
    <footer className="border-t border-(--graphite) bg-(--carbon-dark) pt-16 pb-8">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-16 px-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div className="flex flex-col items-start gap-(--space-3)">
          <PicheLogoFull className="block h-[72px] w-auto text-[#13b5ca]" />
          <p className="type-body max-w-[30ch] text-pretty text-(--silver-fog)">
            Energy-efficient homes in Rīga and Mārupe, built and sold by PICHE.
          </p>
          <div className="flex flex-col gap-1.5">
            <a
              href="tel:+37122333333"
              className="text-[15px]/[24px] font-medium text-(--text-on-dark)"
            >
              +371 22 333 333
            </a>
            <a href="mailto:info@piche.eu" className={footerLink}>
              info@piche.eu
            </a>
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <h3 className="type-category uppercase tracking-[0.08em] text-(--pewter)">
              {col.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <a key={l.label} href={l.href} className={footerLink}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-[42.88px] flex max-w-(--container-max) flex-wrap items-center justify-between gap-8 border-t border-(--graphite) px-8 pt-(--space-3)">
        <span className="type-body text-(--pewter)">
          © 2026 PICHE · Mežciema iela, Mārupe, Latvia
        </span>
        <div className="flex flex-wrap gap-(--space-3)">
          <a href="https://piche.eu" className={footerLink}>
            piche.eu
          </a>
          <a href="#news" className={footerLink}>
            Instagram
          </a>
          <a href="#news" className={footerLink}>
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
