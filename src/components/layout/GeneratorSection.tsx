"use client";

import { getMood } from "@/data/moods";
import { GeneratorControls, type GeneratorState } from "@/components/controls/GeneratorControls";
import { Panel } from "@/components/ui/Panel";

export function GeneratorSection({
  state,
  onChange,
  onGenerate,
  onRandomize,
  onResetLayout,
}: {
  state: GeneratorState;
  onChange: (state: GeneratorState) => void;
  onGenerate: () => void;
  onRandomize: () => void;
  onResetLayout: () => void;
}) {
  const mood = getMood(state.moodId);

  return (
    <section className="reveal scroll-mt-8" id="generator" aria-labelledby="generator-heading">
      <Panel className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">Generator controls</p>
          <h2 id="generator-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
            Shape the starter system.
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--app-muted)]">{mood.description}</p>
          <div className="mt-6 rounded-[24px] bg-[var(--app-pale-green)]/70 p-4">
            <p className="text-sm font-semibold">{mood.label}</p>
            <p className="mt-1 text-sm text-[var(--app-muted)]">
              Recommended contrast: {mood.recommendedContrast}. Type direction: {mood.fontCategory}.
            </p>
          </div>
        </div>
        <GeneratorControls
          onChange={onChange}
          onGenerate={onGenerate}
          onRandomize={onRandomize}
          onResetLayout={onResetLayout}
          state={state}
        />
      </Panel>
    </section>
  );
}
