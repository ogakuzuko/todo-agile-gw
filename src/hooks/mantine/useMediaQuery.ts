import { useMediaQuery as useMediaQueryOriginal } from '@mantine/hooks'

// Mantineのレスポンシブ幅と一致するように設定（https://mantine.dev/theming/responsive/）
const map = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px',
} as const

/**
 * 使い方
 * const largerThanXs = useMediaQuery('xs')
 * const largerThanSm = useMediaQuery('sm')
 * const largerThanMd = useMediaQuery('md')
 * const largerThanLg = useMediaQuery('lg')
 * const largerThanXl = useMediaQuery('xl')
 *
 * <Hoge className={`${largerThanSm ? 'hidden' : ''}`} />
 */
export const useMediaQuery = (
  query: keyof typeof map,
  initialValue: Parameters<typeof useMediaQueryOriginal>[1] = true,
) => {
  return useMediaQueryOriginal(`(min-width: ${map[query]})`, initialValue)
}
