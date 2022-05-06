import { Box, Group, TextInput } from '@mantine/core'
import { Select } from '@mantine/core'
import { NumberInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'

import { Button } from '@/components/ui/Button'
import { createTaskUsecase } from '@/domain/usecase/task'
import { useAuth } from '@/hooks/auth'
import type { NewTask } from '@/types/task'

export const TaskCreateForm = () => {
  const { userId } = useAuth()
  const { onSubmit, getInputProps, values } = useForm<NewTask>({
    initialValues: {
      title: '',
      status: 'BEFORE_START',
      userId: '',
      type: 'FEATURE',
      dueDate: undefined,
      point: undefined,
    },
  })

  const handleSubmit = async (values: NewTask) => {
    try {
      const taskData = { ...values, userId: userId ?? '' }
      await createTaskUsecase(taskData)
    } catch (err) {
      console.error('タスクの登録に失敗しました', err)
      // TODO: タスク登録に失敗した旨のエラートーストを出す
    }
  }

  return (
    <Box mx="auto">
      <form onSubmit={onSubmit(handleSubmit)} className="space-y-3">
        <TextInput required label="要約" {...getInputProps('title')} />
        <Select
          required
          label="課題のタイプ"
          data={[
            { value: 'FEATURE', label: 'Feature' },
            { value: 'CHORE', label: 'Chore' },
            { value: 'BUG', label: 'Bug' },
          ]}
          {...getInputProps('type')}
        />
        <DatePicker
          label="締切日"
          {...getInputProps('dueDate')}
          disabled={values.type !== 'FEATURE'}
        />
        <NumberInput
          defaultValue={0}
          placeholder="未推定"
          label="ストーリーポイント"
          {...getInputProps('point')}
          disabled={values.type !== 'FEATURE'}
        />
        {/* TODO: 作成ボタン押下後にモーダルが閉じるようにする */}
        <Group position="right">
          <Button type="submit" variant="light" color="pink" mt="xs">
            作成
          </Button>
        </Group>
      </form>
    </Box>
  )
}
