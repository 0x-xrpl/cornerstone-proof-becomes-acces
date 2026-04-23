# CornerStone Architecture

## Four-layer model
CornerStone uses four layers so the MVP stays simple while remaining ready for real chain integration.

### 1. Frontend
This layer renders the user experience, route flow, current proof state, unlock state, squad progress, and onboarding surfaces. It should present Sui as infrastructure, not as the product story.

### 2. App Logic
This layer turns domain models into product behavior. It handles support proof state, key unlock logic, access eligibility presentation, squad progress, and the lightweight logic needed by the frontend before full onchain wiring is complete.

### 3. Onchain Rights Layer
This layer exists in the Sui Move package. `Support Proof` and `CornerKey` are represented as separate objects so the product can distinguish what was recognized from what access became available. That separation is central to the product definition and should not be collapsed into a single flag or asset type.

### 4. Lightweight Service Layer
This layer provides replaceable adapters for mock data, event metadata, countdown support, sponsor helpers, and future indexer integration. It is intentionally light because the MVP does not need a heavy backend to prove the core loop.

## Why Support Proof and CornerKey are separate
The product does not treat recognition and access as the same thing.

- `Support Proof` captures that an eligible support action happened.
- `CornerKey` captures that a usable access right was unlocked.

This separation makes the system easier to reason about onchain and in the app. It also preserves room for future restrictions such as event limits, expiry windows, and transfer rules without turning proof recognition into a generic membership flag.

## Onchain responsibilities
- Represent proof and key objects distinctly
- Keep a readable rule layer for proof-to-key conditions
- Represent a narrow communal unlock object
- Stay minimal in phase one so future policy work can be layered in without undoing the base

## App logic responsibilities
- Display proof state and unlock state
- Provide mock implementations until contract integration is wired
- Keep route-facing product logic out of page files where possible
- Hold feature flags for zkLogin and sponsored transaction readiness

## Wallet, zkLogin, and sponsored transactions
- Wallet-native connection lives in the frontend/provider layer.
- zkLogin belongs to a separate auth abstraction so lightweight onboarding can be added without rewriting the app.
- Sponsored transactions belong to a transaction preparation layer plus a sponsor service adapter so backend sponsorship can be inserted later.

## Why the MVP stays lightweight
CornerStone is validating a focused product loop, not a broad platform. The architecture is deliberately small so the team can move into demo implementation quickly without carrying unnecessary backend or Web3 complexity.
