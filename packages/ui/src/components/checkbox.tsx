'use client'

import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { motion, type HTMLMotionProps, type SVGMotionProps } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { getStrictContext } from '@/lib/get-strict-context'
import { useControlledState } from '@/lib/hooks/use-controlled-state'
import { cn } from '@/lib/utils'
import {
  inlineColorThemeStyles,
  GRAY_SCALE_COLORS,
  type CommonColor
} from '@/lib/color-theme-styles'

type CheckboxDesignColor = Exclude<CommonColor, 'gradient-blue-deep'>

const CHECKBOX_COLORS: CheckboxDesignColor[] = [
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
  'amber',
  'white',
  'gradient-blue'
]

// ── 색상 시스템 — Button/Badge의 solid 정본을 active 시에만 적용 ──
// 클래스는 컴포넌트 안에서 isActive ? styles[color] : 미체크 클래스 로 동적 적용.
// cva.variants에는 키만 노출해 extract-variants 가 카탈로그 컨트롤을 생성하게 한다.
const checkboxColorStyles = Object.fromEntries(
  CHECKBOX_COLORS.map((c) => [c, `${inlineColorThemeStyles[c].solid} border-transparent`])
) as Record<CheckboxDesignColor, string>

const checkboxIndicatorSizeStyles = {
  xs: 'h-2 w-2',
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
  lg: 'h-3.5 w-3.5',
  xl: 'h-4 w-4'
} as const

const checkboxClassVariants = cva(
  'inline-flex shrink-0 items-center justify-center border transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
        amber: '',
        white: '',
        'gradient-blue': ''
      },
      shape: {
        default: 'rounded-sm',
        square: 'rounded-none',
        circle: 'rounded-full'
      },
      size: {
        xs: 'h-3.5 w-3.5',
        sm: 'h-4 w-4',
        md: 'h-[18px] w-[18px]',
        lg: 'h-[22px] w-[22px]',
        xl: 'h-[26px] w-[26px]'
      }
    },
    defaultVariants: {
      color: 'blue',
      shape: 'default',
      size: 'md'
    }
  }
)

type CheckboxVariantProps = VariantProps<typeof checkboxClassVariants>
export type CheckboxColor = NonNullable<CheckboxVariantProps['color']>
export type CheckboxShape = NonNullable<CheckboxVariantProps['shape']>
export type CheckboxSize = NonNullable<CheckboxVariantProps['size']>

type CheckboxContextType = {
  isChecked: boolean
  setIsChecked: CheckboxProps['onCheckedChange']
  isIndeterminate: boolean | undefined
  size: CheckboxSize
}

const [CheckboxProvider, useCheckbox] = getStrictContext<CheckboxContextType>('CheckboxContext')

export type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'render' | 'style'
> &
  HTMLMotionProps<'button'> &
  CheckboxVariantProps

const Checkbox = ({
  name,
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  value,
  nativeButton,
  parent,
  disabled,
  readOnly,
  required,
  inputRef,
  id,
  color = 'blue',
  shape = 'default',
  size = 'md',
  className,
  children,
  ...props
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useControlledState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange
  })

  // cva가 만드는 VariantProps는 nullable이라 context value에 넘기기 전 narrowing.
  const resolvedColor: CheckboxColor = color ?? 'blue'
  const resolvedShape: CheckboxShape = shape ?? 'default'
  const resolvedSize: CheckboxSize = size ?? 'md'

  const isActive = Boolean(isChecked) || Boolean(indeterminate)
  const stateClasses = isActive
    ? checkboxColorStyles[resolvedColor]
    : 'bg-bg-card border-border-default text-transparent'

  return (
    <CheckboxProvider
      value={{ isChecked, setIsChecked, isIndeterminate: indeterminate, size: resolvedSize }}
    >
      <CheckboxPrimitive.Root
        name={name}
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={setIsChecked}
        indeterminate={indeterminate}
        value={value}
        nativeButton={nativeButton ?? true}
        parent={parent}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        inputRef={inputRef}
        id={id}
        render={
          <motion.button
            data-slot='checkbox'
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={cn(
              checkboxClassVariants({
                color: resolvedColor,
                shape: resolvedShape,
                size: resolvedSize
              }),
              stateClasses,
              className
            )}
            {...props}
          >
            {children ?? <CheckboxIndicator />}
          </motion.button>
        }
      />
    </CheckboxProvider>
  )
}

type CheckboxIndicatorProps = SVGMotionProps<SVGSVGElement>

const CheckboxIndicator = ({ className, ...props }: CheckboxIndicatorProps) => {
  const { isChecked, isIndeterminate, size } = useCheckbox()

  return (
    <CheckboxPrimitive.Indicator
      keepMounted
      render={
        <motion.svg
          data-slot='checkbox-indicator'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2.5'
          stroke='currentColor'
          initial='unchecked'
          animate={isChecked ? 'checked' : 'unchecked'}
          className={cn(checkboxIndicatorSizeStyles[size], className)}
          {...props}
        >
          {isIndeterminate ? (
            <motion.line
              x1='5'
              y1='12'
              x2='19'
              y2='12'
              strokeLinecap='round'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.2 }
              }}
            />
          ) : (
            <motion.path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 12.75l6 6 9-13.5'
              variants={{
                checked: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.2, delay: 0.2 }
                },
                unchecked: {
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.2 }
                }
              }}
            />
          )}
        </motion.svg>
      }
    />
  )
}

export {
  Checkbox,
  CheckboxIndicator,
  useCheckbox,
  checkboxClassVariants,
  checkboxColorStyles,
  type CheckboxIndicatorProps,
  type CheckboxContextType
}
