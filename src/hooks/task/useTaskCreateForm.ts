import { useForm } from '@mantine/form'
import { useCallback, useEffect } from 'react'

import { createTaskUsecase } from '@/domain/usecase/task'
import { useAuth } from '@/hooks/auth'
import type { NewTask } from '@/types/task'

export const useTaskCreateForm = () => {
  const { userId } = useAuth()
  const { onSubmit, getInputProps, setFieldValue, values } = useForm<NewTask>({
    initialValues: {
      title: '',
      status: 'BEFORE_START',
      userId: '',
      type: 'FEATURE',
      dueDate: undefined,
      point: undefined,
    },
  })

  const handleSubmit = useCallback(
    async (values: NewTask) => {
      try {
        const taskData = { ...values, userId: userId ?? '' }
        await createTaskUsecase(taskData)
      } catch (err) {
        console.error('タスクの登録に失敗しました', err)
        // TODO: タスク登録に失敗した旨のエラートーストを出す
      }
    },
    [userId],
  )

  useEffect(() => {
    // 課題のタイプがFEATURE以外で、dueDateとpointの値が設定されている場合、それらの値をリセットする
    if (values.type !== 'FEATURE' && (values.dueDate || values.point)) {
      setFieldValue('dueDate', undefined)
      setFieldValue('point', undefined)
    }
  }, [values.type, values.dueDate, values.point, setFieldValue])

  return { onSubmit, getInputProps, values, handleSubmit }
}
