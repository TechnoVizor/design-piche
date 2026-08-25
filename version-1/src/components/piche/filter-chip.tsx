export function FilterChip({
  active = false,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-9 items-center gap-(--space-xs) whitespace-nowrap rounded-(--radius-full-ds) px-4 py-2 text-(length:--button-md-size) font-bold leading-none transition-[background-color,color,transform] duration-(--duration-fast) ease-(--ease-standard) hover:scale-[1.03] active:scale-[0.96] ${
        active
          ? "bg-(--text-primary) text-(--text-on-dark)"
          : "bg-(--surface-card) text-(--text-primary)"
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
