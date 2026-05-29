"use client";

import { Dices, RotateCcw, Sparkles } from "lucide-react";
import { fontPairings } from "@/data/font-pairings";
import { Button } from "@/components/ui/Button";
import { BaseColorInput } from "@/components/controls/BaseColorInput";
import { ContrastModeSelect } from "@/components/controls/ContrastModeSelect";
import { MoodSelect } from "@/components/controls/MoodSelect";
import { PaletteSizeControl } from "@/components/controls/PaletteSizeControl";
import type { ContrastMode, MoodId, PaletteSize } from "@/lib/color/types";

export type GeneratorState = {
  size: PaletteSize;
  moodId: MoodId;
  contrastMode: ContrastMode;
  baseColor: string;
  seed: number;
  fontPairingId: string | "auto";
};

type GeneratorControlsProps = {
  state: GeneratorState;
  onChange: (state: GeneratorState) => void;
  onGenerate: () => void;
  onRandomize: () => void;
  onResetLayout: () => void;
};

export function GeneratorControls({
  state,
  onChange,
  onGenerate,
  onRandomize,
  onResetLayout,
}: GeneratorControlsProps) {
  const compatiblePairings = fontPairings.filter((pairing) => pairing.moodIds.includes(state.moodId));

  return (
    <div className="grid gap-4">
      <PaletteSizeControl value={state.size} onChange={(size) => onChange({ ...state, size })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <MoodSelect value={state.moodId} onChange={(moodId) => onChange({ ...state, moodId, fontPairingId: "auto" })} />
        <ContrastModeSelect
          value={state.contrastMode}
          onChange={(contrastMode) => onChange({ ...state, contrastMode })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <BaseColorInput value={state.baseColor} onChange={(baseColor) => onChange({ ...state, baseColor })} />
        <label className="block space-y-2 text-sm font-semibold text-[var(--app-ink)]">
          <span className="text-xs uppercase tracking-[0.14em] text-[var(--app-muted)]">Font pairing</span>
          <select
            aria-label="Font pairing"
            className="min-h-12 w-full rounded-2xl bg-white px-4 text-sm shadow-[0_8px_26px_rgba(16,16,20,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-neon-blue)]"
            onChange={(event) => onChange({ ...state, fontPairingId: event.target.value })}
            value={state.fontPairingId}
          >
            <option value="auto">Auto by mood</option>
            {compatiblePairings.map((pairing) => (
              <option key={pairing.id} value={pairing.id}>
                {pairing.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <Button onClick={onGenerate} type="button" variant="primary">
          <Sparkles size={18} aria-hidden />
          Generate system
        </Button>
        <Button onClick={onRandomize} type="button">
          <Dices size={18} aria-hidden />
          Randomize seed
        </Button>
        <Button onClick={onResetLayout} type="button" variant="ghost">
          <RotateCcw size={18} aria-hidden />
          Reset layout
        </Button>
      </div>
    </div>
  );
}
