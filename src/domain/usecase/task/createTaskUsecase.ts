import { createTask } from '@/domain/entity/Task'
import { FirebaseTaskClient } from '@/repositories/FirebaseTaskClient'
import type { NewTask } from '@/types/task'

export const createTaskUsecase = async (task: NewTask): Promise<void> => {
  const createdTask = createTask(task)
  await FirebaseTaskClient.create(createdTask)
}
