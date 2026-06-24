'use client'

import { useState } from 'react'
import { Badge } from '@transight-design/ui/components/badge'
import { PreviewModePanel } from './preview-mode-panel'

const BADGE_VARIANT_LABELS: Record<string, string> = {
  lea: 'LEA',
  vasp: 'VASP',
  'tx-swap': 'Swap',
  'tx-bridge': 'Bridge'
}

const codeForVariant = (variant: string) =>
  `<Badge variant="${variant}">${BADGE_VARIANT_LABELS[variant] ?? variant}</Badge>`

export const BadgeVariantPresets = ({ variants }: { variants: string[] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? 'lea')

  return (
    <div className="border-cool-grey-04 flex flex-col gap-4 border-t pt-5">
      <div>
        <h3 className="typo-sb14 text-cool-grey-11">Variant presets</h3>
        <div className="text-description mt-1 flex flex-col gap-1">
          <p>Variant는 반복해서 쓰는 Badge 조합을 이름으로 호출하는 preset입니다.</p>
          <p>
            기본 설계는 color, theme, shape, size 축을 직접 조합하는 방식이고, variant는
            프로젝트에서 자주 쓰는 조합만 얇게 묶어둔 값입니다.
          </p>
        </div>
      </div>

      <PreviewModePanel
        code={codeForVariant(selectedVariant)}
        preview={
          <div className="flex min-h-24 items-center justify-center">
            <Badge variant={selectedVariant as NonNullable<Parameters<typeof Badge>[0]['variant']>}>
              {BADGE_VARIANT_LABELS[selectedVariant] ?? selectedVariant}
            </Badge>
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
