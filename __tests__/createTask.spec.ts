import { INVALID_TITLE_DATA, VALID_DATA } from '@/constants/TEST_DATA/createTask'
import { createTask } from '@/domain/entity/Task'

describe('正規データ', () => {
  it('正規データ', () => {
    expect(createTask(VALID_DATA[0])).toEqual(VALID_DATA[0])
  })
})

describe('課題の要約(title)が不正', () => {
  it('要約(title)が存在しない', () => {
    expect(() => createTask(...INVALID_TITLE_DATA[0].params)).toThrowError(
      INVALID_TITLE_DATA[0].expected,
    )
  })
  it('要約(title)が文字列以外', () => {
    expect(() => createTask(...INVALID_TITLE_DATA[1].params)).toThrowError(
      INVALID_TITLE_DATA[1].expected,
    )
  })
  it('要約(title)が30文字を超えている', () => {
    expect(() => createTask(...INVALID_TITLE_DATA[2].params)).toThrowError(
      INVALID_TITLE_DATA[2].expected,
    )
  })
})
