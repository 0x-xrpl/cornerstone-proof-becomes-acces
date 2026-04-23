import { keyCatalog, keyTypeFromCode, proofCatalog, proofTypeFromCode } from "@/lib/domain/catalog";
import { keys as mockKeys } from "@/lib/mock/keys";
import { proofs as mockProofs } from "@/lib/mock/proofs";
import { demoAthleteId, demoEventId } from "@/lib/mock/demo";
import { cornerstoneStructType, isCornerstonePackageConfigured } from "@/lib/sui/package";
import type { CornerKey, CornerKeyStatus, SupportProof } from "@/types/domain";

export interface CornerstoneChainClient {
  getOwnedObjects(input: {
    owner: string;
    cursor?: string | null;
    filter?: { StructType: string };
    options?: { showContent?: boolean; showType?: boolean };
  }): Promise<{
    data: Array<{
      data?: {
        objectId?: string;
        content?: unknown;
      } | null;
    }>;
    hasNextPage: boolean;
    nextCursor?: string | null;
  }>;
}

type ParsedFields = Record<string, unknown>;

function parseMoveFields(value: unknown): ParsedFields {
  if (!value || typeof value !== "object") return {};
  if (!("fields" in value)) return {};

  const fields = (value as { fields?: ParsedFields }).fields;
  return fields && typeof fields === "object" ? fields : {};
}

function readNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (typeof value === "bigint") return Number(value);
  return null;
}

function readBoolean(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

function readAscii(value: unknown): string | null {
  if (typeof value === "string") return value;

  if (Array.isArray(value) && value.every((item) => typeof item === "number")) {
    return new TextDecoder().decode(Uint8Array.from(value));
  }

  if (value && typeof value === "object") {
    if ("bytes" in value) {
      return readAscii((value as { bytes?: unknown }).bytes);
    }

    if ("fields" in value) {
      const fields = (value as { fields?: ParsedFields }).fields;
      if (fields?.bytes) return readAscii(fields.bytes);
    }
  }

  return null;
}

async function getOwnedMoveObjects(
  client: CornerstoneChainClient,
  owner: string,
  structType: string
) {
  const data = [];
  let cursor: string | null | undefined = null;

  do {
    const response = await client.getOwnedObjects({
      owner,
      cursor,
      filter: { StructType: structType },
      options: { showContent: true, showType: true }
    });

    data.push(...response.data);
    cursor = response.hasNextPage ? response.nextCursor : null;
  } while (cursor);

  return data;
}

export async function listHybridProofs(
  client: CornerstoneChainClient,
  owner: string | null
): Promise<SupportProof[]> {
  if (!owner || !isCornerstonePackageConfigured()) {
    return mockProofs;
  }

  try {
    const structType = cornerstoneStructType("support_proof", "SupportProof");

    if (!structType) return mockProofs;

    const ownedObjects = await getOwnedMoveObjects(client, owner, structType);
    const recognizedByType = new Map<
      SupportProof["type"],
      { objectId: string; earnedAt: string | null; athleteId: string; eventId: string }
    >();

    for (const item of ownedObjects) {
      const objectData = item.data;
      const fields = parseMoveFields(objectData?.content);
      const proofType = proofTypeFromCode(readNumber(fields.proof_type) ?? -1);

      if (!proofType) continue;

      recognizedByType.set(proofType, {
        objectId: objectData?.objectId ?? `live-${proofType}`,
        earnedAt:
          readNumber(fields.earned_at_ms) !== null
            ? new Date(readNumber(fields.earned_at_ms) ?? 0).toISOString()
            : null,
        athleteId: readAscii(fields.athlete_id) ?? demoAthleteId,
        eventId: readAscii(fields.event_id) ?? demoEventId
      });
    }

    return mockProofs.map((proof) => {
      const recognized = recognizedByType.get(proof.type);

      if (!recognized) {
        return { ...proof, status: "available", earnedAt: null };
      }

      return {
        ...proof,
        id: recognized.objectId,
        status: "recognized",
        earnedAt: recognized.earnedAt,
        athleteId: recognized.athleteId,
        eventId: recognized.eventId,
        label: proofCatalog[proof.type].label,
        description: proofCatalog[proof.type].description
      };
    });
  } catch {
    return mockProofs;
  }
}

export async function listHybridKeys(
  client: CornerstoneChainClient,
  owner: string | null
): Promise<CornerKey[]> {
  if (!owner || !isCornerstonePackageConfigured()) {
    return mockKeys;
  }

  try {
    const [liveProofs, keyStructType] = await Promise.all([
      listHybridProofs(client, owner),
      Promise.resolve(cornerstoneStructType("corner_key", "CornerKey"))
    ]);

    if (!keyStructType) return mockKeys;

    const ownedObjects = await getOwnedMoveObjects(client, owner, keyStructType);
    const unlockedByType = new Map<
      CornerKey["type"],
      { objectId: string; expiresAt: string | null; eventLimited: boolean }
    >();

    for (const item of ownedObjects) {
      const objectData = item.data;
      const fields = parseMoveFields(objectData?.content);
      const keyType = keyTypeFromCode(readNumber(fields.key_type) ?? -1);

      if (!keyType) continue;

      unlockedByType.set(keyType, {
        objectId: objectData?.objectId ?? `live-${keyType}`,
        expiresAt:
          readNumber(fields.expires_at_ms) && Number(fields.expires_at_ms) > 0
            ? new Date(Number(fields.expires_at_ms)).toISOString()
            : null,
        eventLimited:
          readBoolean(fields.event_limited) ?? keyCatalog[keyType].eventLimited
      });
    }

    const recognizedProofs = new Set(
      liveProofs
        .filter((proof) => proof.status === "recognized")
        .map((proof) => proof.type)
    );

    return mockKeys.map((key) => {
      const unlocked = unlockedByType.get(key.type);
      const requirementsMet = key.unlockRequirements.proofTypes.every((proofType) =>
        recognizedProofs.has(proofType)
      );

      let status: CornerKeyStatus = "locked";
      if (requirementsMet) status = "ready";
      if (unlocked) status = "unlocked";

      return {
        ...key,
        id: unlocked?.objectId ?? key.id,
        status,
        eventLimited: unlocked?.eventLimited ?? key.eventLimited,
        expiresAt: unlocked?.expiresAt ?? key.expiresAt
      };
    });
  } catch {
    return mockKeys;
  }
}
