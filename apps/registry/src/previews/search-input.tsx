'use client'

import { SearchInput } from '@transight-design/ui/components/search-input'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof SearchInput>[0]['shape']>
type Size = NonNullable<Parameters<typeof SearchInput>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <SearchInput
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    placeholder='Search Address'
    onSearch={(value) => console.log('search:', value)}
    className='w-80'
  />
)
