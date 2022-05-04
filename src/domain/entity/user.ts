import type { User } from '@/types/user'

export const createUser = (user: User): User => {
  const userNameLength = user.name?.length

  // TODO: 登録しようとしているユーザーデータが正しいデータであることを保証する
  if (!user.id) {
    // ユーザーIDがないよエラー
    console.error('ユーザーIDが存在しません')
  }

  if (userNameLength && userNameLength > 30) {
    // ユーザー名が30文字を超えているよエラー
    console.error('ユーザー名が1文字を超えています')
  }

  return user
}

export const updateUser = (): void => {
  return
}
