import { LangSwitch } from "./lang-switch";
import { DsButton } from "./ds-button";
import { PicheWordmark } from "./logo";

const NAV = [
  { label: "Projects", href: "#projects" },
  { label: "About us", href: "#about" },
  { label: "News", href: "#news" },
  { label: "Contacts", href: "#contacts" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--border-divider) bg-(--frosted-white) backdrop-blur-[12px]">
      <div className="mx-auto flex h-16 max-w-(--container-max) items-center justify-between gap-6 px-8">
        <a href="#top" className="flex flex-none items-center text-[#13b5ca] hover:text-[#13b5ca]">
          <PicheWordmark className="block h-[22px] w-auto" />
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="type-nav whitespace-nowrap rounded-(--radius-control) px-3.5 py-2.5 text-(--action-nav-text) transition-[background-color,color] duration-[.33s] hover:bg-(--action-nav-hover-bg)"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
          <div className="hidden h-9 min-w-0 max-w-[220px] flex-1 items-center gap-2 rounded-(--radius-control) border border-(--border-ui) px-3 lg:flex">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="flex-none text-(--pewter)"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <input
              placeholder="Search projects, apartments"
              className="type-body w-full min-w-0 border-0 text-(--text-body) outline-none placeholder:text-(--text-placeholder)"
            />
          </div>
          <LangSwitch />
          <DsButton
            href="#contacts"
            className="min-h-(--cta-height) min-w-[120px] flex-none whitespace-nowrap"
          >
            Apply now
          </DsButton>
        </div>
      </div>
    </header>
  );
}
