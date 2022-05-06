import { useForm, zodResolver } from '@mantine/form'
import { useCallback, useEffect } from 'react'
import { z } from 'zod'

import { updateTaskUsecase } from '@/domain/usecase/task'
import { useAuth } from '@/hooks/auth'
import type { Task } from '@/types/task'

import { useTask } from './useTask'

const schema = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: '課題の要約は必須です',
      invalid_type_error: '課題の要約は文字列である必要があります',
    })
    .min(3, { message: '課題の要約は3文字以上である必要があります' })
    .max(30, { message: '課題の要約は30文字以内である必要があります' }),
  // TODO: ステータスのバリデーションどうするか検討
  status: z.string(),
  userId: z.string(),
  type: z.string().regex(/^(FEATURE|CHORE|BUG)$/, {
    message: "課題のタイプは'FEATURE'か'CHORE'か'BUG'である必要があります",
  }),
  point: z.optional(
    z
      .number()
      .min(0, { message: '課題のポイントは0以上である必要があります' })
      .max(30, { message: '課題のポイントは30以下である必要があります' }),
  ),
})

export const useTaskUpdateForm = (taskId: string) => {
  const { userId } = useAuth()
  const { isLoading, data: originalTask, error } = useTask(taskId)
  const { onSubmit, getInputProps, setFieldValue, values } = useForm<Task>({
    schema: zodResolver(schema),
    initialValues: {
      id: '',
      title: '',
      status: 'BEFORE_START',
      userId: '',
      type: 'FEATURE',
      dueDate: undefined,
      point: undefined,
    },
  })

  if (!isLoading && error) {
    // TODO: このタイミングでエラーのトーストを出したい
    // 例外は投げない。キャッチするやつがいないので。
    console.error('タスクの取得に失敗しました', error)
  }

  const handleSubmit = useCallback(
    async (updatingTask: Task) => {
      try {
        if (updatingTask.userId !== userId) {
          throw new Error('ユーザーIDが一致しないため更新できません')
        }

        if (!originalTask?.status) {
          throw new Error('ステータスが存在しないため更新できません')
        }

        await updateTaskUsecase(updatingTask, originalTask.status)
      } catch (err) {
        console.error('タスクの更新に失敗しました', err)
        // TODO: タスク登録に失敗した旨のエラートーストを出す
      }
    },
    [originalTask, userId],
  )

  useEffect(() => {
    // 更新対象タスクの情報をフォームに反映
    if (!isLoading && originalTask) {
      setFieldValue('id', originalTask.id)
      setFieldValue('title', originalTask.title)
      setFieldValue('status', originalTask.status)
      setFieldValue('userId', originalTask.userId)
      setFieldValue('type', originalTask.type)
      // FIXME: ここのDate変換永遠の謎（抜け出せない迷路）
      setFieldValue('dueDate', originalTask.dueDate?.toDate() as any)
      setFieldValue('point', originalTask.point)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, originalTask])

  useEffect(() => {
    // 課題のタイプがFEATURE以外で、dueDateとpointの値が設定されている場合、それらの値をリセットする
    if (values.type !== 'FEATURE' && (values.dueDate || values.point)) {
      setFieldValue('dueDate', undefined)
      setFieldValue('point', undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.type, values.dueDate, values.point])

  return { values, onSubmit, getInputProps, handleSubmit }
}
