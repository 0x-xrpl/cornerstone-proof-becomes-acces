import type { CornerKey } from "@/types/domain";

export const keys: CornerKey[] = [
  {
    id: "key-ama",
    type: "corner-ama",
    label: "Corner AMA Key",
    description: "Unlocks the limited athlete AMA session.",
    status: "unlocked",
    unlockRequirements: {
      proofTypes: ["watch-check-in", "quiz-pass"],
      minimumCount: 2
    },
    eventLimited: true,
    expiresAt: "2026-04-24T05:00:00.000Z"
  },
  {
    id: "key-merch",
    type: "priority-merch",
    label: "Priority Merch Key",
    description: "Opens early access to the merch queue.",
    status: "ready",
    unlockRequirements: {
      proofTypes: ["watch-check-in"],
      minimumCount: 1
    },
    eventLimited: false,
    expiresAt: null
  },
  {
    id: "key-arena",
    type: "arena-access",
    label: "Arena Access Key",
    description: "Enables a restricted lane for the live arena experience.",
    status: "locked",
    unlockRequirements: {
      proofTypes: ["watch-check-in", "venue-check-in"],
      minimumCount: 2
    },
    eventLimited: true,
    expiresAt: "2026-04-24T06:00:00.000Z"
  }
];
