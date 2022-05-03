import { useRouter } from 'next/router'
import type { FC } from 'react'

import { useAuth } from '@/hooks/auth'

import { TopPresenter } from './TopPresenter'

export const TopContainer: FC = () => {
  const router = useRouter()
  const { isLoading: isUserLoading, isSignedIn } = useAuth()

  // 未ログインユーザーはログイン画面へ遷移
  if (!isUserLoading && !isSignedIn) {
    router.push('/auth/signin')
  }

  return <TopPresenter />
}
