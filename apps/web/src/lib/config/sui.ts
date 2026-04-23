import { getFullnodeUrl } from "@mysten/sui/client";

import { publicEnv } from "@/lib/config/env";

const rpcByNetwork = {
  testnet: publicEnv.NEXT_PUBLIC_SUI_RPC_URL || getFullnodeUrl("testnet"),
  localnet: publicEnv.NEXT_PUBLIC_SUI_RPC_URL || "http://127.0.0.1:9000"
};

export const activeNetwork = publicEnv.NEXT_PUBLIC_SUI_NETWORK;
export const suiNetworkUrls = rpcByNetwork;

export const packageIds = {
  cornerstone: publicEnv.NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE || undefined
};

export const featureFlags = {
  zkLogin: publicEnv.NEXT_PUBLIC_ENABLE_ZKLOGIN,
  sponsoredTransactions: publicEnv.NEXT_PUBLIC_ENABLE_SPONSORED_TX
};
