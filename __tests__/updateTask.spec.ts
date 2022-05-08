import {
  INVALID_DUE_DATE_DATA,
  INVALID_POINT_DATA,
  INVALID_STATUS_DATA,
  INVALID_TITLE_DATA,
  INVALID_TYPE_DATA,
  INVALID_USER_ID_DATA,
  VALID_DATA,
} from '@/constants/TEST_DATA/updateTask'
import { updateTask } from '@/domain/entity/Task'

describe('正規データ', () => {
  it('status更新（開始前 → 開始前）', () => {
    // statusの更新をテストする系は、status部分のみのチェックに留める
    const result = updateTask(...VALID_DATA[0].params)
    expect(result.status).toBe(VALID_DATA[0].expected)
  })
  it('status更新（開始前 → 開始）', () => {
    const result = updateTask(...VALID_DATA[1].params)
    expect(result.status).toBe(VALID_DATA[1].expected)
  })
  it('status更新（開始 → 開始）', () => {
    const result = updateTask(...VALID_DATA[2].params)
    expect(result.status).toEqual(VALID_DATA[2].expected)
  })
  it('status更新（開始 → 開発終了）', () => {
    const result = updateTask(...VALID_DATA[3].params)
    expect(result.status).toEqual(VALID_DATA[3].expected)
  })
  it('status更新（開発終了 → 開発終了）', () => {
    const result = updateTask(...VALID_DATA[4].params)
    expect(result.status).toEqual(VALID_DATA[4].expected)
  })
  it('status更新（開発終了 → 検証環境デプロイ）', () => {
    const result = updateTask(...VALID_DATA[5].params)
    expect(result.status).toEqual(VALID_DATA[5].expected)
  })
  it('status更新（開発終了 → 開始）', () => {
    const result = updateTask(...VALID_DATA[6].params)
    expect(result.status).toEqual(VALID_DATA[6].expected)
  })
  it('status更新（検証環境デプロイ → 検証環境デプロイ）', () => {
    const result = updateTask(...VALID_DATA[7].params)
    expect(result.status).toEqual(VALID_DATA[7].expected)
  })
  it('status更新（検証環境デプロイ → テストOK）', () => {
    const result = updateTask(...VALID_DATA[8].params)
    expect(result.status).toEqual(VALID_DATA[8].expected)
  })
  it('status更新（検証環境デプロイ → テストNG）', () => {
    const result = updateTask(...VALID_DATA[9].params)
    expect(result.status).toEqual(VALID_DATA[9].expected)
  })
  it('status更新（テストOK → テストOK）', () => {
    const result = updateTask(...VALID_DATA[10].params)
    expect(result.status).toEqual(VALID_DATA[10].expected)
  })
  it('status更新（テストOK → リリース済み）', () => {
    const result = updateTask(...VALID_DATA[11].params)
    expect(result.status).toEqual(VALID_DATA[11].expected)
  })
  it('status更新（テストNG → テストNG）', () => {
    const result = updateTask(...VALID_DATA[12].params)
    expect(result.status).toEqual(VALID_DATA[12].expected)
  })
  it('status更新（テストNG → 開始）', () => {
    const result = updateTask(...VALID_DATA[13].params)
    expect(result.status).toEqual(VALID_DATA[13].expected)
  })
  it('status更新（テストNG → 検証環境デプロイ）', () => {
    const result = updateTask(...VALID_DATA[14].params)
    expect(result.status).toEqual(VALID_DATA[14].expected)
  })
  it('status更新（リリース済み → リリース済み）', () => {
    const result = updateTask(...VALID_DATA[15].params)
    expect(result.status).toEqual(VALID_DATA[15].expected)
  })
})

describe('titleが不正', () => {
  it('titleが存在しない', () => {
    expect(() => updateTask(...INVALID_TITLE_DATA[0].params)).toThrowError(
      INVALID_TITLE_DATA[0].expected,
    )
  })
  it('titleが文字列以外', () => {
    expect(() => updateTask(...INVALID_TITLE_DATA[1].params)).toThrowError(
      INVALID_TITLE_DATA[1].expected,
    )
  })
  it('titleが30文字を超えている', () => {
    expect(() => updateTask(...INVALID_TITLE_DATA[2].params)).toThrowError(
      INVALID_TITLE_DATA[2].expected,
    )
  })
})

describe('userIdが不正', () => {
  it('userIdが存在しない', () => {
    expect(() => updateTask(...INVALID_USER_ID_DATA[0].params)).toThrowError(
      INVALID_USER_ID_DATA[0].expected,
    )
  })
  it('userIdが文字列以外', () => {
    expect(() => updateTask(...INVALID_USER_ID_DATA[1].params)).toThrowError(
      INVALID_USER_ID_DATA[1].expected,
    )
  })
})

describe('statusが不正', () => {
  it('更新前status未指定', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[0].params)).toThrowError(
      INVALID_STATUS_DATA[0].expected,
    )
  })
  it('更新前statusがTask.Status型以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[1].params)).toThrowError(
      INVALID_STATUS_DATA[1].expected,
    )
  })
  it('更新後statusがTask.Status型以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[2].params)).toThrowError(
      INVALID_STATUS_DATA[2].expected,
    )
  })
  it('開始前 → 開始前/開始 以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[3].params)).toThrowError(
      INVALID_STATUS_DATA[3].expected,
    )
  })
  it('開始 → 開始/開発終了 以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[4].params)).toThrowError(
      INVALID_STATUS_DATA[4].expected,
    )
  })
  it('開発終了 → 開発終了/検証環境デプロイ/開始 以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[5].params)).toThrowError(
      INVALID_STATUS_DATA[5].expected,
    )
  })
  it('検証環境デプロイ → 検証環境デプロイ/テストOK/テストNG 以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[6].params)).toThrowError(
      INVALID_STATUS_DATA[6].expected,
    )
  })
  it('テストOK → テストOK/リリース済み 以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[7].params)).toThrowError(
      INVALID_STATUS_DATA[7].expected,
    )
  })
  it('テストNG → テストNG/開始/検証環境デプロイ 以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[8].params)).toThrowError(
      INVALID_STATUS_DATA[8].expected,
    )
  })
  it('リリース済み → リリース済み 以外', () => {
    expect(() => updateTask(...INVALID_STATUS_DATA[9].params)).toThrowError(
      INVALID_STATUS_DATA[9].expected,
    )
  })
})

describe('typeが不正', () => {
  it('typeが存在しない', () => {
    expect(() => updateTask(...INVALID_TYPE_DATA[0].params)).toThrowError(
      INVALID_TYPE_DATA[0].expected,
    )
  })
  it('typeがTaskType型以外', () => {
    expect(() => updateTask(...INVALID_TYPE_DATA[1].params)).toThrowError(
      INVALID_TYPE_DATA[1].expected,
    )
  })
})

describe('dueDateが不正', () => {
  it('dueDateがDate型以外', () => {
    expect(() => updateTask(...INVALID_DUE_DATE_DATA[0].params)).toThrowError(
      INVALID_DUE_DATE_DATA[0].expected,
    )
  })
  it('typeが"FEATURE"以外でdueDateが指定されている', () => {
    expect(() => updateTask(...INVALID_DUE_DATE_DATA[1].params)).toThrowError(
      INVALID_DUE_DATE_DATA[1].expected,
    )
  })
})

describe('pointが不正', () => {
  it('pointが数値以外', () => {
    expect(() => updateTask(...INVALID_POINT_DATA[0].params)).toThrowError(
      INVALID_POINT_DATA[0].expected,
    )
  })
  it('pointが30を超えている', () => {
    expect(() => updateTask(...INVALID_POINT_DATA[1].params)).toThrowError(
      INVALID_POINT_DATA[1].expected,
    )
  })
  it('typeが"FEATURE"以外でpointが指定されている', () => {
    expect(() => updateTask(...INVALID_POINT_DATA[2].params)).toThrowError(
      INVALID_POINT_DATA[2].expected,
    )
  })
})
