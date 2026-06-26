import { Calendar } from '@/components/calendar'
import { enUS, ko } from 'react-day-picker/locale'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import { CalendarSearch } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
// import { TimePicker } from './TimePicker'

interface DatePickerProps {
  type: 'START' | 'END'
  selectedDate: Date | null
  isSelectTime?: boolean
  timeZone?: string
  className?: string
  onDateChange: (date: Date, type: 'START' | 'END') => void
}

/**
 * 날짜 선택을 위한 DatePicker 컴포넌트
 *
 * @component
 * @description
 * Popover와 Calendar를 사용하여 날짜를 선택할 수 있는 컴포넌트입니다.
 * 시작일(START)과 종료일(END) 타입에 따라 라벨이 달라지며,
 * 선택된 날짜가 없을 경우 해당 라벨을 표시합니다.
 * 미래의 날짜는 선택할 수 없도록 비활성화되어 있습니다.
 *
 * @param {DatePickerProps} props
 * @param {'START' | 'END'} props.type - 날짜 선택 타입 (시작일/종료일). 라벨 텍스트 결정에 사용됩니다.
 * @param {Date | null} props.selectedDate - 현재 선택된 날짜 객체. 없으면 null.
 * @param {boolean} [props.isSelectTime=false] - 시간 선택 여부 (현재 기능은 주석 처리됨). 스타일링에 영향을 줍니다.
 * @param {string} [props.className] - 추가적인 스타일링을 위한 클래스명.
 * @param {string} [props.timeZone='Asia/Seoul'] - 캘린더의 타임존 설정. 기본값은 'Asia/Seoul'.
 * @param {(date: Date, type: 'START' | 'END') => void} props.onDateChange - 날짜 변경 시 호출되는 콜백 함수.
 */
function DatePicker({
  type,
  selectedDate,
  isSelectTime = false,
  className,
  timeZone = 'Asia/Seoul',
  onDateChange
}: DatePickerProps) {
  const { t, i18n } = useTranslation()

  // 타입에 따른 라벨 키 설정 (START: 시작일, END: 종료일)
  const label = type === 'START' ? 'US_026' : 'US_028'

  /**
   * 캘린더에서 날짜 선택 시 호출되는 핸들러
   * @param {Date | null} newDate - 선택된 새로운 날짜
   */
  const handleChangeDate = (newDate: Date | null) => {
    // 날짜가 선택되지 않은 경우(선택 취소 등) 무시
    if (!newDate) return
    onDateChange(newDate, type)
  }

  return (
    <Popover>
      {/* 
        PopoverTrigger: 캘린더를 여는 트리거 버튼 
        - 선택된 날짜가 있으면 날짜 포맷팅(yyyy / MM / dd)하여 표시
        - 없으면 다국어 처리된 라벨 표시
      */}
      <PopoverTrigger
        className={twMerge(
          'border-border-default hover:border-border-strong flex-between-center relative h-15 w-70 rounded-md border bg-bg-card p-3 text-sm shadow-sm',
          isSelectTime ? 'text-xs' : 'text-sm',
          className
        )}
      >
        <span>{selectedDate ? format(selectedDate, 'yyyy / MM / dd') : t(label)}</span>
        {/* 시간 선택 모드가 아닐 경우에만 검색 아이콘 표시 */}
        {!isSelectTime && <CalendarSearch className='size-4' />}
      </PopoverTrigger>

      <PopoverContent className='flex w-full'>
        <Calendar
          mode='single'
          timeZone={timeZone}
          selected={selectedDate || new Date()} // 선택된 날짜가 없으면 오늘 날짜를 기준으로 보여줌
          onSelect={handleChangeDate}
          required // 날짜 선택 필수
          locale={i18n.language === 'ko' ? ko : enUS} // 현재 언어 설정에 따른 로케일 적용
          className='w-75'
          disabled={[{ after: new Date() }]} // 미래 날짜 선택 비활성화
        />
        {/* 시간 선택 컴포넌트 (현재 미사용) */}
        {/* {isSelectTime && <TimePicker />} */}
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
