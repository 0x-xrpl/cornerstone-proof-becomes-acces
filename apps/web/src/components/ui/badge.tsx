import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  tone = "default"
}: PropsWithChildren<{ tone?: "default" | "accent" | "success" }>) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em]",
        tone === "default" && "border-line bg-white/[0.03] text-white/68",
        tone === "accent" && "border-metal/30 bg-metal/10 text-metal",
        tone === "success" && "border-pine/30 bg-pine/10 text-[#9dc69a]"
      )}
    >
      {children}
    </span>
  );
}
