"use client";

import { RouteHeader } from "@/components/route-header";
import { Card } from "@/components/ui/card";
import { WalletNextStepCard } from "@/features/wallet/wallet-next-step-card";
import { WalletStatusCard } from "@/features/wallet/wallet-status-card";
import { walletService } from "@/lib/services/wallet-service";

export default function WalletPage() {
  return (
    <div className="space-y-8">
      <RouteHeader
        eyebrow="Wallet"
        title="Connection and onboarding"
        description="Wallet-native connection is live in the scaffold. zkLogin and sponsored transaction flows are feature-gated so onboarding does not dominate the product before the core access loop is validated."
      />
      <WalletStatusCard />
      <WalletNextStepCard />
      <Card className="max-w-3xl">
        <p className="text-sm leading-7 text-ink/72">
          Current wallet mode: {walletService.walletMode()}. zkLogin enabled:{" "}
          {walletService.zkLoginEnabled() ? "Yes" : "No"}.
        </p>
      </Card>
    </div>
  );
}
