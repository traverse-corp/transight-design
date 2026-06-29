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

// ── 색상 시스템 — Button의 color × theme 패턴 미러링 ──
// solid: 채움 (배경 색, 흰 글씨). 가장 일반적인 툴팁 톤.
// outline: 흰 배경 + 색 border + 색 글씨. 긴 도움말, 색 강조 약하게.
// soft: 옅은 색 배경 + 색 글씨. 정보성 톤.
const tooltipColorStyles = {
  gray: {
    // bg-bg-inverse는 다크모드에서 light로 swap → text도 invert (text-fg-inverse 짝)
    solid: 'bg-bg-inverse text-fg-inverse border-border-strong',
    outline: 'bg-bg-card text-fg-default border-border-strong',
    soft: 'bg-bg-muted text-fg-default border-border-subtle'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-on-dark border-primary-blue-1',
    outline: 'bg-bg-card text-primary-blue-1 border-primary-blue-1',
    soft: 'bg-primary-blue-1/10 text-primary-blue-1 border-primary-blue-1/10'
  },
  red: {
    solid: 'bg-ui-red text-on-dark border-ui-red',
    outline: 'bg-bg-card text-ui-red border-ui-red',
    soft: 'bg-ui-pale-red text-ui-red border-ui-pale-red'
  },
  orange: {
    solid: 'bg-ui-orange text-on-dark border-ui-orange',
    outline: 'bg-bg-card text-ui-orange border-ui-orange',
    soft: 'bg-ui-pale-orange text-ui-orange border-ui-pale-orange'
  },
  yellow: {
    solid: 'bg-ui-yellow text-on-dark border-ui-yellow',
    outline: 'bg-bg-card text-ui-yellow border-ui-yellow',
    soft: 'bg-ui-pale-yellow text-ui-yellow border-ui-pale-yellow'
  },
  olive: {
    solid: 'bg-ui-olive text-on-dark border-ui-olive',
    outline: 'bg-bg-card text-ui-olive border-ui-olive',
    soft: 'bg-ui-olive/10 text-ui-olive border-ui-olive/10'
  },
  green: {
    solid: 'bg-ui-green text-on-dark border-ui-green',
    outline: 'bg-bg-card text-ui-green border-ui-green',
    soft: 'bg-ui-pale-green text-ui-green border-ui-pale-green'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-on-dark border-ui-skyblue',
    outline: 'bg-bg-card text-ui-skyblue border-ui-skyblue',
    soft: 'bg-ui-skyblue/10 text-ui-skyblue border-ui-skyblue/10'
  },
  purple: {
    solid: 'bg-ui-purple text-on-dark border-ui-purple',
    outline: 'bg-bg-card text-ui-purple border-ui-purple',
    soft: 'bg-ui-pale-purple text-ui-purple border-ui-pale-purple'
  },
  pink: {
    solid: 'bg-ui-pink text-on-dark border-ui-pink',
    outline: 'bg-bg-card text-ui-pink border-ui-pink',
    soft: 'bg-ui-pale-pink text-ui-pink border-ui-pale-pink'
  },
  white: {
    solid: 'bg-bg-card text-fg-default border-border-default',
    outline: 'bg-bg-card text-fg-default border-border-default',
    soft: 'bg-bg-card/80 text-fg-default border-border-default'
  },
  'gradient-blue': {
    solid: 'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-on-dark border-primary-blue-1',
    outline: 'bg-bg-card text-primary-blue-1 border-primary-blue-1',
    soft: 'bg-primary-blue-1/10 text-primary-blue-1 border-primary-blue-1/10'
  }
} as const

type TooltipColor = keyof typeof tooltipColorStyles
type TooltipTheme = keyof (typeof tooltipColorStyles)['gray']

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
      theme: {
        solid: '',
        outline: '',
        soft: ''
      },
      size: {
        sm: 'px-2 py-1 typo-m11',
        md: 'px-3 py-1.5 typo-m12',
        lg: 'px-4 py-2 typo-m14'
      }
    },
    compoundVariants: tooltipCompoundVariants,
    defaultVariants: {
      color: 'gray',
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
        gray: 'bg-bg-inverse',
        blue: 'bg-primary-blue-1',
        red: 'bg-ui-red',
        orange: 'bg-ui-orange',
        yellow: 'bg-ui-yellow',
        olive: 'bg-ui-olive',
        green: 'bg-ui-green',
        skyblue: 'bg-ui-skyblue',
        purple: 'bg-ui-purple',
        pink: 'bg-ui-pink',
        white: 'bg-bg-card',
        'gradient-blue': 'bg-primary-blue-1'
      },
      theme: {
        solid: '',
        outline: 'hidden',
        soft: 'hidden'
      }
    },
    defaultVariants: {
      color: 'gray',
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
