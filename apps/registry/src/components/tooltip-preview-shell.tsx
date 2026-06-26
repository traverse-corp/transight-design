'use client'

import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@transight-design/ui/components/tooltip'
import { Button } from '@transight-design/ui/components/button'
import { PreviewModePanel } from './preview-mode-panel'

type Color = NonNullable<Parameters<typeof TooltipContent>[0]['color']>
type Theme = NonNullable<Parameters<typeof TooltipContent>[0]['theme']>
type Size = NonNullable<Parameters<typeof TooltipContent>[0]['size']>
type ButtonColor = NonNullable<Parameters<typeof Button>[0]['color']>
type ButtonTheme = NonNullable<Parameters<typeof Button>[0]['theme']>
type ButtonSize = NonNullable<Parameters<typeof Button>[0]['size']>

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
  { stateKey: 'color', label: 'color', values: COLORS },
  { stateKey: 'theme', label: 'theme', values: ['solid', 'outline', 'soft'] },
  { stateKey: 'size', label: 'size', values: ['sm', 'md', 'lg'] }
]

type Tab = 'trigger' | 'content'

interface State {
  triggerColor: ButtonColor
  triggerTheme: ButtonTheme
  triggerSize: ButtonSize
  color: Color
  theme: Theme
  size: Size
}

const codeFor = (s: State) =>
  `<Tooltip>
  <TooltipTrigger
    render={
      <Button color="${s.triggerColor}" theme="${s.triggerTheme}" size="${s.triggerSize}">
        호버
      </Button>
    }
  />
  <TooltipContent color="${s.color}" theme="${s.theme}" size="${s.size}">
    도움말 텍스트입니다.
  </TooltipContent>
</Tooltip>`

export const TooltipPreviewShell = () => {
  const [state, setState] = useState<State>({
    triggerColor: 'gray',
    triggerTheme: 'outline',
    triggerSize: 'md',
    color: 'gray',
    theme: 'solid',
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      color={state.triggerColor}
                      theme={state.triggerTheme}
                      size={state.triggerSize}
                    >
                      마우스 올리기
                    </Button>
                  }
                />
                <TooltipContent color={state.color} theme={state.theme} size={state.size}>
                  도움말 텍스트입니다.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        }
      />

      <div className='border-border-default flex flex-col gap-4 border-t pt-5'>
        <div className='border-border-default flex gap-1 border-b'>
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
                    : 'text-fg-muted hover:text-fg-strong typo-m14 -mb-px border-b-2 border-transparent px-3 py-2 transition-colors'
                }
              >
                {t === 'trigger' ? 'TooltipTrigger' : 'TooltipContent'}
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
    <span className='typo-sb12 text-fg-muted w-20 shrink-0'>{label}</span>
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
