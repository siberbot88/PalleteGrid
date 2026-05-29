import type { GeneratedColor } from "@/lib/color/types";

export function ContrastBadge({ color }: { color: GeneratedColor }) {
  const readable = color.textOnColor === "#101014" ? "Dark text" : "White text";
  return (
    <span className="inline-flex items-center rounded-full bg-black/[0.06] px-2.5 py-1 text-xs font-semibold">
      {readable}
    </span>
  );
}
