'use client'

import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import { Icon } from '@/icons/icon'
import { useCapsLock } from '@/lib/hooks/use-caps-lock'
import { cn } from '@/lib/utils'

const inputClassVariants = cva(
  'flex w-full items-center border bg-white shadow-sm transition-colors has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        search: '',
        password: ''
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
      },
      tone: {
        normal: 'border-cool-grey-03 focus-within:border-primary-blue-1',
        error:
          'border-ui-red focus-within:border-ui-red shadow-[0_0_0_1px_rgba(239,68,68,0.1)]'
      }
    },
    defaultVariants: {
      variant: 'default',
      shape: 'default',
      size: 'md',
      decoDir: 'start',
      tone: 'normal'
    }
  }
)

type InputVariantProps = VariantProps<typeof inputClassVariants>
type InputPresetVariant = NonNullable<InputVariantProps['variant']>

/** 자주 쓰는 Input 조합 preset. 명시적 prop이 항상 우선한다. */
interface InputPreset {
  shape?: InputVariantProps['shape']
  size?: InputVariantProps['size']
  decoDir?: InputVariantProps['decoDir']
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: string
  decorator?: React.ReactNode
  capsLockIndicator?: boolean
}

const inputVariantPresets: Record<InputPresetVariant, InputPreset> = {
  default: {
    placeholder: '무엇이든 입력하세요'
  },
  search: {
    shape: 'pill',
    decoDir: 'start',
    placeholder: 'Search Address',
    decorator: <Icon src='ic-com-search' color='cool-grey-07' size='md' />
  },
  password: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    capsLockIndicator: true
  }
}

export interface InputProps
  extends Omit<BaseInput.Props, 'size'>,
    Omit<InputVariantProps, 'tone'> {
  /** 시작/끝 데코레이터 — decoDir로 위치 지정 */
  decorator?: React.ReactNode
  /** error 상태 표시 (true → 빨간 border) */
  error?: boolean
  /**
   * Caps Lock 활성 시 표시할 인디케이터. true면 기본 Icon, ReactNode면 그대로,
   * false면 표시 안 함. password 프리셋에서는 기본 true.
   */
  capsLockIndicator?: boolean | React.ReactNode
}

const isCapsLockOn = (value: boolean | React.ReactNode | undefined): boolean =>
  value === true || (value !== false && value !== undefined && value !== null)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      shape,
      size,
      decoDir,
      decorator,
      error,
      capsLockIndicator,
      placeholder,
      type,
      ...props
    },
    ref
  ) => {
    const capsLockOn = useCapsLock()
    const preset = inputVariantPresets[(variant ?? 'default') as InputPresetVariant]

    // 명시적 prop이 preset을 덮어쓴다
    const resolvedShape = shape ?? preset.shape ?? 'default'
    const resolvedSize = size ?? preset.size ?? 'md'
    const resolvedDecoDir = decoDir ?? preset.decoDir ?? 'start'
    const resolvedDecorator = decorator ?? preset.decorator
    const resolvedPlaceholder = placeholder ?? preset.placeholder
    const resolvedType = type ?? preset.type

    const showCapsLockIndicator =
      isCapsLockOn(capsLockIndicator ?? preset.capsLockIndicator) &&
      resolvedType === 'password' &&
      capsLockOn

    const tone = error ? 'error' : 'normal'
    const hasStartDecorator = resolvedDecorator && resolvedDecoDir === 'start'
    const hasEndDecorator = resolvedDecorator && resolvedDecoDir === 'end'

    return (
      <div
        className={cn(
          inputClassVariants({
            variant,
            shape: resolvedShape,
            size: resolvedSize,
            decoDir: resolvedDecoDir,
            tone,
            className
          })
        )}
      >
        {hasStartDecorator && (
          <div className='text-cool-grey-07 mr-2 flex shrink-0 items-center'>
            {resolvedDecorator}
          </div>
        )}
        <BaseInput
          className='placeholder:text-cool-grey-07 flex w-full bg-transparent focus-visible:outline-none disabled:cursor-not-allowed'
          ref={ref}
          type={resolvedType}
          placeholder={resolvedPlaceholder}
          {...props}
        />
        {hasEndDecorator && (
          <div className='text-cool-grey-07 ml-2 flex shrink-0 items-center'>
            {resolvedDecorator}
          </div>
        )}
        {showCapsLockIndicator && (
          <div
            className='text-cool-grey-07 ml-2 flex shrink-0 items-center'
            title='Caps Lock is Activated'
          >
            {React.isValidElement(capsLockIndicator) ? (
              capsLockIndicator
            ) : (
              <Icon src='ic-com-up-1' color='cool-grey-06' size='sm' />
            )}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputClassVariants, inputVariantPresets }
