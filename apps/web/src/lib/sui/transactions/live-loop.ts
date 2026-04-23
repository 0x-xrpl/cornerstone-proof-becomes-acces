import { Transaction } from "@mysten/sui/transactions";

import { keyTypeCodes, proofTypeCodes } from "@/lib/domain/catalog";
import { demoAmaExpiry, demoAthleteId, demoEventId } from "@/lib/mock/demo";
import { cornerstoneMoveTarget } from "@/lib/sui/package";

function commonArgs(tx: Transaction, owner: string) {
  tx.setSender(owner);

  return {
    athleteId: tx.pure.vector("u8", Array.from(new TextEncoder().encode(demoAthleteId))),
    eventId: tx.pure.vector("u8", Array.from(new TextEncoder().encode(demoEventId))),
    recipient: tx.pure.address(owner)
  };
}

export function buildIssueWatchCheckInTransaction(owner: string) {
  const tx = new Transaction();
  const { athleteId, eventId, recipient } = commonArgs(tx, owner);
  const proof = tx.moveCall({
    target: cornerstoneMoveTarget("support_proof", "issue_watch_check_in"),
    arguments: [athleteId, eventId, tx.pure.u64(Date.now())]
  });

  tx.transferObjects([proof], recipient);
  tx.setGasBudgetIfNotSet(50_000_000);

  return tx;
}

export function buildIssueQuizPassTransaction(owner: string) {
  const tx = new Transaction();
  const { athleteId, eventId, recipient } = commonArgs(tx, owner);
  const proof = tx.moveCall({
    target: cornerstoneMoveTarget("support_proof", "issue_quiz_pass"),
    arguments: [athleteId, eventId, tx.pure.u64(Date.now())]
  });

  tx.transferObjects([proof], recipient);
  tx.setGasBudgetIfNotSet(50_000_000);

  return tx;
}

export function buildIssueVenueCheckInTransaction(owner: string) {
  const tx = new Transaction();
  const { athleteId, eventId, recipient } = commonArgs(tx, owner);
  const proof = tx.moveCall({
    target: cornerstoneMoveTarget("support_proof", "issue_venue_check_in"),
    arguments: [athleteId, eventId, tx.pure.u64(Date.now())]
  });

  tx.transferObjects([proof], recipient);
  tx.setGasBudgetIfNotSet(50_000_000);

  return tx;
}

export function buildUnlockAmaKeyTransaction(owner: string) {
  const tx = new Transaction();
  const { athleteId, eventId, recipient } = commonArgs(tx, owner);
  const key = tx.moveCall({
    target: cornerstoneMoveTarget("corner_key", "issue_corner_ama_key"),
    arguments: [
      athleteId,
      eventId,
      tx.pure.bool(true),
      tx.pure.u64(new Date(demoAmaExpiry).getTime())
    ]
  });

  tx.transferObjects([key], recipient);
  tx.setGasBudgetIfNotSet(50_000_000);

  return tx;
}

export function buildUnlockPriorityMerchKeyTransaction(owner: string) {
  const tx = new Transaction();
  const { athleteId, eventId, recipient } = commonArgs(tx, owner);
  const key = tx.moveCall({
    target: cornerstoneMoveTarget("corner_key", "issue_priority_merch_key"),
    arguments: [athleteId, eventId, tx.pure.bool(false), tx.pure.u64(0)]
  });

  tx.transferObjects([key], recipient);
  tx.setGasBudgetIfNotSet(50_000_000);

  return tx;
}

export function buildUnlockArenaAccessKeyTransaction(owner: string) {
  const tx = new Transaction();
  const { athleteId, eventId, recipient } = commonArgs(tx, owner);
  const key = tx.moveCall({
    target: cornerstoneMoveTarget("corner_key", "issue_arena_access_key"),
    arguments: [
      athleteId,
      eventId,
      tx.pure.bool(true),
      tx.pure.u64(new Date("2026-04-24T06:00:00.000Z").getTime())
    ]
  });

  tx.transferObjects([key], recipient);
  tx.setGasBudgetIfNotSet(50_000_000);

  return tx;
}

export const liveLoopTypeCodes = {
  watchCheckIn: proofTypeCodes["watch-check-in"],
  venueCheckIn: proofTypeCodes["venue-check-in"],
  quizPass: proofTypeCodes["quiz-pass"],
  amaKey: keyTypeCodes["corner-ama"],
  merchKey: keyTypeCodes["priority-merch"],
  arenaKey: keyTypeCodes["arena-access"]
};
