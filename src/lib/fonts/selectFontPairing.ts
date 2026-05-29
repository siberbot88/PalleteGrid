import { fontPairings } from "@/data/font-pairings";
import type { MoodId } from "@/lib/color/types";
import type { FontPairing } from "@/lib/fonts/types";

export function selectFontPairing(options: {
  moodId: MoodId;
  selectedId: string | "auto";
  seed: number;
}): FontPairing {
  const direct =
    options.selectedId !== "auto"
      ? fontPairings.find((pairing) => pairing.id === options.selectedId)
      : undefined;
  if (direct) return direct;

  const matches = fontPairings.filter((pairing) => pairing.moodIds.includes(options.moodId));
  const pool = matches.length > 0 ? matches : fontPairings;
  const index = Math.abs(Math.floor(options.seed)) % pool.length;
  return pool[index] ?? fontPairings[0];
}
