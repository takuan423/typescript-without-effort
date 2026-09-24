// as const は、値をできるだけ具体的なリテラル型として固定します。
// 定数の一覧からユニオン型を作りたいときによく使います。

const statuses = ['draft', 'published', 'archived'] as const;
type Status = (typeof statuses)[number];

function isStatus(value: string): value is Status {
  return (statuses as readonly string[]).includes(value);
}

// オブジェクトに as const を付けると、プロパティも readonly かつ具体的な値になります。
const routes = {
  home: '/',
  users: '/users',
  settings: '/settings',
} as const;

type RouteName = keyof typeof routes;
type RoutePath = (typeof routes)[RouteName];

// satisfies は「この型を満たすか」を確認しつつ、値自身の具体的な型を保ちます。
type StatusLabelMap = Record<Status, string>;

const labels = {
  draft: '下書き',
  published: '公開済み',
  archived: '保管済み',
} satisfies StatusLabelMap;

// labels.draft は string として扱われますが、
// キーの不足や余分なキーは Record<Status, string> として確認されます。
function labelOf(status: Status): string {
  return labels[status];
}

// 型アサーション as は、TypeScript に「この型として扱う」と伝えます。
// 検証は行わないため、根拠がある場所に限定します。
function routePath(name: string): RoutePath | undefined {
  if (name in routes) {
    return routes[name as RouteName];
  }

  return undefined;
}

// const アサーションと satisfies を組み合わせると、設定一覧を安全に持てます。
const menuItems = [
  { label: 'ホーム', path: routes.home },
  { label: 'ユーザー', path: routes.users },
] as const satisfies readonly { label: string; path: RoutePath }[];

const firstMenuPath = menuItems[0].path;

export {};

