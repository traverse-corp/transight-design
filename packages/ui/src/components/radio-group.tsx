'use client'

import * as React from 'react'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ── 색상 시스템 — Button의 solid 패턴 미러링 (12색) ──────────────────
// 선택 시 ring border + inner dot 색을 함께 결정.
const radioColorStyles = {
  gray: { ring: 'border-border-strong', dot: 'bg-fg-strong' },
  blue: { ring: 'border-primary-blue-1', dot: 'bg-primary-blue-1' },
  red: { ring: 'border-ui-red', dot: 'bg-ui-red' },
  orange: { ring: 'border-ui-orange', dot: 'bg-ui-orange' },
  yellow: { ring: 'border-ui-yellow', dot: 'bg-ui-yellow' },
  olive: { ring: 'border-ui-olive', dot: 'bg-ui-olive' },
  green: { ring: 'border-ui-green', dot: 'bg-ui-green' },
  skyblue: { ring: 'border-ui-skyblue', dot: 'bg-ui-skyblue' },
  purple: { ring: 'border-ui-purple', dot: 'bg-ui-purple' },
  pink: { ring: 'border-ui-pink', dot: 'bg-ui-pink' },
  amber: { ring: 'border-ui-amber', dot: 'bg-ui-amber' },
  white: {
    ring: 'border-[var(--color-cool-grey-white)]',
    dot: 'bg-[var(--color-cool-grey-white)]'
  },
  'gradient-blue': {
    ring: 'border-primary-blue-1',
    dot: 'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2'
  }
} as const

const radioDotSizeStyles = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
  xl: 'h-3 w-3'
} as const

const radioClassVariants = cva(
  'group/radio-group-item relative inline-flex shrink-0 items-center justify-center border bg-bg-card shadow-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      color: {
        gray: '',
        blue: '',
        red: '',
        orange: '',
        yellow: '',
        olive: '',
        green: '',
        skyblue: '',
        purple: '',
        pink: '',
        amber: '',
        white: '',
        'gradient-blue': ''
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-none'
      },
      size: {
        xs: 'h-3.5 w-3.5',
        sm: 'h-4 w-4',
        md: 'h-[18px] w-[18px]',
        lg: 'h-[22px] w-[22px]',
        xl: 'h-[26px] w-[26px]'
      }
    },
    defaultVariants: {
      color: 'blue',
      shape: 'circle',
      size: 'md'
    }
  }
)

type RadioVariantProps = VariantProps<typeof radioClassVariants>
export type RadioColor = NonNullable<RadioVariantProps['color']>
export type RadioShape = NonNullable<RadioVariantProps['shape']>
export type RadioSize = NonNullable<RadioVariantProps['size']>

interface RadioContextType {
  color: RadioColor
  shape: RadioShape
  size: RadioSize
}

const RadioGroupContext = React.createContext<RadioContextType>({
  color: 'blue',
  shape: 'circle',
  size: 'md'
})

export interface RadioGroupProps extends RadioGroupPrimitive.Props, RadioVariantProps {}

const RadioGroup = ({
  className,
  color,
  shape,
  size,
  ...props
}: RadioGroupProps) => {
  const resolvedColor: RadioColor = color ?? 'blue'
  const resolvedShape: RadioShape = shape ?? 'circle'
  const resolvedSize: RadioSize = size ?? 'md'

  return (
    <RadioGroupContext.Provider
      value={{ color: resolvedColor, shape: resolvedShape, size: resolvedSize }}
    >
      <RadioGroupPrimitive
        data-slot='radio-group'
        className={cn('grid w-full gap-3', className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  )
}

export type RadioGroupItemProps = RadioPrimitive.Root.Props

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => {
  const { color, shape, size } = React.useContext(RadioGroupContext)
  const colorClasses = radioColorStyles[color]

  return (
    <RadioPrimitive.Root
      data-slot='radio-group-item'
      className={cn(
        radioClassVariants({ color, shape, size }),
        // 미체크: cool-grey-04 border / 체크: color ring
        'border-border-default',
        // checked일 때 색상 ring을 동적으로 적용 — group selector로 inner 영역 토글
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='flex items-center justify-center'
        keepMounted
        render={
          <span
            className={cn(
              'transition-opacity data-[unchecked]:opacity-0',
              radioDotSizeStyles[size],
              shape === 'square' ? 'rounded-none' : 'rounded-full',
              colorClasses.dot
            )}
          />
        }
      />
      {/* 체크 시 outer ring 색 적용 — pointer-events-none overlay */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 border-2 opacity-0 transition-opacity group-data-[checked]/radio-group-item:opacity-100',
          shape === 'square' ? 'rounded-none' : 'rounded-full',
          colorClasses.ring
        )}
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem, radioClassVariants, radioColorStyles }
