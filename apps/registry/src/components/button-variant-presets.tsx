'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@transight-design/ui/components/button'
import { PreviewModePanel } from './preview-mode-panel'

const BUTTON_VARIANT_LABELS: Record<string, string> = {
  default: 'Default',
  destructive: 'Destructive',
  success: 'Success',
  icon: 'Icon'
}

const codeForVariant = (variant: string) =>
  variant === 'icon'
    ? '<Button variant="icon" aria-label="Search"><Search /></Button>'
    : `<Button variant="${variant}">${BUTTON_VARIANT_LABELS[variant] ?? variant}</Button>`

export const ButtonVariantPresets = ({ variants }: { variants: string[] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? 'default')

  return (
    <div className="flex flex-col gap-4">
      <PreviewModePanel
        code={codeForVariant(selectedVariant)}
        preview={
          <div className="flex min-h-24 items-center justify-center">
            {selectedVariant === 'icon' ? (
              <Button variant="icon" aria-label="Search">
                <Search />
              </Button>
            ) : (
              <Button
                variant={selectedVariant as NonNullable<Parameters<typeof Button>[0]['variant']>}
              >
                {BUTTON_VARIANT_LABELS[selectedVariant] ?? selectedVariant}
              </Button>
            )}
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
