import { VALID_DATA } from '@/constants/TEST_DATA/updateTask'
import { updateTask } from '@/domain/entity/Task'

describe('正規データ', () => {
  // TODO: ちゃんと各フィールドが更新できるか一つずつテストケースを書く
  it('課題のステータスを更新（開始前 → 開始前）', () => {
    const result = updateTask(...VALID_DATA[0])
    expect(result.status).toBe('BEFORE_START')
  })
})
