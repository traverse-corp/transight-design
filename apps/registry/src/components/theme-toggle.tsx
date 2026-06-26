'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useEffect, useState } from 'react'

const OPTIONS = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor }
] as const

/**
 * Light / Dark / System 3-way 세그먼트 토글.
 * SSR/hydration mismatch 방지를 위해 mounted 전엔 빈 div 렌더.
 */
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className='h-8 w-24' />

  return (
    <div
      role='radiogroup'
      aria-label='색상 테마'
      className='border-border-default bg-bg-subtle flex items-center gap-0.5 rounded-md border p-0.5'
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type='button'
            role='radio'
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={
              active
                ? 'bg-bg-card text-fg-strong flex h-6 w-6 items-center justify-center rounded shadow-card'
                : 'text-fg-muted hover:text-fg-default flex h-6 w-6 items-center justify-center rounded transition-colors'
            }
          >
            <Icon className='size-3.5' />
          </button>
        )
      })}
    </div>
  )
}
