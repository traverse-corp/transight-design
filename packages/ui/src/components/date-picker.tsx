'use client'

import { useEffect } from 'react'
import { format, isValid, parse } from 'date-fns'
import { enUS, ko } from 'react-day-picker/locale'
import { CalendarSearch } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Calendar } from '@/components/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import { Button } from '@/components/button'
import { DateTimeInput } from '@/components/date-time-input'
import { cn } from '@/lib/utils'

export type DatePickerType = 'CALENDAR' | 'TYPE'

export interface DatePickerProps {
  /** 'CALENDAR' — 트리거 클릭 시 캘린더 팝오버. 'TYPE' — 세그먼트 입력. 기본값 'CALENDAR'. */
  type?: DatePickerType
  /** 피커 안쪽에 붙는 설명 텍스트 (예: '시작일자'). */
  text?: string
  /** true면 시간 선택까지 지원. CALENDAR는 우측 시/분 컬럼, TYPE은 hh/mm/ss 세그먼트를 노출. */
  isSelectTime?: boolean
  /** 현재 선택된 날짜. */
  selectedDate: Date | null
  /** 트리거 미선택 상태 라벨. 기본값 '날짜 선택'. */
  placeholder?: string
  /** 최소 선택 가능 일자. 이 날짜 이전은 disabled (CALENDAR 모드 한정). */
  startDate?: Date
  /** 최대 선택 가능 일자. 이 날짜 이후는 disabled (CALENDAR 모드 한정). */
  endDate?: Date
  className?: string
  onDateChange: (date: Date | null) => void
}

/**
 * DatePicker — 캘린더 팝오버 또는 세그먼트 입력으로 날짜(선택적으로 시간)를 선택한다.
 *
 * - 트리거 버튼은 `Button`(gray outline md) 기반. 필요한 스타일은 `className`으로 override.
 * - 캘린더/시간 컬럼 하이라이트는 `primary-blue-1` 토큰 고정. 날짜 셀은 기본 투명, hover/선택 시에만 색상.
 * - `TYPE` 모드는 `DateTimeInput`(세그먼트 입력) 위에 얹혀 있으며, `isSelectTime=false`일 땐 시간 세그먼트가 숨겨진다.
 * - `text`는 피커 안쪽(버튼 라벨 앞 / 세그먼트 앞)에 prefix로 붙는다.
 * - CALENDAR 모드에서 초기 미선택(`selectedDate === null`) 상태면 마운트 시 오늘 날짜로 세팅한다.
 */
export const DatePicker = ({
  type = 'CALENDAR',
  text,
  isSelectTime = false,
  selectedDate,
  placeholder = '날짜 선택',
  startDate,
  endDate,
  className,
  onDateChange
}: DatePickerProps) => {
  const { i18n } = useTranslation()

  // CALENDAR 모드는 초기 미선택 시 오늘 날짜로 기본 세팅한다 (마운트 시 1회).
  useEffect(() => {
    if (type === 'CALENDAR' && selectedDate === null) {
      onDateChange(new Date())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (type === 'TYPE') {
    const displayFmt = isSelectTime ? 'yyyy/MM/dd HH:mm:ss' : 'yyyy/MM/dd'
    const value = selectedDate ? format(selectedDate, displayFmt) : ''

    const handleChange = (formatted: string) => {
      const parsed = parse(formatted, displayFmt, new Date())
      onDateChange(isValid(parsed) ? parsed : null)
    }

    return (
      <DateTimeInput
        value={value}
        onChange={handleChange}
        showTime={isSelectTime}
        prefix={text}
        className={cn('h-10 w-fit flex-none px-2', className)}
      />
    )
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return
    if (isSelectTime && selectedDate) {
      const merged = new Date(date)
      merged.setHours(
        selectedDate.getHours(),
        selectedDate.getMinutes(),
        selectedDate.getSeconds(),
        0
      )
      onDateChange(merged)
      return
    }
    onDateChange(date)
  }

  const dateLabel = selectedDate
    ? format(selectedDate, isSelectTime ? 'yyyy / MM / dd HH:mm' : 'yyyy / MM / dd')
    : placeholder

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            color='gray'
            theme='outline'
            size='md'
            className={cn('p-2 active:scale-100', className)}
          >
            {text && <span className='text-fg-muted'>{text}</span>}
            <span>{dateLabel}</span>
            <CalendarSearch className='size-4' />
          </Button>
        }
      />
      <PopoverContent side='bottom' align='center' className='w-auto border-0 p-0'>
        <div className='flex'>
          <Calendar
            mode='single'
            selected={selectedDate ?? undefined}
            onSelect={handleCalendarSelect}
            required
            locale={i18n.language === 'ko' ? ko : enUS}
            className={cn(
              'p-1 text-xs',
              // 셀 크기 / padding 고정 + focus ring / outline 제거
              '[&_button[data-day]]:!size-8 [&_button[data-day]]:!min-w-0 [&_button[data-day]]:!p-1 [&_button[data-day]]:!aspect-square [&_button[data-day]]:!ring-0 [&_button[data-day]]:!outline-none [&_button[data-day]]:!border-0',
              // 기본은 투명, hover 시에만 배경, 선택 시 primary-blue-1
              '[&_button[data-day]]:!bg-transparent [&_button[data-day]]:hover:!bg-bg-muted',
              '[&_button[data-day][data-selected-single=true]]:!bg-primary-blue-1 [&_button[data-day][data-selected-single=true]]:!text-on-dark [&_button[data-day][data-selected-single=true]]:hover:!bg-primary-blue-1/90'
            )}
            classNames={{
              week: 'flex w-full mt-2 gap-2',
              weekdays: 'flex gap-2',
              day: 'p-0 size-8 flex-none relative rounded-md group/day'
            }}
            disabled={[
              ...(startDate ? [{ before: startDate }] : []),
              ...(endDate ? [{ after: endDate }] : [])
            ]}
          />
          {isSelectTime && <TimeColumns date={selectedDate} onChange={onDateChange} />}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface TimeColumnsProps {
  date: Date | null
  onChange: (date: Date) => void
}

/** 캘린더 우측에 붙는 시/분 선택 컬럼. */
const TimeColumns = ({ date, onChange }: TimeColumnsProps) => {
  const base = date ?? new Date()
  const hours = date?.getHours() ?? 0
  const minutes = date?.getMinutes() ?? 0

  const setHour = (h: number) => {
    const next = new Date(base)
    next.setHours(h, next.getMinutes(), 0, 0)
    onChange(next)
  }
  const setMinute = (m: number) => {
    const next = new Date(base)
    next.setMinutes(m, 0, 0)
    onChange(next)
  }

  // 캘린더 높이만큼만 차지하도록 absolute 자식 트릭 — TimeColumn 내부 콘텐츠가
  // flex 부모(popover 행)를 세로로 밀지 못하게 하고, 스크롤은 컬럼 내부에서.
  // 분은 5분 단위로 반올림해서 하이라이트.
  const activeMinute = Math.round(minutes / 5) * 5 === 60 ? 55 : Math.round(minutes / 5) * 5
  const hourValues = Array.from({ length: 24 }, (_, i) => i)
  const minuteValues = Array.from({ length: 12 }, (_, i) => i * 5)

  return (
    <div className='border-border-default relative w-20 shrink-0 self-stretch border-l'>
      <div className='absolute inset-0 flex'>
        <TimeColumn values={hourValues} active={hours} onSelect={setHour} />
        <TimeColumn values={minuteValues} active={activeMinute} onSelect={setMinute} />
      </div>
    </div>
  )
}

interface TimeColumnProps {
  values: number[]
  active: number
  onSelect: (n: number) => void
}

const TimeColumn = ({ values, active, onSelect }: TimeColumnProps) => (
  <ul className='scrollbar-hide flex h-full flex-1 flex-col items-center gap-1 overflow-y-auto py-1'>
    {values.map((n) => {
      const isActive = n === active
      return (
        <li key={n} className='shrink-0'>
          <button
            type='button'
            onClick={() => onSelect(n)}
            className={cn(
              'typo-r13 hover:bg-bg-muted flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors active:scale-100',
              isActive && 'bg-primary-blue-1 text-on-dark hover:bg-primary-blue-1/90'
            )}
          >
            {n.toString().padStart(2, '0')}
          </button>
        </li>
      )
    })}
  </ul>
)
