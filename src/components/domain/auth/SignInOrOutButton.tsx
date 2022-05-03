import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { useAuth } from '@/hooks/auth'
import { auth } from '@/libs/firebase'

export const SignInOrOutButton: FC = () => {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  if (isSignedIn) {
    // eslint-disable-next-line react/jsx-handler-names
    return (
      <button className="w-20 bg-teal-300" onClick={() => signOut(auth)}>
        SignOut
      </button>
    )
  } else {
    // eslint-disable-next-line react/jsx-handler-names
    return (
      <button className="w-20 bg-teal-300" onClick={() => router.push('/auth/signin')}>
        SignIn
      </button>
    )
  }
}
