// 型をファイル間で共有する場合は export / import を使います。
// このファイルは単独サンプルなので、同じファイル内に例をまとめています。

export type User = {
  id: number;
  name: string;
};

export type CreateUserInput = Omit<User, 'id'>;

export function createUser(input: CreateUserInput): User {
  return {
    id: 1,
    ...input,
  };
}

// 型だけを読み込む場合は import type を使うと、実行時の依存ではないことが明確になります。
// 例:
// import type { User } from './user-types';
// import { createUser } from './user-types';

// 外部ライブラリに型定義がない場合は、必要最小限の宣言を .d.ts に書くことがあります。
// 実際のプロジェクトでは、まず公式の型定義や @types パッケージがないか確認します。
//
// 例: declarations.d.ts
// declare module 'legacy-date-format' {
//   export function format(value: Date, pattern: string): string;
// }

// グローバルな値を宣言したい場合も .d.ts を使えます。
// ただし、グローバルは影響範囲が広いため、必要最小限にします。
//
// declare global {
//   const APP_VERSION: string;
// }
//
// export {};

// API 境界では、共有型をそのまま信じるだけでなく実行時検証も検討します。
// TypeScript の型はコンパイル後に消えるため、外部データの安全性は自動では保証されません。
function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.id === 'number' && typeof record.name === 'string';
}

export function parseUser(value: unknown): User | undefined {
  return isUser(value) ? value : undefined;
}

