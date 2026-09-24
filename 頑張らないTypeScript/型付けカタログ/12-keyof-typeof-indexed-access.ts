// 既存の定義から型を取り出すと、同じ項目名や型を手で重複して書かずに済みます。

type Product = {
  id: number;
  name: string;
  price: number;
  status: 'draft' | 'published';
};

// keyof は、オブジェクト型のキーをユニオン型として取り出します。
type ProductKey = keyof Product; // 'id' | 'name' | 'price' | 'status'

function sortProducts(products: readonly Product[], key: ProductKey): Product[] {
  return [...products].sort((a, b) => String(a[key]).localeCompare(String(b[key])));
}

// インデックスアクセス型は、特定のプロパティの型を取り出します。
type ProductStatus = Product['status']; // 'draft' | 'published'
type ProductPrice = Product['price']; // number

function statusLabel(status: ProductStatus): string {
  return status === 'published' ? '公開済み' : '下書き';
}

// 型の文脈で使う typeof は、値から型を作ります。
const defaultSettings = {
  pageSize: 20,
  showArchived: false,
};

type Settings = typeof defaultSettings;

const settings: Settings = {
  pageSize: 50,
  showArchived: true,
};

// 配列やタプルから要素の型を取り出すには T[number] を使います。
const statuses = ['draft', 'published', 'archived'] as const;
type Status = (typeof statuses)[number];

function isStatus(value: string): value is Status {
  return (statuses as readonly string[]).includes(value);
}

// T[K] を使うと、指定したキーに対応する値の型を保てます。
function getProperty<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

const product: Product = {
  id: 1,
  name: 'ノート',
  price: 1200,
  status: 'published',
};

const productName = getProperty(product, 'name'); // string
const productPrice = getProperty(product, 'price'); // number

export {};

