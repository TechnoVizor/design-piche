import type { ReactNode } from "react";

// Port of the Showroom Minimal design-system Button
// (_ds/.../components/core/Button.jsx): 4px radius, 40px min height,
// 3px transparent border, 14/16.8 medium label, 0.33s colour transition.
const base =
  "type-button inline-flex cursor-pointer items-center justify-center rounded-(--radius-control) border-[3px] border-transparent p-(--pad-button) transition-[border-color,background-color,color] duration-[.33s]";

const variants = {
  primary:
    "bg-(--action-primary) text-(--text-on-accent) hover:bg-(--action-primary-hover) hover:text-(--text-on-accent)",
  "secondary-translucent":
    "bg-white/65 text-(--action-secondary-text) hover:bg-white/90 hover:text-(--action-secondary-text)",
};

type DsButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
};

export function DsButton({
  variant = "primary",
  href,
  type = "button",
  className = "",
  children,
}: DsButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}
