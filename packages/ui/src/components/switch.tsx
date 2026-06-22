'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ── 색상 시스템 — Button의 solid 패턴 미러링 (12색). on 상태 track 색 ──
const switchColorStyles = {
  gray: 'bg-cool-grey-09',
  blue: 'bg-primary-blue-1',
  red: 'bg-ui-red',
  orange: 'bg-ui-orange',
  yellow: 'bg-ui-yellow',
  olive: 'bg-ui-olive',
  green: 'bg-ui-green',
  skyblue: 'bg-ui-skyblue',
  purple: 'bg-ui-purple',
  pink: 'bg-ui-pink',
  white: 'bg-cool-grey-04',
  'gradient-blue': 'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2'
} as const

// track size + thumb size + translate(on/off) 한 묶음
const switchSizeStyles = {
  xs: { track: 'h-3.5 w-6', thumb: 'h-2.5 w-2.5', on: 'translate-x-3', off: 'translate-x-0.5' },
  sm: { track: 'h-4 w-7', thumb: 'h-3 w-3', on: 'translate-x-3.5', off: 'translate-x-0.5' },
  md: { track: 'h-5 w-9', thumb: 'h-3.5 w-3.5', on: 'translate-x-[18px]', off: 'translate-x-[3px]' },
  lg: { track: 'h-6 w-11', thumb: 'h-[18px] w-[18px]', on: 'translate-x-[22px]', off: 'translate-x-[3px]' },
  xl: { track: 'h-7 w-13', thumb: 'h-[22px] w-[22px]', on: 'translate-x-[26px]', off: 'translate-x-[3px]' }
} as const

const switchClassVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer items-center transition-colors disabled:pointer-events-none disabled:opacity-40',
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
        white: '',
        'gradient-blue': ''
      },
      shape: {
        default: 'rounded-full',
        square: 'rounded-md'
      },
      size: {
        xs: switchSizeStyles.xs.track,
        sm: switchSizeStyles.sm.track,
        md: switchSizeStyles.md.track,
        lg: switchSizeStyles.lg.track,
        xl: switchSizeStyles.xl.track
      }
    },
    defaultVariants: {
      color: 'blue',
      shape: 'default',
      size: 'md'
    }
  }
)

type SwitchVariantProps = VariantProps<typeof switchClassVariants>
export type SwitchColor = NonNullable<SwitchVariantProps['color']>
export type SwitchShape = NonNullable<SwitchVariantProps['shape']>
export type SwitchSize = NonNullable<SwitchVariantProps['size']>

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'color'>,
    SwitchVariantProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const Switch = ({
  checked,
  onCheckedChange,
  disabled,
  color,
  shape,
  size,
  className,
  ...props
}: SwitchProps) => {
  const resolvedColor: SwitchColor = color ?? 'blue'
  const resolvedShape: SwitchShape = shape ?? 'default'
  const resolvedSize: SwitchSize = size ?? 'md'
  const sizeClasses = switchSizeStyles[resolvedSize]

  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        switchClassVariants({ color: resolvedColor, shape: resolvedShape, size: resolvedSize }),
        checked ? switchColorStyles[resolvedColor] : 'bg-cool-grey-05',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block bg-white shadow-sm transition-transform',
          sizeClasses.thumb,
          resolvedShape === 'square' ? 'rounded-sm' : 'rounded-full',
          checked ? sizeClasses.on : sizeClasses.off
        )}
      />
    </button>
  )
}

export { Switch, switchClassVariants, switchColorStyles, switchSizeStyles }
