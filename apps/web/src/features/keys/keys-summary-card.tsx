"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { accessItems } from "@/lib/mock/access";
import { listHybridKeys } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";

const amaAccess = accessItems.find((item) => item.keyType === "corner-ama");

export function KeysSummaryCard() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  const keys = keyQuery.data ?? [];
  const unlockedCount = keys.filter((key) => key.status === "unlocked").length;
  const amaUnlocked = keys.some(
    (key) => key.type === "corner-ama" && key.status === "unlocked"
  );

  return (
    <Card className="panel-metal max-w-4xl border-line/90">
      <p className="eyebrow-label">
        Key status
      </p>
      <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.04em] text-white">
        {unlockedCount} unlocked key{unlockedCount === 1 ? "" : "s"} in this wallet
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/64">
        This route is the bridge between recognized proof and the actual access
        screen. For the demo, the important moment is the `Corner AMA Key`.
      </p>

      {amaUnlocked && amaAccess ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#9dc69a]">
            <CheckCircle2 className="size-4" />
            Corner AMA Key is live and ready to open access.
          </div>
          <Link href={`/access/${amaAccess.id}`}>
            <Button variant="accent">
              Open AMA access
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
