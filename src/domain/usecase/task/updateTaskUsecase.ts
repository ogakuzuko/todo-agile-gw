import { updateTask } from '@/domain/entity/Task'
import { FirebaseTaskClient } from '@/repositories/FirebaseTaskClient'
import type { Status, Task } from '@/types/task'

export const updateTaskUsecase = async (
  updatingTask: Task,
  originalTaskStatus: Status,
): Promise<void> => {
  const updatedTask = updateTask(updatingTask, originalTaskStatus)
  await FirebaseTaskClient.update(updatedTask)
}
