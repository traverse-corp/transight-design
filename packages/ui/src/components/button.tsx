import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonColorStyles = {
  gray: {
    solid: 'bg-cool-grey-04 text-cool-grey-09 hover:bg-cool-grey-04/90 shadow-md',
    outline: 'border border-cool-grey-06 bg-white text-cool-grey-07 hover:bg-cool-grey-01',
    soft: 'bg-cool-grey-02 text-cool-grey-09 shadow-none hover:bg-cool-grey-03'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-white hover:bg-primary-blue-1/90 shadow-sm',
    outline: 'border border-primary-blue-1 bg-white text-primary-blue-1 hover:bg-cool-grey-01',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1 shadow-none hover:bg-primary-blue-opacity-20'
  },
  red: {
    solid: 'bg-ui-red text-white hover:bg-ui-red/90 shadow-sm',
    outline: 'border border-ui-red bg-white text-ui-red hover:bg-cool-grey-01',
    soft: 'bg-ui-pale-red text-ui-red shadow-none hover:bg-ui-pale-red/80'
  },
  orange: {
    solid: 'bg-ui-orange text-white hover:bg-ui-orange/90 shadow-sm',
    outline: 'border border-ui-orange bg-white text-ui-orange hover:bg-cool-grey-01',
    soft: 'bg-ui-pale-orange text-ui-orange shadow-none hover:bg-ui-pale-orange/80'
  },
  yellow: {
    solid: 'bg-ui-yellow text-white hover:bg-ui-yellow/90 shadow-sm',
    outline: 'border border-ui-yellow bg-white text-ui-yellow hover:bg-cool-grey-01',
    soft: 'bg-ui-pale-yellow text-ui-yellow shadow-none hover:bg-ui-pale-yellow/80'
  },
  olive: {
    solid: 'bg-ui-olive text-white hover:bg-ui-olive/90 shadow-sm',
    outline: 'border border-ui-olive bg-white text-ui-olive hover:bg-cool-grey-01',
    soft: 'bg-ui-olive/10 text-ui-olive shadow-none hover:bg-ui-olive/20'
  },
  green: {
    solid: 'bg-ui-green text-white hover:bg-ui-green/90 shadow-sm',
    outline: 'border border-ui-green bg-white text-ui-green hover:bg-cool-grey-01',
    soft: 'bg-ui-pale-green text-ui-green shadow-none hover:bg-ui-pale-green/80'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-white hover:bg-ui-skyblue/90 shadow-sm',
    outline: 'border border-ui-skyblue bg-white text-ui-skyblue hover:bg-cool-grey-01',
    soft: 'bg-ui-skyblue/10 text-ui-skyblue shadow-none hover:bg-ui-skyblue/20'
  },
  purple: {
    solid: 'bg-ui-purple text-white hover:bg-ui-purple/90 shadow-sm',
    outline: 'border border-ui-purple bg-white text-ui-purple hover:bg-cool-grey-01',
    soft: 'bg-ui-pale-purple text-ui-purple shadow-none hover:bg-ui-pale-purple/80'
  },
  pink: {
    solid: 'bg-ui-pink text-white hover:bg-ui-pink/90 shadow-sm',
    outline: 'border border-ui-pink bg-white text-ui-pink hover:bg-cool-grey-01',
    soft: 'bg-ui-pale-pink text-ui-pink shadow-none hover:bg-ui-pale-pink/80'
  },
  white: {
    solid: 'bg-white text-cool-grey-07 shadow-none hover:bg-cool-grey-01',
    outline: 'border border-cool-grey-04 bg-white text-cool-grey-07 hover:bg-cool-grey-01',
    soft: 'bg-white/80 text-cool-grey-07 shadow-none hover:bg-cool-grey-01'
  },
  'gradient-blue': {
    solid:
      'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-white hover:bg-primary-blue-1/90 shadow-sm',
    outline: 'border border-primary-blue-1 bg-white text-primary-blue-1 hover:bg-cool-grey-01',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1 shadow-none hover:bg-primary-blue-opacity-20'
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
// 새 variant 추가는 이 객체에 한 줄만 추가하면 끝. TS type / 카탈로그 자동 인식.
//   ex: my-variant: { color: 'blue', theme: 'soft', shape: 'pill' }
type ButtonPresetStyle = Pick<ButtonVariantProps, 'color' | 'theme' | 'shape' | 'size'> & {
  className?: string
}

const buttonVariantPresets = {
  default: { color: 'gray', theme: 'solid', shape: 'default', size: 'md' },
  destructive: { color: 'red', theme: 'solid', shape: 'default', size: 'md' },
  success: { color: 'green', theme: 'soft', shape: 'default', size: 'md' },
  dark: {
    color: 'gray',
    theme: 'solid',
    shape: 'default',
    size: 'md',
    className: 'bg-cool-grey-09 text-white hover:bg-cool-grey-10 shadow-md'
  }
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
  const preset = variant ? buttonVariantPresets[variant] : undefined
  const presetClassName: string | undefined =
    preset && 'className' in preset ? (preset.className as string | undefined) : undefined

  return cn(
    buttonClassVariants({
      color: isButtonColor(color) ? color : preset?.color,
      theme: theme ?? preset?.theme,
      shape: shape ?? preset?.shape,
      size: size ?? preset?.size
    }),
    // preset에 className override가 있으면 마지막에 합성 (Style prop 미명시일 때만)
    !color && !theme && presetClassName,
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
