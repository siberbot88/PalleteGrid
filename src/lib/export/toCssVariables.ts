import type { GeneratedPalette } from "@/lib/color/types";
import type { FontPairing } from "@/lib/fonts/types";

export function toCssVariables(palette: GeneratedPalette, fonts: FontPairing) {
  const colorLines = palette.colors.map((color) => `  --color-${color.role}: ${color.hex};`);
  return `:root {
${colorLines.join("\n")}
  --font-heading: "${fonts.heading.family}", ${fonts.heading.fallback};
  --font-body: "${fonts.body.family}", ${fonts.body.fallback};
${fonts.accent ? `  --font-accent: "${fonts.accent.family}", ${fonts.accent.fallback};` : ""}
}`;
}
