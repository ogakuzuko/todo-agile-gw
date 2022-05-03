import type { FC } from 'react'

import { useAuth } from '@/hooks/auth'

export const Profile: FC = () => {
  const { userId, userName } = useAuth()

  return (
    <div className="w-96 font-semibold bg-orange-300">
      <h1>Profile</h1>
      <p>{userId ? userId : 'ユーザーIDが存在しません'}</p>
      <p>{userName ? userName : 'ユーザー名が存在しません'}</p>
    </div>
  )
}
