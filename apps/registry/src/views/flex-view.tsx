'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { PreviewModePanel } from '@/components/preview-mode-panel'

interface FlexGroup {
  label: string
  classes: string[]
}

const FLEX_GROUPS: FlexGroup[] = [
  {
    label: '단순 정렬 (row)',
    classes: ['flex-start', 'flex-center', 'flex-end']
  },
  {
    label: '단순 정렬 (col)',
    classes: ['flex-col-start', 'flex-col-center', 'flex-col-end']
  },
  {
    label: 'Row — justify × align',
    classes: [
      'flex-start-center',
      'flex-start-end',
      'flex-center-start',
      'flex-center-end',
      'flex-end-start',
      'flex-end-center',
      'flex-around-start',
      'flex-around-center',
      'flex-around-end',
      'flex-between-start',
      'flex-between-center',
      'flex-between-end'
    ]
  },
  {
    label: 'Column — justify × align',
    classes: [
      'flex-col-start-center',
      'flex-col-start-end',
      'flex-col-center-start',
      'flex-col-center-end',
      'flex-col-end-start',
      'flex-col-end-center',
      'flex-col-around-start',
      'flex-col-around-center',
      'flex-col-around-end',
      'flex-col-between-start',
      'flex-col-between-center',
      'flex-col-between-end'
    ]
  }
]

export const FlexView = () => {
  const [current, setCurrent] = useState<string>('flex-between-center')

  return (
    <div className='flex flex-col gap-6'>
      {/* ── Preview / Code 토글 ──────────────── */}
      <section>
        <h2 className='typo-sb12 text-fg-muted mb-3 uppercase tracking-wide'>Preview</h2>
        <PreviewModePanel
          preview={
            <div className='flex flex-col gap-2'>
              <div
                className={`${current} bg-bg-subtle border-border-default h-64 gap-2 rounded-lg border p-4`}
              >
                {[
                  'bg-primary-blue-1',
                  'bg-primary-blue-2',
                  'bg-primary-blue-deep'
                ].map((color) => (
                  <motion.div
                    key={color}
                    layout
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className={`${color} h-12 w-12 rounded-md`}
                  />
                ))}
              </div>
              <p className='typo-mono-m12 text-fg-muted text-center'>
                현재 적용: <span className='text-primary-blue-1'>{current}</span>
              </p>
            </div>
          }
          code={`<div className="${current} gap-2">
  <div className="bg-primary-blue-1 h-12 w-12 rounded-md" />
  <div className="bg-primary-blue-2 h-12 w-12 rounded-md" />
  <div className="bg-primary-blue-deep h-12 w-12 rounded-md" />
</div>`}
        />
      </section>

      {/* ── Utility list ──────────────── */}
      <section>
        <h2 className='typo-sb12 text-fg-muted mb-3 uppercase tracking-wide'>Utilities</h2>
        <div className='flex flex-col gap-5'>
          {FLEX_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className='typo-sb12 text-fg-default mb-2'>{group.label}</h3>
              <div className='flex flex-wrap gap-1.5'>
                {group.classes.map((cls) => {
                  const active = cls === current
                  return (
                    <button
                      key={cls}
                      type='button'
                      onClick={() => setCurrent(cls)}
                      className={
                        active
                          ? 'bg-primary-blue-1 typo-mono-m12 rounded-md px-2.5 py-1 text-fg-inverse'
                          : 'border-border-default hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-fg-default rounded-md border bg-bg-card px-2.5 py-1'
                      }
                    >
                      {cls}
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
