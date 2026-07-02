'use client'

import { useState } from 'react'
import { DatePicker } from '@transight-design/ui/components/date-picker'

// 실제 컨트롤 가능한 프리뷰는 DatePickerPreviewShell(interactive-preview 라우팅)에서 렌더.
// 이 컴포넌트는 PREVIEWS 맵 등록용 fallback.
export const Preview = () => {
  const [date, setDate] = useState<Date | null>(new Date())
  return <DatePicker type='CALENDAR' selectedDate={date} onDateChange={setDate} />
}
