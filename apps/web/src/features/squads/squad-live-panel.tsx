"use client";

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import { AssetIcon } from "@/components/cornerstone/asset-icon";
import { CornerstonePageShell } from "@/components/cornerstone/cornerstone-page-shell";
import { squadService } from "@/lib/services/squad-service";
import { listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";

const eventCountdown = [
  ["03", "Days"],
  ["14", "Hrs"],
  ["28", "Mins"],
  ["37", "Secs"]
] as const;

export function SquadLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();

  const squadQuery = useQuery({
    queryKey: ["cornerstone", "squad"],
    queryFn: () => squadService.getActiveSquad()
  });

  const proofQuery = useQuery({
    queryKey: ["cornerstone", "proofs", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridProofs(client, account?.address ?? null)
  });

  const squad = squadQuery.data;
  const recognizedProofs = (proofQuery.data ?? []).filter(
    (proof) => proof.status === "recognized"
  );
  const progress = squad ? Math.min(100, Math.round((squad.progress / squad.target) * 100)) : 78;
  const progressLabel = squad
    ? `${squad.progress.toLocaleString()} / ${squad.target.toLocaleString()} contributions`
    : "12,842 / 16,400 contributions";

  return (
    <CornerstonePageShell
      active="squad"
      section="03 Squad / Event"
      eyebrow={account?.address && packageConfigured ? "Live wallet mode" : "Japan limited"}
      title="One Community Unlock Path"
      subcopy="When we move together, the next door opens."
    >
      <section id="event-limited" className="cs-section-frame cs-squad-hero">
        <div>
          <p className="cs-panel-label">Event Limited</p>
          <h2>
            ONE SAMURAI, <span className="text-[#d59a5b]">JAPAN</span>
          </h2>
          <p className="mt-2 font-['Teko'] text-xl font-semibold uppercase tracking-[0.1em] text-white/66">
            April 29 - Ariake Arena
          </p>
          <p className="cs-squad-copy mt-5 max-w-xl">
            Premium access opens around the live event. Individual proof and
            shared community progress meet in one Japan-limited unlock.
          </p>
          <a href="#community-progress" className="cs-button mt-7">
            View Event Details
            <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="cs-countdown">
          {eventCountdown.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-squad-grid mt-6">
        <article id="community-progress" className="cs-card cs-community-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="cs-panel-label">Community Progress</p>
              <div className="cs-community-percent">{progress}%</div>
              <p className="cs-squad-copy">
                We are almost there. Every contribution brings us closer to the unlock.
              </p>
            </div>
            <AssetIcon sheet="squad" index={2} className="large" label="Community progress" />
          </div>

          <div className="cs-progress-line">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-4 font-['Teko'] text-base font-semibold uppercase tracking-[0.1em] text-white/58">
            {progressLabel}
          </p>

          <div className="cs-status-row">
            <div>
              <AssetIcon sheet="squad" index={1} />
              <span className="cs-status mt-2">Support Proof complete</span>
            </div>
            <div>
              <AssetIcon sheet="squad" index={2} />
              <span className="cs-status mt-2">Key activity on track</span>
            </div>
            <div>
              <AssetIcon sheet="squad" index={3} />
              <span className="cs-status mt-2">Community strong</span>
            </div>
          </div>
        </article>

        <article className="cs-card cs-squad-card">
          <div className="flex flex-wrap items-start gap-5">
            <AssetIcon sheet="squad" index={0} className="large" label="One Samurai Japan" />
            <div className="min-w-0 flex-1">
              <p className="cs-panel-label">Squad Unlock</p>
              <h2 className="mt-3 font-['Teko'] text-4xl font-semibold uppercase leading-none text-white">
                ONE SAMURAI, JAPAN
              </h2>
              <p className="cs-squad-copy mt-3">
                When we move together, the next door opens.
              </p>
              <span className="cs-pill mt-4">
                Wallet support signals: {Math.max(recognizedProofs.length, 3)}
              </span>
            </div>
          </div>

          <div className="cs-squad-points">
            <div>
              <strong>Stronger Together</strong>
              <p className="cs-squad-copy">One community. One mission.</p>
            </div>
            <div>
              <strong>Next Door Awaits</strong>
              <p className="cs-squad-copy">Unlock premium access together.</p>
            </div>
            <div>
              <strong>Be Part of History</strong>
              <p className="cs-squad-copy">Make your mark on the moment.</p>
            </div>
          </div>
        </article>
      </section>
    </CornerstonePageShell>
  );
}
