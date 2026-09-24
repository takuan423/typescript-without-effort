// 基本型は「1つの値がどんな種類か」を表します。
// 実務では初期値から明らかな型は推論に任せ、引数や公開する戻り値に型を書くことが多いです。

const productName = 'ノート'; // string と推論される
const price = 1200; // number と推論される
const isPublished = true; // boolean と推論される

// 型注釈は「この変数にはこの型の値を入れる」と明示する書き方です。
// サンプルとして明示していますが、上の3つのように推論できるなら省略して構いません。
const description: string = '罫線入りのノート';
const stock: number = 30;
const canOrder: boolean = stock > 0;

// number は整数と小数を区別しません。
// 0以上の整数など、より細かい条件は型だけでなく実行時のチェックも必要です。
function calculateTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

// bigint は number で安全に扱いにくい大きな整数に使います。
// number と bigint はそのまま足し算できないため、どちらを使うかを揃えます。
const largeId: bigint = 9007199254740993n;

// symbol は他のキーと衝突しない目印を作りたいときに使います。
const cacheKey: symbol = Symbol('product-cache');
const cache = {
  [cacheKey]: 'cached value',
};

// 型エイリアスは、既存の型に用途の名前を付けます。
// ただし UserName は実行時に特別な値へ変わるわけではなく、通常の string として扱われます。
type UserName = string;

function greet(name: UserName): string {
  return `こんにちは、${name}さん`;
}

// 型は入力内容を自動検証しません。
// 空文字を禁止したいなら、型注釈とは別に条件分岐で確認します。
function greetNonEmptyName(name: string): string {
  if (name.trim() === '') {
    return '名前を入力してください';
  }

  return greet(name);
}

const total = calculateTotal(price, 2);
const greeting = greetNonEmptyName('田中');

export {};

