# CornerStone Demo Flow

Use this flow to keep the MVP demo inside 30 seconds and aligned with the README.

## Goal
Make one idea obvious:

`support -> proof -> key -> access`

## Recommended live run
1. Open `/wallet`
2. Connect the Sui wallet
3. Open `/proof`
4. Issue `Watch Check-in`
5. Issue `Quiz Pass`
6. Unlock `Corner AMA Key`
7. Open `/access/access-ama-takeru`
8. Show `/squad` briefly as the communal layer
9. Open `/console` only if you need to show who can enable the next access path

## What to say
- Proof is recognized support, not the reward itself.
- The key is the access right.
- Access opens in the right moment, not later as a passive record.

## What not to emphasize
- Marketplace ideas
- Tokenomics
- Excess wallet jargon
- Multiple regional branches

## Current implementation notes
- Wallet-native flow is live
- `Watch Check-in`, `Venue Check-in`, and `Quiz Pass` can be issued
- `Corner AMA Key`, `Priority Merch Key`, and `Arena Access Key` can be unlocked
- `/access/[id]` reads the connected wallet and gates access by live key state
- `/console` stores template activation locally in the browser for demo purposes
