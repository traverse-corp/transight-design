'use client'

import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@transight-design/ui/components/alert'
import { PreviewModePanel } from './preview-mode-panel'

const ALERT_PRESET_COPY: Record<string, { title: string; description: string }> = {
  info: { title: '안내', description: '새 버전이 배포되었습니다. 새로고침을 권장합니다.' },
  success: { title: '완료', description: '저장이 완료되었습니다.' },
  warning: { title: '주의', description: '입력값을 다시 확인해주세요.' },
  error: { title: '오류', description: '요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.' }
}

const codeForVariant = (variant: string) =>
  `<Alert variant="${variant}">\n  <AlertTitle>...</AlertTitle>\n  <AlertDescription>...</AlertDescription>\n</Alert>`

export const AlertVariantPresets = ({ variants }: { variants: string[] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? 'info')
  const copy = ALERT_PRESET_COPY[selectedVariant] ?? {
    title: selectedVariant,
    description: selectedVariant
  }

  return (
    <div className='flex flex-col gap-4'>
      <PreviewModePanel
        code={codeForVariant(selectedVariant)}
        preview={
          <div className='flex min-h-24 items-center justify-center'>
            <Alert
              variant={selectedVariant as NonNullable<Parameters<typeof Alert>[0]['variant']>}
              className='max-w-md'
            >
              <AlertTitle>{copy.title}</AlertTitle>
              <AlertDescription>{copy.description}</AlertDescription>
            </Alert>
          </div>
        }
      />

      <div className='border-cool-grey-04 flex flex-wrap items-center gap-2 border-t pt-5'>
        <span className='typo-sb12 text-cool-grey-07 w-16 shrink-0'>Variant</span>
        <div className='flex flex-wrap gap-1'>
          {variants.map((variant) => {
            const active = selectedVariant === variant
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
                {variant}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
