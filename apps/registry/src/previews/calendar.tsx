'use client'

import { useState } from 'react'
import { Calendar } from '@transight-design/ui/components/calendar'

export const Preview = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode='single' selected={date} onSelect={setDate} />
}
