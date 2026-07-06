import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// border-current로 색을 currentColor에서 받으므로 text-* 토큰으로 제어.
const spinnerColorStyles = {
  blue: 'text-primary-blue-1',
  red: 'text-ui-red',
  orange: 'text-ui-orange',
  yellow: 'text-ui-yellow',
  olive: 'text-ui-olive',
  green: 'text-ui-green',
  skyblue: 'text-ui-skyblue',
  purple: 'text-ui-purple',
  pink: 'text-ui-pink',
  amber: 'text-ui-amber',
  white: 'text-on-dark',
  'gradient-blue': 'text-primary-blue-1',
  gray01: 'text-[var(--color-cool-grey-01)]',
  gray02: 'text-[var(--color-cool-grey-02)]',
  gray03: 'text-[var(--color-cool-grey-03)]',
  gray04: 'text-[var(--color-cool-grey-04)]',
  gray05: 'text-[var(--color-cool-grey-05)]',
  gray06: 'text-[var(--color-cool-grey-06)]',
  gray07: 'text-[var(--color-cool-grey-07)]',
  gray08: 'text-[var(--color-cool-grey-08)]',
  gray09: 'text-[var(--color-cool-grey-09)]',
  gray10: 'text-[var(--color-cool-grey-10)]',
  gray11: 'text-[var(--color-cool-grey-11)]'
} as const

const spinnerClassVariants = cva(
  'animate-spin rounded-full border-current border-t-transparent inline-block',
  {
    variants: {
      color: {
        gray01: spinnerColorStyles.gray01,
        gray02: spinnerColorStyles.gray02,
        gray03: spinnerColorStyles.gray03,
        gray04: spinnerColorStyles.gray04,
        gray05: spinnerColorStyles.gray05,
        gray06: spinnerColorStyles.gray06,
        gray07: spinnerColorStyles.gray07,
        gray08: spinnerColorStyles.gray08,
        gray09: spinnerColorStyles.gray09,
        gray10: spinnerColorStyles.gray10,
        gray11: spinnerColorStyles.gray11,
        blue: spinnerColorStyles.blue,
        red: spinnerColorStyles.red,
        orange: spinnerColorStyles.orange,
        yellow: spinnerColorStyles.yellow,
        olive: spinnerColorStyles.olive,
        green: spinnerColorStyles.green,
        skyblue: spinnerColorStyles.skyblue,
        purple: spinnerColorStyles.purple,
        pink: spinnerColorStyles.pink,
        amber: spinnerColorStyles.amber,
        white: spinnerColorStyles.white,
        'gradient-blue': spinnerColorStyles['gradient-blue']
      },
      size: {
        xs: 'h-3 w-3 border-[1.5px]',
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-[3px]',
        xl: 'h-12 w-12 border-4'
      }
    },
    defaultVariants: {
      color: 'blue',
      size: 'md'
    }
  }
)

type SpinnerVariantProps = VariantProps<typeof spinnerClassVariants>
export type SpinnerColor = NonNullable<SpinnerVariantProps['color']>
export type SpinnerSize = NonNullable<SpinnerVariantProps['size']>

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    SpinnerVariantProps {}

const Spinner = ({ color, size, className, ...props }: SpinnerProps) => (
  <div
    role='status'
    aria-label='Loading'
    className={cn(spinnerClassVariants({ color, size, className }))}
    {...props}
  />
)

export { Spinner, spinnerClassVariants, spinnerColorStyles }
