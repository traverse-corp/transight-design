import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ── 색상 시스템 — Button과 동일한 color × theme 패턴 ──
const alertColorStyles = {
  gray: {
    solid: 'bg-cool-grey-09 text-white border-cool-grey-09',
    outline: 'bg-white text-cool-grey-09 border-cool-grey-04',
    soft: 'bg-cool-grey-02 text-cool-grey-09 border-cool-grey-02'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-white border-primary-blue-1',
    outline: 'bg-white text-primary-blue-1 border-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1 border-primary-blue-opacity-10'
  },
  red: {
    solid: 'bg-ui-red text-white border-ui-red',
    outline: 'bg-white text-ui-red border-ui-red',
    soft: 'bg-ui-pale-red text-ui-red border-ui-pale-red'
  },
  orange: {
    solid: 'bg-ui-orange text-white border-ui-orange',
    outline: 'bg-white text-ui-orange border-ui-orange',
    soft: 'bg-ui-pale-orange text-ui-orange border-ui-pale-orange'
  },
  yellow: {
    solid: 'bg-ui-yellow text-white border-ui-yellow',
    outline: 'bg-white text-ui-yellow border-ui-yellow',
    soft: 'bg-ui-pale-yellow text-ui-yellow border-ui-pale-yellow'
  },
  olive: {
    solid: 'bg-ui-olive text-white border-ui-olive',
    outline: 'bg-white text-ui-olive border-ui-olive',
    soft: 'bg-ui-olive/10 text-ui-olive border-ui-olive/10'
  },
  green: {
    solid: 'bg-ui-green text-white border-ui-green',
    outline: 'bg-white text-ui-green border-ui-green',
    soft: 'bg-ui-pale-green text-ui-green border-ui-pale-green'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-white border-ui-skyblue',
    outline: 'bg-white text-ui-skyblue border-ui-skyblue',
    soft: 'bg-ui-skyblue/10 text-ui-skyblue border-ui-skyblue/10'
  },
  purple: {
    solid: 'bg-ui-purple text-white border-ui-purple',
    outline: 'bg-white text-ui-purple border-ui-purple',
    soft: 'bg-ui-pale-purple text-ui-purple border-ui-pale-purple'
  },
  pink: {
    solid: 'bg-ui-pink text-white border-ui-pink',
    outline: 'bg-white text-ui-pink border-ui-pink',
    soft: 'bg-ui-pale-pink text-ui-pink border-ui-pale-pink'
  },
  white: {
    solid: 'bg-white text-cool-grey-09 border-cool-grey-04',
    outline: 'bg-white text-cool-grey-09 border-cool-grey-04',
    soft: 'bg-white/80 text-cool-grey-09 border-cool-grey-04'
  },
  'gradient-blue': {
    solid: 'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-white border-primary-blue-1',
    outline: 'bg-white text-primary-blue-1 border-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1 border-primary-blue-opacity-10'
  }
} as const

type AlertColor = keyof typeof alertColorStyles
type AlertTheme = keyof (typeof alertColorStyles)['gray']

const alertCompoundVariants = Object.entries(alertColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as AlertColor,
    theme: theme as AlertTheme,
    className
  }))
)

// cva에는 Style 4축만 등록. variant는 별도 preset 객체에서 단일 진실로 관리.
const alertClassVariants = cva(
  "group/alert relative grid w-full gap-0.5 border text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
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
        default: 'rounded-lg',
        square: 'rounded-none'
      },
      size: {
        sm: 'px-3 py-2 typo-m12',
        md: 'px-4 py-3 typo-m14',
        lg: 'px-5 py-4 typo-m16'
      }
    },
    compoundVariants: alertCompoundVariants,
    defaultVariants: {
      color: 'gray',
      theme: 'soft',
      shape: 'default',
      size: 'md'
    }
  }
)

type AlertVariantProps = VariantProps<typeof alertClassVariants>

// ── Variant preset (SoT) ───────────────────────────────────────────
// 자주 쓰는 상태성 alert 조합. 새 variant 추가는 객체에 한 줄.
type AlertPresetStyle = Partial<
  Pick<AlertVariantProps, 'color' | 'theme' | 'shape' | 'size'>
>

const alertVariantPresets = {
  info: { color: 'blue', theme: 'soft' },
  success: { color: 'green', theme: 'soft' },
  warning: { color: 'yellow', theme: 'soft' },
  error: { color: 'red', theme: 'soft' }
} satisfies Record<string, AlertPresetStyle>

type AlertPresetVariant = keyof typeof alertVariantPresets

export interface AlertProps
  extends React.ComponentProps<'div'>,
    Omit<AlertVariantProps, 'color'> {
  variant?: AlertPresetVariant
  color?: AlertColor
}

const Alert = ({
  className,
  variant,
  color,
  theme,
  shape,
  size,
  ...props
}: AlertProps) => {
  const preset: AlertPresetStyle | undefined = variant ? alertVariantPresets[variant] : undefined

  return (
    <div
      data-slot='alert'
      role='alert'
      className={cn(
        alertClassVariants({
          color: color ?? preset?.color,
          theme: theme ?? preset?.theme,
          shape: shape ?? preset?.shape,
          size: size ?? preset?.size
        }),
        className
      )}
      {...props}
    />
  )
}

const AlertTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot='alert-title'
    className={cn(
      'typo-sb14 group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3',
      className
    )}
    {...props}
  />
)

const AlertDescription = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot='alert-description'
    className={cn(
      'typo-m13 text-balance opacity-80 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
      className
    )}
    {...props}
  />
)

const AlertAction = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot='alert-action'
    className={cn('absolute top-2.5 right-3', className)}
    {...props}
  />
)

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  alertClassVariants,
  alertVariantPresets
}
