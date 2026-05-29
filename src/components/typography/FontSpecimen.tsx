import type { FontPairing } from "@/lib/fonts/types";

function fontStack(family: string, fallback: string) {
  return `"${family}", ${fallback}`;
}

export function FontSpecimen({ pairing }: { pairing: FontPairing }) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-[0_12px_40px_rgba(16,16,20,0.06)]">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
        Specimen
      </p>
      <h3
        className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl"
        style={{ fontFamily: fontStack(pairing.heading.family, pairing.heading.fallback) }}
      >
        {pairing.sampleHeadline}
      </h3>
      <p
        className="mt-4 max-w-2xl text-base leading-7 text-[var(--app-muted)]"
        style={{ fontFamily: fontStack(pairing.body.family, pairing.body.fallback) }}
      >
        {pairing.sampleBody}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <span className="rounded-full bg-[var(--app-neon-blue)] px-4 py-2 text-sm font-semibold text-[#101014]">
          Preview system
        </span>
        <span className="rounded-full bg-[var(--app-pale-green)] px-4 py-2 text-sm font-semibold text-[#101014]">
          {pairing.bestFor[0]}
        </span>
      </div>
    </div>
  );
}
