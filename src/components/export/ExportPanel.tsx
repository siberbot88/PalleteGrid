"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/export/CodeBlock";
import { cn } from "@/lib/utils/cn";

type ExportPanelProps = {
  css: string;
  tailwind: string;
  json: string;
};

const tabs = ["CSS variables", "Tailwind tokens", "JSON tokens"] as const;

export function ExportPanel({ css, tailwind, json }: ExportPanelProps) {
  const [active, setActive] = useState<(typeof tabs)[number]>("CSS variables");
  const code = active === "CSS variables" ? css : active === "Tailwind tokens" ? tailwind : json;

  return (
    <section className="reveal space-y-5" aria-labelledby="export-heading">
      <div>
        <p className="section-kicker">Export</p>
        <h2 id="export-heading" className="text-2xl font-semibold md:text-3xl">
          Copy tokens into your next build.
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 rounded-full bg-white/70 p-1 shadow-inner">
        {tabs.map((tab) => (
          <button
            className={cn(
              "min-h-10 rounded-full px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--app-neon-blue)]",
              active === tab ? "bg-[var(--app-ink)] text-white" : "text-[var(--app-muted)] hover:bg-black/[0.04]",
            )}
            key={tab}
            onClick={() => setActive(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <CodeBlock code={code} label={active} />
    </section>
  );
}
