"use client";

import { cn } from "@/lib/utils/cn";

type Option<T extends string | number> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string | number> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
        {label}
      </legend>
      <div className="grid grid-cols-4 gap-2 rounded-full bg-white/70 p-1 shadow-inner">
        {options.map((option) => (
          <button
            aria-label={`${label} ${option.label}`}
            className={cn(
              "min-h-10 rounded-full px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--app-neon-blue)]",
              option.value === value
                ? "bg-[var(--app-ink)] text-white shadow-sm"
                : "text-[var(--app-muted)] hover:bg-black/[0.04] hover:text-[var(--app-ink)]",
            )}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
