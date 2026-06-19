'use client'

import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowBigUpDash, Search } from 'lucide-react'
import { Button } from '@/components/button'
import { useCapsLock } from '@/lib/hooks/use-caps-lock'
import { cn } from '@/lib/utils'

const inputVariantStyles = {
  default: 'border-cool-grey-03 focus-within:border-primary-blue-1',
  search: 'border-cool-grey-03 focus-within:border-primary-blue-1 pr-1.5',
  login: 'border-cool-grey-03 focus-within:border-primary-blue-1 pr-2',
  error:
    'border-destructive focus-within:border-destructive shadow-[0_0_0_1px_rgba(239,68,68,0.1)]',
  minimal: 'border-none bg-transparent shadow-none px-0',
  capsule: 'rounded-full border-primary-blue-1 pr-1 pl-3',
  form: 'bg-white border-cool-grey-03 text-cool-grey-09 focus-within:border-primary-blue-1'
} as const

const inputSizeStyles = {
  xs: 'h-6 px-1.5 text-sm',
  sm: 'h-8 px-2 py-0.5 text-sm',
  md: 'h-10 px-3 py-1',
  lg: 'h-12 px-4 py-2 text-lg',
  xl: 'h-14 px-5 py-3 text-lg',
  default: 'h-10 px-3 py-1'
} as const

const inputVariants = cva(
  'flex w-full items-center rounded-lg border bg-white px-3 shadow-sm transition-all duration-200 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: inputVariantStyles.default,
        search: inputVariantStyles.search,
        login: inputVariantStyles.login
      },
      size: {
        xs: inputSizeStyles.xs,
        sm: inputSizeStyles.sm,
        md: inputSizeStyles.md,
        lg: inputSizeStyles.lg,
        xl: inputSizeStyles.xl
      },
      decoDir: {
        start: '',
        end: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      decoDir: 'start'
    }
  }
)

export interface InputProps
  extends Omit<BaseInput.Props, 'size' | 'onSearch'>,
    VariantProps<typeof inputVariants> {
  decorator?: React.ReactNode
  decoDir?: 'start' | 'end'
  startDecorator?: React.ReactNode
  inputSize?: keyof typeof inputSizeStyles
  searchLabel?: React.ReactNode
  onSearch?: (value: string) => void
  capsLockIndicator?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      inputSize,
      decorator,
      decoDir = 'start',
      startDecorator,
      searchLabel,
      onSearch,
      capsLockIndicator,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const isCapsLockOn = useCapsLock()
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const resolvedSize = size ?? (inputSize === 'default' ? 'md' : inputSize) ?? 'md'
    const resolvedDecorator = decorator ?? startDecorator
    const hasStartDecorator = resolvedDecorator && decoDir === 'start'
    const hasEndDecorator = resolvedDecorator && decoDir === 'end'
    const showSearchButton = variant === 'search'
    const showCapsLockIndicator = variant === 'login' && props.type === 'password' && isCapsLockOn

    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node

      if (typeof ref === 'function') {
        ref(node)
        return
      }

      if (ref) {
        ref.current = node
      }
    }

    const handleSearch = () => {
      onSearch?.(inputRef.current?.value ?? '')
    }

    const handleKeyDown: NonNullable<InputProps['onKeyDown']> = (event) => {
      if (event.key === 'Enter' && showSearchButton) {
        onSearch?.(event.currentTarget.value)
      }

      onKeyDown?.(event)
    }

    return (
      <div className={cn(inputVariants({ variant, size: resolvedSize, decoDir, className }))}>
        {hasStartDecorator && (
          <div className="text-cool-grey-07 mr-2 flex shrink-0 items-center">
            {resolvedDecorator}
          </div>
        )}
        <BaseInput
          className="placeholder:text-cool-grey-07 flex w-full bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed"
          ref={setRefs}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {hasEndDecorator && (
          <div className="text-cool-grey-07 ml-2 flex shrink-0 items-center">{resolvedDecorator}</div>
        )}
        {showCapsLockIndicator && (
          <div className="text-cool-grey-07 ml-2 flex shrink-0 items-center" title="Caps Lock is Activated">
            {capsLockIndicator ?? <ArrowBigUpDash className="h-5 w-5" />}
          </div>
        )}
        {showSearchButton && (
          <Button
            type="button"
            size="xs"
            appearance="soft"
            color="gray"
            className="ml-2 shrink-0"
            onClick={handleSearch}
          >
            {searchLabel ?? <Search className="h-4 w-4" />}
          </Button>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariantStyles, inputSizeStyles }
