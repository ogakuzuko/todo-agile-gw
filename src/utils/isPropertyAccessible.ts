// オブジェクトが存在するかどうか（プロパティにアクセス出来るかどうか）を判定する関数
export const isPropertyAccessible = (value: unknown): value is Record<string, undefined> => {
  // NOTE: 以下は value !== null && value !== undefinedと等価
  return value != null
}
