import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function TextField({
  label,
  className,
  ...props
}: React.ComponentProps<typeof Input> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-(--space-sm) block text-(length:--body-strong-size) font-semibold text-(--text-primary)">
        {label}
      </span>
      <Input
        className={cn(
          "h-(--input-height) rounded-(--radius-md-ds) border-(--text-disabled) bg-(--surface-canvas) px-4 text-(length:--body-md-size) text-(--text-primary) shadow-none focus-visible:border-(--text-primary) focus-visible:ring-4 focus-visible:ring-(--focus-ring)/100",
          className,
        )}
        {...props}
      />
    </label>
  );
}
