import { packageIds } from "@/lib/config/sui";

export const cornerstonePackageId = packageIds.cornerstone;

export function isCornerstonePackageConfigured() {
  return Boolean(cornerstonePackageId);
}

export function cornerstoneStructType(moduleName: string, structName: string) {
  if (!cornerstonePackageId) return null;

  return `${cornerstonePackageId}::${moduleName}::${structName}`;
}

export function cornerstoneMoveTarget(moduleName: string, functionName: string) {
  if (!cornerstonePackageId) {
    throw new Error("NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE is not configured.");
  }

  return `${cornerstonePackageId}::${moduleName}::${functionName}`;
}
