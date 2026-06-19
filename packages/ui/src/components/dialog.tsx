'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'

import { X } from 'lucide-react'

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

function Dialog(props: DialogProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen ?? false,
    onChange: props?.onOpenChange
  })

  return (
    <DialogProvider value={{ isOpen: isOpen || false, setIsOpen }}>
      <DialogPrimitive.Root
        data-slot="dialog"
        {...props}
        open={isOpen || false}
        onOpenChange={setIsOpen}
      />
    </DialogProvider>
  )
}

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>

function DialogTrigger(props: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

type DialogPortalProps = Omit<React.ComponentProps<typeof DialogPrimitive.Portal>, 'keepMounted'>

function DialogPortal(props: DialogPortalProps) {
  const { isOpen } = useDialog()

  return (
    <AnimatePresence>
      {isOpen && <DialogPrimitive.Portal data-slot="dialog-portal" keepMounted {...props} />}
    </AnimatePresence>
  )
}

type DialogBackdropProps = Omit<React.ComponentProps<typeof DialogPrimitive.Backdrop>, 'render'> &
  HTMLMotionProps<'div'>

function DialogBackdrop({
  className,
  transition = { duration: 0.2, ease: 'easeInOut' },
  ...props
}: DialogBackdropProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      render={
        <motion.div
          key="dialog-backdrop"
          className={cn('fixed inset-0 z-50 bg-black/50', className)}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={transition}
          {...props}
        />
      }
    />
  )
}

type DialogFlipDirection = 'top' | 'bottom' | 'left' | 'right'

type DialogPopupProps = Omit<React.ComponentProps<typeof DialogPrimitive.Popup>, 'render'> &
  HTMLMotionProps<'div'> & {
    from?: DialogFlipDirection
  }

function DialogPopup({
  from = 'top',
  initialFocus = false as any,
  finalFocus,
  transition = { type: 'spring', stiffness: 150, damping: 25 },
  className,
  ...props
}: DialogPopupProps) {
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
            key="dialog-popup"
            data-slot="dialog-popup"
            className={cn(
              'bg-background border-cool-grey-03 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg',
              className
            )}
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
  Pick<ButtonProps, 'color' | 'appearance' | 'shape' | 'size'>

/**
 * children이 없으면 X 아이콘 버튼으로 렌더링
 * children이 있으면 Button과 동일한 variant/size 스타일 적용
 */
function DialogClose({
  children,
  className,
  color,
  appearance,
  shape,
  size,
  ...props
}: DialogCloseProps) {
  // children이 없으면 기본 X 아이콘 버튼
  if (!children) {
    return (
      <DialogPrimitive.Close
        data-slot="dialog-close"
        className={cn(
          'flex-center border-cool-grey-04 cursor-pointer rounded-sm border p-1',
          className
        )}
        {...props}
      >
        <X className="text-cool-grey-07 size-4" />
      </DialogPrimitive.Close>
    )
  }

  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      render={
        <Button
          color={color}
          appearance={appearance}
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

function DialogHeader(props: DialogHeaderProps) {
  return <div data-slot="dialog-header" {...props} />
}

type DialogFooterProps = React.ComponentProps<'div'>

function DialogFooter(props: DialogFooterProps) {
  return <div data-slot="dialog-footer" {...props} />
}

type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>

function DialogTitle(props: DialogTitleProps) {
  return <DialogPrimitive.Title data-slot="dialog-title" className="text-modal-title" {...props} />
}

type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>

function DialogDescription(props: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className="text-caption"
      {...props}
    />
  )
}

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
