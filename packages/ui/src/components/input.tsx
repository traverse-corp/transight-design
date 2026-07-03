'use client'

import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  inlineColorThemeStyles,
  type ColorTheme,
  type CommonColor
} from '@/lib/color-theme-styles'

// Input 고유 border 레이어 — solid/soft에도 border 색을 명시 (필드는 항상 border 가시).
// solid는 bg와 같은 색으로 border, soft는 옅게.
// solid는 배경이 진해서 value 텍스트를 흰색으로 강제 (descendant selector로 BaseInput 덮어씀).
const inputBorderStyles: Record<CommonColor, Record<'solid' | 'soft', string>> = {
  gray: { solid: 'border-cool-grey-06 [&_input]:!text-on-dark', soft: 'border-transparent' },
  blue: { solid: 'border-primary-blue-1 [&_input]:!text-on-dark', soft: 'border-primary-blue-1/10' },
  red: { solid: 'border-ui-red [&_input]:!text-on-dark', soft: 'border-ui-pale-red' },
  orange: { solid: 'border-ui-orange [&_input]:!text-on-dark', soft: 'border-ui-pale-orange' },
  yellow: { solid: 'border-ui-yellow [&_input]:!text-on-dark', soft: 'border-ui-pale-yellow' },
  olive: { solid: 'border-ui-olive [&_input]:!text-on-dark', soft: 'border-ui-olive/10' },
  green: { solid: 'border-ui-green [&_input]:!text-on-dark', soft: 'border-ui-pale-green' },
  skyblue: { solid: 'border-ui-skyblue [&_input]:!text-on-dark', soft: 'border-ui-skyblue/10' },
  purple: { solid: 'border-ui-purple [&_input]:!text-on-dark', soft: 'border-ui-pale-purple' },
  pink: { solid: 'border-ui-pink [&_input]:!text-on-dark', soft: 'border-ui-pale-pink' },
  amber: { solid: 'border-ui-amber [&_input]:!text-on-dark', soft: 'border-ui-pale-amber' },
  white: { solid: 'border-white [&_input]:!text-cool-grey-08', soft: 'border-cool-grey-05' },
  'gradient-blue': { solid: 'border-primary-blue-1 [&_input]:!text-on-dark', soft: 'border-primary-blue-1/10' },
  'gradient-blue-deep': { solid: 'border-primary-blue-deep [&_input]:!text-on-dark', soft: 'border-primary-blue-1/10' }
}

// Input 고유 인터랙션 레이어 — focus-within (필드 활성 시 primary-blue-1 하이라이트).
// Select와 동일 패턴. 색·테마 identity는 inlineColorThemeStyles(정본)에서 상속.
const inputFocusStyles: Record<CommonColor, string> = {
  gray: 'focus-within:border-primary-blue-1',
  blue: 'focus-within:border-primary-blue-2',
  red: 'focus-within:border-ui-red',
  orange: 'focus-within:border-ui-orange',
  yellow: 'focus-within:border-ui-yellow',
  olive: 'focus-within:border-ui-olive',
  green: 'focus-within:border-ui-green',
  skyblue: 'focus-within:border-ui-skyblue',
  purple: 'focus-within:border-ui-purple',
  pink: 'focus-within:border-ui-pink',
  amber: 'focus-within:border-ui-amber',
  white: 'focus-within:border-primary-blue-1',
  'gradient-blue': 'focus-within:border-primary-blue-deep',
  'gradient-blue-deep': 'focus-within:border-primary-blue-deep'
}

// Input에서 노출하는 색 — gradient-blue-deep, amber 제외 (Select와 동일 API 유지).
type InputColor = Exclude<CommonColor, 'gradient-blue-deep' | 'amber'>

const INPUT_COLORS: InputColor[] = [
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
  'white',
  'gradient-blue'
]

const inputColorStyles = Object.fromEntries(
  INPUT_COLORS.map((c) => [
    c,
    {
      solid: `${inlineColorThemeStyles[c].solid} ${inputBorderStyles[c].solid} ${inputFocusStyles[c]}`,
      outline: `${inlineColorThemeStyles[c].outline} ${inputFocusStyles[c]}`,
      soft: `${inlineColorThemeStyles[c].soft} ${inputBorderStyles[c].soft} ${inputFocusStyles[c]}`
    }
  ])
) as Record<InputColor, Record<ColorTheme, string>>

const inputCompoundVariants = Object.entries(inputColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as InputColor,
    theme: theme as ColorTheme,
    className
  }))
)

// 에러 상태는 input의 aria-invalid="true"로 자동 적용된다 (CSS attribute selector).
// 호출자는 <Input aria-invalid={hasError} /> 또는 react-hook-form 등 폼 라이브러리가
// 자동으로 박아주는 aria-invalid에 의존. 별도 prop은 두지 않는다.
const inputClassVariants = cva(
  'flex w-full items-center border shadow-card transition-colors has-[input[aria-invalid="true"]]:border-ui-red has-[input[aria-invalid="true"]]:focus-within:border-ui-red has-[input[aria-invalid="true"]]:shadow-[0_0_0_1px_rgba(239,68,68,0.1)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
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
        pill: 'rounded-full',
        square: 'rounded-none'
      },
      size: {
        xs: 'h-7 px-2 typo-m12',
        sm: 'h-9 px-3 typo-m13',
        md: 'h-10 px-3 typo-m14',
        lg: 'h-12 px-4 typo-m16',
        xl: 'h-14 px-5 typo-m18'
      },
      decoDir: {
        start: '',
        end: ''
      }
    },
    compoundVariants: inputCompoundVariants,
    defaultVariants: {
      color: 'gray',
      theme: 'outline',
      shape: 'default',
      size: 'md',
      decoDir: 'start'
    }
  }
)

type InputVariantProps = VariantProps<typeof inputClassVariants>

export interface InputProps extends Omit<BaseInput.Props, 'size'>, InputVariantProps {
  /** 시작/끝 데코레이터 — decoDir로 위치 지정 */
  decorator?: React.ReactNode
  /**
   * decorator 클릭 핸들러. 지정 시 decorator wrapper가 button으로 렌더되어 클릭 가능.
   * search/submit/clear 등 input 옆 액션 트리거에 사용.
   */
  onDecoratorClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, color, theme, shape, size, decoDir, decorator, onDecoratorClick, type, ...props }, ref) => {
    const resolvedDecoDir = decoDir ?? 'start'

    const hasStartDecorator = decorator && resolvedDecoDir === 'start'
    const hasEndDecorator = decorator && resolvedDecoDir === 'end'

    const renderDecorator = (side: 'start' | 'end') => {
      const sideClass = side === 'start' ? 'mr-2' : 'ml-2'
      const base = `text-fg-muted ${sideClass} flex shrink-0 items-center`
      if (onDecoratorClick) {
        return (
          <button
            type='button'
            onClick={onDecoratorClick}
            className={`${base} hover:text-fg-default cursor-pointer transition-colors`}
          >
            {decorator}
          </button>
        )
      }
      return <div className={base}>{decorator}</div>
    }

    return (
      <div
        className={cn(
          inputClassVariants({
            color,
            theme,
            shape,
            size,
            decoDir: resolvedDecoDir,
            className
          })
        )}
      >
        {hasStartDecorator && renderDecorator('start')}
        <BaseInput
          className='placeholder:text-cool-grey-04 flex w-full bg-transparent text-cool-grey-08 focus-visible:outline-none disabled:cursor-not-allowed'
          ref={ref}
          type={type}
          {...props}
        />
        {hasEndDecorator && renderDecorator('end')}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputClassVariants }
