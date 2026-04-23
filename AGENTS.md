# CornerStone Agent Guide

## Non-negotiables
- Read `README` first and treat it as the product authority.
- Respect the MVP boundaries exactly as defined there.
- Do not add speculative features, token economics, ranking systems, or marketplace logic.
- Keep `Support Proof` and `CornerKey` separate in both product logic and onchain representation.
- Keep the architecture lightweight, modular, and ready for real Sui wiring.

## Working Style
- Use `pnpm`.
- Prefer minimal abstractions over framework-heavy indirection.
- Extend the current implementation instead of rewriting product definitions.
- Keep wallet, zkLogin, and sponsored transaction work subordinate to the product loop.
- Favor working scaffolds and replaceable mocks over overdesigned infrastructure.

## Implementation Priorities
1. Preserve the `Support Proof -> CornerKey -> Access` loop.
2. Keep the three proof types and three key types unchanged.
3. Maintain the single Japan-limited squad unlock path.
4. Keep Athlete Console template-based in the MVP.
5. Prepare Sui integration cleanly without letting Web3 jargon dominate the UI.
