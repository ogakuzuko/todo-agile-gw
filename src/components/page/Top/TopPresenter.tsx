import type { FC } from 'react'

import { SignInOrOutButton } from '@/components/domain/auth'
import { Profile } from '@/components/domain/user/Profile'

export const TopPresenter: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-3xl font-bold">Hello AIKO!</p>
      <SignInOrOutButton />
      <Profile />
    </div>
  )
}
