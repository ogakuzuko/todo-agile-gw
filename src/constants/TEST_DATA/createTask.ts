// createTask()のテスト用データ
import type { createTask } from '@/domain/entity/Task'
import type { NewTask } from '@/types/task'

// type ValidTestData = {
//   params: Parameters<typeof createTask>
//   expected: ReturnType<typeof createTask>
// }

type InvalidTestData = {
  params: Parameters<typeof createTask>
  expected: string // エラーメッセージ
}

// タスクの登録として有効なデータ
export const VALID_DATA: NewTask[] = [
  // 一番最低限のデータ
  {
    title: 'テストタスク',
    status: 'BEFORE_START',
    userId: 'TEST_USER',
    type: 'FEATURE',
  },
]

// 課題の要約(title)が不正な場合のテストデータ
export const INVALID_TITLE_DATA: InvalidTestData[] = [
  // titleが空文字
  {
    params: [
      {
        title: '',
        status: 'BEFORE_START',
        userId: 'TEST_USER',
        type: 'FEATURE',
      },
    ],
    expected: '課題の要約は必須です',
  },
  // titleが文字列以外
  {
    params: [
      {
        title: 123,
        status: 'BEFORE_START',
        userId: 'TEST_USER',
        type: 'FEATURE',
      },
    ],
    expected: '課題の要約は文字列である必要があります',
  },
  // titleが30文字を超えている
  {
    params: [
      {
        title: 'あああああいいいいいうううううえええええおおおおおかかかかかききききき',
        status: 'BEFORE_START',
        userId: 'TEST_USER',
        type: 'FEATURE',
      },
    ],
    expected: '課題の要約は30文字以内である必要があります',
  },
]
