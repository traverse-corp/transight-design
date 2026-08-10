'use client'

import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/button'
import { inputColorStyles, type InputProps } from '@/components/input'

type InputGroupColor = NonNullable<InputProps['color']>
type InputGroupTheme = NonNullable<InputProps['theme']>

const inputGroupCompoundVariants = Object.entries(inputColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([theme, className]) => ({
    color: color as InputGroupColor,
    theme: theme as InputGroupTheme,
    className
  }))
)

const inputGroupClassVariants = cva(
  'group/input-group relative flex w-full min-w-0 items-center border shadow-card transition-colors outline-none has-[[data-slot=input-group-control][aria-invalid=true]]:border-ui-red has-[[data-slot=input-group-control][aria-invalid=true]]:ring-1 has-[[data-slot=input-group-control][aria-invalid=true]]:ring-ui-red/10 has-[[data-slot=input-group-control][aria-invalid=true]]:focus-within:border-ui-red has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[textarea:disabled]:cursor-not-allowed has-[textarea:disabled]:opacity-50 has-[[data-slot=input-group-control]:read-only]:cursor-default has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:items-stretch has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:items-stretch has-[>[data-align=inline-start]]:[&>[data-slot=input-group-control]]:pl-1 has-[>[data-align=inline-end]]:[&>[data-slot=input-group-control]]:pr-1',
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
        pill: 'rounded-full',
        square: 'rounded-none'
      },
      size: {
        xs: 'min-h-7 typo-m10',
        sm: 'min-h-9 typo-m12',
        md: 'min-h-10 typo-m13',
        lg: 'min-h-12 typo-m15',
        xl: 'min-h-14 typo-m16'
      }
    },
    compoundVariants: inputGroupCompoundVariants,
    defaultVariants: {
      color: 'gray06',
      theme: 'outline',
      shape: 'default',
      size: 'md'
    }
  }
)

type InputGroupVariantProps = VariantProps<typeof inputGroupClassVariants>

export type InputGroupProps = Omit<React.ComponentProps<'div'>, 'color'> & InputGroupVariantProps

function InputGroup({ className, color, theme, shape, size, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      data-color={color ?? 'gray06'}
      data-theme={theme ?? 'outline'}
      data-shape={shape ?? 'default'}
      data-size={size ?? 'md'}
      role="group"
      className={cn(inputGroupClassVariants({ color, theme, shape, size }), className)}
      {...props}
    />
  )
}

export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

const inputGroupAddonStyles: Record<InputGroupAddonAlign, string> = {
  'inline-start':
    'order-first pl-3 group-data-[size=xs]/input-group:pl-2 group-data-[size=xl]/input-group:pl-5',
  'inline-end':
    'order-last pr-3 group-data-[size=xs]/input-group:pr-2 group-data-[size=xl]/input-group:pr-5',
  'block-start': 'order-first w-full justify-start px-3 pt-2',
  'block-end': 'order-last w-full justify-start px-3 pb-2'
}

export type InputGroupAddonProps = React.ComponentProps<'div'> & {
  align?: InputGroupAddonAlign
}

function InputGroupAddon({
  className,
  align = 'inline-start',
  onClick,
  ...props
}: InputGroupAddonProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || (event.target as HTMLElement).closest('button')) return

    event.currentTarget.parentElement
      ?.querySelector<HTMLInputElement | HTMLTextAreaElement>('[data-slot=input-group-control]')
      ?.focus()
  }

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        'text-fg-muted flex h-auto cursor-text items-center justify-center gap-2 py-1.5 select-none [&>kbd]:rounded-sm [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*=size-])]:size-4',
        inputGroupAddonStyles[align],
        className
      )}
      onClick={handleClick}
      {...props}
    />
  )
}

export type InputGroupButtonProps = ButtonProps

function InputGroupButton({
  className,
  type = 'button',
  theme = 'soft',
  size = 'xs',
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      theme={theme}
      size={size}
      className={cn('shrink-0 shadow-none', className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        'text-fg-muted flex items-center gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        className
      )}
      {...props}
    />
  )
}

const inputGroupControlSizeStyles =
  'group-data-[size=xs]/input-group:px-2 group-data-[size=sm]/input-group:px-3 group-data-[size=md]/input-group:px-3 group-data-[size=lg]/input-group:px-4 group-data-[size=xl]/input-group:px-5'

export type InputGroupInputProps = Omit<BaseInput.Props, 'color' | 'size'>

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, ...props }, ref) => (
    <BaseInput
      {...props}
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'min-w-0 flex-1 self-stretch bg-transparent text-current outline-none placeholder:text-current placeholder:opacity-60 disabled:cursor-not-allowed',
        inputGroupControlSizeStyles,
        className
      )}
    />
  )
)
InputGroupInput.displayName = 'InputGroupInput'

export type InputGroupTextareaProps = Omit<React.ComponentProps<'textarea'>, 'color' | 'size'>

const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, InputGroupTextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'min-h-20 w-full flex-1 resize-y bg-transparent py-2 text-current outline-none placeholder:text-current placeholder:opacity-60 disabled:cursor-not-allowed',
        inputGroupControlSizeStyles,
        className
      )}
    />
  )
)
InputGroupTextarea.displayName = 'InputGroupTextarea'

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupClassVariants,
  inputGroupAddonStyles
}
