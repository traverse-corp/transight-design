'use client'

import CopyWrapper from '@transight-design/ui/components/CopyWrapper'

export const Preview = () => (
  <CopyWrapper text='클릭하면 이 텍스트가 복사됩니다'>
    <span className='typo-mono-m12 text-fg-default hover:text-primary-blue-1 cursor-pointer underline'>
      클릭해서 복사
    </span>
  </CopyWrapper>
)
