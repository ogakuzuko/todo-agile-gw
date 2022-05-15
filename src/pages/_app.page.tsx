import '@/styles/globals.css'
import '@/libs/firebase/init' // FirebaseApp 初期化
import '@/libs/dayjs/init'

import { MantineProvider } from '@mantine/core'
import { ClickToComponent } from 'click-to-react-component'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ClickToComponent />
      <Component {...pageProps} />
    </MantineProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp
