"use client";

import { ConnectButton } from "@mysten/dapp-kit";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featureFlags } from "@/lib/config/sui";
import { useWalletStatus } from "@/features/wallet/use-wallet-status";
import { cornerstonePackageId } from "@/lib/sui/package";

export function WalletStatusCard() {
  const { connected, address, disconnect } = useWalletStatus();

  return (
    <Card className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
        Wallet access
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-ink">
        Wallet-native first, zkLogin-ready when enabled
      </h3>
      <p className="mt-3 text-sm leading-6 text-ink/72">
        Wallet connection is treated as an enabler for access flows, not as the
        main product surface.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <ConnectButton />
        {connected ? (
          <Button variant="secondary" onClick={() => disconnect()}>
            Disconnect
          </Button>
        ) : null}
      </div>
      <div className="mt-6 space-y-2 text-sm text-ink/68">
        <p>Connected: {connected ? "Yes" : "No"}</p>
        <p>Address: {address ?? "No account connected"}</p>
        <p>Package ID: {cornerstonePackageId ?? "Not configured"}</p>
        <p>zkLogin flag: {featureFlags.zkLogin ? "Enabled" : "Disabled"}</p>
        <p>
          Sponsored tx flag:{" "}
          {featureFlags.sponsoredTransactions ? "Enabled" : "Disabled"}
        </p>
      </div>
    </Card>
  );
}
