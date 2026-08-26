const TONE_CLASS = {
  canvas: {
    active: "bg-(--text-primary) text-(--text-on-dark)",
    idle: "bg-(--surface-card) text-(--text-primary)",
  },
  // Over hero photography there is no reliable backdrop colour to sit on, so
  // the idle chip is a frosted pane of the image itself rather than a fill.
  dark: {
    active: "bg-(--brand-primary) text-(--text-on-primary)",
    idle: "bg-white/15 text-(--text-on-dark) backdrop-blur-md hover:bg-white/25",
  },
} as const;

export function FilterChip({
  active = false,
  tone = "canvas",
  onClick,
  children,
  className,
}: {
  active?: boolean;
  tone?: "canvas" | "dark";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const styles = TONE_CLASS[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-9 items-center gap-(--space-xs) whitespace-nowrap rounded-(--radius-full-ds) px-4 py-2 text-(length:--button-md-size) font-bold leading-none transition-[background-color,color,transform] duration-(--duration-fast) ease-(--ease-standard) hover:scale-[1.03] active:scale-[0.96] ${
        active ? styles.active : styles.idle
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
