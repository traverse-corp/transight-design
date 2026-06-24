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
type Side = NonNullable<Parameters<typeof TooltipContent>[0]['side']>
type Align = NonNullable<Parameters<typeof TooltipContent>[0]['align']>
type ButtonColor = NonNullable<Parameters<typeof Button>[0]['color']>
type ButtonTheme = NonNullable<Parameters<typeof Button>[0]['theme']>
type ButtonSize = NonNullable<Parameters<typeof Button>[0]['size']>

// 컨트롤 정의 — {state key, 표시 label, 값} 형태로 분리해 Trigger/Content 탭에서
// 같은 'theme'/'size' 라벨을 쓰면서도 state key는 분리 유지 (탭이 다르니 사용자 혼동 없음).
interface ControlDef {
  stateKey: keyof State
  label: string
  values: readonly string[]
}

const TRIGGER_CONTROLS: ControlDef[] = [
  {
    stateKey: 'triggerColor',
    label: 'color',
    values: [
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
  },
  { stateKey: 'triggerTheme', label: 'theme', values: ['solid', 'outline', 'soft'] },
  { stateKey: 'triggerSize', label: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] }
]

const CONTENT_CONTROLS: ControlDef[] = [
  {
    stateKey: 'color',
    label: 'color',
    values: [
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
  },
  { stateKey: 'theme', label: 'theme', values: ['solid', 'outline', 'soft'] },
  { stateKey: 'size', label: 'size', values: ['sm', 'md', 'lg'] },
  { stateKey: 'side', label: 'side', values: ['top', 'right', 'bottom', 'left'] },
  { stateKey: 'align', label: 'align', values: ['start', 'center', 'end'] }
]

type Tab = 'trigger' | 'content'

interface State {
  triggerColor: ButtonColor
  triggerTheme: ButtonTheme
  triggerSize: ButtonSize
  side: Side
  align: Align
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
  <TooltipContent
    color="${s.color}"
    theme="${s.theme}"
    size="${s.size}"
    side="${s.side}"
    align="${s.align}"
  >
    도움말 텍스트입니다.
  </TooltipContent>
</Tooltip>`

export const TooltipPreviewShell = () => {
  const [state, setState] = useState<State>({
    triggerColor: 'gray',
    triggerTheme: 'outline',
    triggerSize: 'md',
    side: 'top',
    align: 'center',
    color: 'gray',
    theme: 'solid',
    size: 'md'
  })
  const [tab, setTab] = useState<Tab>('content')

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
                <TooltipContent
                  color={state.color}
                  theme={state.theme}
                  size={state.size}
                  side={state.side}
                  align={state.align}
                >
                  도움말 텍스트입니다.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        }
      />

      <div className='border-cool-grey-04 flex flex-col gap-4 border-t pt-5'>
        {/* 탭 — Trigger / Content */}
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
                {t === 'trigger' ? 'TooltipTrigger' : 'TooltipContent'}
              </button>
            )
          })}
        </div>

        {/* 탭별 컨트롤 */}
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
