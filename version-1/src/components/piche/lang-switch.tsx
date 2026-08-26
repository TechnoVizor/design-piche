"use client";

import { useEffect, useRef, useState } from "react";

const LANGS = ["LV", "EN", "RU"] as const;

type Lang = (typeof LANGS)[number];

export function LangSwitch() {
  const [lang, setLang] = useState<Lang>("EN");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${lang}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-(--control-height) items-center gap-(--space-xs) whitespace-nowrap rounded-(--radius-full-ds) bg-(--surface-card) px-4 text-(length:--button-md-size) font-bold leading-none text-(--text-primary) transition-[background-color,color] duration-(--duration-fast) ease-(--ease-standard) hover:bg-(--surface-secondary)"
      >
        {lang}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-(--duration-base) ease-(--ease-standard) ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute top-[calc(100%+var(--space-sm))] right-0 z-50 min-w-25 overflow-hidden rounded-(--radius-lg) border border-(--border-hairline) bg-(--surface-canvas) py-1 shadow-(--elevation-modal)"
        >
          {LANGS.map((l) => (
            <li key={l} role="none">
              <button
                type="button"
                role="option"
                aria-selected={lang === l}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2 text-left text-(length:--button-md-size) font-bold leading-none transition-[background-color,color] duration-(--duration-fast) ease-(--ease-standard) hover:bg-(--surface-card) ${
                  lang === l ? "text-(--brand-primary)" : "text-(--text-primary)"
                }`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
