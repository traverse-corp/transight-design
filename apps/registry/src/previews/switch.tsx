'use client'

import { useState } from 'react'
import { Switch } from '@transight-design/ui/components/switch'
import { Label } from '@transight-design/ui/components/label'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Switch>[0]['color']>
type Shape = NonNullable<Parameters<typeof Switch>[0]['shape']>
type Size = NonNullable<Parameters<typeof Switch>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  const [checked, setChecked] = useState(true)

  return (
    <div className='flex items-center gap-2'>
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        color={(selections.color as Color) ?? undefined}
        shape={(selections.shape as Shape) ?? undefined}
        size={(selections.size as Size) ?? undefined}
      />
      <Label>알림 받기</Label>
    </div>
  )
}
