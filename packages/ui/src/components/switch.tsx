'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  inlineColorThemeStyles,
  GRAY_SCALE_COLORS,
  type CommonColor
} from '@/lib/color-theme-styles'

type SwitchDesignColor = Exclude<CommonColor, 'gradient-blue-deep'>

const SWITCH_COLORS: SwitchDesignColor[] = [
  ...GRAY_SCALE_COLORS,
  'blue',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'skyblue',
  'purple',
  'pink',
  'amber',
  'white',
  'gradient-blue'
]

// ── 색상 시스템 — Button/Badge의 solid 정본을 on 상태 track 색으로 적용 ──
const switchColorStyles = Object.fromEntries(
  SWITCH_COLORS.map((c) => [c, inlineColorThemeStyles[c].solid])
) as Record<SwitchDesignColor, string>

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
        gray01: '',
        gray02: '',
        gray03: '',
        gray04: '',
        gray05: '',
        gray06: '',
        gray07: '',
        gray08: '',
        gray09: '',
        gray10: '',
        gray11: '',
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
        checked ? switchColorStyles[resolvedColor] : 'bg-bg-muted',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block bg-bg-card shadow-sm transition-transform',
          sizeClasses.thumb,
          resolvedShape === 'square' ? 'rounded-sm' : 'rounded-full',
          checked ? sizeClasses.on : sizeClasses.off
        )}
      />
    </button>
  )
}

export { Switch, switchClassVariants, switchColorStyles, switchSizeStyles }
