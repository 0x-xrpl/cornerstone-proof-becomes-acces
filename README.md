# CornerStone

### Proof becomes access.

CornerStone turns real fan support into recognized proof, and recognized proof into real access.

Watching, attending, checking in at a venue, passing a quiz, or continuing to support an athlete should not disappear as a temporary reaction. CornerStone treats those actions as **Support Proof**. When the required proof is recognized, a **CornerKey** is unlocked.

A CornerKey is not a point, a badge, or a lottery ticket. It is a usable access right that can open athlete AMAs, priority merch access, event-limited experiences, and arena-related access.

CornerStone answers one simple question:

**How can ONE Championship create a new relationship with Japanese fans, and how can athletes and fans become meaningfully closer?**

---

## Project Status

CornerStone is currently being built as a hackathon MVP for the **Sui x ONE Samurai Tokyo Builders’ Arena**.

The current focus is to make the core loop understandable, clickable, and visually polished:

```text
Support Proof
    ↓
CornerKey
    ↓
Access
```

The repository currently contains:

- Product concept and README
- Sui Move module direction
- Web application structure
- Static premium UI prototype
- Dashboard / Proof / Access / Squad demo flow
- MVP design direction for a dark sports-tech access console

---

## What CornerStone Does

CornerStone keeps the product loop simple.

- Recognize meaningful fan support actions
- Turn recognized support into proof
- Check whether proof conditions are satisfied
- Unlock a CornerKey
- Use that key to open real access

The central experience is **CornerKey**.

A fan should feel:

```text
I supported.
It was recognized.
A key opened.
I got closer.
```

That feeling is the core of CornerStone.

---

## Core Loop

```text
Fan Support Action
        ↓
Support Proof
        ↓
Rule Check
        ↓
CornerKey
        ↓
Real Access
```

CornerStone is not only about counting support after the fact. It is about opening access at the right moment.

The strongest version of this product is when support becomes access during a specific event, at a specific time, and around a specific athlete or competition moment.

---

## Core Concepts

### Support Proof

**Support Proof** represents recognized fan support.

It does not simply mean that a user clicked something. It represents a meaningful action that can become part of an access condition.

For the MVP, CornerStone uses three Support Proof actions:

- Watch Check-in
- Venue Check-in
- Quiz Pass

Support Proof is not the final reward. It is the condition layer that makes CornerKey possible.

---

### CornerKey

**CornerKey** is the access right unlocked by recognized proof.

It is the moment where the user feels that support changed something.

For the MVP, CornerStone uses three CornerKeys:

- Corner AMA Key
- Priority Merch Key
- Arena Access Key

A CornerKey can open access such as:

- Athlete AMA access
- Priority merch access
- Venue-limited drops
- Event-limited participation routes
- Access available only to qualified supporters
- Time-limited or event-day-only access

The important point is that a CornerKey is not something a user merely owns.

**It is something the user can use.**

---

### Squad Unlock

**Squad Unlock** extends the product beyond individual rewards.

When enough fans complete the required support conditions, a shared community unlock can open.

For the MVP, CornerStone includes one Japan-focused Squad Unlock connected to **ONE Samurai, Japan**.

This allows CornerStone to represent not only individual support, but also collective fan momentum.

---

### Athlete Console

**Athlete Console** is the management layer where athletes, teams, or organizers can define how support becomes access.

For the MVP, this is intentionally kept simple.

The console uses three access templates:

- Support to AMA
- Support to Merch Priority
- Support to Arena Access

The console is not the main product experience. The important idea is that athletes, teams, or organizers can become the side that activates the next layer of access.

CornerStone is not only a system where the platform creates rules and fans complete them.

It is a system where athletes, teams, and organizers can also open the next distance between themselves and their supporters.

---

## MVP Scope

CornerStone is intentionally limited for the MVP.

The goal is not to show a large product.  
The goal is to make one proof-to-access loop feel real.

### Included in the MVP

- Watch Check-in
- Venue Check-in
- Quiz Pass
- Corner AMA Key
- Priority Merch Key
- Arena Access Key
- ONE Samurai Japan Squad Unlock
- Athlete Console templates
- At least one event-limited or time-limited access concept
- Clickable proof-to-access demo flow

### Not included in the MVP

- Large numbers of key types
- Complex rankings
- Token economy
- Marketplace-heavy features
- Complex admin dashboards
- Many regional branches
- Overly complicated reward mechanics

CornerStone wins by making one loop feel clear:

```text
Support became proof.
Proof opened a key.
The key opened access.
```

---

## User Experience Flow

The intended MVP flow is:

1. A user enters the app.
2. The user connects a wallet or uses a demo-connected wallet state.
3. The user sees available Support Proof actions.
4. Watch Check-in, Venue Check-in, and Quiz Pass are recognized.
5. The proof score reaches the required condition.
6. Corner AMA Key is unlocked.
7. The user opens AMA access with the key.
8. Squad Unlock progress is also shown.
9. The console preview shows how support can be mapped to future access.

The user should understand the product without reading a long explanation.

The experience should communicate:

**Support opened the next distance.**

---

## Demo Flow

The recommended demo flow is short:

1. Open the main dashboard.
2. Show the connected wallet state.
3. Move to the Proof page.
4. Confirm that Watch Check-in, Venue Check-in, and Quiz Pass are recognized.
5. Show proof score: `3 / 3`.
6. Show Corner AMA Key unlocked.
7. Click `Open AMA Access`.
8. Show Access / CornerKey logic.
9. Show Squad progress and event-limited access.

The most important demo sentence is:

**Proof is not transferable. Key is a rule-based access right.**

---

## Why Sui

CornerStone does not use Sui only as a place to deploy assets.

Sui’s structure fits the product itself.

### 1. Support Proof and CornerKey can be modeled separately

Sui uses an object-centric model.

That makes it natural to treat **Support Proof** and **CornerKey** as separate objects.

Support Proof can represent recognized fan actions.  
CornerKey can represent the access right unlocked by those actions.

This separation is important because proof and access are not the same thing.

---

### 2. User entry can become lighter

CornerStone is designed for normal fans, not only crypto-native users.

The intended Sui direction includes:

- **zkLogin** for familiar login entry
- **Sponsored Transactions** for a gasless or low-friction user experience

This matters because fans should not need to understand wallets, gas, or token setup before experiencing the product.

---

### 3. Access rights can have rules

CornerKeys should not behave like generic transferable collectibles.

The intended rights layer can use Sui concepts such as:

- TransferPolicy
- Kiosk
- Time-limited access
- Official-route-only access
- Non-transferable or restricted access
- Royalty-aware or rule-aware assets

This allows CornerStone to treat a key as a structured access right rather than a simple badge.

---

## Why Not a Centralized Membership System?

A centralized membership system can store attendance, participation history, and reward flags.

But those records usually remain inside a closed database.

CornerStone separates:

- What support was recognized
- What access was unlocked
- Whether the access can be transferred
- When the access is valid
- Where the access can be used
- Which rule opened it

This separation makes the product more expressive than a simple internal flag system.

CornerStone is not only recording fan history.

It is creating a structured proof-to-access layer.

---

## Technical Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Sui / Web3

- Sui Move
- `@mysten/sui`
- `@mysten/dapp-kit`
- zkLogin direction
- Sponsored Transactions direction
- TransferPolicy / Kiosk concept

### Prototype / UI Layer

- Static HTML
- CSS
- JavaScript
- Premium dark sports-tech UI
- Dashboard / Proof / Access / Squad page flow
- Clickable demo state for proof recognition and access opening

### Development Direction

CornerStone currently uses both:

- a web application structure for the main implementation
- a static premium UI prototype for fast MVP presentation and visual validation

The static UI prototype is used to communicate the final user experience clearly before deeper implementation is completed.

---

## Repository Structure

```text
/apps
  /web
    Main web application

/contracts
  /cornerstone
    Sui Move modules

/co
  Static premium UI prototype
  Dashboard / Proof / Access / Squad flow

/docs
  /demo
    Demo script and flow notes

  /product
    Product notes and supplementary specifications

/assets
  Visual references, mockups, icons, and design materials

/scripts
  Build and smoke-test utilities
```

---

## Current MVP State

CornerStone currently defines:

- The product concept
- The core proof-to-access loop
- The MVP boundary
- The Support Proof types
- The CornerKey types
- The Squad Unlock concept
- The Sui architecture direction
- The premium sports-tech UI direction
- The first clickable demo flow

The next focus is:

- simplifying the demo
- polishing the Proof page
- keeping the dashboard as the visual authority
- connecting the UI flow clearly
- making the MVP understandable in under 30 seconds

---

## Main Screens in the MVP

The MVP is designed around four main screens.

### Dashboard

The dashboard is the visual authority of the product.

It shows:

- Current support actions
- Available CornerKeys
- Event-limited access
- Squad Unlock progress
- Console preview
- Wallet connected state

### Proof

The Proof page shows that fan support actions have been recognized.

It includes:

- Watch Check-in
- Venue Check-in
- Quiz Pass
- Proof score
- Corner AMA Key unlocked state
- Open AMA Access action

### Access / CornerKey

The Access page explains how recognized proof becomes rule-based access.

It includes:

- Corner AMA Key
- Priority Merch Key
- Arena Access Key
- Unlocked / locked states
- Access opened by CornerKeys

### Squad / Event

The Squad page shows that access can also be community-based and event-limited.

It includes:

- ONE Samurai Japan event access
- Community progress
- Squad Unlock
- Event-limited unlock framing

---

## Design Direction

CornerStone uses a premium dark sports-tech design language.

The UI direction is:

- Dark charcoal / black
- Bronze and gold accents
- Cinematic arena atmosphere
- Martial arts energy
- Premium event access system
- Condensed uppercase typography
- Minimal green indicators for confirmed states
- Rule-based access console feeling

The product should not feel like:

- a generic SaaS dashboard
- a colorful crypto app
- a simple points app
- a playful fan campaign page
- a white prototype interface

The intended feeling is closer to:

**a premium event access console for recognized supporters.**

---

## What CornerStone Is Not

CornerStone is not:

- a generic fan club
- a simple NFT drop
- a points campaign
- a voting app
- a basic check-in app
- a generic loyalty dashboard

CornerStone is a proof-to-access layer for fan engagement.

It turns support into a condition that can open real access.

---

## Final Message

CornerStone does not simply give something to fans.

It recognizes support as a condition for getting closer.

A fan watches.  
A fan attends.  
A fan participates.  
That support is recognized.  
A key opens.  
The next distance becomes reachable.

**Support should not disappear.  
It should open access.**

---

## Japanese README

<details>
<summary>日本語版はこちら</summary>

# CornerStone

### Proof becomes access.

ファンの応援は、反応で終わるべきではありません。

CornerStone は、応援を認識できるものに変え、その結果として本物のアクセスを開くためのプロダクトです。

観る、会場に行く、参加する、応援を続ける。

そうした行動は、これまで多くの場合、その場で消えていました。

CornerStone は、その一つひとつを **Support Proof** として扱い、条件に応じて **CornerKey** を解放します。

CornerKey は、ただのポイントでも、バッジでも、抽選券でもありません。

それは、選手・大会・限定体験に近づくための、使えるアクセス権です。

---

## ひと目でわかること

CornerStone がやることは、複雑ではありません。

- 応援行動を認識する
- 認識された応援を条件にする
- 条件を満たしたら鍵が開く
- 鍵によって、限定のアクセスが使える

この流れを支える中心体験が CornerKey です。

---

## 体験の核

CornerStone の体験は、次の4段階に集約されます。

```text
応援した。
認識された。
鍵が開いた。
近づけた。
```

この流れが自然に感じられること。

それが CornerStone の一番大事な要件です。

CornerStone が最も強くなるのは、応援があとから集計されるだけではなく、正しい瞬間にアクセスが開くときです。

---

## 全体の流れ

```text
応援行動
  ↓
Support Proof が認識される
  ↓
条件を満たす
  ↓
CornerKey が解放される
  ↓
限定体験・限定導線・限定アクセスが開く
```

さらに、個人だけで終わらないように、Squad Unlock を入れます。

これは、一定数のファンが条件を満たしたときに開く共同報酬です。

これにより、CornerStone は個人報酬のプロダクトで終わらず、共同体の熱量も扱えるようになります。

---

## Support Proof

Support Proof は、応援行動を表す記録です。

ここで重要なのは、「触った」「見た」ではなく、意味のある行動が起きたことを扱う点です。

MVP では、次の 3 種類を採用します。

- Watch Check-in
- Venue Check-in
- Quiz Pass

Support Proof は主役ではありません。

主役は、その結果として解放される CornerKey です。

ただし CornerKey は、Support Proof がなければ成立しません。

---

## CornerKey

CornerKey は、Support Proof の条件達成によって解放されるアクセス権です。

ユーザーが「応援したら何が変わったか」を実感する瞬間は、ここにあります。

MVP では、次の 3 種類を採用します。

- Corner AMA Key
- Priority Merch Key
- Arena Access Key

CornerKey は、持っているだけで終わるものではなく、その場で使えるものです。

---

## Squad Unlock

Squad Unlock は、一定数のファンが条件を満たしたときに開く共同報酬です。

MVP では、ONE SAMURAI 向けの日本限定 unlock を 1 本だけ扱います。

---

## Athlete Console

Athlete Console は、選手・陣営・運営が、

「どの応援を、どのアクセスへ変えるか」

を定義するための管理レイヤーです。

MVP では複雑化を避けるため、次のテンプレのみを扱います。

- Support to AMA
- Support to Merch Priority
- Support to Arena Access

重要なのは、選手・陣営・大会運営も、次の access を有効化できる主体であることです。

---

## なぜ Sui なのか

CornerStone は、Sui を“載せる場所”として使っているのではありません。

Sui の構造そのものが、このプロダクトに必要です。

### 1. 応援の証明とアクセス権を分けて扱える

Sui は object-centric model を採用しており、オンチェーン状態の基本単位が object です。

そのため、Support Proof と CornerKey を、別々の存在として自然に扱えます。

### 2. 一般ユーザー向けの導線を軽くできる

zkLogin により、一般ユーザーは馴染みのあるログイン導線から参加できます。

Sponsored Transactions により、最初から SUI を持っていなくても操作できます。

### 3. アクセス権にルールを持たせられる

TransferPolicy と Kiosk により、CornerKey や関連資産に対して、譲渡不可、期限付き、公式ルート限定などのルールを持たせる方向性が取れます。

---

## MVP の境界

CornerStone は、MVP で全部見せません。

勝つために削ります。

### MVP に含めるもの

- Watch Check-in
- Venue Check-in
- Quiz Pass
- Corner AMA Key
- Priority Merch Key
- Arena Access Key
- 日本限定 Squad Unlock 1 本
- Athlete Console テンプレ 3 種
- 最低 1 本の時間限定またはイベント限定 unlock

### MVP に含めないもの

- 大量の鍵の種類
- 複雑なランキング
- トークン経済
- 過剰なマーケットプレイス機能
- 難しい管理 UI
- 多数の地域分岐
- 説明が必要すぎる補助機能

CornerStone は、機能量で勝つのではなく、ひとつのループが本当に“開いた”と感じられるかで勝ちます。

---

## デモで見せるもの

CornerStone のデモは、全部を説明する場ではありません。

1 つの感情を起こす場です。

その感情は、

**「応援したら、今この場で近づけた」**

です。

推奨デモフロー:

1. ログイン
2. 推し選手または対象イベントを選ぶ
3. Watch Check-in
4. Quiz Pass
5. CornerKey が解放される
6. Event-limited な AMA または Arena Access が開く
7. 日本限定 Squad Unlock の進行を表示する
8. 選手・陣営・大会運営が次の access を有効化できることを見せる

デモ中に言うべき一文:

**Proof は譲渡できない。Key はルールを持ったアクセス権だ。**

---

## 最後に

CornerStone は、ファンに何かを“配る”プロダクトではありません。

ファンの応援を、近づく条件として認識し直すプロダクトです。

そして CornerKey は、その変化をユーザーが実感する瞬間を作るための鍵です。

**応援は、消える反応ではなく、開く力になる。**

</details>
