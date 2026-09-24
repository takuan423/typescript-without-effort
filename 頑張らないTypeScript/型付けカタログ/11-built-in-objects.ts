// JavaScript に最初からある機能にも型があります。
// 既存の型で表せるものは、自分で似た型を作らずに使うと読みやすくなります。

async function getGreeting(name: string): Promise<string> {
  return `こんにちは、${name}さん`;
}

async function greetingLength(name: string): Promise<number> {
  const greeting = await getGreeting(name);
  return greeting.length;
}

const createdAt: Date = new Date('2026-01-01T00:00:00Z');
const updatedAt: Date = new Date();

// JSON から受け取る日時は通常 string です。
// Date として扱いたいなら、実際に変換します。
function parseDate(value: string): Date | undefined {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// Map はキーと値の対応表です。
// get はキーが存在しない場合 undefined を返します。
const counts = new Map<string, number>();
counts.set('apple', 3);
counts.set('orange', 2);

const grapeCount = counts.get('grape'); // number | undefined

// Set は重複しない値の集合です。
const tags = new Set<string>(['入門', '実務', '入門']);
const hasIntro = tags.has('入門');

// ReadonlyMap / ReadonlySet は、渡した先で更新してほしくないときに使います。
function listKeys(map: ReadonlyMap<string, number>): string[] {
  return [...map.keys()];
}

function includesTag(set: ReadonlySet<string>, tag: string): boolean {
  return set.has(tag);
}

// Iterable は、for...of で順番に取り出せる値を共通に扱う型です。
function joinValues(values: Iterable<string>): string {
  return [...values].join(', ');
}

// Generator は値を少しずつ作る関数の型です。
function* range(start: number, end: number): Generator<number, void, unknown> {
  for (let value = start; value <= end; value += 1) {
    yield value;
  }
}

const keyList = listKeys(counts);
const tagText = joinValues(tags);
const numbers = [...range(1, 3)];

export {};

