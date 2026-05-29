import { GripHorizontal } from "lucide-react";
import type { ReactNode } from "react";

export type PreviewTheme = {
  colors: string[];
  canvas: string;
  ink: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  textOnPrimary: string;
  textOnSecondary: string;
  headingFont: string;
  bodyFont: string;
};

export function PreviewCard({
  title,
  theme,
  children,
}: {
  title: string;
  theme: PreviewTheme;
  children: ReactNode;
}) {
  return (
    <article
      className="preview-card flex h-full min-h-[220px] flex-col overflow-hidden rounded-[24px] p-4 shadow-[0_14px_42px_rgba(16,16,20,0.1)] transition"
      style={{ backgroundColor: theme.surface, color: theme.ink, fontFamily: `"${theme.bodyFont}", sans-serif` }}
    >
      <div className="drag-handle mb-3 flex cursor-grab items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-current/55 active:cursor-grabbing">
        <span>{title}</span>
        <GripHorizontal size={16} aria-hidden />
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </article>
  );
}
