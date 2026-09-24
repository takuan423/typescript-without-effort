// unknown は「まだ型が分からない値」です。
// 使う前に typeof、instanceof、検証関数などで確認します。

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '不明なエラーです';
}

type UserSummary = {
  id: number;
  name: string;
};

function isUserSummary(value: unknown): value is UserSummary {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.id === 'number' && typeof record.name === 'string';
}

function parseUserSummary(value: unknown): UserSummary | undefined {
  return isUserSummary(value) ? value : undefined;
}

// any は型チェックを大きく弱めます。
// 型定義のない古いコードと接続するなど、理由をコメントで残して局所的に使います。
type LegacyFormatter = (value: any) => string;

const legacyFormatter: LegacyFormatter = (value) => {
  // この例では、古い関数がどんな値でも文字列化する仕様だと仮定しています。
  return String(value);
};

// 型アサーションは「この値をこの型として扱う」とTypeScriptに伝える書き方です。
// 実行時の検証はしないため、根拠がある場所に限定します。
const rawConfig: unknown = {
  retries: 3,
  endpoint: 'https://api.example.com',
};

type AppConfig = {
  retries: number;
  endpoint: string;
};

function isAppConfig(value: unknown): value is AppConfig {
  if (typeof value !== 'object' || value === null) return false;

  const record = value as Record<string, unknown>;
  return typeof record.retries === 'number' && typeof record.endpoint === 'string';
}

const config = isAppConfig(rawConfig)
  ? rawConfig
  : ({ retries: 0, endpoint: 'https://fallback.example.com' } satisfies AppConfig);

// 非nullアサーション ! は「null/undefined ではない」と言い切る記法です。
// 直前のチェックなど、明確な根拠がある場合だけ使います。
function firstRequired(values: readonly string[]): string {
  if (values.length === 0) {
    throw new Error('1件以上必要です');
  }

  return values[0]!;
}

export {};

