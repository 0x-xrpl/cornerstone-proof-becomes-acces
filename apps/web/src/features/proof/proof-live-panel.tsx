"use client";

import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { RouteHeader } from "@/components/route-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConsoleTemplates } from "@/features/console/use-console-templates";
import Link from "next/link";
import { ProofList } from "@/features/proof/proof-list";
import { accessItems } from "@/lib/mock/access";
import { featureFlags } from "@/lib/config/sui";
import {
  buildIssueQuizPassTransaction,
  buildIssueVenueCheckInTransaction,
  buildIssueWatchCheckInTransaction,
  buildUnlockAmaKeyTransaction,
  buildUnlockArenaAccessKeyTransaction,
  buildUnlockPriorityMerchKeyTransaction
} from "@/lib/sui/transactions/live-loop";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";
import { listHybridKeys, listHybridProofs } from "@/lib/sui/live-data";
import { formatCountdown } from "@/lib/utils/format";

type ActionKind =
  | "watch-check-in"
  | "venue-check-in"
  | "quiz-pass"
  | "unlock-ama"
  | "unlock-merch"
  | "unlock-arena";

export function ProofLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const queryClient = useQueryClient();
  const [lastDigest, setLastDigest] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const packageConfigured = isCornerstonePackageConfigured();
  const { isRewardTypeActive } = useConsoleTemplates();

  const proofQuery = useQuery({
    queryKey: ["cornerstone", "proofs", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridProofs(client, account?.address ?? null)
  });

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  const { mutateAsync, isPending } = useSignAndExecuteTransaction();

  const proofs = proofQuery.data ?? [];
  const keys = keyQuery.data ?? [];
  const amaKey = keys.find((key) => key.type === "corner-ama");
  const merchKey = keys.find((key) => key.type === "priority-merch");
  const arenaKey = keys.find((key) => key.type === "arena-access");
  const amaAccess = accessItems.find((item) => item.keyType === "corner-ama");
  const hasWatch = proofs.some((proof) => proof.type === "watch-check-in" && proof.status === "recognized");
  const hasVenue = proofs.some((proof) => proof.type === "venue-check-in" && proof.status === "recognized");
  const hasQuiz = proofs.some((proof) => proof.type === "quiz-pass" && proof.status === "recognized");
  const canUnlockAma = hasWatch && hasQuiz && amaKey?.status !== "unlocked";
  const canUnlockMerch = hasWatch && merchKey?.status !== "unlocked";
  const canUnlockArena =
    hasWatch && hasVenue && arenaKey?.status !== "unlocked";
  const amaEnabled = isRewardTypeActive("corner-ama");
  const merchEnabled = isRewardTypeActive("priority-merch");
  const arenaEnabled = isRewardTypeActive("arena-access");

  const currentModeLabel = useMemo(() => {
    if (!account?.address) return "Mock preview";
    if (!packageConfigured) return "Wallet connected, package ID missing";
    return "Live wallet mode";
  }, [account?.address, packageConfigured]);

  async function runAction(kind: ActionKind) {
    if (!account?.address || !packageConfigured) return;

    const transaction =
      kind === "watch-check-in"
        ? buildIssueWatchCheckInTransaction(account.address)
        : kind === "venue-check-in"
          ? buildIssueVenueCheckInTransaction(account.address)
        : kind === "quiz-pass"
          ? buildIssueQuizPassTransaction(account.address)
          : kind === "unlock-merch"
            ? buildUnlockPriorityMerchKeyTransaction(account.address)
            : kind === "unlock-arena"
              ? buildUnlockArenaAccessKeyTransaction(account.address)
          : buildUnlockAmaKeyTransaction(account.address);

    setLastMessage(null);
    const result = await mutateAsync({ transaction: transaction.serialize() });
    const digest = "digest" in result ? result.digest : null;

    if (digest) {
      await client.waitForTransaction({ digest });
      setLastDigest(digest);
    }

    setLastMessage(
      kind === "watch-check-in"
        ? "Watch Check-in submitted."
        : kind === "venue-check-in"
          ? "Venue Check-in submitted."
        : kind === "quiz-pass"
          ? "Quiz Pass submitted."
          : kind === "unlock-merch"
            ? "Priority Merch Key unlocked."
            : kind === "unlock-arena"
              ? "Arena Access Key unlocked."
          : "Corner AMA Key unlocked."
    );

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["cornerstone", "proofs"] }),
      queryClient.invalidateQueries({ queryKey: ["cornerstone", "keys"] })
    ]);
  }

  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Proof"
        title="Support Proof actions"
        description="This route now supports the first live loop: issue Watch Check-in, issue Quiz Pass, then unlock the event-limited Corner AMA Key with a connected wallet."
        badge={currentModeLabel}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              First live loop
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-ink">
              Watch Check-in to Corner AMA Key
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink/72">
              The wallet path is live. zkLogin and sponsored transactions remain
              feature-gated so the first chain loop stays minimal and testable.
            </p>
          </div>

          <div className="grid gap-3">
            <Button
              onClick={() => runAction("watch-check-in")}
              disabled={!account?.address || !packageConfigured || isPending || hasWatch}
            >
              {isPending ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
              {hasWatch ? "Watch Check-in recognized" : "Issue Watch Check-in"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => runAction("venue-check-in")}
              disabled={!account?.address || !packageConfigured || isPending || hasVenue}
            >
              {isPending ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
              {hasVenue ? "Venue Check-in recognized" : "Issue Venue Check-in"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => runAction("quiz-pass")}
              disabled={!account?.address || !packageConfigured || isPending || hasQuiz}
            >
              {isPending ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
              {hasQuiz ? "Quiz Pass recognized" : "Issue Quiz Pass"}
            </Button>
            <Button
              variant="accent"
              onClick={() => runAction("unlock-ama")}
              disabled={
                !account?.address ||
                !packageConfigured ||
                isPending ||
                !canUnlockAma ||
                !amaEnabled
              }
            >
              {isPending ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
              {amaKey?.status === "unlocked"
                ? "Corner AMA Key already unlocked"
                : "Unlock Corner AMA Key"}
            </Button>
            <Button
              onClick={() => runAction("unlock-merch")}
              disabled={
                !account?.address ||
                !packageConfigured ||
                isPending ||
                !canUnlockMerch ||
                !merchEnabled
              }
            >
              {isPending ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
              {merchKey?.status === "unlocked"
                ? "Priority Merch Key already unlocked"
                : "Unlock Priority Merch Key"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => runAction("unlock-arena")}
              disabled={
                !account?.address ||
                !packageConfigured ||
                isPending ||
                !canUnlockArena ||
                !arenaEnabled
              }
            >
              {isPending ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
              {arenaKey?.status === "unlocked"
                ? "Arena Access Key already unlocked"
                : "Unlock Arena Access Key"}
            </Button>
          </div>

          <div className="space-y-2 text-sm text-ink/68">
            <p>Wallet: {account?.address ?? "Not connected"}</p>
            <p>Package configured: {packageConfigured ? "Yes" : "No"}</p>
            <p>zkLogin flag: {featureFlags.zkLogin ? "Enabled" : "Disabled"}</p>
            <p>
              Sponsored tx flag:{" "}
              {featureFlags.sponsoredTransactions ? "Enabled" : "Disabled"}
            </p>
            <p>
              AMA countdown: {amaKey ? formatCountdown(amaKey.expiresAt) : "No AMA key"}
            </p>
            <p>AMA template enabled: {amaEnabled ? "Yes" : "No"}</p>
            <p>Merch template enabled: {merchEnabled ? "Yes" : "No"}</p>
            <p>Arena template enabled: {arenaEnabled ? "Yes" : "No"}</p>
            {lastMessage ? <p>{lastMessage}</p> : null}
            {lastDigest ? <p>Last digest: {lastDigest}</p> : null}
          </div>
        </Card>

        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Demo guide
          </p>
          <ul className="space-y-3 text-sm leading-6 text-ink/72">
            <li>For the tightest demo, run Watch Check-in, Quiz Pass, then Corner AMA Key.</li>
            <li>Use Venue Check-in and Arena Access only if you want to show the wider key set.</li>
            <li>Use the Console route to enable or disable reward templates before the run.</li>
            <li>Keep the language simple: proof is recognition, key is access.</li>
          </ul>
          {amaKey?.status === "unlocked" && amaAccess ? (
            <Link href={`/access/${amaAccess.id}`}>
              <Button variant="accent" className="mt-2">
                Open AMA access now
              </Button>
            </Link>
          ) : null}
        </Card>
      </div>

      <ProofList proofs={proofs} />
    </div>
  );
}
