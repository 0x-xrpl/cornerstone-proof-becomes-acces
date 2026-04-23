import { publicEnv } from "@/lib/config/env";
import { featureFlags } from "@/lib/config/sui";

export type ZkLoginProvider = "google";

export interface ZkLoginAuthService {
  isEnabled: boolean;
  provider: ZkLoginProvider;
  clientId: string;
  beginLogin: () => Promise<void>;
}

export const zkLoginService: ZkLoginAuthService = {
  isEnabled: featureFlags.zkLogin,
  provider: "google",
  clientId: publicEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  async beginLogin() {
    throw new Error("zkLogin flow is not wired yet.");
  }
};
