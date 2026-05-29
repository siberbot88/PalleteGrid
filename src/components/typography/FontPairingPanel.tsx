import { FontSpecimen } from "@/components/typography/FontSpecimen";
import type { FontPairing } from "@/lib/fonts/types";

export function FontPairingPanel({ pairing }: { pairing: FontPairing }) {
  return (
    <section className="reveal space-y-5" aria-labelledby="font-heading">
      <div>
        <p className="section-kicker">Font pairing</p>
        <h2 id="font-heading" className="text-2xl font-semibold md:text-3xl">
          {pairing.name}
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--app-muted)]">{pairing.personality}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[24px] bg-white/75 p-5 shadow-[0_12px_40px_rgba(16,16,20,0.06)]">
          <dl className="grid gap-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                Heading
              </dt>
              <dd className="mt-1 text-xl font-semibold">{pairing.heading.family}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                Body
              </dt>
              <dd className="mt-1 text-xl font-semibold">{pairing.body.family}</dd>
            </div>
            {pairing.accent ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                  Accent
                </dt>
                <dd className="mt-1 text-xl font-semibold">{pairing.accent.family}</dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {pairing.bestFor.map((item) => (
              <span className="rounded-full bg-black/[0.05] px-3 py-1.5 text-sm" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <FontSpecimen pairing={pairing} />
      </div>
    </section>
  );
}
