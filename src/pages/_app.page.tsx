import '@/styles/globals.css'
import '@/libs/firebase/init' // FirebaseApp 初期化
import '@/libs/dayjs/init'

import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

// eslint-disable-next-line import/no-default-export
export default MyApp
