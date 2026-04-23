"use client";

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

import { RouteHeader } from "@/components/route-header";
import { Card } from "@/components/ui/card";
import { SquadProgressCard } from "@/features/squads/squad-progress-card";
import { squadService } from "@/lib/services/squad-service";
import { listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";

export function SquadLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();

  const squadQuery = useQuery({
    queryKey: ["cornerstone", "squad"],
    queryFn: () => squadService.getActiveSquad()
  });

  const proofQuery = useQuery({
    queryKey: ["cornerstone", "proofs", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridProofs(client, account?.address ?? null)
  });

  const squad = squadQuery.data;
  const recognizedProofs = (proofQuery.data ?? []).filter(
    (proof) => proof.status === "recognized"
  );

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Squad Unlock"
        title="One communal unlock path"
        description="The MVP keeps exactly one Japan-limited communal unlock. This view combines the shared campaign progress with the current wallet's recognized support state."
        badge={account?.address && packageConfigured ? "Live wallet mode" : "Mock fallback"}
      />

      {squad ? <SquadProgressCard squad={squad} contributionCount={recognizedProofs.length} /> : null}

      <Card className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
          Wallet contribution
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-ink">
          {recognizedProofs.length} recognized support signals in this wallet
        </h3>
        <p className="mt-3 text-sm leading-6 text-ink/72">
          The communal progress remains a single campaign number in this MVP. The
          live layer shows how many recognized support actions this wallet can bring
          into that shared unlock story.
        </p>
      </Card>
    </div>
  );
}
