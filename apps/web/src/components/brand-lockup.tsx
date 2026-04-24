import { cn } from "@/lib/utils/cn";

export function BrandLockup({
  className,
  subtle = false
}: {
  className?: string;
  subtle?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-10 w-10 shrink-0"
        fill="none"
      >
        <defs>
          <linearGradient id="cornerstone-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2dfc0" />
            <stop offset="45%" stopColor="#c79b62" />
            <stop offset="100%" stopColor="#7b5734" />
          </linearGradient>
        </defs>
        <path
          d="M10 8h30l-6 8H16v9.5l16 7.5v8.5L10 31.5V8Z"
          fill="url(#cornerstone-metal)"
        />
        <path
          d="M22 23h28l-6 8H28v9.5l16 7.5v8.5L22 46.5V23Z"
          fill="url(#cornerstone-metal)"
          opacity="0.95"
        />
        <circle cx="47.5" cy="49.5" r="4.5" fill="url(#cornerstone-metal)" />
      </svg>

      <div className="min-w-0">
        <div className="text-[1.95rem] font-semibold leading-none tracking-[-0.04em] text-metal">
          CornerStone
        </div>
        {!subtle ? (
          <div className="mt-1 text-[0.6rem] uppercase tracking-[0.34em] text-metal-soft">
            Proof becomes access
          </div>
        ) : null}
      </div>
    </div>
  );
}
