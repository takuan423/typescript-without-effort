// 関数の型は「どんな引数を受け取り、何を返すか」を表します。
// コールバックを渡すときにも、引数と戻り値の約束を書けます。

type Formatter = (value: number) => string;

const formatPrice: Formatter = (value) => `${value.toLocaleString()}円`;

// ? は省略可能な引数です。
// 呼び出し側は category を省略できます。
type Logger = (message: string, category?: string) => void;

const log: Logger = (message, category = 'info') => {
  const entry = `[${category}] ${message}`;
  void entry;
};

// rest parameter は、同じ型の引数を複数受け取る関数に使います。
type Sum = (...values: number[]) => number;

const sum: Sum = (...values) => values.reduce((total, value) => total + value, 0);

// void は「呼び出し側が戻り値を使わない」契約です。
// 実装が何かを返しても、呼び出し側はそれを頼らないという意味合いになります。
function notify(message: string): void {
  log(message, 'notification');
}

// never は、正常に戻ることがない関数に使います。
// 例外を投げる、または無限ループする関数などです。
function fail(message: string): never {
  throw new Error(message);
}

type User = {
  id: number;
  name: string;
};

// コールバックの引数に型を付けると、利用側で補完が効きます。
function findUser(users: readonly User[], predicate: (user: User) => boolean): User | undefined {
  return users.find(predicate);
}

const users: User[] = [
  { id: 1, name: '田中' },
  { id: 2, name: '佐藤' },
];

const found = findUser(users, (user) => user.name === '佐藤');

// 関数オーバーロードは、入力に応じて戻り値を変えたい公開関数で使います。
// 実装シグネチャは、すべての呼び出しパターンを受け止められる広い型にします。
function parseInput(value: string): string;
function parseInput(value: number): number;
function parseInput(value: string | number): string | number {
  return typeof value === 'number' ? value : value.trim();
}

const parsedText = parseInput('  hello  ');
const parsedNumber = parseInput(10);

export {};

