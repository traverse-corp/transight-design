'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 에러 톤은 wrapper의 data-invalid="true" 또는 peer/group invalid 상태로 자동 적용.
// 호출자가 Label에 직접 색을 박지 않도록 prop으로 노출하지 않는다.
const labelClassVariants = cva(
  'inline-flex items-center gap-1 leading-none select-none text-fg-default group-data-[invalid=true]:text-ui-red peer-data-[invalid=true]:text-ui-red group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:pointer-events-none peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: '',
        required: '',
        optional: ''
      },
      size: {
        xs: 'typo-sb11',
        sm: 'typo-sb12',
        md: 'typo-sb14',
        lg: 'typo-sb16',
        xl: 'typo-sb18'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

type LabelVariantProps = VariantProps<typeof labelClassVariants>
type LabelPresetVariant = NonNullable<LabelVariantProps['variant']>

export interface LabelProps
  extends React.ComponentProps<'label'>,
    LabelVariantProps {
  /**
   * required variant에서 children 뒤에 붙는 표시. 기본 '*' (ui-red).
   * i18n 또는 시각 커스텀 시 ReactNode로 override.
   */
  requiredText?: React.ReactNode
  /**
   * optional variant에서 children 뒤에 붙는 텍스트. 기본 '(선택)'.
   * 영문 화면에서는 '(Optional)' 등으로 override.
   */
  optionalText?: React.ReactNode
}

const renderSuffix = (
  variant: LabelPresetVariant,
  requiredText: React.ReactNode,
  optionalText: React.ReactNode
): React.ReactNode => {
  if (variant === 'required') {
    return (
      <span aria-hidden className='text-ui-red'>
        {requiredText}
      </span>
    )
  }
  if (variant === 'optional') {
    return <span className='text-fg-muted typo-m12'>{optionalText}</span>
  }
  return null
}

const Label = ({
  className,
  variant,
  size,
  children,
  requiredText = '*',
  optionalText = '(선택)',
  ...props
}: LabelProps) => {
  const resolvedVariant = (variant ?? 'default') as LabelPresetVariant

  return (
    <label
      data-slot='label'
      className={cn(labelClassVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {renderSuffix(resolvedVariant, requiredText, optionalText)}
    </label>
  )
}

export { Label, labelClassVariants }
