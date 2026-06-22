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
    <div className='border-cool-grey-04 flex flex-col gap-4 border-t pt-5'>
      <div>
        <h3 className='typo-sb14 text-cool-grey-11'>Variant presets</h3>
        <div className='text-description mt-1 flex flex-col gap-1'>
          <p>Variant는 반복해서 쓰는 Label 조합을 이름으로 호출하는 preset입니다.</p>
          <p>
            기본 설계는 size · tone 축을 직접 조합하는 방식이고, variant는 children 뒤에 자동으로
            붙는 표식(asterisk, 선택 라벨)을 가진 프리셋입니다. 명시적 prop이 preset 위에 적용됩니다.
          </p>
        </div>
      </div>

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

      <div className='flex flex-wrap items-center gap-2'>
        <span className='typo-sb12 text-cool-grey-07 w-16 shrink-0'>Variant</span>
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
                    ? 'bg-cool-grey-09 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
                    : 'text-cool-grey-07 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
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
