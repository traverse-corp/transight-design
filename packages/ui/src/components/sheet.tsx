import * as React from 'react'
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/button'

const Sheet = ({ ...props }: SheetPrimitive.Root.Props) => (
  <SheetPrimitive.Root data-slot='sheet' {...props} />
)

const SheetTrigger = ({ ...props }: SheetPrimitive.Trigger.Props) => (
  <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
)

const SheetClose = ({ ...props }: SheetPrimitive.Close.Props) => (
  <SheetPrimitive.Close data-slot='sheet-close' {...props} />
)

const SheetPortal = ({ ...props }: SheetPrimitive.Portal.Props) => (
  <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
)

const SheetOverlay = ({ className, ...props }: SheetPrimitive.Backdrop.Props) => (
  <SheetPrimitive.Backdrop
    data-slot='sheet-overlay'
    className={cn(
      'fixed inset-0 z-50 bg-cool-grey-black/50 duration-100 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-ending-style:opacity-0 data-starting-style:opacity-0',
      className
    )}
    {...props}
  />
)

// side는 sheet의 핵심 시각 축이므로 STYLE 4축에서 shape 자리를 차지함.
const sheetContentClassVariants = cva(
  'bg-white border-cool-grey-04 fixed z-50 flex flex-col gap-4 typo-m13 text-cool-grey-11 shadow-lg transition duration-200 ease-in-out bg-clip-padding data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0',
  {
    variants: {
      side: {
        right:
          'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l data-closed:slide-out-to-right-10 data-open:slide-in-from-right-10',
        left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r data-closed:slide-out-to-left-10 data-open:slide-in-from-left-10',
        top: 'inset-x-0 top-0 h-auto border-b data-closed:slide-out-to-top-10 data-open:slide-in-from-top-10',
        bottom:
          'inset-x-0 bottom-0 h-auto border-t data-closed:slide-out-to-bottom-10 data-open:slide-in-from-bottom-10'
      },
      size: {
        sm: '',
        md: '',
        lg: ''
      }
    },
    compoundVariants: [
      // left/right는 max-width로 폭 조정
      { side: 'left', size: 'sm', className: 'sm:max-w-xs' },
      { side: 'left', size: 'md', className: 'sm:max-w-sm' },
      { side: 'left', size: 'lg', className: 'sm:max-w-md' },
      { side: 'right', size: 'sm', className: 'sm:max-w-xs' },
      { side: 'right', size: 'md', className: 'sm:max-w-sm' },
      { side: 'right', size: 'lg', className: 'sm:max-w-md' },
      // top/bottom은 max-height로 높이 조정
      { side: 'top', size: 'sm', className: 'max-h-40' },
      { side: 'top', size: 'md', className: 'max-h-64' },
      { side: 'top', size: 'lg', className: 'max-h-96' },
      { side: 'bottom', size: 'sm', className: 'max-h-40' },
      { side: 'bottom', size: 'md', className: 'max-h-64' },
      { side: 'bottom', size: 'lg', className: 'max-h-96' }
    ],
    defaultVariants: {
      side: 'right',
      size: 'md'
    }
  }
)

type SheetContentVariantProps = VariantProps<typeof sheetContentClassVariants>

type SheetContentProps = SheetPrimitive.Popup.Props &
  SheetContentVariantProps & {
    showCloseButton?: boolean
  }

const SheetContent = ({
  className,
  children,
  side,
  size,
  showCloseButton = true,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Popup
      data-slot='sheet-content'
      data-side={side ?? 'right'}
      className={cn(sheetContentClassVariants({ side, size }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <SheetPrimitive.Close
          data-slot='sheet-close'
          render={<Button theme='soft' className='absolute top-4 right-4 size-8 p-0' />}
        >
          <XIcon />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Popup>
  </SheetPortal>
)

const SheetHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot='sheet-header'
    className={cn('flex flex-col gap-1.5 p-4', className)}
    {...props}
  />
)

const SheetFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot='sheet-footer'
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
)

const SheetTitle = ({ className, ...props }: SheetPrimitive.Title.Props) => (
  <SheetPrimitive.Title
    data-slot='sheet-title'
    className={cn('typo-b18 text-cool-grey-11', className)}
    {...props}
  />
)

const SheetDescription = ({ className, ...props }: SheetPrimitive.Description.Props) => (
  <SheetPrimitive.Description
    data-slot='sheet-description'
    className={cn('typo-m13 text-cool-grey-09', className)}
    {...props}
  />
)

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetContentClassVariants
}
