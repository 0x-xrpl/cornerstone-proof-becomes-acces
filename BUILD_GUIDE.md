# CornerStone Build Guide

## Objective
Build the technical foundation for the CornerStone MVP so product implementation can proceed directly into UI and chain wiring.

## MVP Boundaries
- Support Proof: `Watch Check-in`, `Venue Check-in`, `Quiz Pass`
- CornerKey: `Corner AMA Key`, `Priority Merch Key`, `Arena Access Key`
- One Japan-limited squad unlock only
- Athlete Console stays template-based
- At least one event-limited unlock path

## Route List
- `/`
- `/proof`
- `/proof/result`
- `/keys`
- `/keys/[id]`
- `/access/[id]`
- `/squad`
- `/console`
- `/wallet`

## Feature List
- Next.js app shell and route scaffold
- Tailwind setup
- Sui network config for testnet and localnet
- dApp Kit provider setup
- Wallet-native connection base
- zkLogin-ready feature flag and interface
- Sponsored transaction-ready service abstraction
- Mock data and service layer for product flow
- Move package scaffold with four initial modules

## Contract Responsibilities
- `support_proof.move`: basic proof objects and issue flows
- `corner_key.move`: key objects and issue flows
- `access_rules.move`: readable rule representation and unlock checks
- `squad_unlock.move`: minimal communal progress object

## Install Steps
1. Install Node.js current LTS and `pnpm`.
2. Install Sui CLI with `suiup` or an alternative method from `docs/sui.md`.
3. Run `pnpm install`.
4. Copy `.env.example` or `apps/web/.env.example` into a local env file as needed.
5. Run `pnpm dev`.
6. Use `pnpm sui:build` and `pnpm sui:test` to build and test the Move package with a repo-local `.move` cache.

## Env Config
- `NEXT_PUBLIC_SUI_NETWORK`
- `NEXT_PUBLIC_SUI_RPC_URL`
- `NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE`
- `NEXT_PUBLIC_ENABLE_ZKLOGIN`
- `NEXT_PUBLIC_ENABLE_SPONSORED_TX`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `SPONSOR_BACKEND_URL`

## Implementation Order
1. Workspace and repo structure
2. Frontend scaffold
3. Tailwind and app shell
4. Sui docs and scripts
5. Move package and tests
6. Config and env files
7. Providers and wallet base
8. zkLogin and sponsored transaction scaffolding
9. Mock data and services
10. Route shells and verification

## Mock vs Real
- Real now: repository structure, routes, provider composition, wallet connection base, config system, Move scaffolding
- Real now also includes: wallet-signed live issuance flow for `Watch Check-in`, `Venue Check-in`, `Quiz Pass`, `Corner AMA Key`, `Priority Merch Key`, and `Arena Access Key` when `NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE` is configured
- Real now also includes: wallet-aware `/`, `/proof/result`, `/keys/[id]`, and `/access/[id]` views that evaluate live proof/key ownership
- Real now also includes: browser-persisted template activation in the Console route and wallet contribution overlays in the Squad route
- Mock now: canonical squad aggregation backend, sponsor backend behavior, zkLogin flow

## Later Phases
- Real onchain issuance and reads
- zkLogin integration
- Sponsor backend implementation
- UI refinement and demo polish
- Kiosk and TransferPolicy integration where product needs it
