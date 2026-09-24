# 頑張らないTypeScript導入ガイドライン

## 目次

- [1. このガイドラインの目的と対象](#1-このガイドラインの目的と対象)
- [2. 基本方針](#2-基本方針)
- [3. 最初に覚えるTypeScript](#3-最初に覚えるtypescript)
  - [3.1 JavaScriptに型の確認が加わる](#31-javascriptに型の確認が加わる)
  - [3.2 最初に使う型](#32-最初に使う型)
  - [3.3 分岐で型を絞る](#33-分岐で型を絞る)
  - [3.4 最初は覚えなくてよいもの](#34-最初は覚えなくてよいもの)
- [4. プロジェクトでの書き方の基本ルール](#4-プロジェクトでの書き方の基本ルール)
  - [4.1 どこに型を書くか](#41-どこに型を書くか)
  - [4.2 型は必要な範囲から定義する](#42-型は必要な範囲から定義する)
  - [4.3 外部データは型注釈だけでは保証できない](#43-外部データは型注釈だけでは保証できない)
  - [4.4 共通部品では境界を先に書く](#44-共通部品では境界を先に書く)
- [5. 困ったときの逃げ道と、その使い方](#5-困ったときの逃げ道とその使い方)
  - [5.1 型エラーを見たときの順番](#51-型エラーを見たときの順番)
  - [5.2 `unknown`、`any`、型アサーション](#52-unknownany型アサーション)
  - [5.3 相談する目安](#53-相談する目安)
- [6. TypeScriptの導入・移行手順](#6-typescriptの導入移行手順)
  - [6.1 新規プロジェクト](#61-新規プロジェクト)
  - [6.2 既存JavaScriptからの移行](#62-既存javascriptからの移行)
  - [6.3 段階的に厳しくする目安](#63-段階的に厳しくする目安)
  - [6.4 VS Codeの推奨拡張機能と最初の設定](#64-vs-codeの推奨拡張機能と最初の設定)
- [7. チームで決める設定とレビュー方針](#7-チームで決める設定とレビュー方針)
  - [7.1 最初に合意する項目](#71-最初に合意する項目)
  - [7.2 レビューで確認する順番](#72-レビューで確認する順番)
  - [7.3 ルールを変える条件](#73-ルールを変える条件)
- [8. よくある作業のサンプル](#8-よくある作業のサンプル)
  - [8.1 関数を書く](#81-関数を書く)
  - [8.2 APIの結果を画面で使う](#82-apiの結果を画面で使う)
  - [8.3 値がない状態を扱う](#83-値がない状態を扱う)
  - [8.4 型エラーから修正する](#84-型エラーから修正する)
- [9. よくある質問](#9-よくある質問)
  - [Q. 型はすべての変数に書く必要がありますか？](#q-型はすべての変数に書く必要がありますか)
  - [Q. `any` は使ってはいけませんか？](#q-any-は使ってはいけませんか)
  - [Q. `unknown` と `any` の違いは何ですか？](#q-unknown-と-any-の違いは何ですか)
  - [Q. 型アサーションでエラーが消えたら、それで完了ですか？](#q-型アサーションでエラーが消えたらそれで完了ですか)
  - [Q. 型エラーが解決できないときは？](#q-型エラーが解決できないときは)
  - [Q. 型定義がないライブラリはどう扱いますか？](#q-型定義がないライブラリはどう扱いますか)
  - [Q. 既存のJavaScriptをすべて一度に書き換えますか？](#q-既存のjavascriptをすべて一度に書き換えますか)
  - [Q. 型チェックが通ればテストは不要ですか？](#q-型チェックが通ればテストは不要ですか)
  - [Q. `strict` は最初から無効にするべきですか？](#q-strict-は最初から無効にするべきですか)
- [10. 型の種類・定義方法と使い分け](#10-型の種類定義方法と使い分け)
  - [10.1 「型」と「型を定義する構文」を区別する](#101-型と型を定義する構文を区別する)
  - [10.2 基本型：文字列・数値・真偽値など](#102-基本型文字列数値真偽値など)
  - [10.3 値がない状態：`null`・`undefined`・省略可能なプロパティ](#103-値がない状態nullundefined省略可能なプロパティ)
  - [10.4 オブジェクトの形：`type` と `interface`](#104-オブジェクトの形type-と-interface)
  - [10.5 変更を制限する：`readonly` と広すぎるオブジェクト型の注意点](#105-変更を制限するreadonly-と広すぎるオブジェクト型の注意点)
  - [10.6 一覧と位置のある組：配列・タプル](#106-一覧と位置のある組配列タプル)
  - [10.7 候補を限定する：リテラル型・ユニオン型](#107-候補を限定するリテラル型ユニオン型)
  - [10.8 条件を組み合わせる：インターセクション型](#108-条件を組み合わせるインターセクション型)
  - [10.9 関数の型：引数・戻り値・`void`・`never`](#109-関数の型引数戻り値voidnever)
  - [10.10 型が未確認の値：`unknown` と `any`](#1010-型が未確認の値unknown-と-any)
  - [10.11 型の関係を保って再利用する：ジェネリクス](#1011-型の関係を保って再利用するジェネリクス)
  - [10.12 既存のオブジェクト型：`Promise`・`Date`・`Map`・`Set` など](#1012-既存のオブジェクト型promisedatemapset-など)
  - [10.13 既存の定義から型を取り出す：`keyof`・`typeof`・インデックスアクセス型](#1013-既存の定義から型を取り出すkeyoftypeofインデックスアクセス型)
  - [10.14 よく使う型の加工：組み込みユーティリティ型](#1014-よく使う型の加工組み込みユーティリティ型)
  - [10.15 キーごとに型を作る：マップ型とインデックスシグネチャ](#1015-キーごとに型を作るマップ型とインデックスシグネチャ)
  - [10.16 型に応じて切り替える：条件付き型・`infer`・再帰型](#1016-型に応じて切り替える条件付き型infer再帰型)
  - [10.17 文字列の組み合わせを表す：テンプレートリテラル型](#1017-文字列の組み合わせを表すテンプレートリテラル型)
  - [10.18 定数から型を作る：`as const`・`satisfies` と型アサーション](#1018-定数から型を作るas-constsatisfies-と型アサーション)
  - [10.19 名前付きの定数群：`enum`](#1019-名前付きの定数群enum)
  - [10.20 クラス・コンストラクター・呼び出し形式の型](#1020-クラスコンストラクター呼び出し形式の型)
  - [10.21 検証結果を型に伝える：型述語・アサーション関数](#1021-検証結果を型に伝える型述語アサーション関数)
  - [10.22 同じ基本型を用途で区別する：ブランド型と `unique symbol`](#1022-同じ基本型を用途で区別するブランド型と-unique-symbol)
  - [10.23 型をファイル間で共有する・既存ライブラリを宣言する](#1023-型をファイル間で共有する既存ライブラリを宣言する)
  - [10.24 迷ったときの選び方](#1024-迷ったときの選び方)
- [11. 付録](#11-付録)
  - [11.1 よくあるエラーと最初の確認先](#111-よくあるエラーと最初の確認先)
  - [11.2 用語集](#112-用語集)

> 対象：JavaScriptの基本を知っており、これからTypeScriptを使う開発者と、そのメンバーを受け入れるプロジェクトチーム。
> 特定のフレームワークに依存しないTypeScriptの例を使い、一般的なWebアプリケーションの開発で使える基本方針を示す。

## 1. このガイドラインの目的と対象

このガイドラインの目的は、初学者が型の書き方に悩み続けず、
TypeScriptの助けを受けながら実務の機能開発を進められるようにすることです。
最初から高度な型を使いこなす必要はありません。

**最初の到達点**は、通常の画面・機能を実装し、エディタの補完と型エラーを利用して、
引数の間違い、存在しないプロパティ、`null` や `undefined` の見落としに自分で気づけることです。

チームは、型チェックを通すためだけの不自然なコードを求めず、型エラーが示す実際の不具合を見分ける支援をします。
この文書の「推奨」は初期方針です。
既存のプロジェクト規約と異なる場合は、チームの決定を優先し、その理由を共有してください。

## 2. 基本方針

1. **推論できる型は書かない。**
   `const count = 0` のように明らかな型を繰り返し書かず、型がないと利用者が困る境界に労力を使います。
2. **外から入る値と、外へ公開する契約を優先する。**
   関数の引数、APIの応答、共通部品の入出力を先に整えます。
3. **型エラーは原因を確認する。**
   エラーが実際の入力漏れや分岐漏れを示すことがあります。
   分からなければ早めに相談します。
4. **難所には期限付きの逃げ道を認める。**
   `unknown`、局所的な `any`、型アサーション、エラー抑制は必要な場合に使えます。
   理由と見直し条件を残します。
5. **設定はチームの現状から始めて育てる。**
   厳しい設定を目的にしません。
   導入時に守れる約束を決め、運用しながら改善します。
6. **動作確認とテストを併用する。**
   型が正しくても、APIの実データや画面の振る舞いが正しいとは限りません。

## 3. 最初に覚えるTypeScript

### 3.1 JavaScriptに型の確認が加わる

TypeScriptの型注釈は主に開発時のチェックに使われ、実行時の入力検証にはなりません。
基本的な式、関数、条件分岐ではJavaScriptの知識をそのまま使えます。

```ts
const price = 1000; // number と推論される
const label = '商品'; // string と推論される

function priceWithTax(price: number, rate: number): number {
  return price * (1 + rate);
}
```

関数の**引数**は呼び出す側が渡す値の約束として明示します。
戻り値は簡単な関数なら推論に任せても構いませんが、
公開する関数や戻り値が複雑な関数は明示すると変更に気づきやすくなります。

### 3.2 最初に使う型

| 書き方 | 用途 | 例 |
| --- | --- | --- |
| `string` / `number` / `boolean` | 基本的な値 | `name: string` |
| `User[]` | 同じ形の値の配列 | `users: User[]` |
| `type` | オブジェクトや値の約束 | `type User = { id: number; name: string }` |
| `A \| B` | どちらかの値 | `id: string \| number` |
| `T \| null` | 値がない状態もあり得る | `selected: User \| null` |
| `unknown` | 受け取るまで形が分からない値 | `value: unknown` |

```ts
type User = {
  id: number;
  name: string;
  nickname?: string; // 省略されることがある
};

function displayName(user: User): string {
  return user.nickname ?? user.name;
}
```

`nickname?: string` は、読むときに `undefined` の可能性があることを意味します。
`??` は左辺が `null` または `undefined` のときだけ右辺を使います。

### 3.3 分岐で型を絞る

```ts
function printName(value: string | null): void {
  if (value === null) return;
  console.log(value.toUpperCase()); // ここでは string
}
```

値の有無を確認してから使う形を先に覚えます。
`value!` のように「必ず値がある」と言い切る記法は、確認を省いてよい根拠がある場合に限ります。

### 3.4 最初は覚えなくてよいもの

複雑な条件付き型、型レベルの計算、ライブラリの型定義ファイルの自作は、通常の機能実装を始める前提ではありません。
必要になった場面でチームと一緒に扱います。
型の種類や使い分けを詳しく調べたいときは、第10章を参照してください。

## 4. プロジェクトでの書き方の基本ルール

### 4.1 どこに型を書くか

| 場面 | 初期ルール |
| --- | --- |
| 値を代入しているローカル変数 | 原則、推論に任せる |
| 関数の引数 | 原則、型を付ける |
| 関数の戻り値 | 共通関数・公開API・複雑な処理では明示を検討する |
| 空配列、後から値が入る変数 | 意図する型を明示する |
| 共通部品に渡すデータ・コールバック関数 | 呼び出す側との契約として型を付ける |
| APIの応答 | 通信箇所で形を確認し、利用する範囲の型を定める |

```ts
type Task = { id: number; title: string };

const tasks: Task[] = []; // 空配列だけでは要素の意図が伝わらない
let selectedTask: Task | null = null; // 後から値が入る状態を表す
```

### 4.2 型は必要な範囲から定義する

画面で `id` と `name` しか使わないなら、最初から巨大な共通型を作る必要はありません。
ただし、同じAPIのデータを複数箇所で使う場合は定義を共有し、画面ごとの矛盾を避けます。

```ts
type UserSummary = {
  id: number;
  name: string;
};
```

型名には用途が分かる名前を付けます。
`Data` や `Item` を無条件に増やすと、後から区別しにくくなります。

### 4.3 外部データは型注釈だけでは保証できない

API応答、ブラウザのストレージ、URLパラメータなどは、実行時に期待と異なる値が入り得ます。
`as User` と書いてもデータの検証は行われません。
重要な値は受信時に確認し、必要に応じて既存の検証手段やスキーマを利用します。

```ts
function isUserSummary(value: unknown): value is UserSummary {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === 'number' && typeof record.name === 'string';
}
```

この例は小さなデータ向けです。
大きなAPI応答について検証関数を手作業で量産する方針は取らず、重要度とプロジェクトの仕組みに合わせて決めます。

### 4.4 共通部品では境界を先に書く

```ts
type SelectableItem = {
  id: number;
  title: string;
};

function selectItem(
  item: SelectableItem,
  onSelect: (id: number) => void,
): void {
  onSelect(item.id);
}

selectItem({ id: 1, title: '資料を確認する' }, (id) => {
  console.log('選択したID:', id);
});
```

これは共通部品に渡すデータと、処理を知らせるコールバック関数の型を示す小さな例です。
コールバック関数は、呼び出す側から渡し、部品の内部で呼び出す関数です。
`(id: number) => void` は、数値のIDを受け取り、呼び出す側が戻り値を使わない関数を表します。
実際に渡すデータや通知する値は、その部品の仕様に合わせて決めます。
例のコールバック引数 `id` の型は、`onSelect` の型から推論されます。

## 5. 困ったときの逃げ道と、その使い方

### 5.1 型エラーを見たときの順番

1. エラーが指す行と、期待される型・実際の型を読む。
2. 値の入手元を確認する。
   `undefined`、`null`、文字列と数値の取り違えがないか見る。
3. 条件分岐や初期値で解決できないか試す。
4. 型定義が実データと違うなら、定義や受信処理を修正する。
5. 解決に時間がかかるなら、問題のコードとエラー文を添えて相談する。
6. 回避が必要なら、影響を狭くして理由を残す。

### 5.2 `unknown`、`any`、型アサーション

| 手段 | 使いどころ | 注意点 |
| --- | --- | --- |
| `unknown` | 外部から来て形が未確認の値 | 確認してから使う |
| `any` | 型定義のない古い依存コードなど、当面型を付けられない局所 | 以後の型チェックが弱くなるため、広げない |
| `as SomeType` | 実際の形を別の根拠で確認済みの値 | 実行時チェックの代わりにはならない |
| `@ts-expect-error` | 既知の型定義の不備など、該当行だけを一時的に通す | 理由を書く。不要になると検出できる |

```ts
// 外部からの値は確認してから使用する
function toUppercase(value: unknown): string | null {
  return typeof value === 'string' ? value.toUpperCase() : null;
}
```

```ts
// @ts-expect-error: 依存ライブラリの型定義がこの引数に未対応。更新時に再確認する。
legacyFunction({ supportedAtRuntime: true });
```

`any` を使う場合は、たとえば「このライブラリの型定義がない」「既存JavaScriptの移行中」のように理由を説明できる状態にします。
原則として関数の内部や変換箇所に閉じ込め、公開する関数の引数・戻り値や全体の共通型に広げません。
`// @ts-ignore` の常用や、問題を調べずに `as` を足す運用は避けます。

### 5.3 相談する目安

同じエラーを調べても原因が分からない、型の修正で多くのファイルに影響する、
外部データの安全性に関わる問題がある場合は、その日のうちに相談します。
相談時は「やりたいこと」「エラー全文」「試したこと」「実際に入る値」を共有すると判断しやすくなります。

## 6. TypeScriptの導入・移行手順

### 6.1 新規プロジェクト

1. 実行環境やビルド方法に合うTypeScript設定を用意し、
   使用するTypeScriptと関連ツールのバージョンを確認する。
2. チームで「型チェックを実行するコマンド」「失敗時にCIを止めるか」「例外の書き方」を決める。
3. 関数の引数、共通部品の入出力、APIとの境界から型を書き、ローカルな値は推論に任せる。
4. 小さな機能を一つ実装して、型エラーの量と対処にかかる時間を確認する。
5. 実情に合わないルールを記録し、チームで設定を調整する。

**設定例を丸ごと貼り付けて始めないでください。**
まず実行環境や使用するツールの公式手順を確認し、プロジェクトに合う構成を選びます。
雛形や既存の設定を利用する場合は、変更する項目と理由を記録します。
型チェックには、たとえばプロジェクトに導入したTypeScriptの `tsc --noEmit` を使えます。
`--noEmit` はJavaScriptなどのファイルを出力せずに型チェックするためのオプションです。
詳しくは[TypeScriptの公式説明](https://www.typescriptlang.org/tsconfig/noEmit.html)を参照してください。
使用するツールに専用の型チェック手順がある場合は、それに従います。
開発サーバーの起動やビルドで型チェックも実行されるかを確認し、必要なら別の手順として組み込みます。

### 6.2 既存JavaScriptからの移行

1. 現在の動作とテストを把握する。
   移行作業と機能変更をできるだけ分ける。
2. JavaScriptとTypeScriptを共存させられるよう、プロジェクトのビルド・型チェック設定を確認する。
3. 変更頻度が高く、依存関係が小さいファイルから少しずつ移す。
4. リネームや構文の修正を先に行い、型を細かく整える作業は後続の変更として分けてもよい。
5. 型の回避箇所と理由を記録し、共通部品やAPI境界から改善する。
6. 各単位で型チェック、既存テスト、必要な画面の動作確認を行う。

`allowJs` は `.js` と `.ts` を同じプロジェクトで扱うための候補です。
`checkJs` はJavaScriptに対しても型チェックを行うため、
既存コードのエラーが大量に出る場合は対象範囲を計画して有効にします。
ファイル名を変えただけで安全になるわけではないため、動作確認を省略しません。

### 6.3 段階的に厳しくする目安

| 段階 | 状態 | 次に進む目安 |
| --- | --- | --- |
| 導入期 | TypeScriptで機能を作り、エラーを把握できる | 開発を止める未解決エラーが管理できている |
| 定着期 | `null` の扱い、引数や境界の型が揃う | 回避箇所が局所化され、レビューで説明できる |
| 改善期 | 共通部品や外部との境界を重点的に厳しくする | チームが変更コストと効果を確認できている |

`strict` や `noImplicitAny` を緩めるかどうかは、
採用した設定の内容、既存コードの量、チームの習熟度を見て決めます。
新規開発でエラーが少ないなら、既定の厳しさを保ったまま局所的な回避を使う選択もあります。
設定を緩めるときは、どのエラーを見逃すかと見直し時期を決めます。
`strictNullChecks` を後から有効にする変更は広範囲に及びやすいため、開始時に優先して検討します。

### 6.4 VS Codeの推奨拡張機能と最初の設定

VS Codeには、TypeScriptの補完、型エラーの表示、定義への移動、名前の変更などの機能が標準で含まれています。
基本的なTypeScriptの編集のために、言語対応の拡張機能を追加する必要はありません。
まず標準機能を使い、プロジェクトが採用しているチェック・整形ツールに合わせて拡張機能を追加します。

| 拡張機能（拡張機能ID） | できること | 導入の目安 |
| --- | --- | --- |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)（`dbaeumer.vscode-eslint`） | プロジェクトのESLint設定に従い、コードの問題や規約違反をエディタ上に表示する。自動修正できる項目もある | ESLintを採用しているプロジェクトで推奨 |
| [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)（`esbenp.prettier-vscode`） | インデントや改行などの書式を揃える | Prettierを採用しているプロジェクトで推奨 |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)（`usernamehw.errorlens`） | TypeScriptやESLintなどが報告したエラー・警告を、該当行の近くに表示する | 任意。エラーに気づきやすくしたい場合に便利。表示が多すぎる場合は無効にして構わない |

拡張機能ビューで名前または拡張機能IDを検索してインストールできます。
**最初からすべてを入れる必要はありません。**
たとえば、ESLintとPrettierを採用しているプロジェクトなら、この2つから始めれば十分です。
Biomeなど別のツールを採用している場合は、そのツールの推奨拡張機能を使います。

ESLintやPrettierは、拡張機能を入れるだけでチーム共通の設定が整うわけではありません。
プロジェクト側のパッケージと設定も、チームの手順に従って用意します。
ESLintはコードの規則の確認、Prettierは整形、TypeScriptは型チェックを担います。
それぞれ役割が異なるため、拡張機能を入れた後も、6.1で決めた型チェックのコマンドを使います。
Error Lensは表示を補助するもので、独自の型チェックを追加するものではありません。

**最初に確認する設定**：

1. **プロジェクトのTypeScriptバージョンを使う。**
   VS Code内蔵のTypeScriptとプロジェクトのTypeScriptが異なると、エディタとコマンドで診断結果が食い違うことがあります。
   プロジェクトの依存パッケージをインストールして `.ts` ファイルを開き、コマンドパレットの
   `TypeScript: Select TypeScript Version` から `Use Workspace Version` を選びます。
   選択肢が出ない場合は、TypeScriptのインストール先と、VS Codeで開いているフォルダーを確認します。
2. **整形を担当するツールを揃える。**
   Prettierを使う場合は、TypeScript用の既定のフォーマッターにPrettierを選び、必要に応じて保存時の整形を有効にします。
   ESLintの自動修正も使う場合は、整形に関する規則がPrettierと競合しないよう、チームで設定を揃えます。
3. **チームの推奨を共有する。**
   推奨する拡張機能は `.vscode/extensions.json`、共通のエディタ設定は `.vscode/settings.json` で共有できます。
   推奨拡張機能の指定は、自動インストールや利用の強制ではありません。
   Error Lensのような表示の好みは、個人で選べるようにして構いません。

参考：[VS CodeのTypeScript対応](https://code.visualstudio.com/docs/languages/typescript)、
[TypeScriptのバージョンの選択](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions)。

## 7. チームで決める設定とレビュー方針

### 7.1 最初に合意する項目

| 項目 | 決めること |
| --- | --- |
| 型チェック | 実行コマンド、実行タイミング、CIでの扱い |
| `tsconfig` | 実行環境やビルド方法に合う設定と、変更する項目・理由 |
| ESLint | エラーにする規則と警告にとどめる規則 |
| 回避策 | `any`・`as`・抑制コメントに必要な説明 |
| APIの値 | 型の管理元と実行時検証の必要な箇所 |
| 移行範囲 | 変更したファイルだけか、周辺も含めるか |

この表はチームで埋めるためのチェックリストです。
具体的な設定値を全プロジェクトに一律で当てはめるものではありません。

### 7.2 レビューで確認する順番

1. 機能の動作と、外部入力・`null` の扱いが妥当か。
2. 関数や共通部品の入出力の契約が利用側に伝わるか。
3. 型エラーの回避理由と影響範囲が説明できるか。
4. 型注釈や型の抽象化が必要以上に複雑でないか。
5. 型チェック、テスト、画面確認の結果が共有されているか。

レビューでは、初学者にその場で高度な型の設計を要求する前に、分かりやすい書き方を一緒に検討します。
繰り返し発生するエラーは個人の注意力に頼らず、サンプルや共通関数、設定の改善につなげます。

### 7.3 ルールを変える条件

同じ事故が繰り返される、回避箇所が増え続ける、型チェックの実行時間やエラー量が開発を妨げるときに見直します。
変更は一度に大量に行わず、対象・期待する効果・既存コードへの影響を確認してから導入します。

## 8. よくある作業のサンプル

### 8.1 関数を書く

```ts
type Product = { price: number; discountRate?: number };

function discountedPrice(product: Product): number {
  const rate = product.discountRate ?? 0;
  return Math.round(product.price * (1 - rate));
}
```

引数の形と戻り値を明示し、任意項目には既定値を用意します。
割引率の範囲や丸め方は型だけでは保証されないため、業務仕様として別途確認します。

### 8.2 APIの結果を画面で使う

```ts
type UserSummary = { id: number; name: string };

async function loadUser(id: number): Promise<UserSummary> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const value: unknown = await response.json();
  if (!isUserSummary(value)) throw new Error('ユーザー情報の形式が不正です');
  return value;
}
```

ここでは第4章の `isUserSummary` を使用しています。
失敗時に画面で何を表示するかは、呼び出し元で決めます。
実際のプロジェクトでは、採用しているデータ取得手段に合わせて通信処理を置き換えてください。

### 8.3 値がない状態を扱う

```ts
type UserSummary = { id: number; name: string };
let selectedUser: UserSummary | null = null;

function showName(user: UserSummary | null): string {
  return user?.name ?? '未選択';
}

console.log(showName(selectedUser)); // 未選択

selectedUser = { id: 1, name: '田中' };
console.log(showName(selectedUser)); // 田中
```

`UserSummary | null` で、ユーザーが選択されている状態と未選択の状態を表します。
`?.` と `??` を使い、値がない場合の表示を決めます。
この例では結果をコンソールに出力していますが、戻り値は画面の表示などにも使えます。

### 8.4 型エラーから修正する

```ts
const ids = ['1', '2'];
function sumIds(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}
// sumIds(ids) が number[] を受け取る場合は型エラー
const numericIds = ids.map(Number);
sumIds(numericIds);
```

ただし、`Number('abc')` は `NaN` になります。
入力元が不確かなら変換後の値も検証します。
型エラーの解消と実データの確認はセットで考えます。

## 9. よくある質問

### Q. 型はすべての変数に書く必要がありますか？

ありません。
代入した値から分かる型は推論に任せます。
関数の引数、空配列、共通部品の入出力、APIとの境界など、型がないと意図が分からない箇所を優先します。

### Q. `any` は使ってはいけませんか？

使えます。
型定義のない依存コードや移行中の箇所で作業を進める手段です。
ただし、利用箇所を小さくし、理由と見直し条件を残します。
単にエラーを消すために広範囲へ付けるのは避けます。

### Q. `unknown` と `any` の違いは何ですか？

`unknown` は値を受け取れますが、使う前に型の確認が必要です。
`any` は確認せずに操作でき、間違いを見逃しやすくなります。
外部から来る未確認の値は、まず `unknown` を検討します。

### Q. 型アサーションでエラーが消えたら、それで完了ですか？

いいえ。
`as` は実行時の値を変えたり検証したりしません。
「なぜその型だと言えるか」を確認し、外部データなら必要に応じて実際の値を検証します。

### Q. 型エラーが解決できないときは？

期待される型と実際の型を見比べ、値の入手元を確認します。
原因が分からなければ、エラー文、関連コード、試したことを添えて早めに相談します。
暫定回避を使う場合はレビューで共有します。

### Q. 型定義がないライブラリはどう扱いますか？

まずライブラリ本体や既存の型パッケージに型がないか確認します。
ない場合は、使う箇所に必要な最小限の型を用意するか、局所的に型チェックを緩めます。
初学者だけで大きな宣言ファイルを作り込む必要はありません。

### Q. 既存のJavaScriptをすべて一度に書き換えますか？

いいえ。
新規・変更箇所から少しずつ移します。
移行範囲と動作確認の方法はチームで決め、無関係な機能変更と混ぜないようにします。

### Q. 型チェックが通ればテストは不要ですか？

必要です。
TypeScriptは入力の実際の内容や、画面の操作結果、業務仕様の正しさまでは保証しません。

### Q. `strict` は最初から無効にするべきですか？

一律には決めません。
新規プロジェクトなら採用した設定の内容を確認し、実際に困る項目だけ調整します。
既存コードの移行では一時的に緩める場合もありますが、見逃す問題と見直し時期を共有します。

## 10. 型の種類・定義方法と使い分け

型は、「ここにはどんな値を入れてよいか」を決める約束です。
たとえば「名前は文字列」「年齢は数値」「状態は下書きか公開済み」といった約束を、コードに書きます。
TypeScriptはその約束を使い、値の渡し間違いなどを実行前に見つけます。

この章は、型の書き方に迷ったときに引ける読み物です。
次の順番を目安に、必要なところから読んでください。

| 読むタイミング | 節 | 分かるようになること |
| --- | --- | --- |
| 最初に読む | 10.1〜10.7、10.9〜10.10 | 文字列、データのまとまり、一覧、選択肢、関数の型を書く |
| 同じ定義を何度も書くようになったら | 10.8、10.11〜10.14、10.18 | 既にある型や値を再利用する |
| 必要になったら読む | 10.15〜10.17、10.19〜10.23 | 複雑な型やライブラリの型定義を読み解く |
| 書き方に迷ったら | 10.24 | やりたいことから型を選ぶ |

応用の節は、最初は「こういう書き方もある」と分かれば十分です。

各コードブロックは独立した例です。同じ名前の型が登場しても、別の例として読んでください。
`null` と `undefined` の説明は、`strictNullChecks` が有効な状態を前提とします。
これは、「値がないかもしれない」ことも型チェックで確認する設定です。

この章で繰り返し使う言葉を、先に整理します。

| 言葉 | この章での意味 |
| --- | --- |
| プロパティ | オブジェクトの項目。`{ name: '田中' }` の `name` など |
| キー | 項目を指定する名前。`user['name']` の `'name'` など |
| 要素 | 配列に入っている1つひとつの値 |
| 引数・戻り値 | 関数に渡す値と、関数から受け取る結果 |
| 型推論 | 値や使い方から、TypeScriptが型を判断すること |
| 実行時 | プログラムが実際に動いているとき |
| `T`・`K`・`V` | 後で具体的な型を入れる仮の名前。型、キー、値の型によく使う |

### 10.1 「型」と「型を定義する構文」を区別する

`string` は値の種類を表す型です。
`type` と `interface` は、その型に名前を付けたり、必要な項目をまとめたりする書き方です。
`name: string` のように、変数や引数の後ろに `: 型` を書くことを「型注釈」と呼びます。

```ts
type UserName = string; // 型に名前を付ける

function greet(name: UserName): string { // 引数と戻り値に型を指定する
  return `こんにちは、${name}さん`;
}
```

この例は「`UserName` は文字列」「`greet` は名前を受け取り、文字列を返す」と読みます。
`type` で付けた型の別名を「型エイリアス」と呼びます。
`UserName` のように、何に使う型なのかが伝わる名前にします。
ただし、`type UserName = string` と書いても、通常の文字列とは別の値の種類にはなりません。
この関数には任意の文字列を渡せます。
型を書いても、数値が文字列に変わったり、入力内容が自動で確認されたりするわけではありません。
たとえば「空の名前は受け付けない」という確認は、別に処理を書く必要があります。

### 10.2 基本型：文字列・数値・真偽値など

「名前」「金額」「有効かどうか」のように、1つの値を表すときに使います。
型注釈の書き方を示すため、次の例では推論できる箇所にも型を書いています。
実務では、初期値から明らかな型は省略して構いません。

| 型 | 使う場面 | 例 |
| --- | --- | --- |
| `string` | 名前、説明文、文字列として扱うID | `const name: string = '田中';` |
| `number` | 金額、件数、割合などの数値計算 | `const price: number = 1200;` |
| `boolean` | 有効・無効、表示・非表示などの二択 | `const enabled: boolean = true;` |
| `bigint` | `number` で正確に表せる範囲を超える整数 | `const total: bigint = 9007199254740993n;` |
| `symbol` | 他のキーと取り違えない、専用の目印 | `const key: symbol = Symbol('cache');` |

最初によく使うのは `string`・`number`・`boolean` の3つです。
`boolean` に入る値は `true` と `false` です。
`bigint` と `symbol` は、用途が出てきてから覚えて構いません。

`number` は整数と小数を区別せず、`NaN` や無限大も含みます。
`NaN` は、`Number('abc')` のように、数値として扱えない結果を表す値です。
「0以上の整数」「0〜1の割合」などの条件は、必要に応じて実行時に検証します。
`bigint` は小数を扱えず、`number` とそのまま足し算することもできません。
利用する場合は、使うブラウザなどの環境と、JavaScriptへ変換する設定が対応しているか確認します。
通常の値の型には、大文字の `String`・`Number`・`Boolean` ではなく、小文字の型を使います。

参考：[基本的な型の公式説明](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)。

### 10.3 値がない状態：`null`・`undefined`・省略可能なプロパティ

「まだユーザーを選んでいない」「ニックネームは入力しなくてもよい」など、値がない場合を表します。
次の例では、`name` は必須、`nickname` は省略可能、`avatarUrl` は画像なしなら `null` とします。

```ts
type Profile = {
  name: string;
  nickname?: string;
  avatarUrl: string | null;
};

const profile: Profile = {
  name: '田中',
  avatarUrl: null,
};

function displayNickname(value: string | undefined): string {
  return value ?? 'ニックネームなし';
}
```

この例の `profile` では、`nickname` の項目を省略し、`avatarUrl` には `null` を入れています。
`??` は、左側が `null` または `undefined` のときに、右側の値を代わりに使う記号です。
表の `T` は、`string` などの具体的な型に読み替えてください。

| 書き方 | 表すこと | 使う場面 |
| --- | --- | --- |
| `value: T \| null` | プロパティは必要で、値に `null` を使える | 未選択などを明示する |
| `value: T \| undefined` | プロパティは必要で、値に `undefined` を使える | キーは必須だが、値は未確定 |
| `value?: T` | プロパティ自体を省略できる | 任意の入力項目や設定 |

`null` と `undefined` のどちらを使うかは、APIやプロジェクトの約束に合わせます。
`value?: T` を読むときは、値が `undefined` の可能性を考慮します。
**設定による違い（必要になったら確認）**：
`exactOptionalPropertyTypes` が有効な場合、`{}` と `{ value: undefined }` を区別します。
前者は項目そのものがなく、後者は項目があって、その値が `undefined` です。
省略も `undefined` の指定も認めたい場合は、`value?: T | undefined` と書きます。

参考：[省略可能なプロパティの設定](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html)。

### 10.4 オブジェクトの形：`type` と `interface`

ユーザー情報、商品、設定など、複数の項目をまとめるときに使います。
同じ形を複数の場所で使うなら、名前を付けて共有します。

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};

interface NamedItem {
  id: number;
  name: string;
}

interface StockItem extends NamedItem {
  stock: number;
}
```

| 書き方 | 得意なこと | 選ぶ目安 |
| --- | --- | --- |
| `type` | オブジェクト、ユニオン、タプルなどに名前を付ける | 型の種類を問わず同じ書き方に揃えたい |
| `interface` | オブジェクトの形を定め、`extends` で拡張する | オブジェクトの契約や拡張可能な公開APIを定めたい |

`Product` は「ID、名前、価格が必要」という項目の一覧です。
`StockItem extends NamedItem` は「`NamedItem` の項目に、在庫数 `stock` を追加する」と読みます。
そのため、`StockItem` には `id`・`name`・`stock` の3項目が必要です。

`type` と `interface` のどちらでも、多くのオブジェクト型を表現できます。
`interface` には、同じ名前の定義に項目を追加してまとめる仕組みがあります。
`type` では、同じ場所に同じ名前の型を重ねて定義することはできません。
通常のアプリケーションでは、チームの規約に合わせて選べば十分です。

TypeScriptは、基本的に「型の名前が同じか」よりも「必要な項目が揃い、それぞれの型が合うか」を確認します。
この「ある型の値を、別の型として使えるか」という関係を、型の互換性と呼びます。
ただし、`{ id: 1, name: '田中' }` のようにその場で書いたオブジェクトを渡す場合などは、
余分な項目がないかも確認されます。
型を書いただけで、実行時の余分なプロパティが削除されるわけではありません。

参考：[オブジェクト型](https://www.typescriptlang.org/docs/handbook/2/objects.html)、
[型の互換性](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)。

### 10.5 変更を制限する：`readonly` と広すぎるオブジェクト型の注意点

「名前は変更してよいが、IDは変更してほしくない」ときなどに `readonly` を使います。
`readonly` を付けた項目へ代入しようとすると、型エラーになります。

```ts
type Account = {
  readonly id: string;
  name: string;
};

const account: Account = { id: 'u-1', name: '田中' };
account.name = '佐藤'; // 変更できる
// account.id = 'u-2'; // 型エラー
```

`readonly` は、コードを書くときの書き換え間違いを見つけるための指定です。
実行中のデータを、どこからも変更できない状態に固定する機能ではありません。
別の変数から同じデータを参照している場合などには、変更されることもあります。
また、プロパティに `readonly` を付けても、その中のオブジェクトまで自動的に変更禁止にはなりません。

| 書き方 | 意味 | 選ぶ場面・注意点 |
| --- | --- | --- |
| `{ id: string }` | 必要なプロパティを持つ値 | 項目が分かる通常のデータに使う |
| `object` | オブジェクト、配列、関数など | 文字列や数値などを受け付けない共通処理で使う |
| `{}` | `null`・`undefined` 以外の値 | 数値や文字列も通るため、「空のオブジェクト」のつもりで使わない |
| `Object` | 広い範囲の値を受け入れる型 | データの形を表せないため、通常は具体的な型を選ぶ |
| `Record<string, unknown>` | 文字列のキーで値を読む辞書の形 | キーが可変で、各値の型を確認してから使う場合 |

この表の `object`・`{}`・`Object` は似ていますが、受け付ける値の範囲が違います。
通常は `{ id: string }` のように、必要な項目を具体的に書くほうが分かりやすくなります。
外部から届く値がオブジェクトかどうかも分からない段階では、`unknown` を使います。

### 10.6 一覧と位置のある組：配列・タプル

名前の一覧のように、同じ種類の値を並べるなら配列を使います。
座標のように「1番目が横の位置、2番目が縦の位置」と順番に意味がある場合は、タプルを使います。
タプルは、位置ごとに型を決められる配列です。

```ts
const names: string[] = ['田中', '佐藤'];
const scores: Array<number> = [80, 95];

type Point = [x: number, y: number];
const point: Point = [10, 20];

type Query = [text: string, limit?: number];
const query: Query = ['TypeScript'];

type Route = [start: string, ...stops: string[]];
const route: Route = ['東京', '名古屋', '大阪'];

function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
```

`T[]` と `Array<T>` は同じ意味です。
`[number, number]` は2要素の組で、任意の長さの `number[]` とは異なります。
例の `Point` は、`point[0]` が `x`、`point[1]` が `y` に対応します。
`x` と `y` は読む人への説明であり、`point.x` のように取り出せるわけではありません。
`limit?` はその位置を省略可能にし、`...stops` は後ろに複数の値を並べられることを表します。
項目が増えて位置を覚えにくくなったら、名前付きのオブジェクトを検討します。

`readonly T[]` と `ReadonlyArray<T>` は、配列への追加・削除・要素の再代入を制限します。
座標を変更させたくない場合は、`readonly [number, number]` とも書けます。
要素がオブジェクトの場合、その内部まで自動的に読み取り専用になるわけではありません。
`names[0]` のように番号で要素を取り出すことを、添字アクセスと呼びます。
存在しない番号を指定すると、結果は `undefined` です。
`noUncheckedIndexedAccess` を有効にすると、通常の配列を番号で読む際に、
「要素がないかもしれない」ことも型チェックで確認できます。

参考：[配列・タプル](https://www.typescriptlang.org/docs/handbook/2/objects.html)、
[`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)。

### 10.7 候補を限定する：リテラル型・ユニオン型

ステータス、表示モード、処理結果など、取り得る値が複数の候補に限られるときに使います。

```ts
type Status = 'draft' | 'published' | 'archived';
type PageSize = 10 | 20 | 50;
type Identifier = string | number;

function normalizeId(id: Identifier): string {
  return typeof id === 'number' ? String(id) : id.trim();
}
```

`'draft'` や `10` のように特定の値そのものを型にしたものが、リテラル型です。
`A | B` は「AまたはB」を表すユニオン型です。
文字列や数値だけでなく、`true`・`false` やオブジェクト型も候補にできます。
`Status` は「下書き・公開済み・保管済みのどれか」、`PageSize` は「10・20・50のどれか」と読みます。
`Identifier` は文字列も数値も受け付けます。
`normalizeId` では、数値なら文字列に変換し、文字列なら前後の空白を取り除いています。
このように値の種類を確認して、その分岐で使える型を限定することを「型を絞る」と呼びます。

結果ごとに必要なデータが違う場合は、判別用のプロパティを持つユニオン型が便利です。

```ts
type LoadResult =
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function summarize(result: LoadResult): string {
  if (result.status === 'success') {
    return `${result.data.length}件取得しました`;
  }
  return result.message;
}
```

`status` は、データの種類を見分けるための目印です。
`status` が `'success'` なら `data`、`'error'` なら `message` があると分かります。
これなら、成功時の `data` と失敗時の `message` をそれぞれ必須にできます。
すべての項目を `?` で省略可能にするより、状態とデータの対応が明確になります。

参考：[型の絞り込みと判別可能なユニオン](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)。

### 10.8 条件を組み合わせる：インターセクション型

「ユーザー情報に、作成日時と更新日時も持たせたい」ときなどに使います。
`&` でつないだ型の条件を、すべて満たす必要があります。

```ts
type User = { id: number; name: string };
type Timestamps = { createdAt: Date; updatedAt: Date };
type StoredUser = User & Timestamps;

const user: StoredUser = {
  id: 1,
  name: '田中',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

`StoredUser` には、`User` の2項目と `Timestamps` の2項目、合わせて4項目が必要です。
`A & B` は「AとBの両方の条件を満たす」と読みます。
型を書いただけでは日時が追加されないため、例のように実際の値も用意します。
同名のプロパティがあっても、後に書いた型で上書きされるわけではありません。
たとえば `id` を「文字列であり、同時に数値でもある」と指定すると、条件を満たす値がありません。
このような「当てはまる値がない」型を `never` と呼びます。
項目の型を変更したい場合は、10.14の `Omit` で元の項目を除いてから追加します。

### 10.9 関数の型：引数・戻り値・`void`・`never`

「数値を受け取って、表示用の文字列を返す」のように、関数の入力と結果を決めるときに使います。
別の関数へ処理を渡す場合にも、その処理がどんな引数を受け取るかを指定できます。

```ts
type Formatter = (value: number) => string;
const formatPrice: Formatter = (value) => `${value}円`;

type Logger = (message: string, category?: string) => void;
const log: Logger = (message, category = 'info') => {
  console.log(category, message);
};

type Sum = (...values: number[]) => number;
const sum: Sum = (...values) => values.reduce((a, b) => a + b, 0);

function fail(message: string): never {
  throw new Error(message);
}
```

`(value: number) => string` は、「数値を1つ受け取り、文字列を返す関数」と読みます。
`Formatter` は関数の型を決めるだけで、実際の処理は `formatPrice` に書いています。
`category?` は省略できる引数、`...values` は複数の数値をまとめて受け取る引数です。

| 戻り値の型 | 意味 | 使う場面 |
| --- | --- | --- |
| `T` | 型 `T` の値を返す | 計算や変換の結果を利用する |
| `void` | 呼び出す側が戻り値を利用しない | ログ出力や通知のコールバック |
| `undefined` | `undefined` を返す | 戻り値そのものを `undefined` に限定する契約 |
| `never` | 結果を返して処理を終えることがない | 必ず例外を投げる関数、終了しない処理 |

ログを出して処理を終える関数には、`void` を使えます。
必ず例外を投げて処理を中断する関数には、`never` を使います。

**細かい違い（必要になったら確認）**：
`const callback: () => void = () => 123` のような代入も可能ですが、
`callback()` の結果を数値として使うことはできません。
一方、関数の宣言に直接 `: void` と書いた場合、`return 123` は型エラーになります。

`never` は、分岐ですべての候補を処理したことの確認にも使えます。

```ts
type Mode = 'view' | 'edit';

function unreachable(value: never): never {
  throw new Error(`想定外の値: ${value}`);
}

function modeLabel(mode: Mode): string {
  switch (mode) {
    case 'view': return '閲覧';
    case 'edit': return '編集';
    default: return unreachable(mode);
  }
}
```

`never` を使ったこの確認は応用例です。
`'view'` と `'edit'` を処理した後には、残る候補がないはずなので、`mode` は `never` になります。
後から `Mode` に `'preview'` などを追加し、その分岐を忘れると、候補が残ります。
その結果、`unreachable(mode)` が型エラーになり、対応漏れに気づけます。
ただし、外部から届く値の検証は別途必要です。

参考：[関数の型と戻り値](https://www.typescriptlang.org/docs/handbook/2/functions.html)。

### 10.10 型が未確認の値：`unknown` と `any`

外部から届くデータなど、まだ種類を確認していない値を受け取るときに登場します。
`unknown` は「中身を確認してから使う」、`any` は「型による確認を頼らずに使える」と考えると違いが分かります。

| 型 | 使う場面 | 使う前に必要なこと |
| --- | --- | --- |
| `unknown` | API応答、例外、解析直後のJSONなど | 分岐や検証関数で型を確認する |
| `any` | 型定義のないコードとの接続など、一時的な回避 | 理由と見直し条件を残し、利用範囲を限定する |

```ts
function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return '不明なエラーです';
}
```

例では、エラー用のオブジェクトなら `.message` を読み、文字列ならそのまま返しています。
それ以外の値も来る可能性があるため、最後に代わりのメッセージを返します。
`unknown` のままでは自由にプロパティを読めないので、こうした確認が必要です。
「どんな値でも受け取りたい」という理由だけなら、まず `unknown` を検討します。
`any` を使う場合の運用は第5章を参照してください。

### 10.11 型の関係を保って再利用する：ジェネリクス

配列の要素、APIの結果、共通部品など、データの種類だけを差し替えて使うときに用います。
たとえば「商品の一覧」と「ユーザーの一覧」は、どちらも「項目の配列と総件数」という形にできます。
違うのは、配列に入るデータの種類です。
`T` は、その違う部分に後から入れる型の仮の名前です。これを「型引数」と呼びます。

```ts
type Page<T> = {
  items: T[];
  total: number;
};

type Product = { id: number; name: string };
const page: Page<Product> = {
  items: [{ id: 1, name: 'ノート' }],
  total: 1,
};

function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}

const name = first(['田中', '佐藤']); // string | undefined
```

`Page<Product>` は、`Page<T>` の `T` に `Product` を当てはめた型です。
その結果、`items` は `Product[]` になります。
`Page<string>` とすれば、同じ形のまま `items` を `string[]` にできます。

`first` は、文字列の配列を渡せば文字列、数値の配列を渡せば数値を返します。
この「渡した値の型に応じて、結果の型も決まる」関係を保てるのが便利な点です。
空配列では先頭の要素がないため、戻り値には `undefined` も含めています。

`extends` で使える型に条件を付け、`=` で型引数の既定値を指定できます。

```ts
type Entity<TId = string> = { id: TId };

function getId<T extends { id: string }>(value: T): string {
  return value.id;
}

const id = getId({ id: 'u-1', name: '田中' });
type NumericEntity = Entity<number>;
```

`T extends { id: string }` は「`T` に入れてよいのは、文字列の `id` を持つ型」と読みます。
`name` など、ほかの項目があっても構いません。
`Entity<TId = string>` の `= string` は、「型を指定しなければ `string` を使う」という意味です。
型引数は、入出力などの型の関係を表す必要があるときに導入します。
具体的な型だけで十分な処理を、最初からすべてジェネリクスにする必要はありません。

参考：[ジェネリクス](https://www.typescriptlang.org/docs/handbook/2/generics.html)。

### 10.12 既存のオブジェクト型：`Promise`・`Date`・`Map`・`Set` など

日付、重複しない一覧、通信の完了待ちなど、JavaScriptに用意されている機能にも型があります。
通信のように、すぐには結果が出ず、完了を待つ処理を「非同期処理」と呼びます。
既存の型が用途に合う場合は、同じものを自作せずに使います。

| 型 | 使う場面 | 例 |
| --- | --- | --- |
| `Promise<T>` | 非同期処理の成功時の結果 | `Promise<string>` |
| `Date` | 日時の計算や比較に使うオブジェクト | `const now: Date = new Date();` |
| `RegExp` | 文字列のパターン照合 | `const pattern: RegExp = /[0-9]+/;` |
| `Map<K, V>` | 名前やIDなどを使って値を探す対応表 | `Map<string, number>` |
| `Set<T>` | 重複しない値の集合 | `Set<string>` |
| `ReadonlyMap<K, V>`・`ReadonlySet<T>` | 中身を読む操作だけを使わせたい | 更新をさせず、データを渡す |
| `Iterable<T>` | 配列や集合など、順番に取り出せる値を共通に扱う | `Iterable<string>` |
| `AsyncIterable<T>` | 到着を待ちながら、値を1つずつ取り出す | 少しずつ届くデータの処理 |
| `Iterator<T>`・`Generator<T, TReturn, TNext>` | 「次の値を取り出す」仕組みを表す | 値を1つずつ作る処理などの応用 |

```ts
async function getGreeting(name: string): Promise<string> {
  return `こんにちは、${name}さん`;
}

const counts = new Map<string, number>();
counts.set('apple', 3);
const count = counts.get('orange'); // number | undefined

const tags = new Set<string>(['入門', '実務', '入門']);
```

`Promise<string>` は「処理が成功したら、文字列を受け取れる」と読みます。
`await getGreeting('田中')` とすれば、処理の完了を待って文字列を受け取れます。
`counts` は果物名と個数の対応表で、登録していない名前を `get` すると `undefined` になります。
`Set` は重複をまとめるので、例の `tags` に入る値は `'入門'` と `'実務'` の2つです。

`Promise<T>` の `T` は成功時の値の型で、失敗時のエラーの型を指定するものではありません。
`Promise<void>` は、完了は待つものの成功時の値を利用しない処理に使います。
JSON中の日時文字列は `Date` オブジェクトではないため、必要なら変換と検証を行います。
`HTMLElement` などのブラウザ向けの型や、ライブラリの型も、その実行環境に合わせて使います。
型が分かることと、その環境で機能が使えることは別です。
たとえば、ブラウザの画面要素を扱う型を用意しても、画面を持たない実行環境に画面要素が生まれるわけではありません。
表の `Iterable` 以降は、データを1つずつ取り出す処理を作るときに参照すれば十分です。

参考：[標準ライブラリの設定](https://www.typescriptlang.org/tsconfig/lib.html)、
[イテレーターとジェネレーター](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)。

### 10.13 既存の定義から型を取り出す：`keyof`・`typeof`・インデックスアクセス型

「商品の項目名を指定したい」「価格の型を別の場所でも使いたい」ときに使います。
元の定義から取り出せば、同じ項目名や型を手で書き直す手間を減らせます。

```ts
type Product = { id: number; name: string; price: number };
type ProductKey = keyof Product; // 'id' | 'name' | 'price'
type Price = Product['price']; // number

const defaults = { pageSize: 20, showArchived: false };
type Settings = typeof defaults;

const statuses = ['draft', 'published'] as const;
type Status = typeof statuses[number]; // 'draft' | 'published'

function getProperty<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}
```

| 書き方 | 取り出すもの | 使う場面 |
| --- | --- | --- |
| `keyof T` | 型 `T` のキーの型 | 並べ替え対象や更新対象の項目名を制限する |
| `typeof value` | 既存の値の型 | 設定オブジェクトや関数と型定義を揃える |
| `T['key']` | 特定のプロパティの型 | 元の項目の型変更に追従する |
| `T[number]` | 配列やタプルの要素の型 | 一覧の定義から1要素の型を取り出す |

`keyof Product` は「`Product` の項目名を一覧にする」、`Product['price']` は「価格の型を取り出す」と読みます。
`typeof defaults` は、実際に書いた設定値をもとに、同じ形の型を作ります。
`typeof statuses[number]` は、配列に入っている各要素の型をまとめて取り出します。
例の `as const` は値を具体的な候補として残す指定で、10.18で説明します。

最後の `getProperty` は応用例です。
`K extends keyof T` で、指定できるキーを `T` にある項目名に限定しています。
`T[K]` は、そのキーに対応する値の型です。

型の定義に書く `typeof` は、値を調べて `'string'` などを返すJavaScriptの `typeof` とは使い方が異なります。
`keyof` は文字列のキーだけとは限らず、型によっては数値やシンボルも含みます。

参考：[型の再利用](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)。

### 10.14 よく使う型の加工：組み込みユーティリティ型

ユーティリティ型は、TypeScriptにあらかじめ用意されている、型を書き換えるための道具です。
「登録時はIDが不要」「編集時は変更した項目だけ渡したい」といった場面で使います。
まずは `Partial`・`Pick`・`Omit`・`Record` を必要に応じて使ってみてください。

次の表の `T` は元の型、`K` は項目名の型、`V` は値の型です。
`F` は関数の型、`C` はクラスなどを `new` するときの型、`U` は比較相手の型として使っています。
これらは型を加工する道具であり、実際のデータを変更する関数ではありません。

| 型 | 何をするか | 使う場面 |
| --- | --- | --- |
| `Partial<T>` | 各プロパティを省略可能にする | 一部の項目だけ更新する入力 |
| `Required<T>` | 各プロパティを必須にする | 必要な項目を補完した後のデータ |
| `Readonly<T>` | 各プロパティを読み取り専用にする | 更新させたくない引数や戻り値 |
| `Pick<T, K>` | 指定したプロパティだけを選ぶ | 一覧画面に必要な項目を定義する |
| `Omit<T, K>` | 指定したプロパティを除く | 自動採番されるIDを新規登録の入力から除く |
| `Record<K, V>` | キーと値の型を指定したオブジェクトを作る | ステータスごとの表示名などの対応表 |
| `Exclude<T, U>` | 複数の候補から、`U` の条件に合う候補を除く | 操作対象外の状態を除外する |
| `Extract<T, U>` | 複数の候補から、`U` の条件に合う候補を残す | 特定の種類のイベントだけを扱う |
| `NonNullable<T>` | `null` と `undefined` を除く | 値の存在を確認した後の型を表す |
| `Parameters<F>` | 関数の引数をタプルとして取り出す | 既存関数に引数を転送する処理 |
| `ReturnType<F>` | 関数の戻り値の型を取り出す | 関数の結果と保存先の型を揃える |
| `ConstructorParameters<C>` | コンストラクターの引数を取り出す | インスタンス生成を共通化する |
| `InstanceType<C>` | コンストラクターが作るインスタンスの型を取り出す | 渡されたクラスのインスタンスを扱う |
| `Awaited<T>` | `await` した結果の型を取り出す | 非同期関数の解決後のデータを扱う |

```ts
type User = { id: number; name: string; email: string };
type CreateUser = Omit<User, 'id'>;
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;
type UserSummary = Pick<User, 'id' | 'name'>;

type Status = 'draft' | 'published';
const labels: Record<Status, string> = {
  draft: '下書き',
  published: '公開済み',
};

type SearchResult = Awaited<Promise<User[]>>; // User[]
type OptionalLabel = string | null | undefined;
type Label = NonNullable<OptionalLabel>; // string
```

`CreateUser` は `id` を除いた型なので、`name` と `email` が必要です。
`UpdateUser` は、内側の `Pick` で `name` と `email` を選び、外側の `Partial` で両方を省略可能にしています。
そのため、`{ name: '佐藤' }` のように、変更したい項目だけを渡せます。
`UserSummary` は `id` と `name` だけを使うための型です。

`Partial<T>` や `Readonly<T>` は、オブジェクトの中にある、さらに内側の項目までは自動で書き換えません。
`Partial<T>` は空のオブジェクトも許すので、「1項目以上の更新」を保証するには別の確認が必要です。
`Omit<T, K>` は実データから項目を削除せず、`NonNullable<T>` も値の存在を確認しません。
たとえば個人情報を除いて送信する場合は、実際の送信データからその項目を除きます。

`Record<Status, string>` は「すべての状態に、文字列の表示名を用意する」と読みます。
例では `draft` と `published` のどちらかを忘れると、型エラーになります。
`Record<string, V>` のような任意のキーの辞書は、存在しないキーで値を取得する場合があります。
欠ける可能性を明示したいなら `Record<string, V | undefined>` も検討します。

次のユーティリティ型は、共通ライブラリなどで必要になってから使えば十分です。

| 型 | 何をするか | 使う場面 |
| --- | --- | --- |
| `NoInfer<T>` | その場所の値を、`T` を決める手掛かりに使わせない | 選択肢にない既定値を受け付けたくない |
| `ThisParameterType<F>` | 関数に書かれた `this` の型を取り出す | 既存の関数を別の関数から呼び出す処理 |
| `OmitThisParameter<F>` | 関数型から明示的な `this` 引数を除く | `bind` 後の関数の型 |
| `ThisType<T>` | 対象のオブジェクトのメソッド内で、`this` を `T` として扱う目印 | オブジェクトを作るAPI。`noImplicitThis` が必要 |
| `Uppercase<S>`・`Lowercase<S>` | 文字列リテラル型の大文字・小文字を変える | 定数名やコードの命名規則を表す |
| `Capitalize<S>`・`Uncapitalize<S>` | 先頭の文字の大文字・小文字を変える | プロパティ名からメソッド名などを作る |

`NoInfer<T>` はTypeScript 5.4以降で利用できます。
利用できるユーティリティ型は、プロジェクトのTypeScriptのバージョンで確認します。

参考：[ユーティリティ型の公式一覧](https://www.typescriptlang.org/docs/handbook/utility-types.html)。

### 10.15 キーごとに型を作る：マップ型とインデックスシグネチャ

入力フォームに `email` と `password` があるなら、エラーメッセージも同じ項目名で管理したくなります。
このように「元の項目ごとに、別の型の項目を作る」ときにマップ型を使います。

```ts
type FieldErrors<T> = {
  [K in keyof T]?: string;
};

type LoginForm = { email: string; password: string };
const errors: FieldErrors<LoginForm> = {
  email: 'メールアドレスを入力してください',
};

type Dictionary = {
  [key: string]: string | undefined;
};
```

`[K in keyof T]` は「`T` の各項目名を使って、新しい項目を作る」と読みます。
例の `FieldErrors<LoginForm>` は、`{ email?: string; password?: string }` という形になります。
`?` があるので、エラーのある項目だけを書けます。
フォームに項目が増えると、エラーを持てる項目もそれに合わせて増えます。

一方、`Dictionary` は「項目名は自由だが、値は文字列か `undefined`」という指定です。
この `[key: string]: V` という書き方を、インデックスシグネチャと呼びます。
決まった項目名を引き継ぐならマップ型、自由な項目名を使う対応表なら辞書の型を検討します。

マップ型では `readonly` や `?` を付けたり、`-readonly` や `-?` で外したりできます。
キーの後の `as` で名前を変えることもできます。
単純な省略可能化などは、独自に書く前に `Partial` や `Record` を検討します。

参考：[マップ型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)。

### 10.16 型に応じて切り替える：条件付き型・`infer`・再帰型

ここからは、共通ライブラリや複雑なデータ構造で使う応用的な定義です。
条件付き型は、受け取った型に応じて結果の型を変えたいときに使います。

```ts
type ElementOrSelf<T> = T extends readonly (infer U)[] ? U : T;

type Name = ElementOrSelf<string[]>; // string
type Count = ElementOrSelf<number>; // number

type IsString<T> = T extends string ? true : false;
type Mixed = IsString<string | number>; // true | false

type IsEntirelyString<T> = [T] extends [string] ? true : false;
type Entire = IsEntirelyString<string | number>; // false
```

`T extends U ? X : Y` は「`T` が `U` の条件に合えば `X`、合わなければ `Y`」と読みます。
型を決めるための条件分岐です。

最初の例を日本語にすると、次のようになります。

1. `T` が配列の型か確認する。
2. 配列なら、中身の型を `U` という名前で取り出す。
3. 配列でなければ、もとの `T` を使う。

この「一致した部分の型を取り出し、名前を付ける」ための記号が `infer` です。
`string[]` なら `string`、`number` ならそのまま `number` になります。
型を決めているだけなので、実際の配列から値を取り出す処理は行いません。

**複数の候補を渡す場合（応用）**：
`T extends string` のように条件の左側へ `T` を直接書くと、候補を1つずつ調べます。
`string | number` なら、文字列は `true`、数値は `false` なので、結果は `true | false` です。
`[T] extends [string]` と書くと、候補全体をまとめて調べます。
この場合は数値も含むため、結果は `false` になります。

再帰型は、フォルダー階層やツリーなど、同じ形が入れ子になるときに使います。

```ts
type MenuItem = {
  label: string;
  children?: MenuItem[];
};

const menu: MenuItem = {
  label: '設定',
  children: [{ label: 'プロフィール' }],
};
```

`MenuItem` の中に、同じ `MenuItem` の配列が登場しています。
これで「メニューの中に子メニューがあり、その中にさらに子メニューがある」という形を表せます。
このように、自分自身を使って定義する型を再帰型と呼びます。
複雑な加工と組み合わせると、読むのも型チェックするのも難しくなることがあります。
まずは標準のユーティリティ型や、具体的なデータの形で解決できないか検討します。

参考：[条件付き型と `infer`](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)。

### 10.17 文字列の組み合わせを表す：テンプレートリテラル型

イベント名、設定キー、翻訳キーなど、決まった文字列の組み合わせを表すときに使います。

```ts
type Section = 'user' | 'order';
type Action = 'created' | 'updated';
type EventName = `${Section}:${Action}`;

const event: EventName = 'user:created';

type ChangeHandlers<T> = {
  [K in keyof T & string as `on${Capitalize<K>}Changed`]:
    (value: T[K]) => void;
};

type Handlers = ChangeHandlers<{ name: string; age: number }>;
// onNameChanged と onAgeChanged を持つ型
```

`EventName` で使える値は、`'user:created'`・`'user:updated'`・
`'order:created'`・`'order:updated'` の4つです。
「対象の名前」と「起きたこと」を `:` でつないだ名前だけを受け付けます。

後半の `ChangeHandlers` は、10.15のマップ型と組み合わせた応用例です。
`name` という項目名から、`onNameChanged` という関数名を作っています。
`Capitalize` は先頭の文字を大文字にする型で、`T[K]` は元の項目の型です。
そのため、`onNameChanged` は文字列、`onAgeChanged` は数値を受け取る関数になります。

文字列の候補が多すぎると、組み合わせが大きくなります。
少数の規則的な名前に使い、外部入力の文字列を検証する処理とは分けて考えます。

参考：[テンプレートリテラル型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)。

### 10.18 定数から型を作る：`as const`・`satisfies` と型アサーション

「権限の一覧をコードに書いたので、その一覧を型にも使いたい」ときなどに便利です。
`as const` は具体的な値を型に残すため、`satisfies` は必要な形を満たすか確かめるために使います。
似た場所に書く `as T` や `!` も含めて、役割を整理します。

```ts
const roles = ['reader', 'editor', 'admin'] as const;
type Role = typeof roles[number];

const labels = {
  reader: '閲覧者',
  editor: '編集者',
  admin: '管理者',
} satisfies Record<Role, string>;
```

例の `Role` は、`'reader' | 'editor' | 'admin'` になります。
`as const` により、単なる文字列の一覧としてではなく、この3つの値を区別したまま扱えます。
`satisfies Record<Role, string>` は「3つの権限すべてに、文字列の表示名があるか」を確認します。
たとえば `labels` の `admin` を書き忘れると、型エラーになります。

| 書き方 | 役割 | 使う場面 |
| --- | --- | --- |
| `value: T` | 型注釈を付け、以後その型として扱う | 引数や変数の契約を明示する |
| `value as const` | リテラル型を保ち、リテラルのプロパティや配列を読み取り専用として推論する | 選択肢や固定設定から型を作る |
| `value satisfies T` | `T` に適合するか確認し、式の具体的な型を活用する | 設定の不足を検出しつつ、個々の項目の型を使う |
| `value as T` | 開発者の指定で型の扱いを変える | 別の根拠で型を確認済みだが、推論できない箇所 |
| `value!` | `null`・`undefined` の可能性を型から除く | 値がある根拠があり、通常の分岐では表せない箇所 |

`satisfies` はTypeScript 4.9以降で利用できます。
`satisfies` は、指定した型に合うか確認しながら、個々の値から分かる型も活用できる書き方です。
ただし、周囲の書き方によって型の推論結果が変わる場合もあります。
`as const` は実行時の凍結ではなく、外部から参照するオブジェクトまで完全に不変にするものでもありません。
`as T` と `!` は実行時の検証を行わないため、確認処理の代わりには使いません。

参考：[`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html)、
[`satisfies`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)。

### 10.19 名前付きの定数群：`enum`

`Direction.Up` のように、選択肢に名前を付けて使いたいときに登場します。
関連する選択肢をひとまとめにする書き方で、「列挙型」とも呼びます。
既存のライブラリやプロジェクトが `enum` を採用している場合にも登場します。

```ts
enum Direction {
  Up = 'up',
  Down = 'down',
}

const direction: Direction = Direction.Up;
```

例の `Direction.Up` の値は `'up'`、`Direction.Down` の値は `'down'` です。
選択肢には、文字列のほかに数値も指定できます。
通常の `enum` は、型だけでなく実行時のオブジェクトも生成します。
`type` や `interface` と違い、出力されるJavaScriptに影響する点に注意します。
単に入力候補を制限するなら、リテラル型のユニオンでも表せます。
値の一覧も必要なら、`as const` を使う方法と比較して選びます。

**応用**：`const enum` という書き方もあります。
これは、`Direction.Up` のような参照を、変換後のコードで実際の値に置き換えるための仕組みですが、
公開する型定義やビルド方式との組み合わせに注意が必要です。
導入初期に最適化だけを理由として選ぶ必要はありません。

参考：[列挙型](https://www.typescriptlang.org/docs/handbook/enums.html)。

### 10.20 クラス・コンストラクター・呼び出し形式の型

クラスは、データと処理をまとめたオブジェクトを作るための定義です。
`new User('田中')` のようにして作った1つのオブジェクトを「インスタンス」と呼びます。
コンストラクターは、`new` でオブジェクトを作るときの初期設定を行う部分です。
クラスを使うコードで必要になったら、この節を参照してください。

```ts
interface HasName {
  name: string;
}

class User implements HasName {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const user: User = new User('田中');
type UserClass = typeof User;
type UserConstructor = new (name: string) => HasName;

function createUser(Ctor: UserConstructor): HasName {
  return new Ctor('佐藤');
}
```

`const user: User` の `User` は、「作ったオブジェクト」の型です。
`typeof User` は、「オブジェクトを作る側のクラスそのもの」の型です。
`new (name: string) => HasName` は、「文字列を渡して `new` すると、`name` を持つ値ができる」と読みます。

`implements HasName` は、「このクラスに必要な `name` があるか」を確認する指定です。
`name` を作る処理まで自動で追加されるわけではありません。
`abstract class` は、そのまま `new` せず、別のクラスの共通部分として使う場合の書き方です。
通常のデータ構造を表すためだけに、必ずクラスを作る必要はありません。

関数にプロパティが付くAPIや、引数に応じて戻り値が変わるAPIには、次の定義方法もあります。

```ts
type NamedFormatter = {
  (value: number): string; // 呼び出しシグネチャ
  label: string;
};

function format(value: string): string;
function format(value: string[]): string[];
function format(value: string | string[]): string | string[] {
  return typeof value === 'string'
    ? value.trim()
    : value.map((item) => item.trim());
}

type Renamer = (this: { name: string }, name: string) => void;
```

「シグネチャ」は、どんな引数で呼び出し、何が返るかを記したものです。
`NamedFormatter` は、数値を渡して呼び出せるうえに、`label` という項目も持つ関数を表します。

`format` の最初の2行は、「文字列を渡すと文字列が返り、文字列の配列を渡すと配列が返る」という指定です。
このように、1つの関数の呼び出し方を複数定義することをオーバーロードと呼びます。
その下の関数本体が、両方の処理を実装しています。
呼び出す側が使える形は、最初の2行で指定したものです。

`Renamer` の `this` は、その関数内で使う `this` に `name` が必要なことを示しています。
通常の引数のように、呼び出すときに追加で渡すものではありません。
通常の関数型やユニオン型で十分な場合は、そちらを優先します。

参考：[クラス](https://www.typescriptlang.org/docs/handbook/2/classes.html)、
[呼び出しシグネチャとオーバーロード](https://www.typescriptlang.org/docs/handbook/2/functions.html)。

### 10.21 検証結果を型に伝える：型述語・アサーション関数

「この値はユーザー情報として使えるか」という確認を、何度も使う関数にまとめたいときに便利です。
確認するだけでなく、その結果をTypeScriptにも伝えるための書き方です。

```ts
type User = { id: number; name: string };

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;
  return 'id' in value && typeof value.id === 'number'
    && 'name' in value && typeof value.name === 'string';
}

function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) throw new Error('ユーザー情報の形式が不正です');
}

function displayUser(value: unknown): string {
  assertUser(value);
  return value.name; // ここでは User
}
```

`isUser` は、`id` が数値で、`name` が文字列かどうかを調べています。
戻り値の `value is User` は、「`true` なら、この値は `User` として使える」とTypeScriptに伝えます。
この書き方を「型述語」と呼びます。

`assertUser` は、不正な値なら例外を投げて処理を止めます。
`asserts value is User` は、「止まらずに次の行へ進めたなら、`User` として使える」という意味です。
そのため、`displayUser` は確認後に `value.name` を読めます。
条件そのものが正しいと伝える `asserts condition` という形もあります。

型の宣言と確認処理が本当に一致しているかは、書く人が確かめる必要があります。
たとえば、いつも `true` を返すだけの `isUser` では、安全な確認にはなりません。
必要な項目を実際に検証し、間違った型に絞り込まないようにします。
型アサーションの `as User` と違い、この例は実行時の確認処理を自分で実装しています。

参考：[型述語](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)、
[アサーション関数](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)。

### 10.22 同じ基本型を用途で区別する：ブランド型と `unique symbol`

ユーザーIDと注文IDなど、どちらも文字列だが取り違えたくない場合の応用的な手法です。
通常の `type UserId = string` では、注文IDなど、ほかの文字列も代入できます。
ブランド型は、型に「ユーザーID用」という目印を足して、普通の文字列と区別する書き方です。
TypeScriptに `brand` という専用のキーワードがあるわけではありません。

```ts
declare const userIdBrand: unique symbol;
type UserId = string & { readonly [userIdBrand]: true };

function parseUserId(value: string): UserId {
  if (!/^user_[0-9]+$/.test(value)) {
    throw new Error('ユーザーIDの形式が不正です');
  }
  return value as UserId;
}

const id = parseUserId('user_123');
```

`unique symbol` は、ほかの目印と取り違えないための、専用の目印の型として使っています。
例の `parseUserId` は、文字列が `user_` と数字の並びになっているかを確認します。
確認できたら、型の上で「ユーザーIDとして扱ってよい」という目印を付けています。
実際の文字列に、目印のデータが追加されるわけではありません。
検証後に `as UserId` を使っていますが、実行時の値は通常の文字列のままです。
どこでも `as UserId` と書ける運用では、確認せずに目印を付けられてしまいます。
`parseUserId` のような決めた関数を通して作る、という約束も必要です。
IDの取り違えが実際の問題になってから、チームで導入を検討すれば十分です。

参考：[`unique symbol`](https://www.typescriptlang.org/docs/handbook/symbols.html)。

### 10.23 型をファイル間で共有する・既存ライブラリを宣言する

複数のファイルで同じユーザー情報の型を使うなら、1か所にまとめて共有します。
`export` は「ほかのファイルから使えるようにする」、`import` は「ほかのファイルから読み込む」という意味です。
通常の `.ts` ファイルで、`export type` や `export interface` を使って型を公開できます。
利用側では `import type { User } from './types'` のように、型だけを読み込めます。
型だけのインポートは、実行時のJavaScriptのインポートとしては残りません。

型定義ファイル `.d.ts` は、既にあるJavaScriptの機能の「使い方の説明書」に当たります。
どんな引数を渡し、どんな結果が返るかをTypeScriptに伝えます。

```ts
// 既存のJavaScriptライブラリに対応する型定義ファイルの例
export interface ParseOptions {
  trim?: boolean;
}

export declare function parseRows(
  text: string,
  options?: ParseOptions,
): string[][];
```

例の `parseRows` は、「文字列と、省略可能な設定を受け取り、文字列の配列の配列を返す」という説明です。
`string[][]` は、たとえば表の「行の一覧で、各行が文字列の一覧」という形に使えます。
`declare` は「実際の処理は別にあります」と知らせるための記号です。
`.d.ts` を書いても、実行時にその関数が利用できるようになるわけではありません。
まずライブラリ同梱の型定義や既存の型パッケージを確認し、不足する場合に必要な範囲だけ補います。

**ライブラリとの接続で使う応用**：
既存のライブラリの型に項目を追加する「モジュール拡張」や、
`import` せずに各ファイルから参照する名前の型を補う `declare global` という書き方もあります。
これらはライブラリの拡張手順や実際の実装に合わせて使います。
`namespace` は既存の型定義で関連する名前をまとめる用途などに現れますが、
通常のアプリケーションの型共有は、まずファイル単位の `export`・`import` で考えます。

参考：[型定義ファイル](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)、
[型だけのインポート](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html)、
[宣言の統合と拡張](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)。

### 10.24 迷ったときの選び方

| やりたいこと | 最初に検討する型・書き方 |
| --- | --- |
| 1つの値を扱う | `string`・`number`・`boolean` など |
| 複数の項目をまとめる | `type` または `interface` によるオブジェクト型 |
| 一覧を扱う | `T[]` |
| 座標など、位置に意味のある組を扱う | タプル |
| 候補を制限する | リテラル型のユニオン |
| 状態ごとに必要なデータを変える | 判別用のプロパティを持つユニオン |
| 未選択や省略を表す | `T \| null`・`T \| undefined`・`?` |
| 処理を渡す | 関数型 |
| 外部の未確認データを受け取る | `unknown` と実行時の検証 |
| 同じ仕組みを異なる型に使う | ジェネリクス |
| 既存の型の一部を使う | `Pick`・`Omit`・インデックスアクセス型 |
| 型の重複を減らす | `keyof`・`typeof`・標準ユーティリティ型 |

たとえば「状態の名前の入力間違いを防ぎたい」なら、まず文字列の候補を `|` で並べます。
「名前だけ更新したい」なら、必要な項目を `Pick` で選び、`Partial` で省略可能にします。
このように、先に困りごとを1つ決めると、使う型も選びやすくなります。
短い型と普段の `if` 文で書けるなら、その書き方から始めて構いません。

## 11. 付録

### 11.1 よくあるエラーと最初の確認先

| エラーの趣旨 | まず確認すること |
| --- | --- |
| `string` を `number` に渡している | URLやフォームの文字列を数値に変換・検証しているか |
| `undefined` の可能性がある | 値がない場合の分岐や初期値が必要か |
| プロパティが存在しない | 名前の誤りか、型定義と実データの不一致か |
| 引数の型が推論できない | 関数の引数に型を付けられるか |
| モジュールの型宣言が見つからない | 依存パッケージの型、設定、必要な型パッケージを確認したか |
| 型が深く複雑で読めない | 公開する入出力を小さな型に分けられるか |

### 11.2 用語集

| 用語 | 意味 |
| --- | --- |
| 型推論 | 書いた値や処理からTypeScriptが型を判断すること |
| 型注釈 | `name: string` のように型を明示すること |
| ユニオン型 | `string \| null` のように複数の可能性を表す型 |
| 型の絞り込み | 分岐などを使い、ある時点での値の可能性を狭めること |
| 型アサーション | `value as User` のように、開発者が型を指定すること。値の検証はしない |
| 型定義ファイル | 主に `.d.ts` 形式で、ライブラリなどの型の契約を記述するファイル |
| `tsconfig.json` | TypeScriptの対象ファイルやチェック方針などを定める設定ファイル |
| 型チェック | プログラムを実行する前に、型の整合性を確認すること |

---
