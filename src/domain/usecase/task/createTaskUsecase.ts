import { createTask } from '@/domain/entity/task'
import { FirebaseTaskClient } from '@/repositories/FirebaseTaskClient'
import type { NewTask } from '@/types/task'

export const createTaskUsecase = async (task: NewTask): Promise<void> => {
  const createdTask = createTask(task)
  await FirebaseTaskClient.create(createdTask)
}
