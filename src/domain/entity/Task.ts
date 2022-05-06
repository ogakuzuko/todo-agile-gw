// 目標は、このファイルを見ればTaskのドメインルールが全てわかること
// Firestoreへの保存処理はここでは絡んでこないので単体テストが書きやすい
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

  return task
}

// NOTE: 引数：タスクの更新内容（現在のタスクStatus）と、更新後のstatus（押したボタンで判定（ex. テストOKを押したら、更新後のstatusは'TEST_OK'なので、引数として'TEST_OK'が渡される））
export const updateTask = (updatingTask: Task, originalTaskStatus: Status): Task => {
  // Write(書き込み)用のドメインバリデーション

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

  // 変更前のステータスが「開始前」である時、変更後のステータスが「開始」でなければエラー
  if (originalTaskStatus === 'BEFORE_START' && updatingTask.status !== 'STARTED') {
    console.error('課題のステータスが不正です（開始前 → 開始）')
    throw new Error('課題のステータスが不正です（開始前 → 開始）')
  }

  // 変更前のステータスが「開始」である時、変更後のステータスが「開発終了」でなければエラー
  if (originalTaskStatus === 'STARTED' && updatingTask.status !== 'DEV_FINISHED') {
    console.error('課題のステータスが不正です（開始 → 開発終了）')
    throw new Error('課題のステータスが不正です（開始 → 開発終了）')
  }

  // 変更前のステータスが「開発終了」である時、変更後のステータスが「検証環境デプロイ」または「開始」でなければエラー
  if (
    originalTaskStatus === 'DEV_FINISHED' &&
    !(updatingTask.status === 'VER_DEPLOYED' || updatingTask.status === 'STARTED')
  ) {
    console.error('課題のステータスが不正です（開発終了 → 検証環境デプロイ | 開始）')
    throw new Error('課題のステータスが不正です（開発終了 → 検証環境デプロイ | 開始）')
  }

  // 変更前のステータスが「検証環境デプロイ」である時、変更後のステータスが「テストOK」または「テストNG」でなければエラー
  if (
    originalTaskStatus === 'VER_DEPLOYED' &&
    !(updatingTask.status === 'TEST_OK' || updatingTask.status === 'TEST_NG')
  ) {
    console.error('課題のステータスが不正です（検証環境デプロイ → テストOK | テストNG）')
    throw new Error('課題のステータスが不正です（検証環境デプロイ → テストOK | テストNG）')
  }

  // 変更前のステータスが「テストOK」である時、変更後のステータスが「リリース済み」でなければエラー
  if (originalTaskStatus === 'TEST_OK' && updatingTask.status !== 'RELEASED') {
    console.error('課題のステータスが不正です（テストOK → リリース済み）')
    throw new Error('課題のステータスが不正です（テストOK → リリース済み）')
  }

  // 変更前のステータスが「テストNG」である時、変更後のステータスが「開始」または「検証環境デプロイ」でなければエラー
  if (
    originalTaskStatus === 'TEST_NG' &&
    !(updatingTask.status === 'STARTED' || updatingTask.status === 'VER_DEPLOYED')
  ) {
    console.error('課題のステータスが不正です（テストNG → 開始 | 検証環境デプロイ）')
    throw new Error('課題のステータスが不正です（テストNG → 開始 | 検証環境デプロイ）')
  }

  // 変更前のステータスが「リリース済み」である時、ステータス遷移不能（=変更後も「リリース済み」でなければエラー）
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
