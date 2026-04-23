"use client";

import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";

export function useWalletStatus() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  return {
    connected: Boolean(account?.address),
    address: account?.address ?? null,
    disconnect
  };
}
