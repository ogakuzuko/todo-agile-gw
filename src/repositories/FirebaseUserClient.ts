import { doc, getDoc, setDoc } from 'firebase/firestore'

import { firestore } from '@/libs/firebase'
import { userConverter } from '@/libs/firebase/converter/userConverter'
import type { User, UserRepository } from '@/types/user'

export const FirebaseUserClient: UserRepository = {
  get: async (userId: string): Promise<User | undefined> => {
    const userDocRef = doc(firestore, 'users', userId).withConverter(userConverter)
    const userSnapshot = await getDoc(userDocRef)
    const user = userSnapshot.data()
    return user
  },
  create: async (user: User): Promise<void> => {
    const userDocRef = doc(firestore, 'users', user.id).withConverter(userConverter) // IDを指定してドキュメントの参照を作成
    await setDoc(userDocRef, user, { merge: true }) // { merge: true }を指定して、差分のあるフィールドのみを上書き
  },
}
