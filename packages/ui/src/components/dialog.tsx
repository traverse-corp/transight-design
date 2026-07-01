'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/button'
import { useControlledState } from '@/lib/hooks/use-controlled-state'
import { getStrictContext } from '@/lib/get-strict-context'

type DialogContextType = {
  isOpen: boolean
  setIsOpen: DialogProps['onOpenChange']
}

const [DialogProvider, useDialog] = getStrictContext<DialogContextType>('DialogContext')

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>

const Dialog = (props: DialogProps) => {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen ?? false,
    onChange: props?.onOpenChange
  })

  return (
    <DialogProvider value={{ isOpen: isOpen || false, setIsOpen }}>
      <DialogPrimitive.Root
        data-slot='dialog'
        {...props}
        open={isOpen || false}
        onOpenChange={setIsOpen}
      />
    </DialogProvider>
  )
}

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>

const DialogTrigger = (props: DialogTriggerProps) => (
  <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
)

type DialogPortalProps = Omit<React.ComponentProps<typeof DialogPrimitive.Portal>, 'keepMounted'>

const DialogPortal = (props: DialogPortalProps) => {
  const { isOpen } = useDialog()

  return (
    <AnimatePresence>
      {isOpen && <DialogPrimitive.Portal data-slot='dialog-portal' keepMounted {...props} />}
    </AnimatePresence>
  )
}

type DialogBackdropProps = Omit<React.ComponentProps<typeof DialogPrimitive.Backdrop>, 'render'> &
  HTMLMotionProps<'div'>

const DialogBackdrop = ({
  className,
  transition = { duration: 0.2, ease: 'easeInOut' },
  ...props
}: DialogBackdropProps) => (
  <DialogPrimitive.Backdrop
    data-slot='dialog-backdrop'
    render={
      <motion.div
        key='dialog-backdrop'
        className={cn('fixed inset-0 z-50 bg-overlay-backdrop', className)}
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={transition}
        {...props}
      />
    }
  />
)

const dialogPopupVariants = cva(
  'bg-bg-card border-border-subtle fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 shadow-dialog',
  {
    variants: {
      size: {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        wide: 'sm:max-w-[72rem]',
        full: 'sm:max-w-[calc(100%-4rem)]'
      },
      shape: {
        default: 'rounded-lg',
        square: 'rounded-none'
      }
    },
    defaultVariants: {
      size: 'md',
      shape: 'default'
    }
  }
)

type DialogFlipDirection = 'top' | 'bottom' | 'left' | 'right'

type DialogPopupVariantProps = VariantProps<typeof dialogPopupVariants>

type DialogPopupProps = Omit<React.ComponentProps<typeof DialogPrimitive.Popup>, 'render'> &
  HTMLMotionProps<'div'> &
  DialogPopupVariantProps & {
    from?: DialogFlipDirection
  }

const DialogPopup = ({
  from = 'top',
  initialFocus = false as unknown as React.ComponentProps<
    typeof DialogPrimitive.Popup
  >['initialFocus'],
  finalFocus,
  size,
  shape,
  transition = { type: 'spring', stiffness: 150, damping: 25 },
  className,
  ...props
}: DialogPopupProps) => {
  const initialRotation = from === 'bottom' || from === 'left' ? '20deg' : '-20deg'
  const isVertical = from === 'top' || from === 'bottom'
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY'

  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        initialFocus={initialFocus}
        finalFocus={finalFocus}
        render={
          <motion.div
            key='dialog-popup'
            data-slot='dialog-popup'
            className={cn(dialogPopupVariants({ size, shape, className }))}
            initial={{
              opacity: 0,
              filter: 'blur(4px)',
              transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
            }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`
            }}
            exit={{
              opacity: 0,
              filter: 'blur(4px)',
              transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
            }}
            transition={transition}
            {...props}
          />
        }
      />
    </DialogPortal>
  )
}

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close> &
  Pick<ButtonProps, 'color' | 'theme' | 'shape' | 'size'>

/**
 * children 없으면 X 아이콘 버튼으로 자동 렌더 (모서리 닫기용).
 * children 있으면 Button과 동일한 스타일 prop 받음 (취소/확인 등 텍스트 버튼).
 */
const DialogClose = ({
  children,
  className,
  color,
  theme,
  shape,
  size,
  ...props
}: DialogCloseProps) => {
  if (!children) {
    return (
      <DialogPrimitive.Close
        data-slot='dialog-close'
        className={cn(
          'flex-center border-border-default hover:bg-bg-muted cursor-pointer rounded-sm border p-1 transition-colors',
          className
        )}
        {...props}
      >
        <X className='text-fg-muted size-4' />
      </DialogPrimitive.Close>
    )
  }

  return (
    <DialogPrimitive.Close
      data-slot='dialog-close'
      render={
        <Button
          color={color}
          theme={theme}
          shape={shape}
          size={size}
          className={className}
        />
      }
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  )
}

type DialogHeaderProps = React.ComponentProps<'div'>

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div data-slot='dialog-header' className={cn('flex flex-col gap-1.5', className)} {...props} />
)

type DialogFooterProps = React.ComponentProps<'div'>

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    data-slot='dialog-footer'
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    {...props}
  />
)

type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    data-slot='dialog-title'
    className={cn('typo-b18 text-fg-strong', className)}
    {...props}
  />
)

type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    data-slot='dialog-description'
    className={cn('typo-r12 text-fg-muted', className)}
    {...props}
  />
)

export {
  Dialog,
  DialogPortal,
  DialogBackdrop,
  DialogClose,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  useDialog,
  dialogPopupVariants,
  type DialogProps,
  type DialogTriggerProps,
  type DialogPortalProps,
  type DialogCloseProps,
  type DialogBackdropProps,
  type DialogPopupProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogContextType,
  type DialogFlipDirection
}
