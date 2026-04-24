"use client";

import Link from "next/link";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  KeyRound,
  MapPin,
  Menu,
  MessageCircle,
  MonitorPlay,
  ShieldCheck,
  Shirt,
  Swords,
  Ticket,
  Trophy
} from "lucide-react";

import { BrandLockup } from "@/components/brand-lockup";
import { Button } from "@/components/ui/button";
import { accessItems } from "@/lib/mock/access";
import { athletes } from "@/lib/mock/athletes";
import { squadService } from "@/lib/services/squad-service";
import { listHybridKeys, listHybridProofs } from "@/lib/sui/live-data";
import { isCornerstonePackageConfigured } from "@/lib/sui/package";
import { formatCountdown } from "@/lib/utils/format";
import { useConsoleTemplates } from "@/features/console/use-console-templates";

const headerLinks = [
  ["Dashboard", "/"],
  ["Proof", "/proof"],
  ["Access", "/access"],
  ["Squad", "/squad"],
  ["Console", "/console"],
  ["Wallet", "/wallet"]
] as const;

const eventCountdown = [
  ["03", "Days"],
  ["14", "Hrs"],
  ["28", "Mins"],
  ["37", "Secs"]
] as const;

const proofIconMap = {
  "Watch Check-in": MonitorPlay,
  "Venue Check-in": MapPin,
  "Quiz Pass": CheckCircle2
} as const;

const keyIconMap = {
  "Corner AMA Key": MessageCircle,
  "Priority Merch Key": Shirt,
  "Arena Access Key": Ticket
} as const;

const consoleIconMap = {
  "Support to AMA": MessageCircle,
  "Support to Merch Priority": Shirt,
  "Support to Arena Access": Crown
} as const;

function compactAddress(address: string | undefined) {
  if (!address) {
    return "Not connected";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function statusLabel(status: string | undefined) {
  if (!status) {
    return "available";
  }

  return status.replaceAll("-", " ");
}

export function DashboardLivePanel() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageConfigured = isCornerstonePackageConfigured();
  const featuredAthlete = athletes.find((athlete) => athlete.featured) ?? athletes[0];
  const { templates } = useConsoleTemplates();

  const proofQuery = useQuery({
    queryKey: ["cornerstone", "proofs", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridProofs(client, account?.address ?? null)
  });

  const keyQuery = useQuery({
    queryKey: ["cornerstone", "keys", account?.address ?? null, packageConfigured],
    queryFn: () => listHybridKeys(client, account?.address ?? null)
  });

  const squadQuery = useQuery({
    queryKey: ["cornerstone", "squad"],
    queryFn: () => squadService.getActiveSquad()
  });

  const proofs = proofQuery.data ?? [];
  const keys = keyQuery.data ?? [];
  const squad = squadQuery.data;
  const amaKey = keys.find((key) => key.type === "corner-ama");
  const amaAccess = accessItems.find((item) => item.keyType === "corner-ama");
  const squadPercent = squad
    ? Math.min(100, Math.round((squad.progress / squad.target) * 100))
    : 0;
  const recognizedProofs = proofs.filter((proof) => proof.status === "recognized");
  const unlockedKeys = keys.filter((key) => key.status === "unlocked");
  const walletSteps = [
    {
      label: "Connect wallet",
      done: Boolean(account?.address)
    },
    {
      label: "Watch Check-in recognized",
      done: proofs.some(
        (proof) => proof.type === "watch-check-in" && proof.status === "recognized"
      )
    },
    {
      label: "Quiz Pass recognized",
      done: proofs.some((proof) => proof.type === "quiz-pass" && proof.status === "recognized")
    },
    {
      label: "Corner AMA Key unlocked",
      done: amaKey?.status === "unlocked"
    }
  ];

  return (
    <section className="cornerstone-stage">
      <div className="stage-haze" />
      <div className="stage-shell">
        <header className="stage-header">
          <BrandLockup />

          <nav className="stage-nav" aria-label="Primary">
            {headerLinks.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="stage-actions">
            <div className="value-strip">
              <span>
                <ShieldCheck />
                Real support
              </span>
              <span>
                <KeyRound />
                Real access
              </span>
              <span>
                <Crown />
                Real proximity
              </span>
            </div>
            <Link href="/wallet">
              <Button variant="secondary">
                {account?.address ? "Wallet Live" : "Connect Wallet"}
              </Button>
            </Link>
          </div>

          <button className="stage-menu" aria-label="Open navigation">
            <Menu />
          </button>
        </header>

        <section className="hero-panel">
          <div
            className="hero-image"
            style={{ backgroundImage: `url(${featuredAthlete.image})` }}
          />
          <div className="hero-lights" />
          <div className="hero-copy">
            <p className="micro-label">Dashboard</p>
            <h1>Proof becomes access</h1>
            <p>Real support unlocks real access.</p>
            <div className="hero-ctas">
              <Link href="/proof">
                <Button variant="accent">
                  Start Proof
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/access#corner-ama">
                <Button variant="secondary">
                  Open AMA access
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero-mark">
            <Swords />
            <span>ONE SAMURAI</span>
          </div>
        </section>

        <div className="stage-grid top-grid">
          <section className="stage-block proof-block">
            <div className="block-head">
              <p className="micro-label">Support Proof</p>
              <span>{recognizedProofs.length} recognized</span>
            </div>
            <p className="block-copy">
              Support is being recognized. Watch Check-in, Venue Check-in, and Quiz
              Pass feed directly into the next key layer.
            </p>
            <div className="proof-card-row">
              {proofs.map((proof) => {
                const Icon = proofIconMap[proof.label as keyof typeof proofIconMap] ?? ShieldCheck;

                return (
                  <Link
                    key={proof.id}
                    href={`/proof#${proof.type}`}
                    className="ref-card proof-card"
                  >
                    <Icon />
                    <div>
                      <h3>{proof.label}</h3>
                      <p>{proof.description}</p>
                      <span>Status: {statusLabel(proof.status)}</span>
                    </div>
                    <ArrowRight />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="stage-block key-block">
            <div className="block-head">
              <p className="micro-label">CornerKey</p>
              <span>{unlockedKeys.length} unlocked</span>
            </div>
            <div className="key-card-row">
              {keys.map((key) => {
                const Icon = keyIconMap[key.label as keyof typeof keyIconMap] ?? KeyRound;

                return (
                  <Link
                    key={key.id}
                    href={`/access#${key.type}`}
                    className="ref-card key-card"
                  >
                    <div className="key-sigil">
                      <Icon />
                    </div>
                    <h3>{key.label}</h3>
                    <p>{key.description}</p>
                    <span>
                      {statusLabel(key.status)}
                      {key.expiresAt ? ` / ${formatCountdown(key.expiresAt)}` : ""}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="stage-block event-block">
            <div className="event-title">
              <p className="micro-label boxed">Event Limited</p>
              <h2>
                ONE SAMURAI, <span>JAPAN</span>
              </h2>
              <p>April 29 • Ariake Arena</p>
            </div>
            <div className="countdown-grid">
              {eventCountdown.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <Link href="/squad#event-limited">
              <Button variant="secondary" className="w-full justify-between">
                View Event Details
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </section>
        </div>

        <div className="stage-grid lower-grid">
          <Link href="/squad" className="stage-block squad-block">
            <div className="squad-emblem">
              <Trophy />
            </div>
            <div>
              <p className="micro-label">Squad Unlock</p>
              <h2>ONE SAMURAI, JAPAN</h2>
              <p>When we move together, the next door opens.</p>
              <span>{squad?.progress ?? 0} / {squad?.target ?? 0} contributions</span>
            </div>
            <div className="progress-panel">
              <p>Community Progress</p>
              <strong>{squadPercent}%</strong>
              <div className="progress-track">
                <div style={{ width: `${squadPercent}%` }} />
              </div>
              <span>Wallet contribution signals: {recognizedProofs.length}</span>
            </div>
          </Link>

          <section className="stage-block console-block">
            <div className="block-head">
              <p className="micro-label">Your Console Preview</p>
              <span>Template control layer</span>
            </div>
            <div className="console-card-row">
              {templates.map((template) => {
                const Icon =
                  consoleIconMap[template.title as keyof typeof consoleIconMap] ?? ShieldCheck;

                return (
                  <Link
                    key={template.id}
                    href={`/access#${template.rewardType}`}
                    className="ref-card console-card"
                  >
                    <Icon />
                    <div>
                      <span>{template.title}</span>
                      <strong>{template.rewardType.replaceAll("-", " ")}</strong>
                    </div>
                    <ArrowRight />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <section className="stage-grid demo-grid">
          <div className="stage-block demo-block">
            <p className="micro-label">30-second demo</p>
            <h2>Support becomes access in four visible steps</h2>
            <div className="demo-step-row">
              {walletSteps.map((step) => (
                <Link
                  key={step.label}
                  href={step.label === "Connect wallet" ? "/wallet" : "/proof"}
                  className={step.done ? "demo-step is-done" : "demo-step"}
                >
                  <CheckCircle2 />
                  <span>{step.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="stage-block live-state-block">
            <p className="micro-label">Wallet live state</p>
            <dl>
              <div>
                <dt>Connected wallet</dt>
                <dd>{compactAddress(account?.address)}</dd>
              </div>
              <div>
                <dt>Package configured</dt>
                <dd>{packageConfigured ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt>Unlocked keys</dt>
                <dd>{unlockedKeys.length}</dd>
              </div>
              <div>
                <dt>AMA countdown</dt>
                <dd>{amaKey?.expiresAt ? formatCountdown(amaKey.expiresAt) : "No limit"}</dd>
              </div>
            </dl>
          </div>
        </section>

        <footer className="stage-footer">
          <BrandLockup subtle />
          <div>
            <h2>Support should not disappear.</h2>
            <h3>It should open the next distance.</h3>
          </div>
          <div className="footer-signature">
            <p>次の景色へ、つながる鍵を。</p>
            <span>Proof becomes access</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
