export type PaletteSize = 3 | 4 | 5 | 6;

export type MoodId =
  | "clean-minimal"
  | "soft-editorial"
  | "future-neon"
  | "pastel-product"
  | "gallery-grid"
  | "calm-dashboard";

export type ContrastMode = "soft" | "balanced" | "accessible";

export type ColorRole =
  | "canvas"
  | "ink"
  | "surface"
  | "primary"
  | "secondary"
  | "accent";

export type GeneratePaletteInput = {
  size: PaletteSize;
  moodId: MoodId;
  contrastMode: ContrastMode;
  baseColor?: string;
  seed: number;
};

export type GeneratedColor = {
  id: string;
  role: ColorRole;
  name: string;
  hex: string;
  oklch: {
    l: number;
    c: number;
    h: number;
  };
  usage: string;
  textOnColor: "#101014" | "#ffffff";
};

export type ContrastPair = {
  foregroundRole: string;
  backgroundRole: string;
  ratio: number;
  passNormalText: boolean;
  passLargeText: boolean;
};

export type GeneratedPalette = {
  id: string;
  size: PaletteSize;
  moodId: MoodId;
  contrastMode: ContrastMode;
  colors: GeneratedColor[];
  contrastPairs: ContrastPair[];
};
