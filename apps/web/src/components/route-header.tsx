import { Badge } from "@/components/ui/badge";

export function RouteHeader({
  eyebrow,
  title,
  description,
  badge
}: {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-ink/72">{description}</p>
      </div>

      {badge ? <Badge tone="accent">{badge}</Badge> : null}
    </div>
  );
}
