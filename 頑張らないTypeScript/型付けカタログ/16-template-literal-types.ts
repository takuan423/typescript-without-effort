// テンプレートリテラル型は、決まった文字列の組み合わせを型で表します。
// イベント名、翻訳キー、設定キーなどに向いています。

type Section = 'user' | 'order';
type Action = 'created' | 'updated';

type EventName = `${Section}:${Action}`;

const eventName: EventName = 'user:created';
// const invalidEventName: EventName = 'user:deleted'; // 型エラー

function publishEvent(event: EventName): string {
  return `event=${event}`;
}

// 文字列操作のユーティリティ型と組み合わせると、命名規則を型にできます。
type Field = 'name' | 'email';
type ChangeEvent = `${Field}Changed`;
type HandlerName = `on${Capitalize<ChangeEvent>}`;

const handlerName: HandlerName = 'onNameChanged';

// マップ型と組み合わせて、プロパティ名からハンドラー名を作る例です。
type ChangeHandlers<T> = {
  [K in keyof T & string as `on${Capitalize<K>}Changed`]: (value: T[K]) => void;
};

type Profile = {
  name: string;
  age: number;
};

const profileHandlers: ChangeHandlers<Profile> = {
  onNameChanged: (value) => value.trim(),
  onAgeChanged: (value) => value.toFixed(0),
};

// 文字列パターンから一部を取り出すこともできます。
type EventSection<T> = T extends `${infer S}:${string}` ? S : never;
type UserEventSection = EventSection<'user:created'>; // 'user'

function parseEventSection(event: EventName): Section {
  return event.split(':')[0] as Section;
}

const section = parseEventSection(eventName);

export {};

