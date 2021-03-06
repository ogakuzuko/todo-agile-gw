// createTask()のテスト用データ
import dayjs from 'dayjs'

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
  // title、type指定（一番最低限のデータ）
  {
    title: 'テストタスク',
    status: 'BEFORE_START',
    userId: 'TEST_USER_ID',
    type: 'FEATURE',
  },
  // title、type、dueDate指定
  {
    title: 'テストタスク',
    status: 'BEFORE_START',
    userId: 'TEST_USER_ID',
    type: 'FEATURE',
    dueDate: dayjs().toDate(),
  },
  // title、type、point指定
  {
    title: 'テストタスク',
    status: 'BEFORE_START',
    userId: 'TEST_USER_ID',
    type: 'FEATURE',
    point: 5,
  },
  // title、type、dueDate、point指定
  {
    title: 'テストタスク',
    status: 'BEFORE_START',
    userId: 'TEST_USER_ID',
    type: 'FEATURE',
    dueDate: dayjs().toDate(),
    point: 10,
  },
]

// titleが不正な場合のテストデータ
export const INVALID_TITLE_DATA: InvalidTestData[] = [
  // titleが空文字
  {
    params: [
      {
        title: '',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
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
        userId: 'TEST_USER_ID',
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
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
    ],
    expected: '課題の要約は30文字以内である必要があります',
  },
]

// statusが不正な場合のテストデータ
export const INVALID_STATUS_DATA: InvalidTestData[] = [
  // statusが"BEFORE_START"以外
  {
    params: [
      {
        title: 'テストタスク',
        status: 'RELEASED',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
    ],
    expected: '課題のステータスが不正です',
  },
  // statusが空文字
  {
    params: [
      {
        title: 'テストタスク',
        status: '',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
      },
    ],
    expected: '課題のステータスが不正です',
  },
]

// userIdが不正な場合のテストデータ
export const INVALID_USER_ID_DATA: InvalidTestData[] = [
  // userIdが存在しない
  {
    params: [
      {
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: '',
        type: 'FEATURE',
      },
    ],
    expected: 'ユーザーIDが存在しません',
  },
  // userIdが文字列以外
  {
    params: [
      {
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 123,
        type: 'FEATURE',
      },
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
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: '',
      },
    ],
    expected: '課題のタイプが選択されていません',
  },
  // typeがTaskType型以外
  {
    params: [
      {
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'HOGE',
      },
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
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
        dueDate: 'hoge',
      },
    ],
    expected: 'dueDateの値はDate型である必要があります',
  },
  // typeが"FEATURE"以外の場合で、dueDateが指定されている
  {
    params: [
      {
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'CHORE',
        dueDate: dayjs().toDate(),
      },
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
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
        point: 'hoge',
      },
    ],
    expected: '課題のポイントは数値である必要があります',
  },
  // pointが30を超えている
  {
    params: [
      {
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'FEATURE',
        point: 100,
      },
    ],
    expected: '課題のポイントは30以下である必要があります',
  },
  // typeが"FEATURE"以外の場合で、pointが指定されている
  {
    params: [
      {
        title: 'テストタスク',
        status: 'BEFORE_START',
        userId: 'TEST_USER_ID',
        type: 'CHORE',
        point: 5,
      },
    ],
    expected: '課題のタイプが"Chore"か"Bug"の場合、dueDateやpointを指定することはできません',
  },
]
