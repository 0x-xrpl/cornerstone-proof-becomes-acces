import type { ConsoleTemplate } from "@/types/domain";

export const consoleTemplates: ConsoleTemplate[] = [
  {
    id: "tpl-support-to-ama",
    title: "Support to AMA",
    rewardType: "corner-ama",
    requirementTypes: ["watch-check-in", "quiz-pass"],
    active: true
  },
  {
    id: "tpl-support-to-merch",
    title: "Support to Merch Priority",
    rewardType: "priority-merch",
    requirementTypes: ["watch-check-in"],
    active: true
  },
  {
    id: "tpl-support-to-arena",
    title: "Support to Arena Access",
    rewardType: "arena-access",
    requirementTypes: ["watch-check-in", "venue-check-in"],
    active: false
  }
];
