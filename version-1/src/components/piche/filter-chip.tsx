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
      className={`inline-flex min-h-9 items-center gap-(--space-xs) whitespace-nowrap rounded-(--radius-full-ds) px-4 py-2 text-(length:--button-md-size) font-bold leading-none transition-colors duration-(--duration-fast) ease-(--ease-standard) ${
        active
          ? "bg-(--text-primary) text-(--text-on-dark)"
          : "bg-(--surface-card) text-(--text-primary)"
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
