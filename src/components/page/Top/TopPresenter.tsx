import type { FC } from 'react'

import { TaskList } from '@/components/domain/task/TaskList'
import type { Task } from '@/types/task'

type TopPresenterProps = {
  tasks: Task[]
}

export const TopPresenter: FC<TopPresenterProps> = ({ tasks }) => {
  return <TaskList tasks={tasks} />
}
