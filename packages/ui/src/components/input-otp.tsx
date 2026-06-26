import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'

import { cn } from '@/lib/utils'
import { MinusIcon } from 'lucide-react'

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot='input-otp'
      containerClassName={cn(
        'cn-input-otp flex items-center has-disabled:opacity-50',
        containerClassName
      )}
      spellCheck={false}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='input-otp-group'
      className={cn(
        'has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive flex items-center rounded-md has-aria-invalid:ring-3',
        className
      )}
      {...props}
    />
  )
}

import { cva, type VariantProps } from 'class-variance-authority'

const inputOTPSlotVariants = cva(
  'relative flex items-center justify-center transition-all outline-none',
  {
    variants: {
      variant: {
        default:
          'border-input data-[active=true]:border-ring data-[active=true]:ring-ring/50 size-9 border-y border-r text-sm shadow-xs first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:ring-3 data-[active=true]:z-10',
        auth: 'border-border-default focus:border-primary-blue-1 focus:bg-primary-blue-opacity-10 text-fg-strong disabled:text-fg-disabled h-12 w-12 rounded-lg border-2 bg-bg-card text-lg font-semibold disabled:bg-bg-card data-[active=true]:border-ring data-[active=true]:ring-ring/50 '
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function InputOTPSlot({
  index,
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & {
  index: number
} & VariantProps<typeof inputOTPSlotVariants>) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(inputOTPSlotVariants({ variant, className }))}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='input-otp-separator'
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role='separator'
      {...props}
    >
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
