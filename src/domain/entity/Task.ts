// 目標は、このファイルを見ればTaskのドメインルールが全てわかること
// Firestoreへの保存処理はここでは絡んでこないので単体テストが書きやすい
import { TASK_STATUS, TASK_TYPE } from '@/constants/task'
import type { NewTask, Status, Task } from '@/types/task'

export const createTask = (task: NewTask): NewTask => {
  // QUES: タスク作成時のドメインルールはここでよい(?)
  // Write(書き込み)用のドメインバリデーション

  // titleが存在しない場合はエラー
  if (!task.title) {
    console.error('課題の要約は必須です')
    throw new Error('課題の要約は必須です')
  }

  // titleが文字列以外の場合はエラー
  if (typeof task.title !== 'string') {
    console.error('課題の要約は文字列である必要があります')
    throw new Error('課題の要約は文字列である必要があります')
  }

  // titleが30文字を超えている場合はエラー
  if (task.title.length > 30) {
    console.error('課題の要約は30文字以内である必要があります')
    throw new Error('課題の要約は30文字以内である必要があります')
  }

  // statusが"BEFORE_START"以外の場合はエラー
  if (task.status !== 'BEFORE_START') {
    console.error('課題のステータスが不正です')
    throw new Error('課題のステータスが不正です')
  }

  // userIdが存在しない場合はエラー
  if (!task.userId) {
    console.error('ユーザーIDが存在しません')
    throw new Error('ユーザーIDが存在しません')
  }

  // userIdが文字列以外の場合はエラー
  if (typeof task.userId !== 'string') {
    console.error('ユーザーIDは文字列である必要があります')
    throw new Error('ユーザーIDは文字列である必要があります')
  }

  // typeが存在しない場合はエラー
  if (!task.type) {
    console.error('課題のタイプが選択されていません')
    throw new Error('課題のタイプが選択されていません')
  }

  // typeが"FEATURE", "CHORE", "BUG"以外の場合はエラー
  if (!TASK_TYPE.includes(task.type)) {
    console.error('課題のタイプは"FEATURE", "CHORE", "BUG"のうちのいずれかである必要があります')
    throw new Error('課題のタイプは"FEATURE", "CHORE", "BUG"のうちのいずれかである必要があります')
  }

  // dueDateが存在する場合、Date型?Dayjs型以外であればエラー
  // TODO: ここの検証方法要検討
  // if (task.dueDate && typeof task.dueDate !== 'object') {
  //   console.error('')
  //   throw new Error('')
  // }

  // pointが存在する場合、数値以外であればエラー
  if (task.point && typeof task.point !== 'number') {
    console.error('課題のポイントは数値である必要があります')
    throw new Error('課題のポイントは数値である必要があります')
  }

  // pointが存在する場合、pointが30を超えている場合はエラー
  if (task.point && task.point > 30) {
    console.error('課題のポイントは30以下である必要があります')
    throw new Error('課題のポイントは30以下である必要があります')
  }

  // 課題のタイプが"FEATURE"以外の場合にdueDateやpointが存在する場合はエラー
  if (task.type !== 'FEATURE' && (task.dueDate || task.point)) {
    console.error('課題のタイプが"Chore"か"Bug"の場合、dueDateやpointを指定することはできません')
    throw new Error('課題のタイプが"Chore"か"Bug"の場合、dueDateやpointを指定することはできません')
  }

  // チェック用
  console.log('バリデーションOK！', task)

  return task
}

// NOTE: 引数：タスクの更新内容（現在のタスクStatus）と、更新後のstatus（押したボタンで判定（ex. テストOKを押したら、更新後のstatusは'TEST_OK'なので、引数として'TEST_OK'が渡される））
export const updateTask = (updatingTask: Task, originalTaskStatus: Status): Task => {
  // Write(書き込み)用のドメインバリデーション

  // idが存在しない場合はエラー
  if (!updatingTask.id) {
    console.error('IDが存在しません')
    throw new Error('IDが存在しません')
  }

  // titleが存在しない場合はエラー
  if (!updatingTask.title) {
    console.error('課題の要約は必須です')
    throw new Error('課題の要約は必須です')
  }

  // titleが文字列以外の場合はエラー
  if (typeof updatingTask.title !== 'string') {
    console.error('課題の要約は文字列である必要があります')
    throw new Error('課題の要約は文字列である必要があります')
  }

  // titleが30文字を超えている場合はエラー
  if (updatingTask.title.length > 30) {
    console.error('課題の要約は30文字以内である必要があります')
    throw new Error('課題の要約は30文字以内である必要があります')
  }

  // statusが"BEFORE_START", "STARTED", "DEV_FINISHED", "VER_DEPLOYED", "TEST_OK", "TEST_NG", "RELEASED"以外の場合はエラー
  if (!TASK_STATUS.includes(updatingTask.status)) {
    console.error(
      '課題のステータスは"BEFORE_START", "STARTED", "DEV_FINISHED", "VER_DEPLOYED", "TEST_OK", "TEST_NG", "RELEASED"のうちのいずれかである必要があります',
    )
    throw new Error(
      '課題のステータスは"BEFORE_START", "STARTED", "DEV_FINISHED", "VER_DEPLOYED", "TEST_OK", "TEST_NG", "RELEASED"のうちのいずれかである必要があります',
    )
  }

  // 変更前のステータス：「開始前」
  // 変更後のステータス：「開始」、または「開始前」のままで変更しない
  if (
    originalTaskStatus === 'BEFORE_START' &&
    !(updatingTask.status == 'STARTED' || updatingTask.status == 'BEFORE_START')
  ) {
    console.error('課題のステータスが不正です（開始前 → 開始（または変更しない））')
    throw new Error('課題のステータスが不正です（開始前 → 開始（または変更しない））')
  }

  // 変更前のステータス：「開始」
  // 変更後のステータス：「開発終了」、または「開始」のままで変更しない
  if (
    originalTaskStatus === 'STARTED' &&
    !(updatingTask.status === 'DEV_FINISHED' || updatingTask.status === 'STARTED')
  ) {
    console.error('課題のステータスが不正です（開始 → 開発終了（または変更しない））')
    throw new Error('課題のステータスが不正です（開始 → 開発終了（または変更しない））')
  }

  // 変更前のステータス：「開発終了」
  // 変更後のステータス：「検証環境デプロイ」または「開始」、または「開発終了」のままで変更しない
  if (
    originalTaskStatus === 'DEV_FINISHED' &&
    !(
      updatingTask.status === 'VER_DEPLOYED' ||
      updatingTask.status === 'STARTED' ||
      updatingTask.status === 'DEV_FINISHED'
    )
  ) {
    console.error(
      '課題のステータスが不正です（開発終了 → 検証環境デプロイ | 開始（または変更しない））',
    )
    throw new Error(
      '課題のステータスが不正です（開発終了 → 検証環境デプロイ | 開始（または変更しない））',
    )
  }

  // 変更前のステータス：「検証環境デプロイ」
  // 変更後のステータス：「テストOK」または「テストNG」、または「検証環境デプロイ」のままで変更しない
  if (
    originalTaskStatus === 'VER_DEPLOYED' &&
    !(
      updatingTask.status === 'TEST_OK' ||
      updatingTask.status === 'TEST_NG' ||
      updatingTask.status === 'VER_DEPLOYED'
    )
  ) {
    console.error(
      '課題のステータスが不正です（検証環境デプロイ → テストOK | テストNG（または変更しない））',
    )
    throw new Error(
      '課題のステータスが不正です（検証環境デプロイ → テストOK | テストNG（または変更しない））',
    )
  }

  // 変更前のステータス：「テストOK」
  // 変更後のステータス：「リリース済み」、または「テストOK」のままで変更しない
  if (
    originalTaskStatus === 'TEST_OK' &&
    !(updatingTask.status === 'RELEASED' || updatingTask.status === 'TEST_OK')
  ) {
    console.error('課題のステータスが不正です（テストOK → リリース済み（または変更しない））')
    throw new Error('課題のステータスが不正です（テストOK → リリース済み（または変更しない））')
  }

  // 変更前のステータス：「テストNG」
  // 変更後のステータス：「開始」または「検証環境デプロイ」、または「テストNG」のままで変更しない
  if (
    originalTaskStatus === 'TEST_NG' &&
    !(
      updatingTask.status === 'STARTED' ||
      updatingTask.status === 'VER_DEPLOYED' ||
      updatingTask.status === 'TEST_NG'
    )
  ) {
    console.error(
      '課題のステータスが不正です（テストNG → 開始 | 検証環境デプロイ（または変更しない））',
    )
    throw new Error(
      '課題のステータスが不正です（テストNG → 開始 | 検証環境デプロイ（または変更しない））',
    )
  }

  // 変更前のステータス：「リリース済み」
  // 変更後のステータス：ステータス遷移不能なので「リリース済み」のみ
  if (originalTaskStatus === 'RELEASED' && updatingTask.status !== 'RELEASED') {
    console.error('課題のステータスが不正です（リリース済み → 遷移不能）')
    throw new Error('課題のステータスが不正です（リリース済み → 遷移不能）')
  }

  // userIdが存在しない場合はエラー
  if (!updatingTask.userId) {
    console.error('ユーザーIDが存在しません')
    throw new Error('ユーザーIDが存在しません')
  }

  // userIdが文字列以外の場合はエラー
  if (typeof updatingTask.userId !== 'string') {
    console.error('ユーザーIDは文字列である必要があります')
    throw new Error('ユーザーIDは文字列である必要があります')
  }

  // typeが存在しない場合はエラー
  if (!updatingTask.type) {
    console.error('課題のタイプが選択されていません')
    throw new Error('課題のタイプが選択されていません')
  }

  // typeが"FEATURE", "CHORE", "BUG"以外の場合はエラー
  if (!TASK_TYPE.includes(updatingTask.type)) {
    console.error('課題のタイプは"FEATURE", "CHORE", "BUG"のうちのいずれかである必要があります')
    throw new Error('課題のタイプは"FEATURE", "CHORE", "BUG"のうちのいずれかである必要があります')
  }

  // dueDateが存在する場合、Date型?Dayjs型以外であればエラー
  // TODO: ここの検証方法要検討
  // if (task.dueDate && typeof task.dueDate !== 'object') {
  //   console.error('')
  //   throw new Error('')
  // }

  // pointが存在する場合、数値以外であればエラー
  if (updatingTask.point && typeof updatingTask.point !== 'number') {
    console.error('課題のポイントは数値である必要があります')
    throw new Error('課題のポイントは数値である必要があります')
  }

  // pointが存在する場合、pointが30を超えている場合はエラー
  if (updatingTask.point && updatingTask.point > 30) {
    console.error('課題のポイントは30以下である必要があります')
    throw new Error('課題のポイントは30以下である必要があります')
  }

  // 課題のタイプが"FEATURE"以外の場合にdueDateやpointが存在する場合はエラー
  if (updatingTask.type !== 'FEATURE' && (updatingTask.dueDate || updatingTask.point)) {
    console.error('課題のタイプが"Chore"か"Bug"の場合、dueDateやpointを指定することはできません')
    throw new Error('課題のタイプが"Chore"か"Bug"の場合、dueDateやpointを指定することはできません')
  }

  // チェック用
  console.log('バリデーションOK！', updatingTask)

  return updatingTask
}
