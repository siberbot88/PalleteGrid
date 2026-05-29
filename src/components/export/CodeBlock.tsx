import { CopyButton } from "@/components/ui/CopyButton";

export function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <article className="overflow-hidden rounded-[24px] bg-[#101014] text-white shadow-[0_18px_60px_rgba(16,16,20,0.14)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-semibold">{label}</h3>
        <CopyButton className="text-white hover:bg-white/10" label={`Copy ${label}`} value={code} />
      </div>
      <pre className="max-h-80 overflow-auto p-4 text-xs leading-6 text-white/82">
        <code>{code}</code>
      </pre>
    </article>
  );
}
