import Link from "next/link";

import { Card } from "@/components/ui/card";
import { formatCountdown } from "@/lib/utils/format";
import type { CornerKey } from "@/types/domain";

export function KeyGrid({ keys }: { keys: CornerKey[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {keys.map((key) => (
        <Link key={key.id} href={`/keys/${key.id}`}>
          <Card className="h-full transition hover:-translate-y-1 hover:border-coral/20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              {key.type}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-ink">{key.label}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/70">{key.description}</p>
            <div className="mt-5 space-y-1 text-sm text-ink/65">
              <p>Status: {key.status}</p>
              <p>Requirement count: {key.unlockRequirements.minimumCount}</p>
              <p>{formatCountdown(key.expiresAt)}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
