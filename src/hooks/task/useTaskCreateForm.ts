import { useForm, zodResolver } from '@mantine/form'
import { useCallback, useEffect } from 'react'
import { z } from 'zod'

import { createTaskUsecase } from '@/domain/usecase/task'
import { useAuth } from '@/hooks/auth'
import type { NewTask } from '@/types/task'

const schema = z.object({
  title: z
    .string({
      required_error: '課題の要約は必須です',
      invalid_type_error: '課題の要約は文字列である必要があります',
    })
    .min(3, { message: '課題の要約は3文字以上である必要があります' })
    .max(30, { message: '課題の要約は30文字以内である必要があります' }),
  status: z.literal('BEFORE_START'),
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

export const useTaskCreateForm = () => {
  const { userId } = useAuth()
  const { onSubmit, getInputProps, setFieldValue, values } = useForm<NewTask>({
    schema: zodResolver(schema),
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
    // NOTE: setFieldValueを依存配列に入れると無限再レンダリングが発生したので除外
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.type, values.dueDate, values.point])

  return { onSubmit, getInputProps, values, handleSubmit }
}
