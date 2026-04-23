import { packageIds } from "@/lib/config/sui";

export const cornerstoneContracts = {
  packageId: packageIds.cornerstone,
  modules: {
    supportProof: "support_proof",
    cornerKey: "corner_key",
    accessRules: "access_rules",
    squadUnlock: "squad_unlock"
  }
};

export function hasPublishedCornerstonePackage() {
  return Boolean(cornerstoneContracts.packageId);
}
