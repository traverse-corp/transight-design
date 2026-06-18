import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full items-center rounded-lg border bg-white px-3 shadow-sm transition-all duration-200 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-cool-grey-03 focus-within:border-primary-blue-1',
        error:
          'border-destructive focus-within:border-destructive shadow-[0_0_0_1px_rgba(239,68,68,0.1)]',
        minimal: 'border-none bg-transparent shadow-none px-0',
        capsule: 'rounded-full border-primary-blue-1 pr-1 pl-3',
        form: 'bg-white border-cool-grey-03 text-cool-grey-09 focus-within:border-primary-blue-1'
      },
      inputSize: {
        default: 'h-10 px-3 py-1',
        sm: 'h-8 px-2 py-0.5 text-sm',
        xs: 'h-6 px-1.5 text-sm',
        lg: 'h-12 px-4 py-2 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default'
    }
  }
)

export interface InputProps
  extends Omit<BaseInput.Props, 'size'>, VariantProps<typeof inputVariants> {
  startDecorator?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, startDecorator, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ variant, inputSize, className }))}>
        {startDecorator && <div className='mr-2 flex shrink-0 items-center'>{startDecorator}</div>}
        <BaseInput
          className='placeholder:text-cool-grey-07 flex w-full bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed'
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
