// クラスは、インスタンスが持つプロパティとメソッドの型をまとめて表せます。
// constructor の引数にも型を付けます。

class User {
  constructor(
    readonly id: string,
    public name: string,
  ) {}

  rename(name: string): void {
    this.name = name;
  }

  displayName(): string {
    return `${this.id}: ${this.name}`;
  }
}

const user = new User('u-1', '田中');
user.rename('佐藤');

// コンストラクター型は「new できるもの」を受け取る関数で使います。
type UserConstructor = new (id: string, name: string) => User;

function createDefaultUser(Constructor: UserConstructor): User {
  return new Constructor('u-default', 'ゲスト');
}

const guest = createDefaultUser(User);

// InstanceType は、クラスからインスタンスの型を取り出します。
type UserInstance = InstanceType<typeof User>;

function formatUser(user: UserInstance): string {
  return user.displayName();
}

// 呼び出し可能な型は、関数にプロパティも持たせたい場合に使えます。
type Counter = {
  (): number;
  reset(): void;
  current: number;
};

function createCounter(): Counter {
  const counter = (() => {
    counter.current += 1;
    return counter.current;
  }) as Counter;

  counter.current = 0;
  counter.reset = () => {
    counter.current = 0;
  };

  return counter;
}

const counter = createCounter();
const first = counter();
counter.reset();

// this を使う関数では、this の型を明示できます。
// 通常のコールバックでは this を使わない書き方のほうが扱いやすいことも多いです。
type NameFormatter = {
  prefix: string;
  format(this: NameFormatter, name: string): string;
};

const formatter: NameFormatter = {
  prefix: '名前',
  format(name) {
    return `${this.prefix}: ${name}`;
  },
};

export {};

