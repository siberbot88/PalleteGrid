import { normalizeHex } from "@/lib/color/hex";

function channelToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex) ?? "#000000";
  const value = normalized.slice(1);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export function getRelativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

export function getContrastRatio(foregroundHex: string, backgroundHex: string) {
  const foreground = getRelativeLuminance(foregroundHex);
  const background = getRelativeLuminance(backgroundHex);
  const lighter = Math.max(foreground, background);
  const darker = Math.min(foreground, background);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function passesNormalText(ratio: number) {
  return ratio >= 4.5;
}

export function passesLargeText(ratio: number) {
  return ratio >= 3;
}

export function getTextColorForBackground(backgroundHex: string): "#101014" | "#ffffff" {
  const darkRatio = getContrastRatio("#101014", backgroundHex);
  const lightRatio = getContrastRatio("#ffffff", backgroundHex);
  return darkRatio >= lightRatio ? "#101014" : "#ffffff";
}

export function ensureReadablePair(
  foreground: string,
  background: string,
  minRatio: number,
): { foreground: string; background: string; ratio: number } {
  const ratio = getContrastRatio(foreground, background);
  if (ratio >= minRatio) return { foreground, background, ratio };
  const darkRatio = getContrastRatio("#101014", background);
  const lightRatio = getContrastRatio("#ffffff", background);
  const adjusted = darkRatio >= lightRatio ? "#101014" : "#ffffff";
  return { foreground: adjusted, background, ratio: getContrastRatio(adjusted, background) };
}
