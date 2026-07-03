import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  inlineColorThemeStyles,
  type ColorTheme,
  type CommonColor
} from '@/lib/color-theme-styles'

// Button 고유 인터랙션 레이어 — hover / shadow.
// 색·테마 identity는 inlineColorThemeStyles(정본)에서 상속. outline은 인터랙션 없음.
const buttonInteractionStyles: Record<CommonColor, Record<ColorTheme, string>> = {
  gray: {
    solid: 'hover:bg-[var(--color-cool-grey-06)]/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-bg-subtle'
  },
  blue: {
    solid: 'hover:bg-primary-blue-1/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-primary-blue-1/20'
  },
  red: {
    solid: 'hover:bg-ui-red/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-pale-red/80'
  },
  orange: {
    solid: 'hover:bg-ui-orange/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-pale-orange/80'
  },
  yellow: {
    solid: 'hover:bg-ui-yellow/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-pale-yellow/80'
  },
  olive: {
    solid: 'hover:bg-ui-olive/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-olive/20'
  },
  green: {
    solid: 'hover:bg-ui-green/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-pale-green/80'
  },
  skyblue: {
    solid: 'hover:bg-ui-skyblue/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-skyblue/20'
  },
  purple: {
    solid: 'hover:bg-ui-purple/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-pale-purple/80'
  },
  pink: {
    solid: 'hover:bg-ui-pink/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-pale-pink/80'
  },
  amber: {
    solid: 'hover:bg-ui-amber/90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-ui-pale-amber/80'
  },
  white: {
    solid: 'shadow-none hover:bg-[var(--color-cool-grey-01)]',
    outline: '',
    soft: 'shadow-none hover:bg-[var(--color-cool-grey-02)]'
  },
  'gradient-blue': {
    solid: 'hover:opacity-90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-primary-blue-1/20'
  },
  'gradient-blue-deep': {
    solid: 'hover:opacity-90 shadow-card',
    outline: '',
    soft: 'shadow-none hover:bg-primary-blue-1/20'
  }
}

const buttonColorStyles = Object.fromEntries(
  (Object.keys(inlineColorThemeStyles) as CommonColor[]).map((color) => [
    color,
    {
      solid: `${inlineColorThemeStyles[color].solid} ${buttonInteractionStyles[color].solid}`,
      outline: inlineColorThemeStyles[color].outline,
      soft: `${inlineColorThemeStyles[color].soft} ${buttonInteractionStyles[color].soft}`
    }
  ])
) as Record<CommonColor, Record<ColorTheme, string>>

type ButtonColor = CommonColor
type ButtonTheme = ColorTheme

const buttonCompoundVariants = Object.entries(buttonColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as ButtonColor,
    theme: theme as ButtonTheme,
    className
  }))
)

// cva에는 Style 4축만 등록. variant는 별도 preset 객체에서 단일 진실로 관리.
const buttonClassVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-all select-none active:scale-95 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        xs: 'h-7 px-2 typo-sb12',
        sm: 'h-9 px-3 typo-sb14',
        md: 'h-10 px-4 py-2 typo-sb14',
        lg: 'h-11 px-8 typo-sb16',
        xl: 'h-12 px-10 typo-sb16'
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
