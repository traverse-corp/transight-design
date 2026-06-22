'use client'

import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowBigUpDash, Search } from 'lucide-react'
import { useCapsLock } from '@/lib/hooks/use-caps-lock'
import { cn } from '@/lib/utils'

// 에러 상태는 input의 aria-invalid="true"로 자동 적용된다 (CSS attribute selector).
// 호출자는 <Input aria-invalid={hasError} /> 또는 react-hook-form 등 폼 라이브러리가
// 자동으로 박아주는 aria-invalid에 의존. 별도 prop은 두지 않는다.
const inputClassVariants = cva(
  'flex w-full items-center border bg-white shadow-sm transition-colors border-cool-grey-03 focus-within:border-primary-blue-1 has-[input[aria-invalid="true"]]:border-ui-red has-[input[aria-invalid="true"]]:focus-within:border-ui-red has-[input[aria-invalid="true"]]:shadow-[0_0_0_1px_rgba(239,68,68,0.1)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
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
      }
    },
    defaultVariants: {
      variant: 'default',
      shape: 'default',
      size: 'md',
      decoDir: 'start'
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
    decorator: <Search className='text-cool-grey-07 h-4 w-4' />
  },
  password: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    capsLockIndicator: true
  }
}

export interface InputProps extends Omit<BaseInput.Props, 'size'>, InputVariantProps {
  /** 시작/끝 데코레이터 — decoDir로 위치 지정 */
  decorator?: React.ReactNode
  /**
   * decorator 클릭 핸들러. 지정 시 decorator wrapper가 button으로 렌더되어 클릭 가능.
   * search/submit/clear 등 input 옆 액션 트리거에 사용 (예: 검색 아이콘 클릭 → 검색 실행).
   */
  onDecoratorClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
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
      onDecoratorClick,
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

    const hasStartDecorator = resolvedDecorator && resolvedDecoDir === 'start'
    const hasEndDecorator = resolvedDecorator && resolvedDecoDir === 'end'

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
            {resolvedDecorator}
          </button>
        )
      }
      return <div className={base}>{resolvedDecorator}</div>
    }

    return (
      <div
        className={cn(
          inputClassVariants({
            variant,
            shape: resolvedShape,
            size: resolvedSize,
            decoDir: resolvedDecoDir,
            className
          })
        )}
      >
        {hasStartDecorator && renderDecorator('start')}
        <BaseInput
          className='placeholder:text-cool-grey-07 flex w-full bg-transparent focus-visible:outline-none disabled:cursor-not-allowed'
          ref={ref}
          type={resolvedType}
          placeholder={resolvedPlaceholder}
          {...props}
        />
        {hasEndDecorator && renderDecorator('end')}
        {showCapsLockIndicator && (
          <div
            className='text-cool-grey-07 ml-2 flex shrink-0 items-center'
            title='Caps Lock is Activated'
          >
            {React.isValidElement(capsLockIndicator) ? (
              capsLockIndicator
            ) : (
              <ArrowBigUpDash className='text-cool-grey-06 h-4 w-4' />
            )}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputClassVariants, inputVariantPresets }
