import { Box, Group, TextInput } from '@mantine/core'
import { Select } from '@mantine/core'
import { NumberInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import type { FC } from 'react'

import { Button } from '@/components/ui/Button'
import { useTaskUpdateForm } from '@/hooks/task'

type TaskUpdateFormProps = {
  taskId: string
}

export const TaskUpdateForm: FC<TaskUpdateFormProps> = ({ taskId }) => {
  const { onSubmit, handleSubmit, getInputProps, values } = useTaskUpdateForm(taskId)

  return (
    <Box mx="auto">
      <form onSubmit={onSubmit(handleSubmit)} className="space-y-3">
        <TextInput
          required
          label="要約"
          placeholder="課題の要約を3文字以上で入力してください"
          {...getInputProps('title')}
        />
        <Select
          required
          label="課題のステータス"
          data={[
            { value: 'BEFORE_START', label: '開始前' },
            { value: 'STARTED', label: '開始' },
            { value: 'DEV_FINISHED', label: '開発終了' },
            { value: 'VER_DEPLOYED', label: '検証環境デプロイ' },
            { value: 'TEST_OK', label: 'テストOK' },
            { value: 'TEST_NG', label: 'テストNG' },
            { value: 'RELEASED', label: 'リリース済み' },
          ]}
          {...getInputProps('status')}
        />
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
            更新
          </Button>
        </Group>
      </form>
    </Box>
  )
}
