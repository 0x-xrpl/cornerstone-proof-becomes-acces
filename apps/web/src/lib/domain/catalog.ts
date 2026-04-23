import type {
  CornerKey,
  CornerKeyType,
  SupportProof,
  SupportProofType
} from "@/types/domain";

type ProofCatalogEntry = Pick<SupportProof, "label" | "description">;
type KeyCatalogEntry = Pick<
  CornerKey,
  "label" | "description" | "unlockRequirements" | "eventLimited" | "expiresAt"
>;

export const proofCatalog: Record<SupportProofType, ProofCatalogEntry> = {
  "watch-check-in": {
    label: "Watch Check-in",
    description: "Recognized after the fan completes the live viewing action."
  },
  "venue-check-in": {
    label: "Venue Check-in",
    description: "Reserved for in-venue recognition during the live event."
  },
  "quiz-pass": {
    label: "Quiz Pass",
    description: "Unlocked when the fan passes the event quiz."
  }
};

export const keyCatalog: Record<CornerKeyType, KeyCatalogEntry> = {
  "corner-ama": {
    label: "Corner AMA Key",
    description: "Unlocks the limited athlete AMA session.",
    unlockRequirements: {
      proofTypes: ["watch-check-in", "quiz-pass"],
      minimumCount: 2
    },
    eventLimited: true,
    expiresAt: "2026-04-24T05:00:00.000Z"
  },
  "priority-merch": {
    label: "Priority Merch Key",
    description: "Opens early access to the merch queue.",
    unlockRequirements: {
      proofTypes: ["watch-check-in"],
      minimumCount: 1
    },
    eventLimited: false,
    expiresAt: null
  },
  "arena-access": {
    label: "Arena Access Key",
    description: "Enables a restricted lane for the live arena experience.",
    unlockRequirements: {
      proofTypes: ["watch-check-in", "venue-check-in"],
      minimumCount: 2
    },
    eventLimited: true,
    expiresAt: "2026-04-24T06:00:00.000Z"
  }
};

export const proofTypeCodes: Record<SupportProofType, number> = {
  "watch-check-in": 0,
  "venue-check-in": 1,
  "quiz-pass": 2
};

export const keyTypeCodes: Record<CornerKeyType, number> = {
  "corner-ama": 0,
  "priority-merch": 1,
  "arena-access": 2
};

export function proofTypeFromCode(code: number): SupportProofType | null {
  const match = Object.entries(proofTypeCodes).find(([, value]) => value === code);

  return (match?.[0] as SupportProofType | undefined) ?? null;
}

export function keyTypeFromCode(code: number): CornerKeyType | null {
  const match = Object.entries(keyTypeCodes).find(([, value]) => value === code);

  return (match?.[0] as CornerKeyType | undefined) ?? null;
}
