import { INVALID_TITLE_DATA, VALID_DATA } from '@/constants/TEST_DATA/updateTask'
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
