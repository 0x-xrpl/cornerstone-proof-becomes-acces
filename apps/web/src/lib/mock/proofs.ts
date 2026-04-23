import type { SupportProof } from "@/types/domain";

export const proofs: SupportProof[] = [
  {
    id: "proof-watch",
    type: "watch-check-in",
    label: "Watch Check-in",
    description: "Recognized after the fan completes the live viewing action.",
    status: "recognized",
    earnedAt: "2026-04-23T15:00:00.000Z",
    athleteId: "ath-1",
    eventId: "event-tokyo-2026"
  },
  {
    id: "proof-quiz",
    type: "quiz-pass",
    label: "Quiz Pass",
    description: "Unlocked when the fan passes the event quiz.",
    status: "recognized",
    earnedAt: "2026-04-23T15:05:00.000Z",
    athleteId: "ath-1",
    eventId: "event-tokyo-2026"
  },
  {
    id: "proof-venue",
    type: "venue-check-in",
    label: "Venue Check-in",
    description: "Reserved for in-venue recognition during the live event.",
    status: "available",
    earnedAt: null,
    athleteId: "ath-1",
    eventId: "event-tokyo-2026"
  }
];
