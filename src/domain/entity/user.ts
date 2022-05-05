import type { User } from '@/types/user'

export const createUser = (user: User): User => {
  const userNameLength = user.name?.length

  // ユーザーIDが存在しない場合はエラー
  if (!user.id) {
    console.error('ユーザーIDは必須です')
    throw new Error('ユーザーIDは必須です')
  }

  // ユーザー名が文字列以外である場合はエラー
  if (user.name && typeof user.name !== 'string') {
    console.error('ユーザー名は文字列である必要があります')
    throw new Error('ユーザー名は文字列である必要があります')
  }

  // ユーザー名が30文字を超えている場合はエラー
  if (userNameLength && userNameLength > 30) {
    console.error('ユーザー名は30文字以内である必要があります')
    throw new Error('ユーザー名は30文字以内である必要があります')
  }

  return user
}

export const updateUser = (): void => {
  return
}
