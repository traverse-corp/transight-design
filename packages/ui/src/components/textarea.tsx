'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 에러 표시는 textarea의 aria-invalid="true"로 자동 적용 (input과 동일 a11y 패턴).
const textareaClassVariants = cva(
  'placeholder:text-fg-muted field-sizing-content flex w-full border bg-bg-card dark:bg-bg-muted shadow-sm transition-colors outline-none border-border-subtle focus:border-primary-blue-1 aria-invalid:border-ui-red aria-invalid:focus:border-ui-red aria-invalid:shadow-[0_0_0_1px_rgba(239,68,68,0.1)] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      shape: {
        default: 'rounded-lg',
        pill: 'rounded-3xl',
        square: 'rounded-none'
      },
      size: {
        xs: 'min-h-16 px-2 py-1.5 typo-m10',
        sm: 'min-h-20 px-3 py-2 typo-m12',
        md: 'min-h-24 px-3 py-2.5 typo-m13',
        lg: 'min-h-32 px-4 py-3 typo-m15',
        xl: 'min-h-40 px-5 py-3.5 typo-m16'
      }
    },
    defaultVariants: {
      shape: 'default',
      size: 'md'
    }
  }
)

type TextareaVariantProps = VariantProps<typeof textareaClassVariants>

export interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'size'>,
    TextareaVariantProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, shape, size, value, maxLength, ...props }, ref) => {
    const showCounter = typeof maxLength === 'number' && maxLength > 0
    const length = typeof value === 'string' ? value.length : 0

    return (
      <div className='relative w-full'>
        <textarea
          data-slot='textarea'
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(textareaClassVariants({ shape, size, className }))}
          {...props}
        />
        {showCounter && (
          <span className='text-fg-muted typo-mono-m12 pointer-events-none absolute right-3 bottom-2'>
            {length}/{maxLength}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaClassVariants }
