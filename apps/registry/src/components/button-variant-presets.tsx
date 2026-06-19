'use client'

import { Button } from '@transight-design/ui/components/button'
import { PreviewModePanel } from './preview-mode-panel'
import { useState } from 'react'

const BUTTON_VARIANT_LABELS: Record<string, string> = {
  default: 'Default',
  destructive: 'Destructive',
  success: 'Success',
  dark: 'Dark'
}

const codeForVariant = (variant: string) =>
  `<Button variant="${variant}">${BUTTON_VARIANT_LABELS[variant] ?? variant}</Button>`

export const ButtonVariantPresets = ({ variants }: { variants: string[] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? 'default')

  return (
    <div className="border-cool-grey-04 flex flex-col gap-4 border-t pt-5">
      <div>
        <h3 className="typo-sb14 text-cool-grey-11">Variant presets</h3>
        <div className="text-description mt-1 flex flex-col gap-1">
          <p>Variant는 자주 쓰는 버튼 조합을 이름으로 호출하는 preset입니다.</p>
          <p>
            기본 설계는 color, appearance, shape, size 네 축을 직접 조합하는 방식이고, variant는
            프로젝트에서 반복해서 쓰는 조합만 짧게 묶어 둔 값입니다.
          </p>
          <p>
            variant를 선택한 뒤에도 color, appearance, shape, size를 직접 지정하면 해당 값이 우선
            적용됩니다.
          </p>
        </div>
      </div>

      <PreviewModePanel
        code={codeForVariant(selectedVariant)}
        preview={
          <div className="flex min-h-24 items-center justify-center">
            <Button
              variant={selectedVariant as NonNullable<Parameters<typeof Button>[0]['variant']>}
            >
              {BUTTON_VARIANT_LABELS[selectedVariant] ?? selectedVariant}
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="typo-sb12 text-cool-grey-07 w-16 shrink-0">Variant</span>
        <div className="flex flex-wrap gap-1">
          {variants.map((variant) => {
            const active = selectedVariant === variant
            return (
              <button
                key={variant}
                type="button"
                onClick={() => setSelectedVariant(variant)}
                className={
                  active
                    ? 'bg-cool-grey-09 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
                    : 'text-cool-grey-07 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
                }
              >
                {variant}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
