// ユーティリティ型は、TypeScript が用意している型加工の道具です。
// 実データを変更するものではなく、型の見え方を変えます。

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
  deletedAt: Date | null;
};

// Omit は指定したプロパティを型から除きます。
// 新規作成時は id や deletedAt をサーバー側で決める想定にできます。
type CreateUserInput = Omit<User, 'id' | 'deletedAt'>;

// Pick は指定したプロパティだけを選びます。
type UserSummary = Pick<User, 'id' | 'name'>;

// Partial はすべてのプロパティを省略可能にします。
// 更新 API で「変更した項目だけ渡す」形に向いています。
type UpdateUserInput = Partial<Pick<User, 'name' | 'email' | 'role'>>;

// Required は省略可能プロパティを必須にします。
type DraftArticle = {
  title?: string;
  body?: string;
};

type ReadyArticle = Required<DraftArticle>;

// Readonly は各プロパティを読み取り専用にします。
type ReadonlyUser = Readonly<User>;

// Record はキーの候補と値の型を指定して対応表を作ります。
type Role = User['role'];
const roleLabels: Record<Role, string> = {
  admin: '管理者',
  member: 'メンバー',
};

// Exclude はユニオン型から条件に合う候補を除きます。
type ActiveRole = Exclude<Role | 'guest', 'guest'>;

// Extract はユニオン型から条件に合う候補だけを残します。
type AdminOnly = Extract<Role, 'admin'>;

// NonNullable は null と undefined を除きます。
type DeletedAt = User['deletedAt'];
type ExistingDeletedAt = NonNullable<DeletedAt>; // Date

function createUser(input: CreateUserInput): User {
  return {
    id: 1,
    deletedAt: null,
    ...input,
  };
}

function updateUser(user: User, input: UpdateUserInput): User {
  return {
    ...user,
    ...input,
  };
}

// Parameters は関数の引数型をタプルで取り出します。
// ReturnType は戻り値の型を取り出します。
type UpdateUserArgs = Parameters<typeof updateUser>;
type UpdatedUser = ReturnType<typeof updateUser>;

// Awaited は Promise の解決後の型を取り出します。
async function fetchUsers(): Promise<User[]> {
  return [createUser({ name: '田中', email: 'tanaka@example.com', role: 'member' })];
}

type FetchedUsers = Awaited<ReturnType<typeof fetchUsers>>;

export {};

