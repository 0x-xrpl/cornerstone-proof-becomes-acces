import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[0.85rem] border px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.26em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-metal/40 bg-metal-sheen text-[#120f0c] shadow-glow hover:brightness-105",
        secondary:
          "border-line bg-white/[0.02] text-white hover:border-metal/28 hover:bg-white/[0.04]",
        accent:
          "border-metal/40 bg-metal-sheen text-[#120f0c] shadow-glow hover:brightness-105",
        ghost:
          "border-transparent bg-transparent px-3 py-2 text-metal-soft hover:text-metal"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}
