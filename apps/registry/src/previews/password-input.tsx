'use client'

import { PasswordInput } from '@transight-design/ui/components/password-input'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof PasswordInput>[0]['shape']>
type Size = NonNullable<Parameters<typeof PasswordInput>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <PasswordInput
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    className='w-80'
  />
)
