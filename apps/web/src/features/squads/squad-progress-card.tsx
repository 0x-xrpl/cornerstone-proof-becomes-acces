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
    <Card className="panel-metal max-w-4xl border-line/90">
      <p className="eyebrow-label">
        {squad.region}
      </p>
      <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.04em] text-white">
        {squad.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-white/64">
        {squad.rewardDescription}
      </p>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-coral"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-white/54">
        <span>
          {squad.progress} / {squad.target}
        </span>
        <span>{progressPercent}% complete</span>
      </div>
      <p className="mt-4 text-sm text-white/52">
        Wallet contribution signals: {contributionCount}
      </p>
    </Card>
  );
}
