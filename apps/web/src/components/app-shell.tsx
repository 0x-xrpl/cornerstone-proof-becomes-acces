"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { cn } from "@/lib/utils/cn";

const routes = [
  ["/", "Dashboard"],
  ["/proof", "Proof"],
  ["/keys", "Keys"],
  ["/squad", "Squad"],
  ["/console", "Console"],
  ["/wallet", "Wallet"]
] as const;

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const usesCinematicShell =
    pathname === "/proof" ||
    pathname === "/access" ||
    pathname === "/keys" ||
    pathname === "/squad";

  return (
    <div className="min-h-screen bg-hero-grid">
      {!isHome && !usesCinematicShell ? (
        <header className="sticky top-0 z-40 border-b border-line/80 bg-[#090807]/84 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-6 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <Link href="/" className="shrink-0">
              <BrandLockup subtle />
            </Link>

            <nav className="flex flex-wrap items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/62">
              {routes.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "rounded-full border px-4 py-2 transition",
                    pathname === href
                      ? "border-metal/40 bg-white/[0.03] text-metal"
                      : "border-line bg-white/[0.015] hover:border-metal/28 hover:text-white"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      ) : null}

      <main
        className={cn(
          "mx-auto flex flex-col gap-8",
          isHome || usesCinematicShell
            ? "max-w-[96rem] px-3 py-3 sm:px-4 lg:px-6 lg:py-6"
            : "max-w-[92rem] px-5 py-8 sm:px-6 lg:px-8 lg:py-10"
        )}
      >
        {children}
      </main>
    </div>
  );
}
