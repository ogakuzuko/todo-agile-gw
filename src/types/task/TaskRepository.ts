import type { NewTask, Task } from './Task'

export type TaskRepository = {
  get: (taskId: string) => Promise<Task | undefined>
  getList: (userId: string) => Promise<Task[]>
  create: (task: NewTask) => Promise<void>
  update: (task: Task) => Promise<void>
  delete: (taskId: string) => Promise<void>
}
