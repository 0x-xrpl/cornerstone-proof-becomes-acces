import { accessItems } from "@/lib/mock/access";
import type { AccessItem } from "@/types/domain";

export interface AccessService {
  listAccess(): Promise<AccessItem[]>;
  getAccessById(id: string): Promise<AccessItem | undefined>;
}

export const accessService: AccessService = {
  async listAccess() {
    return accessItems;
  },
  async getAccessById(id) {
    return accessItems.find((item) => item.id === id);
  }
};
