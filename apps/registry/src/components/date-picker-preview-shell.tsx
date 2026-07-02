'use client'

import { useEffect, useState } from 'react'
import { DatePicker } from '@transight-design/ui/components/date-picker'
import { Input } from '@transight-design/ui/components/input'
import { PreviewModePanel } from './preview-mode-panel'

type PickerType = 'CALENDAR' | 'TYPE'
type Toggle = 'off' | 'on'

interface State {
  type: PickerType
  isSelectTime: Toggle
  text: string
}

interface ToggleControlDef {
  stateKey: 'type' | 'isSelectTime'
  label: string
  values: readonly string[]
}

const TOGGLE_CONTROLS: ToggleControlDef[] = [
  { stateKey: 'type', label: 'type', values: ['CALENDAR', 'TYPE'] },
  { stateKey: 'isSelectTime', label: 'isSelectTime', values: ['off', 'on'] }
]

const codeFor = (s: State) => {
  const props: string[] = [`type="${s.type}"`]
  if (s.isSelectTime === 'on') props.push('isSelectTime')
  if (s.text) props.push(`text="${s.text}"`)
  props.push('selectedDate={date}', 'onDateChange={setDate}')
  return `<DatePicker\n  ${props.join('\n  ')}\n/>`
}

export const DatePickerPreviewShell = () => {
  const [state, setState] = useState<State>({
    type: 'CALENDAR',
    isSelectTime: 'off',
    text: '시작일자'
  })
  const [date, setDate] = useState<Date | null>(new Date())

  // 모드 전환 시 초기값 리셋 — CALENDAR는 오늘, TYPE은 빈 값.
  useEffect(() => {
    setDate(state.type === 'CALENDAR' ? new Date() : null)
  }, [state.type])

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((prev) => ({ ...prev, [key]: value }))

  return (
    <div className='flex flex-col gap-5'>
      <PreviewModePanel
        code={codeFor(state)}
        preview={
          <div className='flex min-h-40 items-center justify-center'>
            <DatePicker
              type={state.type}
              isSelectTime={state.isSelectTime === 'on'}
              text={state.text || undefined}
              selectedDate={date}
              onDateChange={setDate}
            />
          </div>
        }
      />

      <div className='border-border-default flex flex-col gap-3 border-t pt-5'>
        {TOGGLE_CONTROLS.map((ctrl) => (
          <ControlRow
            key={ctrl.stateKey}
            label={ctrl.label}
            values={ctrl.values}
            active={state[ctrl.stateKey]}
            onChange={(v) => set(ctrl.stateKey, v as never)}
          />
        ))}
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
