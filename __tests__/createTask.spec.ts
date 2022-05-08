import {
  INVALID_DUE_DATE_DATA,
  INVALID_POINT_DATA,
  INVALID_STATUS_DATA,
  INVALID_TITLE_DATA,
  INVALID_TYPE_DATA,
  INVALID_USER_ID_DATA,
  VALID_DATA,
} from '@/constants/TEST_DATA/createTask'
import { createTask } from '@/domain/entity/Task'

describe('正規データ', () => {
  it('title, type指定（最低限）', () => {
    expect(createTask(VALID_DATA[0])).toEqual(VALID_DATA[0])
  })
  it('title、type、dueDate指定', () => {
    expect(createTask(VALID_DATA[1])).toEqual(VALID_DATA[1])
  })
  it('title、type、point指定', () => {
    expect(createTask(VALID_DATA[2])).toEqual(VALID_DATA[2])
  })
  it('title、type、dueDate、point指定', () => {
    expect(createTask(VALID_DATA[3])).toEqual(VALID_DATA[3])
  })
})

describe('titleが不正', () => {
  // NOTE: 例外のテストについて
  // toThrowError(=toThrowも同じ)は、引数に指定した文字列がエラーメッセージに含まれているかをテストする。あくまで部分一致なので、完全一致にする場合は正規表現を用いて以下のようにする
  // 部分一致： expect().toThrowError(/エラーメッセージ/); or expect().toThrowError('エラーメッセージ');
  // 完全一致: expect().toThrowError(/^エラーメッセージ$/); or expect().toThrowError(new Error('エラーメッセージ');
  // 参考：https://jestjs.io/ja/docs/expect#tothrowerror
  it('titleが存在しない', () => {
    expect(() => createTask(...INVALID_TITLE_DATA[0].params)).toThrowError(
      INVALID_TITLE_DATA[0].expected,
    )
  })
  it('titleが文字列以外', () => {
    expect(() => createTask(...INVALID_TITLE_DATA[1].params)).toThrowError(
      INVALID_TITLE_DATA[1].expected,
    )
  })
  it('titleが30文字を超えている', () => {
    expect(() => createTask(...INVALID_TITLE_DATA[2].params)).toThrowError(
      INVALID_TITLE_DATA[2].expected,
    )
  })
})

describe('statusが不正', () => {
  it('statusが"BEFORE_START"以外', () => {
    expect(() => createTask(...INVALID_STATUS_DATA[0].params)).toThrowError(
      INVALID_STATUS_DATA[0].expected,
    )
  })
  it('statusが空文字', () => {
    expect(() => createTask(...INVALID_STATUS_DATA[1].params)).toThrowError(
      INVALID_STATUS_DATA[1].expected,
    )
  })
})

describe('userIdが不正', () => {
  it('userIdが存在しない', () => {
    expect(() => createTask(...INVALID_USER_ID_DATA[0].params)).toThrowError(
      INVALID_USER_ID_DATA[0].expected,
    )
  })
  it('userIdが文字列以外', () => {
    expect(() => createTask(...INVALID_USER_ID_DATA[1].params)).toThrowError(
      INVALID_USER_ID_DATA[1].expected,
    )
  })
})

describe('typeが不正', () => {
  it('typeが存在しない', () => {
    expect(() => createTask(...INVALID_TYPE_DATA[0].params)).toThrowError(
      INVALID_TYPE_DATA[0].expected,
    )
  })
  it('typeがTaskType型以外', () => {
    expect(() => createTask(...INVALID_TYPE_DATA[1].params)).toThrowError(
      INVALID_TYPE_DATA[1].expected,
    )
  })
})

describe('dueDateが不正', () => {
  it('dueDateがDate型以外', () => {
    expect(() => createTask(...INVALID_DUE_DATE_DATA[0].params)).toThrowError(
      INVALID_DUE_DATE_DATA[0].expected,
    )
  })
  it('typeが"FEATURE"以外でdueDateが指定されている', () => {
    expect(() => createTask(...INVALID_DUE_DATE_DATA[1].params)).toThrowError(
      INVALID_DUE_DATE_DATA[1].expected,
    )
  })
})

describe('pointが不正', () => {
  it('pointが数値以外', () => {
    expect(() => createTask(...INVALID_POINT_DATA[0].params)).toThrowError(
      INVALID_POINT_DATA[0].expected,
    )
  })
  it('pointが30を超えている', () => {
    expect(() => createTask(...INVALID_POINT_DATA[1].params)).toThrowError(
      INVALID_POINT_DATA[1].expected,
    )
  })
  it('typeが"FEATURE"以外でpointが指定されている', () => {
    expect(() => createTask(...INVALID_POINT_DATA[2].params)).toThrowError(
      INVALID_POINT_DATA[2].expected,
    )
  })
})
