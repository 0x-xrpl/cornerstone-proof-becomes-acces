import Link from "next/link";
import type { PropsWithChildren } from "react";

const routes = [
  ["/", "Dashboard"],
  ["/proof", "Proof"],
  ["/keys", "Keys"],
  ["/squad", "Squad"],
  ["/console", "Console"],
  ["/wallet", "Wallet"]
] as const;

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-hero-grid">
      <header className="border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-coral">
              CornerStone
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">
              Proof becomes access
            </h1>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm text-ink/72">
            {routes.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-black/5 px-4 py-2 transition hover:border-coral/30 hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
