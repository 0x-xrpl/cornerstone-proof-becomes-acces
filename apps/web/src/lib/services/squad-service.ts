import { squads } from "@/lib/mock/squads";
import type { SquadUnlock } from "@/types/domain";

export interface SquadService {
  listSquads(): Promise<SquadUnlock[]>;
  getActiveSquad(): Promise<SquadUnlock | undefined>;
}

export const squadService: SquadService = {
  async listSquads() {
    return squads;
  },
  async getActiveSquad() {
    return squads.find((squad) => squad.active);
  }
};
