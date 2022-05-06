import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'

import { firestore } from '@/libs/firebase'
import { taskConverter } from '@/libs/firebase/converter/taskConverter'
import type { NewTask, Task, TaskRepository } from '@/types/task'

export const FirebaseTaskClient: TaskRepository = {
  get: async (taskId: string): Promise<Task | undefined> => {
    const taskDocRef = doc(firestore, 'tasks', taskId).withConverter(taskConverter)
    const taskSnapshot = await getDoc(taskDocRef)
    const task = taskSnapshot.data()
    return task
  },
  getList: async (userId: string): Promise<Task[]> => {
    const tasksCollectionRef = collection(firestore, 'tasks').withConverter(taskConverter) // コレクションへの参照を作成
    const tasksSnapshot = await getDocs(query(tasksCollectionRef, where('userId', '==', userId)))
    // NOTE: taskConverterでid差し込んでいるので、{ ...doc.data(), id: doc.id } こう書く必要がない
    const tasks = tasksSnapshot.docs.map((doc) => doc.data())
    return tasks
  },
  create: async (task: NewTask): Promise<void> => {
    const tasksCollectionRef = collection(firestore, 'tasks').withConverter(taskConverter)
    await addDoc(tasksCollectionRef, task)
  },
  update: async (task: Task): Promise<void> => {
    const taskDocRef = doc(firestore, 'tasks', task.id).withConverter(taskConverter)
    await setDoc(taskDocRef, task)
  },
  delete: async (): Promise<void> => {
    return
  },
}
