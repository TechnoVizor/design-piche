export function Wordmark({
  text = "PICHE",
  size = 24,
  className,
}: {
  text?: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap font-(family-name:--font-display) font-bold text-(--brand-primary) ${className ?? ""}`}
      style={{ fontSize: size, letterSpacing: "-0.8px" }}
    >
      {text}
    </span>
  );
}
