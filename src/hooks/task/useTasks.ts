import { useEffect, useState } from 'react'

import { FirebaseTaskClient } from '@/repositories/FirebaseTaskClient'
import type { Task } from '@/types/task'

type State = {
  isLoading: boolean
  data?: Task[]
  error?: Error
}

const INITIAL_STATE: State = {
  isLoading: true,
  data: [],
  error: undefined,
}

export const useTasks = (userId: string): State => {
  const [state, setState] = useState<State>(INITIAL_STATE)

  useEffect(() => {
    ;(async () => {
      try {
        const tasks = await FirebaseTaskClient.getList(userId)
        setState({ isLoading: false, data: tasks })
      } catch (err) {
        console.error('タスク一覧の取得に失敗しました', err)
        setState({ isLoading: false, error: err as Error })
      }
    })()
  }, [userId])

  return state
}
