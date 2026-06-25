'use client'

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@transight-design/ui/components/alert-dialog'
import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof AlertDialogPopup>[0]['shape']>
type Size = NonNullable<Parameters<typeof AlertDialogPopup>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button theme='outline'>삭제</Button>} />
    <AlertDialogPopup
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>정말 삭제할까요?</AlertDialogTitle>
        <AlertDialogDescription>이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogClose theme='outline' size='sm'>
          취소
        </AlertDialogClose>
        <AlertDialogClose color='red' size='sm'>
          삭제
        </AlertDialogClose>
      </AlertDialogFooter>
    </AlertDialogPopup>
  </AlertDialog>
)
