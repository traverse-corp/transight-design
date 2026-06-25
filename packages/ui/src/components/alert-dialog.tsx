'use client'

import * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/button'
import { useControlledState } from '@/lib/hooks/use-controlled-state'
import { getStrictContext } from '@/lib/get-strict-context'

type AlertDialogContextType = {
  isOpen: boolean
  setIsOpen: AlertDialogProps['onOpenChange']
}

const [AlertDialogProvider, useAlertDialog] =
  getStrictContext<AlertDialogContextType>('AlertDialogContext')

type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>

const AlertDialog = (props: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen ?? false,
    onChange: props?.onOpenChange
  })

  return (
    <AlertDialogProvider value={{ isOpen: isOpen || false, setIsOpen }}>
      <AlertDialogPrimitive.Root
        data-slot='alert-dialog'
        {...props}
        open={isOpen || false}
        onOpenChange={setIsOpen}
      />
    </AlertDialogProvider>
  )
}

type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>

const AlertDialogTrigger = (props: AlertDialogTriggerProps) => (
  <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
)

type AlertDialogPortalProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Portal>,
  'keepMounted'
>

const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  const { isOpen } = useAlertDialog()

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' keepMounted {...props} />
      )}
    </AnimatePresence>
  )
}

type AlertDialogBackdropProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>,
  'render'
> &
  HTMLMotionProps<'div'>

const AlertDialogBackdrop = ({
  className,
  transition = { duration: 0.2, ease: 'easeInOut' },
  ...props
}: AlertDialogBackdropProps) => (
  <AlertDialogPrimitive.Backdrop
    data-slot='alert-dialog-backdrop'
    render={
      <motion.div
        key='alert-dialog-backdrop'
        className={cn('fixed inset-0 z-50 bg-cool-grey-black/50', className)}
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={transition}
        {...props}
      />
    }
  />
)

const alertDialogPopupVariants = cva(
  'bg-white border-cool-grey-03 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 shadow-lg',
  {
    variants: {
      size: {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl'
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

type AlertDialogFlipDirection = 'top' | 'bottom' | 'left' | 'right'
type AlertDialogPopupVariantProps = VariantProps<typeof alertDialogPopupVariants>

type AlertDialogPopupProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Popup>,
  'render'
> &
  HTMLMotionProps<'div'> &
  AlertDialogPopupVariantProps & {
    from?: AlertDialogFlipDirection
  }

const AlertDialogPopup = ({
  from = 'top',
  initialFocus,
  finalFocus,
  size,
  shape,
  transition = { type: 'spring', stiffness: 150, damping: 25 },
  className,
  ...props
}: AlertDialogPopupProps) => {
  const initialRotation = from === 'bottom' || from === 'left' ? '20deg' : '-20deg'
  const isVertical = from === 'top' || from === 'bottom'
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY'

  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogPrimitive.Popup
        initialFocus={initialFocus}
        finalFocus={finalFocus}
        render={
          <motion.div
            key='alert-dialog-popup'
            data-slot='alert-dialog-popup'
            className={cn(alertDialogPopupVariants({ size, shape, className }))}
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
    </AlertDialogPortal>
  )
}

type AlertDialogCloseProps = React.ComponentProps<typeof AlertDialogPrimitive.Close> &
  Pick<ButtonProps, 'color' | 'theme' | 'shape' | 'size'>

// alert-dialog는 모서리 X 닫기 버튼이 없음 (강제 결정 UX). children 필수 — 취소/확인 버튼만.
const AlertDialogClose = ({
  children,
  className,
  color,
  theme,
  shape,
  size,
  ...props
}: AlertDialogCloseProps) => (
  <AlertDialogPrimitive.Close
    data-slot='alert-dialog-close'
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
  </AlertDialogPrimitive.Close>
)

type AlertDialogHeaderProps = React.ComponentProps<'div'>

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
  <div
    data-slot='alert-dialog-header'
    className={cn('flex flex-col gap-1.5', className)}
    {...props}
  />
)

type AlertDialogFooterProps = React.ComponentProps<'div'>

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <div
    data-slot='alert-dialog-footer'
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    {...props}
  />
)

type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <AlertDialogPrimitive.Title
    data-slot='alert-dialog-title'
    className={cn('typo-b18 text-cool-grey-11', className)}
    {...props}
  />
)

type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>

const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => (
  <AlertDialogPrimitive.Description
    data-slot='alert-dialog-description'
    className={cn('typo-m13 text-cool-grey-09', className)}
    {...props}
  />
)

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  useAlertDialog,
  alertDialogPopupVariants,
  type AlertDialogProps,
  type AlertDialogTriggerProps,
  type AlertDialogPortalProps,
  type AlertDialogCloseProps,
  type AlertDialogBackdropProps,
  type AlertDialogPopupProps,
  type AlertDialogHeaderProps,
  type AlertDialogFooterProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogContextType,
  type AlertDialogFlipDirection
}
