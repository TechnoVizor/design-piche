export function PinOverlayPill({
  tone = "canvas",
  children,
  className,
}: {
  tone?: "canvas" | "dark";
  children: React.ReactNode;
  className?: string;
}) {
  const tones = {
    canvas: "bg-(--surface-canvas) text-(--text-primary)",
    dark: "bg-(--surface-dark) text-(--text-on-dark)",
  };
  return (
    <span
      className={`inline-flex items-center rounded-(--radius-full-ds) px-3 py-1.5 text-(length:--button-sm-size) font-bold leading-none ${tones[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
