"use client";

import { SegmentedControl } from "@/components/ui/SegmentedControl";
import type { PaletteSize } from "@/lib/color/types";

export function PaletteSizeControl({
  value,
  onChange,
}: {
  value: PaletteSize;
  onChange: (value: PaletteSize) => void;
}) {
  return (
    <SegmentedControl
      label="Palette size"
      onChange={onChange}
      options={[
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
      ]}
      value={value}
    />
  );
}
