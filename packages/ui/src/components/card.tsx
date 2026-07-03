import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  surfaceColorThemeStyles,
  type ColorTheme,
  type CommonColor
} from '@/lib/color-theme-styles'

// Card 고유 레이어 — 모든 테마에 border 색상 필수 (컨테이너 프레임).
// 색·테마 identity(bg/text)는 surfaceColorThemeStyles(정본)에서 상속.
// outline은 전역 정본과 완전 동일 (transparent bg + 색 border) — Card라도 예외 없음.
const cardBorderBySolidColor: Record<CommonColor, string> = {
  gray: 'border-[var(--color-cool-grey-11)]',
  blue: 'border-primary-blue-1',
  red: 'border-ui-red',
  orange: 'border-ui-orange',
  yellow: 'border-ui-yellow',
  olive: 'border-ui-olive',
  green: 'border-ui-green',
  skyblue: 'border-ui-skyblue',
  purple: 'border-ui-purple',
  pink: 'border-ui-pink',
  amber: 'border-ui-amber',
  white: 'border-[var(--color-cool-grey-05)]',
  'gradient-blue': 'border-primary-blue-1',
  'gradient-blue-deep': 'border-primary-blue-deep'
}

// Card에서 노출하는 색 — amber, gradient-blue-deep 제외 (기존 API 유지).
type CardColor = Exclude<CommonColor, 'amber' | 'gradient-blue-deep'>
type CardTheme = ColorTheme

const CARD_COLORS: CardColor[] = [
  'gray',
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
      solid: `${surfaceColorThemeStyles[c].solid} ${cardBorderBySolidColor[c]}`,
      outline: surfaceColorThemeStyles[c].outline,
      soft: surfaceColorThemeStyles[c].soft.includes('border-transparent')
        ? surfaceColorThemeStyles[c].soft
        : `${surfaceColorThemeStyles[c].soft} border-transparent`
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
