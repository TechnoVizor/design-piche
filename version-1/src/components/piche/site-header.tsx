import Link from "next/link";
import { Wordmark } from "@/components/piche/wordmark";
import { SearchBar } from "@/components/piche/search-bar";
import { LangSwitch } from "@/components/piche/lang-switch";
import { PicheButton } from "@/components/piche/piche-button";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About us" },
  { href: "#news", label: "News" },
  { href: "#contacts", label: "Contacts" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-(--border-hairline) bg-(--surface-canvas)">
      <div className="mx-auto flex h-(--nav-height) max-w-(--container-max) items-center gap-(--space-lg) px-(--container-pad)">
        <Link href="#top" className="flex shrink-0 items-center">
          <Wordmark text="PICHE" size={26} />
        </Link>
        <nav className="hidden shrink-0 gap-(--space-lg) whitespace-nowrap lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-(length:--body-strong-size) font-semibold text-(--text-primary) hover:text-(--brand-primary)"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden min-w-0 flex-1 justify-end md:flex">
          <SearchBar
            placeholder="Search projects, apartments, locations"
            className="w-full max-w-90 min-w-35 flex-1"
          />
        </div>
        <div className="ml-auto flex items-center gap-(--space-lg) md:ml-0">
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <PicheButton asChild size="md">
            <a href="#contacts">Apply now</a>
          </PicheButton>
        </div>
      </div>
    </header>
  );
}
