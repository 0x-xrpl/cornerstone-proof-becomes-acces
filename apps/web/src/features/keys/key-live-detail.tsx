"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

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
  const key = allKeys.find((item) => item.id === keyId) ?? mockKeys.find((item) => item.id === keyId);

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
      <Card className="max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <Badge tone="accent">{key.type}</Badge>
          <Badge tone={key.status === "unlocked" ? "success" : "default"}>
            {key.status}
          </Badge>
        </div>
        <div className="mt-6 space-y-3 text-sm leading-7 text-ink/72">
          <p>Required proofs: {key.unlockRequirements.proofTypes.join(", ")}</p>
          <p>Minimum count: {key.unlockRequirements.minimumCount}</p>
          <p>Countdown: {formatCountdown(key.expiresAt)}</p>
          <p>Wallet: {account?.address ?? "Not connected"}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {relatedAccess ? (
            <Link href={`/access/${relatedAccess.id}`}>
              <Button variant="accent">Open related access</Button>
            </Link>
          ) : null}
          <Link href="/proof">
            <Button variant="secondary">Back to proof actions</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
