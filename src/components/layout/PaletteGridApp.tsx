"use client";

import { useMemo, useState } from "react";
import { ExportPanel } from "@/components/export/ExportPanel";
import { AppShell } from "@/components/layout/AppShell";
import { Footer } from "@/components/layout/Footer";
import { GeneratorSection } from "@/components/layout/GeneratorSection";
import { HeroSection } from "@/components/layout/HeroSection";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { PaletteResult } from "@/components/palette/PaletteResult";
import { GridCanvas } from "@/components/preview/GridCanvas";
import { FontPairingPanel } from "@/components/typography/FontPairingPanel";
import { Button } from "@/components/ui/Button";
import { presets } from "@/data/presets";
import type { GeneratorState } from "@/components/controls/GeneratorControls";
import { generatePalette } from "@/lib/color/generatePalette";
import { toCssVariables } from "@/lib/export/toCssVariables";
import { toJsonTokens } from "@/lib/export/toJsonTokens";
import { toTailwindTheme } from "@/lib/export/toTailwindTheme";
import { selectFontPairing } from "@/lib/fonts/selectFontPairing";
import { nextSeed } from "@/lib/utils/random";

const defaultState: GeneratorState = {
  size: 6,
  moodId: "future-neon",
  contrastMode: "accessible",
  baseColor: "",
  seed: 2088,
  fontPairingId: "auto",
};

export function PaletteGridApp() {
  const [state, setState] = useState<GeneratorState>(defaultState);
  const [layoutVersion, setLayoutVersion] = useState(0);

  const palette = useMemo(() => generatePalette(state), [state]);
  const fontPairing = useMemo(
    () => selectFontPairing({ moodId: state.moodId, selectedId: state.fontPairingId, seed: state.seed }),
    [state.fontPairingId, state.moodId, state.seed],
  );
  const cssExport = useMemo(() => toCssVariables(palette, fontPairing), [palette, fontPairing]);
  const tailwindExport = useMemo(() => toTailwindTheme(palette, fontPairing), [palette, fontPairing]);
  const jsonExport = useMemo(() => toJsonTokens(palette, fontPairing), [palette, fontPairing]);

  return (
    <AppShell>
      <ScrollReveal />
      <HeroSection />
      <div className="grid gap-16">
        <GeneratorSection
          onChange={setState}
          onGenerate={() => setState((current) => ({ ...current, seed: nextSeed() }))}
          onRandomize={() => setState((current) => ({ ...current, seed: nextSeed() }))}
          onResetLayout={() => setLayoutVersion((version) => version + 1)}
          state={state}
        />
        <PaletteResult palette={palette} />
        <FontPairingPanel pairing={fontPairing} />
        <div id="preview" className="scroll-mt-8">
          <GridCanvas fontPairing={fontPairing} layoutVersion={layoutVersion} palette={palette} />
        </div>
        <ExportPanel css={cssExport} json={jsonExport} tailwind={tailwindExport} />
        <section className="reveal space-y-5" aria-labelledby="presets-heading">
          <div>
            <p className="section-kicker">Reference presets</p>
            <h2 id="presets-heading" className="text-2xl font-semibold md:text-3xl">
              Start from a known direction.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {presets.map((preset) => (
              <article className="rounded-[24px] bg-white/76 p-5 shadow-[0_12px_40px_rgba(16,16,20,0.06)]" key={preset.name}>
                <h3 className="text-lg font-semibold">{preset.name}</h3>
                <p className="mt-2 min-h-20 text-sm leading-6 text-[var(--app-muted)]">{preset.description}</p>
                <Button
                  className="mt-4 px-0"
                  onClick={() =>
                    setState({
                      ...state,
                      size: preset.size,
                      moodId: preset.moodId,
                      contrastMode: preset.contrastMode,
                      baseColor: preset.baseColor,
                      fontPairingId: preset.fontPairingId,
                      seed: nextSeed(),
                    })
                  }
                  type="button"
                  variant="ghost"
                >
                  Apply preset
                </Button>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </AppShell>
  );
}
