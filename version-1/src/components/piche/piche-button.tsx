import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VARIANT_CLASS: Record<string, string> = {
  primary:
    "bg-(--brand-primary) text-(--text-on-primary) hover:bg-(--brand-primary-pressed)",
  secondary:
    "bg-(--surface-secondary) text-(--text-primary) hover:bg-(--surface-secondary-pressed)",
};

const SIZE_CLASS: Record<string, string> = {
  md: "h-(--control-height) px-3.5 text-(length:--button-md-size)",
  sm: "h-8 px-3 text-(length:--button-sm-size)",
};

export function PicheButton({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size"> & {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  fullWidth?: boolean;
}) {
  return (
    <Button
      className={cn(
        "gap-(--space-sm) whitespace-nowrap rounded-(--radius-md-ds) font-(family-name:--font-core) font-bold leading-none disabled:bg-(--surface-card) disabled:text-(--text-disabled)",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        fullWidth ? "w-full" : "w-auto",
        className,
      )}
      {...props}
    />
  );
}
