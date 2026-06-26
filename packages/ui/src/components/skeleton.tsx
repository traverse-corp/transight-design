import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeletonClassVariants = cva('bg-bg-muted', {
  variants: {
    // rect: 카드/패널 — h/w를 className으로 지정
    // text: 한 줄 텍스트 — h-4 자동, w만 className으로
    // circle: 아바타/아이콘 — aspect 1:1 강제, w만 className으로
    variant: {
      rect: 'rounded-md',
      text: 'h-4 rounded-sm',
      circle: 'aspect-square rounded-full'
    },
    animation: {
      pulse: 'animate-pulse',
      none: ''
    }
  },
  defaultVariants: {
    variant: 'rect',
    animation: 'pulse'
  }
})

export interface SkeletonProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof skeletonClassVariants> {}

const Skeleton = ({ className, variant, animation, ...props }: SkeletonProps) => (
  <div
    data-slot='skeleton'
    className={cn(skeletonClassVariants({ variant, animation, className }))}
    {...props}
  />
)

export { Skeleton, skeletonClassVariants }
