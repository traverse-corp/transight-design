'use client'

import { useState } from 'react'
import { Switch } from '@transight-design/ui/components/switch'
import { Label } from '@transight-design/ui/components/label'

export const Preview = () => {
  const [checked, setChecked] = useState(true)

  return (
    <div className='flex items-center gap-2'>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <Label>알림 받기</Label>
    </div>
  )
}
