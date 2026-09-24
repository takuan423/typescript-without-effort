// ブランド型は、同じ基本型を用途で区別したいときのテクニックです。
// 例: UserId も ProductId も実体は string だが、取り違えたくない場合。

type Brand<T, TName extends string> = T & { readonly __brand: TName };

type UserId = Brand<string, 'UserId'>;
type ProductId = Brand<string, 'ProductId'>;

function toUserId(value: string): UserId {
  if (!value.startsWith('u-')) {
    throw new Error('UserId は u- で始まる必要があります');
  }

  return value as UserId;
}

function toProductId(value: string): ProductId {
  if (!value.startsWith('p-')) {
    throw new Error('ProductId は p- で始まる必要があります');
  }

  return value as ProductId;
}

function findUserName(id: UserId): string {
  return `user=${id}`;
}

const userId = toUserId('u-1');
const productId = toProductId('p-1');
const userName = findUserName(userId);
// findUserName(productId); // 型エラー: ProductId を UserId として渡せません。

// unique symbol は、他と重ならないプロパティキーを型として表します。
// ライブラリ内部の目印など、通常のキーと衝突させたくない用途で使います。
const validated: unique symbol = Symbol('validated');

type Validated<T> = T & {
  readonly [validated]: true;
};

type Email = Validated<string>;

function validateEmail(value: string): Email {
  if (!value.includes('@')) {
    throw new Error('メールアドレスの形式ではありません');
  }

  return value as Email;
}

function sendEmail(to: Email, body: string): string {
  return `${to} に ${body.length} 文字を送信しました`;
}

const email = validateEmail('tanaka@example.com');
const sentMessage = sendEmail(email, 'こんにちは');

export {};

