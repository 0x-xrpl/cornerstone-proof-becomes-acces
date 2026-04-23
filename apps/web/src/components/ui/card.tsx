import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils/cn";

export function Card({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-black/5 bg-white/90 p-6 shadow-panel backdrop-blur",
        className
      )}
    >
      {children}
    </section>
  );
}
