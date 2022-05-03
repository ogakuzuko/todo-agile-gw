import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { auth } from '@/libs/firebase'

type AuthState = {
  isSignedIn: boolean
  isLoading: boolean
  userId: string | undefined
  userName: string | undefined
}

const INITIAL_AUTH_STATE: AuthState = {
  isSignedIn: false,
  isLoading: true,
  userId: undefined,
  userName: undefined,
}

/**
 * ユーザーのサインイン状態を取得するためのカスタムフック
 */
export const useAuthState = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_AUTH_STATE)

  useEffect(() => {
    // サインイン状態の変化を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          isSignedIn: true,
          isLoading: false,
          userId: user.uid,
          userName: user.displayName || undefined,
        })
        console.log('useAuthState.tsx:', user)
      } else {
        setAuthState({ ...INITIAL_AUTH_STATE, isLoading: false })
      }
    })

    // ページ遷移時にサインイン状態の監視を解除
    return () => unsubscribe()
  }, [])

  return authState
}
