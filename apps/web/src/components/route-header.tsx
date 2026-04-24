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
        <p className="eyebrow-label">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/64">{description}</p>
      </div>

      {badge ? <Badge tone="accent">{badge}</Badge> : null}
    </div>
  );
}
