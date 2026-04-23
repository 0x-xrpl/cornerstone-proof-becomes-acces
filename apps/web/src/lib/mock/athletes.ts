import type { Athlete } from "@/types/domain";

export const athletes: Athlete[] = [
  {
    id: "ath-1",
    slug: "takeru",
    name: "Takeru",
    weightClass: "Flyweight Kickboxing",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    featured: true,
    activeEventId: "event-tokyo-2026"
  },
  {
    id: "ath-2",
    slug: "itsuki",
    name: "Itsuki Hirata",
    weightClass: "Atomweight MMA",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
    featured: false,
    activeEventId: "event-tokyo-2026"
  }
];
