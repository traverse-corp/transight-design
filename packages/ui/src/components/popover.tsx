'use client'

import * as React from 'react'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const Popover = ({ ...props }: PopoverPrimitive.Root.Props) => (
  <PopoverPrimitive.Root data-slot='popover' {...props} />
)

const PopoverTrigger = ({ ...props }: PopoverPrimitive.Trigger.Props) => (
  <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />
)

const popoverContentClassVariants = cva(
  'z-50 flex origin-(--transform-origin) flex-col gap-4 border-cool-grey-04 typo-m13 text-cool-grey-11 border bg-white shadow-md outline-hidden duration-100 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      shape: {
        default: 'rounded-md',
        square: 'rounded-none'
      },
      size: {
        sm: 'w-56 p-3 gap-2',
        md: 'w-72 p-4 gap-4',
        lg: 'w-96 p-5 gap-5'
      }
    },
    defaultVariants: {
      shape: 'default',
      size: 'md'
    }
  }
)

type PopoverContentVariantProps = VariantProps<typeof popoverContentClassVariants>

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> &
  PopoverContentVariantProps

const PopoverContent = ({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  shape,
  size,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className='isolate z-50'
    >
      <PopoverPrimitive.Popup
        data-slot='popover-content'
        className={cn(popoverContentClassVariants({ shape, size }), className)}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
)

const PopoverHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div data-slot='popover-header' className={cn('flex flex-col gap-1', className)} {...props} />
)

const PopoverTitle = ({ className, ...props }: PopoverPrimitive.Title.Props) => (
  <PopoverPrimitive.Title
    data-slot='popover-title'
    className={cn('typo-sb14 text-cool-grey-11', className)}
    {...props}
  />
)

const PopoverDescription = ({ className, ...props }: PopoverPrimitive.Description.Props) => (
  <PopoverPrimitive.Description
    data-slot='popover-description'
    className={cn('typo-m12 text-cool-grey-09', className)}
    {...props}
  />
)

const PopoverClose = ({ className, ...props }: PopoverPrimitive.Close.Props) => (
  <PopoverPrimitive.Close data-slot='popover-close' className={cn(className)} {...props} />
)

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  popoverContentClassVariants
}
