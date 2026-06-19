'use client'

import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@transight-design/ui/components/toggle-group'
import { Bold, Italic, Underline } from 'lucide-react'

export const Preview = () => {
  const [value, setValue] = useState<string[]>(['bold'])

  return (
    <ToggleGroup value={value} onValueChange={setValue} variant='toolbar'>
      <ToggleGroupItem value='bold' aria-label='Bold'>
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Italic'>
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' aria-label='Underline'>
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
