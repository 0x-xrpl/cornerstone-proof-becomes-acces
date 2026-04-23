import { proofs } from "@/lib/mock/proofs";
import { listHybridProofs, type CornerstoneChainClient } from "@/lib/sui/live-data";
import type { SupportProof } from "@/types/domain";

export interface ProofService {
  listProofs(): Promise<SupportProof[]>;
  getProofById(id: string): Promise<SupportProof | undefined>;
  listProofsForOwner(
    client: CornerstoneChainClient,
    owner: string | null
  ): Promise<SupportProof[]>;
}

export const proofService: ProofService = {
  async listProofs() {
    return proofs;
  },
  async getProofById(id) {
    return proofs.find((proof) => proof.id === id);
  },
  async listProofsForOwner(client, owner) {
    return listHybridProofs(client, owner);
  }
};
