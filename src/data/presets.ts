import type { ContrastMode, MoodId, PaletteSize } from "@/lib/color/types";

export type Preset = {
  name: string;
  description: string;
  size: PaletteSize;
  moodId: MoodId;
  contrastMode: ContrastMode;
  baseColor: string;
  fontPairingId: string;
};

export const presets: Preset[] = [
  {
    name: "Soft Neon Minimal",
    description: "White space, cyan action, and restrained pink highlights.",
    size: 5,
    moodId: "clean-minimal",
    contrastMode: "balanced",
    baseColor: "#00C8FF",
    fontPairingId: "space-grotesk-inter",
  },
  {
    name: "Pastel Product Grid",
    description: "Friendly SaaS cards with green and soft editorial pink.",
    size: 6,
    moodId: "pastel-product",
    contrastMode: "balanced",
    baseColor: "#DDF6DF",
    fontPairingId: "bricolage-source-sans",
  },
  {
    name: "Future Cyan System",
    description: "High-clarity cyan actions for technical product screens.",
    size: 6,
    moodId: "future-neon",
    contrastMode: "accessible",
    baseColor: "#00C8FF",
    fontPairingId: "sora-ibm-plex-sans",
  },
  {
    name: "Editorial Gallery",
    description: "Poster-like grid direction with expressive display type.",
    size: 5,
    moodId: "gallery-grid",
    contrastMode: "balanced",
    baseColor: "#B58CFF",
    fontPairingId: "fraunces-dm-sans",
  },
  {
    name: "Calm Dashboard",
    description: "Readable metrics, cool accents, and practical typography.",
    size: 6,
    moodId: "calm-dashboard",
    contrastMode: "accessible",
    baseColor: "#40D4B0",
    fontPairingId: "manrope-plus-jakarta",
  },
];
