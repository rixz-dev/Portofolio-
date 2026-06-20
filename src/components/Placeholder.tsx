import { cn } from "../utils/cn";

interface PlaceholderProps {
  label: string;
  hint?: string;
  index?: string;
  className?: string;
  ratio?: "1/1" | "4/3" | "16/9" | "3/2";
}

export function Placeholder({
  label,
  hint,
  index,
  className,
  ratio = "4/3",
}: PlaceholderProps) {
  const ratioClass = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "3/2": "aspect-[3/2]",
  }[ratio];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border border-[var(--color-bone-2)]/20 bg-[var(--color-dusk)]",
        ratioClass,
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0e0e0c_0%,#161614_50%,#0a0a0a_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(243,241,236,0.08) 3px, rgba(243,241,236,0.08) 4px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(243,241,236,0.08), transparent 60%), radial-gradient(circle at 75% 75%, rgba(243,241,236,0.05), transparent 65%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-start justify-between p-4">
        <div className="flex w-full items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45">
            PLACEHOLDER
          </span>
          {index && (
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45">
              {index}
            </span>
          )}
        </div>
        <div className="space-y-1.5">
          <div className="font-condensed text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/35">
            [ REPLACE WITH ASSET ]
          </div>
          <div className="font-display text-[15px] uppercase leading-none text-[var(--color-paper)]/80">
            {label}
          </div>
          {hint && (
            <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-paper)]/40">
              {hint}
            </div>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--color-bone-2)]/10" />
      <div className="scanline" />
    </div>
  );
}
