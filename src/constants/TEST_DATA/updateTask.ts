// updateTask()のテスト用データ
import type { updateTask } from '@/domain/entity/Task'
import type { Status } from '@/types/task'

type ValidStatusTestData = {
  params: Parameters<typeof updateTask>
  expected: Status // status部分が期待通りであるか
}

type InvalidTestData = {
  params: Parameters<typeof updateTask>
  expected: string // エラーメッセージ
}

// タスクの更新として有効なデータ
export const VALID_DATA: ValidStatusTestData[] = [
  // 開始前 → 開始前（変更なし）
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: 'BEFORE_START',
  },
  // 開始前 → 開始
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: 'STARTED',
  },
  // 開始 → 開始（変更なし）
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'STARTED',
    ],
    expected: 'STARTED',
  },
  // 開始 → 開発終了
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'DEV_FINISHED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'STARTED',
    ],
    expected: 'DEV_FINISHED',
  },
  // 開発終了 → 開発終了（変更なし）
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'DEV_FINISHED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'DEV_FINISHED',
    ],
    expected: 'DEV_FINISHED',
  },
  // 開発終了 → 検証環境デプロイ
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'VER_DEPLOYED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'DEV_FINISHED',
    ],
    expected: 'VER_DEPLOYED',
  },
  // 開発終了 → 開始
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'DEV_FINISHED',
    ],
    expected: 'STARTED',
  },
  // 検証環境デプロイ → 検証環境デプロイ（変更なし）
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'VER_DEPLOYED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'VER_DEPLOYED',
    ],
    expected: 'VER_DEPLOYED',
  },
  // 検証環境デプロイ → テストOK
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'TEST_OK',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'VER_DEPLOYED',
    ],
    expected: 'TEST_OK',
  },
  // 検証環境デプロイ → テストNG
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'TEST_NG',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'VER_DEPLOYED',
    ],
    expected: 'TEST_NG',
  },
  // テストOK → テストOK（変更なし）
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'TEST_OK',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'TEST_OK',
    ],
    expected: 'TEST_OK',
  },
  // テストOK → リリース済み
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'TEST_OK',
    ],
    expected: 'RELEASED',
  },
  // テストNG → テストNG（変更なし）
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'TEST_NG',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'TEST_NG',
    ],
    expected: 'TEST_NG',
  },
  // テストNG → 開始
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'TEST_NG',
    ],
    expected: 'STARTED',
  },
  // テストNG → 検証環境デプロイ
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'VER_DEPLOYED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'TEST_NG',
    ],
    expected: 'VER_DEPLOYED',
  },
  // リリース済み → リリース済み
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'RELEASED',
    ],
    expected: 'RELEASED',
  },
]

// titleが不正な場合のテストデータ
export const INVALID_TITLE_DATA: InvalidTestData[] = [
  // titleが空文字
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: '',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: '課題の要約は必須です',
  },
  // titleが文字列以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 123,
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: '課題の要約は文字列である必要があります',
  },
  // titleが30文字を超えている
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'あああああいいいいいうううううえええええおおおおおかかかかかききききき',
        status: 'BEFORE_START',
        userId: 'TEST_USER',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: '課題の要約は30文字以内である必要があります',
  },
]

// userIdが不正な場合のテストデータ
export const INVALID_USER_ID_DATA: InvalidTestData[] = [
  // userIdが存在しない
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: '',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: 'ユーザーIDが存在しません',
  },
  // userIdが文字列以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 123,
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: 'ユーザーIDは文字列である必要があります',
  },
]

// typeが不正な場合のテストデータ
export const INVALID_TYPE_DATA: InvalidTestData[] = [
  // typeが存在しない
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: '',
      },
      'BEFORE_START',
    ],
    expected: '課題のタイプが選択されていません',
  },
  // typeがTaskType型以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'HOGE',
      },
      'BEFORE_START',
    ],
    expected: '課題のタイプは"FEATURE", "CHORE", "BUG"のうちのいずれかである必要があります',
  },
]
