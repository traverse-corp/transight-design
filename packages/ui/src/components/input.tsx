'use client'

import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 에러 상태는 input의 aria-invalid="true"로 자동 적용된다 (CSS attribute selector).
// 호출자는 <Input aria-invalid={hasError} /> 또는 react-hook-form 등 폼 라이브러리가
// 자동으로 박아주는 aria-invalid에 의존. 별도 prop은 두지 않는다.
const inputClassVariants = cva(
  'flex w-full items-center border bg-white shadow-sm transition-colors border-cool-grey-03 focus-within:border-primary-blue-1 has-[input[aria-invalid="true"]]:border-ui-red has-[input[aria-invalid="true"]]:focus-within:border-ui-red has-[input[aria-invalid="true"]]:shadow-[0_0_0_1px_rgba(239,68,68,0.1)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
  {
    variants: {
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
    defaultVariants: {
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
  ({ className, shape, size, decoDir, decorator, onDecoratorClick, type, ...props }, ref) => {
    const resolvedDecoDir = decoDir ?? 'start'

    const hasStartDecorator = decorator && resolvedDecoDir === 'start'
    const hasEndDecorator = decorator && resolvedDecoDir === 'end'

    const renderDecorator = (side: 'start' | 'end') => {
      const sideClass = side === 'start' ? 'mr-2' : 'ml-2'
      const base = `text-cool-grey-07 ${sideClass} flex shrink-0 items-center`
      if (onDecoratorClick) {
        return (
          <button
            type='button'
            onClick={onDecoratorClick}
            className={`${base} hover:text-cool-grey-09 cursor-pointer transition-colors`}
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
            shape,
            size,
            decoDir: resolvedDecoDir,
            className
          })
        )}
      >
        {hasStartDecorator && renderDecorator('start')}
        <BaseInput
          className='placeholder:text-cool-grey-07 flex w-full bg-transparent focus-visible:outline-none disabled:cursor-not-allowed'
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
