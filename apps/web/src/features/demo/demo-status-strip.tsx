"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConsoleTemplates } from "@/features/console/use-console-templates";
import { accessItems } from "@/lib/mock/access";
import { listHybridKeys, listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";

const amaAccess = accessItems.find((item) => item.keyType === "corner-ama");

export function DemoStatusStrip() {
  const account = useCurrentAccount();
  const client = useSuiClient();
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

  const proofs = proofQuery.data ?? [];
  const keys = keyQuery.data ?? [];
  const hasWatch = proofs.some((proof) => proof.type === "watch-check-in" && proof.status === "recognized");
  const hasQuiz = proofs.some((proof) => proof.type === "quiz-pass" && proof.status === "recognized");
  const amaUnlocked = keys.some((key) => key.type === "corner-ama" && key.status === "unlocked");
  const amaTemplateEnabled = isRewardTypeActive("corner-ama");

  const steps = [
    {
      label: "Wallet connected",
      done: Boolean(account?.address && packageConfigured)
    },
    {
      label: "Watch Check-in recognized",
      done: hasWatch
    },
    {
      label: "Quiz Pass recognized",
      done: hasQuiz
    },
    {
      label: "Corner AMA Key unlocked",
      done: amaUnlocked && amaTemplateEnabled
    }
  ];

  const nextHref = !account?.address
    ? "/wallet"
    : !hasWatch || !hasQuiz || !amaUnlocked
      ? "/proof"
      : amaAccess
        ? `/access/${amaAccess.id}`
        : "/keys";

  const nextLabel = !account?.address
    ? "Connect wallet"
    : !hasWatch || !hasQuiz || !amaUnlocked
      ? "Continue proof loop"
      : "Open AMA access";

  return (
    <Card className="max-w-6xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            30-second demo
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">
            Support becomes access in four visible steps
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
            Keep the story narrow: connect, recognize support, unlock the AMA key,
            then open the access route.
          </p>
        </div>

        <Link href={nextHref}>
          <Button variant="accent">
            {nextLabel}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.label}
            className="rounded-[22px] border border-black/5 bg-mist/50 p-4"
          >
            <div className="flex items-center gap-2">
              {step.done ? (
                <CheckCircle2 className="size-4 text-pine" />
              ) : (
                <Circle className="size-4 text-ink/35" />
              )}
              <p className="text-sm font-medium text-ink">{step.label}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
