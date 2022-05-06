import { Box, Group, TextInput } from '@mantine/core'
import { Select } from '@mantine/core'
import { NumberInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'

import { Button } from '@/components/ui/Button'
import { useTaskCreateForm } from '@/hooks/task/useTaskCreateForm'

export const TaskCreateForm = () => {
  const { onSubmit, handleSubmit, getInputProps, values } = useTaskCreateForm()

  return (
    <Box mx="auto">
      <form onSubmit={onSubmit(handleSubmit)} className="space-y-3">
        {/* TODO: 理想はTextInputやSelect一つ一つをForm用の汎用コンポーネントとして作成したい */}
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
          min={0}
          max={30}
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
