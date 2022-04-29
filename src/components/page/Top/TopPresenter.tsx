import Head from 'next/head'
import type { FC } from 'react'

import { SignInOrOutButton } from '@/components/domain/auth'
import { Profile } from '@/components/domain/user/Profile'

export const TopPresenter: FC = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col">
          <p className="m-auto text-3xl font-bold underline">Hello AIKO!</p>
          <SignInOrOutButton />
          <Profile />
        </div>
      </main>
    </div>
  )
}
