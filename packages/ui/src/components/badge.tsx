import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  inlineColorThemeStyles,
  type ColorTheme,
  type CommonColor
} from '@/lib/color-theme-styles'

// Badge는 인터랙션 레이어가 없어 정본 tokens를 그대로 사용.
// gradient-blue-deep은 Badge에서 노출하지 않으므로 제외.
type BadgeColor = Exclude<CommonColor, 'gradient-blue-deep'>
type BadgeTheme = ColorTheme

const BADGE_COLORS: BadgeColor[] = [
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
  'amber',
  'white',
  'gradient-blue'
]

const badgeColorStyles = Object.fromEntries(
  BADGE_COLORS.map((c) => [c, inlineColorThemeStyles[c]])
) as Record<BadgeColor, Record<BadgeTheme, string>>

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
        xs: 'px-1.5 py-0.5 typo-sb10',
        sm: 'px-2 py-0.5 typo-sb12',
        md: 'px-3 py-1 typo-sb13',
        lg: 'px-3.5 py-1.5 typo-sb15',
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
