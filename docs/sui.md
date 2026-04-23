# CornerStone Sui Setup

## Purpose of Sui in this project
Sui is used as the rights and state layer behind the product loop.

- `Support Proof` and `CornerKey` are separate onchain objects.
- Future rule work can extend `CornerKey` with event limits, expiry, and transfer restrictions.
- zkLogin and sponsored transactions reduce onboarding friction when the product moves beyond wallet-native flow.

## Install Sui CLI
Recommended path:

```bash
curl -fsSL https://install.sui.io | sh
```

If you prefer `suiup`, use the official installer path and then reload your shell:

```bash
suiup install sui
```

Alternative notes:
- macOS users can also check Homebrew if they already manage local toolchains there.
- Windows users can check the official Chocolatey guidance if that fits their environment.

## Verify install
```bash
sui --version
```

## Configure Sui client
Initialize the client if needed:

```bash
sui client
```

List environments:

```bash
sui client envs
```

Switch to testnet:

```bash
pnpm sui:client:testnet
```

Switch to localnet:

```bash
pnpm sui:client:localnet
```

## Create or switch active address
Create a new address:

```bash
sui client new-address ed25519
```

Show the active address:

```bash
sui client active-address
```

Switch addresses:

```bash
sui client switch --address <ADDRESS>
```

## Get testnet tokens
Request faucet funds for the active address before publishing or running transactions:

```bash
sui client faucet
```

If the faucet flow changes, use the current official testnet faucet instructions from Mysten Labs.

## Build and test the Move package
From the repo root:

```bash
pnpm sui:build
pnpm sui:test
```

The Move package lives at `contracts/cornerstone`.
The helper scripts use a repo-local `.move` cache by default so dependency resolution does not depend on `~/.move`.

## Publish to testnet
After funding the active address:

```bash
pnpm sui:publish:testnet
```

Copy the published package ID into:

- `apps/web/.env.local`
- `NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE`

If you also want a root-level env file for scripts, keep the same value in `.env.local` there.

## Frontend network wiring
The frontend reads:

- `NEXT_PUBLIC_SUI_NETWORK`
- `NEXT_PUBLIC_SUI_RPC_URL`
- `NEXT_PUBLIC_PACKAGE_ID_CORNERSTONE`

These are consumed by:

- `apps/web/src/lib/config/env.ts`
- `apps/web/src/lib/config/sui.ts`

## zkLogin in this project
zkLogin exists to make wallet onboarding lighter for users who should not need a traditional wallet-first flow. In the current MVP build it is represented as a feature flag and service interface, not a completed auth implementation.

## Sponsored transactions in this project
Sponsored transactions exist so the app can eventually cover gas for critical user actions. In the current MVP build they are represented by:

- feature flags
- sponsor service interface
- transaction preparation abstraction

No production sponsor backend is included yet.

## Kiosk and TransferPolicy later
Kiosk and TransferPolicy matter to CornerStone because `CornerKey` may eventually require rules such as:

- non-transfer behavior
- official distribution paths
- expiry windows
- secondary flow constraints

Those are intentionally not fully implemented in phase one. The current base is designed so those constraints can be added later without collapsing the proof/key separation.
