import { Card } from "@/components/ui/card";
import type { SquadUnlock } from "@/types/domain";

export function SquadProgressCard({
  squad,
  contributionCount = 0
}: {
  squad: SquadUnlock;
  contributionCount?: number;
}) {
  const progressPercent = Math.min(
    100,
    Math.round((squad.progress / squad.target) * 100)
  );

  return (
    <Card className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
        {squad.region}
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-ink">{squad.title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/72">
        {squad.rewardDescription}
      </p>
      <div className="mt-6 h-4 overflow-hidden rounded-full bg-ink/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-coral"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-ink/68">
        <span>
          {squad.progress} / {squad.target}
        </span>
        <span>{progressPercent}% complete</span>
      </div>
      <p className="mt-4 text-sm text-ink/65">
        Wallet contribution signals: {contributionCount}
      </p>
    </Card>
  );
}
