'use client'

import { useState } from 'react'
import DatePicker from '@transight-design/ui/components/DatePicker'

export const Preview = () => {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      type='START'
      selectedDate={date}
      onDateChange={(nextDate) => setDate(nextDate)}
    />
  )
}
