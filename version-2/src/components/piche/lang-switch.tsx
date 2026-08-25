"use client";

import { useEffect, useState } from "react";
import { LANGUAGES } from "@/lib/piche-data";

export function LangSwitch() {
  const [lang, setLang] = useState("EN");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-lang-menu]")) setOpen(false);
    };
    document.addEventListener("click", close, true);
    return () => document.removeEventListener("click", close, true);
  }, [open]);

  return (
    <div data-lang-menu className="relative flex-none">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="type-nav flex h-9 cursor-pointer items-center gap-1.5 rounded-(--radius-control) border border-(--border-ui) bg-(--white) px-2.5 leading-none text-(--action-nav-text) transition-[border-color,background-color,color] duration-[.33s] hover:border-(--electric-blue)"
      >
        {lang}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[42px] right-0 z-60 flex min-w-[140px] flex-col overflow-hidden rounded-(--radius-control) border border-(--border-divider) bg-(--white)">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`type-nav flex h-9 w-full cursor-pointer items-center px-3.5 text-left transition-[background-color,color] duration-[.33s] ${
                lang === l.code
                  ? "bg-(--action-nav-hover-bg) text-(--carbon-dark)"
                  : "bg-transparent text-(--text-tertiary)"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
