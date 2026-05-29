import type { PreviewTheme } from "@/components/preview/PreviewCard";
import { getRelativeLuminance, getTextColorForBackground } from "@/lib/color/contrast";

function headingFont(theme: PreviewTheme) {
  return { fontFamily: `"${theme.headingFont}", sans-serif` };
}

function bodyFont(theme: PreviewTheme) {
  return { fontFamily: `"${theme.bodyFont}", sans-serif` };
}

function color(theme: PreviewTheme, index: number) {
  const usable = decorativeColors(theme);
  return usable[index % usable.length] ?? theme.primary;
}

function chartColor(theme: PreviewTheme, index: number, background?: string) {
  const usable = chartColors(theme, background);
  return usable[index % usable.length] ?? "#FFFFFF";
}

function textOn(background: string) {
  return getTextColorForBackground(background);
}

function decorativeColors(theme: PreviewTheme) {
  const usable = theme.colors.filter((item) => {
    const normalized = item.toUpperCase();
    return normalized !== "#FFFFFF" && getRelativeLuminance(normalized) > 0.04;
  });
  return usable.length > 0 ? usable : [theme.primary, theme.secondary, theme.accent].filter(
    (item) => item.toUpperCase() !== "#FFFFFF" && getRelativeLuminance(item) > 0.04,
  );
}

function chartColors(theme: PreviewTheme, background?: string) {
  const backgroundHex = background?.toUpperCase();
  const usable = theme.colors.filter((item) => {
    const normalized = item.toUpperCase();
    return normalized !== backgroundHex && getRelativeLuminance(normalized) > 0.04;
  });
  return usable.length > 0 ? usable : ["#FFFFFF", theme.primary, theme.secondary, theme.accent].filter(
    (item) => item.toUpperCase() !== backgroundHex && getRelativeLuminance(item) > 0.04,
  );
}

function palette(theme: PreviewTheme) {
  return {
    canvas: theme.canvas,
    ink: theme.ink,
    primary: color(theme, 0),
    secondary: color(theme, 1),
    accent: color(theme, 2),
    extra: color(theme, 3),
  };
}

function AbstractShapes({
  theme,
  compact = false,
  className = "",
}: {
  theme: PreviewTheme;
  compact?: boolean;
  className?: string;
}) {
  const p = palette(theme);
  const gridLines = Array.from({ length: compact ? 6 : 9 });

  return (
    <div className={`relative h-full min-h-[190px] overflow-hidden ${className}`} style={{ background: p.canvas }} aria-hidden>
      <div className="absolute right-6 top-6 grid grid-cols-6 opacity-25">
        {gridLines.map((_, row) =>
          gridLines.map((__, col) => (
            <span
              className="h-5 w-5 border"
              key={`${row}-${col}`}
              style={{ borderColor: p.primary }}
            />
          )),
        )}
      </div>
      <span className="absolute -left-12 -top-10 h-48 w-48 rounded-full" style={{ background: p.primary, opacity: 0.82 }} />
      <span className="absolute left-10 top-12 h-28 w-28 rounded-full" style={{ background: p.secondary }} />
      <span className="absolute right-10 top-14 h-20 w-20 rotate-45" style={{ background: p.primary }} />
      <span className="absolute bottom-8 left-[38%] h-24 w-24 rounded-full" style={{ background: p.secondary, opacity: 0.9 }} />
      <span className="absolute bottom-6 right-8 h-28 w-28" style={{ background: p.accent }} />
      {!compact ? (
        <span className="absolute bottom-0 left-0 h-20 w-52" style={{ background: p.primary, opacity: 0.72 }} />
      ) : null}
    </div>
  );
}

function TypeSpecimen({ theme }: { theme: PreviewTheme }) {
  const p = palette(theme);

  return (
    <article
      className="grid min-h-[300px] rounded-[10px] p-7 shadow-[0_16px_48px_rgba(16,16,20,0.09)]"
      style={{ background: p.canvas, color: p.ink }}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] opacity-60">Typography specimen</p>
          <h3 className="mt-4 text-3xl font-black leading-[0.94] md:text-4xl" style={headingFont(theme)}>
            Color<br />Type System
          </h3>
        </div>
        <div className="grid gap-2 text-right text-xs font-bold opacity-70" style={bodyFont(theme)}>
          <span>{theme.headingFont}</span>
          <span>{theme.bodyFont}</span>
        </div>
      </div>
      <div className="mt-7 grid items-start gap-5 md:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-2">
          {["Display / 72", "Heading / 40", "Body / 16"].map((label, index) => (
            <div className="flex items-center gap-3" key={label}>
              <span className="h-3 rounded-full" style={{ width: `${96 - index * 18}px`, background: color(theme, index + 2) }} />
              <span className="text-xs font-bold opacity-60">{label}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[8px] p-4" style={{ background: color(theme, 2), color: textOn(color(theme, 2)) }}>
          <p className="text-sm font-bold leading-6" style={bodyFont(theme)}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {decorativeColors(theme).map((chip, index) => (
          <span className="h-7 w-14 rounded-full" key={`${chip}-type-${index}`} style={{ background: chip }} />
        ))}
      </div>
    </article>
  );
}

function DashboardSample({ theme }: { theme: PreviewTheme }) {
  const p = palette(theme);
  const chartPanel = color(theme, 0);
  const chartAccent = chartColor(theme, 0, chartPanel);
  const chartAccentAlt = chartColor(theme, 1, chartPanel);
  const bars = [24, 42, 31, 55, 39, 68, 48];
  const line = [28, 34, 30, 46, 42, 58, 70];
  const max = 75;
  const x = (index: number) => 26 + index * 42;
  const y = (value: number) => 150 - (value / max) * 112;
  const path = line.map((value, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(value)}`).join(" ");

  return (
    <article
      className="overflow-hidden rounded-[10px] p-6 shadow-[0_16px_48px_rgba(16,16,20,0.09)]"
      style={{ background: p.canvas, color: p.ink }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-black" style={headingFont(theme)}>Dashboard</h3>
        <span className="rounded-full px-4 py-2 text-xs font-black" style={{ background: p.ink, color: p.canvas }}>
          Dummy data
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {["MRR", "Customers", "Active", "Churn"].map((label, index) => (
          <div className="rounded-[8px] p-4" key={label} style={{ background: color(theme, index), color: textOn(color(theme, index)) }}>
            <p className="text-xs font-bold opacity-70">{label}</p>
            <p className="mt-2 text-2xl font-black">{["$12.4k", "16,601", "33%", "2%"][index]}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[8px] p-4" style={{ background: chartPanel }}>
          <svg viewBox="0 0 320 170" role="img" aria-label="Dummy bar and line chart" className="h-56 w-full">
            {[0, 1, 2, 3].map((tick) => (
              <line key={tick} x1="18" x2="304" y1={28 + tick * 34} y2={28 + tick * 34} stroke={chartAccent} strokeOpacity="0.22" />
            ))}
            {bars.map((value, index) => (
              <rect
                fill={chartColor(theme, index + 1, chartPanel)}
                height={(value / max) * 112}
                key={`${value}-${index}`}
                rx="8"
                width="22"
                x={x(index) - 11}
                y={150 - (value / max) * 112}
              />
            ))}
            <path d={path} fill="none" stroke={chartAccent} strokeLinecap="round" strokeWidth="4" />
            {line.map((value, index) => (
              <circle cx={x(index)} cy={y(value)} fill={chartColor(theme, index + 2, chartPanel)} key={`${value}-dot-${index}`} r="5" stroke={chartAccentAlt} strokeWidth="2" />
            ))}
          </svg>
        </div>
        <div className="grid gap-4">
          <div className="grid place-items-center rounded-[8px] p-4" style={{ background: chartPanel }}>
            <svg viewBox="0 0 140 140" role="img" aria-label="Dummy donut chart" className="h-36 w-36">
              <circle cx="70" cy="70" fill="none" r="42" stroke={chartAccent} strokeWidth="22" />
              <circle cx="70" cy="70" fill="none" r="42" stroke={chartAccentAlt} strokeDasharray="92 264" strokeLinecap="butt" strokeWidth="22" transform="rotate(-90 70 70)" />
              <circle cx="70" cy="70" fill={p.canvas} r="28" />
              <text fill={p.ink} fontSize="22" fontWeight="900" textAnchor="middle" x="70" y="78">342</text>
            </svg>
          </div>
          <div className="rounded-[8px] p-4" style={{ background: chartPanel }}>
            {chartColors(theme, chartPanel).slice(0, 4).map((chip, index) => (
              <span className="mb-2 block h-3 rounded-full" key={`${chip}-line-${index}`} style={{ width: `${88 - index * 15}%`, background: chip }} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function VisualShowcase({ theme }: { theme: PreviewTheme }) {
  const p = palette(theme);

  return (
    <div className="grid gap-5" data-testid="visual-showcase">
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="overflow-hidden rounded-[10px] shadow-[0_16px_48px_rgba(16,16,20,0.09)]" style={{ background: p.canvas, color: p.ink }}>
          <div className="grid min-h-[360px] gap-6 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-7">
            <div className="flex min-w-0 flex-col justify-between">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-sm font-black">
                  <span className="h-7 w-7 rounded-full" style={{ background: p.primary }} />
                  <span>Studio System</span>
                </div>
                <div className="hidden gap-2 lg:flex">
                  {["Work", "Services"].map((item, index) => (
                    <span className="rounded-full px-3 py-1.5 text-xs font-bold" key={item} style={{ background: color(theme, index + 2), color: textOn(color(theme, index + 2)) }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] opacity-60">Home web concept</p>
                <h3 className="max-w-sm text-3xl font-black leading-[1] md:text-4xl" style={headingFont(theme)}>
                  Visual identity in a clean layout.
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-6 opacity-72" style={bodyFont(theme)}>
                  A compact homepage sample using the current palette.
                </p>
              </div>
            </div>
            <div className="self-center">
              <AbstractShapes className="h-[260px] rounded-[8px] shadow-[0_12px_34px_rgba(16,16,20,0.1)]" theme={theme} />
            </div>
          </div>
        </article>

        <div className="grid gap-5">
          <article className="overflow-hidden rounded-[10px] shadow-[0_16px_48px_rgba(16,16,20,0.09)]">
            <AbstractShapes className="h-[220px]" theme={theme} />
          </article>
          <article className="grid min-h-[190px] overflow-hidden rounded-[10px] shadow-[0_16px_48px_rgba(16,16,20,0.09)] sm:grid-cols-[0.48fr_0.52fr]">
            <div className="grid content-between p-6" style={{ background: p.canvas, color: p.ink }}>
              <h3 className="text-3xl font-black leading-none" style={headingFont(theme)}>
                Design<br />Studio
              </h3>
              <div className="text-xs font-bold leading-5" style={bodyFont(theme)}>
                <p className="text-base">Arthur Powell</p>
                <p className="opacity-55">ART DIRECTOR</p>
                <p className="mt-4 font-mono tracking-[0.14em]">123-456-7890</p>
              </div>
            </div>
            <AbstractShapes compact className="h-full min-h-[190px]" theme={theme} />
          </article>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <TypeSpecimen theme={theme} />
        <DashboardSample theme={theme} />
      </div>
    </div>
  );
}
