import { describe, expect, it } from "vitest";
import { getContrastRatio, getTextColorForBackground } from "@/lib/color/contrast";
import { generatePalette } from "@/lib/color/generatePalette";
import { isValidHex, normalizeHex } from "@/lib/color/hex";
import { getRolesForSize } from "@/lib/color/roles";
import type { PaletteSize } from "@/lib/color/types";
import { toCssVariables } from "@/lib/export/toCssVariables";
import { toJsonTokens } from "@/lib/export/toJsonTokens";
import { toTailwindTheme } from "@/lib/export/toTailwindTheme";
import { selectFontPairing } from "@/lib/fonts/selectFontPairing";
import { fontCatalog, fontPairings } from "@/data/font-pairings";

const baseInput = {
  moodId: "future-neon" as const,
  contrastMode: "accessible" as const,
  baseColor: "#00C8FF",
  seed: 42,
};

describe("color engine", () => {
  it.each([3, 4, 5, 6] as PaletteSize[])("returns %s colors with expected roles", (size) => {
    const palette = generatePalette({ ...baseInput, size });
    expect(palette.colors).toHaveLength(size);
    expect(palette.colors.map((color) => color.role)).toEqual(getRolesForSize(size));
    expect(palette.colors.every((color) => isValidHex(color.hex))).toBe(true);
  });

  it("falls back safely with invalid base color", () => {
    const palette = generatePalette({ ...baseInput, size: 6, baseColor: "not-a-color" });
    expect(palette.colors.every((color) => isValidHex(color.hex))).toBe(true);
    expect(palette.colors.some((color) => color.role === "canvas")).toBe(true);
    expect(palette.colors.some((color) => color.role === "ink")).toBe(true);
  });

  it("uses a valid base color as the exact canvas color", () => {
    const palette = generatePalette({ ...baseInput, size: 6, baseColor: "#7755aa" });
    expect(palette.colors.find((color) => color.role === "canvas")?.hex).toBe("#7755AA");
  });

  it("uses white ink on dark canvas and dark ink on white canvas", () => {
    const dark = generatePalette({ ...baseInput, size: 6, baseColor: "#050505" });
    const light = generatePalette({ ...baseInput, size: 6, baseColor: "#FFFFFF" });
    expect(dark.colors.find((color) => color.role === "ink")?.hex).toBe("#FFFFFF");
    expect(light.colors.find((color) => color.role === "ink")?.hex).toBe("#101014");
  });

  it("adds a white token when canvas and ink are not white", () => {
    const palette = generatePalette({ ...baseInput, size: 5, baseColor: "#D9D3FF" });
    expect(palette.colors.some((color) => color.hex === "#FFFFFF")).toBe(true);
  });

  it("keeps ink on canvas readable in accessible mode", () => {
    const palette = generatePalette({ ...baseInput, size: 6 });
    const pair = palette.contrastPairs.find(
      (item) => item.foregroundRole === "ink" && item.backgroundRole === "canvas",
    );
    expect(pair?.ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("changes canvas across empty-base seeds while keeping ink readable", () => {
    const first = generatePalette({ ...baseInput, size: 6, baseColor: "", seed: 100 });
    const second = generatePalette({ ...baseInput, size: 6, baseColor: "", seed: 220 });
    expect(first.colors.find((color) => color.role === "canvas")?.hex).not.toBe(
      second.colors.find((color) => color.role === "canvas")?.hex,
    );
    expect(first.contrastPairs.find((pair) => pair.foregroundRole === "ink" && pair.backgroundRole === "canvas")?.ratio).toBeGreaterThanOrEqual(4.5);
    expect(second.contrastPairs.find((pair) => pair.foregroundRole === "ink" && pair.backgroundRole === "canvas")?.ratio).toBeGreaterThanOrEqual(4.5);
  });
});

describe("contrast and hex helpers", () => {
  it("calculates expected contrast basics", () => {
    expect(getContrastRatio("#000000", "#ffffff")).toBeGreaterThan(20);
    expect(getContrastRatio("#ffffff", "#ffffff")).toBe(1);
  });

  it("normalizes short and long hex values", () => {
    expect(normalizeHex("fff")).toBe("#FFFFFF");
    expect(normalizeHex("#00c8ff")).toBe("#00C8FF");
  });

  it("chooses readable text colors", () => {
    expect(getTextColorForBackground("#101014")).toBe("#ffffff");
    expect(getTextColorForBackground("#FBFBF8")).toBe("#101014");
  });
});

describe("font engine and exports", () => {
  const palette = generatePalette({ ...baseInput, size: 6 });

  it("selects fonts by auto, direct id, and fallback", () => {
    const auto = selectFontPairing({ moodId: "future-neon", selectedId: "auto", seed: 7 });
    expect(auto.heading.family).toBeTruthy();
    const direct = selectFontPairing({ moodId: "future-neon", selectedId: "syne-inter", seed: 7 });
    expect(direct.id).toBe("syne-inter");
    const fallback = selectFontPairing({ moodId: "future-neon", selectedId: "missing", seed: 7 });
    expect(fallback.body.family).toBeTruthy();
  });

  it("provides a large local font catalog and generated combinations", () => {
    expect(fontCatalog.length).toBeGreaterThanOrEqual(100);
    expect(fontPairings.length).toBeGreaterThanOrEqual(500);
  });

  it("exports valid design tokens", () => {
    const fonts = selectFontPairing({ moodId: "future-neon", selectedId: "auto", seed: 7 });
    expect(toCssVariables(palette, fonts)).toContain("--color-primary");
    expect(toTailwindTheme(palette, fonts)).toContain(fonts.heading.family);
    expect(() => JSON.parse(toJsonTokens(palette, fonts))).not.toThrow();
  });
});
