import React from 'react'
import {
  AlertDialog as AlertDialogWrapper,
  AlertDialogAction,
  AlertDialogClose,
  AlertDialogPopup,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './AnimatedAlertDialog'
import { useTranslation } from 'react-i18next'

interface AlertDialogProps {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  wrapperClassName?: string
  confirmButtonClassName?: string
  cancelButtonClassName?: string
  onConfirm?: () => void
  onCancel?: () => void
  children?: React.ReactNode
}

const AlertDialog = ({
  title,
  description,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  children
}: AlertDialogProps) => {
  const { t } = useTranslation()
  return (
    <AlertDialogWrapper>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>{t(title)}</AlertDialogTitle>
          <AlertDialogDescription>{t(description || '')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {children}
          {confirmText && onConfirm && (
            <AlertDialogAction className='bg-primary-blue-1' onClick={onConfirm}>
              {t(confirmText)}
            </AlertDialogAction>
          )}
          {cancelText && onCancel && (
            <AlertDialogClose onClick={onCancel}>{t(cancelText)}</AlertDialogClose>
          )}
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialogWrapper>
  )
}

export default AlertDialog
