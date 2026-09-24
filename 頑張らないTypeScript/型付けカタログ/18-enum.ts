// enum は、名前付きの定数群を作る TypeScript の構文です。
// 実行時にもオブジェクトとして出力されるため、プロジェクト方針に合わせて使います。

enum OrderStatus {
  Draft = 'draft',
  Paid = 'paid',
  Shipped = 'shipped',
}

function orderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Draft:
      return '下書き';
    case OrderStatus.Paid:
      return '支払い済み';
    case OrderStatus.Shipped:
      return '発送済み';
  }
}

const status = OrderStatus.Paid;
const label = orderStatusLabel(status);

// 代替案として、as const のオブジェクトから型を作る方法があります。
// JavaScript としても読みやすく、値と型を近くに置けます。
const PaymentStatus = {
  Waiting: 'waiting',
  Completed: 'completed',
  Failed: 'failed',
} as const;

type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

function paymentStatusLabel(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.Waiting:
      return '入金待ち';
    case PaymentStatus.Completed:
      return '完了';
    case PaymentStatus.Failed:
      return '失敗';
  }
}

const paymentLabel = paymentStatusLabel(PaymentStatus.Completed);

// enum は外部 API の文字列と対応させる場合、値が一致しているかを意識します。
// API から来た unknown な値を enum として扱う前には、検証を挟みます。
function isOrderStatus(value: unknown): value is OrderStatus {
  return Object.values(OrderStatus).includes(value as OrderStatus);
}

export {};

