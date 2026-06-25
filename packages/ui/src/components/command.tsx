'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { cva, type VariantProps } from 'class-variance-authority'
import { SearchIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/dialog'

// size로 padding/typo를 일괄 조정. 자식 group/input/item은 부모 data-size를 group-data로 추적.
const commandRootClassVariants = cva(
  'group/command flex size-full flex-col overflow-hidden bg-white text-cool-grey-11',
  {
    variants: {
      shape: {
        default: 'rounded-xl',
        square: 'rounded-none'
      },
      size: {
        sm: 'p-0.5',
        md: 'p-1',
        lg: 'p-1.5'
      }
    },
    defaultVariants: {
      shape: 'default',
      size: 'md'
    }
  }
)

type CommandRootVariantProps = VariantProps<typeof commandRootClassVariants>

type CommandProps = React.ComponentProps<typeof CommandPrimitive> & CommandRootVariantProps

const Command = ({ className, shape, size, ...props }: CommandProps) => (
  <CommandPrimitive
    data-slot='command'
    data-size={size ?? 'md'}
    className={cn(commandRootClassVariants({ shape, size }), className)}
    {...props}
  />
)

interface CommandDialogProps extends Omit<React.ComponentProps<typeof Dialog>, 'children'> {
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}

const CommandDialog = ({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  ...props
}: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogHeader className='sr-only'>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <DialogPopup className={cn('top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0', className)}>
      {children}
    </DialogPopup>
  </Dialog>
)

const CommandInput = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) => (
  <div
    data-slot='command-input-wrapper'
    className='border-cool-grey-04 flex items-center gap-2 border-b px-3 py-2'
  >
    <SearchIcon className='text-cool-grey-07 size-4 shrink-0' />
    <CommandPrimitive.Input
      data-slot='command-input'
      className={cn(
        'text-cool-grey-11 placeholder:text-cool-grey-07 typo-m13 w-full bg-transparent outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
)

const CommandList = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    data-slot='command-list'
    className={cn(
      'no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none',
      className
    )}
    {...props}
  />
)

const CommandEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty
    data-slot='command-empty'
    className={cn('text-cool-grey-07 typo-m13 py-6 text-center', className)}
    {...props}
  />
)

const CommandGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    data-slot='command-group'
    className={cn(
      'text-cool-grey-11 overflow-hidden p-1',
      '**:[[cmdk-group-heading]]:text-cool-grey-07 **:[[cmdk-group-heading]]:typo-sb11 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wide',
      className
    )}
    {...props}
  />
)

const CommandSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    data-slot='command-separator'
    className={cn('bg-cool-grey-04 -mx-1 h-px w-auto', className)}
    {...props}
  />
)

const CommandItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    data-slot='command-item'
    className={cn(
      'group/command-item text-cool-grey-11 relative flex cursor-default items-center gap-2 rounded-sm outline-hidden select-none transition-colors',
      'group-data-[size=sm]/command:typo-m12 group-data-[size=sm]/command:px-1.5 group-data-[size=sm]/command:py-1',
      'group-data-[size=md]/command:typo-m13 group-data-[size=md]/command:px-2 group-data-[size=md]/command:py-1.5',
      'group-data-[size=lg]/command:typo-m14 group-data-[size=lg]/command:px-2.5 group-data-[size=lg]/command:py-2',
      'data-selected:bg-cool-grey-02',
      'in-data-[slot=dialog-content]:rounded-lg!',
      'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    {children}
    <CheckIcon className='text-primary-blue-1 ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100' />
  </CommandPrimitive.Item>
)

const CommandShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    data-slot='command-shortcut'
    className={cn('text-cool-grey-07 typo-m11 ml-auto tracking-widest', className)}
    {...props}
  />
)

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  commandRootClassVariants
}
