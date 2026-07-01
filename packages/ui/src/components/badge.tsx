import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 시맨틱 토큰 사용 (button과 동일 정책):
//   - outline 표면: bg-transparent (라이트/다크 둘 다)
//   - solid의 흰 글씨는 text-on-dark
const badgeColorStyles = {
  gray: {
    solid: 'bg-bg-muted text-fg-default',
    outline: 'border border-border-strong bg-transparent text-fg-muted',
    soft: 'bg-bg-muted text-fg-default'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-on-dark',
    outline:
      'border border-primary-blue-1 bg-transparent text-primary-blue-1',
    soft: 'bg-primary-blue-1/10 text-primary-blue-1'
  },
  red: {
    solid: 'bg-ui-red text-on-dark',
    outline: 'border border-ui-red bg-transparent text-ui-red',
    soft: 'bg-ui-pale-red text-ui-red'
  },
  orange: {
    solid: 'bg-ui-orange text-on-dark',
    outline: 'border border-ui-orange bg-transparent text-ui-orange',
    soft: 'bg-ui-pale-orange text-ui-orange'
  },
  yellow: {
    solid: 'bg-ui-yellow text-on-dark',
    outline: 'border border-ui-yellow bg-transparent text-ui-yellow',
    soft: 'bg-ui-pale-yellow text-ui-yellow'
  },
  olive: {
    solid: 'bg-ui-olive text-on-dark',
    outline: 'border border-ui-olive bg-transparent text-ui-olive',
    soft: 'bg-ui-olive/10 text-ui-olive'
  },
  green: {
    solid: 'bg-ui-green text-on-dark',
    outline: 'border border-ui-green bg-transparent text-ui-green',
    soft: 'bg-ui-pale-green text-ui-green'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-on-dark',
    outline:
      'border border-ui-skyblue bg-transparent text-ui-skyblue',
    soft: 'bg-ui-skyblue/10 text-ui-skyblue'
  },
  purple: {
    solid: 'bg-ui-purple text-on-dark',
    outline: 'border border-ui-purple bg-transparent text-ui-purple',
    soft: 'bg-ui-pale-purple text-ui-purple'
  },
  pink: {
    solid: 'bg-ui-pink text-on-dark',
    outline: 'border border-ui-pink bg-transparent text-ui-pink',
    soft: 'bg-ui-pale-pink text-ui-pink'
  },
  amber: {
    solid: 'bg-ui-amber text-on-dark',
    outline: 'border border-ui-amber bg-transparent text-ui-text-amber',
    soft: 'bg-ui-pale-amber text-ui-text-amber'
  },
  white: {
    solid: 'bg-bg-card text-fg-muted',
    outline:
      'border border-border-default bg-transparent text-fg-muted',
    soft: 'bg-bg-card/80 text-fg-muted'
  },
  'gradient-blue': {
    solid: 'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-on-dark',
    outline:
      'border border-primary-blue-1 bg-transparent text-primary-blue-1',
    soft: 'bg-primary-blue-1/10 text-primary-blue-1'
  }
} as const

type BadgeColor = keyof typeof badgeColorStyles
type BadgeTheme = keyof (typeof badgeColorStyles)['gray']

const badgeCompoundVariants = Object.entries(badgeColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as BadgeColor,
    theme: theme as BadgeTheme,
    className
  }))
)

// cva에는 Style 4축만 등록. variant는 별도 preset 객체에서 단일 진실로 관리.
const badgeClassVariants = cva(
  'inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
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
      theme: {
        solid: '',
        outline: '',
        soft: ''
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
        square: 'rounded-none'
      },
      size: {
        xs: 'px-1.5 py-0.5 typo-sb11',
        sm: 'px-2 py-0.5 typo-sb12',
        md: 'px-3 py-1 typo-sb13',
        lg: 'px-3.5 py-1.5 typo-sb14',
        xl: 'px-4 py-2 typo-sb16'
      }
    },
    compoundVariants: badgeCompoundVariants,
    defaultVariants: {
      color: 'gray',
      theme: 'solid',
      shape: 'default',
      size: 'md'
    }
  }
)

type BadgeVariantProps = VariantProps<typeof badgeClassVariants>
type BadgeDesignColor = NonNullable<BadgeVariantProps['color']>

// ── Variant preset (SoT) ───────────────────────────────────────────
// variant는 Style 4축(color/theme/shape/size)의 조합 alias만 가능.
// - 미명시한 축은 cva default로 자동 매핑 — 굳이 다 적을 필요 없음
// - 4축 외 임의 className / 기타 props 지정 금지
// - 등록 방법: `name: { 변경할_축만 }`
type BadgePresetStyle = Partial<
  Pick<BadgeVariantProps, 'color' | 'theme' | 'shape' | 'size'>
>

const badgeVariantPresets = {
  lea: { color: 'blue', theme: 'soft' },
  vasp: { color: 'yellow', theme: 'soft' },
  'tx-swap': { color: 'orange', theme: 'soft' },
  'tx-bridge': { color: 'purple', theme: 'soft' },
  'alert': { color: 'red', theme: 'solid', shape: 'pill', size: 'md' }} satisfies Record<string, BadgePresetStyle>

type BadgePresetVariant = keyof typeof badgeVariantPresets

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    Omit<BadgeVariantProps, 'color'> {
  /** preset variant 이름 — badgeVariantPresets에 등록된 키 */
  variant?: BadgePresetVariant
  /** 색상 토큰. 명시 시 preset의 color를 덮어쓴다. */
  color?: BadgeDesignColor | (string & {})
}

const isBadgeColor = (color: BadgeProps['color']): color is BadgeDesignColor =>
  typeof color === 'string' && color in badgeColorStyles

type BadgeVariantOptions = Omit<BadgeVariantProps, 'color'> & {
  variant?: BadgePresetVariant
  color?: BadgeProps['color']
  className?: string
}

function badgeVariants({
  className,
  variant,
  color,
  theme,
  shape,
  size
}: BadgeVariantOptions = {}) {
  // satisfies로 좁혀진 literal type을 다시 Partial로 풀어 모든 4축에 optional access 허용
  const preset: BadgePresetStyle | undefined = variant
    ? badgeVariantPresets[variant]
    : undefined

  return cn(
    badgeClassVariants({
      color: isBadgeColor(color) ? color : preset?.color,
      theme: theme ?? preset?.theme,
      shape: shape ?? preset?.shape,
      size: size ?? preset?.size
    }),
    className
  )
}

function Badge({ className, variant, color, theme, shape, size, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={badgeVariants({ variant, color, theme, shape, size, className })}
      {...props}
    />
  )
}

export { Badge, badgeVariants, badgeVariantPresets }
