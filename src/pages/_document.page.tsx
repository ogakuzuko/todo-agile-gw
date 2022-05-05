import { createGetInitialProps } from '@mantine/next'
import Document from 'next/document'

const getInitialProps = createGetInitialProps()

// eslint-disable-next-line import/no-default-export
export default class _Document extends Document {
  static getInitialProps = getInitialProps
}
