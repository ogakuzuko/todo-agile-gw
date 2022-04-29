import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import type { auth as firebaseUiAuth } from 'firebaseui'
import type { FC } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { auth } from '@/libs/firebase'

export const SignInForm: FC = () => {
  const uiConfig: firebaseUiAuth.Config = {
    signInFlow: 'popup',
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
      // TwitterAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/',
  }

  return <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
}
