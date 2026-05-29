"use client";

import { ResponsiveGridLayout, useContainerWidth, type ResponsiveLayouts } from "react-grid-layout";
import { useMemo, useState } from "react";
import { PreviewCard, type PreviewTheme } from "@/components/preview/PreviewCard";
import { VisualShowcase } from "@/components/preview/VisualShowcase";
import {
  ComponentKitCard,
  DashboardPreviewCard,
  FormPreviewCard,
  GradientPosterCard,
  HeroPreviewCard,
  NavigationPreviewCard,
  StatsPreviewCard,
  TypographyPreviewCard,
} from "@/components/preview/cards/PreviewCards";
import type { GeneratedPalette } from "@/lib/color/types";
import type { FontPairing } from "@/lib/fonts/types";

const defaultLayouts: ResponsiveLayouts = {
  lg: [
    { i: "hero", x: 0, y: 0, w: 6, h: 4 },
    { i: "dashboard", x: 6, y: 0, w: 3, h: 4 },
    { i: "typography", x: 9, y: 0, w: 3, h: 4 },
    { i: "poster", x: 0, y: 4, w: 4, h: 4 },
    { i: "stats", x: 4, y: 4, w: 4, h: 4 },
    { i: "form", x: 8, y: 4, w: 4, h: 4 },
    { i: "nav", x: 0, y: 8, w: 5, h: 3 },
    { i: "kit", x: 5, y: 8, w: 7, h: 3 },
  ],
};

function cloneDefaultLayouts(): ResponsiveLayouts {
  return Object.fromEntries(
    Object.entries(defaultLayouts).map(([breakpoint, layout]) => [
      breakpoint,
      layout?.map((item) => ({ ...item })) ?? [],
    ]),
  );
}

function getRoleHex(palette: GeneratedPalette, role: string, fallback: string) {
  return palette.colors.find((color) => color.role === role)?.hex ?? fallback;
}

export function createPreviewTheme(palette: GeneratedPalette, fontPairing: FontPairing): PreviewTheme {
  const colors = palette.colors.map((color) => color.hex);
  const primary = palette.colors.find((color) => color.role === "primary");
  const secondary = palette.colors.find((color) => color.role === "secondary");
  return {
    colors,
    canvas: getRoleHex(palette, "canvas", "#FBFBF8"),
    ink: getRoleHex(palette, "ink", "#101014"),
    surface: getRoleHex(palette, "surface", getRoleHex(palette, "canvas", colors[0] ?? "#FBFBF8")),
    primary: primary?.hex ?? "#00C8FF",
    secondary: secondary?.hex ?? primary?.hex ?? colors[2] ?? "#00C8FF",
    accent: getRoleHex(palette, "accent", secondary?.hex ?? primary?.hex ?? colors[1] ?? "#101014"),
    textOnPrimary: primary?.textOnColor ?? "#101014",
    textOnSecondary: secondary?.textOnColor ?? "#101014",
    headingFont: fontPairing.heading.family,
    bodyFont: fontPairing.body.family,
  };
}

function cards(theme: PreviewTheme) {
  return [
    { id: "hero", title: "Hero Preview", node: <HeroPreviewCard theme={theme} /> },
    { id: "dashboard", title: "Dashboard Preview", node: <DashboardPreviewCard theme={theme} /> },
    { id: "typography", title: "Typography Preview", node: <TypographyPreviewCard theme={theme} /> },
    { id: "poster", title: "Gradient Poster", node: <GradientPosterCard theme={theme} /> },
    { id: "stats", title: "Stats Preview", node: <StatsPreviewCard theme={theme} /> },
    { id: "form", title: "Form Preview", node: <FormPreviewCard theme={theme} /> },
    { id: "nav", title: "Navigation Strip", node: <NavigationPreviewCard theme={theme} /> },
    { id: "kit", title: "Component Kit", node: <ComponentKitCard theme={theme} /> },
  ];
}

export function GridCanvas({
  palette,
  fontPairing,
  layoutVersion,
}: {
  palette: GeneratedPalette;
  fontPairing: FontPairing;
  layoutVersion: number;
}) {
  const theme = useMemo(() => createPreviewTheme(palette, fontPairing), [palette, fontPairing]);
  const previewCards = cards(theme);

  return (
    <section className="reveal space-y-5" aria-labelledby="preview-heading">
      <div>
        <p className="section-kicker">Preview canvas</p>
        <h2 id="preview-heading" className="text-2xl font-semibold md:text-3xl">
          See the palette as real design directions.
        </h2>
      </div>
      <VisualShowcase theme={theme} />
      <div className="pt-2">
        <p className="section-kicker">Draggable components</p>
        <h3 className="mt-2 text-xl font-semibold md:text-2xl">Rearrange UI cards after checking the visual samples.</h3>
      </div>
      <div className="grid gap-4 lg:hidden">
        {previewCards.map((card) => (
          <PreviewCard key={card.id} theme={theme} title={card.title}>
            {card.node}
          </PreviewCard>
        ))}
      </div>
      <DesktopGrid key={layoutVersion} previewCards={previewCards} theme={theme} />
    </section>
  );
}

function DesktopGrid({
  previewCards,
  theme,
}: {
  previewCards: ReturnType<typeof cards>;
  theme: PreviewTheme;
}) {
  const { containerRef, width } = useContainerWidth({ initialWidth: 1280 });
  const [layouts, setLayouts] = useState<ResponsiveLayouts>(() => cloneDefaultLayouts());

  return (
    <div className="hidden lg:block" data-testid="preview-canvas" ref={containerRef}>
      <ResponsiveGridLayout
        breakpoints={{ lg: 1100, md: 900, sm: 640, xs: 0 }}
        className="layout"
        cols={{ lg: 12, md: 8, sm: 4, xs: 1 }}
        dragConfig={{ handle: ".drag-handle" }}
        layouts={layouts}
        margin={[16, 16]}
        onLayoutChange={(_, nextLayouts) => setLayouts(nextLayouts)}
        resizeConfig={{ enabled: false }}
        rowHeight={86}
        width={width}
      >
        {previewCards.map((card) => (
          <div key={card.id}>
            <PreviewCard theme={theme} title={card.title}>
              {card.node}
            </PreviewCard>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
