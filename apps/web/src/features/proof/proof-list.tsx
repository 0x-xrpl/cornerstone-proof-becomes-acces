import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/format";
import type { SupportProof } from "@/types/domain";

export function ProofList({ proofs }: { proofs: SupportProof[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {proofs.map((proof) => (
        <Card key={proof.id}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            {proof.type}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-ink">{proof.label}</h3>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            {proof.description}
          </p>
          <div className="mt-5 flex items-center justify-between text-sm text-ink/65">
            <span>Status: {proof.status}</span>
            <span>{formatDate(proof.earnedAt)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
