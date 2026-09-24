// リテラル型は、特定の値そのものを型として扱います。
// ユニオン型は「この候補のどれか」を表します。

type Status = 'draft' | 'published' | 'archived';
type PageSize = 10 | 20 | 50;
type Identifier = string | number;

function normalizeId(id: Identifier): string {
  // typeof で分岐すると、そのブロック内で型が絞られます。
  if (typeof id === 'number') {
    return String(id);
  }

  return id.trim();
}

function statusLabel(status: Status): string {
  switch (status) {
    case 'draft':
      return '下書き';
    case 'published':
      return '公開済み';
    case 'archived':
      return '保管済み';
  }
}

// 判別可能なユニオンは、状態によって必要なデータが違う場合に向いています。
// status が見分けるための目印です。
type LoadResult =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function summarize(result: LoadResult): string {
  if (result.status === 'success') {
    return `${result.data.length}件取得しました`;
  }

  if (result.status === 'error') {
    return result.message;
  }

  return '読み込み中です';
}

// 全候補を扱ったか確認したいときは never を使います。
// Status に新しい候補を足したのに switch を更新し忘れると、ここで型エラーになります。
function strictStatusLabel(status: Status): string {
  switch (status) {
    case 'draft':
      return '下書き';
    case 'published':
      return '公開済み';
    case 'archived':
      return '保管済み';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

const id = normalizeId(123);
const message = summarize({ status: 'success', data: ['A', 'B'] });

export {};

