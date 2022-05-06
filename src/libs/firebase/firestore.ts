import { getApp } from 'firebase/app'
import type { Firestore } from 'firebase/firestore'
import { initializeFirestore } from 'firebase/firestore'
// import { getFirestore } from 'firebase/firestore'

// 通常のFirestore呼び出し
// export const firestore: Firestore = getFirestore(getApp())

// NOTE: 追加/更新しようとしてるドキュメントに undefined のフィールドがある場合、それを例外とせずに無視してくれる設定を持たせたFirestoreの呼び出し方法（但し懸念事項あり。下記事参照）
// https://stackoverflow.com/questions/69014671/firebase-firestore-v9-best-practices-ignoreundefinedproperties-vs-conditional
export const firestore: Firestore = initializeFirestore(getApp(), {
  ignoreUndefinedProperties: true,
})
