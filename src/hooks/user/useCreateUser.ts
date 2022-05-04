import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'

import { createUserUsecase } from '@/domain/usecase/user'
import { auth, firestore } from '@/libs/firebase'

// Firestoreへのユーザー登録を行なうカスタムフック
export const useCreateUser = (): void => {
  const [isUserCreated, setIsUserCreated] = useState(false)

  // ユーザー登録されている場合は何もしない
  if (isUserCreated) return

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid)
      const userSnapshot = await getDoc(userDocRef)

      if (userSnapshot.exists()) {
        setIsUserCreated(true)
      }

      // ユーザーが存在しない場合はFirestoreにユーザーデータを作成する
      if (!userSnapshot.exists()) {
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
}
