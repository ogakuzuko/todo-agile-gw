import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'

import type { User } from '@/types/user'

/**
 * FirestoreのドキュメントとUserオブジェクトの型変換
 */
export const userConverter: FirestoreDataConverter<User> = {
  // FirestoreドキュメントデータをUserオブジェクトへ変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User => {
    const data = snapshot.data(options)
    // NOTE: UserオブジェクトのidプロパティにはFirestoreドキュメントのidを入れる(?)
    return {
      id: snapshot.id,
      name: data.name,
    }
  },
  // UserオブジェクトをFirestoreドキュメントデータへ変換
  toFirestore: (user: User): DocumentData => {
    return {
      // NOTE: idはFirestoreのパスとして表現されるのでドキュメントデータには含めなくてよい(?)
      name: user.name,
      createdAt: serverTimestamp(),
    }
  },
}
