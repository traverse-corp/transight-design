'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from '@transight-design/ui/components/dialog'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <Dialog>
    <DialogTrigger render={<Button>다이얼로그 열기</Button>} />
    <DialogBackdrop />
    <DialogPopup className='w-80'>
      <DialogTitle>새 작업</DialogTitle>
      <DialogDescription>새로운 트랜잭션 추적을 시작합니다.</DialogDescription>
      <div className='mt-5 flex justify-end gap-2'>
        <DialogClose render={<Button variant='outline' size='sm'>취소</Button>} />
        <DialogClose render={<Button size='sm'>시작</Button>} />
      </div>
    </DialogPopup>
  </Dialog>
)
