import type { ColorRole, PaletteSize } from "@/lib/color/types";

export function getRolesForSize(size: PaletteSize): ColorRole[] {
  if (size === 3) return ["canvas", "ink", "primary"];
  if (size === 4) return ["canvas", "ink", "primary", "secondary"];
  if (size === 5) return ["canvas", "ink", "primary", "secondary", "accent"];
  return ["canvas", "ink", "surface", "primary", "secondary", "accent"];
}

export const roleNames: Record<ColorRole, string> = {
  canvas: "Canvas",
  ink: "Ink",
  surface: "Surface",
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
};

export const roleUsage: Record<ColorRole, string> = {
  canvas: "Main page background",
  ink: "Primary text and icons",
  surface: "Cards and soft panels",
  primary: "CTA, focus, active state",
  secondary: "Supporting cards and badges",
  accent: "Highlights and decorative shapes",
};
