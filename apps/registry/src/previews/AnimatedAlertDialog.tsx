'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription
} from '@transight-design/ui/components/AnimatedAlertDialog'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button theme="outline" onClick={() => setOpen(true)}>
        애니메이션 알림 열기
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogPopup>
          <AlertDialogTitle>완료</AlertDialogTitle>
          <AlertDialogDescription>작업이 성공적으로 처리되었습니다.</AlertDialogDescription>
          <div className="mt-5 flex justify-end">
            <Button size="sm" onClick={() => setOpen(false)}>
              확인
            </Button>
          </div>
        </AlertDialogPopup>
      </AlertDialog>
    </>
  )
}
