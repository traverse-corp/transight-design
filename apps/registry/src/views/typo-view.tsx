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

const FAMILIES = [
  {
    label: 'Sans',
    token: '--font-sans',
    description: '본문 / UI 기본. SUIT Variable.',
    fontClass: 'font-sans'
  },
  {
    label: 'Pretendard',
    token: '--font-pretendard',
    description: 'SUIT 자매 family. 디스플레이 / 약관 / 광고 톤 차별용.',
    fontClass: 'font-pretendard'
  },
  {
    label: 'Mono',
    token: '--font-mono',
    description: '코드 / 표값 / hex. typo-mono-{w}{s}로 합성.',
    fontClass: 'font-mono'
  }
] as const

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
        <h2 className='typo-sb12 text-fg-muted mb-3 uppercase tracking-wide'>Preview</h2>
        <PreviewModePanel
          preview={
            <div className='flex flex-col gap-2'>
              <div className='border-border-default text-fg-strong flex-center min-h-40 rounded-lg border bg-bg-card p-10'>
                <span className={composedClass}>TranSight Design</span>
              </div>
              <p className='typo-mono-m12 text-fg-muted text-center'>
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
          <h3 className='typo-sb12 text-fg-default mb-2'>Size (px)</h3>
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
                      ? 'bg-primary-blue-1 typo-mono-m12 rounded-md px-2.5 py-1 text-fg-inverse'
                      : 'border-border-default hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-fg-default rounded-md border bg-bg-card px-2.5 py-1'
                  }
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className='typo-sb12 text-fg-default mb-2'>Weight</h3>
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
                      ? 'bg-primary-blue-1 typo-mono-m12 flex-center gap-1.5 rounded-md px-2.5 py-1 text-fg-inverse'
                      : 'border-border-default hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-fg-default flex-center gap-1.5 rounded-md border bg-bg-card px-2.5 py-1'
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

      {/* ── 시맨틱 / Mono — 단일 클릭 프리셋 ──────────────── */}
      <section className='flex flex-col gap-5'>
        {[
          { label: 'Semantic', entries: SEMANTIC },
          { label: 'Monospace', entries: MONO }
        ].map((group) => (
          <div key={group.label}>
            <h3 className='typo-sb12 text-fg-default mb-2'>{group.label}</h3>
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
      </section>

      {/* ── Font Family ──────────────── */}
      <section className='flex flex-col gap-3'>
        <h3 className='typo-sb12 text-fg-default'>Font Family</h3>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          {FAMILIES.map((f) => (
            <div
              key={f.label}
              className='border-border-default rounded-lg border bg-bg-card p-5 flex flex-col gap-3'
            >
              <div className='flex-between-center'>
                <span className='typo-sb14 text-fg-strong'>{f.label}</span>
                <code className='typo-mono-r11 text-fg-muted'>{f.token}</code>
              </div>
              <p className={`${f.fontClass} text-fg-strong typo-m24`}>
                TranSight Design 0123 가나다라
              </p>
              <p className='typo-r12 text-fg-muted'>{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
