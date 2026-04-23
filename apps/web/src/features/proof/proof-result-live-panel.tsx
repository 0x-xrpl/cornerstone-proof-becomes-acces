"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

import { RouteHeader } from "@/components/route-header";
import { Card } from "@/components/ui/card";
import { listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";

export function ProofResultLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();

  const proofQuery = useQuery({
    queryKey: ["cornerstone", "proofs", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridProofs(client, account?.address ?? null)
  });

  const recognizedProofs = (proofQuery.data ?? []).filter(
    (proof) => proof.status === "recognized"
  );

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Proof Result"
        title="Recognition state"
        description="This route now reflects the connected wallet when a package ID is configured, so it can show live recognized proof objects instead of a fixed mock summary."
        badge={account?.address && packageConfigured ? "Live wallet mode" : "Mock fallback"}
      />
      <Card className="max-w-3xl">
        <h3 className="text-2xl font-semibold text-ink">
          {recognizedProofs.length} proof items currently recognized
        </h3>
        <div className="mt-5 space-y-3 text-sm leading-6 text-ink/72">
          {recognizedProofs.map((proof) => (
            <p key={proof.id}>
              {proof.label} recognized for {proof.eventId}
            </p>
          ))}
        </div>
        <Link href="/keys" className="mt-6 inline-flex text-sm text-coral">
          Continue to CornerKey
        </Link>
      </Card>
    </div>
  );
}
