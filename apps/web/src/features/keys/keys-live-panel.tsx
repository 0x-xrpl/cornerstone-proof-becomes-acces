"use client";

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

import { RouteHeader } from "@/components/route-header";
import { Card } from "@/components/ui/card";
import { KeyGrid } from "@/features/keys/key-grid";
import { KeysSummaryCard } from "@/features/keys/keys-summary-card";
import { listHybridKeys } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";

export function KeysLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  const keys = keyQuery.data ?? [];

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="CornerKey"
        title="Rule-based access keys"
        description="This list now reflects the connected wallet when a published package ID is configured. Otherwise it falls back to the scaffolded mock key state."
        badge={
          account?.address && packageConfigured
            ? "Live wallet mode"
            : "Mock fallback"
        }
      />

      {!account?.address ? (
        <Card className="max-w-3xl text-sm leading-7 text-ink/72">
          Connect a wallet to see live key ownership. Without a connected wallet,
          the route shows the demo-ready mock state.
        </Card>
      ) : null}

      <KeysSummaryCard />

      <KeyGrid keys={keys} />
    </div>
  );
}
