import type { LoaderProps } from '@mantine/core'
import { Loader as MantineLoader } from '@mantine/core'
import type { FC } from 'react'

export const Loader: FC<LoaderProps> = (props) => {
  return (
    // ローディング背景用div
    <div className="h-screen bg-orange-200/30">
      <MantineLoader
        size="lg"
        color="pink"
        variant="bars"
        {...props}
        // ローディングアイコンの中央寄せ
        className="fixed inset-0 z-50 m-auto"
      />
    </div>
  )
}
