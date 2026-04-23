import { featureFlags } from "@/lib/config/sui";

export interface WalletService {
  walletMode(): "wallet-native" | "hybrid";
  zkLoginEnabled(): boolean;
}

export const walletService: WalletService = {
  walletMode() {
    return featureFlags.zkLogin ? "hybrid" : "wallet-native";
  },
  zkLoginEnabled() {
    return featureFlags.zkLogin;
  }
};
