"use client";

import { moods } from "@/data/moods";
import type { MoodId } from "@/lib/color/types";

export function MoodSelect({ value, onChange }: { value: MoodId; onChange: (value: MoodId) => void }) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-[var(--app-ink)]">
      <span className="text-xs uppercase tracking-[0.14em] text-[var(--app-muted)]">Mood</span>
      <select
        aria-label="Mood"
        className="min-h-12 w-full rounded-2xl bg-white px-4 text-sm shadow-[0_8px_26px_rgba(16,16,20,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-neon-blue)]"
        onChange={(event) => onChange(event.target.value as MoodId)}
        value={value}
      >
        {moods.map((mood) => (
          <option key={mood.id} value={mood.id}>
            {mood.label}
          </option>
        ))}
      </select>
    </label>
  );
}
