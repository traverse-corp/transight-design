'use client'

import { useState } from 'react'
import { Label } from '@transight-design/ui/components/label'
import { PreviewModePanel } from './preview-mode-panel'

const LABEL_VARIANT_LABELS: Record<string, string> = {
  default: 'Default',
  required: 'Required',
  optional: 'Optional'
}

const codeForVariant = (variant: string) => {
  if (variant === 'required') {
    return '<Label variant="required">이메일</Label>\n// children 뒤에 * 자동 표시 (ui-red)'
  }

  if (variant === 'optional') {
    return '<Label variant="optional">전화번호</Label>\n// children 뒤에 (선택) 자동 표시 (cool-grey-07)'
  }

  return '<Label>이메일</Label>\n// 기본 폼 라벨'
}

const labelFor = (variant: string) => {
  if (variant === 'optional') return '전화번호'
  return '이메일'
}

export const LabelVariantPresets = ({ variants }: { variants: string[] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? 'default')

  return (
    <div className='flex flex-col gap-4'>
      <PreviewModePanel
        code={codeForVariant(selectedVariant)}
        preview={
          <div className='flex min-h-24 items-center justify-center'>
            <Label
              variant={selectedVariant as NonNullable<Parameters<typeof Label>[0]['variant']>}
            >
              {labelFor(selectedVariant)}
            </Label>
          </div>
        }
      />

      <div className='border-border-default flex flex-wrap items-center gap-2 border-t pt-5'>
        <span className='typo-sb12 text-fg-muted w-16 shrink-0'>Variant</span>
        <div className='flex flex-wrap gap-1'>
          {variants.map((variant) => {
            const active = selectedVariant === variant
            const label = LABEL_VARIANT_LABELS[variant] ?? variant
            return (
              <button
                key={variant}
                type='button'
                onClick={() => setSelectedVariant(variant)}
                className={
                  active
                    ? 'bg-fg-strong typo-mono-m12 rounded-md px-2.5 py-1 text-fg-inverse'
                    : 'text-fg-muted hover:bg-bg-muted hover:text-fg-strong typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
                }
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
