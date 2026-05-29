import type { MoodId } from "@/lib/color/types";
import type { FontPairing } from "@/lib/fonts/types";

type FontCategory = "sans" | "serif" | "display" | "handwriting" | "typing";

type FontMeta = {
  family: string;
  category: FontCategory;
  fallback: string;
  moods: MoodId[];
  weights: number[];
};

const body =
  "A starter system for landing pages, dashboards, and visual explorations. Use the palette, type pairing, and preview cards as a clear first direction.";

const allMoods: MoodId[] = [
  "clean-minimal",
  "soft-editorial",
  "future-neon",
  "pastel-product",
  "gallery-grid",
  "calm-dashboard",
];

export const fontCatalog: FontMeta[] = [
  ["Inter", "sans"], ["Roboto", "sans"], ["Open Sans", "sans"], ["Lato", "sans"], ["Montserrat", "sans"],
  ["Poppins", "sans"], ["Source Sans 3", "sans"], ["IBM Plex Sans", "sans"], ["DM Sans", "sans"], ["Work Sans", "sans"],
  ["Nunito", "sans"], ["Manrope", "sans"], ["Plus Jakarta Sans", "sans"], ["Outfit", "sans"], ["Sora", "sans"],
  ["Space Grotesk", "sans"], ["Urbanist", "sans"], ["Figtree", "sans"], ["Public Sans", "sans"], ["Barlow", "sans"],
  ["Rubik", "sans"], ["Noto Sans", "sans"], ["Karla", "sans"], ["Red Hat Text", "sans"], ["Red Hat Display", "sans"],
  ["Raleway", "sans"], ["Jost", "sans"], ["Archivo", "sans"], ["Cabin", "sans"], ["Hind", "sans"],
  ["Merriweather", "serif"], ["Lora", "serif"], ["Playfair Display", "serif"], ["Libre Baskerville", "serif"], ["Cormorant Garamond", "serif"],
  ["PT Serif", "serif"], ["Fraunces", "serif"], ["Instrument Serif", "serif"], ["DM Serif Display", "serif"], ["Bitter", "serif"],
  ["Crimson Text", "serif"], ["EB Garamond", "serif"], ["Spectral", "serif"], ["Alegreya", "serif"], ["Vollkorn", "serif"],
  ["Libre Caslon Text", "serif"], ["Newsreader", "serif"], ["Noto Serif", "serif"], ["Cormorant", "serif"], ["Prata", "serif"],
  ["Bebas Neue", "display"], ["Oswald", "display"], ["Syne", "display"], ["Bricolage Grotesque", "display"], ["Chakra Petch", "display"],
  ["Exo 2", "display"], ["Anton", "display"], ["Fjalla One", "display"], ["Righteous", "display"], ["Bungee", "display"],
  ["Bungee Shade", "display"], ["Alfa Slab One", "display"], ["Staatliches", "display"], ["Unbounded", "display"], ["Teko", "display"],
  ["Archivo Black", "display"], ["Saira Condensed", "display"], ["Kanit", "display"], ["Prompt", "display"], ["Orbitron", "display"],
  ["Pacifico", "handwriting"], ["Caveat", "handwriting"], ["Dancing Script", "handwriting"], ["Permanent Marker", "handwriting"], ["Shadows Into Light", "handwriting"],
  ["Patrick Hand", "handwriting"], ["Gloria Hallelujah", "handwriting"], ["Indie Flower", "handwriting"], ["Amatic SC", "handwriting"], ["Kalam", "handwriting"],
  ["Satisfy", "handwriting"], ["Courgette", "handwriting"], ["Handlee", "handwriting"], ["Architects Daughter", "handwriting"], ["Just Another Hand", "handwriting"],
  ["Nothing You Could Do", "handwriting"], ["Reenie Beanie", "handwriting"], ["Gochi Hand", "handwriting"], ["Covered By Your Grace", "handwriting"], ["Rock Salt", "handwriting"],
  ["IBM Plex Mono", "typing"], ["Roboto Mono", "typing"], ["Source Code Pro", "typing"], ["JetBrains Mono", "typing"], ["Fira Code", "typing"],
  ["Space Mono", "typing"], ["Inconsolata", "typing"], ["Courier Prime", "typing"], ["Share Tech Mono", "typing"], ["Overpass Mono", "typing"],
].map(([family, category]) => {
  const cat = category as FontCategory;
  const moodsByCategory: Record<FontCategory, MoodId[]> = {
    sans: ["clean-minimal", "pastel-product", "calm-dashboard"],
    serif: ["soft-editorial", "gallery-grid", "calm-dashboard"],
    display: ["gallery-grid", "future-neon", "clean-minimal"],
    handwriting: ["soft-editorial", "pastel-product", "gallery-grid"],
    typing: ["future-neon", "calm-dashboard", "clean-minimal"],
  };
  const fallbackByCategory: Record<FontCategory, string> = {
    sans: "sans-serif",
    serif: "serif",
    display: "sans-serif",
    handwriting: "cursive",
    typing: "monospace",
  };
  return {
    family,
    category: cat,
    fallback: fallbackByCategory[cat],
    moods: moodsByCategory[cat],
    weights: cat === "handwriting" ? [400, 700] : cat === "typing" ? [400, 600] : [400, 600, 700],
  };
});

const bodyFonts = fontCatalog.filter((font) => font.category === "sans" || font.category === "serif").slice(0, 28);
const accentFonts = fontCatalog.filter((font) => font.category === "typing");

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function uniqueMoods(...groups: MoodId[][]): MoodId[] {
  return Array.from(new Set(groups.flat())).filter((mood): mood is MoodId => allMoods.includes(mood));
}

function personality(heading: FontMeta, bodyFont: FontMeta) {
  const labels: Record<FontCategory, string> = {
    sans: "clean, practical, product-ready",
    serif: "editorial, refined, readable",
    display: "bold, distinctive, visual",
    handwriting: "expressive, human, informal",
    typing: "technical, structured, precise",
  };
  return `${labels[heading.category]} heading with ${labels[bodyFont.category]} body text.`;
}

function bestFor(heading: FontMeta): string[] {
  const map: Record<FontCategory, string[]> = {
    sans: ["SaaS", "dashboards", "landing pages"],
    serif: ["editorial", "portfolios", "brand decks"],
    display: ["posters", "campaigns", "visual systems"],
    handwriting: ["creative brands", "events", "personal projects"],
    typing: ["developer tools", "technical docs", "data products"],
  };
  return map[heading.category];
}

function sampleHeadline(heading: FontMeta) {
  const map: Record<FontCategory, string> = {
    sans: "Build a visual system in minutes",
    serif: "Soft grids for sharp ideas",
    display: "Strong layouts for visual systems",
    handwriting: "Color with a human signature",
    typing: "Tokens aligned for technical teams",
  };
  return map[heading.category];
}

export const fontPairings: FontPairing[] = fontCatalog.flatMap((heading, headingIndex) =>
  bodyFonts.map((bodyFont, bodyIndex) => {
    const accent = accentFonts[(headingIndex + bodyIndex) % accentFonts.length];
    return {
      id: `${slug(heading.family)}-${slug(bodyFont.family)}`,
      name: `${heading.family} + ${bodyFont.family}`,
      moodIds: uniqueMoods(heading.moods, bodyFont.moods),
      heading: {
        family: heading.family,
        fallback: heading.fallback,
        weight: heading.weights,
      },
      body: {
        family: bodyFont.family,
        fallback: bodyFont.fallback,
        weight: bodyFont.weights,
      },
      accent:
        heading.category === "typing" || bodyIndex % 3 === 0
          ? {
              family: accent.family,
              fallback: accent.fallback,
              weight: accent.weights,
            }
          : undefined,
      personality: personality(heading, bodyFont),
      bestFor: bestFor(heading),
      sampleHeadline: sampleHeadline(heading),
      sampleBody: body,
    };
  }),
);
