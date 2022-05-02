import type { Dayjs } from 'dayjs'

export type Status =
  | 'BEFORE_START'
  | 'START'
  | 'DEV_FINISHED'
  | 'VER_DEPLOYED'
  | 'TEST_OK'
  | 'TEST_NG'
  | 'RELEASED'

export type TaskType = 'FEATURE' | 'CHORE' | 'BUG'

export type Task = {
  id: string
  userId: string
  title: string
  status: Status
  type: TaskType
  dueDate: Dayjs
  point: number
}
