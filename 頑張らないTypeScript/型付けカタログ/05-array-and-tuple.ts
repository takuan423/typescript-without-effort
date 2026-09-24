// 配列は「同じ種類の値が複数並ぶ」ことを表します。
// T[] と Array<T> はほぼ同じ意味です。

const names: string[] = ['田中', '佐藤'];
const scores: Array<number> = [80, 95, 72];

// 空配列は要素の型が分かりにくいため、意図する型を明示すると安全です。
type Task = {
  id: number;
  title: string;
};

const tasks: Task[] = [];
tasks.push({ id: 1, title: '型のサンプルを読む' });

// readonly number[] は、引数として受け取った配列を変更しない約束を表します。
function average(values: readonly number[]): number {
  if (values.length === 0) return 0;

  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

// タプルは「位置ごとに意味が決まっている配列」です。
// x と y は説明用のラベルで、point.x のようには取り出せません。
type Point = [x: number, y: number];
const point: Point = [10, 20];

// 省略可能な位置を持つタプルです。
type SearchQuery = [keyword: string, limit?: number];
const defaultQuery: SearchQuery = ['TypeScript'];
const limitedQuery: SearchQuery = ['TypeScript', 20];

// 可変長タプルは、先頭だけ必須で、その後ろに同じ型の値が続く形を表せます。
type Route = [start: string, ...stops: string[]];
const route: Route = ['東京', '名古屋', '大阪'];

// タプルの位置が増えて読みづらくなったら、オブジェクトのほうが向いています。
type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const area = (rect: Rectangle): number => rect.width * rect.height;

const scoreAverage = average(scores);
const routeStart = route[0];

export {};

