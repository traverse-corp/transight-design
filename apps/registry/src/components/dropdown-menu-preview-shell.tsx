'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@transight-design/ui/components/dropdown-menu'
import { Button } from '@transight-design/ui/components/button'
import { PreviewModePanel } from './preview-mode-panel'

type Size = NonNullable<Parameters<typeof DropdownMenuContent>[0]['size']>
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
  { stateKey: 'size', label: 'size', values: ['sm', 'md', 'lg'] }
]

type Tab = 'trigger' | 'content'

interface State {
  triggerColor: ButtonColor
  triggerTheme: ButtonTheme
  triggerSize: ButtonSize
  size: Size
}

const codeFor = (s: State) =>
  `<DropdownMenu>
  <DropdownMenuTrigger
    render={
      <Button color="${s.triggerColor}" theme="${s.triggerTheme}" size="${s.triggerSize}">
        메뉴 열기
      </Button>
    }
  />
  <DropdownMenuContent size="${s.size}">
    <DropdownMenuLabel>계정</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        프로필
        <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>설정</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

export const DropdownMenuPreviewShell = () => {
  const [state, setState] = useState<State>({
    triggerColor: 'gray',
    triggerTheme: 'outline',
    triggerSize: 'md',
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
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    color={state.triggerColor}
                    theme={state.triggerTheme}
                    size={state.triggerSize}
                  >
                    메뉴 열기
                  </Button>
                }
              />
              <DropdownMenuContent className='w-48' size={state.size}>
                <DropdownMenuLabel>계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    프로필
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>설정</DropdownMenuItem>
                  <DropdownMenuItem>알림</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive'>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                {t === 'trigger' ? 'DropdownMenuTrigger' : 'DropdownMenuContent'}
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
