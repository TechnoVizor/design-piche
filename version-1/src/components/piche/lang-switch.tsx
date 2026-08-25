"use client";

import { useState } from "react";
import { FilterChip } from "@/components/piche/filter-chip";

const LANGS = ["LV", "EN", "RU"] as const;

export function LangSwitch() {
  const [lang, setLang] = useState<(typeof LANGS)[number]>("EN");
  return (
    <div className="flex items-center gap-(--space-xs)">
      {LANGS.map((l) => (
        <FilterChip key={l} active={lang === l} onClick={() => setLang(l)}>
          {l}
        </FilterChip>
      ))}
    </div>
  );
}
