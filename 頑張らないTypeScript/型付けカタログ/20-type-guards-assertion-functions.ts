// 型述語は、検証関数の結果を TypeScript の型の絞り込みに伝える書き方です。
// value is User の形で戻り値の型を書きます。

type User = {
  id: number;
  name: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isUser(value: unknown): value is User {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.id === 'number' && typeof value.name === 'string';
}

function userLabel(value: unknown): string {
  if (!isUser(value)) {
    return 'ユーザーではありません';
  }

  // ここでは value は User として扱えます。
  return `${value.id}: ${value.name}`;
}

// アサーション関数は、条件を満たさない場合に例外を投げる関数です。
// 戻り値の asserts によって、呼び出し後の型を絞れます。
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error('User の形ではありません');
  }
}

function parseUser(value: unknown): User {
  assertUser(value);
  return value;
}

// 条件そのものを保証するアサーションも書けます。
function assertNonEmptyString(value: unknown, fieldName: string): asserts value is string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${fieldName} は空ではない文字列が必要です`);
  }
}

function normalizeName(value: unknown): string {
  assertNonEmptyString(value, 'name');
  return value.trim();
}

// in 演算子や typeof など、JavaScript の通常の分岐も型の絞り込みに使われます。
type ApiResult =
  | { ok: true; data: User }
  | { ok: false; error: string };

function resultMessage(result: ApiResult): string {
  if (result.ok) {
    return result.data.name;
  }

  return result.error;
}

export {};

