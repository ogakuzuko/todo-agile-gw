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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'DEV_FINISHED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'DEV_FINISHED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'VER_DEPLOYED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'VER_DEPLOYED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'TEST_OK',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'TEST_NG',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'TEST_OK',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'TEST_NG',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'STARTED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'VER_DEPLOYED',
        userId: 'TEST_USER',
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
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER',
        type: 'FEATURE',
      },
      'RELEASED',
    ],
    expected: 'RELEASED',
  },
]

export const INVALID_DATA: InvalidTestData[] = [
  {
    params: [
      {
        id: 'TEST_TASK',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: 'エラーメッセージ',
  },
]
