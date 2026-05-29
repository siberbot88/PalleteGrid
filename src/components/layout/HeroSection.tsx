"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/ui/GradientOrb";

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mounted = true;
    import("splitting")
      .then((mod) => {
        if (!mounted) return;
        mod.default({ target: heading, by: "words" });
        heading.classList.add("is-split");
      })
      .catch(() => heading.classList.remove("is-split"));
    return () => {
      mounted = false;
      heading.classList.remove("is-split");
    };
  }, []);

  return (
    <section className="relative grid min-h-[88vh] items-center gap-10 overflow-hidden py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
      <GradientOrb className="left-[8%] top-[18%] h-44 w-44 bg-[var(--app-soft-pink)]/55" />
      <GradientOrb className="right-[18%] top-[12%] h-40 w-40 bg-[var(--app-neon-blue)]/18" />
      <div className="relative z-10">
        <p className="section-kicker">PaletteGrid</p>
        <h1
          className="hero-title mt-4 max-w-4xl text-[var(--app-ink)]"
          ref={headingRef}
        >
          Generate a starter design system from color and type.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--app-muted)]">
          Pick a mood, tune the palette, preview real UI components, then copy CSS, Tailwind, or JSON tokens.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#generator">
            <Button type="button" variant="primary">
              <Sparkles size={18} aria-hidden />
              Generate system
            </Button>
          </a>
          <a href="#preview">
            <Button type="button">
              <ArrowDown size={18} aria-hidden />
              Preview as product UI
            </Button>
          </a>
        </div>
      </div>
      <div className="relative z-10 min-h-[430px]">
        <div className="absolute inset-x-0 top-6 mx-auto h-[380px] max-w-[560px] rounded-[48px] bg-white/78 p-5 shadow-[0_24px_90px_rgba(16,16,20,0.12)]">
          <div className="grid h-full grid-cols-6 grid-rows-5 gap-3">
            <div className="col-span-4 row-span-3 rounded-[28px] bg-[var(--app-pale-green)] p-5">
              <div className="h-8 w-28 rounded-full bg-white/80" />
              <div className="mt-20 h-8 w-52 rounded-full bg-[var(--app-ink)]/85" />
              <div className="mt-3 h-4 w-40 rounded-full bg-[var(--app-ink)]/25" />
            </div>
            <div className="col-span-2 row-span-2 rounded-[28px] bg-[var(--app-neon-blue)] p-4">
              <div className="h-full rounded-[22px] bg-white/40" />
            </div>
            <div className="col-span-2 row-span-3 rounded-[28px] bg-[var(--app-soft-pink)] p-4">
              <div className="h-20 rounded-full bg-white/65" />
              <div className="mt-4 h-28 rounded-[22px] bg-white/50" />
            </div>
            <div className="col-span-3 row-span-2 rounded-[28px] bg-white p-4 shadow-inner">
              <div className="flex h-full items-end gap-2">
                {[52, 78, 44, 92, 66].map((height) => (
                  <span className="flex-1 rounded-t-full bg-[var(--app-neon-blue)]" key={height} style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="col-span-3 row-span-2 rounded-[28px] bg-[var(--app-ink)] p-4">
              <div className="h-5 w-32 rounded-full bg-white/80" />
              <div className="mt-4 h-16 rounded-[18px] bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
