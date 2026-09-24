// 「値がない」ことを表す代表的な方法は null、undefined、省略可能プロパティです。
// strictNullChecks が有効な前提では、値がない可能性を型に含めないと代入できません。

type Profile = {
  name: string;

  // ? は「プロパティ自体を省略できる」という意味です。
  // 読むときは string | undefined として扱います。
  nickname?: string;

  // avatarUrl は必ず項目として存在するが、画像がない場合は null になる、という約束です。
  avatarUrl: string | null;
};

const profile: Profile = {
  name: '田中',
  avatarUrl: null,
};

// ?? は左側が null または undefined のときだけ右側を使います。
function displayNickname(nickname: string | undefined): string {
  return nickname ?? 'ニックネームなし';
}

// Optional chaining は、途中が null または undefined ならそこで止まります。
function avatarFileName(user: Profile | null): string {
  const url = user?.avatarUrl;

  if (url === null || url === undefined) {
    return '画像なし';
  }

  return url.split('/').at(-1) ?? '画像なし';
}

// null は「意図的に空」を表す用途で使われることが多いです。
// 例: まだユーザーが選ばれていない状態。
let selectedUser: Profile | null = null;
selectedUser = profile;

// undefined は「未指定」「まだ代入されていない」に近い意味で使われることが多いです。
let lastSearchKeyword: string | undefined;
lastSearchKeyword = 'typescript';

// exactOptionalPropertyTypes が有効な場合、
// { nickname: undefined } と {} は区別されます。
const withoutNickname: Profile = {
  name: '佐藤',
  avatarUrl: 'https://example.com/avatar.png',
};

// 値があることを確認した後のブロックでは、TypeScript が型を絞ってくれます。
function requireAvatar(profile: Profile): string {
  if (profile.avatarUrl === null) {
    return '画像を登録してください';
  }

  // ここでは profile.avatarUrl は string として扱えます。
  return profile.avatarUrl;
}

export {};

