'use client'

import { useState } from 'react'
import { DatePicker } from '@transight-design/ui/components/date-picker'
import { Input } from '@transight-design/ui/components/input'
import { PreviewModePanel } from './preview-mode-panel'

type Toggle = 'off' | 'on'

interface State {
  isSelectTime: Toggle
  text: string
}

const codeFor = (s: State) => {
  const props: string[] = []
  if (s.isSelectTime === 'on') props.push('isSelectTime')
  if (s.text) props.push(`text="${s.text}"`)
  props.push('selectedDate={date}', 'onDateChange={setDate}')
  return `<DatePicker\n  ${props.join('\n  ')}\n/>`
}

/**
 * DatePicker는 STYLE 4축(color/theme/shape/size)이 없는 custom 컴포넌트라
 * Style 섹션 없이 Props 섹션 최상단 인터랙티브 shell 로만 노출된다.
 */
export const DatePickerPreviewShell = () => {
  const [state, setState] = useState<State>({
    isSelectTime: 'off',
    text: '시작일자'
  })
  const [date, setDate] = useState<Date | null>(new Date())

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((prev) => ({ ...prev, [key]: value }))

  return (
    <div className='flex flex-col gap-5'>
      <PreviewModePanel
        code={codeFor(state)}
        preview={
          <div className='flex min-h-40 items-center justify-center'>
            <DatePicker
              isSelectTime={state.isSelectTime === 'on'}
              text={state.text || undefined}
              selectedDate={date}
              onDateChange={setDate}
            />
          </div>
        }
      />

      <div className='border-border-default flex flex-col gap-3 border-t pt-5'>
        <ControlRow
          label='isSelectTime'
          values={['off', 'on']}
          active={state.isSelectTime}
          onChange={(v) => set('isSelectTime', v as Toggle)}
        />
        <div className='flex flex-wrap items-center gap-2'>
          <span className='typo-sb12 text-fg-muted w-24 shrink-0'>text</span>
          <Input
            size='sm'
            value={state.text}
            onChange={(e) => set('text', e.target.value)}
            placeholder='시작일자'
            className='max-w-64'
          />
        </div>
      </div>
    </div>
  )
}

interface ControlRowProps {
  label: string
  values: readonly string[]
  active: string
  onChange: (value: string) => void
}

const ControlRow = ({ label, values, active, onChange }: ControlRowProps) => (
  <div className='flex flex-wrap items-center gap-2'>
    <span className='typo-sb12 text-fg-muted w-24 shrink-0'>{label}</span>
    <div className='flex flex-wrap gap-1'>
      {values.map((value) => {
        const isActive = active === value
        return (
          <button
            key={value}
            type='button'
            onClick={() => onChange(value)}
            className={
              isActive
                ? 'bg-fg-strong typo-mono-m12 rounded-md px-2.5 py-1 text-fg-inverse'
                : 'text-fg-muted hover:bg-bg-muted hover:text-fg-strong typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
            }
          >
            {value}
          </button>
        )
      })}
    </div>
  </div>
)
