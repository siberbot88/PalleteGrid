import type { GeneratedPalette } from "@/lib/color/types";
import type { FontPairing } from "@/lib/fonts/types";

export function toTailwindTheme(palette: GeneratedPalette, fonts: FontPairing) {
  const colors = palette.colors
    .map((color) => `        ${color.role}: "var(--color-${color.role})"`)
    .join(",\n");

  return `theme: {
  extend: {
    colors: {
${colors}
    },
    fontFamily: {
      heading: ["${fonts.heading.family}", "${fonts.heading.fallback}"],
      body: ["${fonts.body.family}", "${fonts.body.fallback}"]${fonts.accent ? `,
      accent: ["${fonts.accent.family}", "${fonts.accent.fallback}"]` : ""}
    }
  }
}`;
}
