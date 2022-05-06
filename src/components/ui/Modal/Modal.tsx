import { Modal as MantineModal } from '@mantine/core'
import type { FC, ReactElement } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'

type ModalProps = {
  content: ReactElement
  modalTitle?: string
  openButtonText: string
}

export const Modal: FC<ModalProps> = ({ content, modalTitle, openButtonText }) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <MantineModal opened={opened} onClose={() => setOpened(false)} title={modalTitle}>
        {content}
      </MantineModal>

      <Button color="pink" variant="light" onClick={() => setOpened(true)}>
        {openButtonText}
      </Button>
    </>
  )
}
