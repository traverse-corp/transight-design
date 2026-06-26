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
    <div className="flex flex-col gap-4">
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

      <div className="border-border-default flex flex-wrap items-center gap-2 border-t pt-5">
        <span className="typo-sb12 text-fg-muted w-16 shrink-0">Variant</span>
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
                    ? 'bg-fg-strong typo-mono-m12 rounded-md px-2.5 py-1 text-fg-inverse'
                    : 'text-fg-muted hover:bg-bg-muted hover:text-fg-strong typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
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
