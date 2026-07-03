import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  surfaceColorThemeStyles,
  type ColorTheme,
  type CommonColor
} from '@/lib/color-theme-styles'

// Alert 고유 레이어 — solid에 border 색상 명시 (bg와 동일 톤).
// 색·테마 identity(bg/text)는 surfaceColorThemeStyles(정본)에서 상속.
// outline은 전역 정본과 완전 동일 (transparent bg + 색 border) — Alert라도 예외 없음.
// soft는 border-transparent로 통일 (Card와 동일).
const alertBorderBySolidColor: Record<CommonColor, string> = {
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

type AlertColor = Exclude<CommonColor, 'gradient-blue-deep'>
type AlertTheme = ColorTheme

const ALERT_COLORS: AlertColor[] = [
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

const alertColorStyles = Object.fromEntries(
  ALERT_COLORS.map((c) => [
    c,
    {
      solid: `${surfaceColorThemeStyles[c].solid} ${alertBorderBySolidColor[c]}`,
      outline: surfaceColorThemeStyles[c].outline,
      soft: surfaceColorThemeStyles[c].soft.includes('border-transparent')
        ? surfaceColorThemeStyles[c].soft
        : `${surfaceColorThemeStyles[c].soft} border-transparent`
    }
  ])
) as Record<AlertColor, Record<AlertTheme, string>>

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
