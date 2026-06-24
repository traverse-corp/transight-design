'use client'

import { useState } from 'react'
import {
  AlertDialog as AlertDialogRoot,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogClose
} from '@transight-design/ui/components/AnimatedAlertDialog'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => {
  // AlertDialog 래퍼는 trigger 슬롯이 별도로 없어 controlled 상태로 띄운다.
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button theme="outline" onClick={() => setOpen(true)}>
        확인 다이얼로그 열기
      </Button>
      <AlertDialogRoot open={open} onOpenChange={setOpen}>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>요청을 처리할까요?</AlertDialogTitle>
            <AlertDialogDescription>확인 후에는 되돌릴 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose onClick={() => setOpen(false)}>취소</AlertDialogClose>
            <AlertDialogAction className="bg-primary-blue-1" onClick={() => setOpen(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialogRoot>
    </>
  )
}
