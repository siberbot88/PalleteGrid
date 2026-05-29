import type { PreviewTheme } from "@/components/preview/PreviewCard";
import { getRelativeLuminance, getTextColorForBackground } from "@/lib/color/contrast";

function headingFont(theme: PreviewTheme) {
  return { fontFamily: `"${theme.headingFont}", sans-serif` };
}

function paletteColor(theme: PreviewTheme, index: number) {
  const usable = theme.colors.filter((item) => {
    const normalized = item.toUpperCase();
    return normalized !== "#FFFFFF" && getRelativeLuminance(normalized) > 0.04;
  });
  return usable[index % usable.length] ?? theme.primary;
}

function textOn(background: string) {
  return getTextColorForBackground(background);
}

export function HeroPreviewCard({ theme }: { theme: PreviewTheme }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[18px] p-5" style={{ background: theme.canvas }}>
      <div
        className="absolute -right-10 -top-12 h-36 w-36 rounded-full opacity-75"
        style={{ background: theme.accent }}
      />
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] opacity-60">Launch kit</p>
        <h3 className="max-w-md text-4xl font-semibold leading-none" style={headingFont(theme)}>
          Build a system before the first screen.
        </h3>
        <p className="mt-4 max-w-md text-sm leading-6 opacity-70">
          Palette, type, and interface rhythm previewed as one compact direction.
        </p>
      </div>
      <button
        className="mt-4 w-fit rounded-full px-4 py-2 text-sm font-semibold"
        style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
        type="button"
      >
        Start with tokens
      </button>
    </div>
  );
}

export function DashboardPreviewCard({ theme }: { theme: PreviewTheme }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: theme.accent }}>
          Live
        </span>
        <span className="text-xs opacity-60">Q2 signal</span>
      </div>
      <div>
        <p className="text-sm opacity-60">Conversion lift</p>
        <p className="text-5xl font-semibold" style={headingFont(theme)}>
          42%
        </p>
      </div>
      <div className="flex h-24 items-end gap-2">
        {[44, 68, 52, 82, 60, 92].map((height, index) => (
          <span
            className="flex-1 rounded-t-full"
            key={height}
            style={{ height: `${height}%`, background: index % 2 ? theme.secondary : theme.primary }}
          />
        ))}
      </div>
    </div>
  );
}

export function TypographyPreviewCard({ theme }: { theme: PreviewTheme }) {
  return (
    <div className="grid h-full content-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] opacity-55">{theme.headingFont} / {theme.bodyFont}</p>
        <h3 className="mt-3 text-4xl font-semibold leading-none" style={headingFont(theme)}>
          Rhythm gives color structure.
        </h3>
      </div>
      <p className="text-sm leading-6 opacity-70">
        A practical preview of heading scale, paragraph tone, and button density before code.
      </p>
    </div>
  );
}

export function GradientPosterCard({ theme }: { theme: PreviewTheme }) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[18px] p-5"
      style={{
        background: `radial-gradient(circle at 15% 20%, ${theme.secondary}, transparent 34%), radial-gradient(circle at 85% 20%, ${theme.accent}, transparent 32%), linear-gradient(135deg, ${theme.canvas}, ${theme.primary})`,
      }}
    >
      <span className="absolute -bottom-6 left-4 text-8xl font-semibold leading-none opacity-25" style={headingFont(theme)}>
        GRID
      </span>
      <span className="relative rounded-full px-3 py-1 text-xs font-semibold" style={{ background: paletteColor(theme, 0), color: textOn(paletteColor(theme, 0)) }}>Poster block</span>
    </div>
  );
}

export function StatsPreviewCard({ theme }: { theme: PreviewTheme }) {
  return (
    <div className="grid h-full content-between gap-5">
      <div>
        <p className="text-sm opacity-60">Design token coverage</p>
        <div className="mt-2 flex items-end gap-3">
          <span className="text-5xl font-semibold" style={headingFont(theme)}>
            96
          </span>
          <span className="mb-2 rounded-full px-2 py-1 text-xs font-semibold" style={{ background: theme.accent }}>
            +18%
          </span>
        </div>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-black/10">
        <span className="block h-full w-[78%] rounded-full" style={{ background: theme.primary }} />
      </div>
      <p className="text-sm leading-6 opacity-70">Strong contrast pairs are ready for headings, UI labels, and CTAs.</p>
    </div>
  );
}

export function FormPreviewCard({ theme }: { theme: PreviewTheme }) {
  const accent = paletteColor(theme, 0);
  const accentAlt = paletteColor(theme, 1);

  return (
    <div className="grid h-full content-between gap-4 text-sm">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold">Project setup</span>
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: accent, color: textOn(accent) }}>
            Ready
          </span>
        </div>
        <label className="grid gap-2 font-semibold">
          Project name
          <span
            className="flex items-center gap-3 rounded-[14px] border px-3 py-3 font-medium"
            style={{ background: theme.canvas, borderColor: accent, color: theme.ink }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: accent }} />
            PaletteGrid system
          </span>
        </label>
        <div className="rounded-[14px] border p-3" style={{ background: theme.canvas, borderColor: accentAlt, color: theme.ink }}>
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">Accessible contrast</span>
            <span className="h-6 w-11 rounded-full p-1" style={{ background: accent }}>
              <span className="block h-4 w-4 translate-x-5 rounded-full" style={{ background: accentAlt }} />
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Canvas", "Ink", "CTA"].map((item, index) => (
              <span
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                key={item}
                style={{
                  background: index === 2 ? accentAlt : "transparent",
                  borderColor: index === 2 ? accentAlt : accent,
                  color: index === 2 ? textOn(accentAlt) : theme.ink,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        className="rounded-full px-4 py-3 text-sm font-semibold"
        style={{ background: theme.primary, color: theme.textOnPrimary }}
        type="button"
      >
        Save direction
      </button>
    </div>
  );
}

export function NavigationPreviewCard({ theme }: { theme: PreviewTheme }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div className="flex items-center justify-between gap-4 rounded-full p-2" style={{ background: paletteColor(theme, 0), color: textOn(paletteColor(theme, 0)) }}>
        <span className="ml-2 flex items-center gap-2 font-semibold">
          <span className="h-7 w-7 rounded-full" style={{ background: theme.primary }} />
          PG
        </span>
        <div className="hidden gap-2 sm:flex">
          {["Tokens", "Preview", "Export"].map((item, index) => (
            <span
              className="rounded-full px-3 py-2 text-sm"
              key={item}
              style={{ background: index === 0 ? theme.accent : "transparent" }}
            >
              {item}
            </span>
          ))}
        </div>
        <span className="mr-2 h-3 w-3 rounded-full" style={{ background: theme.secondary }} />
      </div>
    </div>
  );
}

export function ComponentKitCard({ theme }: { theme: PreviewTheme }) {
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[0.85fr_1fr]">
      <div className="grid content-center gap-3">
        <button className="rounded-full px-4 py-3 text-sm font-semibold" style={{ background: theme.primary, color: theme.textOnPrimary }} type="button">
          Primary
        </button>
        <button className="rounded-full px-4 py-3 text-sm font-semibold" style={{ background: paletteColor(theme, 0), color: textOn(paletteColor(theme, 0)) }} type="button">
          Secondary
        </button>
      </div>
      <div className="grid content-center gap-3">
        <div className="flex -space-x-2">
          {[theme.primary, theme.secondary, theme.accent].map((color, index) => (
            <span className="h-10 w-10 rounded-full ring-2" key={`${color}-avatar-${index}`} style={{ background: color, ["--tw-ring-color" as string]: paletteColor(theme, 0) }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[theme.canvas, theme.ink, theme.primary, theme.secondary, theme.accent]
            .filter((color) => {
              const normalized = color.toUpperCase();
              return normalized !== "#FFFFFF" && getRelativeLuminance(normalized) > 0.04;
            })
            .map((color, index) => (
            <span className="h-8 w-8 rounded-full shadow-inner" key={`${color}-${index}`} style={{ background: color }} />
          ))}
        </div>
      </div>
    </div>
  );
}
