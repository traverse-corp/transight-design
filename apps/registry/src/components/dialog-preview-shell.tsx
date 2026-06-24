'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogPopup,
  DialogTitle,
  DialogTrigger
} from '@transight-design/ui/components/dialog'
import { Button } from '@transight-design/ui/components/button'
import { PreviewModePanel } from './preview-mode-panel'

type PopupSize = NonNullable<Parameters<typeof DialogPopup>[0]['size']>
type PopupShape = NonNullable<Parameters<typeof DialogPopup>[0]['shape']>
type PopupFrom = NonNullable<Parameters<typeof DialogPopup>[0]['from']>
type ButtonColor = NonNullable<Parameters<typeof Button>[0]['color']>
type ButtonTheme = NonNullable<Parameters<typeof Button>[0]['theme']>
type ButtonSize = NonNullable<Parameters<typeof Button>[0]['size']>

interface State {
  triggerColor: ButtonColor
  triggerTheme: ButtonTheme
  triggerSize: ButtonSize
  size: PopupSize
  shape: PopupShape
  from: PopupFrom
}

interface ControlDef {
  stateKey: keyof State
  label: string
  values: readonly string[]
}

const BUTTON_COLORS: readonly string[] = [
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
  { stateKey: 'triggerColor', label: 'color', values: BUTTON_COLORS },
  { stateKey: 'triggerTheme', label: 'theme', values: ['solid', 'outline', 'soft'] },
  { stateKey: 'triggerSize', label: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] }
]

const CONTENT_CONTROLS: ControlDef[] = [
  { stateKey: 'size', label: 'size', values: ['sm', 'md', 'lg', 'xl', 'full'] },
  { stateKey: 'shape', label: 'shape', values: ['default', 'square'] },
  { stateKey: 'from', label: 'from', values: ['top', 'bottom', 'left', 'right'] }
]

type Tab = 'trigger' | 'content'

const codeFor = (s: State) =>
  `<Dialog>
  <DialogTrigger
    render={
      <Button color="${s.triggerColor}" theme="${s.triggerTheme}" size="${s.triggerSize}">
        다이얼로그 열기
      </Button>
    }
  />
  <DialogPopup size="${s.size}" shape="${s.shape}" from="${s.from}">
    <DialogTitle>새 작업</DialogTitle>
    <DialogDescription>새로운 트랜잭션 추적을 시작합니다.</DialogDescription>
    <DialogFooter>
      <DialogClose theme="outline" size="sm">취소</DialogClose>
      <DialogClose color="blue" size="sm">시작</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>`

export const DialogPreviewShell = () => {
  const [state, setState] = useState<State>({
    triggerColor: 'gray',
    triggerTheme: 'solid',
    triggerSize: 'md',
    size: 'md',
    shape: 'default',
    from: 'top'
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
            <Dialog>
              <DialogTrigger
                render={
                  <Button
                    color={state.triggerColor}
                    theme={state.triggerTheme}
                    size={state.triggerSize}
                  >
                    다이얼로그 열기
                  </Button>
                }
              />
              <DialogPopup size={state.size} shape={state.shape} from={state.from}>
                <DialogTitle>새 작업</DialogTitle>
                <DialogDescription>새로운 트랜잭션 추적을 시작합니다.</DialogDescription>
                <DialogFooter className='mt-2'>
                  <DialogClose theme='outline' size='sm'>
                    취소
                  </DialogClose>
                  <DialogClose color='blue' size='sm'>
                    시작
                  </DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
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
                {t === 'trigger' ? 'DialogTrigger' : 'DialogPopup'}
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
