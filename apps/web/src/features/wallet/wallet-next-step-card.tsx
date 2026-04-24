"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWalletStatus } from "@/features/wallet/use-wallet-status";

export function WalletNextStepCard() {
  const { connected } = useWalletStatus();

  return (
    <Card className="panel-metal max-w-3xl border-line/90">
      <p className="eyebrow-label">
        Next step
      </p>
      <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.04em] text-white">
        {connected ? "Move into proof actions" : "Connect, then continue"}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/64">
        {connected
          ? "Wallet connection is complete. The next screen for the demo is `/proof`, where support becomes recognized proof and then a key."
          : "As soon as the wallet is connected, the demo should move directly to `/proof` rather than staying on onboarding."}
      </p>
      <div className="mt-5">
        <Link href={connected ? "/proof" : "/wallet"}>
          <Button variant="accent">
            {connected ? "Open proof flow" : "Stay on wallet"}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
