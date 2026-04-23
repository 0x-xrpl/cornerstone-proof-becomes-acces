"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

import { RouteHeader } from "@/components/route-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoStatusStrip } from "@/features/demo/demo-status-strip";
import { KeyGrid } from "@/features/keys/key-grid";
import { ProofList } from "@/features/proof/proof-list";
import { SquadProgressCard } from "@/features/squads/squad-progress-card";
import { athletes } from "@/lib/mock/athletes";
import { accessItems } from "@/lib/mock/access";
import { squadService } from "@/lib/services/squad-service";
import { listHybridKeys, listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";
import { formatCountdown } from "@/lib/utils/format";

export function DashboardLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();
  const featuredAthlete = athletes.find((athlete) => athlete.featured) ?? athletes[0];

  const proofQuery = useQuery({
    queryKey: ["cornerstone", "proofs", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridProofs(client, account?.address ?? null)
  });

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  const squadQuery = useQuery({
    queryKey: ["cornerstone", "squad"],
    queryFn: () => squadService.getActiveSquad()
  });

  const proofs = proofQuery.data ?? [];
  const keys = keyQuery.data ?? [];
  const squad = squadQuery.data;
  const amaKey = keys.find((key) => key.type === "corner-ama");
  const amaAccess = accessItems.find((item) => item.keyType === "corner-ama");

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Dashboard"
        title="Support is recognized. Access opens in the right moment."
        description="This dashboard now reflects the connected wallet in live mode. It keeps the MVP narrow while showing the verified proof-to-key state and the next access step."
        badge={account?.address && packageConfigured ? "Live wallet mode" : "Mock fallback"}
      />

      <DemoStatusStrip />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden bg-ink text-white">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Badge tone="accent">Featured Athlete</Badge>
              <h2 className="mt-4 text-4xl font-semibold">{featuredAthlete.name}</h2>
              <p className="mt-3 text-base text-white/70">
                {featuredAthlete.weightClass} active for {featuredAthlete.activeEventId}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72">
                The current wallet can move from recognized support proof into access.
                The event-limited AMA path is now live and wallet-verifiable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/proof">
                  <Button variant="accent">Collect proof</Button>
                </Link>
                <Link href={amaAccess ? `/access/${amaAccess.id}` : "/keys"}>
                  <Button variant="secondary">
                    {amaKey?.status === "unlocked" ? "Open access" : "Review keys"}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] bg-white/8 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Event-limited access
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                {amaKey?.label ?? "Not configured"}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {amaKey?.description ??
                  "A limited-time unlock path will appear here once configured."}
              </p>
              <p className="mt-5 text-sm text-gold">
                {formatCountdown(amaKey?.expiresAt ?? null)}
              </p>
              <p className="mt-3 text-sm text-white/72">
                Status: {amaKey?.status ?? "unknown"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            MVP guardrails
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/72">
            <li>Support Proof and CornerKey remain separate objects and concepts.</li>
            <li>No marketplace, token economy, ranking, or extra proof expansion.</li>
            <li>One Japan-limited squad path is active for the first demo.</li>
            <li>Wallet, zkLogin, and sponsored transaction layers stay lightweight.</li>
          </ul>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-ink">Now earnable Support Proof</h3>
          <Link href="/proof" className="text-sm text-coral">
            Open proof actions
          </Link>
        </div>
        <ProofList proofs={proofs} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-ink">Now unlockable CornerKey</h3>
          <Link href="/keys" className="text-sm text-coral">
            Open key layer
          </Link>
        </div>
        <KeyGrid keys={keys} />
      </section>

      {squad ? <SquadProgressCard squad={squad} /> : null}
    </div>
  );
}
