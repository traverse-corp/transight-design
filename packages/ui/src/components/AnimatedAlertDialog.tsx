import * as React from 'react'

// alert-dialog 통합 후 dialog 컴포넌트를 alertdialog 역할로 재사용 (role/dismissible은 사용처에서 지정)
import {
  Dialog as AlertDialogPrimitive,
  DialogPopup as AlertDialogPopupPrimitive,
  DialogDescription as AlertDialogDescriptionPrimitive,
  DialogTrigger as AlertDialogTriggerPrimitive,
  DialogPortal as AlertDialogPortalPrimitive,
  DialogBackdrop as AlertDialogBackdropPrimitive,
  DialogClose as AlertDialogClosePrimitive,
  DialogTitle as AlertDialogTitlePrimitive,
  type DialogProps as AlertDialogPrimitiveProps,
  type DialogPopupProps as AlertDialogPopupPrimitiveProps,
  type DialogDescriptionProps as AlertDialogDescriptionPrimitiveProps,
  type DialogTitleProps as AlertDialogTitlePrimitiveProps,
  type DialogTriggerProps as AlertDialogTriggerPrimitiveProps,
  type DialogBackdropProps as AlertDialogBackdropPrimitiveProps,
  type DialogCloseProps as AlertDialogClosePrimitiveProps
} from '@/components/dialog'

// dialog는 Header/Footer를 외부에서 div로 받으므로 여기서도 div로 alias 처리
type AlertDialogHeaderPrimitiveProps = React.ComponentProps<'div'>
type AlertDialogFooterPrimitiveProps = React.ComponentProps<'div'>
const AlertDialogHeaderPrimitive = (props: AlertDialogHeaderPrimitiveProps) => <div {...props} />
const AlertDialogFooterPrimitive = (props: AlertDialogFooterPrimitiveProps) => <div {...props} />
import { buttonVariants } from '@/components/button'
import { cn } from '@/lib/utils'

type AlertDialogProps = AlertDialogPrimitiveProps

function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive {...props} />
}

type AlertDialogTriggerProps = AlertDialogTriggerPrimitiveProps

function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <AlertDialogTriggerPrimitive {...props} />
}

type AlertDialogBackdropProps = AlertDialogBackdropPrimitiveProps

function AlertDialogBackdrop({ className, ...props }: AlertDialogBackdropProps) {
  return (
    <AlertDialogBackdropPrimitive
      className={cn('fixed inset-0 z-50 bg-black/50', className)}
      {...props}
    />
  )
}

type AlertDialogPopupProps = AlertDialogPopupPrimitiveProps

function AlertDialogPopup({ className, ...props }: AlertDialogPopupProps) {
  return (
    <AlertDialogPortalPrimitive>
      <AlertDialogBackdrop />
      <AlertDialogPopupPrimitive
        className={cn(
          'bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-dialog sm:max-w-lg',
          className
        )}
        {...props}
      />
    </AlertDialogPortalPrimitive>
  )
}

type AlertDialogHeaderProps = AlertDialogHeaderPrimitiveProps

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <AlertDialogHeaderPrimitive
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

type AlertDialogFooterProps = AlertDialogFooterPrimitiveProps

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <AlertDialogFooterPrimitive
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

type AlertDialogTitleProps = AlertDialogTitlePrimitiveProps

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <AlertDialogTitlePrimitive className={cn('text-lg font-semibold', className)} {...props} />
}

type AlertDialogDescriptionProps = AlertDialogDescriptionPrimitiveProps

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogDescriptionPrimitive
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

type AlertDialogActionProps = AlertDialogClosePrimitiveProps

function AlertDialogAction({ className, ...props }: AlertDialogActionProps) {
  return <AlertDialogClosePrimitive className={cn(buttonVariants(), className)} {...props} />
}

type AlertDialogCloseProps = AlertDialogClosePrimitiveProps

function AlertDialogClose({ className, ...props }: AlertDialogCloseProps) {
  return <AlertDialogClosePrimitive className={className} {...props} />
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogClose,
  type AlertDialogProps,
  type AlertDialogTriggerProps,
  type AlertDialogPopupProps,
  type AlertDialogHeaderProps,
  type AlertDialogFooterProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogActionProps,
  type AlertDialogCloseProps
}
