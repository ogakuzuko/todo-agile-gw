import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// タイムゾーンを扱えるようにする
dayjs.extend(utc)
dayjs.extend(timezone)

// デフォルトのタイムゾーンを設定（ ex. dayjs().tz().format("YYYY-MM-DD-HH-mm"); // 現在の日本時間が表示される ）
dayjs.tz.setDefault('Asia/Tokyo')

// localeの設定（ ex. dayjs().format('YYYY/MM/DD(ddd) HH:mm') // 2022/05/02(月) 20:34 ）
dayjs.locale(ja)
