'use client'

import { useState } from 'react'

interface TypoEntry {
  className: string
  description?: string
}

interface TypoGroup {
  label: string
  entries: TypoEntry[]
}

const TYPO_GROUPS: TypoGroup[] = [
  {
    label: 'Regular (400)',
    entries: [
      { className: 'typo-r8' },
      { className: 'typo-r9' },
      { className: 'typo-r10' },
      { className: 'typo-r11' },
      { className: 'typo-r12' }
    ]
  },
  {
    label: 'Medium (500)',
    entries: [
      { className: 'typo-m10' },
      { className: 'typo-m11' },
      { className: 'typo-m12' },
      { className: 'typo-m13' },
      { className: 'typo-m14' },
      { className: 'typo-m16' },
      { className: 'typo-m18' }
    ]
  },
  {
    label: 'Semibold (600)',
    entries: [
      { className: 'typo-sb9' },
      { className: 'typo-sb10' },
      { className: 'typo-sb11' },
      { className: 'typo-sb12' },
      { className: 'typo-sb13' },
      { className: 'typo-sb14' },
      { className: 'typo-sb16' },
      { className: 'typo-sb18' }
    ]
  },
  {
    label: 'Bold (700)',
    entries: [
      { className: 'typo-b14' },
      { className: 'typo-b16' },
      { className: 'typo-b18' },
      { className: 'typo-b24' }
    ]
  },
  {
    label: 'ExtraBold (800)',
    entries: [
      { className: 'typo-eb14' },
      { className: 'typo-eb32' },
      { className: 'typo-eb54' }
    ]
  },
  {
    label: 'Monospace',
    entries: [
      { className: 'typo-mono-r10' },
      { className: 'typo-mono-r11' },
      { className: 'typo-mono-m12' },
      { className: 'typo-mono-m14' },
      { className: 'typo-mono-b14' }
    ]
  },
  {
    label: 'Variant',
    entries: [
      { className: 'typo-sb16-tight' },
      { className: 'typo-sb10-wider' },
      { className: 'typo-r12-relaxed' },
      { className: 'typo-m14-relaxed' }
    ]
  },
  {
    label: 'Semantic',
    entries: [
      { className: 'text-page-title' },
      { className: 'text-section-title' },
      { className: 'text-modal-title' },
      { className: 'text-label' },
      { className: 'text-body' },
      { className: 'text-subtitle' },
      { className: 'text-caption' },
      { className: 'text-description' },
      { className: 'text-overline' },
      { className: 'text-disabled' },
      { className: 'text-error' },
      { className: 'text-link' }
    ]
  }
]

export const TypoView = () => {
  const [current, setCurrent] = useState<string>('typo-eb32')

  return (
    <div className='flex flex-col gap-6'>
      {/* ── Preview ──────────────── */}
      <section>
        <h2 className='typo-sb12 text-cool-grey-07 mb-3 uppercase tracking-wide'>Preview</h2>
        <div className='border-cool-grey-04 text-cool-grey-11 flex min-h-40 items-center justify-center rounded-lg border bg-white p-10'>
          {/* 부모에 기본 색만 두고, current는 단독 적용 — text-error/text-link 같은 시맨틱 색이 그대로 보이도록 */}
          <span className={current}>TranSight Design</span>
        </div>
        <p className='typo-mono-m12 text-cool-grey-07 mt-2 text-center'>
          현재 적용: <span className='text-primary-blue-1'>{current}</span>
        </p>
      </section>

      {/* ── Utility list ──────────────── */}
      <section>
        <h2 className='typo-sb12 text-cool-grey-07 mb-3 uppercase tracking-wide'>Utilities</h2>
        <div className='flex flex-col gap-5'>
          {TYPO_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className='typo-sb12 text-cool-grey-09 mb-2'>{group.label}</h3>
              <div className='flex flex-wrap gap-1.5'>
                {group.entries.map((entry) => {
                  const active = entry.className === current
                  return (
                    <button
                      key={entry.className}
                      type='button'
                      onClick={() => setCurrent(entry.className)}
                      className={
                        active
                          ? 'bg-primary-blue-1 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
                          : 'border-cool-grey-04 hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-cool-grey-09 rounded-md border bg-white px-2.5 py-1'
                      }
                    >
                      {entry.className}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
