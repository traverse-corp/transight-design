'use client'

import { useState } from 'react'
import { Input } from '@transight-design/ui/components/input'
import { Search } from 'lucide-react'
import { PreviewModePanel } from './preview-mode-panel'

const INPUT_VARIANT_LABELS: Record<string, string> = {
  default: 'Default',
  search: 'Search',
  login: 'Login'
}

const codeForVariant = (variant: string) => {
  if (variant === 'search') {
    return '<Input variant="search" decorator={<Search />} placeholder="Search" />'
  }

  if (variant === 'login') {
    return '<Input variant="login" type="password" placeholder="Password" />'
  }

  return '<Input placeholder="Email" />'
}

export const InputVariantPresets = ({ variants }: { variants: string[] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? 'default')

  return (
    <div className="border-cool-grey-04 flex flex-col gap-4 border-t pt-5">
      <div>
        <h3 className="typo-sb14 text-cool-grey-11">Variant presets</h3>
        <div className="text-description mt-1 flex flex-col gap-1">
          <p>Variant는 반복해서 쓰는 Input 조합을 이름으로 호출하는 preset입니다.</p>
          <p>
            기본 설계는 decorator, decoDir, size 같은 축을 직접 조합하는 방식이고, variant는
            프로젝트에서 자주 쓰는 조합만 얇게 묶어둔 값입니다.
          </p>
        </div>
      </div>

      <PreviewModePanel
        code={codeForVariant(selectedVariant)}
        preview={
          <div className="flex min-h-24 items-center justify-center">
            <Input
              variant={selectedVariant as NonNullable<Parameters<typeof Input>[0]['variant']>}
              type={selectedVariant === 'login' ? 'password' : 'text'}
              placeholder={selectedVariant === 'search' ? 'Search' : 'Email'}
              decorator={
                selectedVariant === 'search' ? <Search className="h-4 w-4" /> : undefined
              }
              searchLabel="Search"
              className="w-80"
            />
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
