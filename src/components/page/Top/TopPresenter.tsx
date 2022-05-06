import type { FC } from 'react'

import { Profile } from '@/components/domain/user/Profile'

export const TopPresenter: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Profile />
    </div>
  )
}
