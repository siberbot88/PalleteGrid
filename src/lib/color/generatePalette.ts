import { converter, formatHex } from "culori";
import { getMood } from "@/data/moods";
import { getContrastRatio, getTextColorForBackground, passesLargeText, passesNormalText } from "@/lib/color/contrast";
import { normalizeHex } from "@/lib/color/hex";
import { getRolesForSize, roleNames, roleUsage } from "@/lib/color/roles";
import type { ColorRole, GeneratedColor, GeneratedPalette, GeneratePaletteInput } from "@/lib/color/types";
import { seededRandom } from "@/lib/utils/random";

const toOklch = converter("oklch");

type OklchValue = { l: number; c: number; h: number };

const fallbackHex: Record<ColorRole, string> = {
  canvas: "#FBFBF8",
  ink: "#101014",
  surface: "#FFFFFF",
  primary: "#00C8FF",
  secondary: "#FFD7EA",
  accent: "#DDF6DF",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function wrapHue(hue: number) {
  return ((hue % 360) + 360) % 360;
}

function isWhiteish(hex: string) {
  const normalized = normalizeHex(hex);
  if (!normalized) return false;
  const oklch = hexToOklch(normalized);
  return oklch.l > 0.96 && oklch.c < 0.025;
}

function oklchToHex(value: OklchValue) {
  try {
    const hex = formatHex({ mode: "oklch", l: value.l, c: value.c, h: value.h });
    return normalizeHex(hex) ?? fallbackHex.primary;
  } catch {
    return fallbackHex.primary;
  }
}

function hexToOklch(hex: string): OklchValue {
  const converted = toOklch(hex);
  return {
    l: typeof converted?.l === "number" ? converted.l : 0.7,
    c: typeof converted?.c === "number" ? converted.c : 0.12,
    h: typeof converted?.h === "number" ? converted.h : 205,
  };
}

function hasUsableBaseColor(input: GeneratePaletteInput) {
  return Boolean(input.baseColor?.trim() && normalizeHex(input.baseColor));
}

function getCanvasHex(input: GeneratePaletteInput) {
  const normalized = input.baseColor ? normalizeHex(input.baseColor) : null;
  if (normalized) return normalized;

  const mood = getMood(input.moodId);
  const random = seededRandom(input.seed + mood.defaultHue * 29);
  return oklchToHex({
    l: input.contrastMode === "accessible" ? 0.94 : 0.86 + random() * 0.11,
    c: clamp(mood.chroma * 0.42 + random() * 0.028, 0.018, 0.08),
    h: wrapHue(random() * 360),
  });
}

function getBaseHue(input: GeneratePaletteInput) {
  const mood = getMood(input.moodId);
  const canvas = hexToOklch(getCanvasHex(input));
  if (canvas.c < 0.025 || !Number.isFinite(canvas.h)) {
    const random = seededRandom(input.seed + mood.defaultHue * 13);
    return wrapHue(random() * 360);
  }
  return canvas.h;
}

function roleOklch(role: ColorRole, hue: number, chroma: number, input: GeneratePaletteInput): OklchValue {
  const random = seededRandom(input.seed + role.length * 97);
  const canvas = hexToOklch(getCanvasHex(input));
  const hasBase = hasUsableBaseColor(input);
  const harmonyShift = hasBase ? random() * 360 : (random() - 0.5) * 72;
  const broadShift = hasBase ? harmonyShift : (random() - 0.5) * 72;
  const jitter = (random() - 0.5) * (hasBase ? 70 : 44);
  const accessible = input.contrastMode === "accessible";
  const soft = input.contrastMode === "soft";

  if (role === "canvas") {
    return canvas;
  }

  if (role === "ink") {
    const canvasIsDark = canvas.l < 0.5;
    return {
      l: canvasIsDark ? (accessible ? 0.96 : 0.9) : accessible ? 0.1 : soft ? 0.18 : 0.13 + random() * 0.07,
      c: clamp(chroma * (canvasIsDark ? 0.2 : 0.42) + random() * 0.02, 0.01, 0.09),
      h: wrapHue(hue + 180 + broadShift * 0.2),
    };
  }

  if (role === "surface") {
    const surfaceLightness = canvas.l < 0.5 ? clamp(canvas.l + 0.12 + random() * 0.08, 0.18, 0.72) : clamp(canvas.l - 0.04 + random() * 0.04, 0.76, 0.98);
    return {
      l: surfaceLightness,
      c: clamp(chroma * 0.35 + random() * 0.025, 0.018, 0.07),
      h: wrapHue(hue + 24 + broadShift * 0.32),
    };
  }

  const lightness = {
    primary: accessible ? 0.54 + random() * 0.1 : soft ? 0.66 + random() * 0.13 : 0.58 + random() * 0.16,
    secondary: soft ? 0.73 + random() * 0.11 : 0.62 + random() * 0.17,
    accent: soft ? 0.78 + random() * 0.1 : 0.66 + random() * 0.19,
  }[role];

  const hueOffset = {
    primary: hasBase ? broadShift + jitter * 0.35 : broadShift + jitter * 0.25,
    secondary: input.moodId === "pastel-product" ? 88 + jitter : 55 + broadShift * 0.5 + jitter,
    accent:
      input.moodId === "future-neon"
        ? 135 + broadShift * 0.45 + jitter
        : input.moodId === "soft-editorial"
          ? -34 + broadShift * 0.4 + jitter
          : -86 + broadShift * 0.5 + jitter,
  }[role];

  const roleChroma = {
    primary: input.moodId === "future-neon" ? 0.18 + random() * 0.08 : chroma + random() * 0.055,
    secondary: chroma * (0.68 + random() * 0.38),
    accent: input.moodId === "gallery-grid" ? chroma * (0.95 + random() * 0.32) : chroma * (0.55 + random() * 0.45),
  }[role];

  return {
    l: clamp(lightness, 0.42, 0.9),
    c: clamp(roleChroma, 0.035, 0.26),
    h: wrapHue(hue + hueOffset),
  };
}

function colorForRole(role: ColorRole, input: GeneratePaletteInput): GeneratedColor {
  const mood = getMood(input.moodId);
  const hue = getBaseHue(input);
  const oklch = roleOklch(role, hue, mood.chroma, input);
  let hex = role === "canvas" ? getCanvasHex(input) : oklchToHex(oklch);

  if (role === "ink") {
    const canvasHex = getCanvasHex(input);
    const canvas = hexToOklch(canvasHex);
    const random = seededRandom(input.seed + 311);
    const canvasIsDark = canvas.l < 0.5;
    const lightInk = [
      hex,
      oklchToHex({ l: 0.97 - random() * 0.05, c: 0.012 + random() * 0.035, h: wrapHue(oklch.h + 12) }),
      oklchToHex({ l: 0.92 - random() * 0.04, c: 0.02 + random() * 0.04, h: wrapHue(oklch.h + 54) }),
      "#FFFFFF",
    ];
    const darkInk = [
      hex,
      oklchToHex({ l: 0.08 + random() * 0.08, c: 0.012 + random() * 0.05, h: wrapHue(oklch.h + 180) }),
      oklchToHex({ l: 0.13 + random() * 0.07, c: 0.018 + random() * 0.06, h: wrapHue(oklch.h + 225) }),
      "#101014",
    ];
    const candidates = canvasIsDark ? [...lightInk, ...darkInk] : [...darkInk, ...lightInk];
    hex =
      candidates.find((candidate) => getContrastRatio(candidate, canvasHex) >= 4.5) ??
      candidates.reduce((best, candidate) => (getContrastRatio(candidate, canvasHex) > getContrastRatio(best, canvasHex) ? candidate : best), candidates[0]);
  }

  if (role === "primary" && input.contrastMode === "accessible") {
    const text = getTextColorForBackground(hex);
    if (!passesNormalText(getContrastRatio(text, hex))) {
      hex = oklchToHex({ ...oklch, l: text === "#ffffff" ? 0.48 : 0.72 });
    }
  }

  const finalOklch = hexToOklch(hex);
  return {
    id: `${role}-${hex.slice(1).toLowerCase()}`,
    role,
    name: roleNames[role],
    hex,
    oklch: {
      l: Number(finalOklch.l.toFixed(4)),
      c: Number(finalOklch.c.toFixed(4)),
      h: Number(finalOklch.h.toFixed(2)),
    },
    usage: roleUsage[role],
    textOnColor: getTextColorForBackground(hex),
  };
}

function withHex(color: GeneratedColor, hex: string): GeneratedColor {
  const normalized = normalizeHex(hex) ?? hex;
  const oklch = hexToOklch(normalized);
  return {
    ...color,
    id: `${color.role}-${normalized.slice(1).toLowerCase()}`,
    hex: normalized,
    oklch: {
      l: Number(oklch.l.toFixed(4)),
      c: Number(oklch.c.toFixed(4)),
      h: Number(oklch.h.toFixed(2)),
    },
    textOnColor: getTextColorForBackground(normalized),
  };
}

function ensureWhiteToken(colors: GeneratedColor[]) {
  const canvas = colors.find((color) => color.role === "canvas");
  const ink = colors.find((color) => color.role === "ink");
  if (!canvas || !ink || isWhiteish(canvas.hex) || isWhiteish(ink.hex) || colors.some((color) => isWhiteish(color.hex))) {
    return colors;
  }

  const preferredRole = colors.find((color) => color.role === "secondary") ?? colors.find((color) => color.role === "primary");
  if (!preferredRole) return colors;

  return colors.map((color) => (color.role === preferredRole.role ? withHex(color, "#FFFFFF") : color));
}

function contrastPairs(colors: GeneratedColor[]) {
  const byRole = new Map(colors.map((color) => [color.role, color]));
  const pairs: [ColorRole, ColorRole][] = [
    ["ink", "canvas"],
    ["ink", "surface"],
    ["primary", "canvas"],
    ["accent", "canvas"],
  ];

  return pairs
    .filter(([foreground, background]) => byRole.has(foreground) && byRole.has(background))
    .map(([foreground, background]) => {
      const ratio = getContrastRatio(byRole.get(foreground)?.hex ?? "#101014", byRole.get(background)?.hex ?? "#FFFFFF");
      return {
        foregroundRole: foreground,
        backgroundRole: background,
        ratio,
        passNormalText: passesNormalText(ratio),
        passLargeText: passesLargeText(ratio),
      };
    });
}

export function generatePalette(input: GeneratePaletteInput): GeneratedPalette {
  const safeSize = ([3, 4, 5, 6] as const).includes(input.size) ? input.size : 6;
  const safeInput = { ...input, size: safeSize };

  try {
    const colors = ensureWhiteToken(getRolesForSize(safeSize).map((role) => colorForRole(role, safeInput)));
    const inkCanvas = colors.find((color) => color.role === "ink");
    const canvas = colors.find((color) => color.role === "canvas");
    if (!inkCanvas || !canvas || getContrastRatio(inkCanvas.hex, canvas.hex) < 4.5) {
      throw new Error("Invalid palette contrast");
    }
    return {
      id: `${safeInput.moodId}-${safeInput.contrastMode}-${safeInput.size}-${safeInput.seed}`,
      size: safeSize,
      moodId: safeInput.moodId,
      contrastMode: safeInput.contrastMode,
      colors,
      contrastPairs: contrastPairs(colors),
    };
  } catch {
    const colors = getRolesForSize(safeSize).map((role) => {
      const oklch = hexToOklch(fallbackHex[role]);
      return {
        id: `${role}-${fallbackHex[role].slice(1).toLowerCase()}`,
        role,
        name: roleNames[role],
        hex: fallbackHex[role],
        oklch,
        usage: roleUsage[role],
        textOnColor: getTextColorForBackground(fallbackHex[role]),
      };
    });
    return {
      id: `fallback-${safeSize}-${input.seed}`,
      size: safeSize,
      moodId: "clean-minimal",
      contrastMode: input.contrastMode,
      colors,
      contrastPairs: contrastPairs(colors),
    };
  }
}
