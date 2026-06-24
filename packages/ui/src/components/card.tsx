import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ── 색상 시스템 — Button과 동일 color × theme 매트릭스 (12 × 3) ──
// 카드는 큰 컨테이너라 outline / soft가 자연스러움. solid는 강조 카드(헤더, premium 등)에 한정.
const cardColorStyles = {
  gray: {
    solid: 'bg-cool-grey-09 text-white border-cool-grey-09',
    outline: 'bg-white text-cool-grey-09 border-cool-grey-04',
    soft: 'bg-cool-grey-02 text-cool-grey-09 border-cool-grey-02'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-white border-primary-blue-1',
    outline: 'bg-white text-cool-grey-09 border-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-cool-grey-09 border-primary-blue-opacity-10'
  },
  red: {
    solid: 'bg-ui-red text-white border-ui-red',
    outline: 'bg-white text-cool-grey-09 border-ui-red',
    soft: 'bg-ui-pale-red text-cool-grey-09 border-ui-pale-red'
  },
  orange: {
    solid: 'bg-ui-orange text-white border-ui-orange',
    outline: 'bg-white text-cool-grey-09 border-ui-orange',
    soft: 'bg-ui-pale-orange text-cool-grey-09 border-ui-pale-orange'
  },
  yellow: {
    solid: 'bg-ui-yellow text-cool-grey-09 border-ui-yellow',
    outline: 'bg-white text-cool-grey-09 border-ui-yellow',
    soft: 'bg-ui-pale-yellow text-cool-grey-09 border-ui-pale-yellow'
  },
  olive: {
    solid: 'bg-ui-olive text-white border-ui-olive',
    outline: 'bg-white text-cool-grey-09 border-ui-olive',
    soft: 'bg-ui-olive/10 text-cool-grey-09 border-ui-olive/10'
  },
  green: {
    solid: 'bg-ui-green text-white border-ui-green',
    outline: 'bg-white text-cool-grey-09 border-ui-green',
    soft: 'bg-ui-pale-green text-cool-grey-09 border-ui-pale-green'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-white border-ui-skyblue',
    outline: 'bg-white text-cool-grey-09 border-ui-skyblue',
    soft: 'bg-ui-skyblue/10 text-cool-grey-09 border-ui-skyblue/10'
  },
  purple: {
    solid: 'bg-ui-purple text-white border-ui-purple',
    outline: 'bg-white text-cool-grey-09 border-ui-purple',
    soft: 'bg-ui-pale-purple text-cool-grey-09 border-ui-pale-purple'
  },
  pink: {
    solid: 'bg-ui-pink text-white border-ui-pink',
    outline: 'bg-white text-cool-grey-09 border-ui-pink',
    soft: 'bg-ui-pale-pink text-cool-grey-09 border-ui-pale-pink'
  },
  white: {
    solid: 'bg-white text-cool-grey-09 border-cool-grey-04',
    outline: 'bg-white text-cool-grey-09 border-cool-grey-04',
    soft: 'bg-white/80 text-cool-grey-09 border-cool-grey-04'
  },
  'gradient-blue': {
    solid:
      'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-white border-primary-blue-1',
    outline: 'bg-white text-cool-grey-09 border-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-cool-grey-09 border-primary-blue-opacity-10'
  }
} as const

type CardColor = keyof typeof cardColorStyles
type CardTheme = keyof (typeof cardColorStyles)['gray']

const cardCompoundVariants = Object.entries(cardColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as CardColor,
    theme: theme as CardTheme,
    className
  }))
)

const cardClassVariants = cva('border shadow-sm transition-colors', {
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
