'use client'

import { useState } from 'react'
import { Input } from '@transight-design/ui/components/input'
import { PreviewModePanel } from './preview-mode-panel'

const INPUT_VARIANT_LABELS: Record<string, string> = {
  default: 'Default',
  search: 'Search',
  password: 'Password'
}

const codeForVariant = (variant: string) => {
  if (variant === 'search') {
    return '<Input variant="search" />\n// shape=\'pill\', decoDir=\'start\', decorator=Search icon, placeholder=\'Search Address\''
  }

  if (variant === 'password') {
    return '<Input variant="password" />\n// type=\'password\', capsLockIndicator on Caps Lock, placeholder=\'비밀번호를 입력하세요\''
  }

  return '<Input variant="default" />\n// placeholder=\'무엇이든 입력하세요\''
}

export const InputVariantPresets = ({ variants }: { variants: string[] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? 'default')

  return (
    <div className='border-cool-grey-04 flex flex-col gap-4 border-t pt-5'>
      <div>
        <h3 className='typo-sb14 text-cool-grey-11'>Variant presets</h3>
        <div className='text-description mt-1 flex flex-col gap-1'>
          <p>Variant는 반복해서 쓰는 Input 조합을 이름으로 호출하는 preset입니다.</p>
          <p>
            기본 설계는 shape · size · decoDir · decorator 축을 직접 조합하는 방식이고, variant는
            자주 쓰는 조합만 얇게 묶어둔 값입니다. 명시적 prop이 항상 preset을 덮어씁니다.
          </p>
        </div>
      </div>

      <PreviewModePanel
        code={codeForVariant(selectedVariant)}
        preview={
          <div className='flex min-h-24 items-center justify-center'>
            <Input
              variant={selectedVariant as NonNullable<Parameters<typeof Input>[0]['variant']>}
              className='w-80'
            />
          </div>
        }
      />

      <div className='flex flex-wrap items-center gap-2'>
        <span className='typo-sb12 text-cool-grey-07 w-16 shrink-0'>Variant</span>
        <div className='flex flex-wrap gap-1'>
          {variants.map((variant) => {
            const active = selectedVariant === variant
            const label = INPUT_VARIANT_LABELS[variant] ?? variant
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
