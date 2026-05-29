import { motion } from "motion/react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ContrastBadge } from "@/components/palette/ContrastBadge";
import type { GeneratedColor } from "@/lib/color/types";

export function ColorSwatchCard({ color }: { color: GeneratedColor }) {
  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="grid min-h-56 content-between overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_rgba(16,16,20,0.07)]"
      data-role={color.role}
      data-testid="color-card"
      initial={{ opacity: 0, y: 10 }}
      layout
      style={{ color: "#101014" }}
      transition={{ duration: 0.22 }}
    >
      <div
        aria-label={`${color.name} swatch ${color.hex}`}
        className="min-h-24"
        style={{ backgroundColor: color.hex }}
      />
      <div className="grid gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">{color.name}</h3>
            <p className="font-mono text-sm text-[var(--app-muted)]">{color.hex}</p>
          </div>
          <ContrastBadge color={color} />
        </div>
        <p className="text-sm leading-6 text-[var(--app-muted)]">{color.usage}</p>
        <CopyButton className="justify-self-start px-0" label="Copy HEX" value={color.hex} />
      </div>
    </motion.article>
  );
}
