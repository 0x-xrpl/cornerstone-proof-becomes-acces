"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, KeyRound } from "lucide-react";

import { RouteHeader } from "@/components/route-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { accessItems } from "@/lib/mock/access";
import { keys as mockKeys } from "@/lib/mock/keys";
import { listHybridKeys } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";
import { formatCountdown } from "@/lib/utils/format";

export function KeyLiveDetail({ keyId }: { keyId: string }) {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  const allKeys = keyQuery.data ?? mockKeys;
  const key =
    allKeys.find((item) => item.id === keyId) ??
    mockKeys.find((item) => item.id === keyId);

  if (!key) {
    return (
      <div className="space-y-8">
        <RouteHeader
          eyebrow="Key Detail"
          title="Key not found"
          description="The requested key could not be resolved for the current wallet or mock state."
        />
      </div>
    );
  }

  const relatedAccess = accessItems.find((item) => item.keyType === key.type);

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Key Detail"
        title={key.label}
        description={key.description}
        badge={key.eventLimited ? "Event-limited" : "Persistent"}
      />

      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="panel-metal border-line/90">
          <div className="rounded-[28px] border border-line bg-[radial-gradient(circle_at_50%_20%,rgba(227,195,151,0.24),transparent_26%),linear-gradient(180deg,rgba(26,23,20,0.98),rgba(11,10,9,0.98))] p-6 text-center">
            <div className="mx-auto flex size-28 items-center justify-center rounded-[26px] border border-metal/20 bg-black/20 text-metal">
              <KeyRound className="size-14" />
            </div>
            <p className="eyebrow-label mt-6">{key.type}</p>
            <h3 className="mt-4 text-[2rem] font-semibold tracking-[-0.04em] text-white">
              {key.label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/64">{key.description}</p>
          </div>
        </Card>

        <Card className="panel-metal border-line/90">
          <div className="flex flex-wrap gap-3">
            <Badge tone="accent">{key.type}</Badge>
            <Badge tone={key.status === "unlocked" ? "success" : "default"}>
              {key.status}
            </Badge>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-line bg-black/22 p-4">
              <p className="eyebrow-label">Required proofs</p>
              <p className="mt-4 text-sm leading-7 text-white/64">
                {key.unlockRequirements.proofTypes.join(", ")}
              </p>
            </div>
            <div className="rounded-[20px] border border-line bg-black/22 p-4">
              <p className="eyebrow-label">Minimum count</p>
              <p className="mt-4 text-[1.7rem] font-semibold tracking-[-0.04em] text-white">
                {key.unlockRequirements.minimumCount}
              </p>
            </div>
            <div className="rounded-[20px] border border-line bg-black/22 p-4">
              <p className="eyebrow-label">Countdown</p>
              <p className="mt-4 text-sm leading-7 text-white/64">
                {formatCountdown(key.expiresAt)}
              </p>
            </div>
            <div className="rounded-[20px] border border-line bg-black/22 p-4">
              <p className="eyebrow-label">Wallet</p>
              <p className="mt-4 break-all text-sm leading-7 text-white/64">
                {account?.address ?? "Not connected"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {relatedAccess ? (
              <Link href={`/access/${relatedAccess.id}`}>
                <Button variant="accent">
                  Open related access
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            ) : null}
            <Link href="/proof">
              <Button variant="secondary">Back to proof actions</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
