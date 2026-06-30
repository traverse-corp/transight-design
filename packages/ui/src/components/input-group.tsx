'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button } from '@/components/button'
import { Input, type InputProps } from '@/components/input'

// input-group 내부에서만 쓰는 옛 input 스타일 — input.tsx에서 분리되어 자체 보관
const legacyInputVariantStyles = {
  default: 'border-border-subtle focus-within:border-primary-blue-1',
  error:
    'border-ui-red focus-within:border-ui-red shadow-[0_0_0_1px_rgba(239,68,68,0.1)]',
  minimal: 'border-none bg-transparent shadow-none px-0',
  capsule: 'rounded-full border-primary-blue-1 pr-1 pl-3',
  form: 'bg-bg-card border-border-subtle text-fg-default focus-within:border-primary-blue-1'
} as const

const legacyInputSizeStyles = {
  default: 'h-10 px-3 py-1',
  xs: 'h-6 px-1.5 text-sm',
  sm: 'h-8 px-2 py-0.5 text-sm',
  md: 'h-10 px-3 py-1',
  lg: 'h-12 px-4 py-2 text-lg',
  xl: 'h-14 px-5 py-3 text-lg'
} as const
import { Textarea } from '@/components/textarea'

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'border-border-default dark:bg-input/30 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 group/input-group in-data-[slot=combobox-content]:focus-within:border-primary-blue-1 has-[[data-slot=input-group-control]:focus-visible]:border-primary-blue-1 has-[[data-slot=input-group-control]:focus-visible]:ring-primary-blue-1 relative flex h-12 w-full min-w-0 items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:ring-1 has-[[data-slot][aria-invalid=true]]:ring-1 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[textarea:disabled]:cursor-not-allowed has-[textarea:disabled]:opacity-50 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        'inline-start': 'pl-2 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem] order-first',
        'inline-end': 'pr-2 has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem] order-last',
        'block-start':
          'px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start',
        'block-end':
          'px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start'
      }
    },
    defaultVariants: {
      align: 'inline-start'
    }
  }
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva('gap-2 text-sm shadow-none flex items-center', {
  variants: {
    variant: {
      default: legacyInputVariantStyles.default,
      error: legacyInputVariantStyles.error,
      minimal: `${legacyInputVariantStyles.minimal} hover:bg-transparent`,
      capsule: legacyInputVariantStyles.capsule,
      form: legacyInputVariantStyles.form
    },
    inputSize: {
      default: legacyInputSizeStyles.default,
      sm: legacyInputSizeStyles.sm,
      xs: legacyInputSizeStyles.xs,
      lg: legacyInputSizeStyles.lg
    }
  },
  defaultVariants: {
    inputSize: 'xs'
  }
})

function InputGroupButton({
  className,
  type = 'button',
  variant = 'minimal',
  inputSize = 'sm',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type' | 'variant'> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: 'button' | 'submit' | 'reset'
  }) {
  return (
    <Button
      type={type}
      data-size={inputSize}
      className={cn(inputGroupButtonVariants({ variant, inputSize }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

const InputGroupInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-slot="input-group-control"
        className={cn(
          'typo-m13 text-fg-default flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 has-[input:disabled]:opacity-100 aria-invalid:ring-0 dark:bg-transparent',
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupInput.displayName = 'InputGroupInput'

const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        data-slot="input-group-control"
        className={cn(
          'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:opacity-100 aria-invalid:ring-0 dark:bg-transparent',
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupTextarea.displayName = 'InputGroupTextarea'

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea
}
