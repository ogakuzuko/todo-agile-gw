// updateTask()のテスト用データ
// QUES: status更新以外はタスク作成とテストケースが殆ど同じだけど、こういう場合はどうするのがよいのか。createとupdateで共通するバリデーション部分はまとめてしまうのがよかったのかも？（=> Taskドメインロジック部分のバリデーションを共通化する必要がある(?)）
import dayjs from 'dayjs'

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

// statusが不正な場合のテストデータ
export const INVALID_STATUS_DATA: InvalidTestData[] = [
  // 更新前status未指定（第2引数originalTaskStatusがundefined）
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
    ],
    expected: '更新前の課題のステータスが不正です',
  },
  // 更新前statusがTask.Status型以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'HOGE',
    ],
    expected: '更新前の課題のステータスが不正です',
  },
  // 更新後statusがTask.Status型以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'HOGE',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected:
      '課題のステータスは"BEFORE_START", "STARTED", "DEV_FINISHED", "VER_DEPLOYED", "TEST_OK", "TEST_NG", "RELEASED"のうちのいずれかである必要があります',
  },
  // 開始前 → 開始前/開始 以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'BEFORE_START',
    ],
    expected: '課題のステータスが不正です（開始前 → 開始（または変更しない））',
  },
  // 開始 → 開始/開発終了 以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'STARTED',
    ],
    expected: '課題のステータスが不正です（開始 → 開発終了（または変更しない））',
  },
  // 開発終了 → 開発終了/検証環境デプロイ/開始 以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'DEV_FINISHED',
    ],
    expected:
      '課題のステータスが不正です（開発終了 → 検証環境デプロイ | 開始（または変更しない））',
  },
  // 検証環境デプロイ → 検証環境デプロイ/テストOK/テストNG 以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'VER_DEPLOYED',
    ],
    expected:
      '課題のステータスが不正です（検証環境デプロイ → テストOK | テストNG（または変更しない））',
  },
  // テストOK → テストOK/リリース済み 以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'TEST_OK',
    ],
    expected: '課題のステータスが不正です（テストOK → リリース済み（または変更しない））',
  },
  // テストNG → テストNG/開始/検証環境デプロイ 以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'TEST_NG',
    ],
    expected:
      '課題のステータスが不正です（テストNG → 開始 | 検証環境デプロイ（または変更しない））',
  },
  // リリース済み → リリース済み 以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
      'RELEASED',
    ],
    expected: '課題のステータスが不正です（リリース済み → 遷移不能）',
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

// dueDateが不正な場合のテストデータ
export const INVALID_DUE_DATE_DATA: InvalidTestData[] = [
  // dueDateがDate型以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
        dueDate: 'hoge',
      },
      'BEFORE_START',
    ],
    expected: 'dueDateの値はDate型である必要があります',
  },
  // typeが"FEATURE"以外の場合で、dueDateが指定されている
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'CHORE',
        dueDate: dayjs().toDate(),
      },
      'BEFORE_START',
    ],
    expected: '課題のタイプが"Chore"か"Bug"の場合、dueDateやpointを指定することはできません',
  },
]

// pointが不正な場合のテストデータ
export const INVALID_POINT_DATA: InvalidTestData[] = [
  // pointが数値以外
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
        point: 'hoge',
      },
      'BEFORE_START',
    ],
    expected: '課題のポイントは数値である必要があります',
  },
  // pointが30を超えている
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
        point: 100,
      },
      'BEFORE_START',
    ],
    expected: '課題のポイントは30以下である必要があります',
  },
  // typeが"FEATURE"以外の場合で、pointが指定されている
  {
    params: [
      {
        id: 'TEST_TASK_ID',
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'CHORE',
        point: 5,
      },
      'BEFORE_START',
    ],
    expected: '課題のタイプが"Chore"か"Bug"の場合、dueDateやpointを指定することはできません',
  },
]
