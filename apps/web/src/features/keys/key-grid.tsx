import Link from "next/link";

import { Card } from "@/components/ui/card";
import { formatCountdown } from "@/lib/utils/format";
import type { CornerKey } from "@/types/domain";

export function KeyGrid({ keys }: { keys: CornerKey[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {keys.map((key) => (
        <Link key={key.id} href={`/keys/${key.id}`}>
          <Card className="panel-metal h-full border-line/90 p-5 transition hover:-translate-y-1 hover:border-metal/28">
            <p className="eyebrow-label">
              {key.type}
            </p>
            <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.04em] text-white">
              {key.label}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/66">{key.description}</p>
            <div className="mt-6 space-y-1 text-sm text-white/54">
              <p className="uppercase tracking-[0.18em]">Status: {key.status}</p>
              <p>Requirement count: {key.unlockRequirements.minimumCount}</p>
              <p>{formatCountdown(key.expiresAt)}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
