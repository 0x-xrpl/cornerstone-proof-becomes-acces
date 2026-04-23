import { createNetworkConfig } from "@mysten/dapp-kit";

import { suiNetworkUrls } from "@/lib/config/sui";

export const { networkConfig } = createNetworkConfig({
  testnet: {
    url: suiNetworkUrls.testnet
  },
  localnet: {
    url: suiNetworkUrls.localnet
  }
});
