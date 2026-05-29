"use client";

import type { ContrastMode } from "@/lib/color/types";

const modes: { label: string; value: ContrastMode }[] = [
  { label: "Soft", value: "soft" },
  { label: "Balanced", value: "balanced" },
  { label: "Accessible-first", value: "accessible" },
];

export function ContrastModeSelect({
  value,
  onChange,
}: {
  value: ContrastMode;
  onChange: (value: ContrastMode) => void;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-[var(--app-ink)]">
      <span className="text-xs uppercase tracking-[0.14em] text-[var(--app-muted)]">Contrast</span>
      <select
        className="min-h-12 w-full rounded-2xl bg-white px-4 text-sm shadow-[0_8px_26px_rgba(16,16,20,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-neon-blue)]"
        onChange={(event) => onChange(event.target.value as ContrastMode)}
        value={value}
      >
        {modes.map((mode) => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>
    </label>
  );
}
