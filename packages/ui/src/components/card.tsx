import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  inlineColorThemeStyles,
  GRAY_SCALE_COLORS,
  type ColorTheme,
  type CommonColor
} from '@/lib/color-theme-styles'

// Card에서 노출하는 색 — amber, gradient-blue-deep 제외 (기존 API 유지).
type CardColor = Exclude<CommonColor, 'amber' | 'gradient-blue-deep'>
type CardTheme = ColorTheme

const CARD_COLORS: CardColor[] = [
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

const cardColorStyles = Object.fromEntries(
  CARD_COLORS.map((c) => [
    c,
    {
      solid: `${inlineColorThemeStyles[c].solid} border-transparent`,
      outline: inlineColorThemeStyles[c].outline,
      soft: `${inlineColorThemeStyles[c].soft} border-transparent`
    }
  ])
) as Record<CardColor, Record<CardTheme, string>>

const cardCompoundVariants = Object.entries(cardColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as CardColor,
    theme: theme as CardTheme,
    className
  }))
)

const cardClassVariants = cva('border shadow-card transition-colors', {
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
    shape: {
      default: 'rounded-xl',
      square: 'rounded-none'
    },
    size: {
      sm: 'gap-1 [&>[data-slot=card-header]]:p-4 [&>[data-slot=card-content]]:p-4 [&>[data-slot=card-content]]:pt-0 [&>[data-slot=card-footer]]:p-4 [&>[data-slot=card-footer]]:pt-0',
      md: 'gap-1.5 [&>[data-slot=card-header]]:p-6 [&>[data-slot=card-content]]:p-6 [&>[data-slot=card-content]]:pt-0 [&>[data-slot=card-footer]]:p-6 [&>[data-slot=card-footer]]:pt-0',
      lg: 'gap-2 [&>[data-slot=card-header]]:p-8 [&>[data-slot=card-content]]:p-8 [&>[data-slot=card-content]]:pt-0 [&>[data-slot=card-footer]]:p-8 [&>[data-slot=card-footer]]:pt-0'
    }
  },
  compoundVariants: cardCompoundVariants,
  defaultVariants: {
    color: 'white',
    theme: 'outline',
    shape: 'default',
    size: 'md'
  }
})

export type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardClassVariants>

const Card = ({ className, color, theme, shape, size, ...props }: CardProps) => (
  <div
    data-slot='card'
    className={cn(cardClassVariants({ color, theme, shape, size, className }))}
    {...props}
  />
)

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot='card-header'
    className={cn('flex flex-col gap-1.5', className)}
    {...props}
  />
)

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot='card-title' className={cn('typo-sb16', className)} {...props} />
)

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot='card-description' className={cn('typo-m13 opacity-80', className)} {...props} />
)

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot='card-content' className={cn(className)} {...props} />
)

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot='card-footer' className={cn('flex items-center', className)} {...props} />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardClassVariants }
