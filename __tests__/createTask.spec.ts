import {
  INVALID_STATUS_DATA,
  INVALID_TITLE_DATA,
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
