// readonly は「このプロパティを書き換えない」という意図を型で表します。
// 実行時に完全に凍結する仕組みではなく、開発時に代入ミスを見つけるための指定です。

type Account = {
  readonly id: string;
  name: string;
  preferences: {
    theme: 'light' | 'dark';
  };
};

const account: Account = {
  id: 'u-1',
  name: '田中',
  preferences: {
    theme: 'light',
  },
};

account.name = '佐藤';
account.preferences.theme = 'dark';
// account.id = 'u-2'; // 型エラー: readonly のプロパティには再代入できません。

// readonly は浅い指定です。
// account.preferences 自体を差し替えることはできても、内側の theme は別途 readonly にしない限り変更できます。
type DeepEnoughAccount = {
  readonly id: string;
  readonly preferences: {
    readonly theme: 'light' | 'dark';
  };
};

// object は「プリミティブではない値」を表す広い型です。
// 形が分からないため、具体的なプロパティはそのまま読めません。
function acceptsObject(value: object): string {
  return Object.keys(value).join(',');
}

// {} は null と undefined 以外の多くの値を受け取ります。
// 「空のオブジェクト」のつもりで使うと、文字列や数値も入り得るため注意します。
function acceptsAlmostAnything(value: {}): string {
  return String(value);
}

// Record<string, unknown> は「文字列キーで値を読む辞書」の形です。
// 値は unknown なので、使う前に型を確認します。
function readStringValue(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' ? value : undefined;
}

const metadata: Record<string, unknown> = {
  source: 'api',
  retryCount: 2,
};

const source = readStringValue(metadata, 'source');

export {};

