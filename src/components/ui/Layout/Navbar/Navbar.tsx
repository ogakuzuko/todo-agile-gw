import { Navbar as MantineNavbar } from '@mantine/core'
import type { FC } from 'react'

import { SignInOrOutButton } from '@/components/domain/auth'

type NavbarProps = {
  opened: boolean
}

export const Navbar: FC<NavbarProps> = ({ opened }) => {
  return (
    <MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <MantineNavbar.Section p="md">HOGE</MantineNavbar.Section>
      <MantineNavbar.Section p="md">HOGE</MantineNavbar.Section>
      <MantineNavbar.Section p="md">HOGE</MantineNavbar.Section>
      <MantineNavbar.Section p="md">HOGE</MantineNavbar.Section>
      <MantineNavbar.Section p="md">HOGE</MantineNavbar.Section>
      <MantineNavbar.Section p="md">
        <SignInOrOutButton />
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}
