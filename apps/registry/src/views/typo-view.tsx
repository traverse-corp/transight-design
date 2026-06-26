'use client'

import { useState } from 'react'
import { PreviewModePanel } from '@/components/preview-mode-panel'

const SIZES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 24, 32, 40, 48, 56] as const
type Size = (typeof SIZES)[number]

const WEIGHTS = [
  { value: 100, label: 'Thin', abbrev: 't' },
  { value: 200, label: 'ExtraLight', abbrev: 'el' },
  { value: 300, label: 'Light', abbrev: 'l' },
  { value: 400, label: 'Regular', abbrev: 'r' },
  { value: 500, label: 'Medium', abbrev: 'm' },
  { value: 600, label: 'Semibold', abbrev: 'sb' },
  { value: 700, label: 'Bold', abbrev: 'b' },
  { value: 800, label: 'ExtraBold', abbrev: 'eb' },
  { value: 900, label: 'Black', abbrev: 'bk' }
] as const

type WeightValue = (typeof WEIGHTS)[number]['value']

const SEMANTIC = [
  'text-page-title',
  'text-section-title',
  'text-modal-title',
  'text-label',
  'text-body',
  'text-subtitle',
  'text-caption',
  'text-description',
  'text-overline',
  'text-disabled',
  'text-error',
  'text-link'
] as const

const MONO = ['typo-mono-r10', 'typo-mono-r11', 'typo-mono-m12', 'typo-mono-m14', 'typo-mono-b14'] as const

const VARIANTS = ['typo-sb16-tight', 'typo-sb10-wider', 'typo-r12-relaxed', 'typo-m14-relaxed'] as const

export const TypoView = () => {
  const [size, setSize] = useState<Size>(32)
  const [weight, setWeight] = useState<WeightValue>(800)
  const [extra, setExtra] = useState<string | null>(null)

  const weightEntry = WEIGHTS.find((w) => w.value === weight) ?? WEIGHTS[3]
  const composedClass = extra ?? `typo-${weightEntry.abbrev}${size}`

  return (
    <div className='flex flex-col gap-6'>
      {/* ── Preview / Code 토글 ──────────────── */}
      <section>
        <h2 className='typo-12 font-semibold text-cool-grey-07 mb-3 uppercase tracking-wide'>Preview</h2>
        <PreviewModePanel
          preview={
            <div className='flex flex-col gap-2'>
              <div className='border-cool-grey-04 text-cool-grey-11 flex-center min-h-40 rounded-lg border bg-white p-10'>
                <span className={composedClass}>TranSight Design</span>
              </div>
              <p className='typo-mono-m12 text-cool-grey-07 text-center'>
                현재 적용: <span className='text-primary-blue-1'>{composedClass}</span>
              </p>
            </div>
          }
          code={`<span className="${composedClass}">TranSight Design</span>`}
        />
      </section>

      {/* ── Size × Weight 그리드 ──────────────── */}
      <section className='flex flex-col gap-5'>
        <div>
          <h3 className='typo-12 font-semibold text-cool-grey-09 mb-2'>Size (px)</h3>
          <div className='flex flex-wrap gap-1.5'>
            {SIZES.map((s) => {
              const active = !extra && s === size
              return (
                <button
                  key={s}
                  type='button'
                  onClick={() => {
                    setSize(s)
                    setExtra(null)
                  }}
                  className={
                    active
                      ? 'bg-primary-blue-1 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
                      : 'border-cool-grey-04 hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-cool-grey-09 rounded-md border bg-white px-2.5 py-1'
                  }
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className='typo-12 font-semibold text-cool-grey-09 mb-2'>Weight</h3>
          <div className='flex flex-wrap gap-1.5'>
            {WEIGHTS.map((w) => {
              const active = !extra && w.value === weight
              return (
                <button
                  key={w.value}
                  type='button'
                  onClick={() => {
                    setWeight(w.value)
                    setExtra(null)
                  }}
                  className={
                    active
                      ? 'bg-primary-blue-1 typo-mono-m12 flex-center gap-1.5 rounded-md px-2.5 py-1 text-white'
                      : 'border-cool-grey-04 hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-cool-grey-09 flex-center gap-1.5 rounded-md border bg-white px-2.5 py-1'
                  }
                >
                  <span>{w.value}</span>
                  <span className='opacity-60'>{w.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 시맨틱 / Variant / Mono — 단일 클릭 프리셋 ──────────────── */}
      <section className='flex flex-col gap-5'>
        {[
          { label: 'Semantic', entries: SEMANTIC },
          { label: 'Variant', entries: VARIANTS },
          { label: 'Monospace', entries: MONO }
        ].map((group) => (
          <div key={group.label}>
            <h3 className='typo-12 font-semibold text-cool-grey-09 mb-2'>{group.label}</h3>
            <div className='flex flex-wrap gap-1.5'>
              {group.entries.map((cls) => {
                const active = extra === cls
                return (
                  <button
                    key={cls}
                    type='button'
                    onClick={() => setExtra(cls)}
                    className={
                      active
                        ? 'bg-primary-blue-1 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
                        : 'border-cool-grey-04 hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-cool-grey-09 rounded-md border bg-white px-2.5 py-1'
                    }
                  >
                    {cls}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
