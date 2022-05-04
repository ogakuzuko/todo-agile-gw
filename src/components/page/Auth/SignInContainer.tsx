import { useRouter } from 'next/router'
import type { FC } from 'react'

import { useAuth } from '@/hooks/auth'

import { SignInPresenter } from './SignInPresenter'

export const SignInContainer: FC = () => {
  const router = useRouter()
  const { isLoading, isSignedIn } = useAuth()

  if (!isLoading && isSignedIn) {
    router.push('/')
  }

  return <SignInPresenter />
}
