import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell";
import { AppProviders } from "@/components/providers/app-providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "CornerStone",
  description: "Support Proof to CornerKey to Access."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-display">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
