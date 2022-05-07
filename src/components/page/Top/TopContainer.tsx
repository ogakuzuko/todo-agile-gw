import { useRouter } from 'next/router'
import type { FC } from 'react'

import { Layout } from '@/components/ui/Layout'
import { useAuth } from '@/hooks/auth'
import { useTasks } from '@/hooks/task'
import { useCreateUser } from '@/hooks/user/useCreateUser'

import { TopPresenter } from './TopPresenter'

export const TopContainer: FC = () => {
  const router = useRouter()
  const { isLoading: isUserLoading, isSignedIn, userId } = useAuth()
  // NOTE: カスタムフックの返り値を別のカスタムフック内で使うときは、依存配列の値として指定してあげること
  const { isLoading: isTasksLoading, data: tasks, error } = useTasks(userId ?? '')

  // Firestoreへのユーザー登録処理
  useCreateUser()

  // 未ログインユーザーはログイン画面へ遷移
  if (!isUserLoading && !isSignedIn) {
    router.push('/auth/signin')
  }

  if (!isTasksLoading && error) {
    // TODO: タスクの取得に失敗した旨のエラートーストを表示
    console.error(error)
  }

  return <Layout>{tasks && <TopPresenter tasks={tasks} />}</Layout>
}
