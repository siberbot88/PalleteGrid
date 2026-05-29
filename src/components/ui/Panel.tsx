import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type PanelProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "section" | "div" | "article";
};

export function Panel({ as: Component = "section", className, children, ...props }: PanelProps) {
  return (
    <Component
      className={cn(
        "rounded-[28px] bg-white/72 p-5 shadow-[0_18px_60px_rgba(16,16,20,0.08)] backdrop-blur md:p-6",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
