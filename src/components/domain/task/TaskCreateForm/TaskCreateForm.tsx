import { Box, Group, TextInput } from '@mantine/core'
import { Select } from '@mantine/core'
import { NumberInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'

import { Button } from '@/components/ui/Button'
import type { NewTask } from '@/types/task'

export const TaskCreateForm = () => {
  const { onSubmit, getInputProps } = useForm<NewTask>({
    initialValues: {
      title: '',
      status: 'BEFORE_START',
      type: 'FEATURE',
      dueDate: undefined,
      point: undefined,
    },
  })

  return (
    <Box mx="auto">
      <form onSubmit={onSubmit((values) => console.log(values))} className="space-y-3">
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
        <DatePicker placeholder="" label="締切日" {...getInputProps('dueDate')} />
        <NumberInput
          defaultValue={0}
          placeholder="未推定"
          label="ストーリーポイント"
          {...getInputProps('point')}
        />
        <Group position="right">
          <Button type="submit" variant="light" color="orange" mt="xs">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}
