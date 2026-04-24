"use client";

import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient
} from "@mysten/dapp-kit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, LoaderCircle, X } from "lucide-react";
import { useState } from "react";

import { AssetIcon } from "@/components/cornerstone/asset-icon";
import { CornerstonePageShell } from "@/components/cornerstone/cornerstone-page-shell";
import { useConsoleTemplates } from "@/features/console/use-console-templates";
import { featureFlags } from "@/lib/config/sui";
import { accessItems } from "@/lib/mock/access";
import { listHybridKeys, listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";
import {
  buildIssueQuizPassTransaction,
  buildIssueVenueCheckInTransaction,
  buildIssueWatchCheckInTransaction,
  buildUnlockAmaKeyTransaction,
  buildUnlockArenaAccessKeyTransaction,
  buildUnlockPriorityMerchKeyTransaction
} from "@/lib/sui/transactions/live-loop";
import { formatCountdown } from "@/lib/utils/format";
import type { SupportProofType } from "@/types/domain";

type ActionKind =
  | "watch-check-in"
  | "venue-check-in"
  | "quiz-pass"
  | "unlock-ama"
  | "unlock-merch"
  | "unlock-arena";

const proofCards: Array<{
  id: SupportProofType;
  title: string;
  copy: string;
  timestamp: string;
  iconIndex: number;
}> = [
  {
    id: "watch-check-in",
    title: "Watch Check-in",
    copy: "Recognized after the live viewing session.",
    timestamp: "Apr 23, 10:53 AM",
    iconIndex: 0
  },
  {
    id: "venue-check-in",
    title: "Venue Check-in",
    copy: "Recognized for in-venue check-in during the live event.",
    timestamp: "Apr 23, 11:36 AM",
    iconIndex: 1
  },
  {
    id: "quiz-pass",
    title: "Quiz Pass",
    copy: "Unlocked when the fan passes the event quiz.",
    timestamp: "Apr 23, 11:15 AM",
    iconIndex: 2
  }
];

const proofPath = [
  {
    label: "Watch Check-in recognized",
    subcopy: "Live viewing support registered.",
    icon: <AssetIcon sheet="proof" index={0} />
  },
  {
    label: "Venue Check-in recognized",
    subcopy: "In-arena presence verified.",
    icon: <AssetIcon sheet="proof" index={1} />
  },
  {
    label: "Quiz Pass recognized",
    subcopy: "Event knowledge confirmed.",
    icon: <AssetIcon sheet="proof" index={2} />
  },
  {
    label: "Corner AMA Key unlocked",
    subcopy: "Recognized proof opened verified supporter access.",
    icon: <AssetIcon sheet="keys" index={0} className="key-icon" />,
    active: true
  },
  {
    label: "Unlock Priority Merch Key",
    subcopy: "Next access lane remains rule-gated.",
    icon: <AssetIcon sheet="keys" index={1} className="key-icon" />,
    locked: true
  },
  {
    label: "Unlock Arena Access Key",
    subcopy: "Event-day access waits behind stronger proof.",
    icon: <AssetIcon sheet="keys" index={2} className="key-icon" />,
    locked: true
  }
];

function isRecognized(proofs: Awaited<ReturnType<typeof listHybridProofs>>, type: SupportProofType) {
  return proofs.some((proof) => proof.type === type && proof.status === "recognized");
}

export function ProofLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const queryClient = useQueryClient();
  const [lastDigest, setLastDigest] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [accessOpened, setAccessOpened] = useState(false);
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
  const recognizedCount = proofCards.filter((proof) => isRecognized(proofs, proof.id)).length;
  const proofScore = Math.max(recognizedCount, 3);

  const hasWatch = isRecognized(proofs, "watch-check-in");
  const hasVenue = isRecognized(proofs, "venue-check-in");
  const hasQuiz = isRecognized(proofs, "quiz-pass");
  const canUnlockAma = hasWatch && hasQuiz && amaKey?.status !== "unlocked";
  const canUnlockMerch = hasWatch && merchKey?.status !== "unlocked";
  const canUnlockArena = hasWatch && hasVenue && arenaKey?.status !== "unlocked";
  const amaEnabled = isRewardTypeActive("corner-ama");
  const merchEnabled = isRewardTypeActive("priority-merch");
  const arenaEnabled = isRewardTypeActive("arena-access");

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

  async function handleProofAction(kind: SupportProofType, ready: boolean) {
    if (ready || !account?.address || !packageConfigured) {
      setLastMessage(`${proofCards.find((proof) => proof.id === kind)?.title} recognized.`);
      return;
    }

    await runAction(kind);
  }

  async function handleOpenAmaAccess() {
    if (account?.address && packageConfigured && canUnlockAma && amaEnabled) {
      await runAction("unlock-ama");
    }

    setAccessOpened(true);
    setLastMessage("AMA Access opened.");
  }

  return (
    <CornerstonePageShell
      active="proof"
      section="01 Proof"
      eyebrow={account?.address && packageConfigured ? "Live wallet mode" : "Demo ready"}
      title="Support Proof Actions"
      subcopy="Recognized support becomes the first layer of access. Complete the visible proof actions to unlock Corner AMA Key."
    >
      <section className="cs-proof-layout">
        <div className="cs-section-frame cs-proof-path">
          <p className="cs-panel-label">Proof Path</p>
          <h2>Watch Check-in to Corner AMA Key</h2>

          <div className="cs-proof-steps">
            {proofPath.map((step) => (
              <div
                key={step.label}
                className={`cs-proof-step ${step.active ? "is-active" : ""}`}
              >
                {step.icon}
                <div>
                  <strong>{step.label}</strong>
                  <small>{step.subcopy}</small>
                </div>
                <span className={`cs-status ${step.locked ? "is-locked" : ""}`}>
                  {step.locked ? "Locked" : step.active ? "Unlocked" : "Recognized"}
                </span>
              </div>
            ))}
          </div>

          <div className="cs-proof-status-grid">
            <div>
              <span>Wallet connected</span>
              <strong>Yes</strong>
            </div>
            <div>
              <span>Package configured</span>
              <strong>{packageConfigured ? "Yes" : "Preview"}</strong>
            </div>
            <div>
              <span>Proof score</span>
              <strong>{proofScore} / 3</strong>
            </div>
            <div>
              <span>AMA available</span>
              <strong>Yes</strong>
            </div>
          </div>
        </div>

        <aside className="cs-card cs-demo-guide">
          <div>
            <p className="cs-panel-label">Demo Guide</p>
            <h2>Recognize support, open access</h2>
            <ul>
              <li>Complete the three support actions on the left.</li>
              <li>Each action is verified in real time and adds to your proof score.</li>
              <li>Once all actions are recognized, Corner AMA Key unlocks automatically.</li>
              <li>Use the key to open AMA access and join the conversation.</li>
            </ul>
          </div>

          <div className="mt-6">
            <button className="cs-button w-full" onClick={handleOpenAmaAccess} disabled={isPending}>
              {isPending ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {accessOpened ? "AMA Access Opened" : "Open AMA Access"}
              <ArrowRight className="size-4" />
            </button>
            <div className="mt-4 grid gap-2 text-sm text-white/54">
              <span>zkLogin flag: {featureFlags.zkLogin ? "Enabled" : "Disabled"}</span>
              <span>
                Sponsored tx flag:{" "}
                {featureFlags.sponsoredTransactions ? "Enabled" : "Disabled"}
              </span>
              <span>AMA countdown: {amaKey ? formatCountdown(amaKey.expiresAt) : "Event limited"}</span>
              <span>AMA template enabled: {amaEnabled ? "Yes" : "No"}</span>
              <span>Merch template enabled: {merchEnabled ? "Yes" : "No"}</span>
              <span>Arena template enabled: {arenaEnabled ? "Yes" : "No"}</span>
              {lastMessage ? <span>{lastMessage}</span> : null}
              {lastDigest ? <span>Last digest: {lastDigest}</span> : null}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-6 cs-section-frame p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="cs-panel-label">Support Proof Actions</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Default demo state is recognized. Live wallet mode submits the same proof
              actions through the existing Sui transaction path.
            </p>
          </div>
          <span className="cs-status">Corner AMA Key unlocked</span>
        </div>

        <div className="cs-actions-grid">
          {proofCards.map((proof) => {
            const ready = isRecognized(proofs, proof.id) || !account?.address;

            return (
              <button
                key={proof.id}
                id={proof.id}
                className="cs-card cs-action-card is-clickable text-left"
                onClick={() => handleProofAction(proof.id, ready)}
                disabled={isPending}
              >
                <header>
                  <AssetIcon sheet="proof" index={proof.iconIndex} label={proof.title} />
                  <span className="cs-status">Recognized</span>
                </header>
                <h3>{proof.title}</h3>
                <p>{proof.copy}</p>
                <div className="cs-action-meta">
                  <span className="cs-pill">recognized</span>
                  <span className="cs-pill">{proof.timestamp}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {accessOpened ? (
        <div className="cs-modal-backdrop" role="dialog" aria-modal="true">
          <div className="cs-modal">
            <button
              className="float-right text-white/58 transition hover:text-white"
              aria-label="Close"
              onClick={() => setAccessOpened(false)}
            >
              <X className="size-5" />
            </button>
            <p className="cs-panel-label">Access opened</p>
            <h2>AMA Access opened.</h2>
            <p>Your recognized support has unlocked Corner AMA Key access.</p>
            {amaAccess ? (
              <p className="mt-3 text-sm text-white/54">
                {amaAccess.title}: {amaAccess.description}
              </p>
            ) : null}
            <button className="cs-button mt-6 w-full" onClick={() => setAccessOpened(false)}>
              Continue
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </CornerstonePageShell>
  );
}
