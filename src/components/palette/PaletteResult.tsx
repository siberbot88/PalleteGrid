import { ColorSwatchCard } from "@/components/palette/ColorSwatchCard";
import type { GeneratedPalette } from "@/lib/color/types";

export function PaletteResult({ palette }: { palette: GeneratedPalette }) {
  return (
    <section className="reveal space-y-5" aria-labelledby="palette-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="section-kicker">Palette result</p>
          <h2 id="palette-heading" className="text-2xl font-semibold md:text-3xl">
            Semantic colors ready for UI.
          </h2>
        </div>
        <p className="rounded-full bg-white px-4 py-2 font-mono text-xs text-[var(--app-muted)] shadow-sm">
          {palette.id}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {palette.colors.map((color) => (
          <ColorSwatchCard color={color} key={color.id} />
        ))}
      </div>
    </section>
  );
}
