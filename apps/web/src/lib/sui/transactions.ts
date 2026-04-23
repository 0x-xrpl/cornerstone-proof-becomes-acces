import { Transaction } from "@mysten/sui/transactions";

import { sponsorService } from "@/lib/sui/sponsored-transactions";

export async function prepareTransactionForExecution(
  build: () => Transaction,
  buildBytes: (transaction: Transaction) => Promise<Uint8Array>
) {
  const transaction = build();
  const bytes = await buildBytes(transaction);

  return sponsorService.prepareSponsoredTransaction(bytes);
}
