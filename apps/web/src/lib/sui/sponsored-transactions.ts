import { featureFlags } from "@/lib/config/sui";

export interface SponsorService {
  isEnabled: boolean;
  prepareSponsoredTransaction: (
    bytes: Uint8Array
  ) => Promise<{ sponsoredBytes: Uint8Array; digest?: string }>;
}

export const sponsorService: SponsorService = {
  isEnabled: featureFlags.sponsoredTransactions,
  async prepareSponsoredTransaction(bytes) {
    if (!featureFlags.sponsoredTransactions) {
      return { sponsoredBytes: bytes };
    }

    throw new Error("Sponsored transaction service is not wired yet.");
  }
};
