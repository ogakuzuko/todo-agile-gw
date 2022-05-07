// updateTask()のテスト用データ
import type { updateTask } from '@/domain/entity/Task'
// import type { Task } from '@/types/task'

type UpdateTaskDataParams = Parameters<typeof updateTask>

// type InvalidTestData = {
//   params: Parameters<typeof updateTask>
//   expected: string // エラーメッセージ
// }

// タスクの更新として有効なデータ
export const VALID_DATA: UpdateTaskDataParams[] = [
  // 変更前：開始前 → 変更後：開始前
  [
    {
      id: 'TEST_TASK',
      title: 'テストタスク',
      status: 'BEFORE_START',
      userId: 'TEST_USER',
      type: 'FEATURE',
    },
    'BEFORE_START',
  ],
]
