import { render } from '@testing-library/react'

import { SampleTest } from '@/components/SampleTest'

describe('SampleTestコンポーネントが正常に表示される', () => {
  it('文字列：Next×Jest Sample', () => {
    const { getByText } = render(<SampleTest />)

    expect(getByText('Next×Jest Sample')).toBeTruthy()
  })
})
