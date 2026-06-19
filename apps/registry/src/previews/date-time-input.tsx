'use client'

import { useState } from 'react'
import { DateTimeInput } from '@transight-design/ui/components/date-time-input'

export const Preview = () => {
  const [value, setValue] = useState('2026-06-18 14:30:00')
  return <DateTimeInput value={value} onChange={setValue} />
}
