// 条件付き型は、受け取った型に応じて結果の型を切り替えます。
// 共通ライブラリや型の加工でよく登場する応用的な書き方です。

type IsString<T> = T extends string ? true : false;

type TextCheck = IsString<string>; // true
type NumberCheck = IsString<number>; // false

// infer は、条件に一致した部分の型を取り出して名前を付けます。
type ElementOrSelf<T> = T extends readonly (infer U)[] ? U : T;

type Name = ElementOrSelf<string[]>; // string
type Count = ElementOrSelf<number>; // number

// 条件付き型にユニオン型を渡すと、候補ごとに分配されます。
type Distributed = IsString<string | number>; // true | false

// 分配させたくない場合は、左右をタプルで包みます。
type IsEntirelyString<T> = [T] extends [string] ? true : false;
type Entire = IsEntirelyString<string | number>; // false

// 関数の戻り値を自作で取り出す例です。
// 実務では組み込みの ReturnType を先に検討します。
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

function buildMessage(name: string): string {
  return `こんにちは、${name}さん`;
}

type Message = MyReturnType<typeof buildMessage>;

// 再帰型は、同じ形が入れ子になるデータを表します。
// メニュー、コメントツリー、フォルダー階層などに使えます。
type MenuItem = {
  label: string;
  path?: string;
  children?: MenuItem[];
};

const menu: MenuItem = {
  label: '設定',
  children: [
    { label: 'プロフィール', path: '/settings/profile' },
    { label: '通知', path: '/settings/notifications' },
  ],
};

function collectLabels(item: MenuItem): string[] {
  const childLabels = item.children?.flatMap(collectLabels) ?? [];
  return [item.label, ...childLabels];
}

const labels = collectLabels(menu);

export {};

