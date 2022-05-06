import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { createUserUsecase } from '@/domain/usecase/user'
import { auth } from '@/libs/firebase'
import { FirebaseUserClient } from '@/repositories/FirebaseUserClient'

// Firestoreへのユーザー登録を行なうカスタムフック
export const useCreateUser = (): void => {
  const [isUserCreated, setIsUserCreated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // 既にユーザー登録されている場合は何もしない
      if (isUserCreated) return

      if (user) {
        const firestoreUserData = await FirebaseUserClient.get(user.uid)

        if (firestoreUserData) {
          setIsUserCreated(true)
        }

        // ユーザーが存在しない場合はFirestoreにユーザーデータを作成する
        if (!firestoreUserData) {
          try {
            const userData = { id: user.uid, name: user.displayName ?? undefined }
            await createUserUsecase(userData)
            setIsUserCreated(true)
          } catch (err) {
            console.error('firestoreへのユーザー登録に失敗しました', err)
          }
        }
      }
    })

    return () => unsubscribe()
  }, [isUserCreated])
}
