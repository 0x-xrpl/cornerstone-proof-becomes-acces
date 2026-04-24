"use client";

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

import { AssetIcon } from "@/components/cornerstone/asset-icon";
import { CornerstonePageShell } from "@/components/cornerstone/cornerstone-page-shell";
import { accessItems } from "@/lib/mock/access";
import { listHybridKeys, listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";
import type { CornerKeyType } from "@/types/domain";

const keyCards: Array<{
  type: CornerKeyType;
  title: string;
  access: string;
  requirement: string;
  state: string;
  progress: string;
  fill: string;
  iconIndex: number;
}> = [
  {
    type: "corner-ama",
    title: "Corner AMA Key",
    access: "Support to AMA",
    requirement: "Requires 1 proof",
    state: "Access unlocked",
    progress: "1 / 1 proof",
    fill: "100%",
    iconIndex: 0
  },
  {
    type: "priority-merch",
    title: "Priority Merch Key",
    access: "Support to Merch Priority",
    requirement: "Requires 1 proof",
    state: "Not unlocked yet",
    progress: "0 / 1 proof",
    fill: "0%",
    iconIndex: 1
  },
  {
    type: "arena-access",
    title: "Arena Access Key",
    access: "Support to Arena Access",
    requirement: "Requires more proof",
    state: "Not unlocked yet",
    progress: "0 / 3 proofs",
    fill: "0%",
    iconIndex: 2
  }
];

export function KeysLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();
  const [accessOpened, setAccessOpened] = useState(false);

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  const proofQuery = useQuery({
    queryKey: ["cornerstone", "proofs", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridProofs(client, account?.address ?? null)
  });

  const keys = keyQuery.data ?? [];
  const proofs = proofQuery.data ?? [];
  const unlockedKeys = keys.filter((key) => key.status === "unlocked");
  const recognizedProofs = proofs.filter((proof) => proof.status === "recognized");
  const visibleRecognizedProofs = Math.max(recognizedProofs.length, 3);
  const amaAccess = accessItems.find((item) => item.keyType === "corner-ama");

  return (
    <CornerstonePageShell
      active="access"
      section="02 CornerKey / Access"
      eyebrow={account?.address && packageConfigured ? "Live wallet mode" : "Mock fallback"}
      title="Rule-Based Access Keys"
      subcopy="Your recognized proof unlocks keys. Your keys unlock real access."
    >
      <section className="cs-section-frame cs-access-feature">
        <div>
          <p className="cs-panel-label">Wallet key state</p>
          <div className="cs-feature-stat">{Math.max(unlockedKeys.length, 1)}</div>
          <h2>Unlocked key in this wallet</h2>
          <p className="cs-squad-copy mt-3 max-w-xl">
            Keep proving. Unlock more access. CornerKey is not a badge, it is a
            rule-based access right for the exact event moment.
          </p>
          <button className="cs-button mt-6" onClick={() => setAccessOpened(true)}>
            Open AMA Access
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="grid place-items-center">
          <AssetIcon sheet="keys" index={0} className="key-icon large" label="Corner AMA Key" />
          <div className="mt-5 text-center">
            <span className="cs-status">Unlocked</span>
            <p className="mt-3 font-['Teko'] text-3xl font-semibold uppercase leading-none text-white">
              Corner AMA Key
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 cs-section-frame p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="cs-panel-label">CornerKey</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              {visibleRecognizedProofs} recognized support proofs are connected to
              the key layer.
            </p>
          </div>
          <span className="cs-pill">Support Proof to CornerKey to Access</span>
        </div>

        <div className="cs-key-grid">
          {keyCards.map((card) => {
            const liveKey = keys.find((key) => key.type === card.type);
            const unlocked = card.type === "corner-ama" || liveKey?.status === "unlocked";

            return (
              <article
                key={card.type}
                id={card.type}
                className={`cs-card cs-key-card ${unlocked ? "" : "is-locked"}`}
              >
                <header>
                  <AssetIcon sheet="keys" index={card.iconIndex} className="key-icon" />
                  <span className={`cs-status ${unlocked ? "" : "is-locked"}`}>
                    {unlocked ? "Unlocked" : "Locked"}
                  </span>
                </header>
                <h3>{card.title}</h3>
                <p>{card.access}</p>
                <div className="cs-key-meta">
                  <span className="cs-pill">{card.requirement}</span>
                  <span className="cs-pill">{unlocked ? "Access unlocked" : card.state}</span>
                </div>
                <div className="cs-progress-line">
                  <span style={{ width: unlocked ? "100%" : card.fill }} />
                </div>
                <p className="mt-3 text-sm text-white/50">
                  {unlocked ? "1 / 1 proof" : card.progress}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cs-section-frame cs-access-flow">
        <p className="cs-panel-label">Access unlocked by CornerKeys</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
          Each key connects recognized support to a specific type of access.
        </p>
        <div className="cs-flow-row">
          {[
            ["Support to AMA", "Verified conversation access", 0],
            ["Support to Merch Priority", "Priority drop lane", 1],
            ["Support to Arena Access", "Event-day access lane", 2]
          ].map(([title, copy, icon]) => (
            <div key={title} className="cs-flow-item">
              <AssetIcon sheet="access" index={Number(icon)} />
              <div>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {accessOpened ? (
        <div className="cs-modal-backdrop" role="dialog" aria-modal="true">
          <div className="cs-modal">
            <button
              className="float-right text-white/58 transition hover:text-white"
              aria-label="Close"
              onClick={() => setAccessOpened(false)}
            >
              <X className="size-5" />
            </button>
            <p className="cs-panel-label">Corner AMA Key</p>
            <h2>AMA Access opened.</h2>
            <p>
              Your recognized proof has opened verified supporter access through
              Corner AMA Key.
            </p>
            {amaAccess ? (
              <p className="mt-3 text-sm text-white/54">
                {amaAccess.title}: {amaAccess.description}
              </p>
            ) : null}
            <button className="cs-button mt-6 w-full" onClick={() => setAccessOpened(false)}>
              Continue
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </CornerstonePageShell>
  );
}
