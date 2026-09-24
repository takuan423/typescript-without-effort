# 型付けカタログ

このディレクトリは、`頑張らないTypeScript導入ガイドライン` の第10章に対応した、型付けの具体例集です。

各 `.ts` ファイルは独立したサンプルとして読めます。
同じ名前の型や変数が別ファイルに出ても衝突しないよう、各ファイルの末尾に `export {}` を置いています。

## ファイル一覧

- `01-basic-types.ts`: 基本型、型注釈、型推論
- `02-null-undefined-optional.ts`: `null`、`undefined`、省略可能プロパティ
- `03-type-and-interface.ts`: `type` と `interface`
- `04-readonly-and-object-types.ts`: `readonly`、広いオブジェクト型、辞書的な値
- `05-array-and-tuple.ts`: 配列、読み取り専用配列、タプル
- `06-literal-and-union.ts`: リテラル型、ユニオン型、判別可能なユニオン
- `07-intersection.ts`: インターセクション型
- `08-function-types.ts`: 関数型、コールバック、`void`、`never`
- `09-unknown-any-assertion.ts`: `unknown`、局所的な `any`、型アサーション
- `10-generics.ts`: ジェネリクス、制約、既定の型引数
- `11-built-in-objects.ts`: `Promise`、`Date`、`Map`、`Set`、イテラブル
- `12-keyof-typeof-indexed-access.ts`: `keyof`、型用の `typeof`、インデックスアクセス型
- `13-utility-types.ts`: 組み込みユーティリティ型
- `14-mapped-types-and-index-signature.ts`: マップ型、インデックスシグネチャ
- `15-conditional-infer-recursive.ts`: 条件付き型、`infer`、再帰型
- `16-template-literal-types.ts`: テンプレートリテラル型
- `17-as-const-satisfies-assertion.ts`: `as const`、`satisfies`、型アサーションの使い分け
- `18-enum.ts`: `enum` と代替案
- `19-class-constructor-callable.ts`: クラス、コンストラクター型、呼び出し可能な型
- `20-type-guards-assertion-functions.ts`: 型述語、アサーション関数
- `21-brand-and-unique-symbol.ts`: ブランド型、`unique symbol`
- `22-sharing-and-declaration.ts`: 型の共有、宣言ファイルの考え方

