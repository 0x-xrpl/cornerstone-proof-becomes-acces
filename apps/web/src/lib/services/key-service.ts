import { keys } from "@/lib/mock/keys";
import { listHybridKeys, type CornerstoneChainClient } from "@/lib/sui/live-data";
import type { CornerKey } from "@/types/domain";

export interface KeyService {
  listKeys(): Promise<CornerKey[]>;
  getKeyById(id: string): Promise<CornerKey | undefined>;
  listKeysForOwner(
    client: CornerstoneChainClient,
    owner: string | null
  ): Promise<CornerKey[]>;
}

export const keyService: KeyService = {
  async listKeys() {
    return keys;
  },
  async getKeyById(id) {
    return keys.find((key) => key.id === id);
  },
  async listKeysForOwner(client, owner) {
    return listHybridKeys(client, owner);
  }
};
