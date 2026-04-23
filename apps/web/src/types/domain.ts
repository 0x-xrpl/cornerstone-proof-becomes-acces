import { z } from "zod";

export const athleteSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  weightClass: z.string(),
  image: z.string(),
  featured: z.boolean(),
  activeEventId: z.string().nullable()
});

export const supportProofTypeSchema = z.enum([
  "watch-check-in",
  "venue-check-in",
  "quiz-pass"
]);

export const supportProofStatusSchema = z.enum([
  "available",
  "recognized",
  "locked"
]);

export const supportProofSchema = z.object({
  id: z.string(),
  type: supportProofTypeSchema,
  label: z.string(),
  description: z.string(),
  status: supportProofStatusSchema,
  earnedAt: z.string().nullable(),
  athleteId: z.string(),
  eventId: z.string()
});

export const cornerKeyTypeSchema = z.enum([
  "corner-ama",
  "priority-merch",
  "arena-access"
]);

export const cornerKeyStatusSchema = z.enum([
  "locked",
  "ready",
  "unlocked",
  "used"
]);

export const unlockRequirementSchema = z.object({
  proofTypes: z.array(supportProofTypeSchema),
  minimumCount: z.number().int().positive()
});

export const cornerKeySchema = z.object({
  id: z.string(),
  type: cornerKeyTypeSchema,
  label: z.string(),
  description: z.string(),
  status: cornerKeyStatusSchema,
  unlockRequirements: unlockRequirementSchema,
  eventLimited: z.boolean(),
  expiresAt: z.string().nullable()
});

export const accessAvailabilitySchema = z.enum([
  "upcoming",
  "live",
  "closed"
]);

export const accessItemSchema = z.object({
  id: z.string(),
  type: z.enum(["ama", "merch", "arena"]),
  title: z.string(),
  description: z.string(),
  keyType: cornerKeyTypeSchema,
  availability: accessAvailabilitySchema,
  eventId: z.string(),
  athleteId: z.string()
});

export const squadUnlockSchema = z.object({
  id: z.string(),
  title: z.string(),
  region: z.string(),
  progress: z.number().int().nonnegative(),
  target: z.number().int().positive(),
  rewardDescription: z.string(),
  active: z.boolean()
});

export const consoleTemplateSchema = z.object({
  id: z.string(),
  title: z.string(),
  rewardType: cornerKeyTypeSchema,
  requirementTypes: z.array(supportProofTypeSchema),
  active: z.boolean()
});

export type Athlete = z.infer<typeof athleteSchema>;
export type SupportProofType = z.infer<typeof supportProofTypeSchema>;
export type SupportProofStatus = z.infer<typeof supportProofStatusSchema>;
export type SupportProof = z.infer<typeof supportProofSchema>;
export type CornerKeyType = z.infer<typeof cornerKeyTypeSchema>;
export type CornerKeyStatus = z.infer<typeof cornerKeyStatusSchema>;
export type UnlockRequirement = z.infer<typeof unlockRequirementSchema>;
export type CornerKey = z.infer<typeof cornerKeySchema>;
export type AccessItem = z.infer<typeof accessItemSchema>;
export type SquadUnlock = z.infer<typeof squadUnlockSchema>;
export type ConsoleTemplate = z.infer<typeof consoleTemplateSchema>;
