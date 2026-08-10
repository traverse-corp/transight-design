'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  inlineColorThemeStyles,
  GRAY_SCALE_COLORS,
  type ColorTheme,
  type CommonColor,
  type GrayScaleColor
} from '@/lib/color-theme-styles'

type TextareaColor = Exclude<CommonColor, 'gradient-blue-deep' | 'amber'>

const TEXTAREA_COLORS: TextareaColor[] = [
  ...GRAY_SCALE_COLORS,
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

const grayScaleTextareaFocusStyles = Object.fromEntries(
  GRAY_SCALE_COLORS.map((color) => [color, 'focus:border-primary-blue-1'])
) as Record<GrayScaleColor, string>

const textareaFocusStyles: Record<TextareaColor, string> = {
  blue: 'focus:border-primary-blue-2',
  red: 'focus:border-ui-red',
  orange: 'focus:border-ui-orange',
  yellow: 'focus:border-ui-yellow',
  olive: 'focus:border-ui-olive',
  green: 'focus:border-ui-green',
  skyblue: 'focus:border-ui-skyblue',
  purple: 'focus:border-ui-purple',
  pink: 'focus:border-ui-pink',
  white: 'focus:border-primary-blue-1',
  'gradient-blue': 'focus:border-primary-blue-deep',
  ...grayScaleTextareaFocusStyles
}

const isGrayScaleColor = (color: TextareaColor): color is GrayScaleColor =>
  GRAY_SCALE_COLORS.includes(color as GrayScaleColor)

const textareaColorStyles = Object.fromEntries(
  TEXTAREA_COLORS.map((color) => {
    const grayTextStyles = isGrayScaleColor(color)
      ? 'text-[var(--color-cool-grey-08)] placeholder:text-[var(--color-cool-grey-06)] placeholder:opacity-100'
      : ''

    return [
      color,
      {
        solid: `${inlineColorThemeStyles[color].solid} border-transparent ${textareaFocusStyles[color]} ${grayTextStyles}`,
        outline: `${inlineColorThemeStyles[color].outline} ${textareaFocusStyles[color]} ${grayTextStyles}`,
        soft: `${inlineColorThemeStyles[color].soft} border-transparent ${textareaFocusStyles[color]} ${grayTextStyles}`
      }
    ]
  })
) as Record<TextareaColor, Record<ColorTheme, string>>

const textareaCompoundVariants = Object.entries(textareaColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as TextareaColor,
    theme: theme as ColorTheme,
    className
  }))
)

// 에러 표시는 textarea의 aria-invalid="true"로 자동 적용 (Input과 동일 a11y 패턴).
const textareaClassVariants = cva(
  'field-sizing-content flex w-full border shadow-sm transition-colors outline-none placeholder:text-current placeholder:opacity-60 aria-invalid:border-ui-red aria-invalid:ring-1 aria-invalid:ring-ui-red/10 aria-invalid:focus:border-ui-red disabled:cursor-not-allowed disabled:opacity-50 read-only:cursor-default',
  {
    variants: {
      color: {
        gray01: '',
        gray02: '',
        gray03: '',
        gray04: '',
        gray05: '',
        gray06: '',
        gray07: '',
        gray08: '',
        gray09: '',
        gray10: '',
        gray11: '',
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
        pill: 'rounded-3xl',
        square: 'rounded-none'
      },
      size: {
        xs: 'min-h-16 px-2 py-1.5 typo-m10',
        sm: 'min-h-20 px-3 py-2 typo-m12',
        md: 'min-h-24 px-3 py-2.5 typo-m13',
        lg: 'min-h-32 px-4 py-3 typo-m15',
        xl: 'min-h-40 px-5 py-3.5 typo-m16'
      }
    },
    compoundVariants: textareaCompoundVariants,
    defaultVariants: {
      color: 'gray06',
      theme: 'outline',
      shape: 'default',
      size: 'md'
    }
  }
)

type TextareaVariantProps = VariantProps<typeof textareaClassVariants>

export interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'color' | 'size'>, TextareaVariantProps {
  /** textarea와 counter를 감싸는 root의 className. 너비 지정은 여기에 전달한다. */
  containerClassName?: string
}

const valueLength = (value: React.ComponentProps<'textarea'>['value']) => {
  if (value === undefined || value === null) return 0
  return String(value).length
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      color,
      theme,
      shape,
      size,
      value,
      defaultValue,
      maxLength,
      onChange,
      ...props
    },
    ref
  ) => {
    const showCounter = typeof maxLength === 'number' && maxLength > 0
    const [uncontrolledLength, setUncontrolledLength] = React.useState(() =>
      valueLength(defaultValue)
    )
    const length = value === undefined ? uncontrolledLength : valueLength(value)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setUncontrolledLength(event.currentTarget.value.length)
      }
      onChange?.(event)
    }

    return (
      <div data-slot="textarea-root" className={cn('relative w-full', containerClassName)}>
        <textarea
          data-slot="textarea"
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            textareaClassVariants({ color, theme, shape, size }),
            showCounter && 'pb-7',
            className
          )}
          {...props}
        />
        {showCounter && (
          <span
            data-slot="textarea-counter"
            className="typo-m12-mono text-fg-muted pointer-events-none absolute right-3 bottom-2"
          >
            {length}/{maxLength}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaClassVariants, textareaColorStyles }
