"use client";

import "@mysten/dapp-kit/dist/index.css";

import { WalletProvider, SuiClientProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { activeNetwork } from "@/lib/config/sui";
import { networkConfig } from "@/lib/sui/network-config";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={activeNetwork}>
        <WalletProvider autoConnect={false}>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
