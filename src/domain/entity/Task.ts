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
