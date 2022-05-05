import { AppShell, useMantineTheme } from '@mantine/core'
import type { FC, ReactNode } from 'react'
import { useState } from 'react'

import { Header } from './Header'
import { Navbar } from './Navbar'

type LayoutProps = {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const handleBurgerClick = () => {
    setOpened((open) => !open)
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Navbar {...{ opened }} />}
      header={<Header {...{ opened, handleBurgerClick }} />}
    >
      {children}
    </AppShell>
  )
}
