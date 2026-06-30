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

const FAMILY_OPTIONS = [
  { value: 'sans', label: 'Sans (SUIT)', suffix: '' },
  { value: 'pretendard', label: 'Pretendard', suffix: '-pretendard' },
  { value: 'mono', label: 'Mono', suffix: '-mono' }
] as const

type FamilyOption = (typeof FAMILY_OPTIONS)[number]['value']

// 시스템 모노 폰트가 실효 지원하는 weight (Regular / Bold)
const MONO_WEIGHTS = new Set<WeightValue>([400, 700])

const FAMILIES = [
  {
    label: 'Sans',
    token: '--font-sans',
    description: '본문 / UI 기본. SUIT Variable.'
  },
  {
    label: 'Pretendard',
    token: '--font-pretendard',
    description: 'SUIT 자매 family. 디스플레이 / 약관 / 광고 톤 차별용.'
  },
  {
    label: 'Mono',
    token: '--font-mono',
    description: '코드 / 표값 / hex. typo-{w}{s}-mono로 합성.'
  }
] as const

export const TypoView = () => {
  const [size, setSize] = useState<Size>(32)
  const [weight, setWeight] = useState<WeightValue>(800)
  const [family, setFamily] = useState<FamilyOption>('sans')

  const weightEntry = WEIGHTS.find((w) => w.value === weight) ?? WEIGHTS[3]
  const familyEntry = FAMILY_OPTIONS.find((f) => f.value === family) ?? FAMILY_OPTIONS[0]
  const composedClass = `typo-${weightEntry.abbrev}${size}${familyEntry.suffix}`

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
              const active = s === size
              return (
                <button
                  key={s}
                  type='button'
                  onClick={() => setSize(s)}
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
          <h3 className='typo-sb12 text-fg-default mb-2 flex items-center gap-2'>
            Weight
            {family === 'mono' && (
              <span className='typo-r12 text-fg-muted'>
                — Mono는 r/b만 실효 (시스템 폰트 weight 제한)
              </span>
            )}
          </h3>
          <div className='flex flex-wrap gap-1.5'>
            {WEIGHTS.map((w) => {
              const active = w.value === weight
              const disabled = family === 'mono' && !MONO_WEIGHTS.has(w.value)
              return (
                <button
                  key={w.value}
                  type='button'
                  disabled={disabled}
                  onClick={() => setWeight(w.value)}
                  className={
                    disabled
                      ? 'border-border-default typo-mono-m12 text-fg-disabled flex-center gap-1.5 cursor-not-allowed rounded-md border bg-bg-card px-2.5 py-1 opacity-40'
                      : active
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

        <div>
          <h3 className='typo-sb12 text-fg-default mb-2'>Family</h3>
          <div className='flex flex-wrap gap-1.5'>
            {FAMILY_OPTIONS.map((f) => {
              const active = f.value === family
              return (
                <button
                  key={f.value}
                  type='button'
                  onClick={() => {
                    setFamily(f.value)
                    // Mono로 전환 시 현재 weight가 r/b 아니면 r로 fallback
                    if (f.value === 'mono' && !MONO_WEIGHTS.has(weight)) {
                      setWeight(400)
                    }
                  }}
                  className={
                    active
                      ? 'bg-primary-blue-1 typo-mono-m12 rounded-md px-2.5 py-1 text-fg-inverse'
                      : 'border-border-default hover:border-primary-blue-1 hover:text-primary-blue-1 typo-mono-m12 text-fg-default rounded-md border bg-bg-card px-2.5 py-1'
                  }
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
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
              <p
                className='text-fg-strong typo-m24'
                style={{ fontFamily: `var(${f.token})` }}
              >
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
