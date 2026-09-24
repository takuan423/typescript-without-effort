// マップ型は「元の型のキーを使って、別の型を作る」書き方です。
// フォームのエラーや、項目ごとの表示設定などに向いています。

type LoginForm = {
  email: string;
  password: string;
};

type FieldErrors<T> = {
  [K in keyof T]?: string;
};

const errors: FieldErrors<LoginForm> = {
  email: 'メールアドレスを入力してください',
};

// readonly や ? は、マップ型の中で付け外しできます。
type MutableRequired<T> = {
  -readonly [K in keyof T]-?: T[K];
};

type ReadonlyDraft = {
  readonly title?: string;
  readonly body?: string;
};

type EditableArticle = MutableRequired<ReadonlyDraft>;

const article: EditableArticle = {
  title: '型付け入門',
  body: '本文',
};

article.title = '型付けカタログ';

// as を使うと、キー名を作り替えられます。
type ChangeHandlers<T> = {
  [K in keyof T & string as `on${Capitalize<K>}Changed`]: (value: T[K]) => void;
};

type Profile = {
  name: string;
  age: number;
};

const handlers: ChangeHandlers<Profile> = {
  onNameChanged: (value) => {
    const normalized = value.trim();
    void normalized;
  },
  onAgeChanged: (value) => {
    const isAdult = value >= 18;
    void isAdult;
  },
};

// インデックスシグネチャは、キー名が固定ではない辞書に使います。
// 存在しないキーを読む可能性があるので、値に undefined を含めると実態に近くなります。
type Dictionary = {
  [key: string]: string | undefined;
};

const dictionary: Dictionary = {
  ja: '日本語',
  en: '英語',
};

function translate(key: string): string {
  return dictionary[key] ?? '未翻訳';
}

export {};

