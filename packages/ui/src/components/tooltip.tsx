'use client'

import * as React from 'react'
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const TooltipProvider = ({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) => (
  <TooltipPrimitive.Provider data-slot='tooltip-provider' delay={delay} {...props} />
)

const Tooltip = (props: TooltipPrimitive.Root.Props) => (
  <TooltipPrimitive.Root data-slot='tooltip' {...props} />
)

const TooltipTrigger = (props: TooltipPrimitive.Trigger.Props) => (
  <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
)

import {
  inlineColorThemeStyles,
  GRAY_SCALE_COLORS,
  type ColorTheme,
  type CommonColor
} from '@/lib/color-theme-styles'

type TooltipColor = Exclude<CommonColor, 'amber' | 'gradient-blue-deep'>
type TooltipTheme = ColorTheme

const TOOLTIP_COLORS: TooltipColor[] = [
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
  'white',
  'gradient-blue'
]

const tooltipColorStyles = Object.fromEntries(
  TOOLTIP_COLORS.map((c) => [
    c,
    {
      solid: `${inlineColorThemeStyles[c].solid} border-transparent`,
      outline: inlineColorThemeStyles[c].outline,
      soft: `${inlineColorThemeStyles[c].soft} border-transparent`
    }
  ])
) as Record<TooltipColor, Record<TooltipTheme, string>>

const tooltipCompoundVariants = Object.entries(tooltipColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as TooltipColor,
    theme: theme as TooltipTheme,
    className
  }))
)

const tooltipContentVariants = cva(
  'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit max-w-xs origin-(--transform-origin) rounded-md border',
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
        white: '',
        'gradient-blue': ''
      },
      theme: {
        solid: '',
        outline: '',
        soft: ''
      },
      size: {
        sm: 'px-2 py-1 typo-m12',
        md: 'px-3 py-1.5 typo-m13',
        lg: 'px-4 py-2 typo-m15'
      }
    },
    compoundVariants: tooltipCompoundVariants,
    defaultVariants: {
      color: 'gray06',
      theme: 'solid',
      size: 'md'
    }
  }
)

type TooltipContentVariantProps = VariantProps<typeof tooltipContentVariants>

// Arrow는 solid일 때만 배경색 표시, outline/soft는 hidden (border가 깨지면 어색).
const tooltipArrowVariants = cva(
  'z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5',
  {
    variants: {
      color: {
        gray01: 'bg-[var(--color-cool-grey-01)]',
        gray02: 'bg-[var(--color-cool-grey-02)]',
        gray03: 'bg-[var(--color-cool-grey-03)]',
        gray04: 'bg-[var(--color-cool-grey-04)]',
        gray05: 'bg-[var(--color-cool-grey-05)]',
        gray06: 'bg-[var(--color-cool-grey-06)]',
        gray07: 'bg-[var(--color-cool-grey-07)]',
        gray08: 'bg-[var(--color-cool-grey-08)]',
        gray09: 'bg-[var(--color-cool-grey-09)]',
        gray10: 'bg-[var(--color-cool-grey-10)]',
        gray11: 'bg-[var(--color-cool-grey-11)]',
        blue: 'bg-primary-blue-1',
        red: 'bg-ui-red',
        orange: 'bg-ui-orange',
        yellow: 'bg-ui-yellow',
        olive: 'bg-ui-olive',
        green: 'bg-ui-green',
        skyblue: 'bg-ui-skyblue',
        purple: 'bg-ui-purple',
        pink: 'bg-ui-pink',
        white: 'bg-[var(--color-cool-grey-white)]',
        'gradient-blue': 'bg-primary-blue-1'
      },
      theme: {
        solid: '',
        outline: 'hidden',
        soft: 'hidden'
      }
    },
    defaultVariants: {
      color: 'gray06',
      theme: 'solid'
    }
  }
)

export type TooltipContentProps = TooltipPrimitive.Popup.Props &
  TooltipContentVariantProps &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>

const TooltipContent = ({
  className,
  color,
  theme,
  size,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  children,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className='isolate z-50'
    >
      <TooltipPrimitive.Popup
        data-slot='tooltip-content'
        className={cn(tooltipContentVariants({ color, theme, size }), className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={tooltipArrowVariants({ color, theme })} />
      </TooltipPrimitive.Popup>
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
)

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipContentVariants,
  tooltipColorStyles
}
