import { z } from "zod";

const booleanFlag = z.preprocess((value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return false;
}, z.boolean());

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUI_NETWORK: z.enum(["testnet", "localnet"]).default("testnet"),
  NEXT_PUBLIC_SUI_RPC_URL: z.string().default(""),
  NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE: z.string().default(""),
  NEXT_PUBLIC_ENABLE_ZKLOGIN: booleanFlag.default(false),
  NEXT_PUBLIC_ENABLE_SPONSORED_TX: booleanFlag.default(false),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().default("")
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SUI_NETWORK: process.env.NEXT_PUBLIC_SUI_NETWORK,
  NEXT_PUBLIC_SUI_RPC_URL: process.env.NEXT_PUBLIC_SUI_RPC_URL,
  NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE:
    process.env.NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE,
  NEXT_PUBLIC_ENABLE_ZKLOGIN: process.env.NEXT_PUBLIC_ENABLE_ZKLOGIN,
  NEXT_PUBLIC_ENABLE_SPONSORED_TX: process.env.NEXT_PUBLIC_ENABLE_SPONSORED_TX,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
});

export const serverEnv = {
  sponsorBackendUrl: process.env.SPONSOR_BACKEND_URL ?? ""
};
