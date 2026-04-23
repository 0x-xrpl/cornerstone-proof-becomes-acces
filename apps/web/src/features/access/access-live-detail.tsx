"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

import { RouteHeader } from "@/components/route-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConsoleTemplates } from "@/features/console/use-console-templates";
import { accessItems } from "@/lib/mock/access";
import { listHybridKeys } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";
import { formatCountdown } from "@/lib/utils/format";

export function AccessLiveDetail({ accessId }: { accessId: string }) {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();
  const { isRewardTypeActive } = useConsoleTemplates();
  const access = accessItems.find((item) => item.id === accessId);

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  if (!access) {
    return (
      <div className="space-y-8">
        <RouteHeader
          eyebrow="Access"
          title="Access not found"
          description="This access item does not exist in the current MVP scaffold."
        />
      </div>
    );
  }

  const requiredKey = (keyQuery.data ?? []).find((key) => key.type === access.keyType);
  const canOpen = requiredKey?.status === "unlocked";
  const isReadyButLocked = requiredKey?.status === "ready";
  const templateActive = isRewardTypeActive(access.keyType);

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Access"
        title={access.title}
        description="This route converts key ownership into a usable access state. In live mode it reads the connected wallet and only opens the experience when the required key has actually been unlocked."
        badge={canOpen ? "Access open" : "Access gated"}
      />

      <Card className="max-w-4xl">
        <div className="flex flex-wrap gap-3">
          <Badge tone="accent">{access.type}</Badge>
          <Badge tone={canOpen ? "success" : "default"}>
            {canOpen ? "Unlocked" : "Locked"}
          </Badge>
        </div>

        <p className="mt-5 text-base leading-7 text-ink/72">{access.description}</p>

        <div className="mt-6 grid gap-4 text-sm text-ink/68 md:grid-cols-3">
          <p>Required key: {access.keyType}</p>
          <p>Availability: {access.availability}</p>
          <p>Wallet: {account?.address ?? "Not connected"}</p>
        </div>

        <div className="mt-8 rounded-[24px] border border-black/5 bg-mist/60 p-5">
          {canOpen ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                Access live
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">
                Your key is valid. This access is open.
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink/72">
                This is the point where the MVP moves from proof and key logic into
                actual access. The key is not just displayed; it gates the route.
              </p>
              <div className="mt-5 rounded-[20px] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                  Live moment
                </p>
                <p className="mt-2 text-sm leading-6 text-ink/72">
                  Access granted. This is where the user should feel the product
                  changed something now, not later.
                </p>
              </div>
              {requiredKey?.expiresAt ? (
                <p className="mt-4 text-sm text-coral">
                  Countdown: {formatCountdown(requiredKey.expiresAt)}
                </p>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                Access gated
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">
                Unlock the required key first.
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink/72">
                {!templateActive
                  ? "This access path is currently disabled in the athlete console."
                  : account?.address
                  ? isReadyButLocked
                    ? "The proof requirement is already satisfied, but the key still needs to be issued."
                    : "This wallet has not satisfied the key requirement yet."
                  : "Connect a wallet to evaluate the access state against live key ownership."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {!templateActive ? (
                  <Link href="/console">
                    <Button variant="accent">Open console</Button>
                  </Link>
                ) : null}
                <Link href="/proof">
                  <Button variant="accent">Go to proof actions</Button>
                </Link>
                <Link href="/keys">
                  <Button variant="secondary">Review keys</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
