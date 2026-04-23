import type { AccessItem } from "@/types/domain";

export const accessItems: AccessItem[] = [
  {
    id: "access-ama-takeru",
    type: "ama",
    title: "Post-fight Corner AMA",
    description: "Limited live AMA for fans who unlocked the Corner AMA Key.",
    keyType: "corner-ama",
    availability: "live",
    eventId: "event-tokyo-2026",
    athleteId: "ath-1"
  },
  {
    id: "access-merch-tokyo",
    type: "merch",
    title: "Priority Merch Lane",
    description: "Fast-track merch pickup window at the Tokyo venue.",
    keyType: "priority-merch",
    availability: "upcoming",
    eventId: "event-tokyo-2026",
    athleteId: "ath-1"
  },
  {
    id: "access-arena-gate",
    type: "arena",
    title: "Arena Access Gate A",
    description: "Event-day access route for fans meeting the arena requirements.",
    keyType: "arena-access",
    availability: "upcoming",
    eventId: "event-tokyo-2026",
    athleteId: "ath-1"
  }
];
