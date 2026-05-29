import type { GeneratedPalette } from "@/lib/color/types";
import type { FontPairing } from "@/lib/fonts/types";

export function toJsonTokens(palette: GeneratedPalette, fonts: FontPairing) {
  return JSON.stringify(
    {
      color: Object.fromEntries(
        palette.colors.map((color) => [
          color.role,
          {
            value: color.hex,
            type: "color",
            usage: color.usage,
          },
        ]),
      ),
      font: {
        heading: { value: fonts.heading.family, type: "fontFamily" },
        body: { value: fonts.body.family, type: "fontFamily" },
        ...(fonts.accent ? { accent: { value: fonts.accent.family, type: "fontFamily" } } : {}),
      },
      meta: {
        paletteId: palette.id,
        mood: palette.moodId,
        contrast: palette.contrastMode,
      },
    },
    null,
    2,
  );
}
