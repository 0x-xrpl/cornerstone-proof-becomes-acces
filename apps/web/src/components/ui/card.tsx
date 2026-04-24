import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils/cn";

export function Card({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={cn(
        "panel-dark relative overflow-hidden rounded-[28px] p-6 shadow-panel backdrop-blur",
        className
      )}
    >
      {children}
    </section>
  );
}
