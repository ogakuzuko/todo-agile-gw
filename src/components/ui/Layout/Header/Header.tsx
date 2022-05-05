import { Burger, Header as MantineHeader, Text, useMantineTheme } from '@mantine/core'
import type { FC } from 'react'

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

        <Text>Header</Text>
      </div>
    </MantineHeader>
  )
}
