'use client'

import * as React from 'react'
import {
  Icon,
  resolveIconColorToken,
  type IconColor,
  type IconSize
} from '@/icons/icon'
import { ICON_NAMES } from '@/icons/icons.gen'
import { IconSystemNav } from './icon-system-nav'

const SIZES: { value: IconSize; label: string; px: number }[] = [
  { value: 'xs', label: 'xs', px: 12 },
  { value: 'sm', label: 'sm', px: 14 },
  { value: 'md', label: 'md', px: 16 },
  { value: 'lg', label: 'lg', px: 20 },
  { value: 'xl', label: 'xl', px: 24 }
]

const COLOR_GROUPS: { label: string; colors: IconColor[] }[] = [
  {
    label: 'cool-grey',
    colors: [
      'white',
      'cool-grey-01',
      'cool-grey-02',
      'cool-grey-03',
      'cool-grey-04',
      'cool-grey-05',
      'cool-grey-06',
      'cool-grey-07',
      'cool-grey-08',
      'cool-grey-09',
      'cool-grey-10',
      'cool-grey-11',
      'black'
    ]
  },
  {
    label: 'primary',
    colors: [
      'primary-blue-1',
      'primary-blue-2',
      'primary-blue-deep',
      'primary-skyblue-1',
      'primary-skyblue-2'
    ]
  },
  {
    label: 'ui',
    colors: [
      'ui-red',
      'ui-orange',
      'ui-yellow',
      'ui-olive',
      'ui-green',
      'ui-skyblue',
      'ui-blue',
      'ui-purple',
      'ui-pink',
      'ui-amber'
    ]
  },
  {
    label: 'ui-text',
    colors: [
      'ui-text-red',
      'ui-text-orange',
      'ui-text-yellow',
      'ui-text-olive',
      'ui-text-green',
      'ui-text-skyblue',
      'ui-text-blue',
      'ui-text-purple',
      'ui-text-pink',
      'ui-text-amber'
    ]
  }
]

export const PreviewShell = () => {
  const [color, setColor] = React.useState<IconColor>('black')
  const [size, setSize] = React.useState<IconSize>('md')
  const [copied, setCopied] = React.useState<string | null>(null)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copySnippet = React.useCallback(
    async (name: string) => {
      const snippet = `<Icon src="${name}" color="${color}" size="${size}" />`
      try {
        await navigator.clipboard.writeText(snippet)
      } catch {
        // clipboard API may be unavailable (e.g. insecure context) — silently skip
      }
      setCopied(name)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(null), 1200)
    },
    [color, size]
  )

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  return (
    <div className='mx-auto flex h-screen max-w-7xl gap-10 px-6'>
      <IconSystemNav>
        {/* Size */}
        <section className='border-border-default mb-6 border-t pt-6'>
          <h4 className='typo-sb12 text-fg-muted mb-3 px-2 uppercase tracking-wider'>Size</h4>
          <div className='flex flex-col gap-1'>
            {SIZES.map((s) => {
              const active = s.value === size
              return (
                <button
                  key={s.value}
                  type='button'
                  onClick={() => setSize(s.value)}
                  className={
                    active
                      ? 'bg-primary-blue-1/10 text-primary-blue-1 typo-sb14 flex items-center justify-between rounded-md px-3 py-1.5'
                      : 'text-fg-default hover:bg-bg-muted hover:text-fg-strong typo-m14 flex items-center justify-between rounded-md px-3 py-1.5'
                  }
                >
                  <span className='font-mono'>{s.label}</span>
                  <span className='typo-m11 text-fg-muted'>{s.px}px</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Color */}
        <section className='border-border-default border-t pt-6'>
          <h4 className='typo-sb12 text-fg-muted mb-3 px-2 uppercase tracking-wider'>Color</h4>
          <div className='flex flex-col gap-4'>
            {COLOR_GROUPS.map((group) => (
              <div key={group.label}>
                <div className='typo-m11 text-fg-muted mb-1.5 px-2'>{group.label}</div>
                <div className='flex flex-col gap-0.5'>
                  {group.colors.map((c) => {
                    const active = c === color
                    return (
                      <button
                        key={c}
                        type='button'
                        onClick={() => setColor(c)}
                        title={c}
                        className={
                          active
                            ? 'bg-primary-blue-1/10 text-primary-blue-1 typo-sb12 flex items-center gap-2 rounded-md px-3 py-1.5'
                            : 'text-fg-default hover:bg-bg-muted hover:text-fg-strong typo-m12 flex items-center gap-2 rounded-md px-3 py-1.5'
                        }
                      >
                        <span
                          className='border-border-default inline-block h-3.5 w-3.5 shrink-0 rounded-sm border'
                          style={{ backgroundColor: `var(--color-${resolveIconColorToken(c)})` }}
                        />
                        <span className='truncate font-mono'>{c}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </IconSystemNav>

      {/* 우측 메인 — 아이콘 그리드 */}
      <div className='scrollbar-subtle h-screen min-w-0 flex-1 overflow-y-auto py-10'>
        <header className='mb-6 flex items-end justify-between'>
          <div>
            <h1 className='typo-b24 text-fg-strong'>Icons</h1>
            <p className='typo-r12 text-fg-muted mt-1'>
              {ICON_NAMES.length}개 아이콘 · 카드 클릭 시 코드 스니펫 복사
            </p>
          </div>
          <div className='typo-mono-m12 text-fg-muted'>
            color=<span className='text-fg-default'>{color}</span> · size=
            <span className='text-fg-default'>{size}</span>
          </div>
        </header>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2'>
          {ICON_NAMES.map((name) => {
            const isCopied = copied === name
            return (
              <button
                key={name}
                type='button'
                onClick={() => copySnippet(name)}
                title={`Click to copy <Icon src="${name}" color="${color}" size="${size}" />`}
                className={
                  'group bg-bg-card relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 text-left transition ' +
                  (isCopied
                    ? 'border-primary-blue-1 bg-primary-skyblue-1'
                    : 'border-border-default hover:border-border-strong hover:bg-bg-subtle active:bg-bg-muted')
                }
              >
                <div className='flex h-10 w-10 items-center justify-center'>
                  <Icon src={name} color={color} size={size} />
                </div>
                <div
                  className='text-fg-muted typo-mono-m12 w-full truncate text-center'
                  title={name}
                >
                  {name}
                </div>
                {isCopied && (
                  <span className='bg-primary-blue-1 text-fg-inverse typo-sb11 pointer-events-none absolute right-1.5 top-1.5 rounded-sm px-1.5 py-0.5'>
                    Copied
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
