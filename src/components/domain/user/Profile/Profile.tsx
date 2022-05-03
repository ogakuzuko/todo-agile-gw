import type { FC } from 'react'

import { useAuthState } from '@/hooks/auth/useAuthState'

export const Profile: FC = () => {
  const { userId, userName } = useAuthState()
  return (
    <div className="text-center">
      <h1>Profile</h1>
      <p>{userId ? userId : 'ユーザーIDが存在しません'}</p>
      <p>{userName ? userName : 'ユーザー名が存在しません'}</p>
    </div>
  )
}
