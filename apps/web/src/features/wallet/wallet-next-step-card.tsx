"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWalletStatus } from "@/features/wallet/use-wallet-status";

export function WalletNextStepCard() {
  const { connected } = useWalletStatus();

  return (
    <Card className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
        Next step
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-ink">
        {connected ? "Move into proof actions" : "Connect, then continue"}
      </h3>
      <p className="mt-3 text-sm leading-6 text-ink/72">
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
