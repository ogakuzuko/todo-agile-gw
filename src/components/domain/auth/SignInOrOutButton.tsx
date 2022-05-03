import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { useAuthState } from '@/hooks/auth'
import { auth } from '@/libs/firebase'

export const SignInOrOutButton: FC = () => {
  const { isSignedIn } = useAuthState()
  const router = useRouter()

  if (isSignedIn) {
    // eslint-disable-next-line react/jsx-handler-names
    return <button onClick={() => signOut(auth)}>SignOut</button>
  } else {
    // eslint-disable-next-line react/jsx-handler-names
    return <button onClick={() => router.push('/auth/signin')}>SignIn</button>
  }
}
