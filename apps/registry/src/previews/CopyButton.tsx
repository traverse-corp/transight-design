'use client'

import { CopyButton } from '@transight-design/ui/components/CopyButton'

export const Preview = () => (
  <div className='flex items-center gap-2'>
    <span className='typo-mono-m12 text-cool-grey-09'>0x3d2a..93e4ab</span>
    <CopyButton text='0x3d2a93e4ab' />
  </div>
)
