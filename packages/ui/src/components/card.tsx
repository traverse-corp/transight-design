import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ── 색상 시스템 — Button과 동일 color × theme 매트릭스 (12 × 3) ──
// 카드는 큰 컨테이너라 outline / soft가 자연스러움. solid는 강조 카드(헤더, premium 등)에 한정.
// 정책:
//   - outline: bg-bg-card (콘텐츠 카드 — 표면 가시. button과 달리 transparent 안 함)
//   - solid의 흰 글씨는 text-on-dark
//   - yellow.solid 등 밝은 브랜드 색 위 dark 텍스트는 text-fg-strong (다크 모드에서 white로 자동)
//   - soft 텍스트는 brand 색 (text-ui-X) — bg가 brand pale(다크모드 비스왑)이라 fg-default 쓰면 다크에서 안 보임
const cardColorStyles = {
  gray: {
    solid: 'bg-bg-inverse text-fg-inverse border-bg-inverse',
    outline: 'bg-bg-card text-fg-default border-border-default',
    soft: 'bg-bg-muted text-fg-default border-transparent'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-on-dark border-primary-blue-1',
    outline: 'bg-bg-card text-fg-default border-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1 border-transparent'
  },
  red: {
    solid: 'bg-ui-red text-on-dark border-ui-red',
    outline: 'bg-bg-card text-fg-default border-ui-red',
    soft: 'bg-ui-pale-red text-ui-red border-transparent'
  },
  orange: {
    solid: 'bg-ui-orange text-on-dark border-ui-orange',
    outline: 'bg-bg-card text-fg-default border-ui-orange',
    soft: 'bg-ui-pale-orange text-ui-orange border-transparent'
  },
  yellow: {
    solid: 'bg-ui-yellow text-fg-strong border-ui-yellow',
    outline: 'bg-bg-card text-fg-default border-ui-yellow',
    soft: 'bg-ui-pale-yellow text-ui-yellow border-transparent'
  },
  olive: {
    solid: 'bg-ui-olive text-on-dark border-ui-olive',
    outline: 'bg-bg-card text-fg-default border-ui-olive',
    soft: 'bg-ui-olive/10 text-ui-olive border-transparent'
  },
  green: {
    solid: 'bg-ui-green text-on-dark border-ui-green',
    outline: 'bg-bg-card text-fg-default border-ui-green',
    soft: 'bg-ui-pale-green text-ui-green border-transparent'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-on-dark border-ui-skyblue',
    outline: 'bg-bg-card text-fg-default border-ui-skyblue',
    soft: 'bg-ui-skyblue/10 text-ui-skyblue border-transparent'
  },
  purple: {
    solid: 'bg-ui-purple text-on-dark border-ui-purple',
    outline: 'bg-bg-card text-fg-default border-ui-purple',
    soft: 'bg-ui-pale-purple text-ui-purple border-transparent'
  },
  pink: {
    solid: 'bg-ui-pink text-on-dark border-ui-pink',
    outline: 'bg-bg-card text-fg-default border-ui-pink',
    soft: 'bg-ui-pale-pink text-ui-pink border-transparent'
  },
  white: {
    solid: 'bg-bg-card text-fg-default border-border-default',
    outline: 'bg-bg-card text-fg-default border-border-default',
    soft: 'bg-bg-card/80 text-fg-default border-border-default'
  },
  'gradient-blue': {
    solid:
      'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-on-dark border-primary-blue-1',
    outline: 'bg-bg-card text-fg-default border-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1 border-transparent'
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
