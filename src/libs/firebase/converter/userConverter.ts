import type {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'

import type { User } from '@/types/user'
import { isPropertyAccessible } from '@/utils/isPropertyAccessible'

/**
 * FirestoreのドキュメントとUserオブジェクトの型変換
 */
export const userConverter: FirestoreDataConverter<User> = {
  // FirestoreドキュメントデータをUserオブジェクトへ変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User => {
    const data = snapshot.data(options)

    if (!isValid(data)) {
      console.error('無効なデータです', data)
      throw new Error('無効なデータです')
    }

    // NOTE: UserオブジェクトのidプロパティにはFirestoreドキュメントのidを入れる(?)
    return {
      id: snapshot.id,
      name: data.name,
    }
  },
  // UserオブジェクトをFirestoreドキュメントデータへ変換
  toFirestore: (user: PartialWithFieldValue<User>): DocumentData => {
    return {
      // NOTE: idはFirestoreのパスとして表現されるのでドキュメントデータには含めなくてよい(?)
      name: user.name,
      createdAt: serverTimestamp(),
    }
  },
}

const isValid = (data: unknown): data is User => {
  // プロパティアクセスできない可能性を排除
  if (!isPropertyAccessible(data)) return false

  // nameが存在する場合は、nameが文字列であること
  if (data.name && typeof data.name !== 'string') {
    return false
  }

  return true
}
