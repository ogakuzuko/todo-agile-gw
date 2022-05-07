import { Title } from '@mantine/core'
import type { FC } from 'react'

import type { Task } from '@/types/task'

import { TaskListItem } from '../TaskListItem'

type TaskListProps = {
  tasks: Task[]
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      <Title order={4} mb={8} pl={5}>
        課題一覧
      </Title>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
