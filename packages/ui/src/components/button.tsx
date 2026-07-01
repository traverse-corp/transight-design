import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// 시맨틱 토큰 사용:
//   - outline 표면: bg-transparent (라이트/다크 둘 다) — border + text만 색
//   - solid의 흰 글씨는 text-on-dark (브랜드 솔리드 색 위 영구 white)
//   - gray.* / white.* 의 중성 톤은 bg-bg-{muted|subtle|card} + text-fg-{strong|default|muted}
const buttonColorStyles = {
  gray: {
    solid: 'bg-bg-muted text-fg-default hover:bg-bg-muted/90 shadow-card',
    outline: 'border border-border-strong bg-transparent text-fg-muted',
    soft: 'bg-bg-muted text-fg-default shadow-none hover:bg-bg-subtle'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-on-dark hover:bg-primary-blue-1/90 shadow-card',
    outline: 'border border-primary-blue-1 bg-transparent text-primary-blue-1',
    soft: 'bg-primary-blue-1/10 text-primary-blue-1 shadow-none hover:bg-primary-blue-1/20'
  },
  red: {
    solid: 'bg-ui-red text-on-dark hover:bg-ui-red/90 shadow-card',
    outline: 'border border-ui-red bg-transparent text-ui-red',
    soft: 'bg-ui-pale-red text-ui-red shadow-none hover:bg-ui-pale-red/80'
  },
  orange: {
    solid: 'bg-ui-orange text-on-dark hover:bg-ui-orange/90 shadow-card',
    outline: 'border border-ui-orange bg-transparent text-ui-orange',
    soft: 'bg-ui-pale-orange text-ui-orange shadow-none hover:bg-ui-pale-orange/80'
  },
  yellow: {
    solid: 'bg-ui-yellow text-on-dark hover:bg-ui-yellow/90 shadow-card',
    outline: 'border border-ui-yellow bg-transparent text-ui-yellow',
    soft: 'bg-ui-pale-yellow text-ui-yellow shadow-none hover:bg-ui-pale-yellow/80'
  },
  olive: {
    solid: 'bg-ui-olive text-on-dark hover:bg-ui-olive/90 shadow-card',
    outline: 'border border-ui-olive bg-transparent text-ui-olive',
    soft: 'bg-ui-olive/10 text-ui-olive shadow-none hover:bg-ui-olive/20'
  },
  green: {
    solid: 'bg-ui-green text-on-dark hover:bg-ui-green/90 shadow-card',
    outline: 'border border-ui-green bg-transparent text-ui-green',
    soft: 'bg-ui-pale-green text-ui-green shadow-none hover:bg-ui-pale-green/80'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-on-dark hover:bg-ui-skyblue/90 shadow-card',
    outline: 'border border-ui-skyblue bg-transparent text-ui-skyblue',
    soft: 'bg-ui-skyblue/10 text-ui-skyblue shadow-none hover:bg-ui-skyblue/20'
  },
  purple: {
    solid: 'bg-ui-purple text-on-dark hover:bg-ui-purple/90 shadow-card',
    outline: 'border border-ui-purple bg-transparent text-ui-purple',
    soft: 'bg-ui-pale-purple text-ui-purple shadow-none hover:bg-ui-pale-purple/80'
  },
  pink: {
    solid: 'bg-ui-pink text-on-dark hover:bg-ui-pink/90 shadow-card',
    outline: 'border border-ui-pink bg-transparent text-ui-pink',
    soft: 'bg-ui-pale-pink text-ui-pink shadow-none hover:bg-ui-pale-pink/80'
  },
  amber: {
    solid: 'bg-ui-amber text-on-dark hover:bg-ui-amber/90 shadow-card',
    outline: 'border border-ui-amber bg-transparent text-ui-text-amber',
    soft: 'bg-ui-pale-amber text-ui-text-amber shadow-none hover:bg-ui-pale-amber/80'
  },
  white: {
    solid: 'bg-bg-card text-fg-muted shadow-none hover:bg-hover-bg',
    outline: 'border border-border-default bg-transparent text-fg-muted',
    soft: 'bg-bg-card/80 text-fg-muted shadow-none hover:bg-hover-bg'
  },
  'gradient-blue': {
    solid:
      'bg-primary-blue-gradient-1 text-on-dark hover:opacity-90 shadow-card',
    outline: 'border border-primary-blue-1 bg-transparent text-primary-blue-1',
    soft: 'bg-primary-blue-1/10 text-primary-blue-1 shadow-none hover:bg-primary-blue-1/20'
  },
  'gradient-blue-deep': {
    solid:
      'bg-primary-blue-gradient-2 text-on-dark hover:opacity-90 shadow-card',
    outline: 'border border-primary-blue-deep bg-transparent text-primary-blue-deep',
    soft: 'bg-primary-blue-1/10 text-primary-blue-1 shadow-none hover:bg-primary-blue-1/20'
  }
} as const

type ButtonColor = keyof typeof buttonColorStyles
type ButtonTheme = keyof (typeof buttonColorStyles)['gray']

const buttonCompoundVariants = Object.entries(buttonColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as ButtonColor,
    theme: theme as ButtonTheme,
    className
  }))
)

// cva에는 Style 4축만 등록. variant는 별도 preset 객체에서 단일 진실로 관리.
const buttonClassVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all select-none active:scale-95 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        'gradient-blue': '',
        'gradient-blue-deep': ''
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
        xs: 'h-7 px-2 text-xs',
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-base'
      }
    },
    compoundVariants: buttonCompoundVariants,
    defaultVariants: {
      color: 'gray',
      theme: 'solid',
      shape: 'default',
      size: 'md'
    }
  }
)

type ButtonVariantProps = VariantProps<typeof buttonClassVariants>
type ButtonDesignColor = NonNullable<ButtonVariantProps['color']>

// ── Variant preset (SoT) ───────────────────────────────────────────
// variant는 Style 4축(color/theme/shape/size)의 조합 alias만 가능.
// - 미명시한 축은 cva default로 자동 매핑 — 굳이 다 적을 필요 없음
// - 4축 외 임의 className / 기타 props 지정 금지
// - 등록 방법: `name: { 변경할_축만 }`
type ButtonPresetStyle = Partial<
  Pick<ButtonVariantProps, 'color' | 'theme' | 'shape' | 'size'>
>

const buttonVariantPresets = {
  destructive: { color: 'red' },
  success: { color: 'green', theme: 'soft' },
  icon: {}
} satisfies Record<string, ButtonPresetStyle>

type ButtonPresetVariant = keyof typeof buttonVariantPresets

type ButtonProps = Omit<ButtonPrimitive.Props, 'color'> &
  Omit<ButtonVariantProps, 'color'> & {
    /** preset variant 이름 — buttonVariantPresets에 등록된 키 */
    variant?: ButtonPresetVariant
    /** 색상 토큰. 명시 시 preset의 color를 덮어쓴다. */
    color?: ButtonDesignColor | (string & {})
  }

const isButtonColor = (color: ButtonProps['color']): color is ButtonDesignColor =>
  typeof color === 'string' && color in buttonColorStyles

type ButtonVariantOptions = Omit<ButtonVariantProps, 'color'> & {
  variant?: ButtonPresetVariant
  color?: ButtonProps['color']
  className?: string
}

function buttonVariants({
  className,
  variant,
  color,
  theme,
  shape,
  size
}: ButtonVariantOptions = {}) {
  // satisfies로 좁혀진 literal type을 다시 Partial로 풀어 모든 4축에 optional access 허용
  const preset: ButtonPresetStyle | undefined = variant
    ? buttonVariantPresets[variant]
    : undefined

  return cn(
    buttonClassVariants({
      color: isButtonColor(color) ? color : preset?.color,
      theme: theme ?? preset?.theme,
      shape: shape ?? preset?.shape,
      size: size ?? preset?.size
    }),
    variant === 'icon' && 'aspect-square gap-0 px-0',
    className
  )
}

function Button({ className, variant, color, theme, shape, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        'cursor-pointer',
        buttonVariants({
          variant,
          color,
          theme,
          shape,
          size
        }),
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants, buttonVariantPresets, type ButtonProps }
