'use client'

import {
  Dialog,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from '@transight-design/ui/components/dialog'
import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Size = NonNullable<Parameters<typeof DialogPopup>[0]['size']>
type Shape = NonNullable<Parameters<typeof DialogPopup>[0]['shape']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Dialog>
    <DialogTrigger render={<Button>다이얼로그 열기</Button>} />
    <DialogPopup
      size={(selections.size as Size) ?? undefined}
      shape={(selections.shape as Shape) ?? undefined}
    >
      <DialogTitle>새 작업</DialogTitle>
      <DialogDescription>새로운 트랜잭션 추적을 시작합니다.</DialogDescription>
      <DialogFooter className='mt-2'>
        <DialogClose appearance='outline' size='sm'>
          취소
        </DialogClose>
        <DialogClose color='blue' size='sm'>
          시작
        </DialogClose>
      </DialogFooter>
    </DialogPopup>
  </Dialog>
)
