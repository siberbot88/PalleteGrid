export function GradientOrb({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-2xl ${className}`}
    />
  );
}
