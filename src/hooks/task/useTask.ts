import { useEffect, useState } from 'react'

import { FirebaseTaskClient } from '@/repositories/FirebaseTaskClient'
import type { Task } from '@/types/task'

type State = {
  isLoading: boolean
  data?: Task
  error?: Error
}

const INITIAL_STATE: State = {
  isLoading: true,
  data: undefined,
  error: undefined,
}

export const useTask = (taskId: string): State => {
  const [state, setState] = useState<State>(INITIAL_STATE)

  useEffect(() => {
    ;(async () => {
      try {
        const task = await FirebaseTaskClient.get(taskId)
        setState({ isLoading: false, data: task })
      } catch (err) {
        console.error('タスク詳細の取得に失敗しました', err)
        setState({ isLoading: false, error: err as Error })
      }
    })()
  }, [taskId])

  return state
}
