import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/format";
import type { SupportProof } from "@/types/domain";

export function ProofList({ proofs }: { proofs: SupportProof[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {proofs.map((proof) => (
        <Card key={proof.id} className="panel-metal group border-line/90 p-5">
          <p className="eyebrow-label">
            {proof.type}
          </p>
          <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.04em] text-white">
            {proof.label}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/66">
            {proof.description}
          </p>
          <div className="mt-6 flex items-center justify-between text-sm text-white/54">
            <span className="uppercase tracking-[0.18em]">Status: {proof.status}</span>
            <span>{formatDate(proof.earnedAt)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
