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
    <Card className="panel-metal max-w-3xl border-line/90">
      <p className="eyebrow-label">
        Wallet access
      </p>
      <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.04em] text-white">
        Wallet-native first, zkLogin-ready when enabled
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/64">
        Wallet connection is treated as an enabler for access flows, not as the
        main product surface.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="[&_button]:rounded-[0.85rem] [&_button]:border [&_button]:border-metal/40 [&_button]:bg-[linear-gradient(135deg,rgba(242,223,192,0.98)_0%,rgba(203,163,106,0.92)_42%,rgba(124,86,52,0.92)_100%)] [&_button]:px-5 [&_button]:py-3 [&_button]:text-[0.78rem] [&_button]:font-semibold [&_button]:uppercase [&_button]:tracking-[0.26em] [&_button]:text-[#120f0c]">
          <ConnectButton />
        </div>
        {connected ? (
          <Button variant="secondary" onClick={() => disconnect()}>
            Disconnect
          </Button>
        ) : null}
      </div>
      <div className="mt-6 space-y-2 text-sm text-white/56">
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
