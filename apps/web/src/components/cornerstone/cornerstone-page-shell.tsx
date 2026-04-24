"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const navItems = [
  ["Dashboard", "/"],
  ["Proof", "/proof"],
  ["Access", "/access"],
  ["Squad", "/squad"],
  ["Console", "/console"],
  ["Wallet", "/wallet"]
] as const;

function compactAddress(address: string | undefined) {
  if (!address) return "0xA7D3...9F21";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function CornerstonePageShell({
  active,
  section,
  title,
  eyebrow,
  subcopy,
  children,
  footer = true
}: {
  active: "proof" | "access" | "squad";
  section: string;
  title: string;
  eyebrow: string;
  subcopy: string;
  children: ReactNode;
  footer?: boolean;
}) {
  const pathname = usePathname() ?? "/";
  const account = useCurrentAccount();

  return (
    <section className="cs-page">
      <div className="cs-shell">
        <header className="cs-header">
          <Link href="/" className="cs-logo" aria-label="CornerStone dashboard">
            <img
              src="/assets/cornerstone/logo/cornerstone-logo-horizontal-black-background.png"
              alt=""
            />
            <span>
              <strong>CornerStone</strong>
              <small>Proof becomes access</small>
            </span>
          </Link>

          <nav className="cs-nav" aria-label="Primary">
            {navItems.map(([label, href]) => {
              const current =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn("cs-nav-link", current && "is-active")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="cs-wallet">
            <div>
              <span className="cs-green-dot" />
              <strong>{account?.address ? "Wallet connected" : "Wallet preview"}</strong>
              <small>{compactAddress(account?.address)}</small>
            </div>
            <Link href="/wallet" className="cs-live-badge">
              Live wallet mode
            </Link>
          </div>
        </header>

        <section className="cs-title-row">
          <div>
            <p className="cs-section-label">{section}</p>
            <h1>{title}</h1>
            <p>{subcopy}</p>
          </div>
          <div className="cs-title-stamp">
            <span>{eyebrow}</span>
            <strong>3 / 3</strong>
            <small>recognized support proofs</small>
          </div>
        </section>

        <div className={cn("cs-content", `cs-content-${active}`)}>{children}</div>

        {footer ? (
          <footer className="cs-footer">
            <div className="cs-footer-brand">
              <img
                src="/assets/cornerstone/logo/cornerstone-logo-vertical-black-background.png"
                alt=""
              />
              <span>CornerStone</span>
            </div>
            <div>
              <h2>Support should not disappear.</h2>
              <h3>It should open the next distance.</h3>
            </div>
            <p>
              次の景色へ、つながる鍵を。
              <span>Proof becomes access.</span>
            </p>
          </footer>
        ) : null}
      </div>
    </section>
  );
}
