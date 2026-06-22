'use client'

import * as React from 'react'
import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const separatorClassVariants = cva('shrink-0', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'self-stretch'
    },
    tone: {
      muted: 'bg-cool-grey-04',
      strong: 'bg-cool-grey-06',
      accent: 'bg-primary-blue-1'
    },
    thickness: {
      thin: '',
      medium: '',
      thick: ''
    }
  },
  compoundVariants: [
    { orientation: 'horizontal', thickness: 'thin', className: 'h-px' },
    { orientation: 'horizontal', thickness: 'medium', className: 'h-0.5' },
    { orientation: 'horizontal', thickness: 'thick', className: 'h-1' },
    { orientation: 'vertical', thickness: 'thin', className: 'w-px' },
    { orientation: 'vertical', thickness: 'medium', className: 'w-0.5' },
    { orientation: 'vertical', thickness: 'thick', className: 'w-1' }
  ],
  defaultVariants: {
    orientation: 'horizontal',
    tone: 'muted',
    thickness: 'thin'
  }
})

type SeparatorVariantProps = VariantProps<typeof separatorClassVariants>

export type SeparatorProps = Omit<SeparatorPrimitive.Props, 'orientation'> &
  SeparatorVariantProps

const Separator = ({
  className,
  orientation,
  tone,
  thickness,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive
    data-slot='separator'
    orientation={orientation ?? 'horizontal'}
    className={cn(separatorClassVariants({ orientation, tone, thickness, className }))}
    {...props}
  />
)

export { Separator, separatorClassVariants }
