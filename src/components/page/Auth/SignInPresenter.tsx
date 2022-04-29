import type { FC } from 'react'

import { SignInForm } from '@/components/domain/auth'

export const SignInPresenter: FC = () => {
  return (
    <div className="mt-60">
      <SignInForm />
    </div>
  )
}
