'use client'

import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '@transight-design/ui/components/popover'
import { Button } from '@transight-design/ui/components/button'
import { PreviewModePanel } from './preview-mode-panel'

type Shape = NonNullable<Parameters<typeof PopoverContent>[0]['shape']>
type Size = NonNullable<Parameters<typeof PopoverContent>[0]['size']>
type ButtonColor = NonNullable<Parameters<typeof Button>[0]['color']>
type ButtonTheme = NonNullable<Parameters<typeof Button>[0]['theme']>
type ButtonSize = NonNullable<Parameters<typeof Button>[0]['size']>

interface State {
  triggerColor: ButtonColor
  triggerTheme: ButtonTheme
  triggerSize: ButtonSize
  shape: Shape
  size: Size
}

interface ControlDef {
  stateKey: keyof State
  label: string
  values: readonly string[]
}

const COLORS: readonly string[] = [
  'gray',
  'blue',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'skyblue',
  'purple',
  'pink',
  'white',
  'gradient-blue'
]

const TRIGGER_CONTROLS: ControlDef[] = [
  { stateKey: 'triggerColor', label: 'color', values: COLORS },
  { stateKey: 'triggerTheme', label: 'theme', values: ['solid', 'outline', 'soft'] },
  { stateKey: 'triggerSize', label: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] }
]

const CONTENT_CONTROLS: ControlDef[] = [
  { stateKey: 'shape', label: 'shape', values: ['default', 'square'] },
  { stateKey: 'size', label: 'size', values: ['sm', 'md', 'lg'] }
]

type Tab = 'trigger' | 'content'

const codeFor = (s: State) =>
  `<Popover>
  <PopoverTrigger
    render={
      <Button color="${s.triggerColor}" theme="${s.triggerTheme}" size="${s.triggerSize}">
        팝오버 열기
      </Button>
    }
  />
  <PopoverContent shape="${s.shape}" size="${s.size}">
    <PopoverHeader>
      <PopoverTitle>알림</PopoverTitle>
      <PopoverDescription>새로운 메시지가 3건 있습니다.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`

export const PopoverPreviewShell = () => {
  const [state, setState] = useState<State>({
    triggerColor: 'gray',
    triggerTheme: 'outline',
    triggerSize: 'md',
    shape: 'default',
    size: 'md'
  })
  const [tab, setTab] = useState<Tab>('trigger')

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((prev) => ({ ...prev, [key]: value }))

  return (
    <div className='flex flex-col gap-5'>
      <PreviewModePanel
        code={codeFor(state)}
        preview={
          <div className='flex min-h-40 items-center justify-center'>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    color={state.triggerColor}
                    theme={state.triggerTheme}
                    size={state.triggerSize}
                  >
                    팝오버 열기
                  </Button>
                }
              />
              <PopoverContent shape={state.shape} size={state.size}>
                <PopoverHeader>
                  <PopoverTitle>알림</PopoverTitle>
                  <PopoverDescription>새로운 메시지가 3건 있습니다.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </div>
        }
      />

      <div className='border-cool-grey-04 flex flex-col gap-4 border-t pt-5'>
        <div className='border-cool-grey-04 flex gap-1 border-b'>
          {(['trigger', 'content'] as Tab[]).map((t) => {
            const active = tab === t
            return (
              <button
                key={t}
                type='button'
                onClick={() => setTab(t)}
                className={
                  active
                    ? 'border-primary-blue-1 text-primary-blue-1 typo-sb14 -mb-px border-b-2 px-3 py-2'
                    : 'text-cool-grey-07 hover:text-cool-grey-11 typo-m14 -mb-px border-b-2 border-transparent px-3 py-2 transition-colors'
                }
              >
                {t === 'trigger' ? 'PopoverTrigger' : 'PopoverContent'}
              </button>
            )
          })}
        </div>

        <div className='flex flex-col gap-3'>
          {(tab === 'trigger' ? TRIGGER_CONTROLS : CONTENT_CONTROLS).map((ctrl) => (
            <ControlRow
              key={ctrl.stateKey}
              label={ctrl.label}
              values={ctrl.values}
              active={state[ctrl.stateKey]}
              onChange={(v) => set(ctrl.stateKey, v as never)}
            />
          ))}
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
    <span className='typo-sb12 text-cool-grey-07 w-20 shrink-0'>{label}</span>
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
                ? 'bg-cool-grey-09 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
                : 'text-cool-grey-07 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
            }
          >
            {value}
          </button>
        )
      })}
    </div>
  </div>
)
