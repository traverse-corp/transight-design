'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'text-label',
        auth: 'text-cool-grey-09 font-semibold uppercase',
        muted: 'text-cool-grey-07 font-normal',
        form: 'text-cool-grey-09 font-semibold'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function Label({
  className,
  variant,
  ...props
}: React.ComponentProps<'label'> & VariantProps<typeof labelVariants>) {
  return (
    <label data-slot='label' className={cn(labelVariants({ variant, className }))} {...props} />
  )
}

export { Label, labelVariants }
