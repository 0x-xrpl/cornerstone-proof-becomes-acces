import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  tone = "default"
}: PropsWithChildren<{ tone?: "default" | "accent" | "success" }>) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
        tone === "default" && "bg-ink/5 text-ink/70",
        tone === "accent" && "bg-coral/10 text-coral",
        tone === "success" && "bg-pine/10 text-pine"
      )}
    >
      {children}
    </span>
  );
}
