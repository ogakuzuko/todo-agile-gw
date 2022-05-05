import type { Dayjs } from 'dayjs'

import type { TASK_STATUS, TASK_TYPE } from '@/constants/task'

export type Status = typeof TASK_STATUS[number]

export type TaskType = typeof TASK_TYPE[number]

export type Task = {
  id: string
  title: string
  status: Status
  userId: string
  type: TaskType
  dueDate?: Dayjs
  point?: number
}

export type NewTask = Omit<Task, 'id' | 'status'>
