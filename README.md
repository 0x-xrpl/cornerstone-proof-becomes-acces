# CornerStone
Proof becomes access

ファンの応援は、反応で終わるべきではありません。  
CornerStone は、応援を認識できるものに変え、その結果として本物のアクセスを開くためのプロダクトです。

観る、会場に行く、参加する、応援を続ける。  
そうした行動は、これまで多くの場合、その場で消えていました。  
CornerStone は、その一つひとつを Support Proof として扱い、条件に応じて CornerKey を解放します。

CornerKey は、ただのポイントでも、バッジでも、抽選券でもありません。  
それは、選手・大会・限定体験に近づくための、使えるアクセス権です。

CornerStone は、ファンの応援を、あとで数える履歴ではなく、正しい瞬間に開くアクセスへ変える。  
このプロダクトが答えようとしているのは、ONE Championship が日本のファンとどう新しくつながるか。  
そして、選手とファンの距離をどう本当に縮めるか。という問いです。

## ひと目でわかること
CornerStone がやることは、複雑ではありません。

- 応援行動を認識する
- 認識された応援を条件にする
- 条件を満たしたら鍵が開く
- 鍵によって、限定のアクセスが使える

この流れを支える中心体験が CornerKey です。

## このプロダクトで起きること
多くのファン施策は、参加を促すことはできても、関係そのものは変えません。  
CornerStone はそこを変えます。

ファンは、ただ反応するのではなく、応援した事実が認識される。  
その認識が、ただの履歴で終わるのではなく、アクセスを開く条件になる。  
そしてアクセスは、曖昧な“お得感”ではなく、実際に使える形で提示されます。

CornerKey で開くものの例:

- 限定 AMA への参加権
- 優先的な物販アクセス
- 会場限定ドロップ
- キャンペーン限定の入場・参加導線
- 一定条件達成者だけが使えるアクセス
- 試合当日または特定時間だけ有効な限定アクセス

ここで重要なのは、CornerKey が「なにかをもらった証」ではなく、なにかを開くための鍵だということです。

## 体験の核
CornerStone の体験は、次の4段階に集約されます。

応援した。  
認識された。  
鍵が開いた。  
近づけた。

この流れが自然に感じられること。それが CornerStone の一番大事な要件です。

そして CornerStone が最も強くなるのは、応援があとから集計されるだけではなく、正しい瞬間にアクセスが開くときです。

つまりこのプロダクトは、単に「応援を数える」ためのものではなく、“今この場・この試合・このタイミング”だからこそ近づける瞬間を作るためのものです。

## 全体の流れ
応援行動  
↓  
Support Proof が認識される  
↓  
条件を満たす  
↓  
CornerKey が解放される  
↓  
限定体験・限定導線・限定アクセスが開く

さらに、個人だけで終わらないように、Squad Unlock を入れます。これは、一定数のファンが条件を満たしたときに開く共同報酬です。

## コア概念
### Support Proof
Support Proof は、応援行動を表す記録です。MVP では次の 3 種類を採用します。

- Watch Check-in
- Venue Check-in
- Quiz Pass

Support Proof は主役ではありません。主役は、その結果として解放される CornerKey です。

### CornerKey
CornerKey は、Support Proof の条件達成によって解放されるアクセス権です。MVP では次の 3 種類を採用します。

- Corner AMA Key
- Priority Merch Key
- Arena Access Key

重要なのは、CornerKey が持っているだけで終わるものではなく、その場で使えることです。

### Squad Unlock
Squad Unlock は、一定数のファンが条件を満たしたときに開く共同報酬です。MVP では、ONE SAMURAI 向けの日本限定 unlock を 1 本だけ扱います。

### Athlete Console
Athlete Console は、選手・陣営・運営が、「どの応援を、どのアクセスへ変えるか」を定義するための管理レイヤーです。MVP ではテンプレのみを扱います。

## なぜ Sui なのか
- Support Proof と CornerKey を別々の object として自然に扱える
- zkLogin により一般ユーザー向け導線を軽くできる
- Sponsored Transactions により最初から SUI を持っていなくても参加できる
- TransferPolicy と Kiosk により、CornerKey をルール付きアクセス権として扱える

## MVP の境界
### 含めるもの
- Watch Check-in
- Venue Check-in
- Quiz Pass
- Corner AMA Key
- Priority Merch Key
- Arena Access Key
- 日本限定 Squad Unlock 1 本
- Athlete Console テンプレ 3 種
- 最低 1 本の時間限定またはイベント限定 unlock

### 含めないもの
- 大量の鍵の種類
- 複雑なランキング
- トークン経済
- 過剰なマーケットプレイス機能
- 難しい管理 UI
- 多数の地域分岐
- 説明が必要すぎる補助機能

## 体験の流れ
1. ユーザーがログインする
2. 推し選手または対象イベントを選ぶ
3. Watch Check-in や Quiz Pass を行う
4. Support Proof が認識される
5. 条件を満たすと CornerKey が解放される
6. その鍵で、限定 AMA や会場アクセスが開く
7. 同時に、Squad Unlock の進行も見える
8. 必要に応じて、選手・陣営・運営が次の access を有効化する

## 初画面で見せるもの
- 推し選手
- 今獲得できる Support Proof
- 今開ける CornerKey
- みんなで開く Squad Unlock

## デモで見せるもの
推奨デモフロー:

1. ログイン
2. 推し選手を選ぶ
3. Watch Check-in
4. Quiz Pass
5. CornerKey が解放される
6. Event-limited な AMA または Arena Access が開く
7. 日本限定 Squad Unlock の進行を表示する
8. 選手・陣営・大会運営が次の access を有効化できることを見せる

デモ中に言うべき一文:  
Proof は譲渡できない。Key はルールを持ったアクセス権だ。

## 現在の状態
CornerStone は現在、MVP 設計段階にあります。ここから先の勝負は、実装の簡潔さ、UI の美しさ、デモの精度です。

## Quick Start
このリポジトリの目的は、CornerStone の MVP を構築し、Support Proof → CornerKey → Access のループを、短く強く成立させることです。

最初に確認すること:

- proof は 3 種類だけ
- key も 3 種類だけ
- Squad Unlock は 1 本だけ
- Athlete Console はテンプレだけ
- 30 秒でデモできることを最優先にする
- event-limited unlock を最低 1 本入れる

次にやること:

1. コア画面を 1 画面に落とす
2. Watch Check-in → Quiz Pass → Key 解放を実装する
3. AMA または Arena Access をダミーでもよいので開けるようにする
4. 日本限定 Squad Unlock の進行だけでも見せる
5. 選手側または運営側の access 有効化を 1 つ入れる
6. デモを 30 秒に収める

## リポジトリ構成の想定
```text
/apps
  /web
/contracts
  /cornerstone
/docs
  /demo
  /product
/assets
  /mockups
```

## 技術スタックの想定
- Frontend: Web application
- Onchain logic: Sui Move
- Login: zkLogin
- Gas abstraction: Sponsored Transactions
- Rights layer: TransferPolicy + Kiosk

## 最後に
CornerStone は、ファンに何かを“配る”プロダクトではありません。ファンの応援を、近づく条件として認識し直すプロダクトです。

応援は、消える反応ではなく、開く力になる。
