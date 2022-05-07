import { Badge, Paper, Text } from '@mantine/core'
import type { FC } from 'react'

import { TaskUpdateForm } from '@/components/domain/task/TaskUpdateForm'
import { Modal } from '@/components/ui/Modal'
import type { Task } from '@/types/task'

type TaskListItemProps = {
  task: Task
}

export const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  return (
    <Paper shadow="xs" p="sm">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Text>{task.title}</Text>
          <Badge color="pink" radius="xs">
            {task.status}
          </Badge>
          <Badge color="green">{task.type}</Badge>
        </div>
        <Modal
          content={<TaskUpdateForm taskId={task.id} />}
          openButtonText="編集"
          modalTitle="課題の編集"
        />
      </div>
    </Paper>
  )
}
