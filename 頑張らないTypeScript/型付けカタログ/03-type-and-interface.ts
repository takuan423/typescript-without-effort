// type と interface は、オブジェクトの形に名前を付ける代表的な書き方です。
// 多くの場面でどちらでも表現できます。チームの規約があればそれを優先します。

type Product = {
  id: number;
  name: string;
  price: number;
};

// interface は extends でオブジェクトの契約を拡張しやすいです。
interface NamedItem {
  id: number;
  name: string;
}

interface StockItem extends NamedItem {
  stock: number;
}

const notebook: Product = {
  id: 1,
  name: 'ノート',
  price: 1200,
};

const stockItem: StockItem = {
  id: 1,
  name: 'ノート',
  stock: 30,
};

// TypeScript は基本的に「名前」ではなく「形」が合うかを見ます。
// Product と NamedItem は別名ですが、id と name が揃っているので NamedItem として扱えます。
function labelOf(item: NamedItem): string {
  return `${item.id}: ${item.name}`;
}

const label = labelOf(notebook);

// type はユニオン型やタプルなど、オブジェクト以外にも名前を付けられます。
type ProductStatus = 'draft' | 'published' | 'archived';
type PriceRange = [min: number, max: number];

// interface は同名宣言のマージができます。
// ライブラリ拡張などでは便利ですが、通常のアプリでは意図しない拡張を避けるため慎重に使います。
interface AppConfig {
  appName: string;
}

interface AppConfig {
  version: string;
}

const config: AppConfig = {
  appName: '型付けカタログ',
  version: '1.0.0',
};

export {};

