import type { ContrastMode, MoodId } from "@/lib/color/types";

export type Mood = {
  id: MoodId;
  label: string;
  description: string;
  defaultHue: number;
  chroma: number;
  canvas: string;
  ink: string;
  recommendedContrast: ContrastMode;
  fontCategory: string;
};

export const moods: Mood[] = [
  {
    id: "clean-minimal",
    label: "Clean Minimal",
    description: "Restrained color, sharp whitespace, and crisp product contrast.",
    defaultHue: 205,
    chroma: 0.13,
    canvas: "#FBFBF8",
    ink: "#101014",
    recommendedContrast: "balanced",
    fontCategory: "neutral sans",
  },
  {
    id: "soft-editorial",
    label: "Soft Editorial",
    description: "Warm surfaces with quiet contrast and expressive type.",
    defaultHue: 350,
    chroma: 0.1,
    canvas: "#FFF9F4",
    ink: "#171316",
    recommendedContrast: "soft",
    fontCategory: "serif editorial",
  },
  {
    id: "future-neon",
    label: "Future Neon",
    description: "White structure with electric cyan and geometric clarity.",
    defaultHue: 205,
    chroma: 0.22,
    canvas: "#FAFCFF",
    ink: "#0B1020",
    recommendedContrast: "accessible",
    fontCategory: "technical sans",
  },
  {
    id: "pastel-product",
    label: "Pastel Product",
    description: "Pale green, soft pink, and friendly SaaS energy.",
    defaultHue: 145,
    chroma: 0.11,
    canvas: "#FEFCFB",
    ink: "#111417",
    recommendedContrast: "balanced",
    fontCategory: "rounded product",
  },
  {
    id: "gallery-grid",
    label: "Gallery Grid",
    description: "Disciplined layout with poster-like accents and large type.",
    defaultHue: 270,
    chroma: 0.15,
    canvas: "#FCFCF7",
    ink: "#101014",
    recommendedContrast: "balanced",
    fontCategory: "display editorial",
  },
  {
    id: "calm-dashboard",
    label: "Calm Dashboard",
    description: "Readable UI colors for product screens and metrics.",
    defaultHue: 170,
    chroma: 0.12,
    canvas: "#FAFBF8",
    ink: "#101418",
    recommendedContrast: "accessible",
    fontCategory: "dashboard sans",
  },
];

export function getMood(id: MoodId): Mood {
  return moods.find((mood) => mood.id === id) ?? moods[0];
}
