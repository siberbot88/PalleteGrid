import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ className, variant = "secondary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--app-neon-blue)] disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-[var(--app-neon-blue)] text-[#101014] shadow-[0_14px_36px_rgba(0,200,255,0.24)] hover:-translate-y-0.5 hover:bg-[var(--app-neon-blue-dark)] hover:text-white",
        variant === "secondary" &&
          "bg-white/80 text-[var(--app-ink)] shadow-[0_10px_34px_rgba(16,16,20,0.08)] hover:-translate-y-0.5",
        variant === "ghost" && "bg-transparent text-[var(--app-ink)] hover:bg-black/[0.04]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
