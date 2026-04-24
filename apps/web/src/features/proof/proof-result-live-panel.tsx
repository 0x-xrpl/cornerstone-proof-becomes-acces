"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { RouteHeader } from "@/components/route-header";
import { Button } from "@/components/ui/button";
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
        description="This route reflects the connected wallet when a package ID is configured, so it can show live recognized proof objects instead of a fixed mock summary."
        badge={account?.address && packageConfigured ? "Live wallet mode" : "Mock fallback"}
      />

      <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <Card className="panel-metal border-line/90">
          <p className="eyebrow-label">Your status</p>
          <h3 className="mt-4 text-[2.15rem] font-semibold tracking-[-0.04em] text-white">
            {recognizedProofs.length} proof items currently recognized
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/64">
            Recognition is the moment where support becomes legible to the system.
            The next move is not more explanation. It is access.
          </p>
          <div className="mt-6 rounded-[22px] border border-line bg-black/22 p-4">
            <p className="eyebrow-label">Wallet mode</p>
            <p className="mt-4 break-all text-sm leading-7 text-white/60">
              {account?.address ?? "No connected wallet"}
            </p>
          </div>
        </Card>

        <Card className="panel-metal border-line/90">
          <p className="eyebrow-label">Recognized proofs</p>
          <div className="mt-5 grid gap-3">
            {recognizedProofs.map((proof) => (
              <div
                key={proof.id}
                className="flex items-center justify-between gap-4 rounded-[20px] border border-line bg-black/22 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-[#9dc69a]" />
                  <div>
                    <p className="text-base font-semibold tracking-[-0.03em] text-white">
                      {proof.label}
                    </p>
                    <p className="text-sm text-white/54">{proof.eventId}</p>
                  </div>
                </div>
                <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#9dc69a]">
                  Recognized
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/keys">
              <Button variant="accent">
                Continue to CornerKey
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
