import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/auth'
import { auth } from '@/libs/firebase'

export const SignInOrOutButton: FC = () => {
  const router = useRouter()
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    // eslint-disable-next-line react/jsx-handler-names
    return (
      <Button compact variant="subtle" color="red" onClick={() => signOut(auth)}>
        SignOut
      </Button>
    )
  } else {
    // eslint-disable-next-line react/jsx-handler-names
    return (
      <Button compact variant="subtle" color="orange" onClick={() => router.push('/auth/signin')}>
        SignIn
      </Button>
    )
  }
}
