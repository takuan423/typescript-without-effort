// インターセクション型は「A と B の条件を両方満たす」型です。
// オブジェクトの項目を組み合わせたいときによく使います。

type User = {
  id: number;
  name: string;
};

type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type StoredUser = User & Timestamps;

const storedUser: StoredUser = {
  id: 1,
  name: '田中',
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-02T00:00:00Z'),
};

// 型を組み合わせても、実際の値が自動で増えるわけではありません。
// createdAt や updatedAt は値を作る処理で用意します。
function attachTimestamps<T extends object>(value: T): T & Timestamps {
  const now = new Date();
  return {
    ...value,
    createdAt: now,
    updatedAt: now,
  };
}

const newUser = attachTimestamps({ id: 2, name: '佐藤' });

// 同じプロパティ名で矛盾した型を交差させると、そのプロパティは never になります。
// never は「当てはまる値がない」型です。
type StringId = { id: string };
type NumberId = { id: number };
type ImpossibleId = StringId & NumberId;

// 実務で項目の型を変更したい場合は、交差で上書きするのではなく Omit で除いてから足します。
type ApiUser = {
  id: number;
  name: string;
};

type ViewUser = Omit<ApiUser, 'id'> & {
  id: string;
};

const viewUser: ViewUser = {
  id: 'user-1',
  name: '田中',
};

export {};

