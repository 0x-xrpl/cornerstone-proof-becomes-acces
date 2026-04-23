import { Card } from "@/components/ui/card";
import type { AccessItem } from "@/types/domain";

export function AccessDetailCard({ access }: { access: AccessItem }) {
  return (
    <Card className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
        {access.type}
      </p>
      <h3 className="mt-3 text-3xl font-semibold text-ink">{access.title}</h3>
      <p className="mt-4 text-base leading-7 text-ink/72">{access.description}</p>
      <div className="mt-6 grid gap-3 text-sm text-ink/68 md:grid-cols-3">
        <p>Required key: {access.keyType}</p>
        <p>Availability: {access.availability}</p>
        <p>Event: {access.eventId}</p>
      </div>
    </Card>
  );
}
