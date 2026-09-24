// ジェネリクスは、型の一部だけを後から差し替えられるようにする仕組みです。
// 「形は同じだが、中身の型だけ違う」場面で使います。

type Page<T> = {
  items: T[];
  total: number;
};

type Product = {
  id: number;
  name: string;
};

const productPage: Page<Product> = {
  items: [{ id: 1, name: 'ノート' }],
  total: 1,
};

// 渡した配列の要素型と、戻り値の型の関係を保てます。
function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}

const firstName = first(['田中', '佐藤']); // string | undefined
const firstScore = first([80, 95]); // number | undefined

// extends は、型引数に必要な条件を付けます。
// id を読む処理なので、少なくとも id: string を持つ値だけ受け取ります。
function getId<T extends { id: string }>(value: T): string {
  return value.id;
}

const userId = getId({ id: 'u-1', name: '田中' });

// 型引数には既定値を指定できます。
// Entity とだけ書いた場合、TId は string として扱われます。
type Entity<TId = string> = {
  id: TId;
};

type StringEntity = Entity;
type NumberEntity = Entity<number>;

// キーと値の関係を保つ例です。
// key に name を渡すと string、stock を渡すと number が戻り値になります。
function pickValue<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

const product = { name: 'ノート', stock: 30 };
const pickedName = pickValue(product, 'name');
const pickedStock = pickValue(product, 'stock');

// ジェネリクスは必要な関係があるときに使います。
// 単に Product だけを扱う関数なら、無理に T を導入しないほうが読みやすいです。
function productLabel(product: Product): string {
  return `${product.id}: ${product.name}`;
}

export {};

