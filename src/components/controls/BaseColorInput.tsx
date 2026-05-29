"use client";

export function BaseColorInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const colorValue = /^#[a-fA-F0-9]{6}$/.test(value) ? value : "#00C8FF";

  return (
    <label className="block space-y-2 text-sm font-semibold text-[var(--app-ink)]">
      <span className="text-xs uppercase tracking-[0.14em] text-[var(--app-muted)]">Canvas color</span>
      <span className="flex min-h-12 items-center gap-2 rounded-2xl bg-white px-3 shadow-[0_8px_26px_rgba(16,16,20,0.06)]">
        <input
          aria-label="Base color picker"
          className="h-8 w-10 cursor-pointer rounded-xl border-0 bg-transparent p-0"
          onChange={(event) => onChange(event.target.value)}
          type="color"
          value={colorValue}
        />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm uppercase outline-none"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Empty for generated canvas"
          value={value}
        />
      </span>
    </label>
  );
}
