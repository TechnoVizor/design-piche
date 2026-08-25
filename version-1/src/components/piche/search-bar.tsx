import { Search } from "lucide-react";

export function SearchBar({
  placeholder = "Search for ideas",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-(--search-height) items-center gap-(--space-md) rounded-(--radius-full-ds) border border-transparent bg-(--surface-card) px-[15px] transition-colors duration-(--duration-base) ease-(--ease-standard) focus-within:border-(--text-disabled) focus-within:bg-(--surface-canvas) ${className ?? ""}`}
    >
      <Search className="size-[18px] shrink-0 text-(--text-mute)" />
      <input
        placeholder={placeholder}
        className="min-w-0 flex-1 border-none bg-transparent text-(length:--body-md-size) text-(--text-primary) outline-none placeholder:text-(--text-mute)"
      />
    </div>
  );
}
