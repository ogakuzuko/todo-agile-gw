import type {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'

import { TASK_STATUS, TASK_TYPE } from '@/constants/task'
import type { Status, Task, TaskType } from '@/types/task'
import { isPropertyAccessible } from '@/utils/isPropertyAccessible'

/**
 * FirestoreのドキュメントとTaskオブジェクトの型変換
 */
export const taskConverter: FirestoreDataConverter<Task> = {
  // FirestoreドキュメントデータをTaskオブジェクトへ変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Task => {
    const data = snapshot.data(options)

    if (!isValid(data)) {
      console.error('無効なデータです', data)
      throw new Error('無効なデータです')
    }

    // NOTE: TaskオブジェクトのidプロパティにはFirestoreドキュメントのidを入れる(?)
    return {
      id: snapshot.id,
      title: data.title,
      status: data.status,
      userId: data.userId,
      type: data.type,
      dueDate: data.dueDate,
      point: data.point,
    }
  },
  // TaskオブジェクトをFirestoreドキュメントデータへ変換
  // NOTE: FirestoreのPartialWithFieldValue<T>でTask型をオプショナルに変換（登録/更新兼用のため）
  toFirestore: (task: PartialWithFieldValue<Task>): DocumentData => {
    return {
      // NOTE: idはFirestoreのパスとして表現されるのでドキュメントデータには含めなくてよい(?)
      title: task.title,
      status: task.status,
      userId: task.userId,
      type: task.type,
      dueDate: task.dueDate,
      point: task.point,
      // FIXME: タスク追加は良いが、タスク更新の度にcreatedAtが更新されてしまうので修正したい
      createdAt: serverTimestamp(),
    }
  },
}

// Read(読み取り)用のドメインバリデーション
const isValid = (data: unknown): data is Task => {
  // プロパティアクセスできない可能性を排除
  if (!isPropertyAccessible(data)) return false

  // titleが存在していて且つ文字列であること
  if (!(data.title && typeof data.title === 'string')) {
    return false
  }

  // statusが存在していて且つStatus型の値であること
  if (!(data.status && TASK_STATUS.includes(data.status as Status))) {
    return false
  }

  // userIdが存在していて且つ文字列であること
  if (!(data.userId && typeof data.userId === 'string')) {
    return false
  }

  // typeが存在していて且つTaskType型の値であること
  if (!(data.type && TASK_TYPE.includes(data.type as TaskType))) {
    return false
  }

  // pointが存在する場合は、pointが数値であること
  if (data.point && typeof data.point !== 'number') {
    return false
  }

  return true
}
