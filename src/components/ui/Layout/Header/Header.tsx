import { Burger, Header as MantineHeader, Text, useMantineTheme } from '@mantine/core'
import type { FC } from 'react'

import { TaskCreateForm } from '@/components/domain/task/TaskCreateForm'
import { Modal } from '@/components/ui/Modal'
import { useMediaQuery } from '@/hooks/mantine'

type HeaderProps = {
  opened: boolean
  handleBurgerClick: () => void
}

export const Header: FC<HeaderProps> = ({ opened, handleBurgerClick }) => {
  const theme = useMantineTheme()
  const largerThanSm = useMediaQuery('sm')

  return (
    <MantineHeader height={60} p="md">
      <div className="flex items-center h-full">
        <Burger
          className={`${largerThanSm ? 'hidden' : ''}`}
          opened={opened}
          onClick={handleBurgerClick}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />

        <div className="flex justify-between items-center w-full">
          <Text>Header</Text>
          <Modal content={<TaskCreateForm />} openButtonText="作成" modalTitle="課題の作成" />
        </div>
      </div>
    </MantineHeader>
  )
}
