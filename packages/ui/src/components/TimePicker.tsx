import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
interface TimePickerProps {
  value: string // "HH:mm" 형식의 시간 문자열 (예: "14:30")
  onChangeTime: (value: string) => void // 시간 변경 시 호출될 콜백 함수
  label?: string // 컴포넌트 상단에 표시될 라벨
  className?: string // 추가적인 커스텀 스타일 클래스
}

export const TimePicker: React.FC<TimePickerProps> = ({ className = '' }) => {
  const [hours, setHour] = useState(0)
  const [minutes, setMinutes] = useState(0)
  return (
    <div className={twMerge('flex h-full w-[120px] gap-2', className)}>
      <div className='scrollbar-hide max-h-85 w-1/2 overflow-y-scroll'>
        {Array.from({ length: 24 }).map((_, index) => (
          <button
            key={index}
            className={twMerge(
              'flex-center hover:bg-ts-primary-blue-1 w-full cursor-pointer p-2 hover:text-white',
              hours === index ? 'bg-ts-primary-blue-1 text-white' : 'bg-white'
            )}
            onClick={() => setHour(index)}
          >
            {index.toLocaleString()}
          </button>
        ))}
      </div>
      <div className='scrollbar-hide max-h-85 w-1/2 overflow-y-scroll'>
        {Array.from({ length: 12 }).map((_, index) => (
          <button
            key={index}
            className={twMerge(
              'flex-center hover:bg-ts-primary-blue-1 w-full cursor-pointer p-2 hover:text-white',
              minutes === index * 5 ? 'bg-ts-primary-blue-1 text-white' : 'bg-white'
            )}
            onClick={() => setMinutes(index * 5)}
          >
            {index * 5}
          </button>
        ))}
      </div>
    </div>
  )
}
