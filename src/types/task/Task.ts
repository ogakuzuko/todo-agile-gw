import type { Dayjs } from 'dayjs'

export type Status =
  | 'BEFORE_START'
  | 'STARTED'
  | 'DEV_FINISHED'
  | 'VER_DEPLOYED'
  | 'TEST_OK'
  | 'TEST_NG'
  | 'RELEASED'

export type TaskType = 'FEATURE' | 'CHORE' | 'BUG'

export type Task = {
  id: number
  title: string
  status: Status
  userId: string
  type: TaskType
  dueDate: Dayjs
  point: number
}
